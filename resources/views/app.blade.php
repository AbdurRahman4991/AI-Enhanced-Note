<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    @vite('resources/css/app.css')
    {{-- ⚠️ এটি অবশ্যই head-এ থাকতে হবে --}}
    @viteReactRefresh
    
    {{-- ✅ app.jsx ফাইল একবারই লোড করো --}}
    @vite(['resources/js/app.jsx'])

    {{-- ✅ Inertia page title/head সাপোর্ট --}}
    @inertiaHead
</head>
<body class="antialiased">
    {{-- ✅ React SPA Root --}}
    @inertia
</body>
</html>
