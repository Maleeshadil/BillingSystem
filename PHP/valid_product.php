<?php
// Database Connection
require_once "../includes/db.inc.php";

// Check if productId is set
if (isset($_POST["productId"])) {

    // Get product id from POST data
    $product_id = $_POST['productId'];

    // Get all records from productsrecords
    $sql = "SELECT productid FROM productsrecords";

    $stmt = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo "SQL statement failed!";
    } else {
        
        // Execute the statement
        mysqli_stmt_execute($stmt);

        //Get result
        $result = mysqli_stmt_get_result($stmt);

        //product ID doesn't exist,flag
        $productFound = false; 

        // Loop through all records
        while ($row = mysqli_fetch_assoc($result)) {

            if ($row['productid'] == $product_id) {

                // Product found, set flag to true
                $productFound = true;

                // Exit loop once product is found
                break; 
            }
        }

        // If product was not found
        if (!$productFound) {

            //Display error message
            echo "Not a valid product";
        }
    }
}
