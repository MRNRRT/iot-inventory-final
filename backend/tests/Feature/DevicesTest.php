<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Basic API availability tests for the IoT Device Inventory backend.
 *
 * These tests verify that key endpoints in the Laravel REST API respond
 * with the expected HTTP status codes and JSON structure. This supports
 * the reliability claims made in the report and demonstrates automated
 * backend testing.
 */
class DevicesTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function health_endpoint_returns_ok_true()
    {
        $response = $this->get('/api/health');

        $response
            ->assertStatus(200)
            ->assertJson([
                'ok' => true,
            ]);
    }

    /** @test */
    public function it_can_list_devices_with_success_status()
    {
        // run the endpoint
        $response = $this->get('/api/devices');

        // expect OK
        $response->assertStatus(200);

        // devices index should always return JSON (array),
        // even if there are zero rows
        $this->assertIsArray($response->json());
    }
}