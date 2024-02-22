function handleFileSelect(event) {
    const fileInput = event.target;
    const fotoUsuario = document.getElementById('FotoUsuario');
    const perfilFoto = document.getElementById('PerfilFoto');

    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            perfilFoto.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}