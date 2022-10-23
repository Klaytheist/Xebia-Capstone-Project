using Capstone.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Capstone.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        [Route("admin")]
        [HttpPost]
        public IActionResult LoginAdmin([FromBody] Login user)
        {
            var users = new List<Users>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                if (user.Role == "0")
                {
                    SqlCommand cmd = new SqlCommand($"select * from users where email='{user.Email}' and password='{user.Password}'", conn);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        users.Add(new Users
                        {
                            Fname = reader["Fname"].ToString(),
                            Email = reader["Email"].ToString(),
                            Password = reader["Password"].ToString(),
                            Role = "0"
                        });
                    }
                    if (users.Count > 0)
                    {
                        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                        var tokeOptions = new JwtSecurityToken(
                            issuer: "https://localhost:7170",
                            audience: "https://localhost:7170",
                            claims: new List<Claim>(),
                            expires: DateTime.Now.AddMinutes(520),
                            signingCredentials: signinCredentials
                        );
                        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                        return Ok(new AuthToken
                        {
                            Token = tokenString,
                            User = new Meta
                            {
                                Role = "0",
                                Email = users[0].Email,
                                Fname = users[0].Fname
                            }
                        });
                    }
                }
                return Unauthorized();
            }
        }

        [Route("user")]
        [HttpPost]
        public IActionResult LoginUser([FromBody] Login user)
        {
            var users = new List<Users>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                if (user.Role == "2")
                {
                    SqlCommand cmd = new SqlCommand($"select * from users where email='{user.Email}' and password='{user.Password}' and role={user.Role}", conn);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        users.Add(new Users
                        {
                            Fname = reader["Fname"].ToString(),
                            Email = reader["Email"].ToString(),
                            Password = reader["Password"].ToString(),
                            Role = "2"
                        });
                    }
                    if (users.Count > 0)
                    {
                        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                        var tokeOptions = new JwtSecurityToken(
                            issuer: "https://localhost:7170",
                            audience: "https://localhost:7170",
                            claims: new List<Claim>(),
                            expires: DateTime.Now.AddMinutes(520),
                            signingCredentials: signinCredentials
                        );
                        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                        return Ok(new AuthToken
                        {
                            Token = tokenString,
                            User = new Meta
                            {
                                Role = "2",
                                Email = users[0].Email,
                                Fname = users[0].Fname
                            }
                        });
                    }
                }
                else if (user.Role == "1")
                {
                    SqlCommand cmd = new SqlCommand($"select * from users where email='{user.Email}' and password='{user.Password}' and role='{user.Role}'", conn);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        users.Add(new Users
                        {
                            Fname = reader["Fname"].ToString(),
                            Email = reader["Email"].ToString(),
                            Password = reader["Password"].ToString(),
                            Role = "1"
                        });
                    }
                    if (users.Count > 0)
                    {
                        var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                        var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                        var tokeOptions = new JwtSecurityToken(
                            issuer: "https://localhost:7170",
                            audience: "https://localhost:7170",
                            claims: new List<Claim>(),
                            expires: DateTime.Now.AddMinutes(520),
                            signingCredentials: signinCredentials
                        );
                        var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                        return Ok(new AuthToken
                        {
                            Token = tokenString,
                            User = new Meta
                            {
                                Role = "1",
                                Email = users[0].Email,
                                Fname = users[0].Fname
                            }
                        });
                    }
                }
                return Unauthorized();
            }
        }
    }
}
