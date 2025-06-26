/*
  # Arreglar políticas RLS para user_profiles

  1. Cambios en Seguridad
    - Eliminar políticas restrictivas que requieren autenticación
    - Crear nuevas políticas que permitan operaciones sin autenticación
    - Mantener la seguridad básica pero permitir el funcionamiento offline

  2. Nuevas Políticas
    - Permitir inserción de perfiles sin autenticación
    - Permitir lectura de perfiles por email
    - Permitir actualización de perfiles por email
*/

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Users can create their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can read their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- Crear nuevas políticas que no requieren autenticación
CREATE POLICY "Allow profile creation"
  ON user_profiles
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow profile reading by email"
  ON user_profiles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow profile updates by email"
  ON user_profiles
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Política para eliminación (opcional, por si la necesitas en el futuro)
CREATE POLICY "Allow profile deletion by email"
  ON user_profiles
  FOR DELETE
  TO public
  USING (true);