function cadastrarMedicamento() {
    var nomeMedicamento = document.getElementById("nomeMedicamento").value;
    var inicioMedicacao = document.getElementById("inicioMedicacao").value;
    var terminoMedicacao = document.getElementById("terminoMedicacao").value;

    var informacoesMedicamento = "Nome do Medicamento: " + nomeMedicamento + "<br>" +
                                 "Início da Medicação: " + inicioMedicacao + "<br>" +
                                 "Término da Medicação: " + terminoMedicacao;

    var novoParagrafo = document.createElement("p");
    novoParagrafo.innerHTML = informacoesMedicamento;

    var botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function() {
        novoParagrafo.remove();
    };

    novoParagrafo.appendChild(botaoExcluir);
    document.getElementById("listaMedicamentos").appendChild(novoParagrafo);
}