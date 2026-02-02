namespace TravelApp.Api.DTOs.Auth;

public record AuthResponse(
    string Token,
    string Email,
    Guid UserId,
    DateTime ExpiresAt
);
