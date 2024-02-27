
window.onload = async () => {
    try {
        await getUser();

        await getVacinas();

        await getMedicamentos();

        await getPatologias();

        const response = await fetch(`http://localhost:3000/qrCode`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        });
        // Display the QR code image in the container
        document.getElementById('qrCodeContainer').innerHTML = await response.text();

    } catch (error) {
        console.error('Erro:', error.message);
        alert("Erro ao obter perfil. Por favor, tente novamente.");
    }

    async function getPatologias() {
        const response = await fetch(`http://localhost:3000/patologias`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log(data);

        data.forEach(patologia => {
            const patologiaElement = document.createElement('div');
            patologiaElement.innerHTML = `
                <p>Patologia: ${patologia.nomePatologia}</p>
              
               
            `;
            let divPatologia = document.getElementById('InfoPatologias')
            divPatologia.appendChild(patologiaElement);
        });
    }


    async function getMedicamentos() {
        const response = await fetch(`http://localhost:3000/medicamentos/:id`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log(data);

        data.forEach(medicamento => {
            const medicamentoElement = document.createElement('div');
            medicamentoElement.innerHTML = `
                <p>Nome do medicamento: ${medicamento.nomeMedicamento}</p>
                <p>Inicio do tratamento: ${medicamento.inicioTratamento}</p>
                <p>Término do tratamento: ${medicamento.terminoTratamento}</p>
               
            `;
            let divMedicamento = document.getElementById('InfoMedicamentos')
            divMedicamento.appendChild(medicamentoElement);
        });
    }


    async function getVacinas() {
        const response = await fetch(`http://localhost:3000/vacinas/:id`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        console.log(data);

        const divVacina = document.getElementById('InfoVacinas');

        data.forEach(vacina => {
            const vacinaElement = document.createElement('div');
            vacinaElement.innerHTML = `
                <p>Nome da Vacina: ${vacina.nomeVacina}</p>
                <p>Lote da Vacina: ${vacina.loteVacina}</p>
                <p>Data de Vacinação: ${vacina.dataVacinacao}</p>
                <p>Validação da Vacina: ${vacina.validadeVacina}</p>
            `;
            divVacina.appendChild(vacinaElement);
        });
    }

    async function getUser() {
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
    }
};