namespace Capstone.Models
{
    public class Cart
    {
        public Guid Id { get; set; }
        public string Productid { get; set; }
        public string Useremail { get; set; }
        public string Merchantemail { get; set; }
        public int Count { get; set; }
        public string Productname { get; set; }
        public long Price { get; set; }
    }
}
