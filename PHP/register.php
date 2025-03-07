<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Billing-System -SignUp</title>
    <!-- Css Links-->
    <link rel="stylesheet" href="../css/bootstrap.css" />
    <link rel="stylesheet" href="../signup_style.css" />
    <link rel="stylesheet" href="../FontAwesome/css/all.min.css" />
    <link rel="stylesheet" href="../FontAwesome/css/fontawesome.min.css" />
    <!--Jquery Link-->
    <script src="../jquery-3.7.1.min.js"></script>
</head>

<body>

    <div class="form">      
        <form action="" method="post" class="signup" style="display:none;">

            <h2 class="fw-bold">SignUp</h2>

            <input type="text" name="fullName" id="fullName" placeholder="Enter Your Full name.. " />
            <div id="fullNameError" class="error-message"></div>

            <input type="text" name="email" id="email" placeholder="Enter Your email.. " />
            <div id="EmailError" class="error-message"></div>

            <input type="text" name="username" id="username" placeholder="Enter Your user name.. " />
            <div id="userNameError" class="error-message"></div>

            <input type="password" data-ms-member="password" name="pass" id="pass" placeholder="Enter Your Password.." />

            <!-- Password validation rules list -->
            <div class="validation-container">
                <div class="validation-point" ms-code-pw-validation="minlength-8">
                    <i class="fa-solid fa-circle-check valid" ms-code-pw-validation-icon="true"></i>
                    <i class="fa-solid fa-circle-check invalid" ms-code-pw-validation-icon="false"></i>
                    Password must be over 8 characters
                </div>
                <div class="validation-point" ms-code-pw-validation="number">
                    <i class="fa-solid fa-circle-check valid" ms-code-pw-validation-icon="true"></i>
                    <i class="fa-solid fa-circle-check invalid" ms-code-pw-validation-icon="false"></i>
                    Password must contain 1 number
                </div>
                <div class="validation-point" ms-code-pw-validation="special-character">
                    <i class="fa-solid fa-circle-check valid" ms-code-pw-validation-icon="true"></i>
                    <i class="fa-solid fa-circle-check invalid" ms-code-pw-validation-icon="false"></i>
                    Password must contain 1 special character
                </div>
                <div class="validation-point" ms-code-pw-validation="upper-lower-case">
                    <i class="fa-solid fa-circle-check valid" ms-code-pw-validation-icon="true"></i>
                    <i class="fa-solid fa-circle-check invalid" ms-code-pw-validation-icon="false"></i>
                    Password must contain 1 uppercase and 1 lowercase letter
                </div>
            </div>
            <div id="passError" class="error-message"></div>

            <input  type="password" name="cPass" id="cPass" placeholder="Enter Confirm Password.." />
            <div id="cpError" class="error-message"></div>

            <button ms-code-submit-button type="submit" name="signupBtn" id="btnsignup" class="disabled">Signup</button>

            <p class="signup-text">
                Already a member? <a href="../index.php" class="signup-link">Loign</a>.
            </p>
        </form>
    </div>
    <!--Js Links -->
    <script src="../js/bootstrap.js"></script>
    <script src="../script2.js"></script>
</body>

</html>