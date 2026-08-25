/**
 * ===================================================================
 * GROOM & BRIDE HOSTED WEDDING RECEPTION CONFIGURATION
 * ===================================================================
 * Configured specifically for Dr. Sarath & Dr. Keerthana's Reception.
 */

const WEDDING_CONFIG = {
  isReception: true,
  rsvpPhone: "9497387010",

  // Couple Information (Couple-Hosted Theme)
  couple: {
    groom: {
      name: "Dr. Sarath",
      fullName: "Dr. Sarath",
      title: "The Groom",
      avatar: "assets/images/groom_cartoon.jpg",
      parents: "Mr. Shaji K & Mrs. Sheeja K",
      residence: "Kodakkat House, Ponnani",
      phone: "+919497387010",
      formattedPhone: "9497387010",
      invitationNote: "Together with our families, we joyfully invite you to celebrate our special day."
    },
    bride: {
      name: "Dr. Keerthana",
      fullName: "Dr. Keerthana",
      title: "The Bride",
      avatar: "assets/images/bride_cartoon.jpg",
      parents: "Mr. Narayanan & Mrs. Vasanthi",
      residence: "Kattil Thazhathethil House, Kololamba",
      phone: "+919497387010",
      formattedPhone: "9497387010",
      invitationNote: "With love and happiness, we invite you to be part of our wedding celebrations."
    },
    heroImage: "assets/images/couple_cartoon_hero.jpg",
    monogram: "S & K",
    hashtag: "#SarathWedsKeerthana"
  },

  // Wedding Date & Time (Reception)
  event: {
    targetDate: "2026-09-13T17:00:00",
    dayOfWeek: "SUNDAY",
    day: "13",
    month: "SEP",
    monthFull: "September",
    year: "2026",
    formattedDate: "Sunday, 13 September 2026",
    
    // Ceremony Timings
    muhurthamTime: "5:00 PM to 8:00 PM",
    receptionTime: "5:00 PM to 8:00 PM (Grand Wedding Reception & Dinner)",
    
    // Calendar Event Info
    calendar: {
      title: "Wedding Reception of Dr. Sarath & Dr. Keerthana",
      description: "Join us for the wedding reception of Dr. Sarath & Dr. Keerthana at PV Regency, Eramangalam.",
      location: "PV Regency, Eramangalam, Veliancode, Kerala",
      startIso: "20260913T170000",
      endIso: "20260913T200000"
    }
  },

  // Venue & Location (PV Regency Eramangalam)
  venue: {
    name: "PV Regency",
    subLocation: "Eramangalam",
    city: "Eramangalam, Ponnani",
    state: "Kerala",
    fullAddress: "PV Regency, Eramangalam, Veliancode, Kerala - 679587",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=PV+Regency+Auditorium+Eramangalam+Kerala",
    appleMapsUrl: "https://maps.apple.com/?q=PV+Regency+Eramangalam+Kerala",
    image: "assets/images/venue_pv_regency.jpg",
    embedMapUrl: "https://maps.google.com/maps?q=PV+Regency+Auditorium+Eramangalam+Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },

  // Invitation Messages (Couple-Hosted Perspective)
  messages: {
    topVerse: "“Two hearts, two lives, joined together in friendship, united forever in love”",
    ganeshaBlessing: "✦ TOGETHER WITH OUR FAMILIES ✦",
    divineQuote: "With the divine blessings of Almighty and our beloved parents",
    introLine: "We, Sarath & Keerthana",
    residenceLine: "Kodakkat House, Ponnani",
    inviteBody: "cordially invite your esteemed presence with family for our wedding reception",
    groomName: "SARATH",
    brideName: "KEERTHANA",
    compliments: "Sharing the happiness :\nDear & Near",
    emotionalQuote: "“Two hearts, two lives, joined together in friendship, united forever in love. With the blessings of our parents and elders, we joyfully step into a lifetime of shared dreams and happiness.”"
  },

  // Background Audio
  audio: {
    src: "assets/audio/wedding-music.mp3",
    title: "O Rangrez (Wedding Music)",
    autoPlayOnOpen: true,
    defaultVolume: 0.8
  },

  // Wedding Events (Groom's Reception Timeline)
  events: [
    {
      step: "01",
      title: "Grand Wedding Reception",
      subtitle: "Evening Celebrations & Dinner",
      time: "5:00 PM to 8:00 PM",
      badgeText: "Grand Reception",
      iconSvg: "feast",
      sanskritQuote: "✦ Celebrations, Joy & Warm Felicitations ✦",
      description: "We cordially invite you and your family to join us as we celebrate our wedding reception. Join us for an auspicious evening of felicitations, joyous moments, and dinner.",
      rituals: ["Meet & Greet the Couple", "Evening Dinner & Delicacies", "Sharing the happiness : Dear & Near"],
      locationName: "PV Regency, Eramangalam",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=PV+Regency+Auditorium+Eramangalam+Kerala"
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.WEDDING_CONFIG = WEDDING_CONFIG;
}
