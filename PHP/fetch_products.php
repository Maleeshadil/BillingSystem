<?php
require_once "../includes/db.inc.php";

if (isset($_POST['productid'])) {
  $product_id = $_POST['productid'];
  $quantity = $_POST['quantity'];

  $sql = "SELECT * FROM productsrecords WHERE productid = ?";

  $stmt = mysqli_stmt_init($conn);

  if (!mysqli_stmt_prepare($stmt, $sql)) {

    echo "SQL statement failed!";
  } else {
    mysqli_stmt_bind_param($stmt, "i", $product_id);

    mysqli_stmt_execute($stmt);

    $result = mysqli_stmt_get_result($stmt);

    $rowCount=mysqli_num_rows($result);
   

    if ( $rowCount> 1) {

      // Initialize item count 
      $itemCount = 1; 

      while ($row = mysqli_fetch_assoc($result)) {

        $price = (float) $row['price'];
        $totalPrice = round($quantity * $price, 2); // round the result to 2 decimal places


        echo '<tr data-id="' . $row['productid'] . '">
            <td>'. $itemCount .'</td>
            <td>' . $row['itemName'] . '</td>
            <td>Rs: ' . $row['price'] . '</td>           
          </tr>';

       $itemCount++;  
       

      }    

      exit();
     
    } else {
      while ($row = mysqli_fetch_assoc($result)) {

        $price = (float) $row['price'];
        $totalPrice = round($quantity * $price, 2); // round the result to 2 decimal places


        echo '<tr data-id="' . $row['productid'] . '">
            <td>{{itemCount}}</td>
            <td>' . $row['itemName'] . '</td>
            <td>Rs: ' . $row['price'] . '</td>
            <td>' . $quantity . '</td>
            <td>' . number_format($totalPrice, 2, '.', '') . '</td>
            <td>
              <button type="button"  id="delete-btn" class="btn btn-danger " data-id="' . $row['productid'] . '">X</button>
              <button type="button" id="edit-btn" class="btn btn-warning " data-id="' . $row['productid'] . '">Edit</button>
            </td>
          </tr>';

      }
    }

  }

}
