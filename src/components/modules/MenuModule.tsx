import React, { useState } from 'react';
import { Search, Sparkles, Plus, Check, Flame, Award, Heart } from 'lucide-react';
import { MenuItem, AppMode } from '../../types';
import { MENU_ITEMS } from '../../data/mockData';
import { RevealOnScroll } from '../RevealOnScroll';

export interface MenuModuleProps {
  className?: string;
  initialCategory?: string;
  onAddToCart?: (item: MenuItem) => void;
  onOpenDishDetail?: (dishId: string) => void;
  mode?: AppMode;
  showTitle?: boolean;
}

const CATEGORIES = [
  { id: 'all', name: 'Full Menu', icon: '🍽️' },
  { id: 'lunch', name: '☀️ Lunch Hub', icon: '☀️' },
  { id: 'pasta-mains', name: '🔥 Persian Kababs & Mains', icon: '🍢' },
  { id: 'small-plates', name: '🥗 Saffron Appetizers', icon: '🫒' },
  { id: 'desserts', name: '🍨 Saffron & Baklava', icon: '🍯' },
  { id: 'cocktails', name: '🍸 Cocktails & Beverages', icon: '🍷' },
];

export const MenuModule: React.FC<MenuModuleProps> = ({
  className = '',
  initialCategory = 'all',
  onAddToCart,
  onOpenDishDetail,
  mode = 'lunch',
  showTitle = true,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'halal' | 'vegetarian' | 'gf'>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category filter
    const matchesCategory =
      activeCategory === 'all' ||
      item.category === activeCategory ||
      (activeCategory === 'lunch' && (item.category === 'lunch' || item.availableInMode === 'lunch' || item.availableInMode === 'both'));

    // Search filter
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Dietary filter
    let matchesDiet = true;
    if (dietaryFilter === 'vegetarian') matchesDiet = Boolean(item.tags?.includes('Vegetarian') || item.tags?.includes('Vegan'));
    if (dietaryFilter === 'gf') matchesDiet = Boolean(item.tags?.includes('Gluten-Free'));

    return matchesCategory && matchesSearch && matchesDiet;
  });

  const handleAddItem = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item);
      setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
      setTimeout(() => {
        setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
      }, 1500);
    }
  };

  return (
    <section id="menu-module" className={`w-full text-[#f7e8ea] font-['Raleway'] ${className}`}>
      <div className="max-w-6xl mx-auto">
        
        {showTitle && (
          <RevealOnScroll direction="up" delay={0} duration={600} className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#2d0713] border border-[#6b152d] text-xs font-bold uppercase tracking-[0.25em] text-[#f5d79e] mb-3 shadow-md">
              <Flame size={14} className="text-[#f3cf8a]" />
              <span>Authentic Persian Cuisine</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-wide">
              OUR CULINARY <span className="text-[#f3cf8a]">COLLECTION</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#f3d2d8] mt-2 max-w-xl mx-auto">
              Charbroiled over open flames with saffron, sumac, and Persian herbs.
            </p>
          </RevealOnScroll>
        )}

        {/* Search & Category Filter Bar */}
        <div className="space-y-4 mb-8">
          
          {/* Search & Dietary Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#f5d79e]/60 w-4 h-4" />
              <input
                type="text"
                placeholder="Search kababs, saffron rice, stews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#1c040d] border border-[#521324] text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#d4a359]"
              />
            </div>

            {/* Dietary Tags */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  dietaryFilter === 'all'
                    ? 'bg-[#d4a359] text-black border-[#d4a359]'
                    : 'bg-[#24060f] text-[#f5d79e] border-[#521324] hover:bg-[#3d0917]'
                }`}
              >
                All Dietary
              </button>
              <button
                onClick={() => setDietaryFilter('halal')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  dietaryFilter === 'halal'
                    ? 'bg-[#d4a359] text-black border-[#d4a359]'
                    : 'bg-[#24060f] text-[#f5d79e] border-[#521324] hover:bg-[#3d0917]'
                }`}
              >
                100% Halal
              </button>
              <button
                onClick={() => setDietaryFilter('vegetarian')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  dietaryFilter === 'vegetarian'
                    ? 'bg-[#d4a359] text-black border-[#d4a359]'
                    : 'bg-[#24060f] text-[#f5d79e] border-[#521324] hover:bg-[#3d0917]'
                }`}
              >
                Vegetarian
              </button>
              <button
                onClick={() => setDietaryFilter('gf')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                  dietaryFilter === 'gf'
                    ? 'bg-[#d4a359] text-black border-[#d4a359]'
                    : 'bg-[#24060f] text-[#f5d79e] border-[#521324] hover:bg-[#3d0917]'
                }`}
              >
                Gluten-Free
              </button>
            </div>
          </div>

          {/* Category Selector Tabs in 2-Tone Footer Palette */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5 border shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black border-[#d4a359] shadow-lg scale-105'
                    : 'bg-[#1c040d] text-[#f7e8ea] hover:bg-[#2d0713] border-[#521324]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((dish) => {
            const isAdded = addedItemIds[dish.id];

            return (
              <div
                key={dish.id}
                onClick={() => onOpenDishDetail && onOpenDishDetail(dish.id)}
                className="group relative rounded-3xl bg-gradient-to-b from-[#24060f] to-[#1c040d] border border-[#521324] hover:border-[#d4a359] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Dish Photo */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#180309]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c040d] via-transparent to-black/30" />

                  {/* Price Tag in Gold */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#180309]/90 border border-[#d4a359]/70 text-[#f3cf8a] font-extrabold text-sm shadow-md">
                    ${dish.price.toFixed(2)}
                  </div>

                  {/* Badges */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {dish.tags && dish.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded-full font-extrabold text-[10px] uppercase tracking-wider shadow ${
                          tag === 'Signature' || tag === 'Popular'
                            ? 'bg-[#d4a359] text-black'
                            : 'bg-black/70 backdrop-blur-sm text-white border border-white/20'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-[#f3cf8a] transition-colors leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#f3d2d8]/90 line-clamp-2 mt-1 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 border-t border-[#521324] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#f5d79e] tracking-widest uppercase">
                      {dish.calories ? `${dish.calories} CAL` : 'AUTHENTIC PERSIAN'}
                    </span>

                    {onAddToCart && (
                      <button
                        onClick={(e) => handleAddItem(dish, e)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1 cursor-pointer border ${
                          isAdded
                            ? 'bg-green-600 border-green-500 text-white'
                            : 'bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] hover:from-[#f3cf8a] hover:to-[#d4a359] text-black border-[#d4a359] shadow-md'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={14} />
                            <span>ADDED</span>
                          </>
                        ) : (
                          <>
                            <Plus size={14} />
                            <span>ADD</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
