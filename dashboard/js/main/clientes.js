//Victor Reis

function getEmail(){

    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const userEmail = user.email;
                console.log("Email do usuário autenticado:", userEmail);
                resolve(userEmail);
            } else {
                console.log("Nenhum usuário autenticado");
                reject("Nenhum usuário autenticado");
            }
        });
    });
}

async function showClientes(){

    const clienteUl = document.getElementById('clientes');
    const userEmail = await getEmail();
    const userDb = await db.collection('usuarios');
    const userLogado = await userDb.where('email', '==', userEmail).get();
    const userData = userLogado.docs[0].data();
    const userDono = userData.nome;

    const clienteDb = await db.collection('clientes');
    const clientesUser = await clienteDb.where('userDono', '==', userDono).get();

    try{

        if(clientesUser.empty){
            console.log('Nenhum cliente encontrado');
            const noCliente = document.createElement('p');
            noCliente.textContent = 'Nenhum cliente encontrado';
            
            for(let i = 0; i < 7; i++){
                document.getElementsByClassName('user-grid-item')[i].setAttribute('style', 'display: none');
            }
            document.getElementById('user-grid').style.gridTemplateColumns = "1fr";
            document.getElementById('user-grid').appendChild(noCliente);
            return;
        }
        clientesUser.forEach(doc => {
            const clienteData = doc.data();
            const clienteNome = clienteData.nome;
            const clienteRamo = clienteData.ramo;
            const clienteEmail = clienteData.email;
            const clienteEndereco = clienteData.endereco;
            const clienteTel = clienteData.telefone;
            const clienteCpf = clienteData.cpf;
            const clienteCnpj = clienteData.cnpj;
            const clienteEstado = clienteData.estado;

            console.log("Oi");
            console.log(clienteNome + " " + clienteRamo + " " + clienteEmail + " " + clienteEndereco + " " + clienteTel + " " + clienteCpf + " " + clienteCnpj);

            const clienteLi = document.createElement('li');
            clienteLi.setAttribute('class', 'item-list');

            const clienteNomeP = document.createElement('p');
            clienteNomeP.setAttribute('class', 'item');
            clienteNomeP.textContent = `${clienteNome}`;

            const clienteRamoP = document.createElement('p');
            clienteRamoP.setAttribute('class', 'item');
            clienteRamoP.textContent = `${clienteRamo}`;

            const clienteEmailP = document.createElement('p');
            clienteEmailP.setAttribute('class', 'item');
            clienteEmailP.textContent = `${clienteEmail}`;

            const clienteEnderecoP = document.createElement('p');
            clienteEnderecoP.setAttribute('class', 'item');
            clienteEnderecoP.textContent = `${clienteEndereco}`;

            const clienteEstadoP = document.createElement('p');
            clienteEstadoP.setAttribute('class', 'item');
            clienteEstadoP.textContent = `${clienteEstado}`;


            const clienteTelP = document.createElement('p');
            clienteTelP.setAttribute('class', 'item');
            clienteTelP.textContent = `${clienteTel}`;

            const clienteCpfCnpjP = document.createElement('p');
            clienteCpfCnpjP.setAttribute('class', 'item');

            if(clienteCpf == ""){
                clienteCpfCnpjP.textContent = `${clienteCnpj}`;
            }else if(clienteCnpj == ""){
                clienteCpfCnpjP.textContent = `${clienteCpf}`;
            }

            const imgDiv = document.createElement('div');
            imgDiv.setAttribute('class', 'img-div');

            const imgEdit = document.createElement('img');
            imgEdit.setAttribute('class','icon');
            imgEdit.setAttribute('src','../css/main/img/edit.png');
            imgEdit.setAttribute('onclick',`editUser('${doc.id}')`);

            const imgDelete = document.createElement('img');
            imgDelete.setAttribute('class','icon');
            imgDelete.setAttribute('src','../css/main/img/remove.png');
            imgDelete.setAttribute('onclick',`deleteUser('${doc.id}')`);

            imgDiv.appendChild(imgEdit);
            imgDiv.appendChild(imgDelete);

            clienteLi.appendChild(clienteNomeP);
            clienteLi.appendChild(clienteEmailP);
            clienteLi.appendChild(clienteCpfCnpjP);
            clienteLi.appendChild(clienteEnderecoP);
            clienteLi.appendChild(clienteRamoP);
            clienteLi.appendChild(clienteEstadoP);
            clienteLi.appendChild(clienteTelP);
            clienteLi.appendChild(imgDiv);

            clienteUl.appendChild(clienteLi); 
            
            
        }   
        );}
    catch(error){
        console.error(error);
    }
}

showClientes();