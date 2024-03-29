window.onload = function () {
    const menu_btn = document.querySelector('.hamburger')
    const side_card = document.querySelector('.side-card')

    menu_btn.addEventListener('click', function () {
        menu_btn.classList.toggle('is-active');
        side_card.classList.toggle('is-active');
    })
}