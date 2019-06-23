<?php
session_start();

$id = $_GET["id"];
var_dump($id);

include "../func_common_c.php";
$pdo = db_con();

// データ登録SQL
$stmt = $pdo->prepare("DELETE FROM user_c_table WHERE id=:id");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$status = $stmt->execute();

redirect("./logout_c.php");
?>