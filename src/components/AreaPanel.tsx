'use client';

import { Area, Phase } from '@/types';
import { PhaseBlock } from './PhaseBlock';

function uid() {
  return Math.random().toString(36).slice(2, 11);
}

const PHASE_COLORS = ['#C9B99A', '#A8B5A2', '#B0B8C8', '#C4B0C8', '#D4C5A9', '#B5C4B1'];

interface AreaPanelProps {
  area: Area;
  onChange: (updated: Area) => void;
}

export function AreaPanel({ area, onChange }: AreaPanelProps) {
  function updatePhase(id: string, updated: Phase) {
    onChange({
      ...area,
      phases: area.phases.map((p) => (p.id === id ? updated : p)),
    });
  }

  function removePhase(id: string) {
    onChange({ ...area, phases: area.phases.filter((p) => p.id !== id) });
  }

  function addPhase() {
    const newPhase: Phase = {
      id: uid(),
      name: 'Nova fase',
      order_index: area.phases.length,
      color: PHASE_COLORS[area.phases.length % PHASE_COLORS.length],
      steps: [],
    };
    onChange({ ...area, phases: [...area.phases, newPhase] });
  }

  return (
    <div className="py-6">
      {area.phases.map((phase) => (
        <PhaseBlock
          key={phase.id}
          phase={phase}
          onChange={(updated) => updatePhase(phase.id, updated)}
          onRemove={() => removePhase(phase.id)}
        />
      ))}

      <button
        onClick={addPhase}
        className="border border-dashed border-stone-200 rounded-xl py-3 px-6 text-xs text-stone-300 hover:text-stone-500 hover:border-stone-300 transition-colors font-light tracking-widest uppercase"
      >
        + adicionar fase
      </button>
    </div>
  );
}
