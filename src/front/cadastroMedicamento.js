    function cadastrarMedicamento() {
    const nomeMedicamento = document.getElementById("nomeMedicamento").value;
    const inicioMedicacao = document.getElementById("inicioMedicacao").value;
    const terminoMedicacao = document.getElementById("terminoMedicacao").value;

    const informacoesMedicamento =  "Nome do Medicamento: " + nomeMedicamento + "<br>" +
                                    "Início da Medicação: " + inicioMedicacao + "<br>" +
                                    "Término da Medicação: " + terminoMedicacao;

    const novoParagrafo = document.createElement("p");
    novoParagrafo.innerHTML = informacoesMedicamento;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function() {
        novoParagrafo.remove();

        localStorage.removeItem("nomeMedicamento");
        localStorage.removeItem("inicioMedicacao");
        localStorage.removeItem("terminoMedicacao");
    };

    novoParagrafo.appendChild(botaoExcluir);
    document.getElementById("listaMedicamentos").appendChild(novoParagrafo);
    
    console.log("Chegou!!!");

    cadastrarMedicamento();

    localStorage.setItem("nomeMedicamento", nomeMedicamento);
    localStorage.setItem("inicioMedicacao", inicioMedicacao);
    localStorage.setItem("terminoMedicacao", terminoMedicacao);
    

}

    function cadastrarMedicamento() {
    const nomeMedicamento = document.getElementById("nomeMedicamento").value;
    const inicioMedicacao = document.getElementById("inicioMedicacao").value;
    const terminoMedicacao = document.getElementById("terminoMedicacao").value;

    const dadosMedicamento = {
        nomeMedicamento: nomeMedicamento,
        inicioTratamento: inicioMedicacao,
        terminoTratamento: terminoMedicacao,
        userId: userId
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
        return response.json();
    })
    .then(data => {
        // Dados foram salvos com sucesso, você pode tratar a resposta do servidor aqui se necessário
        console.log("Dados salvos com sucesso:", data);
    })
    .catch(error => {
        console.error("Erro:", error);
    })};