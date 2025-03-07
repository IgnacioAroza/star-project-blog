# Star Project Blog

Blog para documentar los avances de nuestra marca de ropa.

## Tecnologías

- Next.js 14
- MongoDB
- NextAuth.js
- Tailwind CSS

## Configuración Local

1. Clona el repositorio
```bash
git clone <tu-repositorio>
cd star-project-blog
```

2. Instala las dependencias
```bash
pnpm install
```

3. Crea un archivo `.env.local` basado en `.env.example` y configura tus variables de entorno

4. Ejecuta el servidor de desarrollo
```bash
pnpm dev
```

## Despliegue en Vercel

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio de GitHub con Vercel
3. Configura las siguientes variables de entorno en Vercel:
   - `MONGODB_URI`: Tu URI de conexión a MongoDB
   - `NEXTAUTH_SECRET`: Un string secreto para las sesiones
   - `NEXTAUTH_URL`: La URL de tu aplicación desplegada

## Base de Datos

El proyecto usa MongoDB Atlas. Para configurar:

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo cluster (la capa gratuita es suficiente)
3. Configura el acceso de red (Network Access) para permitir conexiones desde cualquier lugar
4. Crea un usuario de base de datos
5. Obtén tu URI de conexión y agrégala a las variables de entorno
