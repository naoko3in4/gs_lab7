<?php
session_start();

$id = $_SESSION["id"];

// DB接続
include("../func_common_c.php");
$pdo = db_con();

// データ登録SQL scheduleテーブルとteamテーブルからデータを削除
$stmt = $pdo->prepare("DELETE FROM schedule_table WHERE team_id = :id;DELETE FROM team_c_table WHERE id = :id;");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$stmt = $stmt->execute();

// チームログイン・登録画面に戻る
redirect("./team_index_c.php");
?>