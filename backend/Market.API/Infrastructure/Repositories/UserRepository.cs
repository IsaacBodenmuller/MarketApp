// using Market.API.Domain.DTOs;
using Market.API.Domain.Model.UserAggregate;

namespace Market.API.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ConnectionContext _context;
        public UserRepository(ConnectionContext context)
        {
            _context = context;
        }
        
        public void Add(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }  

        public List<User> Get()
        {
            return _context.Users.ToList();
            // return _context.Users.Skip(pageNumber * pageQuantity).Take(pageQuantity).Select(b => new UserDTO() {})
        }
    }
}