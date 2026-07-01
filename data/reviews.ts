export interface Review {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  comment: string
  purchased: string
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Marko Petrović",
    role: "Vlasnik BMW M5",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Izuzetno profesionalan pristup od prvog kontakta. Vozilo je bilo u savršenom stanju, tačno kako je opisano. Sve preporuke za CarNext!",
    purchased: "BMW M5 Competition, 2023",
  },
  {
    id: "2",
    name: "Ana Jurić",
    role: "Vlasnica Porsche 911",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Kupovina auta iz snova nikad nije bila lakša. Tim CarNext-a je bio izuzetno profesionalan i transparentan. Porsche 911 je više nego savršen.",
    purchased: "Porsche 911 Carrera 4S, 2024",
  },
  {
    id: "3",
    name: "Ivan Kovačević",
    role: "Vlasnik Mercedes GLC",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Odlično iskustvo! Vozilo je pregledano, servisirano i spremno za preuzimanje. Transparentna komunikacija i fer cijena. Hvala CarNext timu.",
    purchased: "Mercedes-Benz GLC 300, 2023",
  },
  {
    id: "4",
    name: "Milan Jovanović",
    role: "Vlasnik Audi A6",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Prezadovoljan sam kupovinom. Auto je kao nov, a cijena je bila vrlo povoljna. Sve pohvale za CarNext ekipu!",
    purchased: "Audi A6 Avant, 2022",
  },
  {
    id: "5",
    name: "Petra Novak",
    role: "Vlasnica Tesle Model Y",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 4,
    comment:
      "Profesionalna usluga i brz odgovor na sve upite. Jedina mana je što nisu imali više Tesla modela na izbor. Ali sam i više nego zadovoljna.",
    purchased: "Tesla Model Y Performance, 2024",
  },
  {
    id: "6",
    name: "Tomislav Horvat",
    role: "Vlasnik Audi RS6",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Vrhunska usluga! Doveo sam auto iz drugog grada na testnu vožnju bez ikakvih problema. Sve je prošlo glatko i profesionalno. Preporučujem svima.",
    purchased: "Audi RS6 Avant, 2023",
  },
  {
    id: "7",
    name: "Maja Šimić",
    role: "Vlasnica Range Rover Sport",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Neverovatno iskustvo! Dobila sam sve informacije o vozilu unapred, uključujući i detaljan izveštaj o stanju. Kupovina bez stresa i briga.",
    purchased: "Range Rover Sport SV, 2024",
  },
  {
    id: "8",
    name: "Nikola Radić",
    role: "Vlasnik Mercedesa E klasa",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Auto je stigao u besprijekornom stanju. Hvala CarNextu na korektnoj usluzi i poštenoj cijeni. Toplo preporučujem!",
    purchased: "Mercedes-Benz E 220 d, 2023",
  },
  {
    id: "9",
    name: "Lejla Hadžić",
    role: "Vlasnica BMW X3",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Kupovina preko CarNext-a je bilo najlakše iskustvo ikad. Sve je objašnjeno detaljno, bez ikakvog pritiska. Jedva čekam novi auto!",
    purchased: "BMW X3 M40d, 2022",
  },
  {
    id: "10",
    name: "Ivan Perić",
    role: "Vlasnik Škode Octavia",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 4,
    comment:
      "Zadovoljan sam kupovinom. Auto odgovara opisu, a usluga je bila brza i profesionalna. Preporučujem svima koji traže pouzdanog partnera.",
    purchased: "Škoda Octavia RS, 2021",
  },
  {
    id: "11",
    name: "Amra Selimović",
    role: "Vlasnica VW Golf",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Hvala CarNext timu na strpljenju i trudu. Našli su savršen auto za mene i sve je prošlo bez ikakvih problema. Prezadovoljna sam!",
    purchased: "Volkswagen Golf 8, 2024",
  },
  {
    id: "12",
    name: "Stefan Đorđević",
    role: "Vlasnik Porsche Cayenne",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Vrhunski nivo usluge! Auto je bio besprekoran, a cela procedura kupovine je obavljena brzo i profesionalno. Svaka čast!",
    purchased: "Porsche Cayenne S, 2023",
  },
]
