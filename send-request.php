<?php

header("Content-Type: application/json; charset=utf-8");

if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode([
    "success" => false,
    "message" => "Метод не поддерживается.",
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

const RECAPTCHA_SITE_KEY = "6LfX4YUsAAAAAIr1LEtHhKuF7nWn8hPdLLSe08lV";
const RECAPTCHA_SECRET_KEY = "6LfX4YUsAAAAAMnIeejDrCDQKlFmSms8swZF_keh";

function postValue($key, $defaultValue) {
  if (isset($_POST[$key])) {
    return $_POST[$key];
  }
  return $defaultValue;
}

function serverValue($key, $defaultValue) {
  if (isset($_SERVER[$key])) {
    return $_SERVER[$key];
  }
  return $defaultValue;
}

function cleanValue($value) {
  if (!is_string($value)) {
    return "";
  }

  $trimmed = trim($value);
  $singleLine = preg_replace("/\s+/u", " ", $trimmed);
  if ($singleLine === null) {
    return "";
  }

  return $singleLine;
}

function verifyRecaptcha($secret, $token, $remoteIp) {
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

$recaptchaSecret = RECAPTCHA_SECRET_KEY;

$recaptchaToken = cleanValue(postValue("g-recaptcha-response", ""));
$clientIp = cleanValue(serverValue("REMOTE_ADDR", ""));

if (!verifyRecaptcha($recaptchaSecret, $recaptchaToken, $clientIp)) {
  http_response_code(422);
  echo json_encode([
    "success" => false,
    "message" => "Капча не пройдена. Пожалуйста, попробуйте еще раз.",
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

$name = cleanValue(postValue("name", ""));
$phone = cleanValue(postValue("phone", ""));
$address = cleanValue(postValue("address", ""));
$comment = cleanValue(postValue("comment", ""));
$formType = cleanValue(postValue("form_type", "generic_form"));
$formName = cleanValue(postValue("form_name", "Форма на сайте"));
$pageUrl = cleanValue(postValue("page_url", ""));

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

$subject = isset($subjectByType[$formType]) ? $subjectByType[$formType] : "Новая заявка с сайта";
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

$fromHost = cleanValue(serverValue("HTTP_HOST", "localhost"));
$from = "zakaz@quartz-x.ru";
$headers = [
  "MIME-Version: 1.0",
  "Content-Type: text/plain; charset=UTF-8",
  "From: {$from}",
  "Reply-To: {$from}",
];

$headersString = implode("\r\n", $headers);

if (!function_exists("mail")) {
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "message" => "На сервере отключена функция mail(). Нужна SMTP-настройка.",
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

$sendmailParams = "";
if (filter_var($from, FILTER_VALIDATE_EMAIL)) {
  // On many hosting setups mail() requires envelope sender via -f.
  $sendmailParams = "-f{$from}";
}

$sentAny = false;
$failedRecipients = [];

foreach ($emails as $email) {
  $sent = false;

  if ($sendmailParams !== "") {
    $sent = @mail($email, $encodedSubject, $message, $headersString, $sendmailParams);
  }

  if (!$sent) {
    // Fallback for hosts that ignore the 5th argument.
    $sent = @mail($email, $encodedSubject, $message, $headersString);
  }

  if ($sent) {
    $sentAny = true;
  } else {
    $failedRecipients[] = $email;
  }
}

if (!$sentAny) {
  error_log(
    "send-request.php: mail() failed for all recipients; from={$from}; host={$fromHost}; failed=" .
    implode(",", $failedRecipients)
  );
  http_response_code(500);
  echo json_encode([
    "success" => false,
    "message" => "Сервер не настроен на отправку почты. Проверьте mail()/SMTP у хостинга.",
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

if (!empty($failedRecipients)) {
  error_log("send-request.php: partial mail() failure; failed=" . implode(",", $failedRecipients));
}

echo json_encode([
  "success" => true,
  "message" => "Заявка отправлена.",
], JSON_UNESCAPED_UNICODE);
