// التحقق من توفر localStorage قبل الاستخدام
let cart = [];

if (typeof localStorage !== "undefined") {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
}

function addToCart(productId, productName, productPrice) {
    let product = { id: productId, name: productName, price: productPrice, quantity: 1 };
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    if (typeof localStorage !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    updateCart();
}

function updateCart() {
    let cartContainer = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");

    if (!cartContainer || !cartCount) return;

    cartContainer.innerHTML = ""; // تفريغ السلة قبل إعادة التحديث
    cart.forEach((item, index) => {
        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p>${item.name}</p>
            <p style="margin-left: 10px;">${item.price} ريال</p>
            <button onclick="removeFromCart(${index})">❌</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function removeFromCart(index) {
    cart.splice(index, 1); // إزالة العنصر من المصفوفة

    if (typeof localStorage !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart)); // تحديث localStorage بعد الإزالة
    }

    updateCart(); // تحديث واجهة المستخدم بعد التحديث
}

function toggleCart() {
    let cartPopup = document.getElementById("cart-popup");
    if (cartPopup) {
        cartPopup.classList.toggle("active");
    }
}

function clearCart() {
    cart = [];

    if (typeof localStorage !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    updateCart();
}

// تحديث عدد المنتجات في السلة
function updateCartCount() {
    let cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// تحميل عدد المنتجات عند فتح الصفحة
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
        updateCart();
        updateCartCount();

        // تحقق من حالة المتجر
        if (localStorage.getItem("storeVisible") === "false") {
            document.querySelectorAll(".product").forEach(product => {
                product.style.display = "none";
            });
            document.getElementById("order-cart").style.display = "none"; // إخفاء زر "اطلب"
            document.getElementById("store-status").style.display = "block"; // إظهار رسالة "المتجر مغلق"
        } else {
            document.querySelectorAll(".product").forEach(product => {
                product.style.display = "block";
            });
            document.getElementById("order-cart").style.display = "block"; // إظهار زر "اطلب"
            document.getElementById("store-status").style.display = "none"; // إخفاء رسالة "المتجر مغلق"
        }
    });
}

function showCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("السلة فارغة!");
        return;
    }

    let cartDetails = "🛒 منتجاتك في السلة:\n";
    cart.forEach((product, index) => {
        cartDetails += `${index + 1}. ${product.name} - ${product.price} ريال\n`;
    });

    alert(cartDetails);
}

function orderCart() {
    if (cart.length === 0) {
        alert("السلة فارغة! لا يمكن تقديم طلب.");
        return;
    }

    let userName = prompt("ما اسم المستخدم؟");
    if (!userName) {
        alert("يجب إدخال اسم المستخدم لتقديم الطلب.");
        return;
    }

    let orderDetails = "🛒 طلبك:\n";
    cart.forEach((product, index) => {
        orderDetails += `${index + 1}. ${product.name} - ${product.price} ريال\n`;
    });

    // توليد رقم عشوائي مكون من أربعة أرقام
    let orderNumber = Math.floor(1000 + Math.random() * 9000);

    alert(`تم تقديم طلبك بنجاح، ${userName}:\n` + orderDetails + `رقم الطلب: ${orderNumber}`);
    clearCart(); // إفراغ السلة بعد تقديم الطلب
}