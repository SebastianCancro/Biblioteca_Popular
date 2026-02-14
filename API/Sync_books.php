<?php

$apiUrl = 'http://localhost:9091/books/update';
$apiKey = 'oUZz675qq58'; //debe coincidir con la API_SECRET_KEY del .env

$filePath = __DIR__ . '/books.json';

// Verificar que el archivo exista
if (!file_exists($filePath)) {
    die("Archivo no encontrado: $filePath\n");
}

// Leer y decodificar el archivo JSON
$jsonData = file_get_contents($filePath);
$data = json_decode($jsonData, true);

if (!isset($data['books']) || !is_array($data['books'])) {
    die("El archivo JSON no contiene una clave 'books' válida.\n");
}

$payload = json_encode(['books' => $data['books']], JSON_UNESCAPED_UNICODE);

// Configurar cURL
$ch = curl_init($apiUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json; charset=utf-8',
        "X-API-Key: $apiKey"
    ],
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_TIMEOUT => 30
]);

// Ejecutar la petición
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    echo "Error cURL: " . curl_error($ch) . "\n";
    exit(1);
}

curl_close($ch);

// Mostrar resultado
echo "Codigo de respuesta $httpCode\n";
echo "Respuesta de la API:\n$response\n";
