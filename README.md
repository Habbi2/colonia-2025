# Colonia de Verano AMM 2025 - Sistema de Inscripción

Este es un sistema de inscripción para la Colonia de Verano AMM 2025, construido con Next.js, Firebase y TypeScript.

## Características

- 📋 Formulario de inscripción completo
- 🔒 Panel de administración con autenticación Firebase
- 📧 Envío automático de emails de confirmación
- 📊 Exportación de datos a Excel
- 🚀 Listo para desplegar en Vercel
- 📱 Diseño responsive

## Configuración

### 1. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Authentication y Firestore Database
3. En Authentication, habilita "Email/Password" como método de inicio de sesión
4. Crea un usuario administrador en Authentication
5. Descarga el archivo de configuración del SDK Admin desde Project Settings > Service Accounts

### 2. Variables de Entorno

Copia `.env.example` a `.env.local` y completa las variables:

```bash
cp .env.example .env.local
```

Completa todas las variables con los valores de tu proyecto Firebase y configuración de email.

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx                 # Página principal
│   ├── registro/                # Formulario de inscripción
│   ├── admin/
│   │   ├── login/              # Login de administrador
│   │   └── dashboard/          # Panel de administración
│   └── api/
│       ├── registration/       # API para crear inscripciones
│       └── admin/              # APIs de administración
├── firebase/
│   ├── clientApp.ts           # Configuración Firebase cliente
│   └── adminApp.ts            # Configuración Firebase admin
├── utils/
│   ├── emailService.ts        # Servicio de emails
│   └── excelGenerator.ts     # Generador de Excel
└── components/                # Componentes reutilizables
```

## Configuración de Email

Para el envío de emails, puedes usar:

- Gmail con App Password
- SendGrid
- Otro proveedor SMTP

### Gmail Setup

1. Habilita la verificación en 2 pasos
2. Genera una "App Password" específica
3. Usa esa contraseña en `EMAIL_SERVER_PASSWORD`

## Despliegue en Vercel

1. Conecta tu repositorio a Vercel
2. Agrega todas las variables de entorno en la configuración de Vercel
3. Despliega

## Seguridad

- Las reglas de Firestore deben configurarse apropiadamente
- Solo usuarios autenticados pueden acceder al panel de administración
- Los emails contienen información sensible, asegúrate de usar HTTPS

## Funcionalidades

### Para Usuarios
- Formulario de inscripción intuitivo
- Validación en tiempo real
- Email de confirmación automático
- Información clara sobre el programa

### Para Administradores
- Login seguro con Firebase Auth
- Vista de todas las inscripciones
- Exportación a Excel
- Panel de administración limpio

## Soporte

Para soporte técnico o consultas sobre el sistema, contacta al administrador del proyecto.
