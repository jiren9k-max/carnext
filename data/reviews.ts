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
    name: "Petra Novak",
    role: "Vlasnica Tesla Model Y",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 4,
    comment:
      "Profesionalna usluga i brz odgovor na sve upite. Jedina mana je što nisu imali više Tesla modela na izbor. Ali sam i više nego zadovoljna.",
    purchased: "Tesla Model Y Performance, 2024",
  },
  {
    id: "5",
    name: "Tomislav Horvat",
    role: "Vlasnik Audi RS6",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Vrhunska usluga! Doveo sam auto iz drugog grada na testnu vožnju bez ikakvih problema. Sve je prošlo glatko i profesionalno. Preporučujem svima.",
    purchased: "Audi RS6 Avant, 2023",
  },
  {
    id: "6",
    name: "Maja Šimić",
    role: "Vlasnica Range Rover Sport",
    avatar: "/images/avatar-placeholder.jpg",
    rating: 5,
    comment:
      "Neverovatno iskustvo! Dobila sam sve informacije o vozilu unapred, uključujući i detaljan izveštaj o stanju. Kupovina bez stresa i briga.",
    purchased: "Range Rover Sport SV, 2024",
  },
]
