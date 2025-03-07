<?php
session_start();
if (isset($_SESSION["User_name"])) {
  header("location: ../Main.php");
}
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Billing-System -Loign</title>
  <!-- Css Links-->
  <link rel="stylesheet" href="css/bootstrap.css" />
  <link rel="stylesheet" href="loign_style.css" />
  <link rel="stylesheet" href="FontAwesome/css/all.min.css" />
  <link rel="stylesheet" href="FontAwesome/css/fontawesome.min.css" />
  <!--Jquery Link-->
  <script src="jquery-3.7.1.min.js"></script>
</head>
<body>
  <div class="form">
    <form action="" method="post" class="login" style="display:none;">
      <h2 class="fw-bold">Login</h2>
      <input type="text" name="userName" id="userName" placeholder="Enter Your User Name.. " />      
      <div id="userNameError" class="error-message"></div>

      <input type="password" name="pass" id="pass" placeholder="Enter Your Password" />
      <div id="passError" class="error-message"></div>
      
      <button type="submit" name="loginBtn" id="btnLoign">Login</button>
      <p class="signup-text">
        Not a member? <a href="./PHP/register.php" class="signup-link">Signup</a>.
      </p>
    </form>
  </div>
  <!--Js Links -->
  <script src="js/bootstrap.js"></script>
 <script src="script2.js"></script>
</body>
</html>