using Capstone.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace Capstone.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        [HttpPost]
        [Route("post")]
        public IActionResult AddOrders([FromBody] Orders orders)
        {
            orders.Id = Guid.NewGuid();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"insert into orders values(" +
                    $"'{orders.Id}', '{orders.Productname}', {orders.Count}," +
                    $" {orders.Price}, '{orders.Useremail}', '{orders.Address}'," +
                    $" {orders.Zip}, '{orders.Merchantemail}', '{orders.Orderdate}', '{orders.State}', '{orders.Status}')", conn);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
            return Ok();
        }

        [HttpGet]
        [Route("get")]
        public IActionResult GetOrders()
        {
            var orders = new List<Orders>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from orders", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while(reader.Read())
                {
                    orders.Add(new Orders
                    {
                        Id = new Guid(reader["Id"].ToString()),
                        Productname = reader["Productname"].ToString(),
                        Count = Convert.ToInt32(reader["Count"].ToString()),
                        Price = Convert.ToInt64(reader["Price"].ToString()),
                        Useremail = reader["Useremail"].ToString(),
                        Address = reader["Address"].ToString(),
                        Zip = Convert.ToInt64(reader["Zip"].ToString()),
                        Merchantemail = reader["Merchantemail"].ToString(),
                        Orderdate = reader["Orderdate"].ToString(),
                        State = reader["State"].ToString(),
                        Status = reader["Status"].ToString()
                    }); ;
                }
            }
            return Ok(orders);
        }
   
        [HttpPost]
        [Route("filter")]
        public IActionResult GetFilteredOrders([FromBody]Dates date)
        {
            var orders = new List<Orders>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from orders where orderdate between '{date.Greater}' and '{date.Lesser}'", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    orders.Add(new Orders
                    {
                        Id = new Guid(reader["Id"].ToString()),
                        Productname = reader["Productname"].ToString(),
                        Count = Convert.ToInt32(reader["Count"].ToString()),
                        Price = Convert.ToInt64(reader["Price"].ToString()),
                        Useremail = reader["Useremail"].ToString(),
                        Address = reader["Address"].ToString(),
                        Zip = Convert.ToInt64(reader["Zip"].ToString()),
                        Merchantemail = reader["Merchantemail"].ToString(),
                        Orderdate = reader["Orderdate"].ToString(),
                        State = reader["State"].ToString(),
                        Status = reader["Status"].ToString()
                    }); ;
                }
            }
            return Ok(orders);
        }

        [HttpPut]
        [Route("put")]
        public IActionResult UpdateOrders([FromBody] Names names)
        {
            var orders = new List<Orders>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"update orders set state='1', status='Delivered' where id='{names.Name}'", conn);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
            return Ok(orders);
        }
    }
}
