<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="/favicon.png">
    <title>{{ env("APP_NAME") }}</title>
    @viteReactRefresh
    @vite(['resources/ts/main.tsx'])
</head>
<body class="dark:bg-gray-900">
    <div id="app"></div>
</body>
</html>
