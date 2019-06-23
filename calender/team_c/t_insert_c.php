<?php
session_start();
include "../func_common_c.php";

// POSTデータ取得
$team_name = h($_POST["name"]);
$team_lpw = h($_POST["lpw"]);
$team_lpw = password_hash($team_lpw, PASSWORD_DEFAULT); //ハッシュ化 毎回暗号が変わる

// DB接続 function_common_c.phpで定義
$pdo = db_con();

// データ登録SQL作成
$sql = "INSERT INTO team_c_table(name, lpw, date)VALUES(:name, :lpw, sysdate())";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':name', $team_name, PDO::PARAM_STR);
$stmt->bindValue(':lpw', $team_lpw, PDO::PARAM_STR);
$status = $stmt->execute();

// データ処理後
if($status == false) {
  // SQL実行時にエラーがある場合（エラーオブジェクトを取得して表示）
  sqlError($stmt);
} else {
  redirect("./team_index_c.php");
}
?>