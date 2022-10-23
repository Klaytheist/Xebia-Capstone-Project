using Capstone.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace Capstone.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        [HttpPut]
        [Route("update-password")]
        public IActionResult UpdatePassword([FromBody]ChangePass pass)
        {
            var emp = new List<string>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select fname from users where email='{pass.Email}' and password='{pass.Oldpassword}'", conn);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while( dr.Read())
                {
                    emp.Add(dr["Fname"].ToString());
                }
                dr.Close();
                if (emp.Count > 0)
                {
                    cmd.CommandText = $"update users set password='{pass.Newpassword}' where email='{pass.Email}'";
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    return Ok();
                }
            }
            return BadRequest();
            
        }
        [HttpGet]
        [Route("get-users")]
        public IActionResult GetUsers()
        {
            var emp = new List<Users>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from users", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    emp.Add(new Users
                    {
                        Fname = reader["Fname"].ToString(),
                        Lname = reader["Lname"].ToString(),
                        Email = reader["Email"].ToString(),
                        Mobile = Convert.ToInt64(reader["Mobile"].ToString()),
                        Password = reader["Password"].ToString(),
                        Role = reader["Role"].ToString()
                    });
                }
            }
            return Ok(emp);

        }

        [HttpDelete]
        [Route("delete")]
        public IActionResult DeleteUser([FromBody] Names name)
        {
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"delete from cart where useremail='{name.Name}' or merchantemail='{name.Name}'", conn);
                conn.Open();
                cmd.ExecuteNonQuery();
                cmd.CommandText = $"delete from products where merchantemail='{name.Name}'";
                cmd.ExecuteNonQuery();
                cmd.CommandText = $"delete from orders where useremail='{name.Name}' or merchantemail='{name.Name}'";
                cmd.ExecuteNonQuery();
                cmd.CommandText = $"delete from address where email='{name.Name}'";
                cmd.ExecuteNonQuery();
                cmd.CommandText = $"delete from users where email='{name.Name}'";
                cmd.ExecuteNonQuery();
            }
            return Ok();

        }

    }
}
