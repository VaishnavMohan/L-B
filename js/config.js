/**
 * ===================================================================
 * WEDDING INVITATION CONFIGURATION
 * Ashin & Vrinda — Sunday, September 06, 2026 (1202 Chingam 21)
 * ===================================================================
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: {
      name: "Ashin",
      fullName: "Ashin Ajith",
      title: "The Groom",
      avatar: "assets/images/couple_portrait.jpg",
      parents: "Mrs. Sheeja Ajith Kumar & Mr. Ajith Kumar",
      residence: "Ambalathingal House, Vadakkathara Road, Poonithura P.O., Pettah, Ernakulam",
      phone: "+919497679581",
      formattedPhone: "94976 79581",
      invitationNote: "With warm hearts and folded hands, we cordially invite you with family to bless our sacred union."
    },

    bride: {
      name: "Vrinda",
      fullName: "Vrinda Sudhakaran",
      title: "The Bride",
      avatar: "assets/images/couple_portrait.jpg",
      parents: "Mrs. Sini. K. Damodharan & Mr. Sudhakaran",
      residence: "Kunnumpurathu House, B.P.C. College Jn., Mulakkulam North, Piravom",
      phone: "+918590758807",
      formattedPhone: "85907 58807",
      invitationNote: "With love, joy, and gratitude, we invite you to celebrate this blessed milestone in our lives."
    },
    monogram: "A & V",
    hashtag: "#AshinWedsVrinda"
  },

  // Event Date & Time
  event: {
    targetDate: "2026-09-06T11:59:00",
    dayOfWeek: "SUNDAY",
    day: "06",
    month: "SEP",
    monthFull: "September",
    year: "2026",
    formattedDate: "Sunday, 06 September 2026",
    traditionalDate: "1202 Chingam - 21",
    muhurthamTime: "Between 11.59 a.m. and 12.20 p.m.",
    lunchTime: "For Lunch Thereafter",
    
    // Calendar Event Info
    calendar: {
      title: "Wedding of Ashin & Vrinda",
      description: "Marriage ceremony of Ashin & Vrinda on Sunday, 06 September 2026 (1202 Chingam 21) at Pet Rose Event Centre Pathammile, Puthencruz. Muhurtham: Between 11.59 a.m. and 12.20 p.m., followed by celebratory lunch.",
      location: "Pet Rose Event Centre, Pathammile, Puthencruz, Kerala",
      startIso: "20260906T115900",
      endIso: "20260906T153000"
    }
  },

  // Venue & Location
  venue: {
    name: "Pet Rose Event Centre",
    subLocation: "Pathammile, Puthencruz",
    city: "Ernakulam",
    state: "Kerala",
    fullAddress: "Pet Rose Event Centre, Pathammile, Vadayampady P.O., Puthencruz, Ernakulam, Kerala 682308",
    googleMapsUrl: "https://share.google/MXy8X1QMQs6zt7JF0",
    appleMapsUrl: "https://maps.apple.com/?q=Pet+Rose+Event+Centre+Puthencruz"
  },

  // Invitation Messages from the Card
  messages: {
    hostsLine: "Mrs. Sheeja Ajith Kumar & Mr. Ajith Kumar",
    hostsResidence: "Ambalathingal House, Vadakkathara Road, Poonithura P.O., Pettah, Ernakulam",
    inviteStatement: "cordially invite your esteemed presence with family on the occasion of the marriage of our son",
    groomName: "Ashin",
    wedsText: "Weds",
    brideName: "Vrinda",
    brideParents: "D/o Mrs. Sini. K. Damodharan & Mr. Sudhakaran",
    brideResidence: "Kunnumpurathu House, B.P.C. College Jn., Mulakkulam North, Piravom",
    dateText: "on Sunday 6th September 2026",
    malayalamDate: "(1202 Chingam - 21)",
    venueText: "at Pet Rose Event Centre Pathammile, Puthencruz.",
    lunchText: "and for Lunch thereafter",
    muhurthamText: "Muhurtham : Between 11.59 a.m. and 12.20 p.m.",
    wishesLead: "With best Wishes :",
    wishesNames: "Rajamma Padmanabhan,\nAbhin Ajith",
    phone1: "94976 79581",
    phone2: "85907 58807",
    phone1Raw: "+919497679581",
    phone2Raw: "+918590758807"
  },

  // Events Timeline
  events: [
    {
      step: "01",
      title: "Wedding Muhurtham Ceremony",
      subtitle: "Sacred Thalikettu & Divine Rituals",
      time: "Between 11:59 AM and 12:20 PM",
      badgeText: "Auspicious Muhurtham",
      quote: "✦ 1202 Chingam - 21 ✦",
      description: "Sacred marriage rituals, Thalikettu, garland exchange, and receiving divine blessings in the presence of family and loved ones.",
      rituals: ["Traditional Rites", "Thalikettu & Garlands", "Elders' Blessings"],
      locationName: "Pet Rose Event Centre, Pathammile, Puthencruz",
      mapsUrl: "https://share.google/MXy8X1QMQs6zt7JF0"
    },
    {
      step: "02",
      title: "Celebration Feast & Lunch",
      subtitle: "Grand Wedding Sadhya & Fellowship",
      time: "Thereafter (12:30 PM Onwards)",
      badgeText: "Grand Wedding Sadhya",
      quote: "✦ Feasting, Joy & Celebrations ✦",
      description: "Join us for a royal traditional Kerala wedding feast, heartfelt conversations, congratulations, and memorable moments with the couple.",
      rituals: ["Royal Kerala Sadhya", "Meet & Congratulate", "Photos & Fellowship"],
      locationName: "Pet Rose Event Centre, Pathammile, Puthencruz",
      mapsUrl: "https://share.google/MXy8X1QMQs6zt7JF0"
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
