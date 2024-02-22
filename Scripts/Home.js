document.addEventListener('DOMContentLoaded', function () {
    var popupContainer = document.getElementById('PopupContainerID');

    // Exibição o popup
    popupContainer.style.display = 'block';

    // Ocultar o popup após 15 segundos
    // setTimeout(function () {
    //     popupContainer.style.display = 'none';
    // }, 15000);
});

// Função para fechar Popup
function FecharPopup() {
    var popupContainer = document.getElementById('PopupContainerID');
    popupContainer.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    // Tempo de mudança de um slide para o outro
    var intervalo = 5000; 
    var carrossel = document.getElementById('CarrosselNoticias');
    var instanciaCarrossel = new bootstrap.Carousel(carrossel, {
        interval: false 
    });

    // Lógica para avançar automaticamente para o próximo slide
    setInterval(function () {
        instanciaCarrossel.next();
    }, intervalo);
});