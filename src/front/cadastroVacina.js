function repassarInformacao() {
    const nomeVacina = document.getElementById("nomeVacina").value;
    const loteVacina = document.getElementById("loteVacina").value;
    const dataVacina = document.getElementById("dataVacina").value;
    const validacaoVacina = document.getElementById("validacaoVacina").value;

    const informacoesRepassadas = "Nome da Vacina: " + nomeVacina + "<br>" +
        "Lote da Vacina: " + loteVacina + "<br>" +
        "Data de Vacinação: " + dataVacina + "<br>" +
        "Validação da Vacina: " + validacaoVacina;

   
    const novoParagrafo = document.createElement("p");
    novoParagrafo.innerHTML = informacoesRepassadas;

    const botaoExcluir = document.createElement("button");
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

    console.log("Chegou!!!");

    cadastrarVacina();

    //  Salvando os dados 
    localStorage.setItem("nomeVacina", nomeVacina);
    localStorage.setItem("loteVacina", loteVacina);
    localStorage.setItem("dataVacina", dataVacina);
    localStorage.setItem("validacaoVacina", validacaoVacina);
}
//    pesquisar vacinas por nome
function pesquisarPorNome() {
    const nomePesquisa = document.getElementById("nomePesquisa").value.toLowerCase();
    const paragrafos = document.getElementById("caixa").getElementsByTagName("p");
    
    for (const i = 0; i < paragrafos.length; i++) {
        const paragrafo = paragrafos[i];
        const texto = paragrafo.textContent || paragrafo.innerText;
        const nomeVacina = texto.toLowerCase(); // Convertendo para minúsculas para comparar

        if (nomeVacina.includes(nomePesquisa)) { // Verificando se o nome da vacina inclui o texto de pesquisa
            paragrafo.style.display = ""; // Exibindo o parágrafo se houver correspondência
        } else {
            paragrafo.style.display = "none"; // Ocultando o parágrafo se não houver correspondência
        }
    }
}

//  carregar os dados salvos 
window.onload = function () {
    const nomeVacinaSalvo = localStorage.getItem("nomeVacina");
    const loteVacinaSalvo = localStorage.getItem("loteVacina");
    const dataVacinaSalvo = localStorage.getItem("dataVacina");
    const validacaoVacinaSalvo = localStorage.getItem("validacaoVacina");

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
    const paragrafos = document.getElementById("caixa").getElementsByTagName("p");

    for (const i = 0; i < paragrafos.length; i++) {
        paragrafos[i].style.display = "";
    }
}

function cadastrarVacina() {
    const nomeVacina = document.getElementById("nomeVacina").value;
    const loteVacina = document.getElementById("loteVacina").value;
    const dataVacina = document.getElementById("dataVacina").value;
    const validacaoVacina = document.getElementById("validacaoVacina").value;

    // Objeto contendo os dados a serem enviados para o servidor
    const dados = {
        nomeVacina: nomeVacina,
        loteVacina: loteVacina,
        dataVacinacao: dataVacina,
        validadeVacina: validacaoVacina
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