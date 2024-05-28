//Victor Reis

const sidebar = document.getElementById('sidebar');
const meobileMenu = document.getElementsByClassName('mobileMenu');
const conteudo = document.getElementById('conteudo');

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