<?php

session_start();

// POSTデータ取得
$id =$_POST["id"];
$name =$_POST["name"];
$lid =$_POST["lid"];
$lpw =$_POST["lpw"];
$kanri_flg =$_POST["kanri_flg"];
$life_flg =$_POST["life_flg"];

$lpw = password_hash($lpw, PASSWORD_DEFAULT); //ハッシュ化 毎回暗号が変わる

// DB接続
include "../func_common_c.php";

chkSsid();
$user_id = $_SESSION["id"];
$pdo = db_con();

// データ登録SQL
$sql = "UPDATE user_c_table SET name=:name, lid=:lid, lpw=:lpw, kanri_flg=:kanri_flg, life_flg=:life_flg WHERE id=:id";

var_dump($sql);
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':name', $name, PDO::PARAM_STR);
$stmt->bindValue(':lid', $lid, PDO::PARAM_STR);
$stmt->bindValue(':lpw', $lpw, PDO::PARAM_STR);
$stmt->bindValue(':kanri_flg', $kanri_flg, PDO::PARAM_INT);
$stmt->bindValue(':life_flg', $life_flg, PDO::PARAM_INT);
$stmt->bindValue(':id', $id, PDO::PARAM_INT);
var_dump($stmt);
$status = $stmt->execute();

// データ登録処理後
if ($status == false) {
  sqlError($stmt);
} else {
  // select_user_c.phpへリダイレクト
  redirect("./select_user_c.php?id=${user_id}");
}
?>
