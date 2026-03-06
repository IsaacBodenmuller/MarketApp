using Microsoft.EntityFrameworkCore;
// using Market.API.Models;
using System.Reflection.Metadata;

namespace Market.API.Data
{
    public class ConnectionContext : DbContext
    {
        
        public ConnectionContext(DbContextOptions<ConnectionContext> options)
            : base(options)
        {
        }

    }
}