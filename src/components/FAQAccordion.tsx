import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../data/faq';

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="rounded-xl border border-slate-800 bg-[#111C2E] overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:bg-slate-800/50"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className="font-semibold text-white text-sm sm:text-base pr-2">
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-emerald-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div
                id={`faq-answer-${item.id}`}
                className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
