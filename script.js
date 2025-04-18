// المفاتيح الخاصة بالتخزين المحلي
const CART_ITEMS_KEY = "cart";
const ORDERS_KEY = "orders";
const STORE_STATUS_KEY = "storeStatus";
const OWNER_KEY = "saad_grocery_owner_token";

// قناة البث للتواصل بين النوافذ والأجهزة المختلفة
const channel = new BroadcastChannel('store-status');

// إضافة منتج إلى سلة المشتريات
function addToCart(id, name, price) {
    if (localStorage.getItem(STORE_STATUS_KEY) === 'block') {
        alert('المتجر مغلق حالياً. لا يمكن إضافة منتجات إلى السلة.');
        return;
    }
    
    const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS_KEY)) || [];
    const existingItem = cartItems.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ id, name, price, quantity: 1 });
    }
    
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cartItems));
    updateCartCount();
    
    // إظهار رسالة تأكيد للمستخدم
    alert(`تمت إضافة ${name} إلى سلة المشتريات`);
}

// تحديث عدد العناصر في السلة
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS_KEY)) || [];
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// التوجيه إلى صفحة السلة
function redirectToCartPage() {
    if (localStorage.getItem(STORE_STATUS_KEY) === 'block') {
        alert('المتجر مغلق حالياً. لا يمكن عرض السلة.');
        return;
    }
    window.location.href = 'cart.html';
}

// إزالة منتج من السلة
function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem(CART_ITEMS_KEY)) || [];
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cartItems));
    displayCartItems();
    updateCartCount();
}

// عرض محتويات السلة
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS_KEY)) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>سلة المشتريات فارغة</p>';
        return;
    }
    
    let totalPrice = 0;
    
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement
