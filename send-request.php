<?php
declare(strict_types=1);

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode([
    "success" => false,
    "message" => "Метод не поддерживается.",
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

function loadEnvFromFile(string $filePath): array {
  if (!is_file($filePath)) {
    return [];
  }

  $result = [];
  $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  if ($lines === false) {
    return [];
  }

  foreach ($lines as $line) {
    $trimmed = trim($line);
    if ($trimmed === "" || strpos($trimmed, "#") === 0) {
      continue;
    }

    $separatorPos = strpos($trimmed, "=");
    if ($separatorPos === false) {
      continue;
    }

    $key = trim(substr($trimmed, 0, $separatorPos));
    $value = trim(substr($trimmed, $separatorPos + 1));

    $startsWithDoubleQuote = strpos($value, "\"") === 0;
    $endsWithDoubleQuote = substr($value, -1) === "\"";
    $startsWithSingleQuote = strpos($value, "'") === 0;
    $endsWithSingleQuote = substr($value, -1) === "'";

    if (
      ($startsWithDoubleQuote && $endsWithDoubleQuote) ||
      ($startsWithSingleQuote && $endsWithSingleQuote)
    ) {
      $value = substr($value, 1, -1);
    }

    $result[$key] = $value;
  }

  return $result;
}

function verifyRecaptcha(string $secret, string $token, string $remoteIp): bool {
  if ($secret === "" || $token === "") {
    return false;
  }

  $payload = http_build_query([
    "secret" => $secret,
    "response" => $token,
    "remoteip" => $remoteIp,
  ]);

  $options = [
    "http" => [
      "method" => "POST",
      "header" => "Content-Type: application/x-www-form-urlencoded\r\n",
      "content" => $payload,
      "timeout" => 10,
    ],
  ];

  $response = @file_get_contents(
    "https://www.google.com/recaptcha/api/siteverify",
    false,
    stream_context_create($options)
  );

  if ($response === false) {
    return false;
  }

  $decoded = json_decode($response, true);
  if (!is_array($decoded)) {
    return false;
  }

  return !empty($decoded["success"]);
}

function cleanValue(string $value): string {
  $trimmed = trim($value);
  $singleLine = preg_replace("/\s+/u", " ", $trimmed);
  return $singleLine ?? "";
}

$env = loadEnvFromFile(__DIR__ . "/.env");
$recaptchaSecret = getenv("RECAPTCHA_SECRET_KEY");

if (!is_string($recaptchaSecret) || $recaptchaSecret === "") {
  $recaptchaSecret = $env["RECAPTCHA_SECRET_KEY"] ?? "";
}

$recaptchaToken = cleanValue($_POST["g-recaptcha-response"] ?? "");
$clientIp = $_SERVER["REMOTE_ADDR"] ?? "";

if (!verifyRecaptcha($recaptchaSecret, $recaptchaToken, $clientIp)) {
  http_response_code(422);
  echo json_encode([
    "success" => false,
    "message" => "Капча не пройдена. Пожалуйста, попробуйте еще раз.",
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

$name = cleanValue($_POST["name"] ?? "");
$phone = cleanValue($_POST["phone"] ?? "");
$address = cleanValue($_POST["address"] ?? "");
$comment = cleanValue($_POST["comment"] ?? "");
$formType = cleanValue($_POST["form_type"] ?? "generic_form");
$formName = cleanValue($_POST["form_name"] ?? "Форма на сайте");
$pageUrl = cleanValue($_POST["page_url"] ?? "");

if ($phone === "") {
  http_response_code(422);
  echo json_encode([
    "success" => false,
    "message" => "Укажите номер телефона.",
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

$emails = [
  "zhenya.brest@gmail.com",
  "skachkov_evgenij@list.ru",
];

$subjectByType = [
  "express_calc" => "Новая заявка: Экспресс расчет",
  "samples_delivery" => "Новая заявка: Доставка образцов",
  "promo_calc" => "Новая заявка: Расчет по акции",
  "selection_request" => "Новая заявка: Подбор цвета",
  "contacts_message" => "Новое сообщение: Напишите нам",
  "generic_form" => "Новая заявка с сайта",
];

$subject = $subjectByType[$formType] ?? "Новая заявка с сайта";
$encodedSubject = "=?UTF-8?B?" . base64_encode($subject) . "?=";

switch ($formType) {
  case "samples_delivery":
    $messageLines = [
      "Тип заявки: Выбирайте дома",
      "Имя: " . ($name !== "" ? $name : "-"),
      "Телефон: " . $phone,
      "Адрес доставки: " . ($address !== "" ? $address : "-"),
    ];
    break;
  case "promo_calc":
    $messageLines = [
      "Тип заявки: Акция",
      "Имя: " . ($name !== "" ? $name : "-"),
      "Телефон: " . $phone,
    ];
    break;
  case "selection_request":
    $messageLines = [
      "Тип заявки: Оставить заявку на расчет",
      "Телефон: " . $phone,
    ];
    break;
  case "contacts_message":
    $messageLines = [
      "Тип заявки: Контакты",
      "Имя: " . ($name !== "" ? $name : "-"),
      "Телефон: " . $phone,
      "Комментарий: " . ($comment !== "" ? $comment : "-"),
    ];
    break;
  case "express_calc":
    $messageLines = [
      "Тип заявки: Экспресс расчет",
      "Телефон: " . $phone,
    ];
    break;
  default:
    $messageLines = [
      "Тип заявки: " . $formName,
      "Имя: " . ($name !== "" ? $name : "-"),
      "Телефон: " . $phone,
      "Адрес: " . ($address !== "" ? $address : "-"),
      "Комментарий: " . ($comment !== "" ? $comment : "-"),
    ];
    break;
}

$messageLines[] = "Форма: " . $formName;
$messageLines[] = "Страница: " . ($pageUrl !== "" ? $pageUrl : "-");
$messageLines[] = "IP: " . ($clientIp !== "" ? $clientIp : "-");
$messageLines[] = "Дата: " . date("Y-m-d H:i:s");

$message = implode("\n", $messageLines);

$fromHost = $_SERVER["HTTP_HOST"] ?? "localhost";
$from = "no-reply@" . preg_replace("/:\d+$/", "", $fromHost);
$headers = [
  "MIME-Version: 1.0",
  "Content-Type: text/plain; charset=UTF-8",
  "From: {$from}",
  "Reply-To: {$from}",
];

$headersString = implode("\r\n", $headers);

foreach ($emails as $email) {
  $sent = @mail($email, $encodedSubject, $message, $headersString);
  if (!$sent) {
    http_response_code(500);
    echo json_encode([
      "success" => false,
      "message" => "Не удалось отправить письмо. Проверьте настройки почты на сервере.",
    ], JSON_UNESCAPED_UNICODE);
    exit;
  }
}

echo json_encode([
  "success" => true,
  "message" => "Заявка отправлена.",
], JSON_UNESCAPED_UNICODE);
