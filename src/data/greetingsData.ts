/**
 * Dynamic AI-crafted welcome and announcement greetings
 * Strictly determined by current Day of Week and Time of Day.
 * Returns at least 6 clever, smart rotating messages per period with deep weekday awareness.
 * Avoids naming specific dishes to ensure availability consistency while keeping messages enticing,
 * atmospheric, and timely.
 */

export interface DayTimeContext {
  dayName: string;
  dayIndex: number; // 0 = Sun, 1 = Mon, ... 5 = Fri, 6 = Sat
  timePeriod: 'morning' | 'lunch' | 'afternoon' | 'dinner' | 'late-night';
  formattedTime: string;
}

export function getDayTimeContext(date: Date = new Date()): DayTimeContext {
  const dayIndex = date.getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[dayIndex];
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let timePeriod: 'morning' | 'lunch' | 'afternoon' | 'dinner' | 'late-night' = 'dinner';
  if (hours < 11) {
    timePeriod = 'morning';
  } else if (hours >= 11 && hours < 15) {
    timePeriod = 'lunch';
  } else if (hours >= 15 && hours < 17) {
    timePeriod = 'afternoon';
  } else if (hours >= 17 && hours < 22) {
    timePeriod = 'dinner';
  } else {
    timePeriod = 'late-night';
  }

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMins = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTime = `${displayHours}:${displayMins} ${ampm}`;

  return {
    dayName,
    dayIndex,
    timePeriod,
    formattedTime,
  };
}

/**
 * Returns at least 6 clever, smart messages tailored to the exact day & time.
 * Generic references to time of day, weekday mood, atmosphere, and service.
 * Free of specific menu item names.
 */
export function getRotatingHeroMessages(date: Date = new Date()): string[] {
  const { dayIndex, timePeriod } = getDayTimeContext(date);

  const isDaytime = timePeriod === 'morning' || timePeriod === 'lunch';

  // =========================================================================
  // FRIDAY (Day 5) — De-Stress & Weekend Kickoff
  // =========================================================================
  if (dayIndex === 5) {
    if (isDaytime) {
      return [
        "It's Friday — time to de-stress! Kick off your weekend early with our Express Lunch Specials.",
        "It's almost lunch (11:30 AM) — order online for quick pickup or come join us on Santa Monica Blvd.",
        "Celebrate the end of the work week with freshly prepared midday platters and authentic hospitality.",
        "Friday lunch made effortless: Enjoy complimentary guest valet parking right at our front doors.",
        "Beat the Friday rush — place your midday order online or dine in for a well-deserved break.",
        "Your Friday table awaits: Relax in our comfortable dining room with fast, attentive service.",
        "A golden Friday afternoon starts with warm Persian hospitality and prompt culinary service.",
      ];
    }
    // Friday Evening & Night
    return [
      "It's Friday night — time to de-stress with flame-grilled entrees, fine cocktails, and live music.",
      "Friday Night Cabaret: Vibrant stage rhythms, extraordinary culinary craft, and electric atmosphere.",
      "Unwind from the work week: 40 years of culinary mastery and warm ambient dinner seating.",
      "Friday evening service is underway — reserve your concert-side table or order dinner online.",
      "The weekend celebration begins tonight: Open flames, handcrafted drinks, and unforgettable entertainment.",
      "Zero parking hassle in West LA — complimentary guest valet waiting at our entrance.",
      "Treat yourself after a long week: Savor exquisite dinner courses under warm ambient chandeliers.",
    ];
  }

  // =========================================================================
  // SATURDAY (Day 6) — Weekend Gala & Leisure Atmosphere
  // =========================================================================
  if (dayIndex === 6) {
    if (isDaytime) {
      return [
        "Saturday leisure lunch: Relax and indulge in our freshly crafted daytime specialties.",
        "It's lunchtime in West LA! Order online for swift pickup or join us for a leisurely midday feast.",
        "Take a break from your weekend adventures — dine in with complimentary valet on Santa Monica Blvd.",
        "Saturday midday made easy: Wholesome recipes, aromatic basmati rice, and generous lunch portions.",
        "Gather friends and family for an effortless Saturday lunch in our inviting dining room.",
        "Fast, nourishing, and authentic — pre-order your Saturday lunch in seconds online.",
      ];
    }
    // Saturday Dinner & Night
    return [
      "Saturday Night Gala: Live stage performances, world music energy, and royal dinner banquets.",
      "The weekend celebration in full swing: Chef-curated evening entrees, artisanal cocktails, and music.",
      "Experience the pulse of West LA nightlife with signature flame-broiled specialties and live vocalists.",
      "Saturday dinner reservations: Secure your prime stage-view table or order a gourmet feast to-go.",
      "An evening to remember: Authentic Persian heritage, warm hospitality, and lively Saturday ambiance.",
      "Complimentary guest valet parking available all evening right on Santa Monica Boulevard.",
    ];
  }

  // =========================================================================
  // SUNDAY (Day 0) — Family Table Tradition & Soothing Wind-Down
  // =========================================================================
  if (dayIndex === 0) {
    if (isDaytime) {
      return [
        "Sunday lunch gathering: Wholesome midday plates, fresh garden herbs, and warm hospitality.",
        "It's almost lunch! Order online for rapid takeaway or gather family for a peaceful midday meal.",
        "Sunday Lunch Specials: Freshly prepared chef favorites served in a warm, welcoming setting.",
        "Effortless Sunday dining: Complimentary guest valet right at our front doors on Santa Monica Blvd.",
        "Treat the whole family to traditional culinary artistry crafted fresh from the charcoal grill.",
        "Pre-order your Sunday lunch online in seconds for seamless curbside pickup or delivery.",
      ];
    }
    // Sunday Dinner & Night
    return [
      "Sunday Family Table: Gather over comforting slow-simmered dishes and fragrant saffron rice.",
      "Wind down your weekend with soothing melodies, tender chef specialties, and fine wines.",
      "An intimate Sunday dinner: 40 years of authentic culinary mastery and heartfelt service.",
      "A peaceful conclusion to the weekend with warm ambient seating and relaxed dinner service.",
      "Reserve an intimate table for tonight or order a comforting family dinner feast online.",
      "Enjoy effortless arrival with complimentary valet parking right on Santa Monica Boulevard.",
    ];
  }

  // =========================================================================
  // MONDAY (Day 1) — Fresh Start & Energizing Midday
  // =========================================================================
  if (dayIndex === 1) {
    if (isDaytime) {
      return [
        "Fresh Start Monday: Light, wholesome lunch platters with crisp salads and fragrant rice.",
        "It's almost lunch (11:30 AM)! Order our Express Lunch online for rapid midday takeaway.",
        "Fuel your week with healthy, high-protein recipes prepared fresh to order on open flames.",
        "Beat the Monday rush — order online ahead of time or dine in with complimentary valet.",
        "Quick, satisfying Monday recharge: Flavorful culinary craft served without the wait.",
        "Start your week on an inspiring note with authentic hospitality on Santa Monica Boulevard.",
      ];
    }
    // Monday Dinner & Night
    return [
      "Beat the Monday rush — unwind with an intimate dinner and warm ambient hospitality in West LA.",
      "Start your week on a delicious note with tender flame-broiled specialties and vintage wines.",
      "Cozy Monday evening dining: Richly aromatic slow-simmered stews and freshly baked bread.",
      "Escape the Monday grind with authentic culinary traditions and relaxing dining room comfort.",
      "Order online for a comforting gourmet dinner delivered straight to your doorstep.",
      "Effortless parking every evening: Complimentary guest valet waiting at our main entrance.",
    ];
  }

  // =========================================================================
  // TUESDAY (Day 2) — Power Lunch & Charcoal Grill Taste
  // =========================================================================
  if (dayIndex === 2) {
    if (isDaytime) {
      return [
        "Tuesday Power Lunch: Express Lunch Specials crafted fresh for a quick, energizing break.",
        "It's almost lunch! Order lunch online in seconds or join us in our comfortable dining room.",
        "Power through your Tuesday with wholesome, protein-rich flame-grilled lunch plates.",
        "Effortless arrival: Complimentary guest valet parking right at our main entrance.",
        "Fresh, wholesome, and fast: Order your Tuesday midday meal online for speedy pickup.",
        "Step out for a delicious midday escape on Santa Monica Boulevard with attentive service.",
      ];
    }
    // Tuesday Dinner & Night
    return [
      "Tuesday Evening Taste: Juicy skewers charbroiled over open flames to juicy perfection.",
      "Escape the weekday routine: Chef's evening entrees, artisanal cocktails, and cozy atmosphere.",
      "Intimate Tuesday dining in West LA — reserve a table or order online for dinner tonight.",
      "Handcrafted culinary heritage prepared fresh with prime cuts, organic herbs, and aged saffron.",
      "Recharge your Tuesday evening with authentic hospitality, fine wine, and soothing ambiance.",
      "Complimentary guest valet right on Santa Monica Boulevard for an effortless dinner arrival.",
    ];
  }

  // =========================================================================
  // WEDNESDAY (Day 3) — Midweek Respite & Halfway Reward
  // =========================================================================
  if (dayIndex === 3) {
    if (isDaytime) {
      return [
        "Wednesday Midweek Lunch: You've made it halfway — reward yourself with our Express Lunch Specials.",
        "It's almost lunch! Order online for prompt pickup or dine in with complimentary valet.",
        "Wednesday Lunch: Aromatic saffron basmati, fresh garden salads, and sizzling skewers.",
        "Halfway through the week! Take a well-deserved midday break on Santa Monica Boulevard.",
        "Fast, nourishing lunch platters crafted fresh and packed with authentic Mediterranean flavors.",
        "Pre-order your Wednesday lunch online for express curbside pickup.",
      ];
    }
    // Wednesday Dinner & Night
    return [
      "Halfway through the week — you've earned an exceptional dinner with handcrafted evening entrees.",
      "Midweek celebration: Charbroiled specialties, signature cocktails, and rich simmering stews.",
      "Recharge this Wednesday evening with authentic hospitality and relaxing dining in West LA.",
      "Reserve your table for tonight or order our chef's evening dinner specialties online.",
      "A culinary escape in the heart of West LA: Open flames, fine wine, and four decades of heritage.",
      "Effortless arrival guaranteed with complimentary guest valet parking at our entrance.",
    ];
  }

  // =========================================================================
  // THURSDAY (Day 4) — Approaching Showtime & Weekend Preview
  // =========================================================================
  if (isDaytime) {
    return [
      "Thursday Lunch Call: Express daytime lunch specials served hot, fresh, and on time.",
      "It's almost lunch! Order online for prompt pickup or join us for a relaxing midday break.",
      "The weekend is in sight — celebrate early with a gourmet lunch on Santa Monica Boulevard.",
      "Complimentary guest valet parking available all afternoon at our front doors.",
      "Order your Thursday lunch online in seconds for express takeaway or delivery.",
      "Elevate your Thursday with wholesome recipes, aromatic rice, and attentive hospitality.",
    ];
  }
  // Thursday Dinner & Night
  return [
    "Thursday Preview: The weekend warmth begins early with royal dinner platters and craft cocktails.",
    "Signature house cocktails, charbroiled entrees, and rich slow-simmered dishes awaiting your evening.",
    "Reserve your seats early for this weekend's sensational live concert shows and cabaret performances.",
    "Unwind with friends and family over authentic open-flame specialties tonight.",
    "Thursday night dining in West LA: Saffron-infused aromas, warm lighting, and exceptional service.",
    "Pre-order your Thursday evening feast online or reserve a table for an intimate dinner.",
  ];
}
