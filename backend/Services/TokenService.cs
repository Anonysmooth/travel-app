using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TravelApp.Api.Configuration;
using TravelApp.Api.Models;

namespace TravelApp.Api.Services;

/// <summary>
/// Service de génération de tokens JWT pour l'authentification.
/// </summary>
public class TokenService : ITokenService
{
    private readonly JwtSettings _jwtSettings;

    /// <summary>
    /// Constructeur avec injection des paramètres JWT depuis appsettings.json.
    /// </summary>
    public TokenService(IOptions<JwtSettings> jwtSettings)
    {
        _jwtSettings = jwtSettings.Value;
    }

    /// <summary>
    /// Génère un token JWT pour un utilisateur authentifié.
    /// </summary>
    /// <param name="user">L'utilisateur pour lequel générer le token.</param>
    /// <returns>Tuple contenant le token JWT et sa date d'expiration.</returns>
    public (string Token, DateTime ExpiresAt) GenerateToken(User user)
    {
        // Création de la clé de signature à partir de la clé secrète
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        // Calcul de la date d'expiration
        var expiresAt = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes);

        // Définition des claims (informations contenues dans le token)
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),  // Subject: ID utilisateur
            new Claim(JwtRegisteredClaimNames.Email, user.Email),        // Email
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) // JWT ID unique
        };

        // Construction du token JWT
        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,       // Émetteur du token
            audience: _jwtSettings.Audience,   // Destinataire du token
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials
        );

        // Sérialisation du token en chaîne de caractères
        return (new JwtSecurityTokenHandler().WriteToken(token), expiresAt);
    }
}
