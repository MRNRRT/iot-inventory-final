<?php

namespace Tests\Feature;

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
        $response = $this->get('/api/devices');

        $response->assertStatus(200);

        // We don't assert exact content here because DB may differ,
        // but we confirm it's valid JSON response.
        $this->assertIsArray($response->json());
    }
}