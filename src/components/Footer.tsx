import React from 'react';
import { Glasses, Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { STORE_CONTACTS, buildWhatsAppLink } from '../data/initialData';
import { useSiteSettings } from '../lib/useSiteSettings';
import { Category } from '../types';

interface FooterProps {
  onNavigate: (page: string, categorySlug?: string) => void;
  onScrollToSection?: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  categories?: Category[];
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onScrollToSection, categories = [] }) => {
  const { settings } = useSiteSettings();
  // Use live categories only - no hardcoded fallback
  const displayCategories = categories || [];

  const handleNav = (targetId: string, pageFallback = 'home', slugFallback?: string) => {
    if (onScrollToSection) {
      onScrollToSection(targetId);
    } else {
      onNavigate(pageFallback, slugFallback);
    }
  };

  return (
    <footer className="w-full bg-[#111111] text-[#A69F94] pt-16 pb-10 border-t border-[#242424] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#242424]">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div
              onClick={() => handleNav('home', 'home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 border border-[#C89B4A]/70 flex items-center justify-center bg-[#1A1A1A] rounded-sm">
                <Glasses className="w-6 h-6 text-[#C89B4A] stroke-[1.75]" />
              </div>
              <div>
                <div className="font-serif text-xl font-bold tracking-[0.08em] text-white">
                  DEFENCE <span className="text-[#C89B4A]">OPTICS</span>
                </div>
                <div className="text-[9px] tracking-[0.2em] text-[#8C8478] uppercase">
                  EYEWEAR &bull; SUNGLASSES &bull; FRAMES
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8F887C] leading-relaxed max-w-sm">
              &ldquo;See Better. Look Better.&rdquo; Defence Optics crafts luxury prescription eyewear and polarized sunglasses designed for visual clarity, precision comfort, and enduring character.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs">
              <a
                href={buildWhatsAppLink(settings.whatsapp, 'Hello Defence Optics, I would like to inquire about frames and lenses.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 min-h-[44px] px-4 py-2.5 bg-[#1A1A1A] border border-[#2E2E2E] text-white hover:border-[#25D366] hover:text-[#25D366] transition-colors rounded-lg"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="font-medium">Chat on WhatsApp ({settings.whatsapp})</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation & Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Collections & Pages
            </h4>
            <ul className="space-y-1 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home', 'home')}
                  className="hover:text-[#C89B4A] transition-colors cursor-pointer py-1.5 min-h-[36px] flex items-center text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'shop')}
                  className="hover:text-[#C89B4A] transition-colors cursor-pointer py-1.5 min-h-[36px] flex items-center text-left"
                >
                  Shop All Eyewear
                </button>
              </li>
              {displayCategories.map((cat) => (
                <li key={cat.id || cat.slug}>
                  <button
                    onClick={() => handleNav(cat.slug, 'category', cat.slug)}
                    className="hover:text-[#C89B4A] transition-colors cursor-pointer py-1.5 min-h-[36px] flex items-center text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('about', 'about')}
                  className="hover:text-[#C89B4A] transition-colors cursor-pointer py-1.5 min-h-[36px] flex items-center text-left"
                >
                  About the Brand
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact', 'contact')}
                  className="hover:text-[#C89B4A] transition-colors cursor-pointer py-1.5 min-h-[36px] flex items-center text-left"
                >
                  Contact & Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Concierge & Showroom (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Showroom & Concierge
            </h4>
            <ul className="space-y-2 text-xs text-[#8F887C]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C89B4A] shrink-0 mt-1" />
                <div>
                  <a
                    href={settings.map_url || STORE_CONTACTS.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-block leading-relaxed"
                  >
                    {settings.showroom || STORE_CONTACTS.showroom}
                  </a>
                  <a
                    href={settings.map_url || STORE_CONTACTS.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[38px] text-[11px] text-[#C89B4A] hover:underline font-semibold"
                  >
                    Get Directions (Google Maps) ↗
                  </a>
                </div>
              </li>
              <li>
                <a
                  href={`tel:${settings.phone || STORE_CONTACTS.phone}`}
                  className="flex items-center gap-2.5 min-h-[44px] hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C89B4A] shrink-0" />
                  <span>{settings.phone || STORE_CONTACTS.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email || STORE_CONTACTS.email}`}
                  className="flex items-center gap-2.5 min-h-[44px] hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#C89B4A] shrink-0" />
                  <span>{settings.email || STORE_CONTACTS.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#C89B4A] shrink-0 mt-0.5" />
                <span>{settings.hours || STORE_CONTACTS.hours}</span>
              </li>
            </ul>

            {/* Payment Acceptance Badges */}
            <div className="pt-3">
              <span className="text-[10px] text-[#706B62] uppercase tracking-wider block mb-2 font-semibold">
                Accepted Payment Methods
              </span>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                <span className="bg-[#1A1A1A] border border-[#2E2E2E] px-2.5 py-1 text-white rounded">
                  Cash on Delivery (COD)
                </span>
                <span className="bg-[#1A1A1A] border border-[#D12053]/40 px-2.5 py-1 text-[#E87395] rounded">
                  bKash
                </span>
                <span className="bg-[#1A1A1A] border border-[#F7931E]/40 px-2.5 py-1 text-[#FDBA74] rounded">
                  Nagad
                </span>
                <span className="bg-[#1A1A1A] border border-[#25D366]/40 px-2.5 py-1 text-[#4ADE80] rounded">
                  WhatsApp Order
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Mandatory Developer Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E685F] gap-3 sm:gap-4 text-center sm:text-left">
          <div className="break-words">
            &copy; {new Date().getFullYear()} Defence Optics. All rights reserved. &bull; See Better. Look Better.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <span className="hover:text-[#C89B4A] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#C89B4A] transition-colors cursor-pointer">Terms of Service</span>
            <div className="text-[#C89B4A] font-medium tracking-wide">
              Developed by AkashProg
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
