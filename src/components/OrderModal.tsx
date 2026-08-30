import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Phone, User, Package } from 'lucide-react';
import type { ProductItem } from './CollectionSection';
import { useLanguage } from '../i18n/LanguageContext';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: ProductItem | null;
  selectedItemName?: string | null;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  selectedItemName,
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [productChoice, setProductChoice] = useState(
    selectedProduct
      ? selectedProduct.name
      : selectedItemName || t.orderModal.defaultTitle
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setProductChoice(selectedProduct.name);
    } else if (selectedItemName) {
      setProductChoice(selectedItemName);
    } else {
      setProductChoice(t.orderModal.defaultTitle);
    }
  }, [selectedProduct, selectedItemName, t.orderModal.defaultTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName('');
    setPhone('+998 ');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleReset}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl border border-white/20 bg-[#0a0a0a]/95 backdrop-blur-xl p-5 sm:p-8 shadow-2xl z-10 my-auto">
        <button
          type="button"
          onClick={handleReset}
          aria-label={t.orderModal.closeBtn}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-6 sm:py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 sm:mb-5">
              <CheckCircle2 size={30} />
            </div>
            <h3 className="text-xl sm:text-2xl font-medium text-white mb-2">
              {t.orderModal.successTitle}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-sm mb-6 leading-relaxed">
              {t.orderModal.successDescPrefix}
              {name || t.orderModal.clientFallback}
              {t.orderModal.successDescSuffix}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full bg-white px-6 py-2.5 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-white/85"
            >
              {t.orderModal.closeBtn}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5 sm:mb-6 pr-8">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/50 block mb-1">
                {t.orderModal.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-white">
                {selectedProduct
                  ? selectedProduct.name
                  : selectedItemName || t.orderModal.defaultTitle}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                {t.orderModal.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.1em] text-white/70 mb-1.5">
                  {t.orderModal.nameLabel}
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-white/40" />
                  <input
                    type="text"
                    required
                    placeholder={t.orderModal.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-10 py-3 text-base sm:text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.1em] text-white/70 mb-1.5">
                  {t.orderModal.phoneLabel}
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-3.5 text-white/40" />
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-10 py-3 text-base sm:text-sm text-white placeholder-white/40 focus:border-white/40 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-[0.1em] text-white/70 mb-1.5">
                  {t.orderModal.productLabel}
                </label>
                <div className="relative">
                  <Package size={16} className="absolute left-3.5 top-3.5 text-white/40" />
                  <select
                    value={productChoice}
                    onChange={(e) => setProductChoice(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#141414] px-10 py-3 text-base sm:text-sm text-white focus:border-white/40 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {t.collection.products.map((p) => (
                      <option key={p.id} value={p.name} className="bg-[#1a1a1a] text-white">
                        {p.name}
                      </option>
                    ))}
                    {t.assortment.items.map((it) => (
                      <option key={it.id} value={it.title} className="bg-[#1a1a1a] text-white">
                        {it.title}
                      </option>
                    ))}
                    {t.assortment.rawMaterials.map((rm) => (
                      <option key={rm.id} value={rm.title} className="bg-[#1a1a1a] text-white">
                        {rm.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-white py-3 sm:py-3.5 text-sm font-semibold text-black transition-all hover:bg-white/85 active:scale-[0.98]"
                >
                  {t.orderModal.submitCta}
                </button>
              </div>

              <p className="text-[10px] sm:text-[11px] text-center text-white/40 mt-2 font-mono">
                {t.orderModal.deliveryNotice}
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
