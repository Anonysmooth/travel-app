namespace TravelApp.Api.DTOs.Auth;

public record ApiError(
    string Code,
    string Message,
    Dictionary<string, string[]>? Errors = null
);
