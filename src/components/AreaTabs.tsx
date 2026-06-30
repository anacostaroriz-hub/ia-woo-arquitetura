'use client';

import { Area } from '@/types';

interface AreaTabsProps {
  areas: Area[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function AreaTabs({ areas, activeIndex, onSelect }: AreaTabsProps) {
  return (
    <div className="flex gap-1 border-b border-stone-100 pb-0 overflow-x-auto">
      {areas.map((area, i) => {
        let totalAI = 0;
        let steps = 0;
        for (const phase of area.phases) {
          steps += phase.steps.length;
          for (const step of phase.steps) {
            totalAI += step.ai_points.length;
          }
        }
        const active = i === activeIndex;
        return (
          <button
            key={area.id}
            onClick={() => onSelect(i)}
            className={`relative px-5 py-3.5 text-sm font-light tracking-wide transition-all whitespace-nowrap ${
              active
                ? 'text-stone-800 border-b-2 border-stone-700 -mb-px'
                : 'text-stone-400 hover:text-stone-600 border-b-2 border-transparent'
            }`}
          >
            {area.name}
            {(totalAI > 0 || steps > 0) && (
              <span className="ml-2 text-[10px] text-stone-300 font-light">
                {steps > 0 && `${steps} etapas`}
                {steps > 0 && totalAI > 0 && ' · '}
                {totalAI > 0 && `${totalAI} IA`}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
