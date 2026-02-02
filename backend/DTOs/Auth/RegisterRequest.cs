namespace TravelApp.Api.DTOs.Auth;

public record RegisterRequest(
    string Email,
    string Password,
    string ConfirmPassword
);
