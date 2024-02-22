// //FAZ O LOGIN DO USUÁRIO CHAMANDO A ROTA POST DE LOGIN

// document.getElementById('login-form').addEventListener('submit', async function(event) {
//     event.preventDefault();
    
//     const email = document.getElementById('inputemail').value;
//     const senha = document.getElementById('inputsenha').value;
    
//     const userData = {
//       email,
//       senha
//     };
//     console.log(userData);
//     try {
//       const response = await fetch('http://localhost:3000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userData)
//       });

//       if (!response.ok) { 
//         throw new Error('Erro ao fazer login');
//       }

//       console.log("chegou");
      
//       const { token } = await response.json();
//       console.log('Token de autenticação:', token);
      
//       localStorage.setItem('token', token);

//       window.location.href = "../Html/Home.html";
//     } catch (error) {
//       console.error('Erro:', error.message);
//     }
//   });


document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const email = document.getElementById('inputemail').value;
  const senha = document.getElementById('inputsenha').value;
  
  const userData = {
    email,
    senha
  };
  console.log(userData);
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) { 
      // Se a resposta do servidor indicar que a senha está incorreta
      if (response.status === 400) {
        alert('Email ou senha inválidos.');

        window.location.href = "../Html/Login.html";
        return;
        
      } else {
        throw new Error('Erro ao fazer login');
      }
    }
    
    console.log("chegou");

    // console.log(response.json())

    const { token } = await response.json();
    console.log('Token de autenticação:', token);
    
    localStorage.setItem('token', token);

    window.location.href = "../Html/Home.html";
  } catch (error) {
    console.error('Erro:', error.message);
  }
});
