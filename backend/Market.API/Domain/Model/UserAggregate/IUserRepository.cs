namespace Market.API.Domain.Model.UserAggregate
{
    public interface IUserRepository
    {
        void Add(User user);
        
        List<User> Get();
    }
}