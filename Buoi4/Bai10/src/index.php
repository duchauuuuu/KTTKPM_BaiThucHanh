<?php
$title = "Hello, Docker PHP!";
$server = $_SERVER['SERVER_NAME'] ?? 'localhost';
$php_version = phpversion();
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= htmlspecialchars($title) ?></title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: #333;
    }
    .card {
      background: white;
      padding: 40px 60px;
      border-radius: 16px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    }
    h1 { font-size: 2.5rem; color: #4facfe; margin-bottom: 12px; }
    p { font-size: 1rem; color: #666; margin-top: 8px; }
    .badge {
      display: inline-block;
      background: #4facfe;
      color: white;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1><?= htmlspecialchars($title) ?></h1>
    <p>Ứng dụng PHP đang chạy trên Apache trong Docker.</p>
    <p>Server: <strong><?= htmlspecialchars($server) ?></strong></p>
    <span class="badge">PHP <?= htmlspecialchars($php_version) ?></span>
  </div>
</body>
</html>
