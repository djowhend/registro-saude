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

        const cpf = document.getElementById('Cpf1');
        cpf.value = data.cpf;

        const tipoSanguineo = document.getElementById('TipoSanguineo');
        tipoSanguineo.value = data.tipoSanguineo;

        const numTelefone = document.getElementById('NumeroTelefone');
        numTelefone.value = data.numTelefone;

        const numTelefoneEmergencia = document.getElementById('NumeroTelefoneEmergencia');
        numTelefoneEmergencia.value = data.numTelefoneEmergencia;

        const email = document.getElementById('Email');
        email.value = data.email;


    } catch (error) {
        console.error('Erro:', error.message);
        alert("Erro ao criar usuário. Por favor, tente novamente.");
    }
};