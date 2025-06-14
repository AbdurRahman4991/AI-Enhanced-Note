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

    Route::post('/notes', [NoteController::class, 'store'])->name('notes.store');
    Route::post('/notes/{note}', [NoteController::class, 'update'])->name('notes.update');
    Route::get('/notes/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');

    Route::post('/ai/summarize', [AIEnhancementController::class, 'summarize'])->middleware('throttle:60,1')->name('ai.summarize');
});



