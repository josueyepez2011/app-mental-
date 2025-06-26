/*
  # Crear tabla de perfiles de usuario

  1. Nueva Tabla
    - `user_profiles`
      - `id` (uuid, primary key)
      - `name` (text, nombre del usuario)
      - `email` (text, email único)
      - `age` (integer, edad opcional)
      - `concerns` (text array, preocupaciones seleccionadas)
      - `emergency_contact` (text, teléfono de emergencia)
      - `emergency_contact_name` (text, nombre del contacto)
      - `cultural_background` (text, trasfondo cultural)
      - `preferred_language` (text, idioma preferido)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Seguridad
    - Habilitar RLS en la tabla `user_profiles`
    - Agregar políticas para que los usuarios puedan crear y leer sus propios datos
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  age integer,
  concerns text[] DEFAULT '{}',
  emergency_contact text NOT NULL,
  emergency_contact_name text NOT NULL,
  cultural_background text DEFAULT '',
  preferred_language text DEFAULT 'es',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (email = auth.jwt() ->> 'email')
  WITH CHECK (email = auth.jwt() ->> 'email');

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();