// Translation dictionaries for the application
// Supports English (default), Kinyarwanda, and French

export type Language = {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
};

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
  { code: "rw", name: "Kinyarwanda", flag: "🇷🇼", nativeName: "Kinyarwanda" },
  { code: "fr", name: "French", flag: "🇫🇷", nativeName: "Français" },
];

// Translation keys by feature
export type TranslationKeys = {
  // Common
  common: {
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    submit: string;
    loading: string;
    success: string;
    error: string;
    back: string;
    next: string;
    search: string;
    languageSelection: string;
    currentLanguage: string;
    close: string;
    confirm: string;
    yes: string;
    no: string;
  };
  // Navigation
  navigation: {
    home: string;
    appointments: string;
    addDevice: string;
    more: string;
    healthTools: string;
  };
  // Greetings
  greetings: {
    goodMorning: string;
    goodAfternoon: string;
    goodEvening: string;
  };
  // Notifications
  notifications: {
    title: string;
    noNotifications: string;
    settings: string;
  };
  // Auth
  auth: {
    login: string;
    logout: string;
    register: string;
    email: string;
    password: string;
    forgotPassword: string;
    resetPassword: string;
  };
  // Profile
  profile: {
    title: string;
    information: string;
    devices: string;
    fullName: string;
    email: string;
    phone: string;
    location: string;
    updateProfile: string;
    saveChanges: string;
    connectedDevices: string;
    manageDevices: string;
    lastConnected: string;
    battery: string;
    active: string;
    inactive: string;
    addNewDevice: string;
    language: string;
    changeLanguage: string;
    editProfile: string;
    uploadPhoto: string;
  };
  // Settings
  settings: {
    title: string;
    notifications: string;
    enableNotifications: string;
    disableNotifications: string;
    twoFactorAuth: string;
    enable2FA: string;
    disable2FA: string;
    setup2FA: string;
    language: string;
    deleteAccount: string;
    confirmDelete: string;
    deleteWarning: string;
    accountDeleted: string;
  };
  // Health Tools
  healthTools: {
    bmiCalculator: string;
    nutritionGuide: string;
    heartRateTest: string;
    calculateBMI: string;
    personalizedRecommendations: string;
    measurePulse: string;
    height: string;
    weight: string;
    enterHeight: string;
    enterWeight: string;
    bmiResult: string;
    normalRange: string;
    underweight: string;
    normal: string;
    overweight: string;
    obese: string;
  };
  // Heart Rate
  heartRate: {
    title: string;
    measuring: string;
    placeFingerOnCamera: string;
    holdStill: string;
    result: string;
    bpm: string;
    normal: string;
    tryAgain: string;
    startMeasurement: string;
  };
  // Nutrition
  nutrition: {
    title: string;
    bloodGlucose: string;
    enterGlucose: string;
    glucoseLevel: string;
    normalRange: string;
    getRecommendations: string;
    recommendations: string;
    quickCarbs: string;
    followUpSnack: string;
    monitorClosely: string;
    avoidExercise: string;
    balancedMeals: string;
    regularTiming: string;
    complexCarbs: string;
    stayHydrated: string;
    reduceSimpleCarbs: string;
    increaseFiber: string;
    portionControl: string;
    leanProteins: string;
    regularExercise: string;
    carbCounting: string;
    lowGlycemic: string;
    consistentMeals: string;
    healthyFats: string;
    monitorBloodSugar: string;
    limitSodium: string;
    low: string;
    prediabetic: string;
    diabetic: string;
  };
  // Appointment
  appointment: {
    title: string;
    selectDate: string;
    selectProfessional: string;
    selectTime: string;
    confirmBooking: string;
    bookingConfirmed: string;
    bookingFailed: string;
    availableTimes: string;
    noAvailableTimes: string;
    professionals: string;
    back: string;
    next: string;
    book: string;
  };
  // Register Insole
  registerInsole: {
    title: string;
    serialNumber: string;
    email: string;
    phone: string;
    fullName: string;
    register: string;
    enterSerialNumber: string;
    enterEmail: string;
    enterPhone: string;
    enterFullName: string;
    description: string;
    benefits: string;
    benefit1: string;
    benefit2: string;
    benefit3: string;
    benefit4: string;
    footerText: string;
  };
  // WiFi
  wifi: {
    title: string;
    availableNetworks: string;
    connect: string;
    password: string;
    enterPassword: string;
    connecting: string;
    connected: string;
    connectionFailed: string;
  };
  // Real Time Monitor
  monitor: {
    title: string;
    footPressure: string;
    temperature: string;
    humidity: string;
    batteryLevel: string;
    deviceStatus: string;
    connected: string;
    disconnected: string;
    startMonitoring: string;
    stopMonitoring: string;
  };
};

// English translations (default)
export const enTranslations: TranslationKeys = {
  common: {
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    submit: "Submit",
    loading: "Loading...",
    success: "Success!",
    error: "Error",
    back: "Back",
    next: "Next",
    search: "Search",
    languageSelection: "Language Selection",
    currentLanguage: "Current Language",
    close: "Close",
    confirm: "Confirm",
    yes: "Yes",
    no: "No",
  },
  navigation: {
    home: "Home",
    appointments: "Appointments",
    addDevice: "Add Device",
    more: "More",
    healthTools: "Health Tools",
  },
  greetings: {
    goodMorning: "Good morning,",
    goodAfternoon: "Good afternoon,",
    goodEvening: "Good evening,",
  },
  notifications: {
    title: "Notifications",
    noNotifications: "No Notifications",
    settings: "Settings",
  },
  auth: {
    login: "Login",
    logout: "Logout",
    register: "Register",
    email: "Email",
    password: "Password",
    forgotPassword: "Forgot Password",
    resetPassword: "Reset Password",
  },
  profile: {
    title: "Profile",
    information: "Profile Information",
    devices: "Connected Devices",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    location: "Location",
    updateProfile: "Update Profile",
    saveChanges: "Save Changes",
    connectedDevices: "Connected Devices",
    manageDevices: "Manage your connected foot pressure monitoring devices",
    lastConnected: "Last connected",
    battery: "Battery",
    active: "Active",
    inactive: "Inactive",
    addNewDevice: "Add New Device",
    language: "Language",
    changeLanguage: "Change Language",
    editProfile: "Edit Profile",
    uploadPhoto: "Upload Photo",
  },
  settings: {
    title: "Settings",
    notifications: "Notifications",
    enableNotifications: "Enable Notifications",
    disableNotifications: "Disable Notifications",
    twoFactorAuth: "Two-Factor Authentication",
    enable2FA: "Enable 2FA",
    disable2FA: "Disable 2FA",
    setup2FA: "Set up 2FA",
    language: "Language",
    deleteAccount: "Delete Account",
    confirmDelete: "Confirm Delete",
    deleteWarning: "This action cannot be undone. Are you sure you want to delete your account?",
    accountDeleted: "Account has been deleted",
  },
  healthTools: {
    bmiCalculator: "BMI Calculator",
    nutritionGuide: "Nutrition Guide",
    heartRateTest: "Heart Rate Test",
    calculateBMI: "Calculate BMI",
    personalizedRecommendations: "Personalized recommendations",
    measurePulse: "Measure your pulse with animation",
    height: "Height (cm)",
    weight: "Weight (kg)",
    enterHeight: "Enter height in cm",
    enterWeight: "Enter weight in kg",
    bmiResult: "BMI Result",
    normalRange: "Normal range: 18.5 - 24.9",
    underweight: "Underweight",
    normal: "Normal",
    overweight: "Overweight",
    obese: "Obese",
  },
  heartRate: {
    title: "Heart Rate Measurement",
    measuring: "Measuring...",
    placeFingerOnCamera: "Place your finger on the camera",
    holdStill: "Hold still for accurate reading",
    result: "Your heart rate",
    bpm: "BPM",
    normal: "Normal",
    tryAgain: "Try Again",
    startMeasurement: "Start Measurement",
  },
  nutrition: {
    title: "Nutrition Guide",
    bloodGlucose: "Blood Glucose",
    enterGlucose: "Enter glucose level (e.g., 95)",
    glucoseLevel: "Blood Glucose (mg/dL)",
    normalRange: "Normal range: 70-99 mg/dL (fasting)",
    getRecommendations: "Get Recommendations",
    recommendations: "Recommendations",
    quickCarbs: "Quick Carbohydrates",
    followUpSnack: "Follow-up Snack",
    monitorClosely: "Monitor Closely",
    avoidExercise: "Avoid Exercise",
    balancedMeals: "Balanced Meals",
    regularTiming: "Regular Meal Timing",
    complexCarbs: "Complex Carbohydrates",
    stayHydrated: "Stay Hydrated",
    reduceSimpleCarbs: "Reduce Simple Carbs",
    increaseFiber: "Increase Fiber",
    portionControl: "Portion Control",
    leanProteins: "Lean Proteins",
    regularExercise: "Regular Exercise",
    carbCounting: "Carb Counting",
    lowGlycemic: "Low Glycemic Foods",
    consistentMeals: "Consistent Meal Times",
    healthyFats: "Healthy Fats",
    monitorBloodSugar: "Monitor Blood Sugar",
    limitSodium: "Limit Sodium",
    low: "Low",
    prediabetic: "Pre-diabetic",
    diabetic: "Diabetic",
  },
  appointment: {
    title: "Book Appointment",
    selectDate: "Select Date",
    selectProfessional: "Select Healthcare Professional",
    selectTime: "Select Time",
    confirmBooking: "Confirm Booking",
    bookingConfirmed: "Booking Confirmed!",
    bookingFailed: "Booking Failed",
    availableTimes: "Available Times",
    noAvailableTimes: "No available times for this date",
    professionals: "Healthcare Professionals",
    back: "Back",
    next: "Next",
    book: "Book Appointment",
  },
  registerInsole: {
    title: "Register New Insole",
    serialNumber: "Serial Number",
    email: "Email",
    phone: "Phone",
    fullName: "Full Name",
    register: "Register Device",
    enterSerialNumber: "Enter device serial number",
    enterEmail: "Enter your email",
    enterPhone: "Enter your phone number",
    enterFullName: "Enter your full name",
    description: "Enter your details to register your new insole device",
    benefits: "Smart Insole Benefits",
    benefit1: "Real-time pressure monitoring for better foot health",
    benefit2: "Personalized insights and recommendations",
    benefit3: "Connect with healthcare professionals",
    benefit4: "Track progress and improvements over time",
    footerText: "Register your device to unlock all features and start your journey to better foot health.",
  },
  wifi: {
    title: "WiFi Connection",
    availableNetworks: "Available Networks",
    connect: "Connect",
    password: "Password",
    enterPassword: "Enter WiFi password",
    connecting: "Connecting...",
    connected: "Connected",
    connectionFailed: "Connection failed",
  },
  monitor: {
    title: "Real-time Monitor",
    footPressure: "Foot Pressure",
    temperature: "Temperature",
    humidity: "Humidity",
    batteryLevel: "Battery Level",
    deviceStatus: "Device Status",
    connected: "Connected",
    disconnected: "Disconnected",
    startMonitoring: "Start Monitoring",
    stopMonitoring: "Stop Monitoring",
    active: "Active",
    noData: "No data",
    low: "Low",
    normal: "Normal",
    elevated: "Elevated",
    high: "High",
    heel: "Heel",
    middle: "Middle",
    toe: "Toe",
    leftFoot: "Left Foot",
    rightFoot: "Right Foot",
    viewAnalytics: "View Analytics",
    hideCharts: "Hide Charts",
    connectInsole: "Connect an insole to start predictive analysis",
    realTimeMonitoring: "Real-time monitoring",
    dataPoints: "data points",
    enterPassword: "Enter device password",
    signalStream: "Signal Stream",
    signal: "Signal",
  },
};

// Kinyarwanda translations
export const rwTranslations: TranslationKeys = {
  common: {
    save: "Kubika",
    cancel: "Guhagarika",
    edit: "Guhindura",
    delete: "Gusiba",
    submit: "Kohereza",
    loading: "Biratunganywa...",
    success: "Byagenze neza!",
    error: "Ikosa",
    back: "Gusubira inyuma",
    next: "Komeza",
    search: "Gushakisha",
    languageSelection: "Guhitamo Ururimi",
    currentLanguage: "Ururimi Rukoresha",
    close: "Gufunga",
    confirm: "Kwemeza",
    yes: "Yego",
    no: "Oya",
  },
  navigation: {
    home: "Ahabanza",
    appointments: "Gusaba Guhura",
    addDevice: "Ongeraho Igikoresho",
    more: "Ibindi",
    healthTools: "Ibikoresho by'Ubuzima",
  },
  greetings: {
    goodMorning: "Mwaramutse,",
    goodAfternoon: "Mwiriwe,",
    goodEvening: "Muramuke,",
  },
  notifications: {
    title: "Ubutumwa",
    noNotifications: "Nta butumwa",
    settings: "Igenamiterere",
  },
  auth: {
    login: "Kwinjira",
    logout: "Gusohoka",
    register: "Kwiyandikisha",
    email: "Imeri",
    password: "Ijambo ry'ibanga",
    forgotPassword: "Wibagiwe Ijambo ry'ibanga",
    resetPassword: "Guhindura Ijambo ry'ibanga",
  },
  profile: {
    title: "Umwirondoro",
    information: "Amakuru y'Umwirondoro",
    devices: "Ibikoresho Bifatanyije",
    fullName: "Amazina Yombi",
    email: "Imeri",
    phone: "Telefoni",
    location: "Aho Uherereye",
    updateProfile: "Kuvugurura Umwirondoro",
    saveChanges: "Kubika Impinduka",
    connectedDevices: "Ibikoresho Bifatanyije",
    manageDevices: "Gucunga ibikoresho byawe bigenzura umuvuduko w'ibirenge",
    lastConnected: "Igihe cyanyuma yafatanyije",
    battery: "Batiri",
    active: "Kirakora",
    inactive: "Ntigirakora",
    addNewDevice: "Ongeraho Igikoresho Gishya",
    language: "Ururimi",
    changeLanguage: "Guhindura Ururimi",
    editProfile: "Guhindura Umwirondoro",
    uploadPhoto: "Gushyiraho Ifoto",
  },
  settings: {
    title: "Igenamiterere",
    notifications: "Ubutumwa",
    enableNotifications: "Gushyira Ubutumwa",
    disableNotifications: "Guhagarika Ubutumwa",
    twoFactorAuth: "Umutekano w'Inzira Ebyiri",
    enable2FA: "Gushyira Umutekano w'Inzira Ebyiri",
    disable2FA: "Guhagarika Umutekano w'Inzira Ebyiri",
    setup2FA: "Gushiraho Umutekano w'Inzira Ebyiri",
    language: "Ururimi",
    deleteAccount: "Gusiba Konti",
    confirmDelete: "Kwemeza Gusiba",
    deleteWarning: "Iki gikorwa ntikishobora gusubizwa inyuma. Uremeza ko ushaka gusiba konti yawe?",
    accountDeleted: "Konti yasibwe",
  },
  healthTools: {
    bmiCalculator: "Kubara BMI",
    nutritionGuide: "Ubuyobozi bw'Intungamubiri",
    heartRateTest: "Gupima Umuvuduko w'Umutima",
    calculateBMI: "Kubara BMI",
    personalizedRecommendations: "Inama zikwiye buri muntu",
    measurePulse: "Gupima umuvuduko w'umutima hamwe n'amashusho",
    height: "Uburebure (cm)",
    weight: "Ibiro (kg)",
    enterHeight: "Andika uburebure muri cm",
    enterWeight: "Andika ibiro muri kg",
    bmiResult: "Igisubizo cya BMI",
    normalRange: "Urwego rusanzwe: 18.5 - 24.9",
    underweight: "Ibiro bike",
    normal: "Bisanzwe",
    overweight: "Ibiro byinshi",
    obese: "Uburemere bukabije",
  },
  heartRate: {
    title: "Gupima Umuvuduko w'Umutima",
    measuring: "Birapimwa...",
    placeFingerOnCamera: "Shyira urutoki kuri kamera",
    holdStill: "Komera neza kugira ngo upime neza",
    result: "Umuvuduko w'umutima wawe",
    bpm: "BPM",
    normal: "Bisanzwe",
    tryAgain: "Ongera Ugerageze",
    startMeasurement: "Tangira Gupima",
  },
  nutrition: {
    title: "Ubuyobozi bw'Intungamubiri",
    bloodGlucose: "Sukari mu Maraso",
    enterGlucose: "Andika urwego rwa sukari (urugero: 95)",
    glucoseLevel: "Sukari mu Maraso (mg/dL)",
    normalRange: "Urwego rusanzwe: 70-99 mg/dL (ubushe)",
    getRecommendations: "Kubona Inama",
    recommendations: "Inama",
    quickCarbs: "Carbohydrates Zihuse",
    followUpSnack: "Igikoni Gikurikira",
    monitorClosely: "Gukurikirana Cyane",
    avoidExercise: "Kwirinda Imyitozo",
    balancedMeals: "Ifunguro Riringaniye",
    regularTiming: "Igihe Gisanzwe cyo Kurya",
    complexCarbs: "Carbohydrates Zigoye",
    stayHydrated: "Kunywa Amazi Ahagije",
    reduceSimpleCarbs: "Kugabanya Carbohydrates Zoroshye",
    increaseFiber: "Kongera Fiber",
    portionControl: "Kugenzura Ingano",
    leanProteins: "Poroteyine Nziza",
    regularExercise: "Imyitozo Isanzwe",
    carbCounting: "Kubara Carbohydrates",
    lowGlycemic: "Ibiryo bya Glycemic Nke",
    consistentMeals: "Igihe Gisanzwe cyo Kurya",
    healthyFats: "Amavuta Meza",
    monitorBloodSugar: "Gukurikirana Sukari mu Maraso",
    limitSodium: "Kugabanya Umunyu",
    low: "Nke",
    prediabetic: "Hafi ya Diyabete",
    diabetic: "Diyabete",
  },
  appointment: {
    title: "Gusaba Guhura",
    selectDate: "Hitamo Itariki",
    selectProfessional: "Hitamo Umuganga",
    selectTime: "Hitamo Igihe",
    confirmBooking: "Emeza Gusaba",
    bookingConfirmed: "Gusaba Byemejwe!",
    bookingFailed: "Gusaba Ntibyagenze Neza",
    availableTimes: "Ibihe Bihari",
    noAvailableTimes: "Nta bihe bihari kuri iyi tariki",
    professionals: "Abaganga",
    back: "Gusubira Inyuma",
    next: "Komeza",
    book: "Saba Guhura",
  },
  registerInsole: {
    title: "Kwandikisha Insole Nshya",
    serialNumber: "Nomero Iranga",
    email: "Imeri",
    phone: "Telefoni",
    fullName: "Amazina Yombi",
    register: "Kwandikisha Igikoresho",
    enterSerialNumber: "Andika nomero iranga igikoresho",
    enterEmail: "Andika imeri yawe",
    enterPhone: "Andika nomero ya telefoni yawe",
    enterFullName: "Andika amazina yawe yombi",
    description: "Andika amakuru yawe kugira ngo wandikishe igikoresho cyawe gishya",
    benefits: "Akamaro k'Insole Nshya",
    benefit1: "Gukurikirana uko ibirenge byawe bihagaze mu gihe nyacyo",
    benefit2: "Inama zikwiye buri muntu ku giti cye",
    benefit3: "Gukorana n'abaganga",
    benefit4: "Gukurikirana iterambere ryawe",
    footerText: "Andikisha igikoresho cyawe kugira ngo ubone serivisi zose kandi utangire urugendo rwo kugira ibirenge byiza.",
  },
  wifi: {
    title: "Guhuza WiFi",
    availableNetworks: "Imitandukanya Ihari",
    connect: "Guhuza",
    password: "Ijambo ry'Ibanga",
    enterPassword: "Andika ijambo ry'ibanga rya WiFi",
    connecting: "Birahuzwa...",
    connected: "Byahujwe",
    connectionFailed: "Guhuza ntibyagenze neza",
  },
  monitor: {
    title: "Gukurikirana mu Gihe Nyacyo",
    footPressure: "Umuvuduko w'Ibirenge",
    temperature: "Ubushyuhe",
    humidity: "Ubushuhe",
    batteryLevel: "Urwego rwa Batiri",
    deviceStatus: "Uko Igikoresho Kimeze",
    connected: "Gihujwe",
    disconnected: "Ntikihujwe",
    startMonitoring: "Tangira Gukurikirana",
    stopMonitoring: "Hagarika Gukurikirana",
    active: "Kirakora",
    noData: "Nta makuru",
    low: "Bike",
    normal: "Bisanzwe",
    elevated: "Byiyongereye",
    high: "Byinshi",
    heel: "Intsinzi",
    middle: "Hagati",
    toe: "Intoki",
    leftFoot: "Ukuguru kw'Ibumoso",
    rightFoot: "Ukuguru kw'Iburyo",
    viewAnalytics: "Reba Isesengura",
    hideCharts: "Hisha Imbonerahamwe",
    connectInsole: "Huza insole kugira ngo utangire isesengura",
    realTimeMonitoring: "Gukurikirana mu gihe nyacyo",
    dataPoints: "ingingo z'amakuru",
    enterPassword: "Andika ijambo ry'ibanga ry'igikoresho",
    signalStream: "Ikimenyetso",
    signal: "Ikimenyetso",
  },
};

// French translations
export const frTranslations: TranslationKeys = {
  common: {
    save: "Enregistrer",
    cancel: "Annuler",
    edit: "Modifier",
    delete: "Supprimer",
    submit: "Soumettre",
    loading: "Chargement...",
    success: "Succès!",
    error: "Erreur",
    back: "Retour",
    next: "Suivant",
    search: "Rechercher",
    languageSelection: "Sélection de la Langue",
    currentLanguage: "Langue Actuelle",
    close: "Fermer",
    confirm: "Confirmer",
    yes: "Oui",
    no: "Non",
  },
  navigation: {
    home: "Accueil",
    appointments: "Rendez-vous",
    addDevice: "Ajouter Appareil",
    more: "Plus",
    healthTools: "Outils de Santé",
  },
  greetings: {
    goodMorning: "Bonjour,",
    goodAfternoon: "Bon après-midi,",
    goodEvening: "Bonsoir,",
  },
  notifications: {
    title: "Notifications",
    noNotifications: "Aucune Notification",
    settings: "Paramètres",
  },
  auth: {
    login: "Connexion",
    logout: "Déconnexion",
    register: "S'inscrire",
    email: "Email",
    password: "Mot de passe",
    forgotPassword: "Mot de passe oublié",
    resetPassword: "Réinitialiser le mot de passe",
  },
  profile: {
    title: "Profil",
    information: "Informations du Profil",
    devices: "Appareils Connectés",
    fullName: "Nom Complet",
    email: "Email",
    phone: "Téléphone",
    location: "Emplacement",
    updateProfile: "Mettre à jour le Profil",
    saveChanges: "Enregistrer les Modifications",
    connectedDevices: "Appareils Connectés",
    manageDevices: "Gérer vos appareils de surveillance de pression plantaire",
    lastConnected: "Dernière connexion",
    battery: "Batterie",
    active: "Actif",
    inactive: "Inactif",
    addNewDevice: "Ajouter un Nouvel Appareil",
    language: "Langue",
    changeLanguage: "Changer de Langue",
    editProfile: "Modifier le Profil",
    uploadPhoto: "Télécharger Photo",
  },
  settings: {
    title: "Paramètres",
    notifications: "Notifications",
    enableNotifications: "Activer les Notifications",
    disableNotifications: "Désactiver les Notifications",
    twoFactorAuth: "Authentification à Deux Facteurs",
    enable2FA: "Activer 2FA",
    disable2FA: "Désactiver 2FA",
    setup2FA: "Configurer 2FA",
    language: "Langue",
    deleteAccount: "Supprimer le Compte",
    confirmDelete: "Confirmer la Suppression",
    deleteWarning: "Cette action ne peut pas être annulée. Êtes-vous sûr de vouloir supprimer votre compte?",
    accountDeleted: "Le compte a été supprimé",
  },
  healthTools: {
    bmiCalculator: "Calculateur IMC",
    nutritionGuide: "Guide Nutritionnel",
    heartRateTest: "Test de Fréquence Cardiaque",
    calculateBMI: "Calculer l'IMC",
    personalizedRecommendations: "Recommandations personnalisées",
    measurePulse: "Mesurer votre pouls avec animation",
    height: "Taille (cm)",
    weight: "Poids (kg)",
    enterHeight: "Entrez la taille en cm",
    enterWeight: "Entrez le poids en kg",
    bmiResult: "Résultat IMC",
    normalRange: "Plage normale: 18.5 - 24.9",
    underweight: "Insuffisance pondérale",
    normal: "Normal",
    overweight: "Surpoids",
    obese: "Obèse",
  },
  heartRate: {
    title: "Mesure de la Fréquence Cardiaque",
    measuring: "Mesure en cours...",
    placeFingerOnCamera: "Placez votre doigt sur la caméra",
    holdStill: "Restez immobile pour une lecture précise",
    result: "Votre fréquence cardiaque",
    bpm: "BPM",
    normal: "Normal",
    tryAgain: "Réessayer",
    startMeasurement: "Commencer la Mesure",
  },
  nutrition: {
    title: "Guide Nutritionnel",
    bloodGlucose: "Glucose Sanguin",
    enterGlucose: "Entrez le niveau de glucose (ex: 95)",
    glucoseLevel: "Glucose Sanguin (mg/dL)",
    normalRange: "Plage normale: 70-99 mg/dL (à jeun)",
    getRecommendations: "Obtenir des Recommandations",
    recommendations: "Recommandations",
    quickCarbs: "Glucides Rapides",
    followUpSnack: "Collation de Suivi",
    monitorClosely: "Surveiller de Près",
    avoidExercise: "Éviter l'Exercice",
    balancedMeals: "Repas Équilibrés",
    regularTiming: "Horaires Réguliers des Repas",
    complexCarbs: "Glucides Complexes",
    stayHydrated: "Rester Hydraté",
    reduceSimpleCarbs: "Réduire les Glucides Simples",
    increaseFiber: "Augmenter les Fibres",
    portionControl: "Contrôle des Portions",
    leanProteins: "Protéines Maigres",
    regularExercise: "Exercice Régulier",
    carbCounting: "Comptage des Glucides",
    lowGlycemic: "Aliments à Index Glycémique Bas",
    consistentMeals: "Horaires de Repas Cohérents",
    healthyFats: "Graisses Saines",
    monitorBloodSugar: "Surveiller la Glycémie",
    limitSodium: "Limiter le Sodium",
    low: "Bas",
    prediabetic: "Pré-diabétique",
    diabetic: "Diabétique",
  },
  appointment: {
    title: "Prendre Rendez-vous",
    selectDate: "Sélectionner une Date",
    selectProfessional: "Sélectionner un Professionnel de Santé",
    selectTime: "Sélectionner une Heure",
    confirmBooking: "Confirmer la Réservation",
    bookingConfirmed: "Réservation Confirmée!",
    bookingFailed: "Échec de la Réservation",
    availableTimes: "Heures Disponibles",
    noAvailableTimes: "Aucune heure disponible pour cette date",
    professionals: "Professionnels de Santé",
    back: "Retour",
    next: "Suivant",
    book: "Réserver",
  },
  registerInsole: {
    title: "Enregistrer Nouvelle Semelle",
    serialNumber: "Numéro de Série",
    email: "Email",
    phone: "Téléphone",
    fullName: "Nom Complet",
    register: "Enregistrer l'Appareil",
    enterSerialNumber: "Entrez le numéro de série de l'appareil",
    enterEmail: "Entrez votre email",
    enterPhone: "Entrez votre numéro de téléphone",
    enterFullName: "Entrez votre nom complet",
    description: "Entrez vos coordonnées pour enregistrer votre nouvelle semelle intelligente",
    benefits: "Avantages de la Semelle Intelligente",
    benefit1: "Surveillance de la pression en temps réel pour une meilleure santé des pieds",
    benefit2: "Conseils et recommandations personnalisés",
    benefit3: "Connectez-vous avec des professionnels de la santé",
    benefit4: "Suivez vos progrès et améliorations au fil du temps",
    footerText: "Enregistrez votre appareil pour débloquer toutes les fonctionnalités et commencer votre parcours vers une meilleure santé des pieds.",
  },
  wifi: {
    title: "Connexion WiFi",
    availableNetworks: "Réseaux Disponibles",
    connect: "Se Connecter",
    password: "Mot de Passe",
    enterPassword: "Entrez le mot de passe WiFi",
    connecting: "Connexion en cours...",
    connected: "Connecté",
    connectionFailed: "Échec de la connexion",
  },
  monitor: {
    title: "Surveillance en Temps Réel",
    footPressure: "Pression Plantaire",
    temperature: "Température",
    humidity: "Humidité",
    batteryLevel: "Niveau de Batterie",
    deviceStatus: "État de l'Appareil",
    connected: "Connecté",
    disconnected: "Déconnecté",
    startMonitoring: "Commencer la Surveillance",
    stopMonitoring: "Arrêter la Surveillance",
    active: "Actif",
    noData: "Aucune donnée",
    low: "Bas",
    normal: "Normal",
    elevated: "Élevé",
    high: "Haut",
    heel: "Talon",
    middle: "Milieu",
    toe: "Orteil",
    leftFoot: "Pied Gauche",
    rightFoot: "Pied Droit",
    viewAnalytics: "Voir les Analyses",
    hideCharts: "Masquer les Graphiques",
    connectInsole: "Connectez une semelle pour commencer l'analyse prédictive",
    realTimeMonitoring: "Surveillance en temps réel",
    dataPoints: "points de données",
    enterPassword: "Entrez le mot de passe de l'appareil",
    signalStream: "Flux de Signal",
    signal: "Signal",
  },
};

// Get translations based on language code
export const getTranslations = (languageCode: string): TranslationKeys => {
  switch (languageCode) {
    case "rw":
      return rwTranslations;
    case "fr":
      return frTranslations;
    case "en":
    default:
      return enTranslations;
  }
};
