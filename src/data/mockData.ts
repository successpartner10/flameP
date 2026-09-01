import { MenuItem, StorySlide } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Persian Appetizers (Mazzeh & Starters)
  {
    id: 'item-1',
    name: 'Kashk-e Bademjan with Warm Sangak Bread',
    category: 'small-plates',
    categoryLabel: 'Persian Starters & Mazzeh',
    description: 'Charred smoked baby eggplants, rich fermented kashk whey cream, caramelized mint oil, crispy golden garlic, fried onions, and toasted Persian flatbread.',
    price: 15.50,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Signature', 'Popular'],
    pairing: 'Chilled Persian Doogh with Mint',
    availableInMode: 'both'
  },
  {
    id: 'item-2',
    name: 'Mast-o Khiar & Sabzi Khordan Platter',
    category: 'small-plates',
    categoryLabel: 'Persian Starters & Mazzeh',
    description: 'Strained Persian yogurt with diced Persian cucumbers, fragrant wild rose petals, crushed walnuts, fresh mint, tarragon, radish, and imported French sheep feta.',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Gluten-Free', 'Chef Special'],
    pairing: 'Damask Rose Sparkling Spritz',
    availableInMode: 'both'
  },
  {
    id: 'item-3',
    name: 'Zeytoon Parvardeh & Mirza Ghassemi',
    category: 'small-plates',
    categoryLabel: 'Persian Starters & Mazzeh',
    description: 'Northern Persian green olives marinated in pomegranate molasses, crushed walnuts and mountain angelica (golpar), paired with smoked tomato garlic eggplant dip.',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Vegan', 'Chef Special'],
    pairing: 'Pomegranate Saffron Sangria',
    availableInMode: 'night'
  },

  // Persian Flame Kababs & Iconic Khoresht Stews
  {
    id: 'item-4',
    name: 'Flame Chelo Kabab Koobideh (Twin Skewers)',
    category: 'pasta-mains',
    categoryLabel: 'Charbroiled Kababs & Stews',
    description: 'Prime minced lamb and Angus beef seasoned with Persian spices and grated onion, charbroiled over open flames. Served on fluffy saffron basmati rice with sumac, grilled tomatoes, and butter.',
    price: 27.50,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Popular', 'Gluten-Free'],
    pairing: 'Full-Bodied Shiraz Reserve',
    availableInMode: 'both'
  },
  {
    id: 'item-5',
    name: 'Soltani Combo: Tender Barg & Saffron Joojeh',
    category: 'pasta-mains',
    categoryLabel: 'Charbroiled Kababs & Stews',
    description: 'The Royal Platter: Thinly tenderized filet mignon barg skewer paired with saffron and lemon marinated chicken breast joojeh skewer, blistered Persian peppers and basmati rice.',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=900&q=80',
    tags: ['Popular', 'Chef Special', 'Gluten-Free'],
    pairing: 'Napa Valley Cabernet Sauvignon',
    availableInMode: 'both'
  },
  {
    id: 'item-6',
    name: 'Slow-Simmered Ghormeh Sabzi with Lamb Tenderloin',
    category: 'pasta-mains',
    categoryLabel: 'Charbroiled Kababs & Stews',
    description: 'Persia’s national heritage dish: Slow-braised lamb simmered for hours with finely chopped sauteed herbs, fenugreek, red kidney beans, and sun-dried black Persian limes (limoo amani).',
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    tags: ['Gluten-Free', 'Chef Special'],
    pairing: 'Oaky Pinot Noir',
    availableInMode: 'both'
  },

  // Lunch Hub Express & Midday Specials
  {
    id: 'item-7',
    name: 'Tahchin with Slow-Cooked Lamb (Lunch Special)',
    category: 'lunch',
    categoryLabel: 'Lunch Hub & Afternoon Bistro',
    description: 'A premium midday portion of crispy, fragrant saffron rice layered with slow-cooked lamb, topped with a vibrant garnish of barberries.',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80',
    tags: ['Quick Lunch', 'Gluten-Free', 'Chef Special'],
    pairing: 'Persian Iced Chai with Saffron Rock Sugar',
    availableInMode: 'lunch'
  },
  {
    id: 'item-8',
    name: 'Baghali Polo with Lamb (Lunch Special)',
    category: 'lunch',
    categoryLabel: 'Lunch Hub & Afternoon Bistro',
    description: 'A lunchtime portion of aromatic dill and lima bean basmati rice, paired with tender lamb cooked in a rich, savory broth.',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    tags: ['Quick Lunch', 'Popular'],
    pairing: 'Fresh Mint Lemonade',
    availableInMode: 'lunch'
  },
  {
    id: 'item-lunch-gheimeh',
    name: 'Gheimeh Beef & Yellow Split Pea Stew (Lunch Special)',
    category: 'lunch',
    categoryLabel: 'Lunch Hub & Afternoon Bistro',
    description: 'A comforting midday portion of slow-cooked beef and yellow split peas simmered in a tangy tomato and dried lime broth, topped with crispy potato matchsticks and served with fluffy basmati rice.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    tags: ['Quick Lunch', 'Chef Special'],
    pairing: 'Doogh Yogurt Drink',
    availableInMode: 'lunch'
  },
  {
    id: 'item-lunch-salmon',
    name: 'Citrus-Infused Atlantic Salmon Filet (Lunch Special)',
    category: 'lunch',
    categoryLabel: 'Lunch Hub & Afternoon Bistro',
    description: 'A perfectly balanced midday serving of fresh Atlantic salmon, infused with citrus and saffron aromatics, then fire-grilled.',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    tags: ['Quick Lunch', 'Signature', 'Gluten-Free'],
    pairing: 'Sauvignon Blanc',
    availableInMode: 'lunch'
  },
  {
    id: 'item-lunch-chicken',
    name: 'Charbroiled Boneless Chicken Medley (Lunch Special)',
    category: 'lunch',
    categoryLabel: 'Lunch Hub & Afternoon Bistro',
    description: 'A perfectly balanced midday serving of skewered chicken breast and thigh meat, infused with traditional aromatic marinades and fire-grilled.',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
    tags: ['Quick Lunch', 'Chef Special'],
    pairing: 'Chardonnay',
    availableInMode: 'lunch'
  },
  {
    id: 'item-lunch-koobideh',
    name: 'Beef Koobideh Lunch Special',
    category: 'lunch',
    categoryLabel: 'Lunch Hub & Afternoon Bistro',
    description: 'An expertly seasoned blend of ground veal and beef, skewered and flame-broiled for a perfectly balanced midday meal.',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1529566652340-2c41a1eb6d7d?auto=format&fit=crop&w=900&q=80',
    tags: ['Quick Lunch', 'Signature'],
    pairing: 'Shiraz Cabernet',
    availableInMode: 'lunch'
  },

  // Cabaret & Late Night Bites
  {
    id: 'item-9',
    name: 'Khoresht Fesenjan with Duck & Saffron Tahdig',
    category: 'night',
    categoryLabel: 'Cabaret & Night Bites',
    description: 'Silky, rich Persian stew crafted from slow-roasted ground walnuts and tart pomegranate molasses, served over braised duck breast with crispy golden saffron tahdig.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Chef Special', 'Gluten-Free'],
    pairing: 'Vintage Merlot 2021',
    availableInMode: 'night'
  },
  {
    id: 'item-10',
    name: 'Royal Saffron Tahchin with Barberry Jewels',
    category: 'night',
    categoryLabel: 'Cabaret & Night Bites',
    description: 'Crisp, golden-crusted Persian baked rice cake enriched with saffron, egg yolks, and thick yogurt, layered with shredded spiced chicken and jeweled barberries.',
    price: 24.50,
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80',
    tags: ['Popular', 'Chef Special'],
    pairing: 'Dry Saffron Champagne',
    availableInMode: 'night'
  },

  // Desserts
  {
    id: 'item-11',
    name: 'Bastani Sonnati (Persian Saffron Ice Cream)',
    category: 'desserts',
    categoryLabel: 'Artisan Persian Desserts',
    description: 'Traditional Persian frozen custard infused with organic saffron, pure rosewater, toasted pistachio slivers, and thick frozen clotted cream chunks between crispy wafers.',
    price: 13.50,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Signature', 'Chef Special'],
    pairing: 'Hot Cardamom Persian Tea (Chai)',
    availableInMode: 'both'
  },
  {
    id: 'item-12',
    name: 'Faloodeh Shirazi & Pomegranate Reduction',
    category: 'desserts',
    categoryLabel: 'Artisan Persian Desserts',
    description: 'Traditional chilled Persian glass starch noodles steeped in iced rosewater syrup, fresh sour lime juice, and tart pomegranate reduction with sour cherry drizzle.',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Vegan', 'Gluten-Free'],
    pairing: 'Sour Cherry Liqueur',
    availableInMode: 'both'
  },

  // Cocktails & Persian Beverages
  {
    id: 'item-13',
    name: 'Tehran Nightfall Cardamom Old Fashioned',
    category: 'cocktails',
    categoryLabel: 'Craft Cocktails & Elixirs',
    description: 'Small-batch bourbon, house-made Persian saffron simple syrup, crushed green cardamom bitters, smoked orange peel, and gold leaf flake.',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
    tags: ['Signature', 'Popular'],
    availableInMode: 'both'
  },
  {
    id: 'item-14',
    name: 'Damask Rose & Persian Pomegranate Spritz',
    category: 'cocktails',
    categoryLabel: 'Craft Cocktails & Elixirs',
    description: 'Artisanal gin, Kashan damask rosewater, cold-pressed tart pomegranate juice, elderflower liqueur, and Prosecco mist.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
    tags: ['Popular'],
    availableInMode: 'both'
  },
  {
    id: 'item-15',
    name: 'Persian Damask Rose & Saffron Cardamom Chai',
    category: 'cocktails',
    categoryLabel: 'Artisan Persian Beverages',
    description: 'Brewed black Ceylon tea infused with Persian saffron strands, green cardamom pods, pure Kashan rosewater, and saffron rock candy crystal sticks.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80',
    tags: ['Vegetarian', 'Popular'],
    availableInMode: 'both'
  }
];

export const STORY_SLIDES: StorySlide[] = [
  {
    id: 'story-1',
    title: 'Boardroom & Corporate Banquets',
    subtitle: 'Long boardroom tables packed with guests & hot saffron kabab platters',
    image: '/images/hero-catering.png',
    category: 'CORPORATE CATERING',
    tagline: 'Close-ups of charbroiled Koobideh and saffron basmati leading down long tables filled with corporate guests enjoying a full Persian feast.',
    actionText: 'Book Corporate Banquet',
    dishId: 'item-4'
  },
  {
    id: 'story-2',
    title: 'Grand Company Gala Feasts',
    subtitle: 'Packed hall of attendees celebrating along long tables brimming with food',
    image: '/images/patio-people-gala.jpg',
    category: 'CORPORATE GALAS',
    tagline: 'Massive company galas featuring long banquet tables laden with Ghormeh Sabzi stews, royal Soltani skewers, and dozens of happy guests.',
    actionText: 'Plan Gala Event',
    dishId: 'item-5'
  },
  {
    id: 'story-3',
    title: 'Family Reunions & Nowruz Banquets',
    subtitle: 'Generational family gatherings around long tables loaded with Persian food',
    image: '/images/hero-dine-in.png',
    category: 'FAMILY GATHERINGS',
    tagline: 'Foreground close-up of steaming saffron rice and lamb shanks on long family tables overflowing with smiling relatives and zero empty seats.',
    actionText: 'Plan Family Banquet',
    dishId: 'item-6'
  },
  {
    id: 'story-4',
    title: 'Backyard Charcoal Grill Parties',
    subtitle: 'Outdoor long tables packed with friends sharing sizzling Joojeh skewers',
    image: '/images/patio-outdoor-day.jpg',
    category: 'BACKYARD PARTIES',
    tagline: 'Live mesquite grill masters serving crowds of friends along long outdoor tables stacked with skewers, pita, herbs, and cold Doogh.',
    actionText: 'Book Backyard Grill',
    dishId: 'item-7'
  },
  {
    id: 'story-5',
    title: 'Royal Wedding Banquet Tables',
    subtitle: 'Elaborately set long banquet tables filled with celebrating wedding guests',
    image: '/images/poster_cabaret_gala.png',
    category: 'WEDDING BANQUETS',
    tagline: 'Grand wedding banquets with close-ups of rose-garnished Soltani platters and jeweled rice stretching down long tables of celebrating guests.',
    actionText: 'Get Wedding Quote',
    dishId: 'item-5'
  },
  {
    id: 'story-6',
    title: 'Bustling Persian Party Feasts',
    subtitle: 'Long party tables piled high with charbroiled kababs, tahdig & appetizers',
    image: '/images/poster_shahyar_arand.png',
    category: 'PARTY FEASTS',
    tagline: 'Host large parties with ease — foreground close-up of crunchy saffron tahdig and skewers with crowds of friends dining together.',
    actionText: 'Request Party Quote',
    dishId: 'item-4'
  }
];
