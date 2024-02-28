// /ATUALIZAR O CADASTRO DO USUÁRIO CHAMANDO A ROTA DE USUARIO

document.getElementById('user-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('Nome').value;
    const sobrenome = document.getElementById('Sobrenome').value;
    const dataNascimento = document.getElementById('DataNascimento').value;
    // const email = document.getElementById('Email').value;
    // const senha = document.getElementById('Senha').value;
    // const confirmarSenha = document.getElementById('inputconfirmasenha').value;
    const cpf = document.getElementById('Cpf').value;  
    const tipoSanguineo = document.getElementById('TipoSanguineo').value;
    const numTelefone = document.getElementById('NumeroTelefone').value;
    const numTelefoneEmergencia = document.getElementById('NumeroTelefoneEmergencia').value;
    const genero = document.getElementById('Genero').value;

    const perfilFoto = document.getElementById('InputFoto');
    const file = perfilFoto.files[0];

    const formData = new FormData();
    formData.append('image', file);
    formData.append('nome', nome);
    formData.append('sobrenome', sobrenome);
    formData.append('dataNascimento', dataNascimento);
    formData.append('cpf', cpf);
    formData.append('tipoSanguineo', tipoSanguineo);
    formData.append('numTelefone', numTelefone);
    formData.append('numTelefoneEmergencia', numTelefoneEmergencia);
    formData.append('genero', genero);

    try {
        const response = await fetch(`http://localhost:3000/users/update`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }
        console.log("está passando aqui");

        alert("Cadastro atualizado com sucesso!");

        // window.location.href = "../Html/Login.html";
        
    } catch (error) {
        console.log('Erro:', error.message);
        alert(error.message);
        //alert("Erro ao criar usuário. Por favor, tente novamente.");
    }
});
    
window.onload = async () => {
    try {
        const response = await fetch(`http://localhost:3000/users/:id`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log(data);

        const nome = document.getElementById('Nome');
        nome.value = data.nome;
        
        const sobrenome = document.getElementById('Sobrenome');
        sobrenome.value = data.sobrenome;

        const genero = document.getElementById('Genero');
        genero.value = data.genero;

        const dataNascimento = document.getElementById('DataNascimento');
        dataNascimento.value = data.dataNascimento;

        const cpf = document.getElementById('Cpf');
        cpf.value = data.cpf;

        const tipoSanguineo = document.getElementById('TipoSanguineo');
        tipoSanguineo.value = data.tipoSanguineo;

        const numTelefone = document.getElementById('NumeroTelefone');
        numTelefone.value = data.numTelefone;

        const numTelefoneEmergencia = document.getElementById('NumeroTelefoneEmergencia');
        numTelefoneEmergencia.value = data.numTelefoneEmergencia;

        const perfilFoto = document.getElementById('PerfilFoto');
        perfilFoto.src = '../imagensPerfil/' + data.fotoPerfil;


    } catch (error) {
        console.error('Erro:', error.message);
        alert("Erro ao criar usuário. Por favor, tente novamente.");
    }
};

function handleFileSelect(event) {
    const fileInput = event.target;
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

