using System.ComponentModel.DataAnnotations;

namespace Capstone.Models
{
    public class Users
    {
        public string Fname { get; set; }
        public string Lname { get; set; }
        public string Email { get; set; }
        public long Mobile { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

    }
}
