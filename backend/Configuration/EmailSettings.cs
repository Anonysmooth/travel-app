namespace TravelApp.Api.Configuration;

/// <summary>
/// Configuration pour l'envoi d'emails.
/// Supporte Mailtrap (dev) et SendGrid/SMTP (prod).
/// </summary>
public class EmailSettings
{
    /// <summary>
    /// Serveur SMTP (ex: smtp.mailtrap.io, smtp.sendgrid.net).
    /// </summary>
    public string SmtpServer { get; set; } = string.Empty;

    /// <summary>
    /// Port SMTP (587 pour TLS, 465 pour SSL).
    /// </summary>
    public int SmtpPort { get; set; } = 587;

    /// <summary>
    /// Nom d'utilisateur SMTP.
    /// </summary>
    public string SmtpUsername { get; set; } = string.Empty;

    /// <summary>
    /// Mot de passe SMTP.
    /// </summary>
    public string SmtpPassword { get; set; } = string.Empty;

    /// <summary>
    /// Adresse email de l'expéditeur.
    /// </summary>
    public string FromEmail { get; set; } = string.Empty;

    /// <summary>
    /// Nom affiché de l'expéditeur.
    /// </summary>
    public string FromName { get; set; } = "Travel App";

    /// <summary>
    /// URL de base du frontend pour les liens (ex: https://app.travelapp.com).
    /// </summary>
    public string FrontendBaseUrl { get; set; } = "http://localhost:5173";

    /// <summary>
    /// Activer/désactiver l'envoi d'emails (false = log seulement).
    /// </summary>
    public bool EnableSending { get; set; } = true;
}
