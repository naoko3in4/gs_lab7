<?php
$id = $_GET["id"];

include "../func_common_c.php";
// DB接続 function_common_c.phpで定義
$pdo = db_con();

// データ登録SQL作成
$stmt = $pdo->prepare("SELECT * FROM user_c_table WHERE id=:id");
$stmt->bindValue(":id", $id, PDO::PARAM_INT);
$status = $stmt->execute();
// 一行取り出す
$row = $stmt->fetch();
// ラジオボタン用配列
$kanriFlagName = ['一般ユーザー', '管理者', 'オーナー'];
$lifeFlagName = ['利用中', '退会済'];

?>

<!-- index_user_c.php(登録フォームの画面ソースコードを上書きする↓)-->
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>calender</title>
  <link rel="stylesheet" href="../common_c.css">
  <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet">
</head>
<body>
  <div id="wrapper">
    <h1>マイ詳細編集</h1>
    <form method="post" action="./update_user_c.php">
      <!-- ユーザー登録 -->
      <fieldset>
        <legend class="user_log_title">マイ情報編集</legend>
          <label>名前:<br>
            <input type="text" name="name" value="<?=$row["name"]?>">
          </label>
          <label>ユーザーID:<br>
            <input type="text" name="lid" value="<?=$row["lid"]?>">
          </label>
          <label class="pw">PW:<br>
            <input type="text" name="lpw" value="<?=$row["lpw"]?>">
          </label>

          <!-- 管理者フラグ・ライフフラグ生成なしのためコメントアウト -->
          <!-- <label class="flag_title">管理者フラグ:<br>
            <?php for ($i = 0; $i < 2; $i++) :?>
              <input
                class="radioBtn"
                type="radio"
                name="kanri_flg"
                value="<?php echo $i; ?>"
                <?php if ($row['kanri_flg'] == $i) {echo 'checked';} ?>
              >
                <?php echo $kanriFlagName[$i]; ?>
            <?php endfor; ?>
          </label>

          <label class="flag_title">ライフフラグ:<br>
            <?php for ($j = 0; $j < 2; $j++) :?>
              <input
                class="radioBtn"
                type="radio"
                name="life_flg"
                value="<?php echo $j; ?>"
                <?php if ($row['life_flg'] == $j) {echo 'checked';}?>
                >
              <?php echo $lifeFlagName[$j]; ?>
            <?php endfor; ?>
          </label> -->

          <input name="id" type="hidden" value="<?=$row["id"]?>">
          <div id="btn-wrapper">
            <input id="submit-btn" type="submit" value="登録する">
          </div>
      </fieldset>
    </form>
  </div>
</body>
</html>