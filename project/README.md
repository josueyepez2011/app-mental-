# MentalCare - Aplicación de Bienestar Emocional

Una aplicación completa de bienestar mental con IA, seguimiento de estado de ánimo y conexión con profesionales.

## 🚀 Configuración de Supabase

Para conectar la aplicación a Supabase y que los datos se guarden correctamente, sigue estos pasos:

### 1. Crear un proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Clic en "New Project"
4. Selecciona tu organización
5. Ingresa el nombre del proyecto (ej: "mentalcare-app")
6. Crea una contraseña segura para la base de datos
7. Selecciona una región cercana a tus usuarios
8. Clic en "Create new project"
9. Espera a que se complete la configuración (puede tomar unos minutos)

### 2. Obtener las credenciales

1. Una vez creado el proyecto, ve a **Settings** (⚙️) en el menú lateral
2. Clic en **API** en el submenu
3. En la sección "Project API keys", encontrarás:
   - **Project URL**: Algo como `https://abcdefghijklmnop.supabase.co`
   - **anon public**: Una clave larga que empieza con `eyJ...`

### 3. Configurar las variables de entorno

1. En la raíz del proyecto, edita el archivo `.env`
2. Reemplaza los valores con tus credenciales reales:

```env
# Reemplaza con tu Project URL real
VITE_SUPABASE_URL=https://tu-proyecto-real.supabase.co

# Reemplaza con tu anon public key real
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Aplicar las migraciones de base de datos

Las migraciones ya están configuradas en la carpeta `supabase/migrations/`. Para aplicarlas:

**Opción A: Usando Supabase CLI (Recomendado)**
```bash
# Instalar Supabase CLI
npm install -g supabase

# Iniciar sesión
supabase login

# Vincular tu proyecto (reemplaza con tu project-ref)
supabase link --project-ref tu-project-ref

# Aplicar las migraciones
supabase db push
```

**Opción B: Manualmente en el Dashboard**
1. Ve a tu proyecto en [app.supabase.com](https://app.supabase.com)
2. Ve a **SQL Editor** en el menú lateral
3. Copia y ejecuta el contenido de cada archivo de migración en orden:
   - `supabase/migrations/20250624214617_still_fountain.sql`
   - `supabase/migrations/20250624221729_red_spring.sql`
   - `supabase/migrations/20250625123234_noisy_bar.sql`
   - `supabase/migrations/20250625124008_light_wind.sql`

### 5. Verificar las tablas

Después de aplicar las migraciones, ve a **Table Editor** en tu dashboard de Supabase y verifica que se crearon estas tablas:

- ✅ `user_profiles`: Para almacenar perfiles de usuario
- ✅ `emergency_logs`: Para registros de emergencia

### 6. Reiniciar el servidor de desarrollo

```bash
npm run dev
```

### 7. Probar la conexión

1. Abre la aplicación en tu navegador
2. Ve a la consola del navegador (F12)
3. Deberías ver mensajes como:
   - `✅ Supabase client initialized successfully`
   - `✅ Conexión a Supabase exitosa`

## 🔧 Solución de problemas

### Error: "Supabase not configured"
- Verifica que las variables en `.env` estén correctas
- Asegúrate de que no haya espacios extra en las variables
- Reinicia el servidor de desarrollo

### Error: "Failed to initialize Supabase client"
- Verifica que la URL y la clave sean correctas
- Asegúrate de que el proyecto de Supabase esté activo

### Error: "PGRST116" o "relation does not exist"
- Las migraciones no se aplicaron correctamente
- Ejecuta las migraciones manualmente en el SQL Editor

### Los datos no se guardan en Supabase
- Verifica la conexión en la consola del navegador
- Revisa que las políticas RLS estén configuradas correctamente
- Los datos se guardan en localStorage como respaldo si Supabase falla

## ✨ Funcionalidades

- ✅ Sistema de registro y login con Supabase
- ✅ Chat con IA (Gemini)
- ✅ Seguimiento de estado de ánimo
- ✅ Protocolo de emergencia
- ✅ Conexión con psicólogos
- ✅ Análisis de imágenes (Premium)
- ✅ Personalización de interfaz
- ✅ Soporte multiidioma (8 idiomas)
- ✅ Almacenamiento en Supabase con fallback a localStorage
- ✅ Sincronización automática

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🚀 Despliegue

La aplicación está configurada para desplegarse en Netlify. Asegúrate de configurar las variables de entorno en tu plataforma de despliegue:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📊 Estructura de la base de datos

### Tabla: user_profiles
```sql
- id (uuid, primary key)
- name (text, required)
- email (text, unique, required)
- password (text, required, hashed)
- age (integer, optional)
- concerns (text[], array of concerns)
- emergency_contact (text, required)
- emergency_contact_name (text, required)
- cultural_background (text, optional)
- preferred_language (text, default 'es')
- created_at (timestamptz)
- updated_at (timestamptz)
```

### Tabla: emergency_logs
```sql
- id (uuid, primary key)
- user_name (text, required)
- user_email (text, required)
- emergency_contact_name (text, required)
- emergency_contact_phone (text, required)
- trigger_reason (text, required)
- activated_at (timestamptz)
- user_id (uuid, optional)
- created_at (timestamptz)
```

## 🔒 Seguridad

- Las contraseñas se almacenan hasheadas
- Row Level Security (RLS) habilitado
- Políticas de acceso configuradas
- Datos encriptados en tránsito y en reposo
- Fallback a localStorage para funcionalidad offline