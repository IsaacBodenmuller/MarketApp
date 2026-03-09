using Market.API.Domain.Model.UserAggregate;
using Market.API.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Market.API.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            // services.AddScoped<>();

            return services;
        }
    }
}