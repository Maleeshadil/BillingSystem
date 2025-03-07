<?php
//Database Connection
require_once "../includes/db.inc.php";

if (isset($_POST["UserName"])) {

    $userName = $_POST["UserName"];
    $password = $_POST["Pass"];

    $sql = "SELECT * FROM cashier_details WHERE userName=?";

    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {

        // header("location: ../index.php?err=failedstmt");
        echo json_encode(["status" => "error", "message" => "Failed to prepare statement"]);
    } else {
        mysqli_stmt_bind_param($stmt, "s", $userName);

        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);

        if ($row = mysqli_fetch_assoc($result)) {

            $dbpass = $row["password"];

            $isPassOk = password_verify($password, $dbpass);

            if ($isPassOk) {               

                //session start
                session_start();

                $_SESSION["User_name"] = $row["userName"];
                $_SESSION["User_passowrd"] = $row["password"];

               
                echo json_encode(["status" => "success", "message" => "Login successful"]);


            } else {
                // header("location: ../index.php?err=loginfailedpass");
                echo json_encode(["status" => "error", "message" => "Invalid password"]);
                exit();
            }
        } else {
            // header("location: ../index.php?err=loginfailuserName");
            echo json_encode(["status" => "error", "message" => "Invalid user name"]);
            exit();
        }
    }

}
