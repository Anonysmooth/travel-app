using TravelApp.Api.Models;

namespace TravelApp.Api.Services;

public interface ITokenService
{
    (string Token, DateTime ExpiresAt) GenerateToken(User user);
}
