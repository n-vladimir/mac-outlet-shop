let basketIcon = document.querySelector('.basketNum');

class Cart {
    constructor(props) {
        this.cartItems = props.items || [];
        this.totalPrice = props.totalPrice || 0;
        this.totalCartItems = props.totalCartItems || 0;
        this.update();
    }
    addToCart(item) {
        const itemAlreadyExists = this.getItemById(item.id);
        if (itemAlreadyExists) {
            itemAlreadyExists.amount < 4 && itemAlreadyExists.amount++;
        } else {
            if(item.orderInfo.inStock >= 1) {
                this.cartItems.push({
                    data: item,
                    amount: 1,
                    id: item.id,
                });
            }
        }
        this.update();
    }
    getItemById(itemId) {
        return this.cartItems.find((cartItem) => String(cartItem.id) === String(itemId));
    }
    removeFromCart(itemId) {
        this.cartItems = this.cartItems.filter((cartItem) => String(cartItem.id) !== String(itemId));
        this.update();
    }
    plusMinusFromCart(itemId, minus = false) {
        const item = this.getItemById(itemId);
        if (minus) {
            if(item.amount > 1) {
                item.amount--;
            }
        } else {
            if(item.amount < 4) {
                item.amount++;
            }
        }
        this.update();
    }
    recalculateTotal() {
        const totalParams = this.cartItems.reduce((acum, item) => {
            return {
                totalItems: acum.totalItems + item.amount,
                totalPrice: acum.totalPrice + (item.amount * item.data.price),
            }
        },{totalItems: 0, totalPrice: 0});
        this.totalPrice = totalParams.totalPrice;
        this.totalCartItems = totalParams.totalItems;
        basketIcon.innerText = totalParams.totalItems;
    }
    update() {
        this.recalculateTotal();
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
        this.renderCart();
    }
    renderCart() {
        const cartEl = document.querySelector('.items__device_list');
        cartEl.innerHTML = '';
        this.cartItems.forEach((item) => {
            cartEl.innerHTML += `
            <div class="item-device" data-id="${item.id}">
                <div class="image">
                    <img src="img/${item.data.imgUrl}" alt="#" />
                </div>
                <div class="description">
                    <span>${item.data.name}</span>
                    <div class="total-price">$ ${item.data.price}</div>
                </div>
                <div class="quantity">
                    <button class="minus-btn" type="button" name="button"><</button>
                    <input type="text" name="name" value="${item.amount}" class="numInput">
                    <button class="plus-btn" type="button" name="button">></button>
                </div>
                <button class="delete-btn">&#10006;</button>
            </div>
        `
        });
        cartEl.innerHTML += `
        <div class="totalAndPrice">
            <span>Total amount: <span class="total_cart">${this.totalCartItems} ptc.</span></span>
            <span>Total price: <span class="total_price">${this.totalPrice} $</span></span>
        </div>
        `;
        cartEl.onclick = function (e) {
            const targetClass = e.target.className;
            const actionClasses = ['delete-btn', 'plus-btn', 'minus-btn'];
            if (actionClasses.includes(targetClass)) {
                const itemId = e.target.closest('.item-device').getAttribute('data-id');
                if (targetClass === 'delete-btn') {
                    this.removeFromCart(itemId);
                } else {
                    this.plusMinusFromCart(itemId, targetClass === 'minus-btn');
                }
            }
        }.bind(this);
    }
}
const getItemsFromLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('cart'));
    } catch (e) {
        return [];
    }
};
const cart = new Cart({ items: getItemsFromLocalStorage() });

const cartClick = document.querySelector('.container_cart');
const modalCheck = document.querySelector('.cart__modal-check');
cartClick.onclick = function (e) {
    if(e.target.className === 'container_cart' || e.target.className === 'cart__img' || e.target.className === 'basketNum') {
        modalCheck.classList.toggle('cart__modal-check-active')
    }

};



