using Microsoft.EntityFrameworkCore;
using Market.API.Domain.Model.UserAggregate;
using System.Reflection.Metadata;

namespace Market.API.Infrastructure
{
    public class ConnectionContext : DbContext
    {
        public ConnectionContext(DbContextOptions<ConnectionContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users {get; set;}
    }
}