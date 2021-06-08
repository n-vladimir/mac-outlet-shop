$(document).ready(function () {
    $('.single-item').slick();
});

const DEF = 'def';
const ASC = 'asc';
const DESC = 'desc';
const sortByPrice = document.querySelector('#sortByPrice');

class View {
    constructor(){
        this.renderCards(items);
        this.bindInputChange();
    }
    renderCards(arr) {
        const containerElem = document.querySelector('.device__items');
        containerElem.innerHTML = '';
        arr.forEach((itemProduct) => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item';
            itemCard.innerHTML += `
                    <div class="device_item" data-id="${itemProduct.id}">
                        <i class="fas fa-heart like"></i>
                        <img class="imgDevice" src="img/${itemProduct.imgUrl}" alt="device ${itemProduct.name}">
                        <h2 class="nameDevice">${itemProduct.name}</h2>
                        <p class="availability">
                        ${(function () {
                if(itemProduct.orderInfo.inStock > 0){
                    return '<img class="imgAvailability" src="img/icons/checkDevice.svg" alt="imgAvailability">';
                } else {
                    return '<img class="imgAvailability" src="img/icons/close.svg" alt="imgAvailability">';
                }
            })()}
                        ${itemProduct.orderInfo.inStock} left in stock</p>
                        <p class="priceDevice"> Price: ${itemProduct.price} $</p>
                    </div>
            `;
            containerElem.append(itemCard);

            const btnCartAdd = document.createElement('button');
            btnCartAdd.className = 'btnDevice';
            if (itemProduct.orderInfo.inStock === 0) btnCartAdd.className = 'btnDevice disabled';
            btnCartAdd.innerText = 'Add to cart';
            btnCartAdd.onclick = function () {
                cart.addToCart(itemProduct)
            };

            itemCard.appendChild(btnCartAdd);
            itemCard.insertAdjacentHTML('beforeend', `
                <div class="device_about">
                    <img class="like" src="img/icons/like_filled_red.svg" alt="like">
                    <span class="reviews"><span class="procent">${itemProduct.orderInfo.reviews}%</span> Positive reviews Above avarage</span>
                    <span class="num">560<span class="ins"> orders</span></span>
                </div>
            `);
            containerElem.append(itemCard);
        });
        const btnDevice = document.querySelectorAll('.btnDevice');
        const deviceItem = document.querySelectorAll('.device_item');
        deviceItem.forEach((itemDom) => {
            itemDom.onclick = function (e) {
                if (itemDom === e.currentTarget && !['fas fa-heart like like-full', 'fas fa-heart like'].includes(e.target.classList.value)) {
                    const item = items.find((_item) => String(_item.id) === String(itemDom.getAttribute('data-id')));
                    new Modal({ itemToShow: item });
                }
            }
        })
    }

    bindInputChange(){
        const inputSearch = document.querySelector('#inputSearch');
        inputSearch.oninput = (event) => {
            findService.search = event.target.value;
        }
    }
}
<<<<<<< HEAD
const view = new View();

class Modal {
    constructor(props) {
        if (!props.itemToShow) {
            throw 'Modal expects item';
        }
        this.modalElement = props.modalElement || document.querySelector('.modal');
        this.itemToShow = props.itemToShow;
        this.buildDom();
        this.toggleOpen();
        this.launchModalListeners();
    }
    buildDom() {
        const createPreview = () =>
            `
            <div class="imgUnit">
                <img class="imgDevice" src="img/${this.itemToShow.imgUrl}" alt="device ${this.itemToShow.name}">
            </div>
            `;

        const createItemDescription = () =>
            `
                <div class="infoUnit">
                    <h2 class="nameDevice">${this.itemToShow.name}</h2>
                    <div class="device_about">
                        <img class="like" src="img/icons/like_filled_red.svg" alt="like">
                        <span class="reviews"><span class="procent">50%</span> Positive reviews Above avarage</span>
                        <span class="num">560<span class="ins"> orders</span></span>
                    </div>
                    <ul class="infoItem">
                        <li><p>Color: <span>${this.itemToShow.color}</span></p></li>
                        <li><p>Operation System: <span>${this.itemToShow.os}</span></p></li>
                        <li><p>Chip: <span>${this.itemToShow.chip.name}</span></p></li>
                        ${
                            Object.entries(this.itemToShow.size).map(([key,value]) => {
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
                </div>
            `;
        const createModalActions = () => `
            <div class="priceAndBtnUnit">
                <p class="priceDevice">$ ${this.itemToShow.price}</p>
                <p>${this.itemToShow.orderInfo.inStock} left in stock</p>
            </div>
            `;
        const createBody = () => `<div class="modal__container">
            ${createPreview()}
            ${createItemDescription()}
            ${createModalActions()}
        </div>`;
        const child = this.modalElement.children[0];
        if (child) {
            this.modalElement.removeChild(child);
        }
        this.appendIntoModal(createBody());
    }
    appendIntoModal(element) {
        this.modalElement.insertAdjacentHTML('afterbegin', element);
    }
    toggleOpen() {
        this.modalElement.classList.toggle('active--modal');
    }
    launchModalListeners() {
        // this -> instance of Modal
        this.modalElement.onclick = function(e) {
            if(this.modalElement === e.target) {
                this.toggleOpen();
            }
        }.bind(this);
    }
}

const btnLike = document.querySelectorAll('.like');
btnLike.forEach((item) => {
    item.onclick = function (event) {
        item.classList.toggle('like-full');
    }
});

class SortPriceAndSearch {
    #items = [...items];
    #options = {
        sort: DEF,
    };
    constructor() {}

    set options(optionsA) {
        Object.assign(this.#options, optionsA);
        this.sortByPrice();
        view.renderCards(this.#items);
    }
    set itemsProduct(arr) {
        this.#items = arr.map((item) => {
            const newItem = {...item};
            return newItem;
        });
    }
=======
launchListHandlers(listHandlers);

const inputSearch = document.querySelector('#inputSearch');
const sortByPrice = document.querySelector('#sortByPrice');
>>>>>>> 6659835b6b3ed87f1a0b220e8ebed541cf9cd2e8

    get itemsProduct() {
        return [...this.#items];
    }

    sortByPrice() {
        const items = [...sortAndSearch.itemsProduct];
        switch (this.#options.sort) {
            case DEF: {
                return sortAndSearch.itemsProduct = items.sort((a,b) => {
                    return a.id - b.id;
                });
            }
<<<<<<< HEAD
            case ASC: {
                return sortAndSearch.itemsProduct = items.sort((a,b) => {
                    return a.price - b.price;
                });
            }
            case DESC: {
                return sortAndSearch.itemsProduct = items.sort((a, b) => {
                    return b.price - a.price;
                });
            }
        }
    }
}
=======
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
>>>>>>> 6659835b6b3ed87f1a0b220e8ebed541cf9cd2e8

const sortAndSearch = new SortPriceAndSearch();

<<<<<<< HEAD
sortByPrice.onchange = function () {
    sortAndSearch.options = {sort: this.value};
=======
const renderCards = (item) => {
    const containerElem = document.querySelector('.device__items');
    containerElem.innerHTML = '';
    if(!item.length) {
        containerElem.innerHTML = '<h1>Product not found</h1>';
        return;
    }
    const arrOfCardElems = item.map(item => renderCard(item));
    containerElem.append(...arrOfCardElems);
>>>>>>> 6659835b6b3ed87f1a0b220e8ebed541cf9cd2e8
};

class FindService {
    #price = [];
    #search = '';
    #os = [];
    #colors = [];
    #storage = [];
    constructor() {}

    get price() {
        return this.#price;
    }
    set price(price){
        this.#price = price;
        this.renderFilteredItems();
    }

<<<<<<< HEAD
    get search() {
        return this.#search.toLowerCase();
    }
    set search(value) {
        this.#search = value;
        this.renderFilteredItems();
    }
=======
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




>>>>>>> 6659835b6b3ed87f1a0b220e8ebed541cf9cd2e8

    get colors() {
        return this.#colors;
    }
    set colors(color) {
        if (this.#colors.includes(color)) {
            this.#colors = this.#colors.filter(c => color !== c)
        } else {
            this.#colors.push(color)
        }
        this.renderFilteredItems();
    }
    get os() {
        return this.#os;
    }
    set os(os) {
        if(this.#os.includes(os)) {
            this.#os = this.#os.filter(sys => os !== sys);
        } else {
            this.#os.push(os)
        }
        this.renderFilteredItems();
    }
    get storage() {
        return this.#storage;
    }
    set storage(storage) {
        if(this.#storage.includes(storage)) {
            this.#storage = this.#storage.filter(ram => storage !== ram);
        } else {
            this.#storage.push(storage)
        }
        this.renderFilteredItems();
    }
    getFilteredItems() {
        return items.filter((item) => {
           const inSearch = item.name.toLowerCase().includes(this.search);
           if(!inSearch) return false;

            const isPrice = !this.price.length || (item.price >= this.price[0] &&  item.price <= this.price[1]);
            if(!isPrice) return false;

           let isColorExist = !this.colors.length;
           this.colors.forEach((color) => {
               if(item.color.includes(color)){
                   isColorExist = true;
               }
           });
            if(!isColorExist) return false;

            let isOsExist = !this.os.length;
            this.os.forEach(os => {
                if (item.os === os) {
                    isOsExist = true;
                }
            });
            if (!isOsExist) return false;

            let isStorageExist = !this.storage.length;
            this.storage.forEach(storage => {
                if (item.storage === storage) {
                    isStorageExist = true;
                }
            });
            if (!isStorageExist) return false;

            return true;
        });
    }
    renderFilteredItems() {
        const res = this.getFilteredItems();
        view.renderCards(res);
    }
}
const findService = new FindService();

class Filters {
    constructor() {
        this.data = [
            {
                name: 'Price',
                className: 'PriceFilter',
                options: this.initialPrice,
                type: 'price',
            },
            {
                name: 'Color',
                className: 'ColorFilter',
                options: this.initialColors,
                type: 'colors',
            },
            {
                name: 'OS',
                className: 'OSFilter',
                options: this.initialOS,
                type: 'os',
            },
            {
                name: 'Storage',
                className: 'storageClass',
                options: this.initialStorage,
                type: 'storage',
            }
        ];
        this.renderFilters()
    }

    get initialColors() {
        const arrOfColors = [];
        items
            .map((item) => item.color)
            .forEach((colors) => {
                const res = colors.filter((color) => !arrOfColors.includes(color));
                arrOfColors.push(...res)
            });
        return arrOfColors;
    };
    get initialPrice() {
        return [350, 1350];
    }
    get initialStorage() {
        return items
            .map((item) => item.storage)
            .filter((item, index, arr) => arr.indexOf(item) === index && item !== null);
    }
    get initialOS() {
        return items
            .map((item) => item.os)
            .filter((item, index, arr) => arr.indexOf(item) === index && item !== null);
    };

    renderFilter(filterData) {
        const c_select = document.createElement('div');
        c_select.className = (`c_select ${filterData.className}`);
        c_select.innerHTML = `
            <div class="nameSelect select-${filterData.className}">
                <span>${filterData.name}</span>
                <button class="arrow"><img src="img/icons/arrow_left.svg" alt=""></button>
            </div>
        `;
        switch (filterData.name) {
            case "Price": {
                const valueFrom = filterData?.options[0] || 0;
                const valueTo = filterData?.options[1] || 0;
                const filters = document.createElement('div');
                const onSubmit = (e) => {
                    e.preventDefault();
                    const valueFrom = document.getElementById('price-from').value;
                    const valueTo = document.getElementById('price-to').value;
                    findService[filterData.type] = [valueFrom, valueTo];
                }
                const submitButton = document.createElement('button');
                submitButton.id = 'submit-input-prices';
                submitButton.innerText = 'Submit';
                submitButton.onclick = (e) => onSubmit(e);
                filters.className = ('itemsSelect');
                filters.insertAdjacentHTML('afterbegin', `
                    <div class="nameSelect input-${filterData.className}">
                        <input type="number" id="price-from" value="${valueFrom}">
                        <input type="number" id="price-to" value="${valueTo}">
                        <div id="button-submit-holder"></div>
                    </div>
                `);
                filters.querySelector('#button-submit-holder').appendChild(submitButton);
                c_select.appendChild(filters);
                break;
            }
            default: {
                filterData.options.forEach((option) => {
                    const itemsSelect = document.createElement('div');
                    itemsSelect.className = ('itemsSelect');
                    const label = document.createElement('label');
                    label.innerText = option;
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';

                    checkbox.onchange = () => {
                        findService[filterData.type] = option;
                    };

                    label.appendChild(checkbox);
                    itemsSelect.appendChild(label);
                    c_select.appendChild(itemsSelect);
                });
            }
        }

        return c_select;
    }

    renderFilters() {
        const formFilter = document.querySelector('#leftFilter');

        formFilter.append(...this.data.map((item) => this.renderFilter(item)));

    }
}
new Filters();
