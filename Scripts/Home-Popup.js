document.addEventListener('DOMContentLoaded', function () {
    var popupContainer = document.getElementById('PopupContainerID');

    // Exibir o popup
    popupContainer.style.display = 'block';

    // Ocultar o popup após 15 segundos
    setTimeout(function () {
        popupContainer.style.display = 'none';
    }, 15000);
});

// Função fechar Popup
function FecharPopup() {
    var popupContainer = document.getElementById('PopupContainerID');
    popupContainer.style.display = 'none';
}