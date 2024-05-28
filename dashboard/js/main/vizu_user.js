//Victor Reis

async function displayUser(){
    
    const userRef = db.collection('usuarios');
    const userLista = document.getElementById('users');
    
    try{
        const snapshot = await userRef.where('tipo', '==', 'cliente').get();
        snapshot.forEach(doc => {

        
            const userItem = document.createElement('li');
            userItem.setAttribute('class','item-list');

            const userNome = document.createElement('p');
            userNome.setAttribute('class','item')
            userNome.textContent = `${doc.data().nome}`;
            userItem.appendChild(userNome);

            const userEmail = document.createElement('p');
            userEmail.setAttribute('class','item')
            userEmail.textContent = `${doc.data().email}`;
            userItem.appendChild(userEmail);

            const userPlano = document.createElement('p');
            userPlano.setAttribute('class','item')
            if(`${doc.data().valorAluguel}` == 50){
                userPlano.textContent = 'Basico';
            }else if(`${doc.data().valorAluguel}` == 100){
                userPlano.textContent = 'Intermediário';
            }
            else if(`${doc.data().valorAluguel}` == 150){
                userPlano.textContent = 'Avançado';
            }
            userItem.appendChild(userPlano);

            const imgDiv = document.createElement('div');
            imgDiv.setAttribute('class','img-div');

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

            userItem.appendChild(imgDiv);

            userLista.appendChild(userItem);
        });
    }
    catch(error){
        console.log(error);
    }
    
}

async function deleteUser(id){
    if(confirm("Tem certeza que deseja excluir?")){
    const userRef = db.collection('usuarios');
    await userRef.doc(id).delete();
    window.location.reload();
    }
}

async function editUser(id){
    var width = 800;
    var height = 800;
    var left = (window.innerWidth - width) / 2;
    var top = (window.innerHeight - height) / 2;
    var options = 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top;

    var url = '../html/edit_user.html' + '?id=' + id;

    var popup = window.open(url, 'Edição de Usuário', options);
    if (!popup || popup.closed || typeof popup.closed == 'undefined') {
      alert('Por favor, desbloqueie os popups para continuar.');
  }


}
displayUser();