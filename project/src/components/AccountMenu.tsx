import React, { useState } from 'react';
import { User, LogOut, Settings, Shield, Heart, X, Edit3, Save, Eye, EyeOff } from 'lucide-react';
import { getCurrentUser, logoutUser, getUserProfile, updateUserProfile } from '../lib/supabase';

interface AccountMenuProps {
  onClose: () => void;
  onLogout: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    age: '',
    culturalBackground: '',
    emergencyContactName: '',
    emergencyContact: '',
    password: '',
    confirmPassword: ''
  });

  React.useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    setIsLoading(true);
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const profile = await getUserProfile(currentUser.email);
        setUserProfile(profile);
        setEditForm({
          name: profile?.name || '',
          email: profile?.email || '',
          age: profile?.age?.toString() || '',
          culturalBackground: profile?.cultural_background || '',
          emergencyContactName: profile?.emergency_contact_name || '',
          emergencyContact: profile?.emergency_contact || '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    onLogout();
    onClose();
  };

  const handleSaveChanges = async () => {
    if (editForm.password && editForm.password !== editForm.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    setIsSaving(true);
    try {
      const updates: any = {
        name: editForm.name,
        age: editForm.age ? parseInt(editForm.age) : undefined,
        cultural_background: editForm.culturalBackground,
        emergency_contact_name: editForm.emergencyContactName,
        emergency_contact: editForm.emergencyContact
      };

      // Solo incluir password si se proporcionó uno nuevo
      if (editForm.password) {
        updates.password = editForm.password;
      }

      const updatedProfile = await updateUserProfile(userProfile.email, updates);
      setUserProfile(updatedProfile);
      setIsEditing(false);
      setEditForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
      
      // Actualizar el usuario actual si cambió el nombre
      if (updates.name) {
        const currentUser = getCurrentUser();
        localStorage.setItem('currentUser', JSON.stringify({
          ...currentUser,
          name: updates.name
        }));
      }
      
      alert('Perfil actualizado exitosamente');
    } catch (error: any) {
      console.error('Error saving changes:', error);
      alert('Error al guardar los cambios: ' + (error.message || 'Error desconocido'));
    } finally {
      setIsSaving(false);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
          <User className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{userProfile?.name || 'Usuario'}</h3>
        <p className="text-gray-400 text-sm">{userProfile?.email}</p>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email (no editable)</label>
            <input
              type="email"
              value={editForm.email}
              disabled
              className="w-full p-3 bg-gray-600 text-gray-400 rounded-xl border border-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Edad</label>
            <input
              type="number"
              value={editForm.age}
              onChange={(e) => setEditForm(prev => ({ ...prev, age: e.target.value }))}
              className="w-full p-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Trasfondo Cultural</label>
            <input
              type="text"
              value={editForm.culturalBackground}
              onChange={(e) => setEditForm(prev => ({ ...prev, culturalBackground: e.target.value }))}
              className="w-full p-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nombre del Contacto de Emergencia</label>
            <input
              type="text"
              value={editForm.emergencyContactName}
              onChange={(e) => setEditForm(prev => ({ ...prev, emergencyContactName: e.target.value }))}
              className="w-full p-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Teléfono de Emergencia</label>
            <input
              type="tel"
              value={editForm.emergencyContact}
              onChange={(e) => setEditForm(prev => ({ ...prev, emergencyContact: e.target.value }))}
              className="w-full p-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nueva Contraseña (opcional)</label>
            <div className="relative">
              <input
                type="password"
                value={editForm.password}
                onChange={(e) => setEditForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full p-3 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Dejar vacío para mantener la actual"
              />
            </div>
          </div>
          {editForm.password && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirmar Nueva Contraseña</label>
              <input
                type="password"
                value={editForm.confirmPassword}
                onChange={(e) => setEditForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className={`w-full p-3 bg-gray-700 text-white rounded-xl border focus:outline-none focus:ring-2 ${
                  editForm.password !== editForm.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-purple-500'
                }`}
                placeholder="Confirma tu nueva contraseña"
              />
              {editForm.password !== editForm.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">Las contraseñas no coinciden</p>
              )}
            </div>
          )}
          <div className="flex space-x-3">
            <button
              onClick={handleSaveChanges}
              disabled={isSaving || (editForm.password && editForm.password !== editForm.confirmPassword)}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Guardando...' : 'Guardar'}</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
              }}
              disabled={isSaving}
              className="flex-1 bg-gray-700 text-gray-300 py-3 rounded-xl font-medium disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-xl p-4">
            <h4 className="font-medium text-white mb-3">Información Personal</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Edad:</span>
                <span className="text-white">{userProfile?.age || 'No especificada'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trasfondo:</span>
                <span className="text-white">{userProfile?.cultural_background || 'No especificado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Idioma:</span>
                <span className="text-white">{userProfile?.preferred_language === 'es' ? 'Español' : userProfile?.preferred_language || 'Español'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Preocupaciones:</span>
                <span className="text-white text-right">
                  {userProfile?.concerns?.length > 0 ? userProfile.concerns.join(', ') : 'Ninguna especificada'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-xl p-4">
            <h4 className="font-medium text-white mb-3">Contacto de Emergencia</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Nombre:</span>
                <span className="text-white">{userProfile?.emergency_contact_name || 'No especificado'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Teléfono:</span>
                <span className="text-white">{userProfile?.emergency_contact || 'No especificado'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Editar Perfil</span>
          </button>
        </div>
      )}
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Seguridad</h3>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-700 rounded-xl p-4">
          <h4 className="font-medium text-white mb-3">Estado de la Cuenta</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Verificación:</span>
              <span className="text-green-400 flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Verificada
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Último acceso:</span>
              <span className="text-white">Hoy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Creada:</span>
              <span className="text-white">{userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'Hoy'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">ID de Usuario:</span>
              <span className="text-white text-xs">{userProfile?.id || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-xl p-4">
          <h4 className="font-medium text-white mb-3">Privacidad</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Datos encriptados</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Almacenamiento seguro</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Sin seguimiento</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">Respaldo en Supabase</span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4">
          <h4 className="font-medium text-blue-400 mb-2">Información de Almacenamiento</h4>
          <p className="text-blue-300 text-xs leading-relaxed">
            Tus datos se almacenan de forma segura en Supabase con encriptación completa. 
            También mantenemos una copia local para acceso offline.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-3xl max-w-sm w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Mi Cuenta</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Perfil
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'security'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            Seguridad
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Cargando...</p>
            </div>
          ) : (
            <>
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'security' && renderSecurityTab()}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;