using Capstone.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace Capstone.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        [HttpPost]
        public IActionResult AddProduct([FromBody] AddProduct product)
        {
            product.Id = Guid.NewGuid();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"insert into products values('{product.Id}', '{product.Name}', '{product.Brand}', '{product.Merchantemail}'," +
                    $"{product.Unitsold},'{product.Image}', '{product.Description}', '{product.Category}', '{product.Price}')", conn);
                conn.Open();
                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch (System.Data.SqlClient.SqlException ex)
                {
                    return Unauthorized();
                }
            }
            return Ok();
        }
        [HttpGet]
        public IActionResult GetNames()
        {
            var products = new List<string>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select name from products", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    products.Add(reader["Name"].ToString());
                }
            }
            return Ok(products);
        }
        [HttpGet]
        [Route("fetch-products")]
        public IActionResult Get()
        {
            var products = new List<AddProduct>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from products", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    products.Add(new AddProduct
                    {
                        Brand = reader["Brand"].ToString(),
                        Merchantemail = reader["MerchantEmail"].ToString(),
                        Name = reader["Name"].ToString(),
                        Image = reader["Image"].ToString(),
                        Description = reader["Description"].ToString(),
                        Unitsold = Convert.ToInt64(reader["Unitsold"]),
                        Category = reader["Category"].ToString(),
                        Price = Convert.ToInt64(reader["Price"]),
                        Id = new Guid(reader["Id"].ToString())
                    });
                }
            }
            return Ok(products);
        }

        [HttpPost]
        [Route("fetch-products-by-name")]
        public IActionResult GetByName([FromBody] Names name)
        {
            var products = new List<AddProduct>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from products where name like '%{name.Name}%'", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    products.Add(new AddProduct
                    {
                        Brand = reader["Brand"].ToString(),
                        Merchantemail = reader["MerchantEmail"].ToString(),
                        Name = reader["Name"].ToString(),
                        Image = reader["Image"].ToString(),
                        Description = reader["Description"].ToString(),
                        Unitsold = Convert.ToInt64(reader["Unitsold"]),
                        Category = reader["Category"].ToString(),
                        Price = Convert.ToInt64(reader["Price"]),
                        Id = new Guid(reader["Id"].ToString())
                    });
                }
            }
            return Ok(products);
        }

        [HttpPost]
        [Route("fetch-products-by-category")]
        public IActionResult GetByCategory([FromBody] Names name)
        {
            var products = new List<AddProduct>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from products where category='{name.Name}'", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    products.Add(new AddProduct
                    {
                        Brand = reader["Brand"].ToString(),
                        Merchantemail = reader["MerchantEmail"].ToString(),
                        Name = reader["Name"].ToString(),
                        Image = reader["Image"].ToString(),
                        Description = reader["Description"].ToString(),
                        Unitsold = Convert.ToInt64(reader["Unitsold"]),
                        Category = reader["Category"].ToString(),
                        Price = Convert.ToInt64(reader["Price"]),
                        Id = new Guid(reader["Id"].ToString())
                    });
                }
            }
            return Ok(products);
        }

        [HttpPost]
        [Route("fetch-products-by-category-and-price")]
        public IActionResult GetByCategoryAndPrice([FromBody] CatAndPrice name)
        {
            var products = new List<AddProduct>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from products where category='{name.Category}' and price between {name.Less} and {name.Greater}", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    products.Add(new AddProduct
                    {
                        Brand = reader["Brand"].ToString(),
                        Merchantemail = reader["MerchantEmail"].ToString(),
                        Name = reader["Name"].ToString(),
                        Image = reader["Image"].ToString(),
                        Description = reader["Description"].ToString(),
                        Unitsold = Convert.ToInt64(reader["Unitsold"]),
                        Category = reader["Category"].ToString(),
                        Price = Convert.ToInt64(reader["Price"]),
                        Id = new Guid(reader["Id"].ToString())
                    });
                }
            }
            return Ok(products);
        }

        [HttpPost]
        [Route("fetch-products-by-name-and-price")]
        public IActionResult GetByNameAndPrice([FromBody] CatAndPrice name)
        {
            var products = new List<AddProduct>();
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"select * from products where name like'%{name.Category}%' and price between {name.Less} and {name.Greater}", conn);
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    products.Add(new AddProduct
                    {
                        Brand = reader["Brand"].ToString(),
                        Merchantemail = reader["MerchantEmail"].ToString(),
                        Name = reader["Name"].ToString(),
                        Image = reader["Image"].ToString(),
                        Description = reader["Description"].ToString(),
                        Unitsold = Convert.ToInt64(reader["Unitsold"]),
                        Category = reader["Category"].ToString(),
                        Price = Convert.ToInt64(reader["Price"]),
                        Id = new Guid(reader["Id"].ToString())
                    });
                }
            }
            return Ok(products);
        }

        [HttpPut]
        [Route("update-count")]
        public IActionResult UpdateCount([FromBody] ProductModify mod)
        {
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"update products set unitsold=unitsold+{mod.Count} where merchantemail='{mod.Email}' and name='{mod.Productname}'", conn);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
            return Ok();
        }

        [HttpPut]
        [Route("update")]
        public IActionResult Update([FromBody] AddProduct mod)
        {
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"update products set name='{mod.Name}', brand='{mod.Brand}'," +
                    $" merchantemail='{mod.Merchantemail}', unitsold = {mod.Unitsold}, image='{mod.Image}', " +
                    $"description='{mod.Description}', category='{mod.Category}', price={mod.Price} where id='{mod.Id}'", conn);
                conn.Open();
                cmd.ExecuteNonQuery();
            }
            return Ok();
        }
        [HttpDelete]
        [Route("delete")]
        public IActionResult Delete([FromBody] Names name)
        {
            using (SqlConnection conn = new SqlConnection("data source=.; initial catalog=Capstone; integrated security=SSPI"))
            {
                SqlCommand cmd = new SqlCommand($"delete from cart where productid='{name.Name}'", conn);
                conn.Open();
                cmd.ExecuteNonQuery();
                cmd.CommandText = $"delete from products where id='{name.Name}'";
                cmd.ExecuteNonQuery();
            }
            return Ok();
        }
    }
}
