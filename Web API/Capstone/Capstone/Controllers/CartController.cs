using Capstone.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace Capstone.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        [HttpPost]
        [Route("post")]
        public IActionResult AddToCart([FromBody] Cart cart)
        {
            cart.Id = Guid.NewGuid();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"insert into cart values('{cart.Id}','{cart.Productid}', '{cart.Useremail}', {cart.Count}, '{cart.Merchantemail}', '{cart.Productname}', '{cart.Price}')",conn);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
            return Ok();
        }

        [HttpPost]
        [Route("get")]
        public IActionResult GetCart([FromBody] Names name)
        {
            var items = new List<Cart>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from cart where useremail='{name.Name}'", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while(reader.Read())
                {
                    items.Add(new Cart
                    {
                        Id = new Guid(reader["Id"].ToString()),
                        Productid = reader["ProductId"].ToString(),
                        Useremail = reader["Useremail"].ToString(),
                        Count = Convert.ToInt32(reader["Count"].ToString()),
                        Merchantemail = reader["Merchantemail"].ToString(),
                        Productname = reader["Productname"].ToString(),
                        Price = Convert.ToInt64(reader["Price"].ToString())
                    });
                }
            }
            return Ok(items);
        }

        [HttpDelete]
        [Route("delete")]
        public IActionResult DeleteFromCart([FromBody] Names name)
        {
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"delete from cart where useremail='{name.Name}'", conn);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
            return Ok();
        }
        [HttpDelete]
        [Route("delete-product")]
        public IActionResult DeleteProductFromCart([FromBody] Names name)
        {
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"delete from cart where id='{name.Name}'", conn);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
            return Ok();
        }
    }
}
