
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Market.API.Domain.Model.UserAggregate
{
    [Table("system_user")]
    public class User
    {
        [Key]
        // [Column("id")]
        public int Id {get; private set;}
        public string Name {get; private set;}
        public string Username {get; private set;}
        public string Email {get; private set;}
        public string Password {get; private set;}
        public string Role {get; private set;}
        public bool Active {get; private set;}
        public DateTime CreatedAt {get; private set;}
        public DateTime LastLogin {get; private set;}

        public User(string name, string username, string email, string password)
        {
            Name = name;
            Username = username;
            Email = email;
            Password = password;
            Active = true;
            CreatedAt = DateTime.UtcNow;
        }
        private User(){}

        public void UpdateLastLogin()
        {
            LastLogin = DateTime.UtcNow;
        }
        
        public void Deactivate()
        {
            Active = false;
        }

        public void DefaultRole()
        {
            Role = "No-Role";
        }
    }
}