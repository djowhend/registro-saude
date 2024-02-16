
document.getElementById('user-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('inputnome').value;
    const email = document.getElementById('inputemail').value;
    const senha = document.getElementById('inputsenha').value;
    const confirmarSenha = document.getElementById('inputconfirmasenha').value;
    const cpf = document.getElementById('inputcpf').value;
    
    if (senha !== confirmarSenha) {
        console.error('As senhas não correspondem.');
        alert("As senhas não correspondem");
        return;
    }

    const userData = {
        nome,
        email,
        senha,
        cpf
    };
    
    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) { 
            throw new Error('Erro ao criar usuário');
        }
        
        const newUser = await response.json();
        console.log('Novo usuário criado:', newUser);
    } catch (error) {
        console.error('Erro:', error.message);
    }
});
