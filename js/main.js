$(document).ready(function () {
    $('.single-item').slick();
});

const listHandlers = [
    { btnSelector: '#btnInputFilter', containerSelector: '.filter__container', toggleClassName: 'active' },
    { btnSelector: '#btnInputPrice', containerSelector: '.orderListBtnInputPrice', toggleClassName: 'active' },
    { btnSelector: '.nameSelect', containerSelector: '.itemsSelect', toggleClassName: 'activeFilterName' },
];
function launchListHandlers(handlers) {
    handlers.forEach((handler) => {
        const btnElements = document.querySelectorAll(handler.btnSelector);
        const containers = document.querySelectorAll(handler.containerSelector);
        for (let i = 0; i < btnElements.length; i++) {
            btnElements[i].onclick = function (e) {
                e.preventDefault();
                if (containers[i]) {
                    containers[i].classList.toggle(handler.toggleClassName);
                }
            }
        }
    });
}
launchListHandlers(listHandlers);

const inputSearch = document.querySelector('#inputSearch');
const sortByPrice = document.querySelector('#sortByPrice');

//-----------------renderCard
/**
 *
 * @param item
 * @returns {HTMLDivElement}
 */
const renderCard = (item) => {
    const divElemItem = document.createElement('div');
    const divElemItemInfo = document.createElement('div');
    const divElemItemAbout = document.createElement('div');
    divElemItem.className = 'item';
    divElemItemInfo.className = 'device_item';
    divElemItemAbout.className = 'device_about';

    divElemItemInfo.innerHTML = `
        <i class="fas fa-heart like"></i>
        <img class="imgDevice" src="img/${item.imgUrl}" alt="device ${item.name}">
        <h2 class="nameDevice">${item.name}</h2>
        <p class="availability">
        ${(function () {
            if(item.orderInfo.inStock > 0){
                return '<img class="imgAvailability" src="img/icons/checkDevice.svg" alt="imgAvailability">';
            } else {
                return '<img class="imgAvailability" src="img/icons/close.svg" alt="imgAvailability">';
            }
        })()}
        ${item.orderInfo.inStock} left in stock</p>
        <p class="priceDevice"> Price: ${item.price} $</p>
    `;

    const btn = document.createElement('button');
    btn.className = 'btnDevice';
    btn.id = item.id;
    btn.innerText = 'Add to cart';
    if(item.orderInfo.inStock <= 0) btn.classList.add('disabled');
    btn.onclick = function (event) {
        showModal(item);
    };
    divElemItemInfo.appendChild(btn);

    divElemItemAbout.innerHTML = `
        <img class="like" src="img/icons/like_filled_red.svg" alt="like">
        <span class="reviews"><span class="procent">${item.orderInfo.reviews}%</span> Positive reviews Above avarage</span>
        <span class="num">560<span class="ins"> orders</span></span>
    `;
    divElemItem.appendChild(divElemItemInfo);
    divElemItem.appendChild(divElemItemAbout);


    return divElemItem;

};

const renderCards = (item) => {
    const containerElem = document.querySelector('.device__items');
    containerElem.innerHTML = '';
    if(!item.length) {
        containerElem.innerHTML = '<h1>Product not found</h1>';
        return;
    }
    const arrOfCardElems = item.map(item => renderCard(item));
    containerElem.append(...arrOfCardElems);
};

renderCards(items);


const btnLike = document.querySelectorAll('.like');
btnLike.forEach((item) => {
    item.onclick = function () {
        item.classList.toggle('like-full');
    }
});


//-----------------------modal

const showModal = (item) => {
    const modal = document.querySelector('.modal');
    modal.onclick = (event) => {
        if(modal === event.target) {
            modal.classList.remove('active--modal');
            document.body.style.overflow = '';
        }

    };
    modal.classList.add('active--modal');
    document.body.style.overflow = 'hidden';

    modal.querySelector('.imgUnit').innerHTML = `
        <img class="imgDevice" src="img/${item.imgUrl}" alt="device ${item.name}">
    `;
    modal.querySelector('.infoUnit').innerHTML = `
        <h2 class="nameDevice">${item.name}</h2>
        <div class="device_about">
            <img class="like" src="img/icons/like_filled_red.svg" alt="like">
            <span class="reviews"><span class="procent">50%</span> Positive reviews Above avarage</span>
            <span class="num">560<span class="ins"> orders</span></span>
        </div>
        <ul class="infoItem">
            <li><p>Color: <span>${item.color}</span></p></li>
            <li><p>Operation System: <span>${item.os}</span></p></li>
            <li><p>Chip: <span>${item.chip.name}</span></p></li>
            ${
        Object.entries(item.size).map(([key,value]) => {
            return `<li>
                         <p>${key[0].toUpperCase()+key.slice(1, key.length)}: <span>${value}</span>${(function () {
                            if(key === 'weight'){
                                return ' g';
                            } else {
                                return ' cm';
                            }
                            })()}</p>
                    </li>`
        }).join('')
        }
        </ul>
    `;

    modal.querySelector('.priceAndBtnUnit').innerHTML = `
        <p class="priceDevice">$ ${item.price}</p>
        <p>${item.orderInfo.inStock} left in stock</p>
        <button class="btnDevice">Add to cart</button>
    `;
};



/**
 * -------------------------------render SORT and SEARCH
 */
class SortPriceAndSearch {
    #items = [...items];
    #options = {
        find: '',
        sort: 'def',
    };
    constructor() {}

    set options(optionsA) {
        Object.assign(this.#options, optionsA);
        this.findByName();
        this.sortByPrice();
        renderCards(this.#items);
    }
    set itemsProduct(arr) {
        this.#items = arr.map((item) => {
            const newItem = {...item};
            return newItem;
        });

    }

    get itemsProduct() {
        return [...this.#items];
    }

    findByName() {
        sortAndSearch.itemsProduct = items.filter((item) => {
            return item.name.toLowerCase().includes(this.#options.find.toLowerCase())
        })
    }
    sortByPrice() {
        if(this.#options.sort === 'def') {
           this.#items = [...sortAndSearch.itemsProduct];
           return;
        }
        if(this.#options.sort === 'asc') {
            sortAndSearch.itemsProduct = sortAndSearch.itemsProduct.sort((a,b) => {
                const first = a.price;
                const second = b.price;
                return first - second;
            });
            return;
        }
        sortAndSearch.itemsProduct = sortAndSearch.itemsProduct.sort((a,b) => {
            const first = a.price;
            const second = b.price;
            return second - first;
        })
    }
}

const sortAndSearch = new SortPriceAndSearch();

inputSearch.oninput = function () {
  sortAndSearch.options = {find: this.value};
};
sortByPrice.onchange = function () {
    sortAndSearch.options = {sort: this.value};
};












