<?php
include "../func_common_c.php";

// POSTデータ取得
$name = h($_POST["name"]);
$lid = h($_POST["lid"]);
$lpw = h($_POST["lpw"]);
$kanri_flg = h($_POST["kanri_flg"]);
$life_flg = h($_POST["life_flg"]);
$lpw = password_hash($lpw, PASSWORD_DEFAULT); //ハッシュ化 毎回暗号が変わる

// DB接続 function_common_c.phpで定義
$pdo = db_con();

// データ登録SQL作成
$sql = "INSERT INTO user_c_table(name, lid, lpw, kanri_flg, life_flg, date)VALUES(:name, :lid, :lpw, :kanri_flg, :life_flg, sysdate())";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':name', $name, PDO::PARAM_STR);
$stmt->bindValue(':lid', $lid, PDO::PARAM_STR);
$stmt->bindValue(':lpw', $lpw, PDO::PARAM_STR);
$stmt->bindValue(':kanri_flg', $kanri_flg, PDO::PARAM_INT);
$stmt->bindValue(':life_flg', $life_flg, PDO::PARAM_INT);
$status = $stmt->execute();

// データ処理後
if($status == false) {
  // SQL実行時にエラーがある場合（エラーオブジェクトを取得して表示）
  sqlError($stmt);
} else {
  // index_user_c.php へリダイレクト
  redirect("index_user_c.php");
}
?>