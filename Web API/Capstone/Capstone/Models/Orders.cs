namespace Capstone.Models
{
    public class Orders
    {
        public Guid Id { get; set; }
        public string Productname { get; set; }
        public int Count { get; set; }
        public long Price { get; set; }
        public string Useremail { get; set; }
        public string Address { get; set; }
        public long Zip { get; set; }
        public string Merchantemail { get; set; }
        public string Orderdate { get; set; }
        public string State{ get; set; }
        public string Status { get; set; }
    }
}
