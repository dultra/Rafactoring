//Victor Reis

function getEmail() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const userEmail = user.email;
                console.log("Email do usuário autenticado:", userEmail);
                resolve(userEmail);
            } else {
                console.log("Nenhum usuário autenticado.");
                reject("Nenhum usuário autenticado.");
            }
        });
    });
}
async function cadastrar_cliente(){

    
    const userEmail = await getEmail();
    const userDb = await db.collection('usuarios');
    const userLogado = await userDb.where('email', '==', userEmail).get();

    const clienteDb = await db.collection('clientes');

    const nome = document.getElementById('nome').value;
    const ramo = document.getElementById('ramo').value;
    const email = document.getElementById('email').value;
    const endereco = document.getElementById('endereco').value;
    const tel = document.getElementById('tel').value;
    const cpf = document.getElementById('cpf').value;
    const cnpj = document.getElementById('cnpj').value;
    const estado = document.getElementById('select-estado').value;

    const userData = userLogado.docs[0].data();
    const userDono = userData.nome;

    console.log(nome,ramo,email,endereco,tel,cpf,cnpj,userDono);

    const cliente = {
        nome: nome,
        ramo: ramo,
        email: email,
        endereco: endereco,
        telefone: tel,
        cpf: cpf,
        cnpj: cnpj,
        userDono: userDono,
        estado: estado
    }

    nome.value = "";
    ramo.value = "";
    email.value = "";
    endereco.value = "";
    tel.value = "";
    cpf.value = "";
    cnpj.value = "";

    alert('Cadastrado com sucesso!');
    await clienteDb.add(cliente);
}

function criarSelectEstados() {
    
    const estados = [
        { sigla: 'AC', nome: 'Acre' },
        { sigla: 'AL', nome: 'Alagoas' },
        { sigla: 'AP', nome: 'Amapá' },
        { sigla: 'AM', nome: 'Amazonas' },
        { sigla: 'BA', nome: 'Bahia' },
        { sigla: 'CE', nome: 'Ceará' },
        { sigla: 'DF', nome: 'Distrito Federal' },
        { sigla: 'ES', nome: 'Espírito Santo' },
        { sigla: 'GO', nome: 'Goiás' },
        { sigla: 'MA', nome: 'Maranhão' },
        { sigla: 'MT', nome: 'Mato Grosso' },
        { sigla: 'MS', nome: 'Mato Grosso do Sul' },
        { sigla: 'MG', nome: 'Minas Gerais' },
        { sigla: 'PA', nome: 'Pará' },
        { sigla: 'PB', nome: 'Paraíba' },
        { sigla: 'PR', nome: 'Paraná' },
        { sigla: 'PE', nome: 'Pernambuco' },
        { sigla: 'PI', nome: 'Piauí' },
        { sigla: 'RJ', nome: 'Rio de Janeiro' },
        { sigla: 'RN', nome: 'Rio Grande do Norte' },
        { sigla: 'RS', nome: 'Rio Grande do Sul' },
        { sigla: 'RO', nome: 'Rondônia' },
        { sigla: 'RR', nome: 'Roraima' },
        { sigla: 'SC', nome: 'Santa Catarina' },
        { sigla: 'SP', nome: 'São Paulo' },
        { sigla: 'SE', nome: 'Sergipe' },
        { sigla: 'TO', nome: 'Tocantins' }
    ];

    const selectEstado = document.getElementById('select-estado');

    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.sigla;
        option.textContent = estado.nome;
        selectEstado.appendChild(option);
    });
}

criarSelectEstados();