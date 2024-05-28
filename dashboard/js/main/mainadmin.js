//Victor Reis

async function logout() {
    if (confirm("Tem certeza que deseja sair?")) {
      try {
        await firebase.auth().signOut();
        window.open("../../index.html", "_self");
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    }
  }