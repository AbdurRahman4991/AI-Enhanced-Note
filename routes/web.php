<?php

use Illuminate\Support\Facades\Route;
Route::get('/', function () {
    return inertia('Login');
});
// Route::get('/auth/redirect', [GoogleAuthController::class, 'redirect']);
// Route::get('/auth/callback', [GoogleAuthController::class, 'callback']);
