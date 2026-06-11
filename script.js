const pizzas = [
	{ id: 1, name: 'Cheesy Garlic Pizza', price: 15.8, note: 'Soft crust, garlic butter, and a heavy cheese finish.' },
	{ id: 2, name: 'Pepperoni Pizza', price: 14.99, note: 'A classic with crisp pepperoni and melted mozzarella.' },
	{ id: 3, name: 'Hawaiian Pizza', price: 15.99, note: 'Sweet pineapple balanced with savory ham.' },
	{ id: 4, name: 'Margherita Pizza', price: 16.99, note: 'Fresh basil, tomato, and a clean mozzarella flavor.' },
	{ id: 5, name: 'Hot & Spicy Pizza', price: 16.0, note: 'Bold heat with peppers and a little extra kick.' },
	{ id: 6, name: 'BBQ Meatlovers', price: 15.0, note: 'Smoky barbecue sauce with a loaded meat topping.' },
];

const formatPrice = (value) => `$${value.toFixed(2)}`;

document.body.innerHTML = `
	<div class="app-shell">
		<main class="hero">
			<section class="hero-copy">
				<p class="eyebrow">Handmade ordering board</p>
				<h1>The Pizza House</h1>
				<p class="intro">
					A warmer digital version of the sketch, built to feel like a real counter sheet.
				</p>

				<div class="stats">
					<div>
						<strong>6</strong>
						<span>pizzas</span>
					</div>
					<div>
						<strong>Fast</strong>
						<span>order pickup</span>
					</div>
					<div>
						<strong>Fresh</strong>
						<span>daily prep</span>
					</div>
				</div>

				<div class="order-panel">
					<h2>Place an order</h2>
					<label>
						Name
						<input id="customerName" type="text" placeholder="Your name">
					</label>
					<label>
						Item
						<select id="pizzaSelect"></select>
					</label>
					<label>
						Money
						<input id="moneyInput" type="number" min="0" step="0.01" placeholder="Amount tendered">
					</label>

					<div class="order-actions">
						<button id="addToOrder" type="button">Add to order</button>
						<button id="placeOrder" class="secondary" type="button">Place order</button>
					</div>

					<p id="message" class="message">Choose a pizza and add it to the order.</p>
				</div>
			</section>

			<aside class="poster-card">
				<div class="poster-frame">
					<img src="Screenshot 2026-06-12 091452.png" alt="Hand-drawn pizza poster reference">
				</div>
				<p class="poster-note">Poster reference is left untouched and displayed as-is.</p>
			</aside>
		</main>

		<section class="menu-section">
			<div class="section-header">
				<div>
					<p class="eyebrow">Menu board</p>
					<h2>Choose your pizza</h2>
				</div>
				<p class="section-note">Styled to feel a bit more human than a plain grid.</p>
			</div>
			<div id="menuGrid" class="menu-grid"></div>
		</section>

		<section class="summary-section">
			<div class="section-header">
				<div>
					<p class="eyebrow">Current order</p>
					<h2>Basket</h2>
				</div>
				<p id="totalPrice" class="total-price">Total: $0.00</p>
			</div>
			<div id="basketList" class="basket-list"></div>
		</section>
	</div>
`;

const style = document.createElement('style');
style.textContent = `
	:root {
		color-scheme: light;
		--bg: #f6efe6;
		--bg-accent: #ead8c4;
		--panel: rgba(255, 250, 244, 0.92);
		--panel-strong: #fff8f0;
		--ink: #2f241c;
		--muted: #6f5e50;
		--line: rgba(74, 49, 34, 0.12);
		--brand: #a5532a;
		--brand-deep: #7e3f1f;
		--shadow: 0 22px 60px rgba(80, 45, 24, 0.14);
		--radius: 26px;
	}

	* { box-sizing: border-box; }

	body {
		margin: 0;
		font-family: Georgia, 'Times New Roman', serif;
		color: var(--ink);
		background:
			radial-gradient(circle at top left, rgba(255,255,255,0.65), transparent 28%),
			radial-gradient(circle at 80% 10%, rgba(211, 153, 96, 0.16), transparent 22%),
			linear-gradient(180deg, var(--bg), #f3e6d7 55%, #efe1d2);
		min-height: 100vh;
	}

	body::before {
		content: '';
		position: fixed;
		inset: 0;
		pointer-events: none;
		background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
		background-size: 34px 34px;
		opacity: 0.18;
		mask-image: linear-gradient(180deg, rgba(0,0,0,0.45), transparent 95%);
	}

	.app-shell {
		width: min(1200px, calc(100% - 32px));
		margin: 24px auto 40px;
		display: grid;
		gap: 22px;
	}

	.hero,
	.menu-section,
	.summary-section {
		position: relative;
		background: var(--panel);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		box-shadow: var(--shadow);
		backdrop-filter: blur(10px);
	}

	.hero {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 24px;
		padding: 26px;
		align-items: start;
	}

	.hero-copy h1,
	.section-header h2,
	.order-panel h2 {
		margin: 0;
		font-size: clamp(2rem, 3vw, 3.4rem);
		line-height: 0.98;
		letter-spacing: -0.04em;
	}

	.eyebrow {
		margin: 0 0 10px;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		font: 700 0.74rem/1.4 Arial, sans-serif;
		color: var(--brand);
	}

	.intro,
	.section-note,
	.poster-note,
	.message {
		font: 400 0.98rem/1.6 Arial, sans-serif;
		color: var(--muted);
	}

	.intro {
		max-width: 58ch;
		margin: 14px 0 18px;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
		margin-bottom: 18px;
	}

	.stats div {
		background: rgba(255,255,255,0.7);
		border: 1px solid var(--line);
		border-radius: 18px;
		padding: 14px;
	}

	.stats strong {
		display: block;
		font-size: 1.1rem;
		margin-bottom: 4px;
	}

	.stats span {
		color: var(--muted);
		font: 400 0.9rem/1.4 Arial, sans-serif;
	}

	.order-panel {
		background: rgba(255, 248, 241, 0.95);
		border: 1px solid var(--line);
		border-radius: 22px;
		padding: 18px;
		display: grid;
		gap: 12px;
	}

	.order-panel label {
		display: grid;
		gap: 7px;
		font: 700 0.88rem/1.2 Arial, sans-serif;
		color: var(--ink);
	}

	.order-panel input,
	.order-panel select {
		width: 100%;
		border: 1px solid rgba(126, 63, 31, 0.18);
		background: white;
		border-radius: 14px;
		padding: 13px 14px;
		font: 400 0.98rem/1.2 Arial, sans-serif;
		color: var(--ink);
		outline: none;
	}

	.order-panel input:focus,
	.order-panel select:focus {
		border-color: rgba(165, 83, 42, 0.55);
		box-shadow: 0 0 0 4px rgba(165, 83, 42, 0.12);
	}

	.order-actions {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 10px;
		margin-top: 4px;
	}

	button {
		border: 0;
		border-radius: 14px;
		padding: 13px 14px;
		font: 700 0.95rem/1 Arial, sans-serif;
		cursor: pointer;
		background: linear-gradient(180deg, #c96a3b, var(--brand));
		color: white;
		box-shadow: 0 12px 24px rgba(165, 83, 42, 0.2);
	}

	button.secondary {
		background: #efe0d1;
		color: var(--brand-deep);
		box-shadow: none;
	}

	.message {
		margin: 0;
		min-height: 2.4em;
	}

	.poster-card {
		display: grid;
		gap: 10px;
	}

	.poster-frame {
		border-radius: 22px;
		padding: 12px;
		background: linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,255,255,0.58));
		border: 1px dashed rgba(126, 63, 31, 0.2);
	}

	.poster-frame img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: 14px;
	}

	.menu-section,
	.summary-section {
		padding: 22px;
	}

	.section-header {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 18px;
	}

	.section-header h2 {
		font-size: clamp(1.45rem, 2vw, 2rem);
	}

	.menu-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 16px;
	}

	.pizza-card {
		background: linear-gradient(180deg, var(--panel-strong), rgba(255, 240, 226, 0.86));
		border: 1px solid rgba(126, 63, 31, 0.12);
		border-radius: 20px;
		padding: 16px;
		display: grid;
		gap: 12px;
		box-shadow: 0 14px 30px rgba(99, 59, 31, 0.08);
		min-height: 100%;
	}

	.pizza-icon {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: radial-gradient(circle at 35% 35%, #ffe6a5 0 33%, #d28d4e 33% 46%, #a85a2f 46% 100%);
		position: relative;
		box-shadow: inset 0 -8px 12px rgba(0,0,0,0.08);
	}

	.pizza-icon::before,
	.pizza-icon::after {
		content: '';
		position: absolute;
		inset: 14px;
		border-radius: 50%;
		border: 4px dotted rgba(114, 58, 24, 0.65);
		opacity: 0.5;
	}

	.pizza-card h3 {
		margin: 0;
		font-size: 1.18rem;
		line-height: 1.15;
	}

	.pizza-card p {
		margin: 0;
		font: 400 0.95rem/1.55 Arial, sans-serif;
		color: var(--muted);
	}

	.pizza-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		margin-top: auto;
		padding-top: 8px;
	}

	.price-tag,
	.total-price {
		font: 700 1rem/1 Arial, sans-serif;
		color: var(--brand-deep);
	}

	.basket-list {
		display: grid;
		gap: 12px;
	}

	.basket-item {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		align-items: center;
		border: 1px solid rgba(126, 63, 31, 0.14);
		background: rgba(255, 250, 244, 0.92);
		border-radius: 18px;
		padding: 14px 16px;
	}

	.basket-item strong,
	.basket-item span {
		display: block;
	}

	.basket-item span {
		margin-top: 3px;
		font: 400 0.92rem/1.4 Arial, sans-serif;
		color: var(--muted);
	}

	.basket-item button {
		padding: 10px 12px;
		border-radius: 12px;
		box-shadow: none;
	}

	@media (max-width: 980px) {
		.hero,
		.menu-grid {
			grid-template-columns: 1fr;
		}

		.stats {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 720px) {
		.app-shell {
			width: min(100% - 18px, 1200px);
			margin: 10px auto 24px;
		}

		.hero,
		.menu-section,
		.summary-section {
			padding: 16px;
		}

		.section-header {
			align-items: start;
			flex-direction: column;
		}

		.order-actions {
			grid-template-columns: 1fr;
		}
	}
`;
document.head.appendChild(style);

const menuGrid = document.getElementById('menuGrid');
const basketList = document.getElementById('basketList');
const totalPrice = document.getElementById('totalPrice');
const message = document.getElementById('message');
const pizzaSelect = document.getElementById('pizzaSelect');
const customerName = document.getElementById('customerName');
const moneyInput = document.getElementById('moneyInput');

const order = [];

const renderMenu = () => {
	menuGrid.innerHTML = pizzas
		.map((pizza) => `
			<article class="pizza-card">
				<div class="pizza-icon" aria-hidden="true"></div>
				<div>
					<h3>${pizza.name}</h3>
					<p>${pizza.note}</p>
				</div>
				<div class="pizza-footer">
					<span class="price-tag">${formatPrice(pizza.price)}</span>
					<span>Made fresh</span>
				</div>
			</article>
		`)
		.join('');
};

const renderSelect = () => {
	pizzaSelect.innerHTML = pizzas
		.map((pizza) => `<option value="${pizza.id}">${pizza.name} - ${formatPrice(pizza.price)}</option>`)
		.join('');
};

const renderBasket = () => {
	if (order.length === 0) {
		basketList.innerHTML = '<div class="basket-item"><div><strong>No items yet</strong><span>Add a pizza from the form above.</span></div></div>';
		totalPrice.textContent = 'Total: $0.00';
		return;
	}

	basketList.innerHTML = order
		.map((item, index) => `
			<div class="basket-item">
				<div>
					<strong>${item.name}</strong>
					<span>${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.quantity * item.price)}</span>
				</div>
				<button type="button" data-remove="${index}" class="secondary">Remove</button>
			</div>
		`)
		.join('');

	const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
	totalPrice.textContent = `Total: ${formatPrice(total)}`;
};

const addToOrder = () => {
	const selectedPizza = pizzas.find((pizza) => pizza.id === Number(pizzaSelect.value));

	if (!selectedPizza) {
		message.textContent = 'Pick a pizza first.';
		return;
	}

	const existingItem = order.find((item) => item.id === selectedPizza.id);

	if (existingItem) {
		existingItem.quantity += 1;
	} else {
		order.push({ ...selectedPizza, quantity: 1 });
	}

	message.textContent = `${selectedPizza.name} added to the basket.`;
	renderBasket();
};

document.getElementById('addToOrder').addEventListener('click', addToOrder);

document.getElementById('placeOrder').addEventListener('click', () => {
	const name = customerName.value.trim();
	const tendered = Number.parseFloat(moneyInput.value);

	if (!name) {
		message.textContent = 'Please add your name before placing the order.';
		return;
	}

	if (order.length === 0) {
		message.textContent = 'Your basket is still empty.';
		return;
	}

	const total = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
	if (Number.isNaN(tendered) || tendered < total) {
		message.textContent = `Please enter at least ${formatPrice(total)}.`;
		return;
	}

	message.textContent = `Thanks, ${name}. Order placed for ${formatPrice(total)}.`;
	order.length = 0;
	renderBasket();
});

basketList.addEventListener('click', (event) => {
	const removeButton = event.target.closest('[data-remove]');

	if (!removeButton) {
		return;
	}

	const index = Number(removeButton.dataset.remove);
	order.splice(index, 1);
	renderBasket();
});

renderMenu();
renderSelect();
renderBasket();
