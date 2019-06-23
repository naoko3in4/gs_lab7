<?php
session_start();

// DB接続
include("../func_common_c.php");
$pdo = db_con();

// データ登録SQL作成
$team_name = $_POST["name"];
$team_lpw = $_POST["lpw"];
//データ登録SQL作成 パスワード暗号化してたら確認項目少ない👇
// $sql = "SELECT * FROM team_c_table WHERE name=:name AND lpw=:lpw";
$sql = "SELECT * FROM team_c_table WHERE name=:name";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':name', $team_name, PDO::PARAM_STR);
// $stmt->bindValue(':lpw', $team_lpw, PDO::PARAM_STR);しなくてよい


$status = $stmt->execute();

// SQL実行時にエラーがある場合STOP
if($status == false) {
  sqlError($stmt);
}

// 抽出データ数を取得
// 1レコード取得
$val = $stmt->fetch();

// 該当レコードがあればSESSIONに値を代入
// if($val["id"] != "") {
if(password_verify($team_lpw, $val["lpw"])){

  // Login 成功時

  $_SESSION["chk_ssid"] = session_id();
  $_SESSION["name"] = $val['name'];
  $_SESSION["lpw"] = $val['lpw'];
  $_SESSION["id"] = $val['id'];

  $team_id = $_SESSION["id"];

  //redirect先を決める
  // チームマイページに飛ぶ
  redirect("./t_select_c.php?id=${team_id}");
} else {
  // Login失敗時（Logout経由）
  redirect("./team_index_c.php");
}
exit();
?>