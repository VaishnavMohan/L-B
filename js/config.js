/**
 * ===================================================================
 * WEDDING INVITATION CONFIGURATION
 * ===================================================================
 * Easily customize all details: names, date, venue, music, images & links.
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    bride: {
      name: "Dr. Keerthana",
      fullName: "Dr. Keerthana K T",
      title: "The Bride",
      avatar: "assets/images/bride_cartoon.jpg",
      parents: "Mr. Narayanan K T & Mrs. Vasanthi Narayanan",
      residence: "Kattil thazhathethil House, Kololamba, Edappal",
      phone: "+919446162155",
      formattedPhone: "9446162155",
      invitationNote: "With love and happiness, the family of the bride invites you to celebrate this sacred bond."
    },
    groom: {
      name: "Dr. Sarath",
      fullName: "Dr. Sarath",
      title: "The Groom",
      avatar: "assets/images/groom_cartoon.jpg",
      parents: "Mr. Shaji K & Mrs. Sheeja K",
      residence: "Kodakkatt House, Ponnani",
      invitationNote: "With gratitude and joy, the family of the groom invites you to bless this beautiful union."
    },
    heroImage: "assets/images/couple_cartoon_hero.jpg",
    monogram: "K & S",
    hashtag: "#KeerthanaWedsSarath"
  },

  // Wedding Date & Time
  event: {
    targetDate: "2026-09-13T09:30:00",
    dayOfWeek: "SUNDAY",
    day: "13",
    month: "SEP",
    monthFull: "September",
    year: "2026",
    formattedDate: "Sunday, 13 September 2026",
    
    // Ceremony Timings
    muhurthamTime: "Between 9:30 AM – 10:30 AM",
    receptionTime: "11:30 AM Onwards (Grand Sadhya Feast)",
    
    // Calendar Event Info
    calendar: {
      title: "Wedding of Dr. Keerthana & Dr. Sarath",
      description: "Join us in celebrating the auspicious wedding ceremony of Dr. Keerthana and Dr. Sarath at Puzhayoram Gardens Convention Centre, Thrissur.",
      location: "Puzhayoram Gardens Convention Centre, Eravimangalam, Nadathara, Thrissur, Kerala",
      startIso: "20260913T093000",
      endIso: "20260913T140000"
    }
  },

  // Venue & Location
  venue: {
    name: "Puzhayoram Gardens Convention Centre",
    subLocation: "Eravimangalam, Nadathara",
    city: "Thrissur",
    state: "Kerala",
    fullAddress: "Puzhayoram Gardens Convention Centre, Eravimangalam, Nadathara, Thrissur, Kerala - 680751",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Puzhayoram+Gardens+Convention+Centre+Nadathara+Thrissur",
    appleMapsUrl: "https://maps.apple.com/?q=Puzhayoram+Gardens+Convention+Centre+Thrissur",
    image: "assets/images/venue.jpg",
    embedMapUrl: "https://maps.google.com/maps?q=Puzhayoram+Gardens+Convention+Centre+Nadathara+Thrissur&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },

  // Invitation Messages
  messages: {
    ganeshaBlessing: "✦ With Joyful Hearts & Family Blessings ✦",
    divineQuote: "Together with their families",
    introLine: "We, Mr. Narayanan K T & Mrs. Vasanthi Narayanan",
    residenceLine: "Kattil thazhathethil House, Kololamba, Edappal (Mob: 9446162155)",
    inviteBody: "are extremely glad to invite you and your family to the wedding of our beloved daughter",
    groomSubtitle: "S/o. Mr. Shaji K & Mrs. Sheeja K\nKodakkatt House, Ponnani",
    compliments: "With best compliments from:\nFriends and Family",
    emotionalQuote: "“Two hearts, one love, forever blessed. Together with our families, we joyfully step into a lifetime of happiness, shared dreams, and endless love.”"
  },

  // Background Audio - Exact cut of O Rangrez from reference site
  audio: {
    src: "assets/audio/wedding-music.mp3",
    title: "O Rangrez (Wedding Music)",
    autoPlayOnOpen: true,
    defaultVolume: 0.8
  },

  // Scratch Card Settings
  scratchCard: {
    title: "Save The Auspicious Date",
    instructions: "✨ Scratch the golden foil below to reveal the date & muhurtham ✨",
    scratchPercentToUnlock: 40
  },

  // Wedding Events (Ceremony Timeline & Traditional Feast)
  events: [
    {
      step: "01",
      title: "Thalikettu & Muhurtham",
      subtitle: "The Sacred Wedding Ceremony",
      time: "9:30 AM – 10:30 AM",
      badgeText: "Auspicious Muhurtham",
      iconSvg: "lamp",
      sanskritQuote: "✦ The Sacred Union of Two Hearts ✦",
      description: "The traditional Kerala wedding rituals including Kanyadhanam, Tying of the auspicious Mangalsutra Thali at the wedding mandap, and exchange of wedding garlands celebrating everlasting companionship.",
      rituals: ["Thalikettu Ritual", "Pudavamuri Exchange", "Mandap Blessings & Garlands"],
      locationName: "Puzhayoram Gardens, Thrissur",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Puzhayoram+Gardens+Convention+Centre+Nadathara+Thrissur"
    },
    {
      step: "02",
      title: "Grand Wedding Sadhya",
      subtitle: "Traditional Feast & Blessings",
      time: "11:30 AM Onwards",
      badgeText: "Traditional Sadhya",
      iconSvg: "feast",
      sanskritQuote: "✦ Feasting, Joy & Celebrations ✦",
      description: "Join the newlyweds and families for a celebratory feast featuring an authentic royal Kerala Sadhya served on fresh banana leaves with traditional payasams and heartfelt moments.",
      rituals: ["Traditional Kerala Sadhya", "Meet & Congratulate the Couple", "Family Blessings & Photos"],
      locationName: "Puzhayoram Gardens, Thrissur",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Puzhayoram+Gardens+Convention+Centre+Nadathara+Thrissur"
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
