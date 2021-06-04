const listHandlers = [
    { btnSelector: '#btnInputFilter', containerSelector: '.filter__container', toggleClassName: 'active' },
    { btnSelector: '#btnInputPrice', containerSelector: '.orderListBtnInputPrice', toggleClassName: 'active' },
    { btnSelector: '.select-PriceFilter', containerSelector: '.PriceFilter .itemsSelect', toggleClassName: 'activeFilterName' },
    { btnSelector: '.select-ColorFilter', containerSelector: '.ColorFilter .itemsSelect', toggleClassName: 'activeFilterName' },
    { btnSelector: '.select-OSFilter', containerSelector: '.OSFilter .itemsSelect', toggleClassName: 'activeFilterName' },
    { btnSelector: '.select-storageClass', containerSelector: '.storageClass .itemsSelect', toggleClassName: 'activeFilterName' },
];
function launchListHandlers(handlers) {
    handlers.forEach((handler) => {
        const btnElements = document.querySelectorAll(handler.btnSelector);
        const containers = document.querySelectorAll(handler.containerSelector);
        const toggleClassContainers = () => {
            for (let k = 0; k < containers.length; k++) {
                containers[k].classList.toggle(handler.toggleClassName);
            }
        };
        for (let i = 0; i < btnElements.length; i++) {
            btnElements[i].onclick = function (e) {
                e.preventDefault();
                toggleClassContainers();
            }
        }
    });
}
launchListHandlers(listHandlers);