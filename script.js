console.log("Hello world");
const OUTPUT = document.getElementById("spaceForJavaScriptOutput");
OUTPUT.innerHTML += "<h2></h2>";

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
  const normalized = order.trim().toLowerCase();
  if (!normalized) return null;
  if (MENU_PRICES[normalized] != null) return MENU_PRICES[normalized];
  for (const [key, price] of Object.entries(MENU_PRICES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return price;
    }
  }
  return null;
}

function submitOrder(event) {
  event.preventDefault();
  const name = document.getElementById("nameField").value.trim();
  const order = document.getElementById("orderField").value.trim();
  const quantity = Number(document.getElementById("quantityField").value);
  const price = getMenuPrice(order);

  if (!name || !order || !quantity) {
    OUTPUT.innerHTML += '<p class="error">Please enter your name, order, and quantity.</p>';
    return;
  }
  if (price == null) {
    OUTPUT.innerHTML += '<p class="error">Unknown item. Please enter one of the menu pizza names.</p>';
    return;
  }

  const total = price * quantity;
  OUTPUT.innerHTML += `<p>Hi ${name}</p>`;
  OUTPUT.innerHTML += `<p>Your Order: ${order}</p>`;
  OUTPUT.innerHTML += `<p>Quantity: ${quantity}</p>`;
  OUTPUT.innerHTML += `<p>Total due: $${formatMoney(total)}</p>`;
}

function payOrder() {
  const name = document.getElementById("nameField").value.trim();
  const order = document.getElementById("orderField").value.trim();
  const quantity = Number(document.getElementById("quantityField").value);
  const payment = Number(document.getElementById("paymentField").value);
  const price = getMenuPrice(order);

 
  if (price == null) {
    OUTPUT.innerHTML += '<p class="error">Unknown item. Please enter one of the menu pizza names.</p>';
    return;
  }
  if (!payment || payment <= 0) {
    OUTPUT.innerHTML += '<p class="error">Enter a payment amount to complete your order.</p>';
    return;
  }

  const total = price * quantity;
  if (payment < total) {
    const shortage = total - payment;
    OUTPUT.innerHTML += `<p class="error">Insufficient payment. You need to buy more money in: $${formatMoney(shortage)}</p>`;
    return;
  }

  const change = payment - total;
  OUTPUT.innerHTML += `<p>Payment accepted. Total: $${formatMoney(total)}. Payment: $${formatMoney(payment)}.</p>`;
  if (change > 0) {
    OUTPUT.innerHTML += `<p>Change: $${formatMoney(change)}</p>`;
  } else {
    OUTPUT.innerHTML += '<p>Exact payment received. Thank you!</p>';
  }
}
