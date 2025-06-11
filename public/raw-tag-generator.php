<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = $_POST['text'] ?? '';
    echo json_encode([
        'tags' => explode(' ', strtolower($text)) // simple tag generator
    ]);
}
