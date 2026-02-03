using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using TravelApp.Api.Configuration;

namespace TravelApp.Api.Services;

/// <summary>
/// Service d'envoi d'emails via SMTP (Mailtrap/SendGrid).
/// </summary>
public class EmailService : IEmailService
{
    private readonly EmailSettings _emailSettings;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IOptions<EmailSettings> emailSettings, ILogger<EmailService> logger)
    {
        _emailSettings = emailSettings.Value;
        _logger = logger;
    }

    /// <summary>
    /// Envoie un email de confirmation d'inscription avec lien d'activation.
    /// </summary>
    public async Task SendConfirmationEmailAsync(string toEmail, string confirmationToken)
    {
        // Construction du lien de confirmation
        var confirmationLink = $"{_emailSettings.FrontendBaseUrl}/confirm-email?token={confirmationToken}";

        var subject = "Confirmez votre adresse email - Travel App";

        var htmlBody = $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
        .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }}
        .button {{ display: inline-block; background: #3B82F6; color: white; padding: 14px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }}
        .button:hover {{ background: #2563EB; }}
        .footer {{ text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }}
        .warning {{ background: #fef3c7; border-left: 4px solid #f59e0b; padding: 10px 15px; margin: 20px 0; }}
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>✈️ Travel App</h1>
            <p>Bienvenue dans votre espace voyage !</p>
        </div>
        <div class='content'>
            <h2>Confirmez votre adresse email</h2>
            <p>Bonjour,</p>
            <p>Merci de vous être inscrit sur Travel App ! Pour activer votre compte et commencer à organiser vos voyages, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>

            <div style='text-align: center;'>
                <a href='{confirmationLink}' class='button'>Confirmer mon email</a>
            </div>

            <div class='warning'>
                <strong>⏱️ Ce lien expire dans 24 heures.</strong><br>
                Si vous n'avez pas créé de compte, ignorez simplement cet email.
            </div>

            <p>Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :</p>
            <p style='word-break: break-all; color: #3B82F6;'>{confirmationLink}</p>
        </div>
        <div class='footer'>
            <p>© 2026 Travel App - Organisez vos voyages simplement</p>
            <p>Cet email a été envoyé à {toEmail}</p>
        </div>
    </div>
</body>
</html>";

        await SendEmailAsync(toEmail, subject, htmlBody);
    }

    /// <summary>
    /// Envoie un email générique via SMTP.
    /// </summary>
    public async Task SendEmailAsync(string toEmail, string subject, string htmlBody)
    {
        // Mode désactivé : log seulement
        if (!_emailSettings.EnableSending)
        {
            _logger.LogInformation(
                "Email sending disabled. Would send to {ToEmail}: {Subject}",
                toEmail, subject);
            return;
        }

        try
        {
            // Construction du message
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_emailSettings.FromName, _emailSettings.FromEmail));
            message.To.Add(new MailboxAddress(toEmail, toEmail));
            message.Subject = subject;

            // Corps du message en HTML
            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = htmlBody
            };
            message.Body = bodyBuilder.ToMessageBody();

            // Envoi via SMTP
            using var client = new SmtpClient();

            await client.ConnectAsync(
                _emailSettings.SmtpServer,
                _emailSettings.SmtpPort,
                SecureSocketOptions.StartTls);

            await client.AuthenticateAsync(
                _emailSettings.SmtpUsername,
                _emailSettings.SmtpPassword);

            await client.SendAsync(message);
            await client.DisconnectAsync(true);

            _logger.LogInformation("Email sent successfully to {ToEmail}: {Subject}", toEmail, subject);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {ToEmail}: {Subject}", toEmail, subject);
            throw;
        }
    }
}
