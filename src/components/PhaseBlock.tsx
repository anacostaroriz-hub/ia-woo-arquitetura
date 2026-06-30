'use client';

import { Phase, Step } from '@/types';
import { InlineEdit } from './InlineEdit';
import { StepCard } from './StepCard';

function uid() {
  return Math.random().toString(36).slice(2, 11);
}

interface PhaseBlockProps {
  phase: Phase;
  onChange: (updated: Phase) => void;
  onRemove: () => void;
}

export function PhaseBlock({ phase, onChange, onRemove }: PhaseBlockProps) {
  function updateStep(id: string, updated: Step) {
    onChange({
      ...phase,
      steps: phase.steps.map((s) => (s.id === id ? updated : s)),
    });
  }

  function removeStep(id: string) {
    onChange({ ...phase, steps: phase.steps.filter((s) => s.id !== id) });
  }

  function addStep() {
    const newStep: Step = {
      id: uid(),
      name: '',
      responsible: '',
      estimated_time: '',
      tools: '',
      notes: '',
      order_index: phase.steps.length,
      ai_points: [],
    };
    onChange({ ...phase, steps: [...phase.steps, newStep] });
  }

  function moveStep(index: number, direction: 'up' | 'down') {
    const steps = [...phase.steps];
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= steps.length) return;
    [steps[index], steps[target]] = [steps[target], steps[index]];
    onChange({ ...phase, steps: steps.map((s, i) => ({ ...s, order_index: i })) });
  }

  const aiTotal = phase.steps.reduce((acc, s) => acc + s.ai_points.length, 0);
  const aiImplemented = phase.steps.reduce(
    (acc, s) => acc + s.ai_points.filter((p) => p.status === 'Implementado').length,
    0
  );

  return (
    <div className="mb-8">
      {/* Phase header */}
      <div className="flex items-center gap-3 mb-3 group/phase">
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: phase.color }} />
        <InlineEdit
          value={phase.name}
          onChange={(v) => onChange({ ...phase, name: v })}
          placeholder="Nome da fase…"
          className="text-sm font-medium tracking-widest text-stone-500 uppercase"
        />
        {aiTotal > 0 && (
          <span className="text-[10px] font-light text-stone-400">
            {aiImplemented}/{aiTotal} IA
          </span>
        )}
        <button
          onClick={onRemove}
          className="opacity-0 group-hover/phase:opacity-100 transition-opacity text-stone-200 hover:text-red-400 text-xs ml-auto"
          title="Remover fase"
        >
          Remover fase
        </button>
      </div>

      {/* Steps */}
      <div className="space-y-2 pl-6">
        {phase.steps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            phaseColor={phase.color}
            isFirst={index === 0}
            isLast={index === phase.steps.length - 1}
            onChange={(updated) => updateStep(step.id, updated)}
            onRemove={() => removeStep(step.id)}
            onMoveUp={() => moveStep(index, 'up')}
            onMoveDown={() => moveStep(index, 'down')}
          />
        ))}

        <button
          onClick={addStep}
          className="w-full border border-dashed border-stone-200 rounded-xl py-2.5 text-xs text-stone-300 hover:text-stone-400 hover:border-stone-300 transition-colors font-light tracking-wide"
        >
          + adicionar etapa
        </button>
      </div>
    </div>
  );
}
