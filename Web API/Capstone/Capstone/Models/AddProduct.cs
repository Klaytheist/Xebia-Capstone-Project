namespace Capstone.Models
{
    public class AddProduct
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public string Merchantemail { get; set; }
        public string Image { get; set; }
        public long Unitsold { get; set; }
        public string Category { get; set; }
        public long Price { get; set; }
    }
}
