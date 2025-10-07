# BookSwap 📚

Una aplicación literaria que permite a los usuarios conectarse a través de libros y realizar intercambios. Similar a Tinder pero enfocada en el mundo de la lectura.

## 🚀 Características

### Funcionalidades Principales
- **Sistema de Swipe**: Interfaz similar a Tinder para descubrir libros
- **Intercambio de Libros**: "Lo leo y te lo cambio"
- **Mapa de Lectores**: Encuentra lectores cercanos en tu área
- **Chat Integrado**: Comunicación directa entre usuarios
- **Perfiles Detallados**: Información completa de usuarios y libros
- **Sistema de Suscripciones**: Planes premium con funciones exclusivas

### Autenticación y Seguridad
- Registro gratuito con verificación por SMS
- Sistema de login seguro
- Verificación de teléfono con código de confirmación
- Gestión de perfiles de usuario

### Funciones Premium
- Intercambios ilimitados
- Ver quién te dio like
- Super likes ilimitados
- Sin anuncios
- Filtros avanzados
- Soporte prioritario

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework principal
- **TypeScript**: Tipado estático
- **React Navigation**: Navegación entre pantallas
- **React Native Maps**: Integración de mapas
- **React Native Gifted Chat**: Sistema de chat
- **React Native Paper**: Componentes de UI
- **AsyncStorage**: Almacenamiento local
- **Firebase**: Backend y autenticación (configuración pendiente)

## 📱 Pantallas Implementadas

### Autenticación
- **WelcomeScreen**: Pantalla de bienvenida
- **LoginScreen**: Inicio de sesión
- **RegisterScreen**: Registro de usuarios
- **VerificationScreen**: Verificación por SMS

### Aplicación Principal
- **SwipeScreen**: Descubrir libros con swipe
- **MapScreen**: Mapa de lectores cercanos
- **ChatListScreen**: Lista de conversaciones
- **ChatScreen**: Chat individual
- **ProfileScreen**: Perfil del usuario
- **ProfileEditScreen**: Editar perfil
- **BookDetailScreen**: Detalles del libro
- **SubscriptionScreen**: Gestión de suscripciones

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd bookswap

# Instalar dependencias
npm install

# Para iOS
cd ios && pod install && cd ..

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios
```

### Configuración de APIs

#### Google Maps
1. Obtener API Key de Google Maps
2. Configurar en `android/app/src/main/AndroidManifest.xml`
3. Configurar en `ios/BookSwap/Info.plist`

#### Firebase (Opcional)
1. Crear proyecto en Firebase Console
2. Configurar `google-services.json` (Android)
3. Configurar `GoogleService-Info.plist` (iOS)

## 📦 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── context/            # Contextos de React
│   ├── AuthContext.tsx
│   └── LocationContext.tsx
├── navigation/         # Configuración de navegación
│   └── MainTabNavigator.tsx
├── screens/           # Pantallas de la aplicación
│   ├── auth/         # Pantallas de autenticación
│   ├── SwipeScreen.tsx
│   ├── MapScreen.tsx
│   ├── ChatListScreen.tsx
│   ├── ChatScreen.tsx
│   ├── ProfileScreen.tsx
│   └── ...
├── styles/           # Estilos y temas
│   └── theme.ts
└── types/           # Definiciones de tipos TypeScript
```

## 🎨 Diseño

### Paleta de Colores
- **Primario**: Verde literario (#2E7D32)
- **Secundario**: Naranja (#FF6F00)
- **Acento**: Amarillo dorado (#FFC107)
- **Fondo**: Gris claro (#FAFAFA)

### Características de UI
- Diseño moderno y profesional
- Interfaz intuitiva similar a Tinder
- Componentes consistentes
- Animaciones suaves
- Responsive design

## 📱 Despliegue

### Android (Play Store)
1. Generar APK firmado:
```bash
cd android
./gradlew assembleRelease
```

2. Configurar en Google Play Console
3. Subir APK/AAB
4. Completar información de la tienda

### iOS (App Store)
1. Configurar certificados de desarrollo
2. Generar archivo IPA:
```bash
cd ios
xcodebuild -workspace BookSwap.xcworkspace -scheme BookSwap -configuration Release -destination generic/platform=iOS -archivePath BookSwap.xcarchive archive
```

3. Subir a App Store Connect
4. Configurar en App Store

## 🔧 Configuración Adicional

### Permisos Requeridos
- **Ubicación**: Para mostrar lectores cercanos
- **Cámara**: Para tomar fotos de libros
- **Galería**: Para seleccionar imágenes
- **Notificaciones**: Para mensajes y actualizaciones

### Variables de Entorno
Crear archivo `.env` con:
```
GOOGLE_MAPS_API_KEY=tu_api_key_aqui
FIREBASE_API_KEY=tu_firebase_key_aqui
```

## 🚧 Estado del Proyecto

### ✅ Completado
- [x] Estructura base del proyecto
- [x] Sistema de autenticación
- [x] Interfaz de swipe para libros
- [x] Integración de mapas
- [x] Sistema de chat
- [x] Perfiles de usuario
- [x] Sistema de suscripciones
- [x] Diseño UI/UX profesional

### 🔄 En Desarrollo
- [ ] Integración con backend real
- [ ] Sistema de notificaciones push
- [ ] Optimización de rendimiento
- [ ] Pruebas unitarias

### 📋 Pendiente
- [ ] Configuración de Firebase
- [ ] Integración con servicios de pago
- [ ] Sistema de reportes
- [ ] Modo offline
- [ ] Internacionalización

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

- **Desarrollador**: [Tu Nombre]
- **Email**: [tu-email@ejemplo.com]
- **Proyecto**: [URL del repositorio]

---

**BookSwap** - Conectando lectores a través de los libros 📚✨
