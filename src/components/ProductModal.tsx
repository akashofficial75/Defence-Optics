import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Zap, Check, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useSiteSettings } from '../lib/useSiteSettings';
import { RenderTrustIcon } from './TrustIcon';
import { buildWhatsAppLink } from '../data/initialData';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow?: (product: Product, quantity: number) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted = false,
  onToggleWishlist
}) => {
  const { settings } = useSiteSettings();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const hasDiscount = Boolean(product.discount_price && product.discount_price < product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.price - (product.discount_price as number)) / product.price) * 100)
    : 0;
  const currentPrice = hasDiscount ? (product.discount_price as number) : product.price;
  const savings = hasDiscount ? product.price - (product.discount_price as number) : 0;
  const isOutOfStock = product.stock_quantity <= 0;

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuy = () => {
    if (isOutOfStock) return;
    if (onBuyNow) {
      onBuyNow(product, quantity);
    } else {
      onAddToCart(product, quantity);
    }
  };

  const handleWhatsAppOrder = () => {
    if (isOutOfStock) return;
    const totalPrice = currentPrice * quantity;
    const message = `Hello Defence Optics, I want to order "${product.name}" via WhatsApp:

• Product: ${product.name}
• Code/ID: ${product.id}
• Quantity: ${quantity}
• Unit Price: ৳${currentPrice.toLocaleString()}
• Total: ৳${totalPrice.toLocaleString()}
${product.frame_shape ? `• Frame Shape: ${product.frame_shape}\n` : ''}${product.frame_material ? `• Material: ${product.frame_material}\n` : ''}
Please confirm my order and share delivery details.`;

    const whatsappUrl = buildWhatsAppLink(settings.whatsapp, message);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-start sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-[#F5F1EA] w-full max-w-4xl shadow-[0_24px_60px_rgba(0,0,0,0.22)] border-0 sm:border border-[#E0D7C9] overflow-hidden rounded-none sm:rounded-2xl my-0 sm:my-6 min-h-screen sm:min-h-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prominent High-Contrast Close Button (≥44px touch area) */}
        <button
          id="product-modal-close"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center bg-white text-[#141414] hover:bg-[#141414] hover:text-white transition-colors border border-[#D5CEC2] rounded-full cursor-pointer shadow-lg"
          aria-label="Close product modal"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Image Gallery (stacked on top on mobile, fixed 1:1 aspect ratio) */}
          <div className="p-4 sm:p-8 bg-white border-b md:border-b-0 md:border-r border-[#E5DFD4] flex flex-col justify-between">
            <div className="relative aspect-square w-full max-w-xs sm:max-w-none mx-auto bg-[#FAF8F5] border border-[#F0EBE1] overflow-hidden rounded-xl flex items-center justify-center p-3 sm:p-6">
              {hasDiscount && (
                <span className="absolute top-3 left-3 bg-[#D4A347] text-[#141414] font-bold text-xs uppercase px-2.5 py-1 z-10 rounded-md shadow-xs">
                  -{discountPercent}% OFF
                </span>
              )}
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80';
                }}
                className="max-w-full max-h-full w-auto h-auto object-contain object-center"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Thumbnail Switcher with Fixed Aspect Ratio */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2.5 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto py-1 justify-center sm:justify-start">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 aspect-square border rounded-lg overflow-hidden shrink-0 bg-[#FAF8F5] p-1 flex items-center justify-center transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#D4A347] ring-2 ring-[#D4A347]'
                        : 'border-[#E0D9CD] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80';
                      }}
                      className="max-w-full max-h-full w-auto h-auto object-contain object-center"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Ordering */}
          <div className="p-5 sm:p-8 flex flex-col justify-between bg-[#F5F1EA]">
            <div>
              {/* Category & Stock Status Header - with clearance for close button */}
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs uppercase tracking-wider mb-2.5 pr-12 sm:pr-14">
                <span className="text-[#8F887C] font-semibold tracking-wider truncate max-w-[170px] sm:max-w-xs">
                  {product.category_slug || 'Eyewear'} Collection
                </span>
                <span
                  id="product-stock-badge"
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider shrink-0 border shadow-xs ${
                    product.stock_quantity > 5
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : product.stock_quantity > 0
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      product.stock_quantity > 5
                        ? 'bg-emerald-600 animate-pulse'
                        : product.stock_quantity > 0
                        ? 'bg-amber-600'
                        : 'bg-red-600'
                    }`}
                  />
                  <span>
                    {product.stock_quantity > 5
                      ? 'IN STOCK'
                      : product.stock_quantity > 0
                      ? `ONLY ${product.stock_quantity} LEFT`
                      : 'OUT OF STOCK'}
                  </span>
                </span>
              </div>

              {/* Product Title */}
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#141414] uppercase leading-tight mb-2 sm:mb-3">
                {product.name}
              </h2>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-2.5 sm:gap-3 mb-4 sm:mb-5">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold font-sans text-[#141414]">
                  ৳{currentPrice.toLocaleString()}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm sm:text-base text-[#968F83] line-through font-sans">
                      ৳{product.price.toLocaleString()}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-[#A87D33] uppercase">
                      Save ৳{savings.toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#59544C] leading-relaxed mb-5 sm:mb-6">
                {product.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="bg-white/70 border border-[#E2DAD0] p-3 sm:p-3.5 mb-5 sm:mb-6 text-xs text-[#4A453D] space-y-1.5 rounded-lg">
                <div className="font-semibold text-[10.5px] sm:text-[11px] uppercase tracking-wider text-[#141414] mb-1">
                  Optical Dimensions & Craft
                </div>
                <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1 text-[11px]">
                  <div>
                    <span className="text-[#888176]">Shape:</span> {product.frame_shape || 'Classic'}
                  </div>
                  <div>
                    <span className="text-[#888176]">Material:</span> {product.frame_material || 'Acetate'}
                  </div>
                  {product.frame_width && (
                    <div>
                      <span className="text-[#888176]">Frame Width:</span> {product.frame_width}
                    </div>
                  )}
                  {product.lens_height && (
                    <div>
                      <span className="text-[#888176]">Lens Height:</span> {product.lens_height}
                    </div>
                  )}
                  {product.bridge && (
                    <div>
                      <span className="text-[#888176]">Bridge:</span> {product.bridge}
                    </div>
                  )}
                  <div>
                    <span className="text-[#888176]">UV Rating:</span> UV400 Polarized
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart / Buy Now / WhatsApp */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Controls (≥44px touch targets) */}
                <div className="flex items-center border border-[#D5CDBD] bg-white rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={isOutOfStock || quantity <= 1}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#141414] hover:bg-[#F5F1EA] disabled:opacity-30 cursor-pointer font-bold text-base"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-[#141414]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    disabled={isOutOfStock || quantity >= product.stock_quantity}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#141414] hover:bg-[#F5F1EA] disabled:opacity-30 cursor-pointer font-bold text-base"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist Toggle Button (≥44px touch target) */}
                <button
                  onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
                  className="min-w-[44px] min-h-[44px] border border-[#D5CDBD] bg-white rounded-lg flex items-center justify-center text-[#59554E] hover:text-[#D4A347] hover:border-[#D4A347] transition-colors cursor-pointer shadow-xs"
                  aria-label="Wishlist toggle"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'fill-[#D4A347] text-[#D4A347]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Primary Buttons */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  id="modal-add-cart-btn"
                  onClick={handleAdd}
                  disabled={isOutOfStock}
                  className={`btn-lift min-h-[46px] py-3 px-3 sm:px-4 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2 border rounded-lg cursor-pointer shadow-xs ${
                    isOutOfStock
                      ? 'bg-[#DDD7CB] text-[#8C8578] border-[#DDD7CB] cursor-not-allowed'
                      : addedAnimation
                      ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                      : 'bg-white text-[#141414] border-[#141414] hover:bg-[#141414] hover:text-white'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" /> Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>

                <button
                  id="modal-buy-now-btn"
                  onClick={handleBuy}
                  disabled={isOutOfStock}
                  className={`btn-lift min-h-[46px] py-3 px-3 sm:px-4 font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg cursor-pointer shadow-xs ${
                    isOutOfStock
                      ? 'bg-[#8C8578] text-white cursor-not-allowed'
                      : 'bg-[#101010] text-white hover:bg-[#C89B4A] hover:text-[#101010]'
                  }`}
                >
                  <Zap className="w-4 h-4 text-[#C89B4A] group-hover:text-[#101010] fill-current" />
                  <span>Buy Now</span>
                </button>
              </div>

              {/* Separate "Order via WhatsApp" button */}
              <button
                id="modal-whatsapp-order-btn"
                onClick={handleWhatsAppOrder}
                disabled={isOutOfStock}
                className="w-full min-h-[44px] py-2.5 px-4 bg-[#25D366]/10 text-[#0F6B38] hover:bg-[#25D366] hover:text-white border border-[#25D366]/35 rounded-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs group"
              >
                <MessageCircle className="w-4 h-4 fill-current text-[#25D366] group-hover:text-white transition-colors" />
                <span>Order via WhatsApp</span>
              </button>

              {/* Dynamic Trust Badges Guarantee */}
              <div className="pt-3 border-t border-[#E3DBD0] grid grid-cols-3 gap-1.5 sm:gap-2 text-[9.5px] sm:text-[10px] text-[#787166] text-center uppercase tracking-wider">
                {settings.trust_badges.map((badge) => (
                  <span key={badge.id} className="flex items-center justify-center gap-1">
                    <RenderTrustIcon name={badge.icon_name} className="w-3.5 h-3.5 text-[#C89B4A] shrink-0" />
                    <span className="truncate">{badge.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
