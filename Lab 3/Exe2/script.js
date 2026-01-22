let cart = [];
let couponDiscount = 0;

function addItem(name, price, category) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, category, quantity: 1 });
    }
    renderCart();
}

function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
}

function updateQuantity(name, amount) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) removeItem(name);
    }
    renderCart();
}

function applyCoupon() {
    const code = document.getElementById('coupon-input').value.trim().toUpperCase();
    if (code.startsWith("SAVE") && code.length > 4) {
        const percent = parseInt(code.substring(4));
        if (!isNaN(percent)) {
            couponDiscount = percent / 100;
        }
    } else {
        couponDiscount = 0;
        alert("Invalid Coupon. Use format SAVE10, SAVE20 etc.");
    }
    renderCart();
}

function renderCart() {
    const itemsList = document.getElementById('cart-items');
    const logList = document.getElementById('log-list');
    const totalDisplay = document.getElementById('total-price');
    
    itemsList.innerHTML = '';
    logList.innerHTML = '';
    
    let subtotal = 0;
    let totalDiscount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const li = document.createElement('li');
        li.innerHTML = `${item.name} - Rs. ${item.price} x ${item.quantity} 
            <button onclick="updateQuantity('${item.name}', 1)">+</button>
            <button onclick="updateQuantity('${item.name}', -1)">-</button>
            <button onclick="removeItem('${item.name}')">Remove</button>`;
        itemsList.appendChild(li);

        if (item.quantity >= 5) {
            const bulkDisc = itemTotal * 0.1;
            totalDiscount += bulkDisc;
            addLog(`Bulk Discount (10%) for ${item.name}: -Rs. ${bulkDisc.toFixed(2)}`);
        }

        if (item.category === 'Electronics' && itemTotal > 150000) {
            const catDisc = itemTotal * 0.05;
            totalDiscount += catDisc;
            addLog(`Category Discount (5%) for ${item.name} Electronics: -Rs. ${catDisc.toFixed(2)}`);
        }
    });

    const hour = new Date().getHours();
    if (hour >= 18 && hour <= 21) {
        const happyHourDisc = (subtotal - totalDiscount) * 0.1;
        totalDiscount += happyHourDisc;
        addLog(`Happy Hour Discount (10%): -Rs. ${happyHourDisc.toFixed(2)}`);
    }

    if (couponDiscount > 0) {
        const cpDisc = (subtotal - totalDiscount) * couponDiscount;
        totalDiscount += cpDisc;
        addLog(`Coupon Discount (${couponDiscount * 100}%): -Rs. ${cpDisc.toFixed(2)}`);
    }

    const finalTotal = subtotal - totalDiscount;
    totalDisplay.innerText = finalTotal.toLocaleString('en-IN');

    function addLog(message) {
        const logItem = document.createElement('li');
        logItem.innerText = message;
        logList.appendChild(logItem);
    }
}