// /ATUALIZAR O CADASTRO DO USUÁRIO CHAMANDO A ROTA DE USUARIO

document.getElementById('user-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('Nome').value;
    const sobrenome = document.getElementById('Sobrenome').value;
    const dataNascimento = document.getElementById('DataNascimento').value;
    const email = document.getElementById('Email').value;
    const senha = document.getElementById('Senha').value;
    // const confirmarSenha = document.getElementById('inputconfirmasenha').value;
    const cpf = document.getElementById('Cpf').value;  
    const tipoSanguineo = document.getElementById('TipoSanguineo').value;
    const numTelefone = document.getElementById('NumeroTelefone').value;
    const numTelefoneEmergencia = document.getElementById('NumeroTelefoneEmergencia').value;
    const genero = document.getElementById('Genero').value;


    const userData = {
        nome,
        sobrenome,
        dataNascimento,
        email,
        senha,
        cpf,
        tipoSanguineo,
        numTelefone,
        numTelefoneEmergencia,
        genero
    };
    
    try {
        const response = await fetch(`http://localhost:3000/users/update`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }
        console.log("está passando aqui");

        alert("Cadastro atualizado com sucesso!");

        // window.location.href = "../Html/Login.html";
        
    } catch (error) {
        console.error('Erro:', error.message);
        alert("Erro ao criar usuário. Por favor, tente novamente.");
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

        const email = document.getElementById('Email');
        email.value = data.email;


    } catch (error) {
        console.error('Erro:', error.message);
        alert("Erro ao criar usuário. Por favor, tente novamente.");
    }
};



//-----------------

//GET VACINA COM O VINCULO DO USUARIO

// document.getElementById('buscar-vacinas-btn').addEventListener('click', () => {
//     fetch("http://localhost:3000/vacinas", {
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${localStorage.getItem("token")}`
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Erro ao obter informações das vacinas.");
//         }
//         return response.json();
//     })
//     .then(vacinas => {
//         console.log('Informações das vacinas:', vacinas);
//         // Limpa o conteúdo anteriormente exibido
//         document.getElementById('caixa').innerHTML = '';
//         console.log("chegando vacina");

//         // Loop através das vacinas e exibe cada uma no HTML
//         vacinas.forEach(vacina => {
//             const vacinaElement = document.createElement('div');
//             vacinaElement.innerHTML = `
//                 <p>Nome da Vacina: ${vacina.nomeVacina}</p>
//                 <p>Lote da Vacina: ${vacina.loteVacina}</p>
//                 <p>Data de Vacinação: ${vacina.dataVacinacao}</p>
//                 <p>Validação da Vacina: ${vacina.validadeVacina}</p>
//             `;
//            let divVacina = document.getElementById('caixa')
//            divVacina.appendChild(vacinaElement);
//         });
//     })
//     .catch(error => {
//         console.error("Erro:", error);
//     });
// });