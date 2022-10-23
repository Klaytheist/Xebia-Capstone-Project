using Capstone.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Linq.Expressions;

namespace Capstone.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignUpController : Controller
    {
        [HttpPost]
        public IActionResult SignUpUser([FromBody] Users user)
        {
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"insert into Users values('{user.Fname}', " +
                    $"'{user.Lname}', '{user.Email}', {user.Mobile}, '{user.Password}', '{user.Role}')", conn);
                conn.Open();
                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch (System.Data.SqlClient.SqlException)
                {
                    return Unauthorized();
                }
            }
            return Ok();
        }

        [HttpPost]
        [Route("merchant-request")]
        public IActionResult MerchantRequest([FromBody] Users user)
        {
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"insert into merchantrequest values('{user.Fname}', " +
                    $"'{user.Lname}', '{user.Email}', {user.Mobile}, '{user.Password}' )", conn);
                conn.Open();
                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch (System.Data.SqlClient.SqlException)
                {
                    return Unauthorized();
                }
            }
            return Ok();
        }
        
        [HttpGet]
        [Route("merchant-request-emails")]
        public IActionResult GetEmails()
        {
            var emails = new List<Users>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from merchantrequest", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while(reader.Read())
                {
                    emails.Add(new Users
                    {
                        Fname = reader["Fname"].ToString(),
                        Lname = reader["Lname"].ToString(),
                        Email = reader["Email"].ToString(),
                        Mobile = Convert.ToInt64(reader["Mobile"]),
                        Password = reader["Password"].ToString()

                    });
                }
            }
            return Ok(emails);
        }

        [HttpDelete]
        [Route("delete")]
        public IActionResult Delete([FromBody] Names names)      
        {
            var emails = new List<Users>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"delete from merchantrequest where email='{names.Name}'", conn);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
            return Ok();
        }
    }
}
