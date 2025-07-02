# 📦 parte_4

Proyecto Node.js con Express, MongoDB y herramientas de desarrollo modernas.

## 🛠️ Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada: 18.x o superior)
- [npm](https://www.npmjs.com/) (se instala junto con Node.js)

## 📥 Instalación

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

   Esto instalará:

   - `express` - Framework web
   - `cors` - Middleware para CORS
   - `mongodb` - Cliente oficial para MongoDB
   - `picocolors` - Colores de consola ligeros
   - `zod` - Validaciones de esquemas
   - `standard` - Linter estilo JavaScript Standard (Solo de desarrollo y no de producción)

## ▶️ Scripts disponibles

- **Modo desarrollo**:

  ```bash
  npm run dev:1
  ```

  Este comando usa `node --watch` para recargar automáticamente `app.js` al detectar cambios.

- **Linting (opcional)**:

  Puedes revisar el código con `standard`:

  ```bash
  npx standard
  ```

## 🧪 Pruebas

Actualmente no hay pruebas definidas. El script `"test"` devuelve un mensaje de placeholder.

## 📦 Estructura recomendada

```
parte_4/
├── app.js
├── package.json
├── README.md
└── (tu lógica modular aquí)
```
