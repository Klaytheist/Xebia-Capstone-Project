using Capstone.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace Capstone.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : Controller
    {
        [HttpPost]
        [Route("post")]
        public IActionResult Post([FromBody] Address address)
        {
            var emp = new List<string>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"delete from address where email='{address.Email}'", conn);
                conn.Open();
                cmd.ExecuteNonQuery();
                cmd.CommandText = $"insert into address values('{address.Fname}','{address.Lname}','{address.Shipemail}','{address.Email}','{address.Address1}','{address.Address2}','{address.Country}'," +
                    $"'{address.State}','{address.Zip}')";
               try
                {
                    cmd.ExecuteNonQuery();
                }
                catch(Exception ex)
                {
                   return BadRequest(ex);
               }
                conn.Close();
            }
            return Ok();
        }

        [HttpPost]
        [Route("get")]
        public IActionResult Get([FromBody] Names name)
        {
            var addr = new List<Address>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from address where email='{name.Name}'", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    addr.Add( new Address
                    {
                        Fname = reader[0].ToString(),
                        Lname = reader[1].ToString(),
                        Shipemail = reader[2].ToString(),
                        Email = reader[3].ToString(),
                        Address1 = reader[4].ToString(),
                        Address2 = reader[5].ToString(),
                        Country = reader[6].ToString(),
                        State = reader[7].ToString(),
                        Zip = reader[8].ToString()
                    });
                }
                reader.Close();
            }
            return Ok(addr);
        }
    }
}
