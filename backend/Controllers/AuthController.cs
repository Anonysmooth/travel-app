using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelApp.Api.Data;
using TravelApp.Api.DTOs.Auth;
using TravelApp.Api.Models;
using TravelApp.Api.Services;

namespace TravelApp.Api.Controllers;

/// <summary>
/// Contrôleur gérant l'authentification des utilisateurs.
/// Route de base: /api/auth
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ITokenService _tokenService;
    private readonly IEmailService _emailService;
    private readonly ILogger<AuthController> _logger;

    /// <summary>
    /// Constructeur avec injection de dépendances.
    /// </summary>
    public AuthController(
        AppDbContext context,
        ITokenService tokenService,
        IEmailService emailService,
        ILogger<AuthController> logger)
    {
        _context = context;
        _tokenService = tokenService;
        _emailService = emailService;
        _logger = logger;
    }

    /// <summary>
    /// Inscription d'un nouvel utilisateur.
    /// POST /api/auth/register
    /// Envoie un email de confirmation (le compte n'est pas actif tant que l'email n'est pas confirmé).
    /// </summary>
    /// <param name="request">Données d'inscription (email, password, confirmPassword).</param>
    /// <returns>
    /// 201 Created: Inscription réussie, email de confirmation envoyé.
    /// 400 Bad Request: Données invalides (validation FluentValidation).
    /// 409 Conflict: Email déjà utilisé.
    /// </returns>
    [HttpPost("register")]
    [ProducesResponseType(typeof(RegisterResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        // Vérification si l'email existe déjà (insensible à la casse)
        var existingUser = await _context.Users
            .AnyAsync(u => u.Email.ToLower() == request.Email.ToLower());

        if (existingUser)
        {
            return Conflict(new ApiError(
                "EMAIL_EXISTS",
                "Un compte avec cet email existe déjà"
            ));
        }

        // Génération du token de confirmation (GUID unique)
        var confirmationToken = Guid.NewGuid().ToString("N");

        // Création de l'utilisateur (email NON confirmé)
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email.ToLower().Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            IsEmailConfirmed = false, // Email non confirmé par défaut
            EmailConfirmationToken = confirmationToken,
            EmailConfirmationTokenExpiry = DateTime.UtcNow.AddHours(24), // Expire dans 24h
            CreatedAt = DateTime.UtcNow
        };

        // Sauvegarde en base de données
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Envoi de l'email de confirmation
        try
        {
            await _emailService.SendConfirmationEmailAsync(user.Email, confirmationToken);
            _logger.LogInformation("Confirmation email sent to {Email}", user.Email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send confirmation email to {Email}", user.Email);
            // On ne bloque pas l'inscription si l'email échoue
            // L'utilisateur pourra demander un renvoi
        }

        _logger.LogInformation("User registered (pending confirmation): {Email}", user.Email);

        // Retourne 201 Created avec message (pas de token JWT)
        return CreatedAtAction(
            nameof(Register),
            new RegisterResponse(
                "Inscription réussie ! Vérifiez votre email pour activer votre compte.",
                user.Email
            )
        );
    }

    /// <summary>
    /// Confirmation de l'adresse email.
    /// GET /api/auth/confirm-email?token=xxx
    /// </summary>
    /// <param name="token">Token de confirmation reçu par email.</param>
    /// <returns>
    /// 200 OK: Email confirmé avec succès, retourne un token JWT.
    /// 400 Bad Request: Token invalide ou expiré.
    /// </returns>
    [HttpGet("confirm-email")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiError), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ConfirmEmail([FromQuery] string token)
    {
        if (string.IsNullOrWhiteSpace(token))
        {
            return BadRequest(new ApiError("INVALID_TOKEN", "Token de confirmation requis"));
        }

        // Recherche de l'utilisateur par token
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.EmailConfirmationToken == token);

        if (user == null)
        {
            return BadRequest(new ApiError("INVALID_TOKEN", "Token de confirmation invalide"));
        }

        // Vérification de l'expiration du token
        if (user.EmailConfirmationTokenExpiry < DateTime.UtcNow)
        {
            return BadRequest(new ApiError(
                "TOKEN_EXPIRED",
                "Le lien de confirmation a expiré. Veuillez vous réinscrire."
            ));
        }

        // Vérification si déjà confirmé
        if (user.IsEmailConfirmed)
        {
            return BadRequest(new ApiError(
                "ALREADY_CONFIRMED",
                "Cet email a déjà été confirmé"
            ));
        }

        // Activation du compte
        user.IsEmailConfirmed = true;
        user.EmailConfirmationToken = null; // Invalidation du token
        user.EmailConfirmationTokenExpiry = null;
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        // Génération du token JWT pour connexion automatique
        var (jwtToken, expiresAt) = _tokenService.GenerateToken(user);

        _logger.LogInformation("Email confirmed for user: {Email}", user.Email);

        return Ok(new AuthResponse(jwtToken, user.Email, user.Id, expiresAt));
    }

    /// <summary>
    /// Renvoie l'email de confirmation.
    /// POST /api/auth/resend-confirmation
    /// </summary>
    /// <returns>
    /// 200 OK: Email renvoyé (ou message générique si email non trouvé pour sécurité).
    /// </returns>
    [HttpPost("resend-confirmation")]
    [ProducesResponseType(typeof(RegisterResponse), StatusCodes.Status200OK)]
    public async Task<IActionResult> ResendConfirmation([FromBody] ResendConfirmationRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email.ToLower() == request.Email.ToLower());

        // Message générique pour ne pas révéler si l'email existe
        var genericResponse = new RegisterResponse(
            "Si un compte existe avec cet email, un nouveau lien de confirmation a été envoyé.",
            request.Email
        );

        if (user == null || user.IsEmailConfirmed)
        {
            return Ok(genericResponse);
        }

        // Génération d'un nouveau token
        user.EmailConfirmationToken = Guid.NewGuid().ToString("N");
        user.EmailConfirmationTokenExpiry = DateTime.UtcNow.AddHours(24);
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        // Envoi de l'email
        try
        {
            await _emailService.SendConfirmationEmailAsync(user.Email, user.EmailConfirmationToken);
            _logger.LogInformation("Confirmation email resent to {Email}", user.Email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to resend confirmation email to {Email}", user.Email);
        }

        return Ok(genericResponse);
    }
}

/// <summary>
/// Requête pour renvoyer l'email de confirmation.
/// </summary>
public record ResendConfirmationRequest(string Email);
