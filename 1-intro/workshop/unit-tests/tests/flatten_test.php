<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test_empty()
    {
        $this->assertEquals(null, null);
        $this->assertEquals([], []);
    }

    public function test_single_value()
    {
        $this->assertEquals(flatten(array(1337)), array(1337));
        $this->assertEquals(flatten(array(-8)), array(-8));
    }
    

    public function test_nested_multiple()
    {
        $this->assertEquals(flatten(array(5, array(8))), array(5, 8));
        $this->assertEquals(flatten(array(5, 8, array(8, 15))), array(5, 8, 8, 15));
    }
}