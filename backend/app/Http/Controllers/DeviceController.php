<?php
namespace App\Http\Controllers;

use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DeviceController extends Controller
{
    public function index()
    {
        return response()->json(Device::orderBy('created_at','desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:120',
            'type' => 'required|string|max:80',
            'location' => 'required|string|max:120',
            'status' => 'nullable|in:active,inactive'
        ]);
        $device = Device::create($validated);
        return response()->json($device, Response::HTTP_CREATED);
    }

    public function show(Device $device)
    {
        return response()->json($device);
    }

    public function update(Request $request, Device $device)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:120',
            'type' => 'sometimes|required|string|max:80',
            'location' => 'sometimes|required|string|max:120',
            'status' => 'nullable|in:active,inactive'
        ]);
        $device->update($validated);
        return response()->json($device);
    }

    public function destroy(Device $device)
    {
        $device->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
