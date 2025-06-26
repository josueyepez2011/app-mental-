// Translations for the MentalCare app
export interface Translation {
  // Navigation
  home: string;
  chat: string;
  mood: string;
  premium: string;
  psychologists: string;
  mirror: string;
  
  // Common
  loading: string;
  save: string;
  cancel: string;
  continue: string;
  back: string;
  close: string;
  edit: string;
  delete: string;
  confirm: string;
  error: string;
  success: string;
  apply: string;
  reset: string;
  preview: string;
  
  // Welcome Screen
  welcome_title: string;
  welcome_subtitle: string;
  tell_us_about_you: string;
  personalize_experience: string;
  main_concerns: string;
  select_concerns: string;
  emergency_contact: string;
  safety_tranquility: string;
  all_ready: string;
  start_wellness_journey: string;
  
  // Profile Form
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  password_label: string;
  password_placeholder: string;
  confirm_password_label: string;
  confirm_password_placeholder: string;
  age_label: string;
  age_placeholder: string;
  cultural_background_label: string;
  cultural_background_placeholder: string;
  emergency_contact_name_label: string;
  emergency_contact_name_placeholder: string;
  emergency_contact_phone_label: string;
  emergency_contact_phone_placeholder: string;
  
  // Concerns
  anxiety: string;
  depression: string;
  stress: string;
  relationships: string;
  selfesteem: string;
  sleep: string;
  
  // Emergency Protocol
  emergency_protocol_activated: string;
  activation_reason: string;
  connecting_professional: string;
  connect_now_professional: string;
  im_fine_cancel: string;
  connecting: string;
  
  // Chat
  mental_care_ai: string;
  support_general_info: string;
  secure: string;
  type_or_use_microphone: string;
  listening: string;
  
  // Account Menu
  my_account: string;
  profile: string;
  security: string;
  personal_information: string;
  emergency_contact_info: string;
  edit_profile: string;
  logout: string;
  
  // Language Selection
  select_language: string;
  language: string;
  
  // Mood tracking
  excellent: string;
  good: string;
  neutral: string;
  sad: string;
  anxious: string;
  angry: string;
  
  // App specific
  privacy_total: string;
  works_offline: string;
  safe_space: string;
  emotional_wellbeing: string;
  
  // Errors
  passwords_dont_match: string;
  email_already_exists: string;
  user_not_found: string;
  incorrect_password: string;
  
  // Success messages
  profile_updated_successfully: string;
  account_created_successfully: string;
  
  // New translations for improvements
  customize_background: string;
  select_theme: string;
  image_analysis: string;
  upload_image: string;
  upload_description: string;
  select_image: string;
  supported_formats: string;
  image_preview: string;
  analyzing: string;
  analyze_emotions: string;
  analysis_results: string;
  analyze_another: string;
  emotions_detected: string;
  interpretation: string;
  suggestions: string;
  color_analysis: string;
  calm: string;
  contemplative: string;
  hopeful: string;
  generally_positive: string;
  continue_creative_expression: string;
  practice_mindfulness: string;
  share_feelings: string;
  blue_tones: string;
  tranquility_peace: string;
  warm_colors: string;
  energy_optimism: string;
  image_analysis_interpretation: string;
  premium_feature: string;
  upgrade_to_premium: string;
  ai_image_analysis: string;
  unlock_advanced_features: string;
}

export const translations: Record<string, Translation> = {
  es: {
    // Navigation
    home: 'Inicio',
    chat: 'Chat',
    mood: 'Ánimo',
    premium: 'Premium',
    psychologists: 'Expertos',
    mirror: 'Espejo',
    
    // Common
    loading: 'Cargando...',
    save: 'Guardar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    back: 'Volver',
    close: 'Cerrar',
    edit: 'Editar',
    delete: 'Eliminar',
    confirm: 'Confirmar',
    error: 'Error',
    success: 'Éxito',
    apply: 'Aplicar',
    reset: 'Resetear',
    preview: 'Vista Previa',
    
    // Welcome Screen
    welcome_title: '¡Bienvenido a MentalCare!',
    welcome_subtitle: 'Tu compañero de bienestar emocional',
    tell_us_about_you: 'Cuéntanos sobre ti',
    personalize_experience: 'Para personalizar tu experiencia',
    main_concerns: 'Tus principales preocupaciones',
    select_concerns: 'Selecciona lo que más te afecta',
    emergency_contact: 'Contacto de emergencia',
    safety_tranquility: 'Para tu seguridad y tranquilidad',
    all_ready: '¡Todo listo!',
    start_wellness_journey: 'Comencemos tu viaje hacia el bienestar',
    
    // Profile Form
    name_label: '¿Cómo te gustaría que te llamemos? (requerido)',
    name_placeholder: 'Tu nombre o apodo',
    email_label: 'Tu correo electrónico (requerido)',
    email_placeholder: 'tu.email@ejemplo.com',
    password_label: 'Crea tu contraseña (requerido)',
    password_placeholder: 'Mínimo 6 caracteres',
    confirm_password_label: 'Confirma tu contraseña (requerido)',
    confirm_password_placeholder: 'Repite tu contraseña',
    age_label: 'Edad (opcional)',
    age_placeholder: 'Tu edad',
    cultural_background_label: 'Trasfondo cultural (opcional)',
    cultural_background_placeholder: 'Ej: Latino, Asiático, Europeo...',
    emergency_contact_name_label: 'Nombre del contacto de emergencia (requerido)',
    emergency_contact_name_placeholder: 'Nombre completo',
    emergency_contact_phone_label: 'Teléfono del contacto de emergencia (requerido)',
    emergency_contact_phone_placeholder: '+1 234 567 8900',
    
    // Concerns
    anxiety: 'Ansiedad',
    depression: 'Depresión',
    stress: 'Estrés',
    relationships: 'Relaciones',
    selfesteem: 'Autoestima',
    sleep: 'Sueño',
    
    // Emergency Protocol
    emergency_protocol_activated: 'Protocolo de Emergencia Activado',
    activation_reason: 'Motivo de activación:',
    connecting_professional: 'LLamar al 911 de manera gratuita',
    connect_now_professional: 'Llamar al 911',
    im_fine_cancel: 'Estoy bien, cancelar protocolo',
    connecting: 'Conectando...',
    
    // Chat
    mental_care_ai: 'MentalCare AI',
    support_general_info: 'Apoyo y información general',
    secure: 'Seguro',
    type_or_use_microphone: 'Escribe o usa el micrófono...',
    listening: 'Escuchando...',
    
    // Account Menu
    my_account: 'Mi Cuenta',
    profile: 'Perfil',
    security: 'Seguridad',
    personal_information: 'Información Personal',
    emergency_contact_info: 'Contacto de Emergencia',
    edit_profile: 'Editar Perfil',
    logout: 'Cerrar Sesión',
    
    // Language Selection
    select_language: 'Seleccionar Idioma',
    language: 'Idioma',
    
    // Mood tracking
    excellent: 'Excelente',
    good: 'Bien',
    neutral: 'Neutral',
    sad: 'Triste',
    anxious: 'Ansioso',
    angry: 'Enojado',
    
    // App specific
    privacy_total: 'Privacidad Total',
    works_offline: 'Funciona completamente offline',
    safe_space: 'Un espacio seguro',
    emotional_wellbeing: 'donde tu bienestar emocional es nuestra prioridad',
    
    // Errors
    passwords_dont_match: 'Las contraseñas no coinciden',
    email_already_exists: 'Ya existe una cuenta con este correo electrónico',
    user_not_found: 'Usuario no encontrado',
    incorrect_password: 'Contraseña incorrecta',
    
    // Success messages
    profile_updated_successfully: 'Perfil actualizado exitosamente',
    account_created_successfully: '¡Tu cuenta se ha creado exitosamente! ¡Bienvenido a MentalCare!',
    
    // New translations
    customize_background: 'Personalizar Fondo',
    select_theme: 'Selecciona un Tema',
    image_analysis: 'Análisis de Imagen',
    upload_image: 'Subir Imagen',
    upload_description: 'Sube un dibujo, foto o imagen que represente tu estado emocional actual para recibir un análisis personalizado.',
    select_image: 'Seleccionar Imagen',
    supported_formats: 'Formatos soportados: JPG, PNG, GIF',
    image_preview: 'Vista Previa',
    analyzing: 'Analizando...',
    analyze_emotions: 'Analizar Emociones',
    analysis_results: 'Resultados del Análisis',
    analyze_another: 'Analizar otra',
    emotions_detected: 'Emociones Detectadas',
    interpretation: 'Interpretación',
    suggestions: 'Sugerencias',
    color_analysis: 'Análisis de Colores',
    calm: 'Calma',
    contemplative: 'Contemplativo',
    hopeful: 'Esperanzado',
    generally_positive: 'Generalmente positivo',
    continue_creative_expression: 'Continúa con la expresión creativa',
    practice_mindfulness: 'Practica mindfulness para mantener la calma',
    share_feelings: 'Comparte tus sentimientos con alguien de confianza',
    blue_tones: 'Tonos azules',
    tranquility_peace: 'Tranquilidad y paz',
    warm_colors: 'Colores cálidos',
    energy_optimism: 'Energía y optimismo',
    image_analysis_interpretation: 'Tu imagen refleja un estado emocional equilibrado con tendencia hacia la introspección positiva. Los elementos visuales sugieren un momento de reflexión constructiva.',
    premium_feature: 'Función Premium',
    upgrade_to_premium: 'Actualizar a Premium',
    ai_image_analysis: 'Análisis de Imagen con IA',
    unlock_advanced_features: 'Desbloquea funciones avanzadas',
  },
  
  en: {
    // Navigation
    home: 'Home',
    chat: 'Chat',
    mood: 'Mood',
    premium: 'Premium',
    psychologists: 'Experts',
    mirror: 'Mirror',
    
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    continue: 'Continue',
    back: 'Back',
    close: 'Close',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    error: 'Error',
    success: 'Success',
    apply: 'Apply',
    reset: 'Reset',
    preview: 'Preview',
    
    // Welcome Screen
    welcome_title: 'Welcome to MentalCare!',
    welcome_subtitle: 'Your emotional wellness companion',
    tell_us_about_you: 'Tell us about you',
    personalize_experience: 'To personalize your experience',
    main_concerns: 'Your main concerns',
    select_concerns: 'Select what affects you most',
    emergency_contact: 'Emergency contact',
    safety_tranquility: 'For your safety and peace of mind',
    all_ready: 'All ready!',
    start_wellness_journey: "Let's start your wellness journey",
    
    // Profile Form
    name_label: 'What would you like us to call you? (required)',
    name_placeholder: 'Your name or nickname',
    email_label: 'Your email address (required)',
    email_placeholder: 'your.email@example.com',
    password_label: 'Create your password (required)',
    password_placeholder: 'Minimum 6 characters',
    confirm_password_label: 'Confirm your password (required)',
    confirm_password_placeholder: 'Repeat your password',
    age_label: 'Age (optional)',
    age_placeholder: 'Your age',
    cultural_background_label: 'Cultural background (optional)',
    cultural_background_placeholder: 'E.g: Latino, Asian, European...',
    emergency_contact_name_label: 'Emergency contact name (required)',
    emergency_contact_name_placeholder: 'Full name',
    emergency_contact_phone_label: 'Emergency contact phone (required)',
    emergency_contact_phone_placeholder: '+1 234 567 8900',
    
    // Concerns
    anxiety: 'Anxiety',
    depression: 'Depression',
    stress: 'Stress',
    relationships: 'Relationships',
    selfesteem: 'Self-esteem',
    sleep: 'Sleep',
    
    // Emergency Protocol
    emergency_protocol_activated: 'Emergency Protocol Activated',
    activation_reason: 'Activation reason:',
    connecting_professional: 'Connecting with professional in',
    connect_now_professional: 'Connect Now with Professional',
    im_fine_cancel: "I'm fine, cancel protocol",
    connecting: 'Connecting...',
    
    // Chat
    mental_care_ai: 'MentalCare AI',
    support_general_info: 'Support and general information',
    secure: 'Secure',
    type_or_use_microphone: 'Type or use microphone...',
    listening: 'Listening...',
    
    // Account Menu
    my_account: 'My Account',
    profile: 'Profile',
    security: 'Security',
    personal_information: 'Personal Information',
    emergency_contact_info: 'Emergency Contact',
    edit_profile: 'Edit Profile',
    logout: 'Logout',
    
    // Language Selection
    select_language: 'Select Language',
    language: 'Language',
    
    // Mood tracking
    excellent: 'Excellent',
    good: 'Good',
    neutral: 'Neutral',
    sad: 'Sad',
    anxious: 'Anxious',
    angry: 'Angry',
    
    // App specific
    privacy_total: 'Total Privacy',
    works_offline: 'Works completely offline',
    safe_space: 'A safe space',
    emotional_wellbeing: 'where your emotional wellbeing is our priority',
    
    // Errors
    passwords_dont_match: "Passwords don't match",
    email_already_exists: 'An account with this email already exists',
    user_not_found: 'User not found',
    incorrect_password: 'Incorrect password',
    
    // Success messages
    profile_updated_successfully: 'Profile updated successfully',
    account_created_successfully: 'Your account has been created successfully! Welcome to MentalCare!',
    
    // New translations
    customize_background: 'Customize Background',
    select_theme: 'Select a Theme',
    image_analysis: 'Image Analysis',
    upload_image: 'Upload Image',
    upload_description: 'Upload a drawing, photo, or image that represents your current emotional state to receive personalized analysis.',
    select_image: 'Select Image',
    supported_formats: 'Supported formats: JPG, PNG, GIF',
    image_preview: 'Image Preview',
    analyzing: 'Analyzing...',
    analyze_emotions: 'Analyze Emotions',
    analysis_results: 'Analysis Results',
    analyze_another: 'Analyze another',
    emotions_detected: 'Emotions Detected',
    interpretation: 'Interpretation',
    suggestions: 'Suggestions',
    color_analysis: 'Color Analysis',
    calm: 'Calm',
    contemplative: 'Contemplative',
    hopeful: 'Hopeful',
    generally_positive: 'Generally positive',
    continue_creative_expression: 'Continue with creative expression',
    practice_mindfulness: 'Practice mindfulness to maintain calm',
    share_feelings: 'Share your feelings with someone you trust',
    blue_tones: 'Blue tones',
    tranquility_peace: 'Tranquility and peace',
    warm_colors: 'Warm colors',
    energy_optimism: 'Energy and optimism',
    image_analysis_interpretation: 'Your image reflects a balanced emotional state with a tendency toward positive introspection. The visual elements suggest a moment of constructive reflection.',
    premium_feature: 'Premium Feature',
    upgrade_to_premium: 'Upgrade to Premium',
    ai_image_analysis: 'AI Image Analysis',
    unlock_advanced_features: 'Unlock advanced features',
  },
  
  fr: {
    // Navigation
    home: 'Accueil',
    chat: 'Chat',
    mood: 'Humeur',
    premium: 'Premium',
    psychologists: 'Experts',
    mirror: 'Miroir',
    
    // Common
    loading: 'Chargement...',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    continue: 'Continuer',
    back: 'Retour',
    close: 'Fermer',
    edit: 'Modifier',
    delete: 'Supprimer',
    confirm: 'Confirmer',
    error: 'Erreur',
    success: 'Succès',
    apply: 'Appliquer',
    reset: 'Réinitialiser',
    preview: 'Aperçu',
    
    // Welcome Screen
    welcome_title: 'Bienvenue sur MentalCare!',
    welcome_subtitle: 'Votre compagnon de bien-être émotionnel',
    tell_us_about_you: 'Parlez-nous de vous',
    personalize_experience: 'Pour personnaliser votre expérience',
    main_concerns: 'Vos principales préoccupations',
    select_concerns: 'Sélectionnez ce qui vous affecte le plus',
    emergency_contact: 'Contact d\'urgence',
    safety_tranquility: 'Pour votre sécurité et tranquillité',
    all_ready: 'Tout est prêt!',
    start_wellness_journey: 'Commençons votre voyage vers le bien-être',
    
    // Profile Form
    name_label: 'Comment aimeriez-vous qu\'on vous appelle? (requis)',
    name_placeholder: 'Votre nom ou surnom',
    email_label: 'Votre adresse email (requis)',
    email_placeholder: 'votre.email@exemple.com',
    password_label: 'Créez votre mot de passe (requis)',
    password_placeholder: 'Minimum 6 caractères',
    confirm_password_label: 'Confirmez votre mot de passe (requis)',
    confirm_password_placeholder: 'Répétez votre mot de passe',
    age_label: 'Âge (optionnel)',
    age_placeholder: 'Votre âge',
    cultural_background_label: 'Origine culturelle (optionnel)',
    cultural_background_placeholder: 'Ex: Latino, Asiatique, Européen...',
    emergency_contact_name_label: 'Nom du contact d\'urgence (requis)',
    emergency_contact_name_placeholder: 'Nom complet',
    emergency_contact_phone_label: 'Téléphone du contact d\'urgence (requis)',
    emergency_contact_phone_placeholder: '+33 1 23 45 67 89',
    
    // Concerns
    anxiety: 'Anxiété',
    depression: 'Dépression',
    stress: 'Stress',
    relationships: 'Relations',
    selfesteem: 'Estime de soi',
    sleep: 'Sommeil',
    
    // Emergency Protocol
    emergency_protocol_activated: 'Protocole d\'Urgence Activé',
    activation_reason: 'Raison d\'activation:',
    connecting_professional: 'Connexion avec un professionnel dans',
    connect_now_professional: 'Se Connecter Maintenant avec un Professionnel',
    im_fine_cancel: 'Je vais bien, annuler le protocole',
    connecting: 'Connexion...',
    
    // Chat
    mental_care_ai: 'MentalCare IA',
    support_general_info: 'Soutien et informations générales',
    secure: 'Sécurisé',
    type_or_use_microphone: 'Tapez ou utilisez le microphone...',
    listening: 'Écoute...',
    
    // Account Menu
    my_account: 'Mon Compte',
    profile: 'Profil',
    security: 'Sécurité',
    personal_information: 'Informations Personnelles',
    emergency_contact_info: 'Contact d\'Urgence',
    edit_profile: 'Modifier le Profil',
    logout: 'Déconnexion',
    
    // Language Selection
    select_language: 'Sélectionner la Langue',
    language: 'Langue',
    
    // Mood tracking
    excellent: 'Excellent',
    good: 'Bien',
    neutral: 'Neutre',
    sad: 'Triste',
    anxious: 'Anxieux',
    angry: 'En colère',
    
    // App specific
    privacy_total: 'Confidentialité Totale',
    works_offline: 'Fonctionne complètement hors ligne',
    safe_space: 'Un espace sûr',
    emotional_wellbeing: 'où votre bien-être émotionnel est notre priorité',
    
    // Errors
    passwords_dont_match: 'Les mots de passe ne correspondent pas',
    email_already_exists: 'Un compte avec cet email existe déjà',
    user_not_found: 'Utilisateur non trouvé',
    incorrect_password: 'Mot de passe incorrect',
    
    // Success messages
    profile_updated_successfully: 'Profil mis à jour avec succès',
    account_created_successfully: 'Votre compte a été créé avec succès! Bienvenue sur MentalCare!',
    
    // New translations
    customize_background: 'Personnaliser l\'Arrière-plan',
    select_theme: 'Sélectionner un Thème',
    image_analysis: 'Analyse d\'Image',
    upload_image: 'Télécharger une Image',
    upload_description: 'Téléchargez un dessin, une photo ou une image qui représente votre état émotionnel actuel pour recevoir une analyse personnalisée.',
    select_image: 'Sélectionner une Image',
    supported_formats: 'Formats supportés: JPG, PNG, GIF',
    image_preview: 'Aperçu de l\'Image',
    analyzing: 'Analyse en cours...',
    analyze_emotions: 'Analyser les Émotions',
    analysis_results: 'Résultats de l\'Analyse',
    analyze_another: 'Analyser une autre',
    emotions_detected: 'Émotions Détectées',
    interpretation: 'Interprétation',
    suggestions: 'Suggestions',
    color_analysis: 'Analyse des Couleurs',
    calm: 'Calme',
    contemplative: 'Contemplatif',
    hopeful: 'Plein d\'espoir',
    generally_positive: 'Généralement positif',
    continue_creative_expression: 'Continuez l\'expression créative',
    practice_mindfulness: 'Pratiquez la pleine conscience pour maintenir le calme',
    share_feelings: 'Partagez vos sentiments avec quelqu\'un de confiance',
    blue_tones: 'Tons bleus',
    tranquility_peace: 'Tranquillité et paix',
    warm_colors: 'Couleurs chaudes',
    energy_optimism: 'Énergie et optimisme',
    image_analysis_interpretation: 'Votre image reflète un état émotionnel équilibré avec une tendance vers l\'introspection positive. Les éléments visuels suggèrent un moment de réflexion constructive.',
    premium_feature: 'Fonction Premium',
    upgrade_to_premium: 'Passer à Premium',
    ai_image_analysis: 'Analyse d\'Image par IA',
    unlock_advanced_features: 'Débloquer les fonctions avancées',
  },
  
  pt: {
    // Navigation
    home: 'Início',
    chat: 'Chat',
    mood: 'Humor',
    premium: 'Premium',
    psychologists: 'Especialistas',
    mirror: 'Espelho',
    
    // Common
    loading: 'Carregando...',
    save: 'Salvar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    back: 'Voltar',
    close: 'Fechar',
    edit: 'Editar',
    delete: 'Excluir',
    confirm: 'Confirmar',
    error: 'Erro',
    success: 'Sucesso',
    apply: 'Aplicar',
    reset: 'Redefinir',
    preview: 'Visualizar',
    
    // Welcome Screen
    welcome_title: 'Bem-vindo ao MentalCare!',
    welcome_subtitle: 'Seu companheiro de bem-estar emocional',
    tell_us_about_you: 'Conte-nos sobre você',
    personalize_experience: 'Para personalizar sua experiência',
    main_concerns: 'Suas principais preocupações',
    select_concerns: 'Selecione o que mais te afeta',
    emergency_contact: 'Contato de emergência',
    safety_tranquility: 'Para sua segurança e tranquilidade',
    all_ready: 'Tudo pronto!',
    start_wellness_journey: 'Vamos começar sua jornada de bem-estar',
    
    // Profile Form
    name_label: 'Como gostaria que te chamássemos? (obrigatório)',
    name_placeholder: 'Seu nome ou apelido',
    email_label: 'Seu endereço de email (obrigatório)',
    email_placeholder: 'seu.email@exemplo.com',
    password_label: 'Crie sua senha (obrigatório)',
    password_placeholder: 'Mínimo 6 caracteres',
    confirm_password_label: 'Confirme sua senha (obrigatório)',
    confirm_password_placeholder: 'Repita sua senha',
    age_label: 'Idade (opcional)',
    age_placeholder: 'Sua idade',
    cultural_background_label: 'Origem cultural (opcional)',
    cultural_background_placeholder: 'Ex: Latino, Asiático, Europeu...',
    emergency_contact_name_label: 'Nome do contato de emergência (obrigatório)',
    emergency_contact_name_placeholder: 'Nome completo',
    emergency_contact_phone_label: 'Telefone do contato de emergência (obrigatório)',
    emergency_contact_phone_placeholder: '+55 11 99999-9999',
    
    // Concerns
    anxiety: 'Ansiedade',
    depression: 'Depressão',
    stress: 'Estresse',
    relationships: 'Relacionamentos',
    selfesteem: 'Autoestima',
    sleep: 'Sono',
    
    // Emergency Protocol
    emergency_protocol_activated: 'Protocolo de Emergência Ativado',
    activation_reason: 'Motivo da ativação:',
    connecting_professional: 'Conectando com profissional em',
    connect_now_professional: 'Conectar Agora com Profissional',
    im_fine_cancel: 'Estou bem, cancelar protocolo',
    connecting: 'Conectando...',
    
    // Chat
    mental_care_ai: 'MentalCare IA',
    support_general_info: 'Suporte e informações gerais',
    secure: 'Seguro',
    type_or_use_microphone: 'Digite ou use o microfone...',
    listening: 'Ouvindo...',
    
    // Account Menu
    my_account: 'Minha Conta',
    profile: 'Perfil',
    security: 'Segurança',
    personal_information: 'Informações Pessoais',
    emergency_contact_info: 'Contato de Emergência',
    edit_profile: 'Editar Perfil',
    logout: 'Sair',
    
    // Language Selection
    select_language: 'Selecionar Idioma',
    language: 'Idioma',
    
    // Mood tracking
    excellent: 'Excelente',
    good: 'Bom',
    neutral: 'Neutro',
    sad: 'Triste',
    anxious: 'Ansioso',
    angry: 'Irritado',
    
    // App specific
    privacy_total: 'Privacidade Total',
    works_offline: 'Funciona completamente offline',
    safe_space: 'Um espaço seguro',
    emotional_wellbeing: 'onde seu bem-estar emocional é nossa prioridade',
    
    // Errors
    passwords_dont_match: 'As senhas não coincidem',
    email_already_exists: 'Já existe uma conta com este email',
    user_not_found: 'Usuário não encontrado',
    incorrect_password: 'Senha incorreta',
    
    // Success messages
    profile_updated_successfully: 'Perfil atualizado com sucesso',
    account_created_successfully: 'Sua conta foi criada com sucesso! Bem-vindo ao MentalCare!',
    
    // New translations
    customize_background: 'Personalizar Fundo',
    select_theme: 'Selecionar um Tema',
    image_analysis: 'Análise de Imagem',
    upload_image: 'Enviar Imagem',
    upload_description: 'Envie um desenho, foto ou imagem que represente seu estado emocional atual para receber análise personalizada.',
    select_image: 'Selecionar Imagem',
    supported_formats: 'Formatos suportados: JPG, PNG, GIF',
    image_preview: 'Visualização da Imagem',
    analyzing: 'Analisando...',
    analyze_emotions: 'Analisar Emoções',
    analysis_results: 'Resultados da Análise',
    analyze_another: 'Analisar outra',
    emotions_detected: 'Emoções Detectadas',
    interpretation: 'Interpretação',
    suggestions: 'Sugestões',
    color_analysis: 'Análise de Cores',
    calm: 'Calmo',
    contemplative: 'Contemplativo',
    hopeful: 'Esperançoso',
    generally_positive: 'Geralmente positivo',
    continue_creative_expression: 'Continue com a expressão criativa',
    practice_mindfulness: 'Pratique mindfulness para manter a calma',
    share_feelings: 'Compartilhe seus sentimentos com alguém de confiança',
    blue_tones: 'Tons azuis',
    tranquility_peace: 'Tranquilidade e paz',
    warm_colors: 'Cores quentes',
    energy_optimism: 'Energia e otimismo',
    image_analysis_interpretation: 'Sua imagem reflete um estado emocional equilibrado com tendência à introspecção positiva. Os elementos visuais sugerem um momento de reflexão construtiva.',
    premium_feature: 'Recurso Premium',
    upgrade_to_premium: 'Atualizar para Premium',
    ai_image_analysis: 'Análise de Imagem com IA',
    unlock_advanced_features: 'Desbloquear recursos avançados',
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    chat: 'Chat',
    mood: 'Stimmung',
    premium: 'Premium',
    psychologists: 'Experten',
    mirror: 'Spiegel',
    
    // Common
    loading: 'Laden...',
    save: 'Speichern',
    cancel: 'Abbrechen',
    continue: 'Weiter',
    back: 'Zurück',
    close: 'Schließen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    confirm: 'Bestätigen',
    error: 'Fehler',
    success: 'Erfolg',
    apply: 'Anwenden',
    reset: 'Zurücksetzen',
    preview: 'Vorschau',
    
    // Welcome Screen
    welcome_title: 'Willkommen bei MentalCare!',
    welcome_subtitle: 'Ihr emotionaler Wellness-Begleiter',
    tell_us_about_you: 'Erzählen Sie uns von sich',
    personalize_experience: 'Um Ihre Erfahrung zu personalisieren',
    main_concerns: 'Ihre Hauptanliegen',
    select_concerns: 'Wählen Sie aus, was Sie am meisten beschäftigt',
    emergency_contact: 'Notfallkontakt',
    safety_tranquility: 'Für Ihre Sicherheit und Ruhe',
    all_ready: 'Alles bereit!',
    start_wellness_journey: 'Beginnen wir Ihre Wellness-Reise',
    
    // Profile Form
    name_label: 'Wie sollen wir Sie nennen? (erforderlich)',
    name_placeholder: 'Ihr Name oder Spitzname',
    email_label: 'Ihre E-Mail-Adresse (erforderlich)',
    email_placeholder: 'ihre.email@beispiel.com',
    password_label: 'Erstellen Sie Ihr Passwort (erforderlich)',
    password_placeholder: 'Mindestens 6 Zeichen',
    confirm_password_label: 'Bestätigen Sie Ihr Passwort (erforderlich)',
    confirm_password_placeholder: 'Wiederholen Sie Ihr Passwort',
    age_label: 'Alter (optional)',
    age_placeholder: 'Ihr Alter',
    cultural_background_label: 'Kultureller Hintergrund (optional)',
    cultural_background_placeholder: 'Z.B: Latino, Asiatisch, Europäisch...',
    emergency_contact_name_label: 'Name des Notfallkontakts (erforderlich)',
    emergency_contact_name_placeholder: 'Vollständiger Name',
    emergency_contact_phone_label: 'Telefon des Notfallkontakts (erforderlich)',
    emergency_contact_phone_placeholder: '+49 30 12345678',
    
    // Concerns
    anxiety: 'Angst',
    depression: 'Depression',
    stress: 'Stress',
    relationships: 'Beziehungen',
    selfesteem: 'Selbstwertgefühl',
    sleep: 'Schlaf',
    
    // Emergency Protocol
    emergency_protocol_activated: 'Notfallprotokoll Aktiviert',
    activation_reason: 'Aktivierungsgrund:',
    connecting_professional: 'Verbindung mit Fachkraft in',
    connect_now_professional: 'Jetzt mit Fachkraft Verbinden',
    im_fine_cancel: 'Mir geht es gut, Protokoll abbrechen',
    connecting: 'Verbinden...',
    
    // Chat
    mental_care_ai: 'MentalCare KI',
    support_general_info: 'Unterstützung und allgemeine Informationen',
    secure: 'Sicher',
    type_or_use_microphone: 'Tippen oder Mikrofon verwenden...',
    listening: 'Zuhören...',
    
    // Account Menu
    my_account: 'Mein Konto',
    profile: 'Profil',
    security: 'Sicherheit',
    personal_information: 'Persönliche Informationen',
    emergency_contact_info: 'Notfallkontakt',
    edit_profile: 'Profil Bearbeiten',
    logout: 'Abmelden',
    
    // Language Selection
    select_language: 'Sprache Auswählen',
    language: 'Sprache',
    
    // Mood tracking
    excellent: 'Ausgezeichnet',
    good: 'Gut',
    neutral: 'Neutral',
    sad: 'Traurig',
    anxious: 'Ängstlich',
    angry: 'Wütend',
    
    // App specific
    privacy_total: 'Totale Privatsphäre',
    works_offline: 'Funktioniert vollständig offline',
    safe_space: 'Ein sicherer Raum',
    emotional_wellbeing: 'wo Ihr emotionales Wohlbefinden unsere Priorität ist',
    
    // Errors
    passwords_dont_match: 'Passwörter stimmen nicht überein',
    email_already_exists: 'Ein Konto mit dieser E-Mail existiert bereits',
    user_not_found: 'Benutzer nicht gefunden',
    incorrect_password: 'Falsches Passwort',
    
    // Success messages
    profile_updated_successfully: 'Profil erfolgreich aktualisiert',
    account_created_successfully: 'Ihr Konto wurde erfolgreich erstellt! Willkommen bei MentalCare!',
    
    // New translations
    customize_background: 'Hintergrund Anpassen',
    select_theme: 'Ein Thema Auswählen',
    image_analysis: 'Bildanalyse',
    upload_image: 'Bild Hochladen',
    upload_description: 'Laden Sie eine Zeichnung, ein Foto oder ein Bild hoch, das Ihren aktuellen emotionalen Zustand repräsentiert, um eine personalisierte Analyse zu erhalten.',
    select_image: 'Bild Auswählen',
    supported_formats: 'Unterstützte Formate: JPG, PNG, GIF',
    image_preview: 'Bildvorschau',
    analyzing: 'Analysiere...',
    analyze_emotions: 'Emotionen Analysieren',
    analysis_results: 'Analyseergebnisse',
    analyze_another: 'Weitere analysieren',
    emotions_detected: 'Erkannte Emotionen',
    interpretation: 'Interpretation',
    suggestions: 'Vorschläge',
    color_analysis: 'Farbanalyse',
    calm: 'Ruhig',
    contemplative: 'Nachdenklich',
    hopeful: 'Hoffnungsvoll',
    generally_positive: 'Allgemein positiv',
    continue_creative_expression: 'Setzen Sie den kreativen Ausdruck fort',
    practice_mindfulness: 'Praktizieren Sie Achtsamkeit, um die Ruhe zu bewahren',
    share_feelings: 'Teilen Sie Ihre Gefühle mit jemandem, dem Sie vertrauen',
    blue_tones: 'Blautöne',
    tranquility_peace: 'Ruhe und Frieden',
    warm_colors: 'Warme Farben',
    energy_optimism: 'Energie und Optimismus',
    image_analysis_interpretation: 'Ihr Bild spiegelt einen ausgeglichenen emotionalen Zustand mit einer Tendenz zur positiven Selbstreflexion wider. Die visuellen Elemente deuten auf einen Moment konstruktiver Reflexion hin.',
    premium_feature: 'Premium-Funktion',
    upgrade_to_premium: 'Auf Premium Upgraden',
    ai_image_analysis: 'KI-Bildanalyse',
    unlock_advanced_features: 'Erweiterte Funktionen freischalten',
  },
  
  it: {
    // Navigation
    home: 'Home',
    chat: 'Chat',
    mood: 'Umore',
    premium: 'Premium',
    psychologists: 'Esperti',
    mirror: 'Specchio',
    
    // Common
    loading: 'Caricamento...',
    save: 'Salva',
    cancel: 'Annulla',
    continue: 'Continua',
    back: 'Indietro',
    close: 'Chiudi',
    edit: 'Modifica',
    delete: 'Elimina',
    confirm: 'Conferma',
    error: 'Errore',
    success: 'Successo',
    apply: 'Applica',
    reset: 'Ripristina',
    preview: 'Anteprima',
    
    // Welcome Screen
    welcome_title: 'Benvenuto in MentalCare!',
    welcome_subtitle: 'Il tuo compagno di benessere emotivo',
    tell_us_about_you: 'Parlaci di te',
    personalize_experience: 'Per personalizzare la tua esperienza',
    main_concerns: 'Le tue principali preoccupazioni',
    select_concerns: 'Seleziona ciò che ti colpisce di più',
    emergency_contact: 'Contatto di emergenza',
    safety_tranquility: 'Per la tua sicurezza e tranquillità',
    all_ready: 'Tutto pronto!',
    start_wellness_journey: 'Iniziamo il tuo viaggio verso il benessere',
    
    // Profile Form
    name_label: 'Come vorresti che ti chiamassimo? (richiesto)',
    name_placeholder: 'Il tuo nome o soprannome',
    email_label: 'Il tuo indirizzo email (richiesto)',
    email_placeholder: 'tua.email@esempio.com',
    password_label: 'Crea la tua password (richiesto)',
    password_placeholder: 'Minimo 6 caratteri',
    confirm_password_label: 'Conferma la tua password (richiesto)',
    confirm_password_placeholder: 'Ripeti la tua password',
    age_label: 'Età (opzionale)',
    age_placeholder: 'La tua età',
    cultural_background_label: 'Background culturale (opzionale)',
    cultural_background_placeholder: 'Es: Latino, Asiatico, Europeo...',
    emergency_contact_name_label: 'Nome del contatto di emergenza (richiesto)',
    emergency_contact_name_placeholder: 'Nome completo',
    emergency_contact_phone_label: 'Telefono del contatto di emergenza (richiesto)',
    emergency_contact_phone_placeholder: '+39 02 12345678',
    
    // Concerns
    anxiety: 'Ansia',
    depression: 'Depressione',
    stress: 'Stress',
    relationships: 'Relazioni',
    selfesteem: 'Autostima',
    sleep: 'Sonno',
    
    // Emergency Protocol
    emergency_protocol_activated: 'Protocollo di Emergenza Attivato',
    activation_reason: 'Motivo di attivazione:',
    connecting_professional: 'Connessione con professionista in',
    connect_now_professional: 'Connetti Ora con Professionista',
    im_fine_cancel: 'Sto bene, annulla protocollo',
    connecting: 'Connessione...',
    
    // Chat
    mental_care_ai: 'MentalCare IA',
    support_general_info: 'Supporto e informazioni generali',
    secure: 'Sicuro',
    type_or_use_microphone: 'Digita o usa il microfono...',
    listening: 'Ascolto...',
    
    // Account Menu
    my_account: 'Il Mio Account',
    profile: 'Profilo',
    security: 'Sicurezza',
    personal_information: 'Informazioni Personali',
    emergency_contact_info: 'Contatto di Emergenza',
    edit_profile: 'Modifica Profilo',
    logout: 'Disconnetti',
    
    // Language Selection
    select_language: 'Seleziona Lingua',
    language: 'Lingua',
    
    // Mood tracking
    excellent: 'Eccellente',
    good: 'Bene',
    neutral: 'Neutro',
    sad: 'Triste',
    anxious: 'Ansioso',
    angry: 'Arrabbiato',
    
    // App specific
    privacy_total: 'Privacy Totale',
    works_offline: 'Funziona completamente offline',
    safe_space: 'Uno spazio sicuro',
    emotional_wellbeing: 'dove il tuo benessere emotivo è la nostra priorità',
    
    // Errors
    passwords_dont_match: 'Le password non corrispondono',
    email_already_exists: 'Esiste già un account con questa email',
    user_not_found: 'Utente non trovato',
    incorrect_password: 'Password errata',
    
    // Success messages
    profile_updated_successfully: 'Profilo aggiornato con successo',
    account_created_successfully: 'Il tuo account è stato creato con successo! Benvenuto in MentalCare!',
    
    // New translations
    customize_background: 'Personalizza Sfondo',
    select_theme: 'Seleziona un Tema',
    image_analysis: 'Analisi Immagine',
    upload_image: 'Carica Immagine',
    upload_description: 'Carica un disegno, foto o immagine che rappresenti il tuo stato emotivo attuale per ricevere un\'analisi personalizzata.',
    select_image: 'Seleziona Immagine',
    supported_formats: 'Formati supportati: JPG, PNG, GIF',
    image_preview: 'Anteprima Immagine',
    analyzing: 'Analizzando...',
    analyze_emotions: 'Analizza Emozioni',
    analysis_results: 'Risultati Analisi',
    analyze_another: 'Analizza un\'altra',
    emotions_detected: 'Emozioni Rilevate',
    interpretation: 'Interpretazione',
    suggestions: 'Suggerimenti',
    color_analysis: 'Analisi Colori',
    calm: 'Calmo',
    contemplative: 'Contemplativo',
    hopeful: 'Speranzoso',
    generally_positive: 'Generalmente positivo',
    continue_creative_expression: 'Continua con l\'espressione creativa',
    practice_mindfulness: 'Pratica la mindfulness per mantenere la calma',
    share_feelings: 'Condividi i tuoi sentimenti con qualcuno di cui ti fidi',
    blue_tones: 'Toni blu',
    tranquility_peace: 'Tranquillità e pace',
    warm_colors: 'Colori caldi',
    energy_optimism: 'Energia e ottimismo',
    image_analysis_interpretation: 'La tua immagine riflette uno stato emotivo equilibrato con tendenza verso l\'introspezione positiva. Gli elementi visivi suggeriscono un momento di riflessione costruttiva.',
    premium_feature: 'Funzione Premium',
    upgrade_to_premium: 'Aggiorna a Premium',
    ai_image_analysis: 'Analisi Immagine IA',
    unlock_advanced_features: 'Sblocca funzioni avanzate',
  },
  
  zh: {
    // Navigation
    home: '首页',
    chat: '聊天',
    mood: '心情',
    premium: '高级版',
    psychologists: '专家',
    mirror: '镜子',
    
    // Common
    loading: '加载中...',
    save: '保存',
    cancel: '取消',
    continue: '继续',
    back: '返回',
    close: '关闭',
    edit: '编辑',
    delete: '删除',
    confirm: '确认',
    error: '错误',
    success: '成功',
    apply: '应用',
    reset: '重置',
    preview: '预览',
    
    // Welcome Screen
    welcome_title: '欢迎来到MentalCare！',
    welcome_subtitle: '您的情感健康伴侣',
    tell_us_about_you: '告诉我们关于您的信息',
    personalize_experience: '为了个性化您的体验',
    main_concerns: '您的主要关注点',
    select_concerns: '选择最影响您的问题',
    emergency_contact: '紧急联系人',
    safety_tranquility: '为了您的安全和安心',
    all_ready: '一切就绪！',
    start_wellness_journey: '让我们开始您的健康之旅',
    
    // Profile Form
    name_label: '您希望我们如何称呼您？（必填）',
    name_placeholder: '您的姓名或昵称',
    email_label: '您的电子邮箱（必填）',
    email_placeholder: 'your.email@example.com',
    password_label: '创建您的密码（必填）',
    password_placeholder: '至少6个字符',
    confirm_password_label: '确认您的密码（必填）',
    confirm_password_placeholder: '重复您的密码',
    age_label: '年龄（可选）',
    age_placeholder: '您的年龄',
    cultural_background_label: '文化背景（可选）',
    cultural_background_placeholder: '例如：拉丁裔、亚洲人、欧洲人...',
    emergency_contact_name_label: '紧急联系人姓名（必填）',
    emergency_contact_name_placeholder: '全名',
    emergency_contact_phone_label: '紧急联系人电话（必填）',
    emergency_contact_phone_placeholder: '+86 138 0013 8000',
    
    // Concerns
    anxiety: '焦虑',
    depression: '抑郁',
    stress: '压力',
    relationships: '人际关系',
    selfesteem: '自尊',
    sleep: '睡眠',
    
    // Emergency Protocol
    emergency_protocol_activated: '紧急协议已激活',
    activation_reason: '激活原因：',
    connecting_professional: '正在连接专业人员，倒计时',
    connect_now_professional: '立即连接专业人员',
    im_fine_cancel: '我很好，取消协议',
    connecting: '连接中...',
    
    // Chat
    mental_care_ai: 'MentalCare AI',
    support_general_info: '支持和一般信息',
    secure: '安全',
    type_or_use_microphone: '输入或使用麦克风...',
    listening: '聆听中...',
    
    // Account Menu
    my_account: '我的账户',
    profile: '个人资料',
    security: '安全',
    personal_information: '个人信息',
    emergency_contact_info: '紧急联系人',
    edit_profile: '编辑个人资料',
    logout: '退出登录',
    
    // Language Selection
    select_language: '选择语言',
    language: '语言',
    
    // Mood tracking
    excellent: '优秀',
    good: '良好',
    neutral: '中性',
    sad: '悲伤',
    anxious: '焦虑',
    angry: '愤怒',
    
    // App specific
    privacy_total: '完全隐私',
    works_offline: '完全离线工作',
    safe_space: '一个安全的空间',
    emotional_wellbeing: '您的情感健康是我们的优先考虑',
    
    // Errors
    passwords_dont_match: '密码不匹配',
    email_already_exists: '此邮箱已存在账户',
    user_not_found: '用户未找到',
    incorrect_password: '密码错误',
    
    // Success messages
    profile_updated_successfully: '个人资料更新成功',
    account_created_successfully: '您的账户已成功创建！欢迎来到MentalCare！',
    
    // New translations
    customize_background: '自定义背景',
    select_theme: '选择主题',
    image_analysis: '图像分析',
    upload_image: '上传图像',
    upload_description: '上传代表您当前情绪状态的绘画、照片或图像，以获得个性化分析。',
    select_image: '选择图像',
    supported_formats: '支持的格式：JPG、PNG、GIF',
    image_preview: '图像预览',
    analyzing: '分析中...',
    analyze_emotions: '分析情绪',
    analysis_results: '分析结果',
    analyze_another: '分析另一个',
    emotions_detected: '检测到的情绪',
    interpretation: '解释',
    suggestions: '建议',
    color_analysis: '颜色分析',
    calm: '平静',
    contemplative: '沉思',
    hopeful: '充满希望',
    generally_positive: '总体积极',
    continue_creative_expression: '继续创意表达',
    practice_mindfulness: '练习正念以保持平静',
    share_feelings: '与信任的人分享您的感受',
    blue_tones: '蓝色调',
    tranquility_peace: '宁静与和平',
    warm_colors: '暖色调',
    energy_optimism: '活力与乐观',
    image_analysis_interpretation: '您的图像反映了一种平衡的情绪状态，倾向于积极的内省。视觉元素表明这是一个建设性反思的时刻。',
    premium_feature: '高级功能',
    upgrade_to_premium: '升级到高级版',
    ai_image_analysis: 'AI图像分析',
    unlock_advanced_features: '解锁高级功能',
  },
  
  ja: {
    // Navigation
    home: 'ホーム',
    chat: 'チャット',
    mood: '気分',
    premium: 'プレミアム',
    psychologists: '専門家',
    mirror: 'ミラー',
    
    // Common
    loading: '読み込み中...',
    save: '保存',
    cancel: 'キャンセル',
    continue: '続行',
    back: '戻る',
    close: '閉じる',
    edit: '編集',
    delete: '削除',
    confirm: '確認',
    error: 'エラー',
    success: '成功',
    apply: '適用',
    reset: 'リセット',
    preview: 'プレビュー',
    
    // Welcome Screen
    welcome_title: 'MentalCareへようこそ！',
    welcome_subtitle: 'あなたの感情的な健康のパートナー',
    tell_us_about_you: 'あなたについて教えてください',
    personalize_experience: 'あなたの体験をパーソナライズするために',
    main_concerns: 'あなたの主な悩み',
    select_concerns: '最も影響を受けているものを選択してください',
    emergency_contact: '緊急連絡先',
    safety_tranquility: 'あなたの安全と安心のために',
    all_ready: '準備完了！',
    start_wellness_journey: 'あなたのウェルネスの旅を始めましょう',
    
    // Profile Form
    name_label: 'どのようにお呼びしますか？（必須）',
    name_placeholder: 'あなたの名前またはニックネーム',
    email_label: 'あなたのメールアドレス（必須）',
    email_placeholder: 'your.email@example.com',
    password_label: 'パスワードを作成してください（必須）',
    password_placeholder: '最低6文字',
    confirm_password_label: 'パスワードを確認してください（必須）',
    confirm_password_placeholder: 'パスワードを再入力',
    age_label: '年齢（任意）',
    age_placeholder: 'あなたの年齢',
    cultural_background_label: '文化的背景（任意）',
    cultural_background_placeholder: '例：ラテン系、アジア系、ヨーロッパ系...',
    emergency_contact_name_label: '緊急連絡先の名前（必須）',
    emergency_contact_name_placeholder: 'フルネーム',
    emergency_contact_phone_label: '緊急連絡先の電話番号（必須）',
    emergency_contact_phone_placeholder: '+81 90-1234-5678',
    
    // Concerns
    anxiety: '不安',
    depression: 'うつ病',
    stress: 'ストレス',
    relationships: '人間関係',
    selfesteem: '自尊心',
    sleep: '睡眠',
    
    // Emergency Protocol
    emergency_protocol_activated: '緊急プロトコルが有効化されました',
    activation_reason: '有効化の理由：',
    connecting_professional: '専門家に接続中、カウントダウン',
    connect_now_professional: '今すぐ専門家に接続',
    im_fine_cancel: '大丈夫です、プロトコルをキャンセル',
    connecting: '接続中...',
    
    // Chat
    mental_care_ai: 'MentalCare AI',
    support_general_info: 'サポートと一般情報',
    secure: '安全',
    type_or_use_microphone: '入力またはマイクを使用...',
    listening: '聞いています...',
    
    // Account Menu
    my_account: 'マイアカウント',
    profile: 'プロフィール',
    security: 'セキュリティ',
    personal_information: '個人情報',
    emergency_contact_info: '緊急連絡先',
    edit_profile: 'プロフィールを編集',
    logout: 'ログアウト',
    
    // Language Selection
    select_language: '言語を選択',
    language: '言語',
    
    // Mood tracking
    excellent: '優秀',
    good: '良い',
    neutral: '普通',
    sad: '悲しい',
    anxious: '不安',
    angry: '怒り',
    
    // App specific
    privacy_total: '完全なプライバシー',
    works_offline: '完全にオフラインで動作',
    safe_space: '安全な空間',
    emotional_wellbeing: 'あなたの感情的な健康が私たちの優先事項です',
    
    // Errors
    passwords_dont_match: 'パスワードが一致しません',
    email_already_exists: 'このメールアドレスのアカウントが既に存在します',
    user_not_found: 'ユーザーが見つかりません',
    incorrect_password: 'パスワードが間違っています',
    
    // Success messages
    profile_updated_successfully: 'プロフィールが正常に更新されました',
    account_created_successfully: 'アカウントが正常に作成されました！MentalCareへようこそ！',
    
    // New translations
    customize_background: '背景をカスタマイズ',
    select_theme: 'テーマを選択',
    image_analysis: '画像分析',
    upload_image: '画像をアップロード',
    upload_description: '現在の感情状態を表す絵、写真、または画像をアップロードして、パーソナライズされた分析を受けてください。',
    select_image: '画像を選択',
    supported_formats: 'サポートされている形式：JPG、PNG、GIF',
    image_preview: '画像プレビュー',
    analyzing: '分析中...',
    analyze_emotions: '感情を分析',
    analysis_results: '分析結果',
    analyze_another: '別のものを分析',
    emotions_detected: '検出された感情',
    interpretation: '解釈',
    suggestions: '提案',
    color_analysis: '色分析',
    calm: '穏やか',
    contemplative: '瞑想的',
    hopeful: '希望に満ちた',
    generally_positive: '一般的にポジティブ',
    continue_creative_expression: '創造的な表現を続ける',
    practice_mindfulness: '穏やかさを保つためにマインドフルネスを実践する',
    share_feelings: '信頼できる人と感情を共有する',
    blue_tones: '青い色調',
    tranquility_peace: '静寂と平和',
    warm_colors: '暖色',
    energy_optimism: 'エネルギーと楽観主義',
    image_analysis_interpretation: 'あなたの画像は、ポジティブな内省への傾向を持つバランスの取れた感情状態を反映しています。視覚的要素は建設的な反省の瞬間を示唆しています。',
    premium_feature: 'プレミアム機能',
    upgrade_to_premium: 'プレミアムにアップグレード',
    ai_image_analysis: 'AI画像分析',
    unlock_advanced_features: '高度な機能をアンロック',
  }
};

export const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export const useTranslation = (language: string = 'es') => {
  const t = translations[language] || translations.es;
  return { t, language };
};