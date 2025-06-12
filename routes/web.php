<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\AIEnhancementController;

// লগইন না করা ইউজারদের জন্য
Route::middleware('guest')->group(function () {
    Route::get('/', fn () => inertia('Login'));
    Route::get('/auth/redirect', [GoogleController::class, 'redirect']);
    Route::get('/auth/callback', [GoogleController::class, 'callback']);
});

// লগইন করা ইউজারদের জন্য
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [NoteController::class, 'index'])->name('dashboard');

    Route::post('/notes', [NoteController::class, 'store']);
    Route::put('/notes/{note}', [NoteController::class, 'update']);
    Route::delete('/notes/{note}', [NoteController::class, 'destroy']);

    Route::post('/ai/summarize', [AIEnhancementController::class, 'summarize'])->middleware('throttle:60,1');
});


