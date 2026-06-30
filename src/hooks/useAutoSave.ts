import { useEffect, useRef, useState, useCallback } from 'react';
import { Area } from '@/types';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export function useAutoSave(areas: Area[], enabled: boolean) {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevRef = useRef<string>('');

  const save = useCallback(async (data: Area[]) => {
    setStatus('saving');
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ areas: data }),
      });
      if (!res.ok) throw new Error('Save failed');
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const serialized = JSON.stringify(areas);
    if (serialized === prevRef.current) return;
    prevRef.current = serialized;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => save(areas), 800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [areas, enabled, save]);

  return status;
}
