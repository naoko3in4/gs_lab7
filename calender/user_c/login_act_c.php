<?php
session_start();

// DB接続
include("../func_common_c.php");
$pdo = db_con();

// データ登録SQL作成
$lid = $_POST["lid"];
$lpw = $_POST["lpw"];
//データ登録SQL作成 パスワード暗号化してたら確認項目少ない👇
// $sql = "SELECT * FROM user_c_table WHERE lid=:lid AND lpw=:lpw AND life_flg=0";
$sql = "SELECT * FROM user_c_table WHERE lid=:lid AND life_flg=0";
$stmt = $pdo->prepare($sql);
// $stmt->bindValue(':lid', $lid, PDO::PARAM_STR);や
// $stmt->bindValue(':lpw', $lpw, PDO::PARAM_STR);をしなくてよい
$stmt->bindValue(':lid', $lid);
$status = $stmt->execute();

// SQL実行時にエラーがある場合STOP
if($status == false) {
  sqlError($stmt);
}

// 抽出データ数を取得
// 1レコード取得
$val = $stmt->fetch();

// u_t_insert.php用にユーザー登録時のidを変数へ代入する
$user_id = $val['id'];

// 該当レコードがあればSESSIONに値を代入
// if($val["id"] != "" && $val["life_flg"] == "0") {
if(password_verify($lpw, $val["lpw"])){
  // Login 成功時
  $_SESSION["chk_ssid"] = session_id();
  $_SESSION["kanri_flg"] = $val['kanri_flg'];
  $_SESSION["name"] = $val['name'];
  $_SESSION["id"] = $val['id'];

  //redirect先を決める
  redirect("./select_user_c.php");
  // 管理者ならばユーザー一覧表に飛ぶ
  // if($val["kanri_flg"]=="1" or $val["kanri_flg"]=="2") {
  //   redirect("./select_user_c.php");
  // }
} else {
  // Login失敗時（Logout経由）
  redirect("logout.php");
}
exit();
?>