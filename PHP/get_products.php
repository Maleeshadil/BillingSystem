<?php
require_once "../includes/db.inc.php";

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    
    $sql = "SELECT productid FROM productsrecords WHERE  productid = ?";
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "SQL statement failed!";
    } else {
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            echo json_encode($row);
        }
        else{
            echo json_encode(null);

        }

    }

}
?>