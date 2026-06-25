console.log("Hello world");

const OUTPUT = document.getElementById("spaceForJavaScriptOutput");

const MENU_PRICES = {
  "cheesy garlic pizza": 15.80,
  "pepperoni pizza": 14.99,
  "hot & spicy pizza": 16.00,
  "bbq meatlovers pizza": 15.00,
  "margherita pizza": 16.99,
  "hawaiian pizza": 15.99
};

function formatMoney(amount) {
  return amount.toFixed(2);
}

function getMenuPrice(order) {
  order = order.toLowerCase().trim();

  if (order == "cheesy garlic pizza") {
    return 15.80;
  } else if (order == "pepperoni pizza") {
    return 14.99;
  } else if (order == "hot & spicy pizza") {
    return 16.00;
  } else if (order == "bbq meatlovers pizza") {
    return 15.00;
  } else if (order == "margherita pizza") {
    return 16.99;
  } else if (order == "hawaiian pizza") {
    return 15.99;
  } else {
    return null;
  }
}

function submitOrder(event) {
  event.preventDefault();

  OUTPUT.innerHTML = "";

  let name = document.getElementById("nameField").value.trim();
  let order = document.getElementById("orderField").value.trim();
  let quantity = Number(document.getElementById("quantityField").value);

  let price = getMenuPrice(order);

  if (name == "" || order == "" || quantity <= 0) {
    OUTPUT.innerHTML += "<p>Please fill in all the boxes.</p>";
    return;
  }

  if (price == null) {
    OUTPUT.innerHTML += "<p>That pizza is not on the menu.</p>";
    return;
  }

  let total = price * quantity;

  OUTPUT.innerHTML += "<h3>Order Summary</h3>";
  OUTPUT.innerHTML += "<p>Name: " + name + "</p>";
  OUTPUT.innerHTML += "<p>Pizza: " + order + "</p>";
  OUTPUT.innerHTML += "<p>Quantity: " + quantity + "</p>";
  OUTPUT.innerHTML += "<p>Total: $" + formatMoney(total) + "</p>";
}

function payOrder() {

  OUTPUT.innerHTML = "";

  let name = document.getElementById("nameField").value.trim();
  let order = document.getElementById("orderField").value.trim();
  let quantity = Number(document.getElementById("quantityField").value);
  let payment = Number(document.getElementById("paymentField").value);

  let price = getMenuPrice(order);

  if (name == "" || order == "" || quantity <= 0) {
    OUTPUT.innerHTML += "<p>Please enter your order first.</p>";
    return;
  }

  if (price == null) {
    OUTPUT.innerHTML += "<p>That pizza is not on the menu.</p>";
    return;
  }

  if (payment <= 0) {
    OUTPUT.innerHTML += "<p>Please enter a payment amount.</p>";
    return;
  }

  let total = price * quantity;

  if (payment < total) {
    let extra = total - payment;
    OUTPUT.innerHTML += "<p>You need to pay another $" + formatMoney(extra) + ".</p>";
    return;
  }

  let change = payment - total;

  OUTPUT.innerHTML += "<p>Payment successful!</p>";
  OUTPUT.innerHTML += "<p>Total: $" + formatMoney(total) + "</p>";
  OUTPUT.innerHTML += "<p>Paid: $" + formatMoney(payment) + "</p>";
  OUTPUT.innerHTML += "<p>Change: $" + formatMoney(change) + "</p>";
  OUTPUT.innerHTML += "<p>Thanks for ordering from Pizza House!</p>";
}