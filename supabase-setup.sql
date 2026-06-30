-- Execute este SQL no Supabase SQL Editor
-- Menu: Database → SQL Editor → New Query

-- 1. Criar a tabela principal
CREATE TABLE IF NOT EXISTS app_state (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Permitir leitura e escrita sem autenticação (qualquer pessoa com o link pode editar)
ALTER TABLE app_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all_read"
  ON app_state FOR SELECT
  USING (true);

CREATE POLICY "allow_all_write"
  ON app_state FOR INSERT
  WITH CHECK (true);

CREATE POLICY "allow_all_update"
  ON app_state FOR UPDATE
  USING (true);
