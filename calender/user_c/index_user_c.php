<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Calender/ユーザー</title>
  <link rel="stylesheet" href="../common_c.css">
  <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c&display=swap" rel="stylesheet">
</head>
<body>
  <div id="wrapper">
    <h1>ログイン・新規登録</h1>
    <!-- ログイン -->
    <form method="post" action="login_act_c.php">
      <fieldset>
        <legend class="user_log_title">ログイン</legend>
          <label>ID:<br>
            <input type="text" name="lid">
          </label>
          <label class="pw">PW:<br>
            <input type="text" name="lpw">
          </label>
          <div id="btn-wrapper">
            <input id="submit-btn" type="submit" value="ログイン">
          </div>
      </fieldset>
    </form>

    <form method="post" action="insert_user_c.php">
      <!-- ユーザー登録 -->
      <fieldset>
        <legend class="user_log_title">ユーザー登録</legend>
          <label>名前:<br>
            <input type="text" name="name">
          </label>
          <label>ユーザーID（メールアドレス）:<br>
            <input type="text" name="lid">
          </label>
          <label>パスワード:<br>
            <input type="text" name="lpw">
          </label>
          <label class="flag_title">管理者フラグ:<br>
            <input class="radioBtn" type="radio" name="kanri_flg" value="0" checked>一般ユーザー
          </label>
          <label class="flag_title">ライフフラグ:<br>
            <input class="radioBtn" type="radio" name="life_flg" value="0" checked>利用する
          </label>
          <div id="btn-wrapper">
            <input id="submit-btn" type="submit" value="登録する">
          </div>
      </fieldset>
    </form>
  </div>
</body>
</html>