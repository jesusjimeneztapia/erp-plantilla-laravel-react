# Plantilla ERP con Laravel 10, React 19 y Tailwind CSS 4

## Requisitos

-   PHP >= 8.1
-   Composer
-   Node.js >= 20
-   NPM o Yarn
-   MySQL / PostgreSQL / SQLite

## Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/jesusjimeneztapia/erp-plantilla-laravel-react.git
cd erp-plantilla-laravel-react
```

### 2. Instalar dependencias de Laravel

```bash
composer install
```

### 3. Instalar dependencias de Node

```bash
npm install
```

### 4. Copiar archivo de entorno

```bash
cp .env.example .env
```

### 5. Generar key de Laravel

```bash
php artisan key:generate
```

### 6. Configurar base de datos en `.env`

### 7. Ejecutar migraciones

```bash
php artisan migrate
```

## Ejecutar el proyecto

### Backend (Laravel)

```bash
php artisan serve
```

### Frontend (React con Vite)

```bash
npm run dev
```

## Compilación para producción

### Compilar para producción

```bash
npm run build
```

## Estructura del proyecto

```text
erp-plantilla-laravel-react/
|-- app/
|-- bootstrap/
|-- config/
|-- database/
|-- public/
|-- resources/
|   |-- css/      # Estilos de Tailwind CSS
|   |-- ts/       # Componentes de React (TypeScript)
|-- routes/
|-- storage/
|-- tests/
```

## Despligue en Producción (cPanel)

### 1. Archivos y carpetas que **SÍ** deben subirse

Sube todo el contenido del proyecto **excepto**:

-   `/node_modules`
-   `/vendor` (puede instalarse desde Composer en el servidor, si se puede)
-   `/storage/logs` (puede limpiarse)
-   `/storage/framework/cache/data` (cache local)
-   `/public/build` (se genera con `npm run build`, si se puede)

El resto del proyecto debe estar presente en el servidor

### 2. Carpetas que **NO** deben subirse

Estas carpetas deben excluirse porque se regeneran o no son necesarias en producción:

-   `node_modules/`
-   `vendor/` (opcional subirlo, pero NO recomendado: es muy pesado)
-   `.git/`
-   `.vscode/` o cualquier carpeta del editor
-   `tests/`
-   `storage/framework/cache/data`
-   `storage/logs/*`

Estructura final:

```text
tudominio.com/
|-- app/            # Incluir toda la carpeta
|-- bootstrap/      # Incluir toda la carpeta
|-- config/         # Incluir toda la carpeta
|-- database/       # Incluir toda la carpeta
|-- public/         # Incluir toda la carpeta (junto con el build)
|-- resources/      # Solo incluir views
|   |-- views/      # Incluir toda la carpeta
|-- routes/         # Incluir toda la carpeta
|-- storage/        # Excluir lo mencionado anteriormente
|-- vendor/         # Incluir toda la carpeta
|-- .env            # Incluir archivo
|-- artisan         # Incluir archivo
|-- composer.json   # Incluir archivo
|-- composer.lock   # Incluir archivo
```

### 3. Configurar entorno `.env`

Sube tu `.env` y ajusta:

-   DB_DATABASE
-   DB_USERNAME
-   DB_PASSWORD

Y configura:

```ini
APP_URL=https://tudominio.com
APP_ENV=production
APP_DEBUG=false
```

Genera la APP_KEY si no existe:

```bash
php artisan key:generate
```

## Tecnologías utilizadas

-   Laravel 10
-   React 19
-   TypeScript 5
-   Vite 6
-   Tailwind CSS 4
-   TailAdmin (Plantilla Dashboard)
-   MySQL
