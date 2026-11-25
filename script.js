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

let cartCount = 0;
const products = document.querySelector("#products");
const searchInput = document.querySelector("#search-input");
const cartCountElement = document.querySelector("#cart-count");

function formatPrice(price) {
  return `KSh ${new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0
  }).format(price)}`;
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
