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
    private readonly ILogger<AuthController> _logger;

    /// <summary>
    /// Constructeur avec injection de dépendances.
    /// </summary>
    /// <param name="context">Contexte de base de données EF Core.</param>
    /// <param name="tokenService">Service de génération de tokens JWT.</param>
    /// <param name="logger">Logger pour tracer les événements.</param>
    public AuthController(
        AppDbContext context,
        ITokenService tokenService,
        ILogger<AuthController> logger)
    {
        _context = context;
        _tokenService = tokenService;
        _logger = logger;
    }

    /// <summary>
    /// Inscription d'un nouvel utilisateur.
    /// POST /api/auth/register
    /// </summary>
    /// <param name="request">Données d'inscription (email, password, confirmPassword).</param>
    /// <returns>
    /// 201 Created: Inscription réussie avec token JWT.
    /// 400 Bad Request: Données invalides (validation FluentValidation).
    /// 409 Conflict: Email déjà utilisé.
    /// </returns>
    [HttpPost("register")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status201Created)]
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
                "An account with this email already exists"
            ));
        }

        // Création de l'utilisateur avec hash BCrypt du mot de passe
        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = request.Email.ToLower().Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            IsEmailConfirmed = true, // MVP: Auto-confirmation de l'email
            CreatedAt = DateTime.UtcNow
        };

        // Sauvegarde en base de données
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Génération du token JWT pour connexion automatique
        var (token, expiresAt) = _tokenService.GenerateToken(user);

        _logger.LogInformation("User registered: {Email}", user.Email);

        // Retourne 201 Created avec les informations de connexion
        return CreatedAtAction(
            nameof(Register),
            new AuthResponse(token, user.Email, user.Id, expiresAt)
        );
    }
}
