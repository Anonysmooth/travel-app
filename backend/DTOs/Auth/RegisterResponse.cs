namespace TravelApp.Api.DTOs.Auth;

/// <summary>
/// Réponse après inscription (avant confirmation email).
/// </summary>
/// <param name="Message">Message de confirmation.</param>
/// <param name="Email">Email de l'utilisateur inscrit.</param>
public record RegisterResponse(string Message, string Email);
