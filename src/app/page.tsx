'use client';

import { useState, useEffect, useCallback } from 'react';
import { Area } from '@/types';
import { GlobalIndicators } from '@/components/GlobalIndicators';
import { AreaTabs } from '@/components/AreaTabs';
import { AreaPanel } from '@/components/AreaPanel';
import { SaveIndicator } from '@/components/SaveIndicator';
import { useAutoSave } from '@/hooks/useAutoSave';

export default function Home() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataReady, setDataReady] = useState(false);

  const saveStatus = useAutoSave(areas, dataReady);

  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/data');
      const json = await res.json();
      setAreas(json.areas || []);
    } catch {
      // silently fail on load error
    } finally {
      setLoading(false);
      setTimeout(() => setDataReady(true), 100);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function updateArea(id: string, updated: Area) {
    setAreas((prev) => prev.map((a) => (a.id === id ? updated : a)));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border border-stone-300 border-t-stone-600 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-stone-400 tracking-widest uppercase font-light">
            Carregando…
          </p>
        </div>
      </div>
    );
  }

  const activeArea = areas[activeTab];

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Header */}
      <header className="bg-[#1C1C1C] text-white px-8 py-6 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-light mb-1">
              WOO Arquitetura
            </p>
            <h1 className="text-xl font-extralight tracking-wide">
              IA{' '}
              <span className="text-stone-400 font-thin">— Inteligência Artificial Aplicada</span>
            </h1>
          </div>
          <SaveIndicator status={saveStatus} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Global indicators */}
        <GlobalIndicators areas={areas} />

        {/* Tabs + content */}
        <div>
          {areas.length > 0 && (
            <>
              <AreaTabs
                areas={areas}
                activeIndex={activeTab}
                onSelect={setActiveTab}
              />
              {activeArea && (
                <AreaPanel
                  area={activeArea}
                  onChange={(updated) => updateArea(activeArea.id, updated)}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center pb-10 pt-4">
        <p className="text-[10px] tracking-widest text-stone-300 font-light uppercase">
          WOO Arquitetura · Painel de IA · Edições salvas automaticamente
        </p>
      </footer>
    </div>
  );
}
