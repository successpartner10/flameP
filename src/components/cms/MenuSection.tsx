import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Sparkles, Utensils, Flame, Fish, Salad, Sun } from 'lucide-react';
import { AppMode } from '../../types';

interface MenuItem {
  Category: string;
  CategoryOrder: string;
  SubCategory?: string;
  CategoryImage: string;
  Item: string;
  Description: string;
  RegularPrice?: string;
  LunchPrice?: string;
  Price: string;
}

interface MenuCategory {
  name: string;
  order: number;
  image: string;
  items: MenuItem[];
}

interface MenuSectionProps {
  mode: AppMode;
  csvPath?: string;
  targetCategory?: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  mode,
  csvPath = '/menu.csv',
  targetCategory,
}) => {
  const isNight = mode === 'night';
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(csvPath)
      .then((res) => {
        if (!res.ok) throw new Error(`Could not load menu (${res.status})`);
        return res.text();
      })
      .then((csvText) => {
        const result = Papa.parse<MenuItem>(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (h) => h.trim(),
          transform: (v) => v.trim(),
        });

        // Group rows by Category
        const map = new Map<string, MenuCategory>();
        for (const row of result.data) {
          if (!row.Category || !row.Item) continue;
          if (!map.has(row.Category)) {
            map.set(row.Category, {
              name: row.Category,
              order: parseInt(row.CategoryOrder, 10) || 99,
              image: row.CategoryImage || '',
              items: [],
            });
          }
          map.get(row.Category)!.items.push(row);
        }

        const sorted = Array.from(map.values()).sort((a, b) => a.order - b.order);
        setCategories(sorted);
        setLoading(false);

        // Scroll to target category if specified
        if (targetCategory) {
          setTimeout(() => {
            const targetEl = document.getElementById(targetCategory) || 
                             document.getElementById(`${targetCategory}-section`) ||
                             document.getElementById('lunch-section');
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 200);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [csvPath, targetCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 space-x-3">
        <Sparkles className="w-5 h-5 text-[#d4a359] animate-pulse" />
        <span className={`text-sm font-medium ${isNight ? 'text-[#f5d79e]' : 'text-stone-500'}`}>
          Loading menu…
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-2xl text-sm ${isNight ? 'bg-[#1b050f] text-red-300' : 'bg-red-50 text-red-700'}`}>
        ⚠️ Menu could not be loaded: {error}
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {categories.map((cat, idx) => {
        const isLunch = cat.name.toLowerCase().includes('lunch');
        const sectionId = isLunch ? 'lunch-section' : `menu-section-${cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        const showDineInSeparator = !isLunch && (idx === 1 || cat.order === 2);

        // Group lunch items by SubCategory if present
        const subCategoryMap = new Map<string, MenuItem[]>();
        if (isLunch) {
          for (const item of cat.items) {
            const sub = item.SubCategory || 'Entrées & Specialities';
            if (!subCategoryMap.has(sub)) {
              subCategoryMap.set(sub, []);
            }
            subCategoryMap.get(sub)!.push(item);
          }
        }

        const getSubIcon = (subName: string) => {
          const lower = subName.toLowerCase();
          if (lower.includes('seafood')) return <Fish size={16} className="text-[#d4a359]" />;
          if (lower.includes('poultry') || lower.includes('meat') || lower.includes('flame')) return <Flame size={16} className="text-[#d4a359]" />;
          if (lower.includes('sides') || lower.includes('salad')) return <Salad size={16} className="text-[#d4a359]" />;
          return <Utensils size={16} className="text-[#d4a359]" />;
        };

        return (
          <React.Fragment key={cat.name}>
            {showDineInSeparator && (
              <div id="dine-in-main-menu" className="pt-8 pb-4 scroll-mt-28">
                <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-2 relative overflow-hidden ${
                  isNight 
                    ? 'bg-gradient-to-r from-[#20050f] via-[#38081a] to-[#20050f] border-[#6b152d] shadow-2xl text-white' 
                    : 'bg-stone-100 border-stone-200 shadow-sm text-stone-900'
                }`}>
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#d4a359]/20 border border-[#d4a359]/60 text-[#d4a359] text-xs uppercase tracking-[0.25em] font-extrabold">
                    <Sparkles size={13} />
                    <span>Dinner &amp; All-Day Dining</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Dine In
                  </h2>
                  <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isNight ? 'text-[#f5d79e]' : 'text-stone-600'}`}>
                    Authentic Saffron Platters, Charbroiled Charcoal Kababs, Persian Stews &amp; Mazzeh
                  </p>
                </div>
              </div>
            )}

            <section id={sectionId} className="scroll-mt-28">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                {isLunch ? (
                  <Sun size={20} className="text-[#d4a359] shrink-0" />
                ) : (
                  <Sparkles size={18} className="text-[#d4a359] shrink-0" />
                )}
                <div>
                  <h2
                    className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${
                      isNight ? 'text-[#f3cf8a]' : 'text-[#9e1c38]'
                    }`}
                  >
                    {cat.name}
                  </h2>
                  {isLunch && (
                    <p className={`text-xs sm:text-sm mt-0.5 ${isNight ? 'text-gray-300' : 'text-stone-600'}`}>
                      Available Monday through Friday • 11:30 AM – 3:30 PM • Served with Saffron Basmati Rice &amp; Fresh Complements
                    </p>
                  )}
                </div>
                <div className={`flex-1 h-px ${isNight ? 'bg-[#38081a]' : 'bg-stone-200'}`} />
              </div>

              {/* Category Photo */}
              {cat.image && (
                <figure className="mb-6 rounded-3xl overflow-hidden shadow-2xl border border-stone-300/20 max-h-[300px]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                    loading="lazy"
                  />
                </figure>
              )}

              {/* LUNCH SPECIALS: Render grouped by SubCategory */}
              {isLunch && subCategoryMap.size > 0 ? (
                <div className="space-y-8">
                  {Array.from(subCategoryMap.entries()).map(([subName, items]) => (
                    <div key={subName} className="space-y-3">
                      <div className="flex items-center space-x-2 border-b pb-2 border-[#d4a359]/30">
                        {getSubIcon(subName)}
                        <h3 className={`font-serif text-lg sm:text-xl font-bold ${
                          isNight ? 'text-[#f5d79e]' : 'text-stone-900'
                        }`}>
                          {subName}
                        </h3>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#d4a359]/15 text-[#d4a359] font-bold">
                          {items.length} dishes
                        </span>
                      </div>

                      <div
                        className={`overflow-x-auto rounded-2xl border shadow-sm ${
                          isNight ? 'border-[#38081a] bg-[#14040b]' : 'border-stone-200 bg-stone-50'
                        }`}
                      >
                        <table className="w-full text-left text-sm sm:text-base border-collapse">
                          <thead>
                            <tr>
                              <th
                                className={`px-4 sm:px-6 py-3.5 border-b font-bold uppercase tracking-wider text-xs w-2/5 sm:w-1/3 ${
                                  isNight
                                    ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                                    : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                                }`}
                              >
                                Dish Name
                              </th>
                              <th
                                className={`px-4 sm:px-6 py-3.5 border-b font-bold uppercase tracking-wider text-xs ${
                                  isNight
                                    ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                                    : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                                }`}
                              >
                                Description / Comparison
                              </th>
                              <th
                                className={`px-3 sm:px-4 py-3.5 border-b font-bold uppercase tracking-wider text-xs text-center w-24 ${
                                  isNight
                                    ? 'bg-[#20050f] border-[#38081a] text-gray-400'
                                    : 'bg-stone-100 border-stone-200 text-stone-500'
                                }`}
                              >
                                Reg. Price
                              </th>
                              <th
                                className={`px-3 sm:px-4 py-3.5 border-b font-bold uppercase tracking-wider text-xs text-right w-28 ${
                                  isNight
                                    ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                                    : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                                }`}
                              >
                                Lunch Special
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item, idx) => {
                              const isLunchNa = item.LunchPrice?.toUpperCase() === 'N/A';
                              return (
                                <tr
                                  key={idx}
                                  className={`transition-colors ${
                                    isNight
                                      ? 'hover:bg-[#1c050e]'
                                      : 'hover:bg-amber-50/60'
                                  }`}
                                >
                                  <td
                                    className={`px-4 sm:px-6 py-3.5 border-b font-bold align-top ${
                                      isNight ? 'border-[#260511] text-white' : 'border-stone-200 text-stone-950'
                                    }`}
                                  >
                                    {item.Item}
                                  </td>
                                  <td
                                    className={`px-4 sm:px-6 py-3.5 border-b leading-relaxed text-xs sm:text-sm align-top ${
                                      isNight ? 'border-[#260511] text-gray-200' : 'border-stone-200 text-stone-800'
                                    }`}
                                  >
                                    {item.Description}
                                  </td>
                                  <td
                                    className={`px-3 sm:px-4 py-3.5 border-b text-center align-top whitespace-nowrap text-xs sm:text-sm ${
                                      isNight ? 'border-[#260511] text-gray-400' : 'border-stone-200 text-stone-500'
                                    }`}
                                  >
                                    {item.RegularPrice ? (
                                      <span className="line-through decoration-red-500/70">{item.RegularPrice}</span>
                                    ) : (
                                      '—'
                                    )}
                                  </td>
                                  <td
                                    className={`px-3 sm:px-4 py-3.5 border-b text-right font-black align-top whitespace-nowrap ${
                                      isNight ? 'border-[#260511]' : 'border-stone-200'
                                    }`}
                                  >
                                    {isLunchNa ? (
                                      <span className="inline-block px-2 py-1 rounded-lg bg-stone-800/60 text-gray-300 text-xs font-semibold">
                                        Dinner Only ({item.RegularPrice || item.Price})
                                      </span>
                                    ) : (
                                      <span className="inline-block px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#d4a359] to-[#f3cf8a] text-black text-xs sm:text-sm font-extrabold shadow-sm">
                                        {item.LunchPrice || item.Price}
                                      </span>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Standard Menu Items Table */
                <div
                  className={`overflow-x-auto rounded-2xl border shadow-sm ${
                    isNight ? 'border-[#38081a] bg-[#14040b]' : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  <table className="w-full text-left text-sm sm:text-base border-collapse">
                    <thead>
                      <tr>
                        <th
                          className={`px-4 sm:px-6 py-4 border-b font-bold uppercase tracking-wider text-xs sm:text-sm w-1/3 ${
                            isNight
                              ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                              : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                          }`}
                        >
                          Dish
                        </th>
                        <th
                          className={`px-4 sm:px-6 py-4 border-b font-bold uppercase tracking-wider text-xs sm:text-sm ${
                            isNight
                              ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                              : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                          }`}
                        >
                          Description
                        </th>
                        <th
                          className={`px-4 sm:px-6 py-4 border-b font-bold uppercase tracking-wider text-xs sm:text-sm text-right w-24 ${
                            isNight
                              ? 'bg-[#20050f] border-[#38081a] text-[#f3cf8a]'
                              : 'bg-stone-100 border-stone-200 text-[#9e1c38]'
                          }`}
                        >
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.items.map((item, idx) => (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            isNight
                              ? 'hover:bg-[#1c050e]'
                              : 'hover:bg-amber-50/60'
                          }`}
                        >
                          <td
                            className={`px-4 sm:px-6 py-4 border-b font-semibold align-top ${
                              isNight ? 'border-[#260511] text-white' : 'border-stone-200 text-stone-950'
                            }`}
                          >
                            {item.Item}
                          </td>
                          <td
                            className={`px-4 sm:px-6 py-4 border-b leading-relaxed align-top ${
                              isNight ? 'border-[#260511] text-gray-100' : 'border-stone-200 text-stone-900'
                            }`}
                          >
                            {item.Description}
                          </td>
                          <td
                            className={`px-4 sm:px-6 py-4 border-b text-right font-bold align-top whitespace-nowrap ${
                              isNight ? 'border-[#260511] text-[#f3cf8a]' : 'border-stone-200 text-[#9e1c38]'
                            }`}
                          >
                            {item.Price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </React.Fragment>
        );
      })}

      {/* Footer note */}
      <blockquote
        className={`border-l-4 border-[#d4a359] p-5 rounded-r-2xl italic shadow-sm text-sm ${
          isNight ? 'bg-[#1b050f] text-[#f5d79e]' : 'bg-amber-50/80 text-stone-700'
        }`}
      >
        All lunch entrées and charbroiled kababs are served with aromatic saffron basmati rice, grilled tomatoes, fresh herbs &amp; warm Sangak bread.
        Gluten-free and vegetarian options available — please inform your server of any dietary requirements.
      </blockquote>
    </div>
  );
};
