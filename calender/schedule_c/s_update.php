<?php

session_start();

// POSTデータ取得
$id =$_GET["id"]; // GETデータ取得
$year = $_POST["chosen_year"];
$month = $_POST["chosen_month"];
$date = $_POST["chosen_date"];
$start_hour = $_POST["start_hour"];
$title = $_POST["title"];
$url = $_POST["url"];
$memo = $_POST["memo"];
$participant = $_POST["participant"];

// イベント開催日を変数１つで表す
$start_at = strval($year) ."-" .strval($month) ."-" .strval($date) ." " .strval($start_hour) .":00:00";
$datetime = date('Y-m-d H:i:s', strtotime($start_at));

// DB接続
include "../func_common_c.php";

chkSsid();
$team_id = $_SESSION["id"];
$pdo = db_con();

// データ登録SQL
$sql = "UPDATE schedule_table SET team_id='$team_id',  participant=:participant, start_at='$datetime', title=:title, url=:url, memo=:memo WHERE id=:id";

$stmt = $pdo->prepare($sql);
$stmt->bindValue(':participant', $participant, PDO::PARAM_STR);
$stmt->bindValue(':title', $title, PDO::PARAM_STR);
$stmt->bindValue(':url', $url, PDO::PARAM_STR);
$stmt->bindValue(':memo', $memo, PDO::PARAM_STR);
$stmt->bindValue(':id', $id, PDO::PARAM_INT);

$status = $stmt->execute();

// データ登録処理後
if ($status == false) {
  sqlError($stmt);
} else {
  // select_user_c.phpへリダイレクト
  redirect("./s_select.php?id=${team_id}");
}
?>
