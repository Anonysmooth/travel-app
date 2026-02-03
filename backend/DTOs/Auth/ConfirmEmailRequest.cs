namespace TravelApp.Api.DTOs.Auth;

/// <summary>
/// Requête de confirmation d'email.
/// </summary>
/// <param name="Token">Token de confirmation reçu par email.</param>
public record ConfirmEmailRequest(string Token);
