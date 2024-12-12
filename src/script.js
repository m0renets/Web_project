const menu = document.querySelector('.menu__body')
const menuBtn = document.querySelector('.menu__icon')
const body = document.body;

if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active')
        menuBtn.classList.toggle('active')
        body.classList.toggle('lock')
    })
}

menu.addEventListener('click', e => {
    if(e.target.classList.contains('menu__body')) {
        menu.classList.remove('active')
        menuBtn.classList.remove('active')
        body.classList.remove('lock')
    }
})

const radioButtons = document.querySelectorAll('input[name="slider"]');
const contentSections = document.querySelectorAll('.content');

function showSection(sectionIndex) {
    contentSections.forEach((section, index) => {
        section.style.display = index === sectionIndex ? 'block' : 'none';
    });
}

radioButtons.forEach((button, index) => {
    button.addEventListener('change', () => {
        showSection(index);

        radioButtons.forEach(btn => btn.classList.remove('checked'));
        button.classList.add('checked');
    });
});

// Додаємо кнопки "Попередній" та "Наступний" (якщо вони у вас є)
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSection = 0;

prevBtn.addEventListener('click', () => {
    currentSection = (currentSection - 1 + contentSections.length) % contentSections.length;
    showSection(currentSection);
});

nextBtn.addEventListener('click', () => {
    currentSection = (currentSection + 1) % contentSections.length;
    showSection(currentSection);
});