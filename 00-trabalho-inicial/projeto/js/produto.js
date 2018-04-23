const QUANTIDADE = document.querySelector('#quantidade');
const SPAN = document.querySelector('#valor');

QUANTIDADE.addEventListener('change', function() {
    let quantidade = parseInt(QUANTIDADE.value);
    SPAN.textContent = 'R$ ' +(quantidade * 10) + ',00';
});