// //CADASTRA O USUÁRIO CHAMANDO A ROTA DE USUARIO

document.getElementById('user-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('inputnome').value;
    const email = document.getElementById('inputemail').value;
    const senha = document.getElementById('inputsenha').value;
    const confirmarSenha = document.getElementById('inputconfirmasenha').value;
    // const cpf = document.getElementById('inputcpf').value;  
    // const tipoSanguineo = document.getElementById('inputtiposanguineo').value;
    // const numeroTelefone = document.getElementById('inputnumerotelefone').value;
    // const numeroTelefoneEmergencia = document.getElementById('inputnumerotelefoneemergencia').value;
    // const genero = document.getElementById('inputgenero').value;

    if (senha !== confirmarSenha) {
        alert("As senhas não correspondem");
        return;
    }

    const userData = {
        nome,
        email,
        senha
        // cpf,
        // tipoSanguineo,
        // numeroTelefone,
        // numeroTelefoneEmergencia,
        // genero
        


    };
    
    try {
        const response = await fetch("http://localhost:3000/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error('Erro ao criar usuário');
        }
        console.log("está passando aqui");

        alert("Cadastro efetuado com sucesso!");

        window.location.href = "../Html/Login.html";
        
    } catch (error) {
        console.error('Erro:', error.message);
        alert("Erro ao criar usuário. Por favor, tente novamente.");
    }
});