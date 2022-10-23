export interface Orders {
  id: string,
  productname: string | null,
  count: number,
  price: number,
  useremail: string | null,
  address: string | null,
  zip: number,
  merchantemail: string | null,
  orderdate: string | null,
  state: string | null,
  status: string | null
}
