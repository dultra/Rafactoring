
# BluePen-Deashboard

BluePen-Deashboard é um software desenvolvido e pensado para atender a demanda do mercado sobre softwares de gerenciamentos de seus clientes para ter um melhor controle de seus ganhos sobre seus clientes 


## Tecnologias utilizadas

HTML:
    HTML, ou HyperText Markup Language, é a linguagem de marcação utilizada para criar páginas web. Ele fornece uma estrutura básica para organizar o conteúdo da página, usando tags para definir elementos como cabeçalhos, parágrafos, imagens, links e listas.

CSS:
    CSS, ou Cascading Style Sheets, é uma linguagem de estilo utilizada para controlar a apresentação visual de páginas web escritas em HTML. Com o CSS, é possível definir o layout, as cores, as fontes, o espaçamento e outros aspectos visuais de elementos HTML, separando assim o conteúdo da sua apresentação.

JavaScript:
    JavaScript é uma linguagem de programação utilizada principalmente no desenvolvimento web para tornar as páginas interativas e dinâmicas. Com JavaScript, é possível controlar o comportamento dos elementos HTML, responder a eventos do usuário, manipular dados e modificar o conteúdo da página em tempo real. 

FireBase:
    Firebase é uma plataforma de desenvolvimento de aplicativos móveis e web fornecida pelo Google. Ele oferece uma variedade de serviços prontos para uso, incluindo armazenamento em nuvem em tempo real, autenticação de usuários, análise, testes de aplicativos, mensagens em tempo real e muito mais.

google chart:
    O Google Charts é uma ferramenta de visualização de dados desenvolvida pelo Google, que permite criar gráficos interativos e personalizáveis para exibir informações de maneira visualmente atraente em páginas da web.

node.js:
    Node.js é um ambiente de tempo de execução JavaScript de código aberto, construído sobre o motor V8 do Google Chrome. Ele permite que os desenvolvedores executem código JavaScript no lado do servidor, em vez de apenas no navegador, o que o torna ideal para desenvolvimento de aplicativos web escaláveis e em tempo real.
## como foram feitas as telas ?
Usando linguagem de marcação HTML para aderir os elementos na tela e linguagem de estilização CSS criamos nossas telas semanticas, responsivas e bem estilizadas.
Iniciamos com nossa index, uma tela de login conectada ao FireBase para fazer a validação das informações passadas pelo usuario.
Em seguida temos as nossas mains, com uma navbar em sua lateral para acessarmos as outras telas como: cadastro de cliente, configurações, logout...etc.
Nossas mains fazem sua função de tela home, exibindo em seu painel as deashboards que disponibilizaremos para nossos clientes.
Pensando agora em nossos desenvolvedores, para gerimos a entrada de usuarios do sistema, criamos nossa mainADM, que sera utilizada para fazer a gestão dos usuarios com a permissão de ultilizar o software
## Explorando nosso projeto

- Funcionalidades ADM:
    - O adiministrador tem o monitoramento por meios de graficos para saber o número de adiministradores,números de usuarios, números de clientes e de usuério e os planos de cada usuário.
    - o adiministrador pode adicinoar usuario, editar e remover.

- Funcionalidades do Cliente:
    - o cliente consegue visualizar graficos que mostram a quantidade de usuarios cadastrados e os planos de cada cliente



## Back-End

O beck-end da nossa aplicação ingloba tanto na utilização da bliblioteca do google charts para fazer a conexção e passar os dados necessarios para visualização no grafico, como tambem em nosso banco de dados(fireBase) utilzando 3 aplicações nessesarias, elas são: 
 - Authentication: Para validar o login dos usuarios tanto o Email como a senha.
 - FireBase: Utilzando para armazenagem de dados dos usuario, administradores e clientes.
 - App compat: Que utilizamos para fazer as ligações dessas funções.

 E por utimo não menos inportante utilizamos o back-end para fazer as funções de editar e deletar, que seram ultilizads para os administradores gerenciar o uso dos clientes e para os clientes gerenciarem seus usuario.
## Documentação da API

#### Busca dados 

```http
  Localhost:3000/api/informacoes/cpf
```
| Parâmetro        | Tipo       | Descrição                           |
| :----------------| :----------| :---------------------------------- |
| `CPF`            | `const`    | Retorna os dados do cliente, apartir de uma busca feita com uso do cpf |

#### Retorna Email, Ramo e Nome. 





## Conclusão

O software de monitoramento de assinaturas de clientes é uma solução robusta e eficaz projetada para acompanhar e analisar o status das assinaturas dos clientes em tempo real. A integração de uma dashboard intuitiva e dinâmica permite que os usuários visualizem dados relevantes de forma clara e concisa, possibilitando uma tomada de decisão mais informada e ágil.
## Autores
Equipe:

- [Thiago Bastos](https://github.com/Thiago-bsts)
- [Victor Reis](https://github.com/Vitelfs)
- [Gabriel Maier](https://github.com/gabrielmaierbr)
- [Gabriel Dutra](https://github.com/dultra)
- [Arthur Pacheco](https://github.com/ArthurPach)

