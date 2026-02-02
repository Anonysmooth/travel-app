namespace TravelApp.Api.Models;

/// <summary>
/// Entité représentant un utilisateur de l'application.
/// Stockée dans la table "Users" de PostgreSQL.
/// </summary>
public class User
{
    /// <summary>
    /// Identifiant unique de l'utilisateur (GUID).
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    /// Adresse email de l'utilisateur (unique, utilisée pour la connexion).
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Hash du mot de passe (généré avec BCrypt).
    /// Ne jamais stocker le mot de passe en clair.
    /// </summary>
    public string PasswordHash { get; set; } = string.Empty;

    /// <summary>
    /// Indique si l'email a été confirmé.
    /// MVP: Automatiquement true à l'inscription.
    /// </summary>
    public bool IsEmailConfirmed { get; set; }

    /// <summary>
    /// Token de confirmation d'email (pour future implémentation).
    /// </summary>
    public string? EmailConfirmationToken { get; set; }

    /// <summary>
    /// Date d'expiration du token de confirmation.
    /// </summary>
    public DateTime? EmailConfirmationTokenExpiry { get; set; }

    /// <summary>
    /// Date de création du compte (UTC).
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Date de dernière modification (UTC).
    /// </summary>
    public DateTime? UpdatedAt { get; set; }
}
