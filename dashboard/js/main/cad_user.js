class UserFactory {
    static createUser(type, nome, email, senha, valor) {
        if (type === "administrador") {
            return new Admin(nome, email);
        } else if (type === "cliente") {
            return new Cliente(nome, email, valor);
        }
        throw new Error("Tipo de usuário desconhecido");
    }
}

class User {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

class Admin extends User {
    constructor(nome, email) {
        super(nome, email);
        this.tipo = 'admin';
    }
}

class Cliente extends User {
    constructor(nome, email, valorAluguel) {
        super(nome, email);
        this.tipo = 'cliente';
        this.valorAluguel = valorAluguel;
    }
}

class FirebaseConfig {
    constructor() {
        if (!FirebaseConfig.instance) {
            const firebaseConfig = {
                apiKey: "AIzaSyCv-d62qZjOju7QgaFjzPDnmYxP-ksAOO8",
                authDomain: "projeto-dashboard-5eaa5.firebaseapp.com",
                projectId: "projeto-dashboard-5eaa5",
                storageBucket: "projeto-dashboard-5eaa5.appspot.com",
                messagingSenderId: "564747759056",
                appId: "1:564747759056:web:1966621ab8b8fff6f11dd5",
                measurementId: "G-YR3S16VSJR"
            };
            firebase.initializeApp(firebaseConfig);
            this.db = firebase.firestore();
            FirebaseConfig.instance = this;
        }
        return FirebaseConfig.instance;
    }

    getDB() {
        return this.db;
    }
}

class MessageHandler {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class Observer {
    update(data) {
    }
}

class PasswordValidator {
    validate(password) {
        throw new Error("This method should be overridden");
    }
}

class StrongPasswordValidator extends PasswordValidator {
    validate(password) {
        return password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const mensagemDiv = document.getElementById('mensagem');
    const senhaInput = document.getElementById('senha');
    const senhaInfo = document.querySelector('.password-info');
    const db = new FirebaseConfig().getDB();
    const passwordValidator = new StrongPasswordValidator();

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

        if (!passwordValidator.validate(senha)) {
            showMessage('A senha é muito fraca. Use pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e símbolos.', 'error');
            return;
        }

        const user = UserFactory.createUser(tipo, nome, email, senha, valor);
        createUser(user);
        showMessage(`Usuário cadastrado com sucesso! Nome: ${nome}, E-mail: ${email}`, 'success');
        form.reset();
    });

    senhaInput.addEventListener('input', function() {
        const senha = senhaInput.value;
        if (senha.length === 0) {
            senhaInfo.textContent = '';
        } else {
            if (passwordValidator.validate(senha)) {
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

    function showMessage(message, type) {
        mensagemDiv.textContent = message;
        mensagemDiv.className = type;
        setTimeout(function() {
            mensagemDiv.textContent = '';
            mensagemDiv.className = '';
        }, 5000);
    }

    function createUser(user) {
        const userRef = db.collection('usuarios');
        const userType = user.tipo;
        const userDoc = userType === 'admin' ? {
            nome: user.nome,
            tipo: userType,
            email: user.email,
        } : {
            nome: user.nome,
            tipo: userType,
            email: user.email,
            valorAluguel: user.valorAluguel,
        };

        userRef.add(userDoc)
            .then((docRef) => {
                console.log(`${userType} adicionado com ID:`, docRef.id);
            })
            .catch((error) => {
                console.error(`Erro ao adicionar ${userType}:`, error);
            });

        // simulando o firebase
        console.log('Usuário criado:', user);
    }
});
