<?php
session_start();

$id = $_SESSION["id"];

// DB接続
include("../func_common_c.php");
$pdo = db_con();

// データ登録SQL
$stmt = $pdo->prepare("DELETE FROM user_c_table WHERE id = :id");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$stmt = $stmt->execute();

redirect("select_user_c.php");
?>