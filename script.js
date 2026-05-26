// Бургер меню
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// Подменю в мобильной версии
const submenuTriggers = document.querySelectorAll('.has-submenu > a');
submenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('open');
    });
});

// ===== СЛАЙДЕР =====
const slides = document.querySelectorAll('.slider__slide');
const dots = document.querySelectorAll('.slider__dot');
let currentSlideIndex = 0;
let autoSlideInterval;

function showSlide(index) {
    // Скрываем все слайды
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Убираем активный класс у всех точек
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Показываем выбранный слайд
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlideIndex = index;
}

function nextSlide() {
    let nextIndex = currentSlideIndex + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}

function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(nextSlide, 6000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Обработчики для точек
dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
    });
});

// Запускаем автопрокрутку
startAutoSlide();

// Останавливаем автопрокрутку при наведении на слайдер
const sliderContainer = document.querySelector('.slider');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
}

// ===== БЛОК КАТАЛОГА =====
const products = [
    { id: 1, name: "Вода Аква Ареал 18.9 литров", price: 880, image: "product1.jpg.png", badges: ["hit", "sale"] },
    { id: 2, name: "Вода Аква Ареал 18.9 литров", price: 880, image: "product1.jpg.png", badges: ["hit", "sale"] },
    { id: 3, name: "Вода Аква Ареал 18.9 литров", price: 880, image: "product1.jpg.png", badges: ["hit", "sale"] },
    { id: 4, name: "Вода Аква Ареал 18.9 литров", price: 880, image: "product1.jpg.png", badges: ["hit"] },
    { id: 5, name: "Вода Аква Ареал 18.9 литров", price: 880, image: "product1.jpg.png", badges: ["hit"] }
];

function getBadgesHTML(badges) {
    if (!badges || badges.length === 0) return '';
    
    let html = '<div class="product-card__badges">';
    if (badges.includes('hit')) {
        html += '<span class="product-card__badge product-card__badge--hit">Хит</span>';
    }
    if (badges.includes('sale')) {
        html += '<span class="product-card__badge product-card__badge--sale">Акция</span>';
    }
    html += '</div>';
    return html;
}

function renderProducts() {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <a href="/product/${product.id}" class="product-card">
            ${getBadgesHTML(product.badges)}
            <div class="product-card__image">
                <img src="images/${product.image}" alt="${product.name}">
            </div>
            <div class="product-card__price">${product.price} ₽</div>
            <h3 class="product-card__title">${product.name}</h3>
            <div class="product-card__info">
                <span class="product-card__stock">Есть в наличии</span>
                <span class="product-card__sku">Артикул: ${product.id}</span>
            </div>
            <button class="product-card__btn" onclick="event.stopPropagation(); addToCart(${product.id})">В корзину</button>
        </a>
    `).join('');
}

// Функция добавления в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Товар "${product.name}" добавлен в корзину`);
    }
    return false;
}

renderProducts();

// ===== МОБИЛЬНЫЙ ПОДВАЛ — АККОРДЕОН =====
document.querySelectorAll('.footer__accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const accordion = this.parentElement;
        accordion.classList.toggle('active');
    });
});