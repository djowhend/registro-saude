

    function cadastrarMedicamento() {
    const nomeMedicamento = document.getElementById("nomeMedicamento").value;
    const inicioMedicacao = document.getElementById("inicioMedicacao").value;
    const terminoMedicacao = document.getElementById("terminoMedicacao").value;

    if (nomeMedicamento.trim() === "") {
        alert("Por favor, insira o nome do medicamento.");
        return; // Retorna para evitar salvar dados vazios
    } else {
        alert("Medicamento cadastrado com sucesso!")
    }

    const dadosMedicamento = {
        nomeMedicamento: nomeMedicamento,
        inicioTratamento: inicioMedicacao,
        terminoTratamento: terminoMedicacao
        
    };


    fetch("http://localhost:3000/medicamento", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosMedicamento)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao salvar os dados no servidor.");
        }
        document.getElementById("nomeMedicamento").value = "";
        document.getElementById("inicioMedicacao").value = "";
        document.getElementById("terminoMedicacao").value = "";
        return response.json();
    })
    .then(data => {
        // Dados foram salvos com sucesso, você pode tratar a resposta do servidor aqui se necessário
        
        console.log("Dados salvos com sucesso:", data);
    })
    .catch(error => {
        console.error("Erro:", error);
    })};

//GET MEDICAMENTOS COM O VINCULO DO USUARIO

document.getElementById("buscar-medicamentos-btn").addEventListener('click', () => {
    fetch("http://localhost:3000/medicamentos", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao obter informações dos medicamentos.");
        }
        return response.json();
    })
    .then(medicamentos => {
        console.log('Informações dos medicamentos:', medicamentos);
        // Limpa o conteúdo anteriormente exibido
        document.getElementById('caixa').innerHTML = '';
        console.log("chegando medicamento");

        // Loop através das medicamentos e exibe cada uma no HTML
        medicamentos.forEach(medicamento => {
            const medicamentoElement = document.createElement('div');
            medicamentoElement.innerHTML = `
                <p>Nome do medicamento: ${medicamento.nomeMedicamento}</p>
                <p>Inicio do tratamento: ${medicamento.inicioTratamento}</p>
                <p>Término do tratamento: ${medicamento.terminoTratamento}</p>
               
            `;
           let divMedicamento = document.getElementById('caixa')
           divMedicamento.appendChild(medicamentoElement);
        });
    })
    .catch(error => {
        console.error("Erro:", error);
    });
});