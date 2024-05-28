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

async function showName(){

    const userEmail = await getEmail();
    const userDb = await db.collection('usuarios');
    const userLogado = await userDb.where('email', '==', userEmail).get();
    const userData = userLogado.docs[0].data();
    const userDono = userData.nome;

    document.getElementById('username').innerHTML = "Logado em: " + userDono;

}
showName();
