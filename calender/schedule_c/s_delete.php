<?php
echo "s_delete だよ";

session_start();

$id = $_GET["id"];
var_dump($id);

$team_id = $_SESSION["id"];
var_dump($team_id);

// exit();
include "../func_common_c.php";
$pdo = db_con();

// データ登録SQL
$stmt = $pdo->prepare("DELETE FROM schedule_table WHERE id=:id");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$status = $stmt->execute();

// 自分が所属するチームのスケジュール一覧に戻る
redirect("./s_select.php?id=$team_id");
?>