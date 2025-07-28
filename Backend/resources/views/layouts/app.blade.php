<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>UMKM Legowo</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-gray-100">

    <div class="container mx-auto mt-6">
        @yield('content')
    </div>
</body>

</html>
