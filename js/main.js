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


//-----------------------modal

const showModal = (data) => {
  const modal = document.querySelector('.modal');

};










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
    divElemItemInfo.appendChild(btn);

    divElemItemAbout.innerHTML = `
        <img class="like" src="img/icons/like_filled_red.svg" alt="like">
        <span class="reviews"><span class="procent">${item.orderInfo.reviews}%</span> Positive reviews Above avarage</span>
        <span class="num">560<span class="ins"> orders</span></span>
    `;
    // divElemItemInfo.appendChild(btnLike);
    divElemItem.appendChild(divElemItemInfo);
    divElemItem.appendChild(divElemItemAbout);


    return divElemItem;

};

const renderCards = (item) => {
    const containerElem = document.querySelector('.device__items');
    containerElem.innerHTML = '';
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










