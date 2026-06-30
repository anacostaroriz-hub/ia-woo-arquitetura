'use client';

import { Area } from '@/types';

interface GlobalIndicatorsProps {
  areas: Area[];
}

export function GlobalIndicators({ areas }: GlobalIndicatorsProps) {
  let totalAI = 0;
  let implementedAI = 0;

  for (const area of areas) {
    for (const phase of area.phases) {
      for (const step of phase.steps) {
        totalAI += step.ai_points.length;
        implementedAI += step.ai_points.filter((p) => p.status === 'Implementado').length;
      }
    }
  }

  const pct = totalAI === 0 ? 0 : Math.round((implementedAI / totalAI) * 100);

  return (
    <div className="flex items-stretch gap-px bg-stone-200/30 rounded-2xl overflow-hidden border border-stone-100">
      <Stat label="Pontos mapeados" value={totalAI} />
      <Stat label="Implementados" value={implementedAI} accent="#A8B5A2" />
      <div className="bg-white px-6 py-4 flex-1 min-w-[120px]">
        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1.5">
          Conclusão
        </p>
        <p className="text-2xl font-extralight text-stone-700">{pct}%</p>
        <div className="mt-2 h-0.5 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: '#A8B5A2' }}
          />
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="bg-white px-6 py-4 flex-1 min-w-[120px]">
      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium mb-1.5">
        {label}
      </p>
      <p
        className="text-2xl font-extralight"
        style={{ color: accent || '#1C1C1C' }}
      >
        {value}
      </p>
    </div>
  );
}
