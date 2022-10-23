export interface Cart {
  id: string,
  productid: string,
  useremail: string | null,
  merchantemail: string | null,
  count: number,
  productname: string,
  price: number
}
