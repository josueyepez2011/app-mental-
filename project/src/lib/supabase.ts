import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any = null;
let isSupabaseAvailable = false;

// Inicializar cliente de Supabase
if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://tu-proyecto.supabase.co') {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    isSupabaseAvailable = true;
    console.log('✅ Supabase client initialized successfully');
    console.log('🔗 URL:', supabaseUrl);
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error);
    isSupabaseAvailable = false;
  }
} else {
  console.warn('⚠️ Supabase not configured. Using localStorage fallback.');
  console.log('📋 Para configurar Supabase:');
  console.log('1. Crea un proyecto en https://supabase.com');
  console.log('2. Ve a Settings > API');
  console.log('3. Copia la Project URL y anon key al archivo .env');
  console.log('4. Reinicia el servidor de desarrollo');
  isSupabaseAvailable = false;
}

export { supabase };

// Interfaces de TypeScript
export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  password: string;
  age?: number;
  concerns: string[];
  emergency_contact: string;
  emergency_contact_name: string;
  cultural_background?: string;
  preferred_language: string;
  created_at?: string;
  updated_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface EmergencyLog {
  id?: string;
  user_name: string;
  user_email: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  trigger_reason: string;
  activated_at?: string;
  user_id?: string;
  created_at?: string;
}

// Funciones de utilidad para contraseñas
const hashPassword = (password: string): string => {
  return btoa(password + 'mentalcare_salt_2024');
};

const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return hashPassword(password) === hashedPassword;
};

// Función para probar la conexión a Supabase
export const testSupabaseConnection = async (): Promise<boolean> => {
  if (!isSupabaseAvailable || !supabase) {
    console.log('❌ Supabase no está disponible');
    return false;
  }

  try {
    console.log('🔄 Probando conexión a Supabase...');
    
    // Intentar hacer una consulta simple
    const { data, error } = await supabase
      .from('user_profiles')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('❌ Error en la prueba de conexión:', error);
      return false;
    }

    console.log('✅ Conexión a Supabase exitosa');
    console.log('📊 Tabla user_profiles accesible');
    return true;
  } catch (error) {
    console.error('❌ Error al probar conexión:', error);
    return false;
  }
};

// Función para guardar perfil de usuario
export const saveUserProfile = async (profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    console.log('🚀 Iniciando guardado de perfil...');
    console.log('📝 Datos del perfil:', {
      name: profile.name,
      email: profile.email,
      age: profile.age,
      concerns: profile.concerns,
      emergency_contact_name: profile.emergency_contact_name,
      cultural_background: profile.cultural_background,
      preferred_language: profile.preferred_language
    });

    // Hash de la contraseña
    const hashedPassword = hashPassword(profile.password);
    const profileToSave = { ...profile, password: hashedPassword };

    // Si Supabase no está disponible, usar localStorage
    if (!isSupabaseAvailable || !supabase) {
      console.warn('⚠️ Supabase no disponible, guardando en localStorage');
      const profileWithId = {
        ...profileToSave,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('userProfile', JSON.stringify(profileWithId));
      localStorage.setItem('userProfiles', JSON.stringify([profileWithId]));
      return profileWithId;
    }

    // Verificar si el email ya existe
    console.log('🔍 Verificando si el email ya existe...');
    const { data: existingUser, error: checkError } = await supabase
      .from('user_profiles')
      .select('id, email')
      .eq('email', profile.email)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error al verificar email existente:', checkError);
      throw new Error('Error al verificar el email');
    }

    if (existingUser) {
      console.warn('⚠️ Email ya existe:', profile.email);
      throw new Error('Ya existe una cuenta con este correo electrónico');
    }

    // Insertar nuevo perfil
    console.log('💾 Insertando perfil en Supabase...');
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([profileToSave])
      .select()
      .single();

    if (error) {
      console.error('❌ Error al insertar en Supabase:', error);
      
      // Manejar errores específicos
      if (error.code === '23505') {
        throw new Error('Ya existe una cuenta con este correo electrónico');
      }
      
      // Fallback a localStorage
      console.log('📱 Usando localStorage como respaldo...');
      const profileWithId = {
        ...profileToSave,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('userProfile', JSON.stringify(profileWithId));
      return profileWithId;
    }

    console.log('✅ Perfil guardado exitosamente en Supabase:', data.id);
    
    // También guardar en localStorage como backup
    localStorage.setItem('userProfile', JSON.stringify(data));
    
    return data;
  } catch (error) {
    console.error('❌ Error en saveUserProfile:', error);
    
    // Si es un error conocido, relanzarlo
    if (error instanceof Error && error.message.includes('Ya existe una cuenta')) {
      throw error;
    }
    
    // Fallback a localStorage para otros errores
    console.log('📱 Fallback a localStorage por error...');
    const hashedPassword = hashPassword(profile.password);
    const profileWithId = {
      ...profile,
      password: hashedPassword,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    localStorage.setItem('userProfile', JSON.stringify(profileWithId));
    return profileWithId;
  }
};

// Función para obtener perfil de usuario
export const getUserProfile = async (email: string) => {
  try {
    console.log('🔍 Buscando perfil para:', email);

    if (!isSupabaseAvailable || !supabase) {
      console.log('📱 Usando localStorage para obtener perfil');
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.email === email) {
          console.log('✅ Perfil encontrado en localStorage');
          return profile;
        }
      }
      return null;
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('❌ Error al obtener perfil:', error);
      // Intentar localStorage como fallback
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.email === email) {
          console.log('📱 Usando localStorage como fallback');
          return profile;
        }
      }
      throw error;
    }

    if (data) {
      console.log('✅ Perfil encontrado en Supabase');
      localStorage.setItem('userProfile', JSON.stringify(data));
    } else {
      console.log('❌ Perfil no encontrado');
    }

    return data;
  } catch (error) {
    console.error('❌ Error en getUserProfile:', error);
    throw error;
  }
};

// Función para actualizar perfil de usuario
export const updateUserProfile = async (email: string, updates: Partial<UserProfile>) => {
  try {
    console.log('🔄 Actualizando perfil para:', email);

    if (!isSupabaseAvailable || !supabase) {
      console.log('📱 Actualizando en localStorage');
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.email === email) {
          const updatedProfile = { 
            ...profile, 
            ...updates, 
            updated_at: new Date().toISOString() 
          };
          localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
          return updatedProfile;
        }
      }
      throw new Error('Perfil no encontrado');
    }

    // Si se actualiza la contraseña, hashearla
    const updatesToSave = { ...updates };
    if (updates.password) {
      updatesToSave.password = hashPassword(updates.password);
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update(updatesToSave)
      .eq('email', email)
      .select()
      .single();

    if (error) {
      console.error('❌ Error al actualizar perfil:', error);
      throw error;
    }

    console.log('✅ Perfil actualizado en Supabase');
    localStorage.setItem('userProfile', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('❌ Error en updateUserProfile:', error);
    throw error;
  }
};

// Función para guardar log de emergencia
export const saveEmergencyLog = async (emergencyData: Omit<EmergencyLog, 'id' | 'created_at' | 'activated_at'>) => {
  try {
    console.log('🚨 Guardando log de emergencia...');
    
    const logData = {
      ...emergencyData,
      activated_at: new Date().toISOString()
    };

    if (!isSupabaseAvailable || !supabase) {
      console.warn('⚠️ Guardando log de emergencia en localStorage');
      const logWithId = {
        ...logData,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      
      const existingLogs = localStorage.getItem('emergencyLogs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push(logWithId);
      localStorage.setItem('emergencyLogs', JSON.stringify(logs));
      
      return logWithId;
    }

    const { data, error } = await supabase
      .from('emergency_logs')
      .insert([logData])
      .select()
      .single();

    if (error) {
      console.error('❌ Error al guardar log de emergencia:', error);
      // Fallback a localStorage
      const logWithId = {
        ...logData,
        id: Date.now().toString(),
        created_at: new Date().toISOString()
      };
      
      const existingLogs = localStorage.getItem('emergencyLogs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push(logWithId);
      localStorage.setItem('emergencyLogs', JSON.stringify(logs));
      
      return logWithId;
    }

    console.log('✅ Log de emergencia guardado en Supabase');
    return data;
  } catch (error) {
    console.error('❌ Error en saveEmergencyLog:', error);
    // Fallback a localStorage
    const logWithId = {
      ...emergencyData,
      id: Date.now().toString(),
      activated_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    
    const existingLogs = localStorage.getItem('emergencyLogs');
    const logs = existingLogs ? JSON.parse(existingLogs) : [];
    logs.push(logWithId);
    localStorage.setItem('emergencyLogs', JSON.stringify(logs));
    
    return logWithId;
  }
};

// Función para obtener logs de emergencia
export const getEmergencyLogs = async () => {
  try {
    if (!isSupabaseAvailable || !supabase) {
      const savedLogs = localStorage.getItem('emergencyLogs');
      return savedLogs ? JSON.parse(savedLogs) : [];
    }

    const { data, error } = await supabase
      .from('emergency_logs')
      .select('*')
      .order('activated_at', { ascending: false });

    if (error) {
      console.error('❌ Error al obtener logs de emergencia:', error);
      const savedLogs = localStorage.getItem('emergencyLogs');
      return savedLogs ? JSON.parse(savedLogs) : [];
    }

    return data || [];
  } catch (error) {
    console.error('❌ Error en getEmergencyLogs:', error);
    const savedLogs = localStorage.getItem('emergencyLogs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  }
};

// Función para login de usuario
export const loginUser = async (credentials: LoginCredentials): Promise<UserProfile | null> => {
  try {
    console.log('🔄 Intentando login para:', credentials.email);
    
    const profile = await getUserProfile(credentials.email);
    
    if (!profile) {
      throw new Error('Usuario no encontrado');
    }

    if (!verifyPassword(credentials.password, profile.password)) {
      throw new Error('Contraseña incorrecta');
    }

    // Guardar sesión actual
    localStorage.setItem('currentUser', JSON.stringify({
      id: profile.id,
      email: profile.email,
      name: profile.name
    }));

    console.log('✅ Login exitoso para:', credentials.email);
    return profile;
  } catch (error) {
    console.error('❌ Error en loginUser:', error);
    throw error;
  }
};

// Función para logout
export const logoutUser = () => {
  localStorage.removeItem('currentUser');
  console.log('✅ Usuario desconectado exitosamente');
};

// Función para obtener usuario actual
export const getCurrentUser = () => {
  try {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  } catch (error) {
    console.error('❌ Error al obtener usuario actual:', error);
    return null;
  }
};

// Función para verificar si el usuario está logueado
export const isUserLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};

// Función para verificar el estado de Supabase
export const getSupabaseStatus = () => {
  return {
    isAvailable: isSupabaseAvailable,
    url: supabaseUrl,
    hasClient: !!supabase
  };
};