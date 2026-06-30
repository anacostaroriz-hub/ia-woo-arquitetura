export type AIStatus = 'Planejado' | 'Implementado';

export interface AIPoint {
  id: string;
  description: string;
  status: AIStatus;
  link: string;
}

export interface Step {
  id: string;
  name: string;
  responsible: string;
  estimated_time: string;
  tools: string;
  notes: string;
  ai_points: AIPoint[];
  order_index: number;
}

export interface Phase {
  id: string;
  name: string;
  steps: Step[];
  order_index: number;
  color: string;
}

export interface Area {
  id: string;
  name: string;
  phases: Phase[];
  order_index: number;
}

export interface AppData {
  areas: Area[];
}
