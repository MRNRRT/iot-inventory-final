<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Device;

class DeviceController extends Controller
{
    public function index()
    {
        return response()->json(Device::orderByDesc('id')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'type'     => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'status'   => 'required|in:active,inactive,maintenance',
        ]);
        $device = Device::create($data);
        return response()->json($device, 201);
    }

    public function show(Device $device)
    {
        return response()->json($device);
    }

    public function update(Request $request, Device $device)
    {
        $data = $request->validate([
            'name'     => 'sometimes|required|string|max:255',
            'type'     => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'status'   => 'sometimes|required|in:active,inactive,maintenance',
        ]);
        $device->update($data);
        return response()->json($device);
    }

    public function destroy(Device $device)
    {
        $device->delete();
        return response()->noContent();
    }
}
