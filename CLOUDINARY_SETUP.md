# Configuración de Cloudinary

Para que la funcionalidad de subida de imágenes funcione correctamente, necesitas configurar una cuenta de Cloudinary y actualizar las variables de entorno.

## Paso 1: Crear una cuenta en Cloudinary

1. Ve a [Cloudinary.com](https://cloudinary.com/) y crea una cuenta gratuita
2. Una vez registrado, serás dirigido al Dashboard

## Paso 2: Obtener las credenciales

En el Dashboard de Cloudinary, encontrarás la sección "Account Details" que incluye:
- Cloud name
- API Key
- API Secret

## Paso 3: Actualizar el archivo .env.local

Copia estas credenciales y actualiza el archivo `.env.local` en la raíz de tu proyecto:

```
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

## Paso 4: Reiniciar el servidor

Detén el servidor de desarrollo y vuelve a iniciarlo para que los cambios surtan efecto:

```
pnpm dev
```

## Limitaciones del plan gratuito

- 25GB de almacenamiento
- 25GB de ancho de banda mensual
- Transformaciones básicas de imágenes

Para más información, consulta la [documentación oficial de Cloudinary](https://cloudinary.com/documentation). 