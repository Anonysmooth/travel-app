namespace TravelApp.Api.Services;

/// <summary>
/// Interface pour le service d'envoi d'emails.
/// </summary>
public interface IEmailService
{
    /// <summary>
    /// Envoie un email de confirmation d'inscription.
    /// </summary>
    /// <param name="toEmail">Adresse email du destinataire.</param>
    /// <param name="confirmationToken">Token de confirmation unique.</param>
    /// <returns>Task représentant l'opération asynchrone.</returns>
    Task SendConfirmationEmailAsync(string toEmail, string confirmationToken);

    /// <summary>
    /// Envoie un email générique.
    /// </summary>
    /// <param name="toEmail">Adresse email du destinataire.</param>
    /// <param name="subject">Sujet de l'email.</param>
    /// <param name="htmlBody">Corps de l'email en HTML.</param>
    /// <returns>Task représentant l'opération asynchrone.</returns>
    Task SendEmailAsync(string toEmail, string subject, string htmlBody);
}
