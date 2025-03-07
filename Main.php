<?php
//session start
session_start();
//IF not logged in
if (!isset($_SESSION["User_name"])) {
  header("location: ./index.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Billing System</title>
  <!-- Css Links-->
  <link rel="stylesheet" href="css/bootstrap.css" />
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="FontAwesome/css/all.min.css" />
  <link rel="stylesheet" href="FontAwesome/css/fontawesome.min.css" />

  <!--Jquery Link-->
  <script src="jquery-3.7.1.min.js"></script>
</head>

<body>
  <!-- Main Section-->
  <div id="main-content">
    <div class="col-12">
      <h1 class="p-2 fw-bold" style="background-color: #ffc107; color: #2f2f2f;">Billing System</h1>
    </div>
    <div class="casherMemName">
      <p class="pColor">Casher Name: <span class="fw-bold ">
          <?php if (isset($_SESSION["User_name"])) {
            echo $_SESSION["User_name"];
          } ?></span></p>
    </div>
    <div class="dateTime">
      <p class="pColor" style="color: #333333;">Time: <span class="fw-bold time"></span></p>
    </div>
    <div class="logOutbtn row">
      <div class="col-12">
        <a class="btn fw-bold " href="./PHP/logout.php" role="button"
          style="background-color: #2E4156; color: white;">Logout</a>
      </div>
      <!-- <button type="button" class="btn btn-info fw-bold loginbtn ">Login</button> -->

    </div>
    <div class="container">
      <form class="mt-5">
        <div class="row">
          <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div>
              <label for="ItemCode" class="col-form-label fw-bold">Product ID</label>
              <input type="text" class="form-control" id="ItemCode" placeholder="Enter Proudct ID" />
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <div>
              <label for="TotalItems" class="col-form-label fw-bold">Quantity</label>
              <input type="text" class="form-control" id="TotalItems" placeholder="Enter Item Quantity" />
            </div>
          </div>
        </div>
      </form>
    </div>
    <hr />
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="table-responsive col-12">
          <table class="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#No Of Items</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody class="table-group-divider" id="tbody"></tbody>
            <tfoot id="tfoot">
              <tr>
                <td colspan="4"><b>Net Amount:</b></td>
                <td colspan="2">
                  <b><span class="PayTotal"></span></b>
                </td>
              </tr>
              <tr>
                <td colspan="4"><b>Cash:</b></td>
                <td colspan="2">
                  <b><span class="Cash"></span></b>
                </td>
              </tr>
              <tr>
                <td colspan="4"><b>Balance Amount:</b></td>
                <td colspan="2">
                  <b><span class="balAmount"></span></b>
                </td>
              </tr>
            </tfoot>
          </table>
          <!-- <template>
              <tr>
                <td class="Noi"></td>
                <td class="ProductName"></td>
                <td class="Price"></td>
                <td class="Quantity"></td>
                <td class="Total"></td>
                <td>
                  <button class="btn btn-danger del">X</button>
                  <button class="btn btn-warning edit">Edit</button>
                </td>
              </tr>
            </template> -->
        </div>
      </div>
    </div>
    <div class="container row">
      <div class="col-12">
        <button class="btn printBtn" type="button">Print</button>
        <button class="btn  clearBtn" type="button">Clear</button>
      </div>
    </div>
  </div>
  <!-- Vertically Centered Modal -->
  <!-- <div class="modal fade" id="sampleModal" tabindex="-1" aria-labelledby="sampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content  rounded-3 border border-3" style="background-color: #F3BD41; border-color:#F8F9FA ;">
        <div class="modal-header">
          <h5 class="modal-title" id="sampleModalLabel">
            
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-x-circle"
              viewBox="0 0 16 16">
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.646 4.646a.5.5 0 0 0-.708.708L7.293 8 3.938 11.354a.5.5 0 1 0 .707.707L8 8.707l3.354 3.354a.5.5 0 0 0 .707-.707L8.707 8l3.354-3.354a.5.5 0 0 0-.707-.707L8 7.293 4.646 4.646z" />
            </svg>
            Error!
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-12 text-center fs-4 fw-semibold">
                <p>Are You Sure?</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer fs">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" class="btn btn-danger" id="modal-ok-button">
            OK
          </button>
        </div>
      </div>
    </div>
  </div> -->
  <!-- Vertically Centered Modal with Error Styling -->
  <div class="modal fade" id="sampleModal" tabindex="-1" aria-labelledby="sampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content text-center rounded-3 border border-3"
        style="background-color: #F8F9FA; border-color: #FFCDD2;">
        <div class="modal-header justify-content-center border-0">
          <!-- Error Icon -->
          <i class="fas fa-times-circle text-danger" style="font-size: 4rem;"></i>
        </div>
        <div class="modal-body">
          <h5 class="modal-title fw-bold text-danger" id="sampleModalLabel">Error!</h5>
          <p class="fs-5">Oops! Something went wrong!</p>
        </div>
        <div class="modal-footer justify-content-center border-0">
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="modal-ok-button">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Product Modal -->
  <div class="modal fade" id="editProductModal" tabindex="-1" aria-labelledby="editProductModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content  border-3"
        style="background-color: #E3F2FD; border-radius: 10px; border-color: #42A5F5;">
        <div class="modal-header">
          <h5 class="modal-title fw-bold" id="editProductModalLabel">Edit Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="editProductForm" class="mb-4">
            <input type="hidden" id="editId" name="id">
            <div class="form-group">
              <label for="editProductID" class="fw-bold lbOne">ItemCode:</label>
              <input type="text" class="form-control" id="editProductID" name="editProductID"
                placeholder="Enter Proudct ID" style="border-color:#32373E">
            </div>
            <div class="form-group qty">
              <label for="editQunatity" class="fw-bold">Quantity:</label>
              <input type="text" class="form-control" id="editQunatity" name="editQunatity"
                placeholder="Enter Item Quantity" style="border-color:#32373E">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Product Modal -->
  <div class="modal fade" id="ProductModal" tabindex="-1" aria-labelledby="ProductModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-right" style="margin-Right: 0;">
      <div class="modal-content  border-3"
        style="background-color: #E3F2FD; border-radius: 10px; border-color: #42A5F5;">
        <div class="modal-header">
          <h5 class="modal-title fw-bold " id="ProductModalLabel">Products Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid mt-4">
            <div class="row">
              <div class="table-responsive col-12">
                <table class="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#No Of Items</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider" id="tproductbody"></tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Invoice Section
  <div id="invoice">
    <div class="container">
      <hr class="dashed-line" />
      <h2 class="text-center fs-4 fw-bolder">Iceberg</h2>
      <p id="todayDate" class="text-center textStyle"></p>
      <p class="text-center textStyle">No130/4/5, Main street, Kegalle</p>
      <hr class="dashed-line" />
    </div>
    <div class="container-fluid">
      <table class="table table-borderless table-sm">
        <thead>
          <tr class="textStyle">
            <th>#No</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody id="invoiceBody" class="text-uppercase textStyle"></tbody>
        <tfoot>
          <tr>
            <td colspan="4"><b>Net Amount:</b></td>
            <td>
              <b><span class="invoicePayTotal"></span></b>
            </td>
          </tr>
          <tr>
            <td colspan="4"><b>Cash:</b></td>
            <td>
              <b><span class="invoiceCash"></span></b>
            </td>
          </tr>
          <tr>
            <td colspan="4"><b>Balance Amount:</b></td>
            <td>
              <b><span class="invoiceBalance"></span></b>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="container">
      <hr class="dashed-line" />
      <h2 class="text-center fs-4 fw-bolder textStyle">Thank You!</h2>
      <p class="text-center textStyle">Come Again.....</p>
      <p class="text-center textStyle">Tel:0701747070</p>
      <p class="text-center textStyle">Open:09:00AM to 07:00PM</p>
      <hr class="dashed-line" />
    </div>
  </div> -->
  <!-- Invoice Section -->
  <div id="invoice" class="receipt-container">
    <div class="container">
      <hr class="dashed-line" />
      <h2 class="text-center fs-4 fw-bolder store-name">LOREM IPSUM</h2>
      <p id="todayDate" class="text-center textStyle"></p>
      <p class="text-center textStyle">No130/4/5, Main street, Kegalle</p>
      <hr class="dashed-line" />
    </div>

    <div class="container-fluid">
      <table class="table table-borderless table-sm">
        <thead>
          <tr class="textStyle">
            <th>#No</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody id="invoiceBody" class="text-uppercase textStyle"></tbody>
        <tfoot>
          <tr>
            <td colspan="4"><b>Net Amount:</b></td>
            <td><b><span class="invoicePayTotal"></span></b></td>
          </tr>
          <tr>
            <td colspan="4"><b>Cash:</b></td>
            <td><b><span class="invoiceCash"></span></b></td>
          </tr>
          <tr>
            <td colspan="4"><b>Balance Amount:</b></td>
            <td><b><span class="invoiceBalance"></span></b></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="container">
      <hr class="dashed-line" />
      <h2 class="text-center fs-4 fw-bolder textStyle">Thank You!</h2>
      <p class="text-center textStyle">Come Again.....</p>
      <p class="text-center textStyle">Tel:0701747070</p>
      <p class="text-center textStyle">Open:09:00AM to 07:00PM</p>
      <hr class="dashed-line" />
    </div>
  </div>

  <!--Js Links -->
  <script src="js/bootstrap.js"></script>
  <script src="script2.js"></script>
</body>

</html>