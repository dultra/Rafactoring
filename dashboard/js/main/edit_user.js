//Victor Reis

function getUserIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); 
}

async function exibir_info() {
    
    const userId = getUserIdFromUrl(); 
    const clienteEditar = await db.collection('usuarios').doc(userId).get(); 

    if (!clienteEditar.exists) {
        console.log('Nenhum documento encontrado.');
    } else {
        const data = clienteEditar.data();
        document.getElementById('nome').setAttribute('value', data.nome);
        document.getElementById('email').setAttribute('value', data.email);
        
        if (data.valorAluguel == 50) {
            document.getElementById('valorUsuario').value = '1';
        } else if (data.valorAluguel == 100) {
            document.getElementById('valorUsuario').value = '2';
        } else if (data.valorAluguel == 150) {
            document.getElementById('valorUsuario').value = '3';
        }
        
    }
}

async function editar_user() {
    try {
     
        const userId = getUserIdFromUrl(); 
        const clienteEditar = await db.collection('usuarios').doc(userId).get();

        const form = document.getElementById("client_form");

        form.addEventListener("submit", async e => {
            e.preventDefault();
            const data = new FormData(e.target);

            
            if(confirm("Tem certeza que deseja atualizar este cliente?")){
                if (!clienteEditar.exists) {
                    console.log('Nenhum documento encontrado.');
                } else {
                    if(data.get('valorUsuario') == '1') {
                        data.set('valorUsuario', 50);
                    } else if(data.get('valorUsuario') == '2') {
                        data.set('valorUsuario', 100);
                    } else if(data.get('valorUsuario') == '3') {
                        data.set('valorUsuario', 150);
                    }
                    await db.collection('usuarios').doc(userId).update({
                        nome: data.get('nome'),
                        email: data.get('email'),
                        valorAluguel: parseInt(data.get('valorUsuario')),
                        tipo: 'cliente'
                    });
                    window.close();
                }
            }
        });
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
}

exibir_info(); 
editar_user();
