
function cadastrarVacina() {
    const nomeVacina = document.getElementById("nomeVacina").value;
    const loteVacina = document.getElementById("loteVacina").value;
    const dataVacina = document.getElementById("dataVacina").value;
    const validacaoVacina = document.getElementById("validacaoVacina").value;
    if (nomeVacina.trim() === "") {
        alert("Por favor, insira o nome da vacina.");
        return; // Retorna para evitar salvar dados vazios
    } else {
        alert("Vacina cadastrado com sucesso!")
    }

    // Objeto contendo os dados a serem enviados para o servidor
    const dados = {
        nomeVacina: nomeVacina,
        loteVacina: loteVacina,
        dataVacinacao: dataVacina,
        validadeVacina: validacaoVacina,
    };

    fetch("http://localhost:3000/vacina", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao salvar os dados no servidor.");
        }
        document.getElementById("nomeVacina").value = "";
        document.getElementById("loteVacina").value = "";
        document.getElementById("dataVacina").value = "";
        document.getElementById("validacaoVacina").value = "";
        return response.json();
    })
    .then(data => {
        // Dados foram salvos com sucesso, você pode tratar a resposta do servidor aqui se necessário

        console.log("Dados salvos com sucesso:", data);
    })
    .catch(error => {
        console.error("Erro:", error);
    });
}

//GET VACINA COM O VINCULO DO USUARIO

document.getElementById('buscar-vacinas-btn').addEventListener('click', () => {
    fetch("http://localhost:3000/vacinas", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao obter informações das vacinas.");
        }
        return response.json();
    })
    .then(vacinas => {
        console.log('Informações das vacinas:', vacinas);
        // Limpa o conteúdo anteriormente exibido
        document.getElementById('caixa').innerHTML = '';
        console.log("chegando vacina");

        // Loop através das vacinas e exibe cada uma no HTML
        vacinas.forEach(vacina => {
            const vacinaElement = document.createElement('div');
            vacinaElement.innerHTML = `
                <p>Nome da Vacina: ${vacina.nomeVacina}</p>
                <p>Lote da Vacina: ${vacina.loteVacina}</p>
                <p>Data de Vacinação: ${vacina.dataVacinacao}</p>
                <p>Validação da Vacina: ${vacina.validadeVacina}</p>
            `;
           let divVacina = document.getElementById('caixa')
           divVacina.appendChild(vacinaElement);
        });
    })
    .catch(error => {
        console.error("Erro:", error);
    });
});
