/*
  # Agregar campo password a user_profiles

  1. Cambios en la tabla
    - Agregar columna `password` (text, requerido)
    - Actualizar la tabla existente para incluir el campo de contraseña

  2. Notas
    - El campo password almacenará la contraseña hasheada
    - Es requerido para el sistema de autenticación
*/

-- Agregar la columna password a la tabla user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'password'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN password text NOT NULL DEFAULT '';
  END IF;
END $$;

-- Remover el default después de agregar la columna
ALTER TABLE user_profiles ALTER COLUMN password DROP DEFAULT;