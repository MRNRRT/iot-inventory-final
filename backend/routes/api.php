<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeviceController;

Route::get('/health', fn() => response()->json(['ok' => true]));
Route::apiResource('devices', DeviceController::class);
