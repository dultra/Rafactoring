function login() {
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Usuário autenticado:', user.uid);
            alert("Login bem sucedido");
            displayScreen(userEmail);
        })
        .catch((error) => {
            console.error('Erro ao autenticar usuário:', error);
            console.error('Código de erro:', error.code);
            alert("Falha no login");
        });
}
function verificarLogin(){
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        console.log("Usuário está autenticado:", user);
        displayScreen(user.email);
      } else {
        console.log("Usuário não está autenticado.");
      }
    });
}
verificarLogin();
async function displayScreen(email) {
    
    const userRef = await db.collection('usuarios');
    const userDoc = await userRef.where('email', '==', email).get();

    if (userDoc.empty) {
        console.log('Usuário não encontrado');
        return;
    }
    else{
        if(userDoc.docs[0].data().tipo == "admin"){
            window.open('dashboard/html/mainadmin.html', '_self');
        }
        else if(userDoc.docs[0].data().tipo == "cliente"){
            window.open('dashboard/html/mainuser.html', '_self');
        }
    }
}