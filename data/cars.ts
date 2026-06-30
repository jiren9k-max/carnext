export interface DemoCar {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuelType: string
  transmission: string
  bodyType: string
  images: string[]
  badges: ("novo" | "top-ponuda" | "akcija" | "rezervisano" | "prodano")[]
}

export const demoCars: DemoCar[] = [
  {
    id: "1",
    make: "Škoda",
    model: "Kamiq 1.0 TSI Automatik Full",
    year: 2021,
    price: 32900,
    mileage: 140000,
    fuelType: "Benzin",
    transmission: "Automatik",
    bodyType: "SUV",
    images: [
      "https://d4n0y8dshd77z.cloudfront.net/listings/76175233/lg/img-1777379654-57f2ce7ba1c0.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/76175233/lg/img-1777379705-899675b0ac1d.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/76175233/lg/img-1777379751-7b2942e97066.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/76175233/lg/img-1777379781-58176ff08a4a.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/76175233/lg/img-1777379815-82322c19c034.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/76175233/lg/img-1777379845-31bb9d99f660.jpeg",
    ],
    badges: ["novo", "top-ponuda"],
  },
  {
    id: "2",
    make: "Peugeot",
    model: "3008 GT Line Automatik",
    year: 2019,
    price: 34900,
    mileage: 140000,
    fuelType: "Dizel",
    transmission: "Automatik",
    bodyType: "SUV",
    images: [
      "https://d4n0y8dshd77z.cloudfront.net/listings/75786536/lg/img-1776083844-e2ad1197edff.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/75786536/lg/img-1776083852-0ca27635273b.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/75786536/lg/img-1776083863-90fc4448518d.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/75786536/lg/img-1776083890-dd9bb7a750d4.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/75786536/lg/img-1776083902-707dd65260e0.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/75786536/lg/img-1776083913-b83bbe1458b4.jpeg",
    ],
    badges: ["top-ponuda"],
  },
  {
    id: "3",
    make: "Škoda",
    model: "Octavia 1.6 TDI DSG",
    year: 2019,
    price: 23900,
    mileage: 190000,
    fuelType: "Dizel",
    transmission: "Automatik",
    bodyType: "Limuzina",
    images: [
      "https://d4n0y8dshd77z.cloudfront.net/listings/70219618/lg/img-1755675169-2a5b1ab3aaae.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/70219618/lg/img-1755675198-55b0ff872d07.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/70219618/lg/img-1755675229-5806fb6020d3.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/70219618/lg/img-1755675252-2cdf87f92d0c.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/70219618/lg/img-1755675287-87b40c751e0a.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/70219618/lg/img-1755675316-d33efde016dc.jpeg",
    ],
    badges: ["akcija"],
  },
  {
    id: "4",
    make: "Renault",
    model: "Megane 1.5 Dci",
    year: 2019,
    price: 18900,
    mileage: 200000,
    fuelType: "Dizel",
    transmission: "Manuelni",
    bodyType: "Hečbek",
    images: [
      "https://d4n0y8dshd77z.cloudfront.net/listings/75883848/lg/img-1776407817-e2cc5ba66c17.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/75883848/lg/img-1776407842-bcb3059b6d62.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/75883848/lg/img-1776407869-61a4c7b5031b.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/75883848/lg/img-1776407905-c092e32d4c5a.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/75883848/lg/img-1776407938-26ccf10b7ad1.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/75883848/lg/img-1776407975-d8e78d6fd159.jpeg",
    ],
    badges: [],
  },
  {
    id: "5",
    make: "Peugeot",
    model: "208 1.5 BlueHDi",
    year: 2019,
    price: 16400,
    mileage: 114000,
    fuelType: "Dizel",
    transmission: "Manuelni",
    bodyType: "Hečbek",
    images: [
      "https://d4n0y8dshd77z.cloudfront.net/listings/68229823/lg/img-1747416126-79ac9dd1c5d8.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/68229823/lg/img-1747416193-4bc09cca1ae5.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/68229823/lg/img-1747416186-2da5c77c99b5.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/68229823/lg/img-1747416219-aab0897c574d.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/68229823/lg/img-1747416134-94c19e755fc4.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/68229823/lg/img-1747416142-af86ecaeaf80.jpeg",
    ],
    badges: ["novo"],
  },
  {
    id: "6",
    make: "Kia",
    model: "Ceed 1.6 CRDI",
    year: 2015,
    price: 11900,
    mileage: 180000,
    fuelType: "Dizel",
    transmission: "Manuelni",
    bodyType: "Hečbek",
    images: [
      "https://d4n0y8dshd77z.cloudfront.net/listings/77070035/lg/img-1780501651-b70f7d79a71f.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/77070035/lg/img-1780501674-58cda3c2e8fe.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/77070035/lg/img-1780501702-2fe83ce60292.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/77070035/lg/img-1780501721-afc6ab70ef88.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/77070035/lg/img-1780501788-572922fd6242.jpeg",
      "https://d4n0y8dshd77z.cloudfront.net/listings/77070035/lg/img-1780501819-fc1c27216bb2.jpeg",
    ],
    badges: [],
  },
]
