const addButtons = document.querySelectorAll('.add-btn');
const checkoutSection = document.getElementById('checkout-section');
const checkoutItemsContainer = document.getElementById('checkout-items-container');
const totalPriceElement = document.getElementById('total-price');
const completeBtn = document.getElementById('complete-btn');
const orderSuccess = document.getElementById('order-success');

let cart = {};

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    if (!name || isNaN(price)) return;

    if (cart[name]) {
      cart[name].quantity += 1;
    } else {
      cart[name] = { price: price, quantity: 1 };
    }

    renderCart();
  });
});

function renderCart() {
  checkoutItemsContainer.innerHTML = '';
  let total = 0;

  for (const name in cart) {
    const item = cart[name];
    const label = item.quantity > 1 ? `${item.quantity}x ${name}` : name;

    const div = document.createElement('div');
    div.classList.add('checkout-item');
    div.innerHTML = `
      <div>
        <span class="item-name">${label}</span>
        <button class="remove-btn">remove</button>
      </div>
      <span class="item-price">$${item.price * item.quantity}</span>
    `;

    div.querySelector('.remove-btn').addEventListener('click', () => {
      delete cart[name];
      renderCart();
    });

    checkoutItemsContainer.appendChild(div);
    total += item.price * item.quantity;
  }

  totalPriceElement.textContent = `$${total}`;

  checkoutSection.classList.toggle('hidden', Object.keys(cart).length === 0);
}

completeBtn.addEventListener('click', () => {
  cart = {};
  checkoutItemsContainer.innerHTML = '';
  totalPriceElement.textContent = '$0';
  checkoutSection.classList.add('hidden');
  orderSuccess.classList.remove('hidden');
});