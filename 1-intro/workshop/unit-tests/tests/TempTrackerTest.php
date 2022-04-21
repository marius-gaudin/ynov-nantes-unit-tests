<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase {
    public function test_insert() {
        $tempTracker = new TempTracker();
        $tempTracker->insert(50);
        $this->assertEquals($tempTracker->get_temps(), [50]);
    }

    public function test_get_min() {
        $tempTracker = new TempTracker();
        $tempTracker->insert(50);
        $tempTracker->insert(35);
        $tempTracker->insert(60);
        $this->assertEquals($tempTracker->get_min(), 35);
    }

    public function test_get_max() {
        $tempTracker = new TempTracker();
        $tempTracker->insert(50);
        $tempTracker->insert(35);
        $tempTracker->insert(60);
        $this->assertEquals($tempTracker->get_max(), 60);
    }

    public function test_wrong_values() {
        $this->expectException(ValueError::class);
        $tempTracker = new TempTracker();
        $tempTracker->insert(-10);
        $tempTracker->insert(120);
    }

    public function test_wrong_typing() {
        $this->expectException(TypeError::class);
        $tempTracker = new TempTracker();
        $tempTracker->insert("40");
    }
}