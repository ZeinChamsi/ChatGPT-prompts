let cart = [];

function addToCart(name, price) {
   let item = cart.find(p => p.name === name);

   if (item) {
       item.quantity++;
   } else {
       cart.push({ name, price, quantity: 1 });
   }

   updateCart();
}

function updateCart() {
   let cartItems = document.getElementById("cart-items");
   let total = 0;
   let count = 0;

   cartItems.innerHTML = "";

   cart.forEach((item, index) => {
       total += item.price * item.quantity;
       count += item.quantity;

       cartItems.innerHTML += `
           <div>
               ${item.name} (${item.quantity}) - ${item.price * item.quantity} kr
               <button onclick="changeQty(${index}, 1)">+</button>
               <button onclick="changeQty(${index}, -1)">-</button>
               <button onclick="removeItem(${index})">Ta bort</button>
           </div>
       `;
   });

   // Fri frakt över 599
   let shippingCost = document.getElementById("shipping").value;
   if (total >= 599) shippingCost = 0;

   document.getElementById("total-price").innerText = total + parseInt(shippingCost);
   document.getElementById("cart-count").innerText = count;
}

function changeQty(index, change) {
   cart[index].quantity += change;
   if (cart[index].quantity <= 0) cart.splice(index, 1);
   updateCart();
}

function removeItem(index) {
   cart.splice(index, 1);
   updateCart();
}

function toggleCart() {
   document.getElementById("cart").classList.toggle("hidden");
}

function checkout() {
   alert("Tack för ditt köp!");
   cart = [];
   updateCart();
}

function filterProducts(category) {
   let products = document.querySelectorAll(".product");

   products.forEach(p => {
       if (category === "all" || p.classList.contains(category)) {
           p.style.display = "block";
       } else {
           p.style.display = "none";
       }
   });
}

