'use client';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === 'idle') return null;

  const config = {
    saving: { text: 'Salvando…', dot: 'bg-amber-400', text_color: 'text-stone-500' },
    saved: { text: 'Salvo ✓', dot: 'bg-emerald-400', text_color: 'text-stone-500' },
    error: { text: 'Erro ao salvar', dot: 'bg-red-400', text_color: 'text-red-500' },
  }[status];

  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === 'saving' ? 'animate-pulse' : ''}`} />
      <span className={`text-xs font-light tracking-wide ${config.text_color}`}>{config.text}</span>
    </div>
  );
}
