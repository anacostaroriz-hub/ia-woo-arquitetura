'use client';

import { AIPoint, AIStatus } from '@/types';
import { InlineEdit } from './InlineEdit';

interface AIPointItemProps {
  point: AIPoint;
  onChange: (updated: AIPoint) => void;
  onRemove: () => void;
}

export function AIPointItem({ point, onChange, onRemove }: AIPointItemProps) {
  function update(field: keyof AIPoint, val: string) {
    onChange({ ...point, [field]: val });
  }

  function toggleStatus() {
    const next: AIStatus = point.status === 'Planejado' ? 'Implementado' : 'Planejado';
    onChange({ ...point, status: next });
  }

  return (
    <div className="flex gap-3 items-start group/ai py-2 border-b border-stone-100 last:border-0">
      <button
        onClick={toggleStatus}
        title="Alternar status"
        className={`mt-0.5 w-3.5 h-3.5 rounded-full flex-shrink-0 border transition-colors ${
          point.status === 'Implementado'
            ? 'bg-[#A8B5A2] border-[#A8B5A2]'
            : 'bg-transparent border-[#C9B99A]'
        }`}
      />
      <div className="flex-1 min-w-0">
        <InlineEdit
          value={point.description}
          onChange={(v) => update('description', v)}
          placeholder="Descreva o ponto de IA…"
          className="text-sm text-stone-700 font-light leading-relaxed block"
        />
        <div className="flex gap-3 mt-1.5 flex-wrap">
          <span
            onClick={toggleStatus}
            className={`cursor-pointer text-[10px] font-medium tracking-widest px-2 py-0.5 rounded-full transition-colors ${
              point.status === 'Implementado'
                ? 'bg-[#A8B5A2]/20 text-[#6b8f65]'
                : 'bg-[#C9B99A]/20 text-[#8a7560]'
            }`}
          >
            {point.status.toUpperCase()}
          </span>
          <InlineEdit
            value={point.link}
            onChange={(v) => update('link', v)}
            placeholder="Link de referência…"
            className="text-[11px] text-[#B0B8C8] font-light"
          />
        </div>
      </div>
      <button
        onClick={onRemove}
        className="opacity-0 group-hover/ai:opacity-100 transition-opacity text-stone-300 hover:text-red-400 text-xs flex-shrink-0 mt-0.5"
        title="Remover"
      >
        ✕
      </button>
    </div>
  );
}
