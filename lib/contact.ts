// Single source for the dealership's contact details.

export const contact = {
  person: "Husein Holjan",
  phoneDisplay: "061 911 654",
  phoneIntl: "38761911654",
  email: "info@carnextsarajevo.com",
  street: "Kasindolska 58, Ilidža",
  city: "71000 Sarajevo",
  hours: [
    { days: "Pon – Pet", time: "09:00 – 17:00" },
    { days: "Subota", time: "09:00 – 14:00" },
  ],
  facebook: "https://www.facebook.com/carnextsarajevo",
  instagram: "https://www.instagram.com/carnextsarajevo/",
}

const mapsQuery = encodeURIComponent(`CarNext, ${contact.street}, ${contact.city}`)

export const contactLinks = {
  tel: `tel:+${contact.phoneIntl}`,
  whatsapp: (text?: string) =>
    `https://wa.me/${contact.phoneIntl}${text ? `?text=${encodeURIComponent(text)}` : ""}`,
  viber: `viber://chat?number=%2B${contact.phoneIntl}`,
  mail: `mailto:${contact.email}`,
  maps: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  mapsEmbed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
}
