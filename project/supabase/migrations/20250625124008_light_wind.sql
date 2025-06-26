/*
  # Crear tabla de registros de emergencia

  1. Nueva Tabla
    - `emergency_logs`
      - `id` (uuid, primary key)
      - `user_name` (text, nombre del usuario)
      - `user_email` (text, email del usuario)
      - `emergency_contact_name` (text, nombre del contacto de emergencia)
      - `emergency_contact_phone` (text, teléfono del contacto)
      - `trigger_reason` (text, razón que activó el protocolo)
      - `activated_at` (timestamp, cuándo se activó)
      - `user_id` (uuid, referencia al usuario si existe)

  2. Seguridad
    - Habilitar RLS en la tabla `emergency_logs`
    - Agregar políticas para permitir inserción y lectura
*/

CREATE TABLE IF NOT EXISTS emergency_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  user_email text NOT NULL,
  emergency_contact_name text NOT NULL,
  emergency_contact_phone text NOT NULL,
  trigger_reason text NOT NULL,
  activated_at timestamptz DEFAULT now(),
  user_id uuid,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE emergency_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow emergency log creation"
  ON emergency_logs
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow emergency log reading"
  ON emergency_logs
  FOR SELECT
  TO public
  USING (true);

-- Crear índice para búsquedas por email y fecha
CREATE INDEX IF NOT EXISTS idx_emergency_logs_email ON emergency_logs(user_email);
CREATE INDEX IF NOT EXISTS idx_emergency_logs_activated_at ON emergency_logs(activated_at);