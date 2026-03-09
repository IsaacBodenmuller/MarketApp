
using Market.API.Application.ViewModel;
using Market.API.Domain.Model.UserAggregate;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace Market.API.Controllers
{
    [ApiController]
    [Route("api/v1/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException();
        }

        [HttpPost]
        public IActionResult Add(UserViewModel userViewModel)
        {
            var user = new User(userViewModel.Name, userViewModel.Username, userViewModel.Email, userViewModel.Password);
            
            _userRepository.Add(user);

            return Ok();
        }

        [HttpGet]
        public IActionResult Get()
        {
            var users = _userRepository.Get();
            return Ok(users);
        }
    }
}