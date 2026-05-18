// -------------------------- ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ (ОТЗЫВЫ) --------------------------
const sections = document.querySelectorAll('.horizontal-section');

sections.forEach((section) => {

    const track = section.querySelector('.horizontal-track');
    const image = section.querySelector('.review-line');

    let maxScroll = 0;

    const update = () => {
        const scrollWidth = image.scrollWidth;
        const windowWidth = window.innerWidth;

        maxScroll = scrollWidth - windowWidth;
    };

    update();
    window.addEventListener('resize', update);

    window.addEventListener('scroll', () => {

        const rect = section.getBoundingClientRect();

        const sectionHeight = section.offsetHeight;
        const scrollY = -rect.top;

        const progress = Math.min(
            Math.max(scrollY / (sectionHeight - window.innerHeight), 0),
            1
        );

        const translateX = progress * maxScroll;

        track.style.transform = `translateX(-${translateX}px)`;
    });

});

// -------------------------- БУРГЕР МЕНЮ --------------------------
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
    mobileMenu.classList.add('active');
    burger.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    mobileMenu.classList.remove('active');
    burger.classList.remove('active');
    document.body.classList.remove('menu-open');
}

if (burger) {
    burger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
}

document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
            closeMenu();
        }
    }
});

mobileLinks.forEach(link => {
    if (!link.classList.contains('active')) {
        link.addEventListener('click', closeMenu);
    }
});

const closeBtn = document.querySelector('.mobile-close-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
}

// -------------------------- ФОРМА С ПОПАПОМ --------------------------
const form = document.getElementById("contactForm");

function openPopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    if (popupOverlay) {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    if (popupOverlay) {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        const tg = document.getElementById("tg");
        const phone = document.getElementById("phone");
        const message = document.getElementById("message");

        const fields = [tg, phone, message];

        fields.forEach(field => {
            const error = field.parentElement.querySelector(".error");

            if (!field.checkValidity()) {
                valid = false;

                if (field === tg) {
                    error.textContent = "Введите корректный Telegram (@username)";
                }

                if (field === phone) {
                    error.textContent = "Введите корректный номер телефона";
                }

                if (field === message) {
                    error.textContent = "Сообщение должно быть минимум 10 символов";
                }

            } else {
                error.textContent = "";
            }
        });

        if (valid) {
            openPopup();
            form.reset();
        }
    });
}

const popupClose = document.getElementById('popupClose');
const popupBtnOk = document.getElementById('popupBtnOk');
const popupOverlay = document.getElementById('popupOverlay');

if (popupClose) {
    popupClose.addEventListener('click', closePopup);
}

if (popupBtnOk) {
    popupBtnOk.addEventListener('click', closePopup);
}

if (popupOverlay) {
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
}

// -------------------------- ХЕДЕР (СМЕНА СТИЛЯ ПРИ СКРОЛЛЕ) --------------------------
const siteHeader = document.querySelector('.header');

const styleSections = [
    { id: '.main-container', className: 'header-transparent' },
    { id: '.pink', className: 'header-pink' },
    { id: '.weare', className: 'header-weare' },
    { id: '.pluses', className: 'header-pluses' },
    { id: '.classes', className: 'header-classes' },
    { id: '.talk', className: 'header-talk' },
    { id: '.horizontal-section', className: 'header-horizontal-section' }, 
    { id: '.faq', className: 'header-faq' },
    { id: '.contacts', className: 'header-contacts' },
    { id: '.tasks', className: 'header-tasks' },
    { id: '.merch', className: 'header-tasks' },
    { id: '.map-block', className: 'header-map-block' }
];

function updateHeaderStyle() {
    if (!siteHeader) return;
    
    const scrollPosition = window.scrollY + 100;
    let activeSection = null;
    
    for (const section of styleSections) {
        const elements = document.querySelectorAll(section.id);
        for (const element of elements) {
            if (!element) continue;
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                activeSection = section;
                break;
            }
        }
        if (activeSection) break;
    }

    const allClasses = styleSections.map(s => s.className);
    siteHeader.classList.remove(...allClasses, 'header-transparent', 'header-light');
    
    if (activeSection) {
        siteHeader.classList.add(activeSection.className);
    } else if (scrollPosition < 200) {
        siteHeader.classList.add('header-transparent');
    }
}

window.addEventListener('scroll', updateHeaderStyle);
window.addEventListener('resize', updateHeaderStyle);
updateHeaderStyle();

// -------------------------- ПЕРЕКЛЮЧЕНИЕ ФОТО ДЛЯ МЕРЧА --------------------------
document.querySelectorAll('.item1').forEach(item => {
    const btns = item.querySelectorAll('.btit .circle-btn');
    const productImg = item.querySelector('.card-wrapper .main-product-img');
    
    if (!productImg || btns.length === 0) return;
    
    function syncImageWithActiveButton() {
        btns.forEach((btn, index) => {
            if (btn.classList.contains('active')) {
                const imgSrc = btn.getAttribute('data-img');
                if (imgSrc && productImg.src !== imgSrc) {
                    productImg.src = imgSrc;
                }
            }
        });
    }
    
    syncImageWithActiveButton();
    
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            btns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const newSrc = this.getAttribute('data-img');
            if (newSrc) {
                productImg.src = newSrc;
            }
        });
    });
});

// -------------------------- КОРЗИНА С УВЕДОМЛЕНИЕМ И LOCALSTORAGE --------------------------
let cartCount = 0;
let cartItems = [];

const cartCountElement = document.querySelector('.cart-count');
const cartNotification = document.getElementById('cartNotification');
const cartNotificationSpan = cartNotification?.querySelector('span');

function getActiveVariant(item) {
    const btns = item.querySelectorAll('.btit .circle-btn');
    let activeVariant = '';
    
    btns.forEach((btn, index) => {
        if (btn.classList.contains('active')) {
            if (item.classList.contains('item-certificate')) {
                activeVariant = index === 0 ? 'розовый' : 'фиолетовый';
            }
            else if (item.classList.contains('item-bottle')) {
                activeVariant = index === 0 ? 'розовый' : 'черный';
            }
            else if (item.classList.contains('item-longsleeve')) {
                activeVariant = index === 0 ? 'черный' : 'розовый';
            }
            else if (item.classList.contains('item-tshirt')) {
                activeVariant = 'розовый';
            }
            else if (item.classList.contains('item-shopper')) {
                activeVariant = 'черный';
            }
            else if (item.classList.contains('item-candle')) {
                activeVariant = 'жасмин';
            }
            else {
                activeVariant = index === 0 ? 'вариант 1' : 'вариант 2';
            }
        }
    });
    
    return activeVariant;
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify({
        count: cartCount,
        items: cartItems
    }));
}

function loadCartFromLocalStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            cartCount = data.count || 0;
            cartItems = data.items || [];
            updateCartCount();
            updateCartPageDisplay();
        } catch(e) {
            console.error('Ошибка загрузки корзины', e);
        }
    }
}

function updateCartCount() {
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        if (cartCount === 0) {
            cartCountElement.style.opacity = '0.5';
        } else {
            cartCountElement.style.opacity = '1';
        }
    }
    saveCartToLocalStorage();
}

function showNotification(productName, variant) {
    if (cartNotification && cartNotificationSpan) {
        if (variant) {
            cartNotificationSpan.textContent = `${productName} (${variant})`;
        } else {
            cartNotificationSpan.textContent = productName;
        }
        cartNotification.classList.add('show');
        
        setTimeout(() => {
            cartNotification.classList.remove('show');
        }, 2000);
    }
}

// Добавляем обработчики на все кнопки корзины
document.querySelectorAll('.merch-cart-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const item = btn.closest('.item1');
        let productName = '';
        let productVariant = '';
        let productPrice = 0;
        let productImg = '';
        let productDescription = '';
        
        if (item) {
            const nameElement = item.querySelector('.itemtxt h1');
            if (nameElement) {
                productName = nameElement.textContent;
            }
            const priceElement = item.querySelector('h4');
            if (priceElement) {
                const priceText = priceElement.textContent;
                productPrice = parseInt(priceText) || 0;
            }
            const descElement = item.querySelector('.item-description');
            if (descElement) {
                productDescription = descElement.textContent;
            }
            const activeBtn = item.querySelector('.btit .circle-btn.active');
            if (activeBtn) {
                productImg = activeBtn.getAttribute('data-img');
            }
            if (!productImg) {
                const imgElement = item.querySelector('.main-product-img');
                if (imgElement && imgElement.src) {
                    productImg = imgElement.src;
                }
            }
            productVariant = getActiveVariant(item);
        }
        
        cartItems.push({
            name: productName,
            variant: productVariant,
            price: productPrice,
            img: productImg,
            description: productDescription,
            quantity: 1,
            id: Date.now() + Math.random()
        });
        
        cartCount++;
        updateCartCount();
        showNotification(productName, productVariant);
        
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    });
});

// Функция пересчета корзины
function recalculateCart() {
    let totalCount = 0;
    cartItems.forEach(item => {
        totalCount += (item.quantity || 1);
    });
    cartCount = totalCount;
    
    updateCartCount();
    updateCartPageDisplay();
}

// Обработчики для кнопок
function handleMinusClick(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    if (cartItems[index]) {
        const currentQty = cartItems[index].quantity || 1;
        if (currentQty > 1) {
            cartItems[index].quantity = currentQty - 1;
        } else {
            cartItems.splice(index, 1);
        }
        recalculateCart();
    }
}

function handlePlusClick(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    if (cartItems[index]) {
        const currentQty = cartItems[index].quantity || 1;
        cartItems[index].quantity = currentQty + 1;
        recalculateCart();
    }
}

function handleRemoveClick(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    if (cartItems[index]) {
        cartItems.splice(index, 1);
        recalculateCart();
    }
}

// Функция обновления страницы корзины
function updateCartPageDisplay() {
    const cartEmpty = document.getElementById('cartEmpty');
    const cartGrid = document.getElementById('cartItems');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotalSpan = document.getElementById('cartTotal');
    const cartFinalTotalSpan = document.getElementById('cartFinalTotal');
    
    if (!cartItemsList) return;
    
    if (cartCount === 0 || cartItems.length === 0) {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartGrid) cartGrid.style.display = 'none';
        return;
    }
    
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartGrid) cartGrid.style.display = 'flex';
    
    cartItemsList.innerHTML = '';
    let total = 0;
    
    cartItems.forEach((item, index) => {
        const quantity = item.quantity || 1;
        const itemTotal = item.price * quantity;
        total += itemTotal;
        
        const itemRow = document.createElement('div');
        itemRow.className = 'cart-product-item';
        itemRow.innerHTML = `
            <div class="cart-product-img">
                <img src="${item.img || 'images/placeholder.jpg'}" alt="${item.name}">
            </div>
            <div class="cart-product-info">
                <div>
                    <div class="cart-product-title">${item.name}</div>
                    ${item.description ? `<div class="cart-product-description">${item.description}</div>` : ''}
                    ${item.variant ? `<div class="cart-product-variant">${item.variant}</div>` : ''}
                    <div class="cart-product-price">${item.price.toLocaleString()} ₽</div>
                </div>
                <div class="cart-product-actions">
                    <div class="cart-product-quantity">
                        <button class="cart-qty-minus" data-index="${index}">-</button>
                        <span class="cart-qty-num">${quantity}</span>
                        <button class="cart-qty-plus" data-index="${index}">+</button>
                    </div>
                    <button class="cart-product-remove" data-index="${index}">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7" stroke="#999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        cartItemsList.appendChild(itemRow);
    });
    
    // Обновляем стоимость товаров
    if (cartTotalSpan) {
        cartTotalSpan.textContent = `${total.toLocaleString()} ₽`;
    }
    
    // Обновляем итоговую сумму к оплате
    if (cartFinalTotalSpan) {
        cartFinalTotalSpan.textContent = `${total.toLocaleString()} ₽`;
    }
    
    // Обработчики для кнопок
    document.querySelectorAll('.cart-qty-minus').forEach(btn => {
        btn.removeEventListener('click', handleMinusClick);
        btn.addEventListener('click', handleMinusClick);
    });
    
    document.querySelectorAll('.cart-qty-plus').forEach(btn => {
        btn.removeEventListener('click', handlePlusClick);
        btn.addEventListener('click', handlePlusClick);
    });
    
    document.querySelectorAll('.cart-product-remove').forEach(btn => {
        btn.removeEventListener('click', handleRemoveClick);
        btn.addEventListener('click', handleRemoveClick);
    });
}

// Клик по бейджу корзины - переход на страницу корзины
const cartBtn = document.getElementById('cartBtn');
if (cartBtn) {
    cartBtn.addEventListener('click', () => {
        saveCartToLocalStorage();
        window.location.href = 'cart.html';
    });
}

// Загружаем корзину при загрузке страницы
loadCartFromLocalStorage();

// Если мы на странице корзины, обновляем отображение
if (window.location.pathname.includes('cart.html')) {
    updateCartPageDisplay();
}

// -------------------------- ПОПАП ДЛЯ ЗАПИСИ НА ЗАНЯТИЕ --------------------------
const classPopup = document.getElementById('classPopup');
const popupClassClose = document.getElementById('popupClassClose');
const classFormPopup = document.getElementById('classForm');
const popupTitle = document.getElementById('popupTitle');
const popupPrice = document.getElementById('popupPrice');
const classTypeInput = document.getElementById('classType');

const classData = {
    open: { title: 'Открытое занятие', price: '1000 рублей' },
    individual: { title: 'Индивидуальное занятие', price: '2500 рублей' },
    group: { title: 'Групповое занятие', price: '5600 рублей' }
};

function openClassPopup(type) {
    if (classPopup && classData[type]) {
        popupTitle.textContent = classData[type].title;
        popupPrice.textContent = classData[type].price;
        classTypeInput.value = type;
        classPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeClassPopup() {
    if (classPopup) {
        classPopup.classList.remove('active');
        document.body.style.overflow = '';
        classFormPopup?.reset();
        document.querySelectorAll('.class-form .error').forEach(err => err.textContent = '');
    }
}

document.querySelectorAll('.btn-new').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        let classType = '';
        const card = btn.closest('.cardtask, .cardtask1');
        
        if (card) {
            const titleElement = card.querySelector('.texttask a');
            const titleText = titleElement?.textContent || '';
            
            if (titleText.includes('[01]') || titleText.includes('Открытое')) {
                classType = 'open';
            } else if (titleText.includes('[02]') || titleText.includes('Индивидуальное')) {
                classType = 'individual';
            } else if (titleText.includes('[03]') || titleText.includes('Групповое')) {
                classType = 'group';
            }
        }
        
        if (classType) {
            openClassPopup(classType);
        } else {
            openClassPopup('open');
        }
    });
});

if (popupClassClose) {
    popupClassClose.addEventListener('click', closeClassPopup);
}

if (classPopup) {
    classPopup.addEventListener('click', (e) => {
        if (e.target === classPopup) {
            closeClassPopup();
        }
    });
}

if (classFormPopup) {
    classFormPopup.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let valid = true;
        
        const phone = document.getElementById('classPhone');
        const tg = document.getElementById('classTg');
        const name = document.getElementById('className');
        
        const phoneError = phone?.parentElement.querySelector('.error');
        const tgError = tg?.parentElement.querySelector('.error');
        const nameError = name?.parentElement.querySelector('.error');
        
        const phoneRegex = /^[\+\(\)\d\s-]{10,}$/;
        if (phone && !phoneRegex.test(phone.value)) {
            valid = false;
            if (phoneError) phoneError.textContent = 'Введите корректный номер телефона';
        } else if (phoneError) {
            phoneError.textContent = '';
        }
        
        if (tg && tg.value && !tg.value.startsWith('@')) {
            valid = false;
            if (tgError) tgError.textContent = 'Telegram должен начинаться с @';
        } else if (tgError) {
            tgError.textContent = '';
        }
        
        if (name && name.value.length > 0 && name.value.length < 2) {
            valid = false;
            if (nameError) nameError.textContent = 'Введите корректное имя';
        } else if (nameError) {
            nameError.textContent = '';
        }
        
        if (valid) {
            console.log('Заявка на занятие:', {
                type: classTypeInput?.value,
                phone: phone?.value,
                tg: tg?.value,
                name: name?.value
            });
            
            alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            closeClassPopup();
        }
    });
}