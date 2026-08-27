/**
 * ===================================================================
 * WEDDING & ENGAGEMENT INVITATION CONFIGURATION
 * Lintu & Basil — September 06, 2026
 * ===================================================================
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    bride: {
      name: "Lintu",
      fullName: "Lintu George",
      title: "The Bride",
      avatar: "assets/images/bride_cartoon.jpg",
      parents: "Mr. George T. V. & Mrs. Sani George",
      residence: "Thachalamattathil House, Mulavoor, Muvattupuzha",
      phone: "+917907751171",
      formattedPhone: "7907751171",
      invitationNote: "With love and joy, the family of the bride invites you to celebrate this blessed milestone."
    },

    groom: {
      name: "Basil",
      fullName: "Basil Baby",
      title: "The Groom",
      avatar: "assets/images/groom_cartoon.jpg",
      parents: "Mr. Baby P. J. & Mrs. Salomy Baby",
      residence: "Perumbankudy House, Kothamangalam",
      phone: "+917907751171",
      formattedPhone: "7907751171",
      invitationNote: "With gratitude and joy, the family of the groom invites you to bless this sacred union."
    },
    monogram: "L & B",
    hashtag: "#LintuAndBasil"
  },

  // Event Date & Time
  event: {
    targetDate: "2026-09-06T11:30:00",
    dayOfWeek: "SUNDAY",
    day: "06",
    month: "SEP",
    monthFull: "September",
    year: "2026",
    formattedDate: "Sunday, 06 September 2026",
    ceremonyTime: "11:30 AM",
    lunchTime: "Thereafter for Lunch",
    
    // Calendar Event Info
    calendar: {
      title: "Engagement & Wedding Celebration of Lintu & Basil",
      description: "Join us in celebrating the engagement and wedding celebration of Lintu & Basil at St. Mary's Church Auditorium, Ponnirikaparamb, Mulavoor, Muvattupuzha at 11:30 AM and thereafter for lunch.",
      location: "St. Mary's Church Auditorium, Ponnirikaparamb, Mulavoor, Muvattupuzha, Kerala",
      startIso: "20260906T113000",
      endIso: "20260906T150000"
    }
  },

  // Venue & Location
  venue: {
    name: "St. Mary's Jacobite Syrian Church Auditorium",
    subLocation: "Ponnirikaparamb, Mulavoor",
    city: "Muvattupuzha",
    state: "Kerala",
    fullAddress: "St. Mary's Jacobite Syrian Church Auditorium, Ponnirikaparamb, Mulavoor, Muvattupuzha, Kerala",
    googleMapsUrl: "https://maps.app.goo.gl/nBPsKmjpm6XqVsdw5",
    appleMapsUrl: "https://maps.app.goo.gl/nBPsKmjpm6XqVsdw5",
    embedMapUrl: "https://maps.google.com/maps?q=St.Mary's+Jacobite+Syrian+Church+Mulavoor&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },

  // Invitation Messages from the Card
  messages: {
    scriptureQuote: "“ My beloved is mine, and I am His ”",
    scriptureReference: "(Song of Solomon 2:16)",
    introLine: "Mr. George T. V. & Mrs. Sani George",
    residenceLine: "Thachalamattathil House, Mulavoor, Muvattupuzha",
    inviteBody: "Invites you with your family to celebrate the engagement of our daughter",
    groomSubtitle: "S/o. Mr. Baby P. J. & Mrs. Salomy Baby\nPerumbankudy House, Kothamangalam",
    wishesContact: "Love and wishes from : Basil T. G.",
    phone: "7907751171",
    formattedPhone: "+91 7907751171"
  },

  // Events Timeline
  events: [
    {
      step: "01",
      title: "Engagement Ceremony",
      subtitle: "Sacred Church Service & Blessings",
      time: "11:30 AM",
      badgeText: "Holy Service",
      quote: "✦ United in God’s Eternal Grace ✦",
      description: "Solemn engagement prayer service and divine blessings with family and beloved friends.",
      rituals: ["Solemn Prayer", "Divine Blessings", "Family Felicitations"],
      locationName: "St. Mary's Church Auditorium, Mulavoor",
      mapsUrl: "https://maps.app.goo.gl/nBPsKmjpm6XqVsdw5"
    },
    {
      step: "02",
      title: "Celebration Feast & Lunch",
      subtitle: "Joyful Gathering & Fellowship",
      time: "Thereafter (12:30 PM Onwards)",
      badgeText: "Grand Lunch",
      quote: "✦ Feasting, Love & Warm Wishes ✦",
      description: "Join us for a delicious celebratory lunch, warm conversations, photo moments, and joyful celebrations.",
      rituals: ["Celebration Lunch", "Meet & Congratulate Couple", "Photos & Wishes"],
      locationName: "St. Mary's Church Auditorium, Mulavoor",
      mapsUrl: "https://maps.app.goo.gl/nBPsKmjpm6XqVsdw5"
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
