# Sistema de Autenticación con Next.js, Prisma y NextAuth

Este proyecto es una aplicación web completa de autenticación de usuarios construida con tecnologías modernas. Permite a los usuarios registrarse, iniciar sesión y acceder a un dashboard protegido.

## 🚀 Características

- **Registro de usuarios**: Formulario de registro con validación de campos
- **Inicio de sesión**: Autenticación segura con credenciales
- **Dashboard protegido**: Área privada solo para usuarios autenticados
- **Gestión de sesiones**: Manejo automático de sesiones con NextAuth
- **Base de datos PostgreSQL**: Almacenamiento persistente con Prisma ORM
- **Interfaz moderna**: Diseño responsive con Tailwind CSS

## 🛠️ Tecnologías Utilizadas

- **Next.js 15**: Framework de React para el frontend y backend
- **Prisma**: ORM para la gestión de base de datos
- **NextAuth.js**: Autenticación y gestión de sesiones
- **PostgreSQL**: Base de datos relacional
- **Tailwind CSS**: Framework de estilos
- **React Hook Form**: Manejo de formularios
- **bcrypt**: Encriptación de contraseñas

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/     # Configuración de NextAuth
│   │       └── register/          # API de registro
│   ├── auth/
│   │   ├── login/                 # Página de inicio de sesión
│   │   └── register/              # Página de registro
│   ├── dashboard/                 # Dashboard protegido
│   └── components/                # Componentes reutilizables
├── libs/
│   └── db.js                      # Configuración de Prisma
└── middleware.ts                  # Middleware de autenticación
```

## 🗄️ Modelo de Datos

El proyecto utiliza un modelo de usuario simple con los siguientes campos:
- `id`: Identificador único
- `email`: Email del usuario (único)
- `username`: Nombre de usuario (único)
- `password`: Contraseña encriptada
- `createAt`: Fecha de creación
- `updatedAt`: Fecha de última actualización

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- PostgreSQL
- npm, yarn, pnpm o bun

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd nextjs-prisma-credentials
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear un archivo `.env.local` en la raíz del proyecto:
   ```env
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_db"
   NEXTAUTH_SECRET="tu-secreto-super-seguro"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Configurar la base de datos**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**
   Visita [http://localhost:3000](http://localhost:3000)

## 📋 Funcionalidades

### Registro de Usuarios
- Formulario de registro con validación
- Verificación de contraseñas coincidentes
- Encriptación automática de contraseñas
- Validación de email y username únicos

### Inicio de Sesión
- Autenticación con email y contraseña
- Manejo de errores de credenciales
- Redirección automática al dashboard

### Dashboard
- Página protegida solo para usuarios autenticados
- Funcionalidad de cierre de sesión
- Interfaz limpia y moderna

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Sesiones seguras con NextAuth
- Validación de formularios en frontend y backend
- Middleware de protección de rutas
- Variables de entorno para configuración sensible

## 🎨 Interfaz de Usuario

- Diseño responsive con Tailwind CSS
- Tema oscuro por defecto
- Formularios con validación visual
- Mensajes de error claros y descriptivos
- Navegación intuitiva

## 📝 Scripts Disponibles

- `npm run dev`: Ejecuta el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia el servidor de producción
- `npm run lint`: Ejecuta el linter para verificar el código

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.
