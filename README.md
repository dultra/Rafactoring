# Documentação dos Padrões de Projeto Aplicados

## 1. Factory Method

### Justificativa:

O padrão Factory Method foi aplicado na função `createUser` do arquivo `cad_user.js`. Esse padrão é adequado quando temos uma superclasse com várias subclasses e queremos delegar a criação de objetos para suas subclasses. No nosso caso, as subclasses são os diferentes tipos de usuários (administrador e cliente), e a função `createUser` é responsável pela criação desses objetos.

### Implementação:

A implementação do Factory Method consiste em ter métodos na superclasse (`createUser`) que retornam uma instância de suas subclasses (Administrador e Cliente). Dependendo do tipo de usuário fornecido como entrada, o método `createUser` instancia e retorna o tipo de usuário apropriado.

### Benefícios:

- Melhor separação de responsabilidades: A função `createUser` agora é responsável apenas pela criação de usuários, enquanto a lógica específica de cada tipo de usuário está encapsulada em suas respectivas classes.
- Facilidade de extensão: Se novos tipos de usuários forem introduzidos no futuro, basta adicionar uma nova subclasse e fazer pequenas modificações na função `createUser`.
- Código mais limpo e organizado: A aplicação do Factory Method reduz a complexidade e aumenta a legibilidade do código.

## 2. Singleton

### Justificativa:

O padrão Singleton foi aplicado na classe `FirebaseConfig` no arquivo `cad_user.js`. Esse padrão é útil quando desejamos ter apenas uma instância de uma classe em toda a aplicação. No nosso caso, queremos garantir que haja apenas uma instância da configuração do Firebase em todo o sistema.

### Implementação:

A implementação do Singleton envolve a criação de uma instância estática privada da classe e um método estático público para acessar essa instância. Quando o método estático é chamado, ele verifica se já existe uma instância da classe. Se não existir, cria uma nova instância e a retorna; se existir, simplesmente retorna a instância existente.

### Benefícios:

- Garante uma única instância: O Singleton garante que haja apenas uma instância da classe `FirebaseConfig` em todo o sistema, evitando conflitos de configuração e uso excessivo de recursos.
- Acesso global: A instância única pode ser acessada de qualquer lugar do código, facilitando o acesso aos recursos do Firebase em diferentes partes da aplicação.

## 3. Observer

### Justificativa:

O padrão Observer foi aplicado na função `mobileMenuShow` no arquivo `cad_user.js`. Esse padrão é apropriado quando há uma relação de dependência entre objetos, de modo que a alteração em um objeto cause uma alteração em outros objetos dependentes. No nosso caso, queremos atualizar o estado do menu móvel quando o usuário interage com ele.

### Implementação:

Na implementação do Observer, a função `mobileMenuShow` atua como o sujeito observado, enquanto a função `window.addEventListener` age como o observador. Sempre que o usuário interage com o menu móvel (sujeito), o `addEventListener` é acionado, atualizando o estado do menu móvel (observador) de acordo.

### Benefícios:

- Desacoplamento entre sujeito e observador: A função `mobileMenuShow` não precisa conhecer os detalhes de implementação do observador `addEventListener`, permitindo uma melhor modularidade e flexibilidade do código.
- Facilidade de extensão: Novos observadores podem ser adicionados facilmente para observar o mesmo sujeito, sem a necessidade de modificar a função `mobileMenuShow`.

## 4. Strategy

### Justificativa:

O padrão Strategy foi aplicado na função `validatePassword` no arquivo `cad_user.js`. Esse padrão é adequado quando há múltiplos algoritmos que podem ser usados intercambiavelmente. No nosso caso, queremos validar a força da senha do usuário usando diferentes critérios.

### Implementação:

Na implementação do Strategy, a função `validatePassword` aceita a senha como entrada e aplica diferentes critérios (algoritmos) para validar sua força. Cada critério é implementado em uma função separada (por exemplo, verificar comprimento mínimo, presença de letras maiúsculas, números, etc.), e o usuário pode adicionar ou remover critérios facilmente conforme necessário.

### Benefícios:

- Flexibilidade: Porque o padrão Strategy torna fácil substituir ou estender diferentes estratégias - ou seja, algoritmos - sem alterar o código existente.
- Reutilização de código: Cada estratégia é encapsulada em uma função separada, aumentando assim a reutilização e a manutenção do código.
