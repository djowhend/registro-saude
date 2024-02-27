

    function cadastrarPatologia() {
    const nomePatologia = document.getElementById("doencasCronicas").value;
    if (nomePatologia.trim() === "") {
        alert("Por favor, insira o nome da patologia.");
        return; // Retorna para evitar salvar dados vazios
    } else {
        alert("Patologia cadastrada com sucesso!")
    }
   
    const dadosPatologia = {
        nomePatologia: nomePatologia
         
    };

    fetch("http://localhost:3000/patologia", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosPatologia)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao salvar os dados no servidor.");
        }
        document.getElementById("doencasCronicas").value = "";
        return response.json();
    })
    .then(data => {
        // Dados foram salvos com sucesso, você pode tratar a resposta do servidor aqui se necessário

        console.log("Dados salvos com sucesso:", data);
    })
    .catch(error => {
        console.error("Erro:", error);
    })};

//GET PATOLOGIAS COM O VINCULO DO USUARIO

document.getElementById("buscar-patologias-btn").addEventListener('click', () => {
    fetch("http://localhost:3000/patologias", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao obter informações das patologias.");
        }
        return response.json();
    })
    .then(patologias => {
        console.log('Informações das patologias:', patologias);
        // Limpa o conteúdo anteriormente exibido
        document.getElementById('caixa').innerHTML = '';
        console.log("chegando medicamento");

        // Loop através das medicamentos e exibe cada uma no HTML
        patologias.forEach(patologia => {
            const patologiaElement = document.createElement('div');
            patologiaElement.innerHTML = `
                <p>Patologia: ${patologia.nomePatologia}</p>
              
               
            `;
           let divPatologia = document.getElementById('caixa')
           divPatologia.appendChild(patologiaElement);
        });
    })
    .catch(error => {
        console.error("Erro:", error);
    });
});