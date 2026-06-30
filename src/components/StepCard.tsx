'use client';

import { useState } from 'react';
import { Step, AIPoint } from '@/types';
import { InlineEdit } from './InlineEdit';
import { AIPointItem } from './AIPointItem';

function uid() {
  return Math.random().toString(36).slice(2, 11);
}

interface StepCardProps {
  step: Step;
  phaseColor: string;
  isFirst: boolean;
  isLast: boolean;
  onChange: (updated: Step) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function StepCard({
  step,
  phaseColor,
  isFirst,
  isLast,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: StepCardProps) {
  const [open, setOpen] = useState(false);

  function update(field: keyof Step, val: string) {
    onChange({ ...step, [field]: val });
  }

  function addAIPoint() {
    const newPoint: AIPoint = {
      id: uid(),
      description: '',
      status: 'Planejado',
      link: '',
    };
    onChange({ ...step, ai_points: [...step.ai_points, newPoint] });
  }

  function updateAIPoint(id: string, updated: AIPoint) {
    onChange({
      ...step,
      ai_points: step.ai_points.map((p) => (p.id === id ? updated : p)),
    });
  }

  function removeAIPoint(id: string) {
    onChange({ ...step, ai_points: step.ai_points.filter((p) => p.id !== id) });
  }

  const implementedCount = step.ai_points.filter((p) => p.status === 'Implementado').length;
  const totalAI = step.ai_points.length;

  return (
    <div className="group/step border border-stone-100 rounded-xl overflow-hidden bg-white transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Color accent */}
        <div
          className="w-0.5 h-6 rounded-full flex-shrink-0"
          style={{ backgroundColor: phaseColor }}
        />

        {/* Name */}
        <div className="flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
          <InlineEdit
            value={step.name}
            onChange={(v) => update('name', v)}
            placeholder="Nome da etapa…"
            className="text-sm font-light text-stone-800 tracking-wide block w-full"
          />
        </div>

        {/* AI badge */}
        {totalAI > 0 && (
          <span className="text-[10px] tracking-widest font-medium px-2 py-0.5 rounded-full bg-[#C9B99A]/15 text-[#8a7560] flex-shrink-0">
            {implementedCount}/{totalAI} IA
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover/step:opacity-100 transition-opacity">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="text-stone-300 hover:text-stone-500 disabled:opacity-20 text-xs px-1"
            title="Mover para cima"
          >
            ↑
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="text-stone-300 hover:text-stone-500 disabled:opacity-20 text-xs px-1"
            title="Mover para baixo"
          >
            ↓
          </button>
          <button
            onClick={onRemove}
            className="text-stone-200 hover:text-red-400 text-xs px-1 ml-1"
            title="Remover etapa"
          >
            ✕
          </button>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-stone-300 hover:text-stone-500 transition-colors ml-1 text-xs"
        >
          {open ? '▲' : '▼'}
        </button>
      </div>

      {/* Expanded body */}
      {open && (
        <div className="border-t border-stone-50 px-5 py-4 space-y-4 bg-stone-50/40">
          {/* Fields grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-1">
                Responsável
              </label>
              <InlineEdit
                value={step.responsible}
                onChange={(v) => update('responsible', v)}
                placeholder="—"
                className="text-sm text-stone-700 font-light"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-1">
                Tempo estimado
              </label>
              <InlineEdit
                value={step.estimated_time}
                onChange={(v) => update('estimated_time', v)}
                placeholder="—"
                className="text-sm text-stone-700 font-light"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-1">
                Ferramentas
              </label>
              <InlineEdit
                value={step.tools}
                onChange={(v) => update('tools', v)}
                placeholder="—"
                className="text-sm text-stone-700 font-light"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-stone-400 font-medium block mb-1">
              Detalhamento / Observações
            </label>
            <InlineEdit
              value={step.notes}
              onChange={(v) => update('notes', v)}
              placeholder="Adicione observações sobre esta etapa…"
              className="text-sm text-stone-700 font-light leading-relaxed w-full"
              multiline
            />
          </div>

          {/* AI Points */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                Pontos de IA
              </label>
              <button
                onClick={addAIPoint}
                className="text-[10px] tracking-widest font-medium text-[#A8B5A2] hover:text-[#7a9474] transition-colors flex items-center gap-1"
              >
                + adicionar
              </button>
            </div>
            {step.ai_points.length === 0 ? (
              <p className="text-xs text-stone-300 italic font-light py-1">
                Nenhum ponto de IA mapeado ainda.
              </p>
            ) : (
              <div className="rounded-lg bg-white border border-stone-100 px-3 divide-y divide-stone-50">
                {step.ai_points.map((pt) => (
                  <AIPointItem
                    key={pt.id}
                    point={pt}
                    onChange={(updated) => updateAIPoint(pt.id, updated)}
                    onRemove={() => removeAIPoint(pt.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
