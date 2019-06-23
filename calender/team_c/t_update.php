<?php
session_start();

// POSTデータ取得
$name =$_POST["name"];
$lpw =$_POST["lpw"];

$lpw = password_hash($lpw, PASSWORD_DEFAULT); //ハッシュ化 毎回暗号が変わる


// DB接続
include "../func_common_c.php";

chkSsid();
$team_id = $_SESSION["id"];
$pdo = db_con();

// データ登録SQL
$sql = "UPDATE team_c_table SET name=:name, lpw=:lpw WHERE id=:id";

$stmt = $pdo->prepare($sql);
$stmt->bindValue(':name', $name, PDO::PARAM_STR);
$stmt->bindValue(':lpw', $lpw, PDO::PARAM_STR);
$stmt->bindValue(':id', $team_id, PDO::PARAM_INT);

$status = $stmt->execute();

var_dump($status);

// データ登録処理後
if ($status == false) {
  sqlError($stmt);
} else {
  // t_select_c.phpへリダイレクト
  redirect("./t_select_c.php?id=${team_id}");
}
?>