import React, { useState } from 'react';
import { X, Search, Filter, Plus, Check, Sparkles, Utensils, Wine, Moon, Sun } from 'lucide-react';
import { MenuItem, AppMode } from '../types';
import { MENU_ITEMS } from '../data/mockData';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  mode: AppMode;
  onToggleMode: (mode: AppMode) => void;
  highlightDishId?: string | null;
  initialCategory?: string;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  mode,
  onToggleMode,
  highlightDishId,
  initialCategory = 'all',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (initialCategory && isOpen) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory, isOpen]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'lunch', label: '☀️ Lunch Hub' },
    { id: 'small-plates', label: 'Small Plates' },
    { id: 'pasta-mains', label: 'Handmade Pasta & Mains' },
    { id: 'night', label: '🌙 Cabaret & Night Bites' },
    { id: 'desserts', label: 'Artisan Desserts' },
    { id: 'cocktails', label: 'Cocktails & Spritz' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = selectedDiet === 'all' || (item.tags && item.tags.some(t => t.toLowerCase() === selectedDiet.toLowerCase()));
    
    return matchesCategory && matchesSearch && matchesDiet;
  });

  const handleAdd = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#180309]/92 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#1c040d] border border-[#6b152d] text-[#f5f1ea] rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#521324] flex items-center justify-between bg-[#24060f]/90 backdrop-blur-md">
          <div>
            <div className="flex items-center space-x-2 font-['Raleway']">
              <span className="text-xl sm:text-2xl font-black font-[900] text-white">FLAME</span>
              <span className="text-sm sm:text-base font-black font-[900] text-white tracking-[0.2em] uppercase">INTERNATIONAL</span>
              <span className="text-xs uppercase tracking-widest text-[#f5d79e] font-mono">• Menu</span>
            </div>
            <p className="text-xs text-[#f3d2d8]">Seasonally inspired artisan Persian cuisine &amp; kitchen craft</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Mode Switcher - Compact */}
            <div className="hidden sm:flex items-center bg-[#2d0713] p-0.5 rounded-full border border-[#831f3b]">
              <button
                onClick={() => onToggleMode('lunch')}
                className={`px-2.5 py-0.5 text-[10px] rounded-full transition-all flex items-center space-x-1 font-bold ${
                  mode === 'lunch' ? 'bg-[#d4731f] text-white shadow-sm' : 'text-[#f5d79e] hover:text-white'
                }`}
              >
                <Sun size={10} />
                <span>Lunch</span>
              </button>
              <button
                onClick={() => onToggleMode('night')}
                className={`px-2.5 py-0.5 text-[10px] rounded-full transition-all flex items-center space-x-1 font-bold ${
                  mode === 'night' ? 'bg-[#6b152d] text-white shadow-sm' : 'text-[#f5d79e] hover:text-white'
                }`}
              >
                <Moon size={10} />
                <span>Night</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#2d0713] hover:bg-[#430b1c] text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="px-6 py-4 bg-[#24060f] border-b border-[#521324] space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#f5d79e]/70" />
              <input
                type="text"
                placeholder="Search dishes, kababs, saffron rice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2d0713] border border-[#6b152d] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-[#f5d79e]/50 focus:outline-none focus:border-[#d4a359]"
              />
            </div>

            {/* Dietary Tags Quick Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-[11px] text-[#f5d79e] uppercase font-mono tracking-wider">Filter:</span>
              {['all', 'Vegetarian', 'Gluten-Free', 'Chef Special', 'Signature'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedDiet(tag)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors ${
                    selectedDiet === tag
                      ? 'bg-[#d4a359] text-[#180309] font-bold'
                      : 'bg-[#2d0713] text-[#f3d2d8] hover:bg-[#430b1c]'
                  }`}
                >
                  {tag === 'all' ? 'All Diets' : tag}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#d4a359] text-[#180309] shadow-md font-bold'
                    : 'bg-[#2d0713] text-[#f3d2d8] hover:bg-[#430b1c] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid Items */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.length === 0 ? (
            <div className="col-span-2 text-center py-16 text-[#758494]">
              <Utensils size={36} className="mx-auto mb-3 opacity-40" />
              <p className="text-base font-serif">No dishes found matching your criteria</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedDiet('all'); }}
                className="mt-3 text-xs text-[#d4a359] underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredItems.map((dish) => {
              const isAdded = addedItemIds[dish.id];
              const isHighlighted = highlightDishId === dish.id;

              return (
                <div
                  key={dish.id}
                  className={`group relative bg-[#24060f] border rounded-2xl p-4 sm:p-5 flex gap-4 items-start transition-all hover:border-[#d4a359]/60 hover:shadow-lg ${
                    isHighlighted ? 'border-[#d4a359] ring-2 ring-[#d4a359]/30 bg-[#2d0713]' : 'border-[#521324]'
                  }`}
                >
                  {/* Dish Thumbnail */}
                  <div className="relative w-24 sm:w-28 h-24 sm:h-28 rounded-xl overflow-hidden shrink-0 bg-[#180309]">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {dish.availableInMode === 'lunch' && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#d4731f] text-white text-[8px] font-bold rounded uppercase">
                        Lunch
                      </span>
                    )}
                    {dish.availableInMode === 'night' && (
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#6b152d] text-white text-[8px] font-bold rounded uppercase">
                        Night
                      </span>
                    )}
                  </div>

                  {/* Dish Details */}
                  <div className="flex-1 flex flex-col justify-between min-h-24">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-base sm:text-lg text-white font-medium leading-snug group-hover:text-[#d4a359] transition-colors">
                          {dish.name}
                        </h4>
                        <span className="font-mono text-sm font-semibold text-[#f5d79e] shrink-0">
                          ${dish.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-xs text-[#f3d2d8] leading-relaxed mt-1 line-clamp-2">
                        {dish.description}
                      </p>

                      {dish.pairing && (
                        <p className="text-[10px] text-[#d4a359]/90 mt-1.5 flex items-center space-x-1 font-mono">
                          <Wine size={11} />
                          <span>Pairing: {dish.pairing}</span>
                        </p>
                      )}
                    </div>

                    {/* Tags & Add to Bag button */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#521324]">
                      <div className="flex flex-wrap gap-1">
                        {dish.tags?.map((t) => (
                          <span
                            key={t}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-[#3d0917] text-[#f5d79e] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleAdd(dish)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-[#2e7d32] text-white scale-105'
                            : 'bg-[#d4a359] hover:bg-[#e2b775] text-[#180309] font-bold'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check size={13} />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Plus size={13} />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        <div className="px-6 py-4 bg-[#24060f] border-t border-[#521324] flex items-center justify-between text-xs text-[#f3d2d8]">
          <span>* All dishes prepared fresh daily with authentic Persian saffron, herbs, and premium meats.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#3d0917] hover:bg-[#521324] text-white font-medium text-xs uppercase tracking-wider"
          >
            Close Menu
          </button>
        </div>

      </div>
    </div>
  );
};
