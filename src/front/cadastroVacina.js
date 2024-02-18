function repassarInformacao() {
    var nomeVacina = document.getElementById("nomeVacina").value;
    var loteVacina = document.getElementById("loteVacina").value;
    var dataVacina = document.getElementById("dataVacina").value;
    var validacaoVacina = document.getElementById("validacaoVacina").value;

    var informacoesRepassadas = "Nome da Vacina: " + nomeVacina + "<br>" +
        "Lote da Vacina: " + loteVacina + "<br>" +
        "Data de Vacinação: " + dataVacina + "<br>" +
        "Validação da Vacina: " + validacaoVacina;

   
     var novoParagrafo = document.createElement("p");
    novoParagrafo.innerHTML = informacoesRepassadas;

    var botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = function () {
        novoParagrafo.remove();
        //  excluir os dados 
        localStorage.removeItem("nomeVacina");
        localStorage.removeItem("loteVacina");
        localStorage.removeItem("dataVacina");
        localStorage.removeItem("validacaoVacina");
    };

    novoParagrafo.appendChild(botaoExcluir);
    document.getElementById("caixa").appendChild(novoParagrafo);

    //  Salvando os dados 
    localStorage.setItem("nomeVacina", nomeVacina);
    localStorage.setItem("loteVacina", loteVacina);
    localStorage.setItem("dataVacina", dataVacina);
    localStorage.setItem("validacaoVacina", validacaoVacina);
}
//    pesquisar vacinas por nome
function pesquisarPorNome() {
    var nomePesquisa = document.getElementById("nomePesquisa").value.toLowerCase();
    var paragrafos = document.getElementById("caixa").getElementsByTagName("p");
    
    for (var i = 0; i < paragrafos.length; i++) {
        var paragrafo = paragrafos[i];
        var texto = paragrafo.textContent || paragrafo.innerText;
        var nomeVacina = texto.toLowerCase(); // Convertendo para minúsculas para comparar

        if (nomeVacina.includes(nomePesquisa)) { // Verificando se o nome da vacina inclui o texto de pesquisa
            paragrafo.style.display = ""; // Exibindo o parágrafo se houver correspondência
        } else {
            paragrafo.style.display = "none"; // Ocultando o parágrafo se não houver correspondência
        }
    }
}

//  carregar os dados salvos 
window.onload = function () {
    var nomeVacinaSalvo = localStorage.getItem("nomeVacina");
    var loteVacinaSalvo = localStorage.getItem("loteVacina");
    var dataVacinaSalvo = localStorage.getItem("dataVacina");
    var validacaoVacinaSalvo = localStorage.getItem("validacaoVacina");

    if (nomeVacinaSalvo) {
        document.getElementById("nomeVacina").value = nomeVacinaSalvo;
    }

    if (loteVacinaSalvo) {
        document.getElementById("loteVacina").value = loteVacinaSalvo;
    }

    if (dataVacinaSalvo) {
        document.getElementById("dataVacina").value = dataVacinaSalvo;
    }

    if (validacaoVacinaSalvo) {
        document.getElementById("validacaoVacina").value = validacaoVacinaSalvo;
    }

    

}
//  apaerecer todas as vacinas
function exibirTodasVacinas() {
    var paragrafos = document.getElementById("caixa").getElementsByTagName("p");

    for (var i = 0; i < paragrafos.length; i++) {
        paragrafos[i].style.display = "";
    }
}