$(document).ready(() => {
  //page load focus on product id input field
  $("#ItemCode").focus();

  //index page(login) load effect
  $(".login").fadeIn(3000);

  //signup  page load effect
  $(".signup").fadeIn(3000);

  //Login form
  $(".login").on("submit", function (event) {
    event.preventDefault();

    //Get userNmae from input
    var userName = $("#userName").val();
    console.log(userName);

    //Get password from input
    var pass = $("#pass").val();

    //Clear pervious error message
    $(".error-message").hide();

    let isValid = true;

    if (userName == "") {
      //Display error message if the empty input field
      $("#userNameError").text("Required field").show();
      //Focus on the input field
      $("#userName").focus();
      isValid = false;
    }

    if (pass == "") {
      //Display error message  if the empty input field
      $("#passError").text("Required field").show();
      //Focus on the input field
      $("#pass").focus();
      isValid = false;
    }

    //if all fields are valid, login
    if (isValid) {
      $.ajax({
        url: "./PHP/login.php",
        method: "POST",
        data: { UserName: userName, Pass: pass },
        success: function (response) {
          console.log("Raw response:", response);
          let res = JSON.parse(response);

          if (res.status === "success") {
            // Redirect to the Main.php page after successful login
            window.location.href = "Main.php";
          } else if (res.message == "Invalid user name") {
            //Display error message if invalid user name
            $("#userNameError").text("Incorrect username.").show();
            //Fouce on the input field
            $("#userName").focus();
          } else if (res.message == "Invalid password") {
            //Display error message if invalid user name
            $("#passError").text("Incorrect password.").show();
            //Fouce on the input field
            $("#pass").focus();
          }
        },
        error: function (xhr, status, error) {
          console.log("AJAX error:", status, error);
        },
      });
    }
  });

  // Hide error message when user types in input fields
  $("#userName").on("input", function () {
    //Hide the error message
    $("#userNameError").hide();
  });

  $("#pass").on("input", function () {
    //Hide the error message
    $("#passError").hide();
  });

  //SignUP form
  $(".signup").on("submit", function (event) {
    //prevenet default action in the form submission
    event.preventDefault();

    // Serialize form data
    let formData = $(this).serialize();

    // Log the serialized data to the console
    console.log("Serialized form data:", formData);

    let isValid = true;

    let userName = $("#username").val();
    let fullName = $("#fullName").val();
    let email = $("#email").val();
    let password = $("#pass").val();
    let confirmPassword = $("#cPass").val();

    //Clear pervious error message
    $(".error-message").hide();

    if (
      fullName == "" &&
      email == "" &&
      userName == "" &&
      password == "" &&
      confirmPassword == ""
    ) {
      $(".error-message").text("Required field").show();
      isValid = false;
      $("input[type='text'], input[type='password']")
        .css("border-color", "")
        .addClass("error");
    } else {
      if (fullName == "") {
        $("#fullNameError").text("The First Name field is required.").show();
        isValid = false;
        borderAndFocus("fullName");
        hideErrorMessage("fullName", "fullNameError");
      }

      if (email == "") {
        $("#EmailError").text("The email field is required.").show();
        isValid = false;
        borderAndFocus("email");
        hideErrorMessage("email", "EmailError");
      } else if (!isValidEmail(email)) {
        $("#EmailError").text("Please enter a valid email address.").show();
        isValid = false;
        $("#email").css("border-color", "").addClass("error");
        borderAndFocus("email");
        hideErrorMessage("email", "EmailError");
      }

      if (userName == "") {
        $("#userNameError").text("The User Name field is required.").show();
        isValid = false;
        borderAndFocus("username");
        hideErrorMessage("username", "userNameError");
      }

      if (password == "") {
        $("#passError").text("The Password field is required.").show();
        isValid = false;
        borderAndFocus("pass");
        hideErrorMessage("pass", "passError");
      }

      if (password != confirmPassword) {
        $("#cpError")
          .text("Passowrd and confirmation password do not match.")
          .show();
        isValid = false;
        borderAndFocus("cPass");
        hideErrorMessage("cPass", "cpError");
      }
    }

    if (isValid) {
      $.ajax({
        url: "./member_register.php",
        method: "POST",
        data: formData,
        success: function (response) {
          //console.log("Raw response:", response);
          let res = JSON.parse(response);
          if (res.message === "User registered successfully") {
            console.log(res.message);
            //Dispaly Warring message
            $("#sampleModalLabel").text("Succes!");
            sampleModelChange("User registered successfully");
            clearSignupInputFields();
          } else if (res.message === "Username and email already exist") {
            errorMessages("Username already exists", "Email already exists");
            borderAndFocus("username");
            borderAndFocus("email");
          } else if (res.message === "Username already exists") {
            $("#userNameError").text("Username already exists.").show();
            borderAndFocus("username");
            hideErrorMessage("username", "userNameError");
          } else if (res.message === "Email already exists") {
            $("#EmailError").text("Email already exists.").show();
            $("#email").css("border-color", "").addClass("error");
            borderAndFocus("email");
            hideErrorMessage("email", "EmailError");
          }
        },
        error: function (xhr, status, error) {
          console.log("AJAX error:", status, error);
        },
      });
    }
  });

  const passwordInput = $('input[data-ms-member="password"]');

  const submitButton = $("[ms-code-submit-button]");

  // Password validation logic
  function checkAllValid() {
    // Select all elements with the attribute ms-code-pw-validation
    const validationPoints = $("[ms-code-pw-validation]");
    return validationPoints.toArray().every(function (validationPoint) {
      // Find the valid icon within each validation point
      const validIcon = $(validationPoint).find(
        '[ms-code-pw-validation-icon="true"]'
      );

      // Return true if the valid icon is present and its display is set to "flex"
      return validIcon.length && validIcon.css("display") === "flex";
    });
  }

  // Event listener for keyup event on password input field
  passwordInput.on("keyup", function () {
    // Show the validation rules container when typing in the password field
    $(".validation-container").css("display", "block"); // Show validation rules

    // Get the current value of the password input field
    const password = $(this).val();
    // Select all validation points
    const validationPoints = $("[ms-code-pw-validation]");

    // Iterate over each validation point
    validationPoints.each(function () {
      // Current validation point element
      const validationPoint = $(this);

      // Get the validation rule attribute
      const rule = validationPoint.attr("ms-code-pw-validation");

      let isValid = false;

      // Check if the rule is a minimum length requirement
      if (rule.startsWith("minlength-")) {
        const minLength = parseInt(rule.split("-")[1]);
        isValid = password.length >= minLength;

        // Check if the rule requires a special character
      } else if (rule === "special-character") {
        isValid = /[!@#$%^&*(),.?":{}|<>]/g.test(password);

        // Check if the rule requires both uppercase and lowercase letters
      } else if (rule === "upper-lower-case") {
        isValid = /[a-z]/.test(password) && /[A-Z]/.test(password);

        // Check if the rule requires at least one number
      } else if (rule === "number") {
        isValid = /\d/.test(password);
      }

      // Find the valid and invalid icons within the current validation point
      const validIcon = validationPoint.find(
        '[ms-code-pw-validation-icon="true"]'
      );
      const invalidIcon = validationPoint.find(
        '[ms-code-pw-validation-icon="false"]'
      );

      // Toggle display of valid/invalid icons
      if (validIcon.length && invalidIcon.length) {
        if (isValid) {
          validIcon.css("display", "flex");
          invalidIcon.css("display", "none");
        } else {
          validIcon.css("display", "none");
          invalidIcon.css("display", "flex");
        }
      }
    });

    // Enable submit button if all password rules are met
    if (checkAllValid()) {
      $("#btnsignup").removeClass("disabled");
      $(".validation-container").css("display", "none");
    } else {
      $("#btnsignup").addClass("disabled");
    }
  });

  // if UserName and email exists
  function errorMessages(stringOne, stringTwo) {
    let errorsM = {
      errorMsgOne: stringOne,
      errorMsgTwo: stringTwo,
    };
    $("#userNameError").text(errorsM.errorMsgOne).show();
    $("#EmailError").text(errorsM.errorMsgTwo).show();
  }

  //Check if  valid email
  function isValidEmail(email) {
    const emailPattern = /[a-zA-Z\d._-]+@[a-zA-Z\d_-]+\.[a-zA-Z\d.]{2,}/;
    return emailPattern.test(email);
  }

  // Reset border-color before adding the 'error' class
  function borderAndFocus(name) {
    $("#" + name)
      .css("border-color", "")
      .addClass("error");
  }

  // Hide error message when user types in input field and remove error class
  function hideErrorMessage(inputName, inputErrorName) {
    $("#" + inputName).on("input", function () {
      $("#" + inputErrorName).hide();
      $("#" + inputName).removeClass("error");
    });
  }

  //Clear signup input fields
  function clearSignupInputFields() {
    let arrs = ["fullName", "username", "email", "pass", "cPass"];

    arrs.forEach((arr) => {
      $("#" + arr).val("");
    });
  }

  //Initialize itemCount
  let itemCount = 0;

  // Initialize total price
  let payAmountTotal = 0;

  //  check if we're editing a product
  let isEditing = false;

  // Store the ID of the product being edited
  let editingProductId = null;

  // Initialize balanceAmount
  let cash = 0;

  // Initialize balanceAmount
  let netAmount = 0;

  // Initialize balanceAmount
  let balance = 0;

  //Main From

  //keypress event to productID input field
  $("#ItemCode").on("keypress", (event) => {
    if (event.key === "Enter") {
      // Move focus to TotalItems input on Enter
      $("#TotalItems").focus();
    }
  });

  //Load products
  function fectProducts() {
    // Adding keypress event for TotalItems
    $("#TotalItems").on("keypress", (event) => {
      if (event.key === "Enter") {
        //Get product Id
        let productId = $("#ItemCode").val();

        //Get quantity of product
        let quantity = $("#TotalItems").val();

        // Check if values are valid before making AJAX request
        if (productId && quantity) {
          // Check if the product already exists in the table
          if ($("#tbody").find(`tr[data-id='${productId}']`).length > 0) {
            //alert("Product already added to the table!");
            sampleModelChange("Product already added to the table!");

            //Clear all input fields after display array
            clearInputFields();

            // After clearing all inputs, focus on productID input
            $("#ItemCode").focus();
          } else {
            $.ajax({
              url: "./PHP/fetch_products.php",
              method: "POST",
              data: { productid: productId, quantity: quantity },
              success: function (data) {
                // Count the number of <tr> elements
                var rowCount = $(data).filter("tr").length;

                if (rowCount > 1) {
                  //Increment itemCount
                  itemCount++;
                  productModel();

                  // Append the new row to the table if the product is not a duplicate
                  $("#tproductbody").append(data);

                  let duplicateProduct = [];

                  //Get selected row
                  $("#tproductbody tr").on("click", function () {
                    let selectedRow = $(this);

                    let details = {
                      productName: selectedRow.find("td:nth-child(2)").text(),
                      price: parseFloat(
                        selectedRow
                          .find("td:nth-child(3)")
                          .text()
                          .replace("Rs: ", "")
                      ),
                    };
                    //Details obj push the array

                    duplicateProduct.push(details);

                    let totalPrice = 0;
                    duplicateProduct.forEach((product) => {
                      totalPrice = product.price * quantity;
                      let tr = $(`
                      <tr data-id=${productId}>
                      <td>${itemCount}</td>
                      <td>${product.productName}</td>
                      <td>Rs: ${product.price.toFixed(2)}</td>
                      <td>${quantity}</td>
                      <td>${totalPrice.toFixed(2)}</td>
                      <td>
                       <button type="button"  id="delete-btn" class="btn btn-danger " data-id=${productId}>X</button>
                       <button type="button" id="edit-btn" class="btn btn-warning " data-id=${productId}>Edit</button>
                      </td>                      
                      </tr>
                      `);

                      $("#tbody").append(tr);
                    });

                    $("#ProductModal").modal("hide");

                    // Update payAmountTotal with the new product's total price
                    payAmountTotal += totalPrice;

                    // Update the PayTotal display
                    $(".PayTotal").text("Rs: " + payAmountTotal.toFixed(2));

                    // Clear all input fields
                    clearInputFields();

                    // After clearing all inputs, focus on productID input
                    $("#ItemCode").focus();

                    // This will also update productsRecords
                    createProductsArray();
                    // Ensure invoice is populated after adding new product
                    populateInvoice();
                    /*

                    let obj = {
                      productName: productName,
                      price: price,
                    };

                    alert(
                      JSON.stringify(obj);           

                    );

                    alert( obj.productName + " "+ obj.price);
                    alert(`${obj.productName} ${obj.price}`);

                    */
                  });
                } else {
                  //Increment itemCount
                  itemCount++;

                  // Append the new row to the table if the product is not a duplicate
                  $("#tbody").append(data.replace(/{{itemCount}}/g, itemCount));

                  // Extract total price from the response and add it to payAmountTotal
                  let newProductTotal = $(data).find("td:nth-child(5)").text(); // Get the total price of the new product from the 5th column
                  newProductTotal = parseFloat(newProductTotal);

                  // Update payAmountTotal with the new product's total price
                  payAmountTotal += newProductTotal;

                  // Update the PayTotal display
                  $(".PayTotal").text("Rs: " + payAmountTotal.toFixed(2));

                  // Clear all input fields
                  clearInputFields();

                  // After clearing all inputs, focus on productID input
                  $("#ItemCode").focus();

                  // This will also update productsRecords
                  createProductsArray();
                  // Ensure invoice is populated after adding new product
                  populateInvoice();
                }
              },
            });
          }
        } else {
          // Display model if empty value
          sampleModelChange("Please enter both Product ID and Quantity.");
        }
      }
    });
  }

  //call the fectProductc function
  fectProducts();

  //Check Valid Product
  $("#ItemCode").on("keypress", function (event) {
    if (event.key === "Enter") {
      //Get product Id
      let productId = $("#ItemCode").val();

      $.ajax({
        url: "./PHP/valid_product.php",
        method: "POST",
        data: { productId: productId },
        success: function (response) {
          if (response.trim() === "Not a valid product") {
            //Display error message with model
            sampleModelChange("Please Check Product Id");

            $("#modal-ok-button").on("click", function () {
              $("#ItemCode").focus();
            });
          }
        },
      });
    }
  });

  // Edit Product
  $(document).on("click", "#edit-btn", function () {
    resetModal(); // Reset modal to default product edit state

    $("#editProductModal")
      .modal({
        backdrop: "static", // Prevent the modal from closing on outside click
        keyboard: false, // Disable closing the modal with the Esc key
      })
      .modal("show");

    // Set the editing flag to true
    isEditing = true;

    //Get Id of the row
    editingProductId = $(this).data("id");

    // Get the quantity value from the same row where the edit button is clicked
    var quantity = $(this).closest("tr").find("td:eq(3)").text();

    $.ajax({
      url: "./PHP/get_products.php",
      method: "POST",
      data: { id: editingProductId },
      dataType: "json",
      success: function (data) {
        console.log("AJAX Success: ", data);

        //Getiting product id form server
        $("#editProductID").val(data.productid);

        $("#editQunatity").val(quantity);
      },
      error: function (xhr, status, error) {
        console.log("AJAX error:", status, error);
      },
    });
  });

  //Updated edit row of the table
  $("#editQunatity").on("keypress", function (event) {
    //Check if press Enter key
    if (event.key == "Enter") {
      if (isEditing) {
        //Get newQuantity
        var newQuantity = $("#editQunatity").val();

        // Get the row corresponding to the product being edited
        var $row = $(`tr[data-id='${editingProductId}']`);

        //Get oldTotalPrice
        let oldTotalPrice = parseFloat($row.find("td:eq(4)").text());

        // Get the price from the price column (assuming it's in the 3rd column: index 2)
        var price = parseFloat(
          $row.find("td:eq(2)").text().replace("Rs: ", "")
        );

        // Calculate the new total price
        var newTotalPrice = newQuantity * price;

        // Update the quantity in the 4th <td> (index 3)
        $row.find("td:eq(3)").text(newQuantity);

        // Update the total price in the 5th <td> (index 4)
        $row.find("td:eq(4)").text(newTotalPrice.toFixed(2));

        // Update payAmountTotal with the new product's total price
        payAmountTotal = payAmountTotal - oldTotalPrice + newTotalPrice;

        // Update the PayTotal display
        $(".PayTotal").text("Rs: " + payAmountTotal.toFixed(2));

        // Reset the editing flag and ID
        isEditing = false;
        editingProductId = null;

        //  close the modal
        $("#editProductModal").modal("hide");

        // Clear  input values
        $("#editProductID").val("");
        $("#editQunatity").val("");

        //Rest the deafult model
        resetModal();
      }
    }
  });

  // Prevent the default form submission
  $("#editProductForm").on("submit", function (event) {
    event.preventDefault();
  });

  //display cuurent date and time
  function setDate(now = new Date()) {
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0");
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");

    // Set the content of the <span> with the formatted date and time
    $(".time").text(`${year}-${month}-${day} ${hours}:${minutes}`);

    $("#todayDate").text(`${year}-${month}-${day} ${hours}:${minutes}`);
  }

  // Call the function to set the date and time
  setDate();

  // Update the date and time every second
  setInterval(setDate, 1000);

  //Cash amount
  document.addEventListener("keypress", function (event) {
    if (event.key.toLowerCase() == "c") {
      resetModal();

      //Change the text editProductModalLabel
      $("#editProductModalLabel").text("Please Enter Cash Amount");

      //Remove qlt div
      $(".qty").remove();

      $(".lbOne").text("Cash Amount: ");

      $("#editProductID").attr("placeholder", "Enter Cash Amount");

      // Clear the cash amount field and focus on it
      $("#editProductID").val("");
      $("#editProductID").focus();

      $("#editProductModal")
        .modal({
          backdrop: "static", // Prevent the modal from closing on outside click
          keyboard: false, // Disable closing the modal with the Esc key
        })
        .modal("show");
    }
  });

  $("#editProductID").on("keypress", function (e) {
    if (e.key == "Enter") {
      var cashAmount = $("#editProductID").val();
      cashAmount = parseFloat(cashAmount);

      //  CashAmount with two decimal places
      $(".Cash").text("Rs: " + cashAmount.toFixed(2));

      // Calculate balance amount
      balanceAmount = cashAmount - payAmountTotal;

      //If balanceAmount equal zero in white color
      if (balanceAmount == 0) {
        $(".balAmount")
          .text("Rs: " + balanceAmount.toFixed(2))
          .css("color", "white");
      } else {
        // Display balance amount in parentheses if negative, and in red color
        $(".balAmount")
          .text("Rs: - (" + balanceAmount + ")")
          .css("color", "#EF5350");
      }

      // Get the data from tfoot
      netAmount = parseFloat($("#tfoot .PayTotal").text().replace("Rs: ", ""));
      cash = parseFloat($("#tfoot .Cash").text().replace("Rs: ", ""));
      balance = $("#tfoot .balAmount").text().replace("Rs: ", "");

      // console.log("Net Amount: ", netAmount);
      // console.log("Cash: ", cash);
      // console.log("Balance Amount: ", balance);

      // Close the modal

      $("#editProductModal").modal("hide");
      // Reset the modal back to the default state for future use
      resetModal();
    }
  });

  function resetModal() {
    // Reset modal to the default product editing mode
    $("#editProductModalLabel").text("Edit Product");

    // Reset quantity field if it was removed
    if ($(".qty").length === 0) {
      $("#editQunatity").parent().show();
      $(".modal-body form").append(
        '<div class="form-group qty"><label for="editQunatity" class="fw-bold">Quantity:</label><input type="text" class="form-control" id="editQunatity" name="editQunatity" placeholder="Enter Item Quantity"></div>'
      );
    }

    // Reset other fields
    $(".lbOne").text("ItemCode:");
    $("#editProductID").attr("placeholder", "Enter Product ID");
  }

  //Sample model change
  function sampleModelChange(string) {
    // console.log("Sample model change triggered"); 
    // console.log(string);
    $(".modal-body p").text(string);
    $("#sampleModal")
      .modal({
        backdrop: "static", // Prevent the modal from closing on outside click
        keyboard: false, // Disable closing the modal with the Esc key
      })
      .modal("show");

    $("#modal-ok-button").on("click", function () {
      // Hide the modal
      var myModalEl = $("#sampleModal");
      var modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
    });
  }

  //Product Model
  function productModel() {
    $("#ProductModal")
      .modal({
        backdrop: "static", // Prevent the modal from closing on outside click
        keyboard: false, // Disable closing the modal with the Esc key
      })
      .modal("show");
  }

  //Unfoucs productId input
  $(document).on("keypress", function (event) {
    if (event.key.toLowerCase() === "d") {
      // User pressed the d key
      $("#ItemCode").blur();
    }
  });

  //Clear all input fileds
  function clearInputFields() {
    let arrInputs = ["ItemCode", "TotalItems"];

    arrInputs.forEach((arrInput) => {
      $("#" + arrInput).val("");
    });
  }

  let productsRecords = [];
  // Print Bill
  $(".printBtn").on("click", function () {
    populateInvoice();
    window.print();
  });

  function createProductsArray() {
    // Initialize the array only once, before the loop
    productsRecords = [];

    // Loop through each row in the tbody
    $("#tbody tr").each(function () {
      let item = {
        itemName: $(this).find("td:eq(1)").text(),
        price: parseFloat($(this).find("td:eq(2)").text().replace("Rs: ", "")),
        quantity: parseInt($(this).find("td:eq(3)").text()),
        total: parseFloat($(this).find("td:eq(4)").text()),
      };
      // Add each item to the array
      productsRecords.push(item);
    });

    // console.log("Products Records: ", productsRecords);
    return productsRecords;
  }

  // Populate Invoice Function
  function populateInvoice() {
    let invoiceBody = $("#invoiceBody");
    let invoiceTotal = 0;
    let itemCount = 0;

    // Clear previous invoice body
    invoiceBody.empty();

    // Loop through productsRecords to populate the invoice
    productsRecords.forEach((product) => {
      // console.log("from invoice function", product.itemName);
      let tr = $(`
        <tr>
          <td>${itemCount + 1}</td>
          <td>${product.itemName}</td>
          <td>${product.price}</td>
          <td>x ${product.quantity}</td>
          <td>${product.total.toFixed(2)}</td>
        </tr>
      `);

      $("#invoiceBody").append(tr);
      invoiceTotal += product.total;
      itemCount++;
    });

    $(".invoicePayTotal").text("Rs: " + invoiceTotal.toFixed(2));

    $(".invoiceCash").text("Rs: " + cash.toFixed(2));

    $(".invoiceBalance").text("Rs: " + balance);
  }

  //Clear table body and foot
  $(".clearBtn").on("click", function () {
    //Dispaly Warring message
    $("#sampleModalLabel").text("Warring!");

    //Call model
    sampleModelChange("Are You Sure ?");

    $("#modal-ok-button").on("click", function () {
      $("#tbody").html(" ");
      $("#tfoot .PayTotal").html(" ");
      $("#tfoot .Cash").html(" ");
      $("#tfoot .balAmount").html(" ");
      itemCount = 0;
    });
  });

  //Delete product
  $(document).on("click", "#delete-btn", function () {
    //Dispaly Warring message
    $("#sampleModalLabel").text("Warring!");

    //Call model
    sampleModelChange("Are You Sure ?");

    //Get the selected row
    let row = $(this).closest("tr");

    //Get the current row
    let currentPayTotal = parseFloat(
      $("#tfoot .PayTotal").text().replace("Rs: ", "")
    );

    //Get the selected item total amount
    let productTotal = parseFloat($(row).find("td:eq(4)").text());

    //Check if click ok button ,then delete selected product
    $("#modal-ok-button").on("click", function () {
      row.remove();

      //Reset the payAmount
      payAmountTotal = currentPayTotal - productTotal;

      $("#tfoot .PayTotal").text("Rs: " + payAmountTotal.toFixed(2));

      // Update itemCount and reset
      itemCount = 0;

      $("#tbody tr").each(function (index) {
        // Update the item count based on the index
        $(this)
          .find("td:first-child")
          .text(index + 1);
        itemCount++;
      });
    });
  });
});
