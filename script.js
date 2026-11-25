const phones = [
  { brand: "Apple", name: "iPhone 15 Pro", price: 189999, image: "images/phone-1.jpg" },
  { brand: "Apple", name: "iPhone 16", price: 144999, image: "images/phone-2.jpg" },
  { brand: "Samsung", name: "Galaxy S24", price: 119999, image: "images/phone-3.jpg" },
  { brand: "Samsung", name: "Galaxy A55", price: 49999, image: "images/phone-4.jpg" },
  { brand: "Samsung", name: "Galaxy Z Flip 5", price: 139999, image: "images/phone-5.jpg" },
  { brand: "Google", name: "Pixel 8 Pro", price: 109999, image: "images/phone-6.jpg" },
  { brand: "Google", name: "Pixel 8a", price: 64999, image: "images/phone-1.jpg" },
  { brand: "OnePlus", name: "OnePlus 12", price: 99999, image: "images/phone-2.jpg" },
  { brand: "Xiaomi", name: "Xiaomi 14", price: 104999, image: "images/phone-3.jpg" },
  { brand: "Redmi", name: "Redmi Note 13 Pro", price: 34999, image: "images/phone-4.jpg" },
  { brand: "Tecno", name: "Camon 30", price: 34999, image: "images/phone-5.jpg" },
  { brand: "Tecno", name: "Spark 20", price: 19999, image: "images/phone-6.jpg" },
  { brand: "Infinix", name: "Note 40 Pro", price: 34999, image: "images/phone-1.jpg" },
  { brand: "Infinix", name: "Hot 40i", price: 16999, image: "images/phone-2.jpg" },
  { brand: "OPPO", name: "Reno11 F", price: 49999, image: "images/phone-3.jpg" },
  { brand: "Vivo", name: "V30", price: 64999, image: "images/phone-4.jpg" },
  { brand: "Huawei", name: "Nova 12i", price: 35999, image: "images/phone-5.jpg" },
  { brand: "Nokia", name: "G42", price: 29999, image: "images/phone-6.jpg" },
  { brand: "Motorola", name: "Edge 40 Neo", price: 52999, image: "images/phone-1.jpg" },
  { brand: "Realme", name: "12 Pro", price: 44999, image: "images/phone-2.jpg" },
  { brand: "HONOR", name: "X9b", price: 46999, image: "images/phone-3.jpg" },
  { brand: "Nothing", name: "Phone (2a)", price: 49999, image: "images/phone-4.jpg" },
  { brand: "itel", name: "P55", price: 16999, image: "images/phone-5.jpg" },
  { brand: "Sony", name: "Xperia 10 V", price: 89999, image: "images/phone-6.jpg" }
];

const cart = new Map();
const products = document.querySelector("#products");
const searchInput = document.querySelector("#search-input");
const brandFilter = document.querySelector("#brand-filter");
const sortOrder = document.querySelector("#sort-order");
const productCount = document.querySelector("#product-count");
const cartCountElement = document.querySelector("#cart-count");
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

function formatPrice(price) {
  return `KSh ${new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0
  }).format(price)}`;
}

function renderPhones() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedBrand = brandFilter.value;
  const sort = sortOrder.value;
  const matches = phones.filter((phone) => {
    const matchesQuery = `${phone.brand} ${phone.name}`.toLowerCase().includes(query);
    const matchesBrand = selectedBrand === "all" || phone.brand === selectedBrand;
    return matchesQuery && matchesBrand;
  });

  if (sort === "price-low") matches.sort((a, b) => a.price - b.price);
  if (sort === "price-high") matches.sort((a, b) => b.price - a.price);
  if (sort === "name") matches.sort((a, b) => a.name.localeCompare(b.name));

  productCount.textContent = `Showing ${matches.length} of ${phones.length} phones`;
  if (!matches.length) {
    products.innerHTML = '<p class="empty">No phones match that search. Try another brand or model.</p>';
    return;
  }

  products.innerHTML = matches.map((phone) => `
    <article class="card">
      <div class="phone-art">
        <img src="${phone.image}" alt="${phone.brand} ${phone.name}" loading="lazy">
        <span class="phone-badge">${phone.brand}</span>
      </div>
      <div class="card-body">
        <h3>${phone.name}</h3>
        <div class="card-footer">
          <span class="price">${formatPrice(phone.price)}</span>
          <button class="add-button" type="button" data-phone="${phone.name}">
            Add to cart <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function updateCartCount() {
  let totalItems = 0;
  for (const quantity of cart.values()) totalItems += quantity;
  cartCountElement.textContent = totalItems;
  cartCountElement.setAttribute("aria-label", `${totalItems} items`);
}

function renderCart() {
  const entries = Array.from(cart.entries());
  if (!entries.length) {
    cartItems.innerHTML = '<div class="cart-empty"><span aria-hidden="true">＋</span><p>Your cart is empty.</p><span>Add a phone to see it here.</span></div>';
  } else {
    cartItems.innerHTML = entries.map(([name, quantity]) => {
      const phone = phones.find((item) => item.name === name);
      return `
        <article class="cart-item">
          <img src="${phone.image}" alt="">
          <div class="cart-item-info">
            <strong>${phone.brand} ${phone.name}</strong>
            <span>${formatPrice(phone.price)} each</span>
            <div class="quantity-controls" aria-label="Quantity for ${phone.name}">
              <button type="button" data-cart-action="decrease" data-phone="${phone.name}" aria-label="Decrease ${phone.name} quantity">−</button>
              <span>${quantity}</span>
              <button type="button" data-cart-action="increase" data-phone="${phone.name}" aria-label="Increase ${phone.name} quantity">+</button>
              <button class="remove-item" type="button" data-cart-action="remove" data-phone="${phone.name}">Remove</button>
            </div>
          </div>
          <strong class="cart-line-total">${formatPrice(phone.price * quantity)}</strong>
        </article>
      `;
    }).join("");
  }

  const total = entries.reduce((sum, [name, quantity]) => {
    const phone = phones.find((item) => item.name === name);
    return sum + phone.price * quantity;
  }, 0);
  cartTotal.textContent = formatPrice(total);
  updateCartCount();
}

function populateBrandFilter() {
  const brands = [...new Set(phones.map((phone) => phone.brand))]
    .sort((a, b) => a.localeCompare(b));
  brands.forEach((brand) => {
    const option = document.createElement("option");
    option.value = brand;
    option.textContent = brand;
    brandFilter.append(option);
  });
}

searchInput.addEventListener("input", renderPhones);
brandFilter.addEventListener("change", renderPhones);
sortOrder.addEventListener("change", renderPhones);

products.addEventListener("click", (event) => {
  const button = event.target.closest("[data-phone]");
  if (!button || !button.classList.contains("add-button")) return;

  const name = button.dataset.phone;
  cart.set(name, (cart.get(name) || 0) + 1);
  renderCart();
  button.innerHTML = "Added <span aria-hidden=\"true\">✓</span>";
  window.setTimeout(() => {
    if (button.isConnected) button.innerHTML = "Add to cart <span aria-hidden=\"true\">+</span>";
  }, 900);
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;

  const { phone, cartAction } = button.dataset;
  const quantity = cart.get(phone);
  if (cartAction === "increase") cart.set(phone, quantity + 1);
  if (cartAction === "decrease" && quantity > 1) cart.set(phone, quantity - 1);
  if (cartAction === "decrease" || cartAction === "remove") {
    if (cartAction === "remove" || quantity === 1) cart.delete(phone);
  }
  renderCart();
});

document.querySelector("#open-cart").addEventListener("click", () => cartDialog.showModal());
document.querySelector("#close-cart").addEventListener("click", () => cartDialog.close());
document.querySelector("#clear-cart").addEventListener("click", () => {
  cart.clear();
  renderCart();
});
document.querySelector(".cart-directions").addEventListener("click", () => cartDialog.close());
cartDialog.addEventListener("click", (event) => {
  if (event.target === cartDialog) cartDialog.close();
});

populateBrandFilter();
renderPhones();
renderCart();
