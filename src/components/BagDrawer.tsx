import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle, Utensils, Bike, Sparkles } from 'lucide-react';
import { CartItem, MenuItem } from '../types';
import confetti from 'canvas-confetti';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onClearCart: () => void;
  onExploreMenu: () => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
  onExploreMenu,
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableNumber, setTableNumber] = useState<string>('4');
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [isOrdered, setIsOrdered] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  const tax = subtotal * 0.10; // 10% IVA
  const tip = (subtotal * tipPercent) / 100;
  const total = subtotal + tax + tip;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#d4a359', '#388e3c', '#ffffff']
    });

    setIsOrdered(true);
  };

  const handleReset = () => {
    setIsOrdered(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#14181d] border-l border-[#2e3744] text-[#f5f1ea] shadow-2xl h-full flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#242c36] flex items-center justify-between bg-[#191f27]">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={18} className="text-[#d4a359]" />
            <h3 className="font-serif text-lg text-white font-medium">Your Order Bag</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#293442] text-[#f5d79e] font-mono">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#222933] hover:bg-[#2e3846] text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isOrdered ? (
            <div className="text-center py-12 px-2 space-y-6">
              <div className="w-16 h-16 bg-[#2e7d32]/20 text-[#4caf50] border border-[#4caf50] rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle size={36} />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-white">Order Sent to Kitchen!</h3>
                <p className="text-xs text-[#9aa9ba]">
                  {orderType === 'dine-in'
                    ? `Chef is preparing your small plates for Table #${tableNumber}.`
                    : 'Your artisanal takeout is being prepared for fresh pick-up.'}
                </p>
              </div>

              <div className="bg-[#1b222a] border border-[#2b3644] rounded-2xl p-4 text-xs space-y-2 text-left">
                <div className="flex justify-between text-[#8596a7]">
                  <span>Status:</span>
                  <span className="text-[#4caf50] font-bold">Kitchen Crafting • Est. 15-20 min</span>
                </div>
                <div className="flex justify-between text-[#8596a7]">
                  <span>Total Paid:</span>
                  <span className="font-mono text-white font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-[#d4a359] text-black font-bold text-xs uppercase tracking-wider"
              >
                Close &amp; Return
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 space-y-4 text-[#7b8b9b]">
              <div className="w-16 h-16 rounded-full bg-[#1b2129] border border-[#2d3846] flex items-center justify-center mx-auto">
                <ShoppingBag size={28} className="opacity-40" />
              </div>
              <div>
                <h4 className="font-serif text-lg text-white">Your bag is empty</h4>
                <p className="text-xs text-[#8796a5] mt-1 max-w-xs mx-auto">
                  Browse our seasonal menu and add your favorite dishes, wines, or specialty matcha.
                </p>
              </div>
              <button
                onClick={() => { onClose(); onExploreMenu(); }}
                className="px-6 py-2.5 rounded-full bg-[#d4a359] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#e2b775] transition-colors"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Order Mode Toggle: Dine-in vs Takeaway */}
              <div className="grid grid-cols-2 gap-2 bg-[#1b2129] p-1 rounded-xl border border-[#2c3745]">
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                    orderType === 'dine-in' ? 'bg-[#d4a359] text-black shadow' : 'text-[#96a5b5] hover:text-white'
                  }`}
                >
                  <Utensils size={13} />
                  <span>Dine-in Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('takeaway')}
                  className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                    orderType === 'takeaway' ? 'bg-[#d4a359] text-black shadow' : 'text-[#96a5b5] hover:text-white'
                  }`}
                >
                  <Bike size={13} />
                  <span>Pick-up Takeout</span>
                </button>
              </div>

              {orderType === 'dine-in' && (
                <div className="flex items-center justify-between bg-[#1d242d] px-4 py-2.5 rounded-xl border border-[#2b3542] text-xs">
                  <span className="text-[#96a5b5]">Serving to Table:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[#d4a359] font-mono font-bold">#</span>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-12 text-center bg-[#15191f] border border-[#3b4756] rounded px-1 py-0.5 text-white font-mono font-bold"
                    />
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                {cart.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 bg-[#1c222b] border border-[#2a3441] rounded-2xl p-3.5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-sm text-white font-medium truncate">{item.name}</h4>
                      <p className="font-mono text-xs text-[#f5d79e]">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center space-x-2 bg-[#14181e] px-2 py-1 rounded-lg border border-[#2b3542]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                        className="text-[#9cb0c4] hover:text-white p-0.5"
                      >
                        {quantity === 1 ? <Trash2 size={13} className="text-red-400" /> : <Minus size={13} />}
                      </button>
                      <span className="font-mono text-xs text-white font-bold w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                        className="text-[#9cb0c4] hover:text-white p-0.5"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tip Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#8696a6] font-mono mb-2">
                  Add Chef &amp; Service Tip
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 10, 15, 20].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTipPercent(t)}
                      className={`py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                        tipPercent === t
                          ? 'bg-[#d4a359] text-black font-bold'
                          : 'bg-[#1c222a] text-[#96a5b5] hover:bg-[#252f3b]'
                      }`}
                    >
                      {t === 0 ? 'None' : `${t}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order Notes */}
              <div>
                <input
                  type="text"
                  placeholder="Kitchen notes (e.g. dressing on the side)..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-[#1c222a] border border-[#2b3644] rounded-xl px-3.5 py-2 text-xs text-white placeholder-[#6d7e90] focus:outline-none focus:border-[#d4a359]"
                />
              </div>

              {/* Financial Calculation Summary */}
              <div className="bg-[#181e25] rounded-2xl p-4 border border-[#28323e] space-y-2 text-xs text-[#a3b3c3]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (10%)</span>
                  <span className="font-mono text-white">${tax.toFixed(2)}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between text-[#f5d79e]">
                    <span>Service Tip ({tipPercent}%)</span>
                    <span className="font-mono">${tip.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white border-t border-[#2a3441] pt-2 mt-1">
                  <span>Total</span>
                  <span className="font-mono text-[#d4a359] text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d4a359] to-[#b8863b] text-black font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-[1.01] transition-transform flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Send Order to Kitchen (${total.toFixed(2)})</span>
                <ArrowRight size={15} />
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
