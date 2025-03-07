//Data Recorder
let productsRecors = [
  { id: 1245, itemName: "Single Espreso", price: 200,  },
  { id: 1235, itemName: "Double Espreso", price: 250,  },
  { id: 1255, itemName: "Avacado", price: 590,  },
  { id: 1265, itemName: "Hot Chocolate", price: 650,  },
  { id: 1266, itemName: "Chocolate Milk Shanke", price: 600,  },
  { id: 1220, itemName: "Veggie Submarine", price: 850,  },
  { id: 1221, itemName: "Spicy Chicken Submarine", price: 950,  },
  { id: 1289, itemName: "Veggie Kottu[F]", price: 1000,  },
  { id: 1290, itemName: "Egg Kottu[F]", price: 1100,  },
  { id: 1291, itemName: "Chicken Kottu[F]", price: 1300,  },
  { id: 1292, itemName: "Veggie Kottu[N]", price: 850,  },
  { id: 1293, itemName: "Egg Kottu[N]", price: 950,  },
  { id: 1294, itemName: "Chicken Kottu[N]", price: 1000,  },
  { id: 1280, itemName: "Veggie Fried Rice[F]", price: 1000,  },
  { id: 1281, itemName: "Egg Fried Rice[F]", price: 1100,  },
  { id: 1282, itemName: "Chicken Fried Rice[F]", price: 1300,  },
  { id: 1270, itemName: "Veggie Fried Rice[N]", price: 850,  },
  { id: 1271, itemName: "Egg Fried Rice[N]", price: 950,  },
  { id: 1272, itemName: "Chicken Fried Rice[N]", price: 1000,  },
];

//console.log(productsRecors)

//Set EventListener to TotalItem Input Element's KeyPress Event
document.getElementById("TotalItems").addEventListener("keypress", (evnt) => {
  if (evnt.key == "Enter") {
    //Call the updateTotalItem Functions
    updateTotalItem();
    //Call the displayIteamValues Functions
    displayItemsandValues();
    //Call the  clearInputs Fileds Function
    clearInputFields();
  }
});

//Set EventListener to ItemCode Input Element's KeyPress Event
function checkPressEnterKey() {
  document.getElementById("ItemCode").addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      document.getElementById("TotalItems").focus();
    }
  });
}
//Call checkPressEnterKey Function
checkPressEnterKey();

//Clear All Items
document.querySelector(".clearBtn").onclick = () => {
  //Show the model
  var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
  myModal.show();
  //Set eventListener to the model OK button
  document.getElementById("modal-ok-button").addEventListener("click", () => {
    productsRecors = productsRecors.map((product) => ({
      ...product,
      totalItem: 0,
    }));

    document.querySelector(".PayTotal").textContent = 0;
    document.getElementById("ItemCode").focus();
    displayItemsandValues();
    checkTableIsEmpty();
    // Auto refresh after 5 seconds
    /* setTimeout(() => {
      location.reload();
    }, 5000);
    checkTableIsEmpty();
   */
    // Hide the modal
    var myModalEl = document.getElementById("exampleModal");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  });

  // using alert or confirm
  // if (alert("Are you sure?")) {
  //   productsRecors = productsRecors.map((product) => ({
  //     ...product,
  //     totalItem: 0,
  //   }));

  //   document.querySelector(".PayTotal").textContent = 0;
  //   document.getElementById("ItemCode").focus();
  //   displayItemsandValues();
  // }
};
//Check table is Empty
let checkTableIsEmpty = () => {
  let isEmpty = true;

  productsRecors.forEach((product) => {
    if (product.totalItem !== 0) {
      isEmpty = false;
    }
  });

  if (isEmpty) {
    // Auto refresh after 5 seconds
    setTimeout(() => {
      location.reload();
    }, 5000);
  }
};

//Define The UpdateTotalItem Function
function updateTotalItem() {
  //Get itemId value  form input element
  let idCode = document.getElementById("ItemCode").value;
  //Get totalItem value form input element
  let totalQuntity = document.getElementById("TotalItems").value;
  // Update the productsRecors aarray by mapping over each product record
  productsRecors = productsRecors.map((productsRecor) => {
    // Check if the current product record's ID matches the itemCode
    if (productsRecor.id == idCode) {
      // If it matches, return a new object with the updated totalItem value
      return { ...productsRecor, totalItem: totalQuntity };
    }
    // If it doesn't match, return the product record unchanged
    return productsRecor;
  });
}

//Define The DisplayItemsandValues Function
function displayItemsandValues() {
  // Select the tbody element where the rows will be added
  let tbody = document.querySelector("tbody");
  //Create variable calculate the total pay amount
  let payAmountTotal = 0;
  // Avoid duplicate values by clearing existing rows in tbody
  tbody.innerHTML = "";
  // Initialize a variable to count the items
  let itemCount = 0;

  // Iterate Over Each Product Record in ProductsRecors
  productsRecors.forEach((productsRecor, index) => {
    // Only process items with a totalItem value greater than 0
    if (productsRecor.totalItem > 0) {
      //Select template content
      let template = document.querySelector("template").content;
      //Clone template content to create a new row
      let tr = template.cloneNode(true);
      //Select the Content for Each Cell in the new row
      tr.querySelector(".Noi").textContent = itemCount + 1;
      tr.querySelector(".ProductName").textContent = productsRecor.itemName;
      tr.querySelector(".Price").textContent = productsRecor.price;
      tr.querySelector(".Quantity").textContent = productsRecor.totalItem;
      tr.querySelector(".Total").textContent =
        productsRecor.price * productsRecor.totalItem;
      // Set the delete button's Onclick event
      tr.querySelector(".del").onclick = function () {
        // Capture the current index in a local variable
        let currentIndex = index;
        //Show the model
        var myModal = new bootstrap.Modal(
          document.getElementById("exampleModal")
        );
        myModal.show();
        document
          .getElementById("modal-ok-button")
          .addEventListener("click", () => {
            //Remove the item capture form index
            productsRecors.splice(currentIndex, 1);
            //Updated items and values and Display
            displayItemsandValues();

            // Hide the modal
            var myModalEl = document.getElementById("exampleModal");
            var modal = bootstrap.Modal.getInstance(myModalEl);
            modal.hide();
          });

        // if (alert("are you sure?")) {
        //   productsRecors.splice(index, 1);
        //   displayItemsandValues();
        // }
      };
      // Set the Edit button's onclick event
      tr.querySelector(".edit").onclick = function () {
        document.getElementById("ItemCode").value = productsRecor.id;
        document.getElementById("TotalItems").value = productsRecor.totalItem;
        displayItemsandValues();
      };
      //Append the new row the tbody element
      tbody.appendChild(tr);
      //Add product's total price to the  total pay amount
      payAmountTotal += productsRecor.price * productsRecor.totalItem;
      //increase itemCount
      itemCount++;
    }
  });
  document.querySelector(".PayTotal").textContent = payAmountTotal;
}

//Clear input Fileds
function clearInputFields() {
  document.getElementById("ItemCode").value = "";
  document.getElementById("TotalItems").value = "";
  document.getElementById("ItemCode").focus();
}

// Print Bill
document.querySelector(".printBtn").onclick = () => {
  populateInvoice();
  window.print();
};

// Populate Invoice Function
function populateInvoice() {
  let invoiceBody = document.getElementById("invoiceBody");
  let invoiceTotal = 0;
  let itemCount = 0;
  invoiceBody.innerHTML = "";

  productsRecors.forEach((product) => {
    if (product.totalItem > 0) {
      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${itemCount + 1}</td>
        <td>${product.itemName}</td>
        <td>${product.price}</td>
        <td>${product.totalItem}</td>
        <td>${product.price * product.totalItem}</td>
      `;
      invoiceBody.appendChild(tr);
      invoiceTotal += product.price * product.totalItem;
      itemCount++;
    }
  });

  let invoicePayTotal = document.querySelector(".invoicePayTotal");
  invoicePayTotal.textContent = invoiceTotal;

  //Get loacl time and Date
  let dateTime = new Date();
  let formattedDateTime = dateTime
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    })
    .replace(",", ""); // Remove the comma between date and time

  document.getElementById("todayDate").innerHTML = formattedDateTime;
}
