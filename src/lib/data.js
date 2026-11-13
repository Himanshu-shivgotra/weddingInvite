// Central content for the invitation.

export const couple = {
  bride: {
    name: 'Princy',
    parents: 'D/o Smt. Sushma Kumari & Sh. Surjeet Kumar',
    city: 'Jammu',
    ig: 'shivgotra_princy',
  },
  groom: {
    name: 'Sahil Karlupia',
    parents: 'S/o Smt. Sudhesh Kumari & Sh. Vijay Kumar',
    city: 'Punjab',
    ig: 's__karlupia',
  },
}

// Main event used for the live countdown (the Barat / wedding day).
export const weddingDate = new Date('2026-12-04T18:00:00+05:30')

export const venue = {
  name: 'Vivah Vatika Banquet',
  address:
    'QRX5+335, Raipur, Domana, Jammu, Jammu and Kashmir 181123',
  mapUrl: 'https://share.google/2VezHMV7FFV8Rd5u6',
  mapEmbed:
    'https://www.google.com/maps?q=Vivah+Vatika+Banquet+Domana+Jammu&output=embed',
}

// Ordered ceremony timeline.
export const events = [
  {
    key: 'khulle-shagun',
    name: 'Khulle Shagun',
    date: '2026-11-23',
    dateLabel: '23 November 2026',
    weekday: 'Monday',
    blurb: 'Where it all begins — the first blessings and a promise made.',
    palette: 'from-rose/40 to-maroon/40',
    accent: '#B23A48',
    image: '/images/sangeet.jpg',
  },
  {
    key: 'haldi',
    name: 'Haldi',
    date: '2026-12-01',
    dateLabel: '1 December 2026',
    weekday: 'Tuesday',
    blurb: 'Same people, same madness — brighter together in a wash of gold.',
    palette: 'from-marigold/50 to-lightgold/40',
    accent: '#E7A11A',
    image: '/images/haldi.jpg',
  },
  {
    key: 'jaago',
    name: 'Jaago',
    date: '2026-12-01',
    dateLabel: '1 December 2026',
    weekday: 'Tuesday',
    blurb: 'Lamps ablaze, the night sings — the family stays awake in joy.',
    palette: 'from-marigold/40 to-rose/40',
    accent: '#E7A11A',
    image: '/images/jago.jpg',
  },
  {
    key: 'bangle',
    name: 'Bangle Ceremony',
    date: '2026-12-01',
    dateLabel: '1 December 2026',
    weekday: 'Tuesday',
    blurb: 'Chooda and colour — bangles that carry a thousand blessings.',
    palette: 'from-rose/40 to-blush/30',
    accent: '#B23A48',
    image: '/images/bangle.jpg',
  },
  {
    key: 'shagun',
    name: 'Shagun',
    date: '2026-12-03',
    dateLabel: '3 December 2026',
    weekday: 'Thursday',
    blurb: 'Tokens of love exchanged between two families becoming one.',
    palette: 'from-gold/40 to-maroon/40',
    accent: '#C9A24B',
    image: '/images/welcome.jpg',
  },
  {
    key: 'mehandi',
    name: 'Mehandi',
    date: '2026-12-03',
    dateLabel: '3 December 2026',
    weekday: 'Thursday',
    blurb: 'Good hands, happier stories — henna deep, love deeper.',
    palette: 'from-henna/50 to-marigold/30',
    accent: '#2F5233',
    image: '/images/mehndi.jpg',
  },
  {
    key: 'saant',
    name: 'Saant',
    date: '2026-12-04',
    dateLabel: '4 December 2026',
    weekday: 'Friday',
    blurb: 'The auspicious ritual of turmeric and grace before the vows.',
    palette: 'from-marigold/40 to-gold/40',
    accent: '#E7A11A',
    image: '/images/saant.jpg',
  },
  {
    key: 'barat',
    name: 'Barat',
    date: '2026-12-04',
    dateLabel: '4 December 2026',
    weekday: 'Friday',
    blurb: 'The grand arrival — dhol, dance and a groom on his way to forever.',
    palette: 'from-maroon/60 to-deepmaroon/60',
    accent: '#5A1220',
    image: '/images/barat.jpg',
    isMain: true,
  },
  {
    key: 'doli',
    name: 'Doli',
    date: '2026-12-05',
    dateLabel: '5 December 2026',
    weekday: 'Saturday',
    blurb: 'A tender farewell as our forever begins — Sahil & Princy, together.',
    palette: 'from-blush/40 to-rose/40',
    accent: '#E9B7B0',
    image: '/images/doli.jpg',
  },
]

// Guests confirm via WhatsApp — simple, no backend.
export const rsvpWhatsApp = {
  // Replace with the host's number in international format, no +/spaces.
  number: '916006028778',
  message:
    'Hello! I would love to attend Princy & Sahil’s wedding celebrations. My RSVP: ',
}
