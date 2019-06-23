<?php
session_start();

// sessionの初期化(空にする)
$_SESSION = array();

// Cookieに保存してあるSessionIDの保存期間を過去にして破棄
// session_name()・・セッションIDを返す関数
if(isset($_COOKIE[session_name()])) {
  setcookie(session_name(), '', time()-42000, '/');
}

// サーバー側でのセッションIDの破棄
session_destroy();

// 処理後、index_user_c.phpへリダイレクト
header("Location: index_user_c.php");
exit();
?>