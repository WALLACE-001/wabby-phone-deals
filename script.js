const phones = [
  { brand: "Apple", name: "iPhone 15 Pro", price: 999, image: "images/phone-1.jpg" },
  { brand: "Samsung", name: "Galaxy S24", price: 799, image: "images/phone-2.jpg" },
  { brand: "Google", name: "Pixel 8 Pro", price: 899, image: "images/phone-3.jpg" },
  { brand: "OnePlus", name: "OnePlus 12", price: 699, image: "images/phone-4.jpg" },
  { brand: "Samsung", name: "Galaxy Z Flip 5", price: 999, image: "images/phone-5.jpg" },
  { brand: "Xiaomi", name: "Xiaomi 14", price: 649, image: "images/phone-6.jpg" }
];

let cartCount = 0;
const products = document.querySelector("#products");
const searchInput = document.querySelector("#search-input");
const cartCountElement = document.querySelector("#cart-count");

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}

function renderPhones(items) {
  if (!items.length) {
    products.innerHTML = '<p class="empty">No phones found.</p>';
    return;
  }

  products.innerHTML = items.map((phone) => `
    <article class="card">
      <div class="phone-art">
        <img src="${phone.image}" alt="${phone.brand} ${phone.name}">
      </div>
      <div class="card-body">
        <div class="brand-name">${phone.brand}</div>
        <h2>${phone.name}</h2>
        <div class="card-footer">
          <span class="price">${formatPrice(phone.price)}</span>
          <button class="add-button" type="button" data-name="${phone.name}">
            Add to cart
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  const matches = phones.filter((phone) =>
    `${phone.brand} ${phone.name}`.toLowerCase().includes(query)
  );
  renderPhones(matches);
});

products.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button");
  if (!button) return;

  cartCount += 1;
  cartCountElement.textContent = cartCount;
  button.textContent = "Added!";
  setTimeout(() => { button.textContent = "Add to cart"; }, 800);
});

renderPhones(phones);
