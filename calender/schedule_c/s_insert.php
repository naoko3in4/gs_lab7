<?php
session_start();

// DB検索
include "../func_common_c.php";

chkSsid();
// 共有スケジュールへのリンクで👇使用
$team_id = $_SESSION["id"];

// POSTデータ取得
$year = h($_POST["chosen_year"]);
$month = h($_POST["chosen_month"]);
$date = h($_POST["chosen_date"]);
$start_hour = h($_POST["start_hour"]);

$title = h($_POST["title"]);
$url = h($_POST["url"]);
$memo = h($_POST["memo"]);
$participant = h($_POST["participant"]);

// イベント開催日を変数１つで表す
$start_at = strval($year) ."-" .strval($month) ."-" .strval($date) ." " .strval($start_hour) .":00:00";
$datetime = date('Y-m-d H:i:s', strtotime($start_at));

// DB接続 function_common_c.phpで定義
$pdo = db_con();

// データ登録SQL作成
$sql = "INSERT INTO schedule_table(team_id, participant, start_at, title, url, memo, date)VALUES('$team_id', :participant, '$datetime', :title, :url, :memo, sysdate())";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':participant', $participant, PDO::PARAM_STR);
$stmt->bindValue(':title', $title, PDO::PARAM_STR);
$stmt->bindValue(':url', $url, PDO::PARAM_STR);
$stmt->bindValue(':memo', $memo, PDO::PARAM_STR);

$status = $stmt->execute();

// データ処理後
if($status == false) {
  // SQL実行時にエラーがある場合（エラーオブジェクトを取得して表示）
  sqlError($stmt);
} else {
  if(!$team_id) {
    redirect("../team_c/team_index_c.php");
  }
  redirect("s_select.php?id=$team_id");
}
?>