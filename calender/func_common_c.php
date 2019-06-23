<?php
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();
$name = getenv('DB_NAME');
$charset = getenv('DB_CHARSET');
$host = getenv('DB_HOST');
$user = getenv('DB_USER');
$pass = getenv('DB_PASS');

//共通で使う関数

// XSS
function h($str){
  return htmlspecialchars($str, ENT_QUOTES);
}

// DB接続
function db_con() {
  try {
    $pdo = new PDO($name, $charset, $host, $user, $pass);
    return $pdo;
  } catch(PDFException $e) {
    exit('DBConnectError:'.$e->getMessage());
  }
}

// SQLエラー
function sqlError($stmt) {
  $error = $stmt->errorInfo();
  exit("SQLError:".$error[2]);
}

// リダイレクト
function redirect($page) {
  header("Location: ".$page);
  exit;
}

// session id の regenerate
function chkSsid() {
  if (
    !isset($_SESSION["chk_ssid"]) ||
    $_SESSION["chk_ssid"] != session_id()
  ) {
    exit("LoginError!");
  } else {
    session_regenerate_id(true);
    $_SESSION["chk_ssid"] = session_id();
  }
}

?>