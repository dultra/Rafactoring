//Gabriel Dutra 


const sidebar = document.getElementById('sidebar');
const meobileMenu = document.getElementsByClassName('mobileMenu');
const conteudo = document.getElementById('conteudo');


function showValue(){
    console.log("teste");
    console.log(document.getElementById('tipoUsuario').value);
    if(document.getElementById('tipoUsuario').value == "cliente"){
        document.getElementById('valorUsuario').style.display = "inline";
    }	
}


function mobileMenuShow(menu){
    menu.classList.toggle('open');
    if (sidebar.style.width == "330px")
    {
        sidebar.style.width = "10px";
        menu.classList.remove('open');
    }

    else
    {
        sidebar.style.width = "330px";
    }

    window.addEventListener('click', function(e){
        if (!sidebar.contains(e.target) && (!document.getElementById('logo').contains(e.target))){
        sidebar.style.width = "10px";
        menu.classList.remove('open');
      } 
    })
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const mensagemDiv = document.getElementById('mensagem');
    const senhaInput = document.getElementById('senha');
    const senhaInfo = document.querySelector('.password-info');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = senhaInput.value;
        const confirmSenha = document.getElementById('confirmSenha').value;
        const tipo = document.getElementById('tipoUsuario').value;
        const valor = document.getElementById('valorUsuario').value;

        if (senha !== confirmSenha) {
            showMessage('As senhas não correspondem.', 'error');
            return;
        }

        if (!validatePassword(senha)) {
            showMessage('A senha é muito fraca. Use pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e símbolos.', 'error');
            return;
        }
        createUser(nome,tipo,valor,email,senha);
        showMessage(`Usuário cadastrado com sucesso! Nome: ${nome}, E-mail: ${email}`, 'success');
        form.reset();
    });

    senhaInput.addEventListener('input', function() {
        const senha = senhaInput.value;
        if (senha.length === 0) {
            senhaInfo.textContent = '';
        } else {
            if (validatePassword(senha)) {
                senhaInfo.textContent = 'Senha forte.';
                senhaInfo.classList.remove('weak');
                senhaInfo.classList.add('strong');
            } else {
                senhaInfo.textContent = 'Senha fraca. Use pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e símbolos.';
                senhaInfo.classList.remove('strong');
                senhaInfo.classList.add('weak');
            }
        }
    });

    function validatePassword(password) {
        return password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    }

    function showMessage(message, type) {
        mensagemDiv.textContent = message;
        mensagemDiv.className = type;
        setTimeout(function() {
            mensagemDiv.textContent = '';
            mensagemDiv.className = '';
        }, 5000);
    }
});

async function createUser(userNome,userTipo,userValor,userEmail,userSenha) {
    const userRef = await db.collection('usuarios');
    let userTipoFormatado;
    let valorAluguel;
    
    console.log(userTipo);
    console.log(userNome);
    console.log(userEmail);

    if (userTipo === "Administrador") {
        userTipoFormatado = "admin";
    } else {
       userTipoFormatado = "cliente";
       if(userValor == "1"){
        valorAluguel = 50;
       } else if(userValor == "2"){
        valorAluguel = 100;
       }
       else if(userValor == "3"){
        valorAluguel = 150;
       }
    }
    
    if(userTipoFormatado == "admin"){
    await userRef.add({
        nome: userNome,
        tipo: userTipoFormatado, 
        email: userEmail,
    }).then((docRef) => {
        console.log("Admin adicionado com ID:", docRef.id);
    })
    .catch((error) => {
        console.error("Erro ao adicionar Admin:", error);
    });
    } else {
        await userRef.add({
            nome: userNome,
            tipo: userTipoFormatado, 
            email: userEmail,
            valorAluguel: valorAluguel
        }).then((docRef) => {
            console.log("Cliente adicionado com ID:", docRef.id);
        })
        .catch((error) => {
            console.error("Erro ao adicionar cliente:", error);
        });
    }
    

    firebase.auth().createUserWithEmailAndPassword(userEmail, userSenha)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuário criado:', user);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}
