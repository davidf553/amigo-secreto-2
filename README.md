Projeto Amigo Secreto
Este projeto tem como objetivo criar uma aplicação simples de sorteio de Amigo Secreto. A aplicação permite adicionar participantes, realizar sorteios e exibir os resultados de forma clara e interativa.

Funcionalidades
Adicionar Participantes: Insira os nomes dos participantes para começar o sorteio.
Realizar o Sorteio: Cada participante pode realizar o sorteio do seu "amigo secreto".
Exibir Resultados: O sistema mostra quem é o amigo secreto de cada participante.
Salvar Dados Localmente: Todos os dados (participantes e resultados) são salvos localmente no navegador (usando localStorage), garantindo que as informações sejam persistidas mesmo após recarregar a página.
Tecnologias Utilizadas
Frontend: HTML, CSS, JavaScript
Armazenamento: LocalStorage (para salvar os participantes e resultados do sorteio)
Instalação
Requisitos
Navegador moderno (Google Chrome, Firefox, etc.)
Passos para Instalar
Clone este repositório:

bash
Copiar
git clone https://github.com/seu-usuario/amigo-secreto.git
Navegue até o diretório do projeto:

bash
Copiar
cd amigo-secreto
Abra o arquivo index.html no seu navegador.

Como Usar
Adicionar Participantes:

Digite o nome de um participante no campo de entrada e clique no botão Adicionar. O nome será adicionado à lista de participantes.
Sortear Amigo Secreto:

Quando todos os participantes estiverem na lista, clique no botão Sortear Amigo Secreto.
O sistema pedirá que você digite seu nome. Certifique-se de que seu nome esteja na lista de participantes.
O sorteio será realizado e o sistema exibirá quem foi sorteado como seu amigo secreto.
Ver os Resultados:

Após realizar o sorteio, o sistema mostrará o nome do amigo secreto sorteado para você.
Clique no botão OK? para limpar o resultado e continuar.
Remover Participantes:

Você pode remover qualquer participante da lista clicando no botão Remover ao lado de seu nome.
Estrutura do Código
HTML (index.html)
O arquivo HTML contém a estrutura básica da interface, com campos para inserir nomes, botões para adicionar participantes e realizar o sorteio, além de áreas para mostrar a lista de nomes e os resultados do sorteio.

Elementos principais:

Campo de entrada para o nome do participante.
Botões para adicionar nomes, realizar sorteio e confirmar o resultado.
Área de lista para mostrar os nomes dos participantes.
Área para mostrar o resultado do sorteio.
Mensagem de toast para exibir erros ou confirmações.
CSS (styles.css)
O arquivo CSS estiliza a interface, definindo cores, fontes, botões e a disposição dos elementos.

Principais estilos:

Definindo cores e fontes personalizadas.
Estilização dos botões e entradas para melhorar a experiência do usuário.
Adição de um efeito de "hover" para os botões.
Layout responsivo e limpo para a interface.
JavaScript (script.js)
O JavaScript contém a lógica principal da aplicação, desde a manipulação da DOM até a interação com o localStorage para persistir os dados.

Funcionalidade de Adicionar Nomes
Quando o botão Adicionar é clicado, o nome digitado é validado e, se for válido, adicionado à lista de participantes e salvo no localStorage.

javascript
Copiar
adicionarNomeButton.addEventListener("click", function () {
    const nome = nomeInput.value.trim();

    if (!nome) {
        showToast("Por favor, digite um nome válido!");
        return;
    }

    if (nomes.includes(nome)) {
        showToast("Este nome já está na lista!");
        return;
    }

    nomes.push(nome);
    sorteiosPendentes.push(nome); // Adiciona à lista de pendentes
    nomeInput.value = "";
    renderListaDeNomes();
    atualizarLocalStorage();
});
Funcionalidade de Sorteio
Ao clicar no botão Sortear Amigo Secreto, o sistema verifica se o nome inserido para o sorteio é válido. Caso contrário, o usuário será notificado.

javascript
Copiar
sortearAmigoButton.addEventListener("click", function () {
    if (sorteiosPendentes.length === 0) {
        showToast("Adicione ao menos uma pessoa à lista!");
        return;
    }

    const nomeSorteador = prompt("Qual seu nome?");

    if (!nomeSorteador || !nomes.includes(nomeSorteador)) {
        showToast("Seu nome não está na lista ou você não digitou um nome válido.");
        return;
    }

    const amigosRestantes = nomes.filter((nome) => nome !== nomeSorteador && !Object.values(resultadosSorteio).includes(nome));
    if (amigosRestantes.length === 0) {
        showToast("Não há amigos para sortear!");
        return;
    }

    const amigoSorteado = amigosRestantes[Math.floor(Math.random() * amigosRestantes.length)];
    resultadosSorteio[nomeSorteador] = amigoSorteado;
    sorteiosPendentes = sorteiosPendentes.filter((n) => n !== nomeSorteador);

    resultadoElement.textContent = `${nomeSorteador}, seu amigo secreto é: ${amigoSorteado}`;
    okButton.style.display = "inline-block"; // Mostra o botão OK
    atualizarLocalStorage();
});
Persistência com localStorage
O uso do localStorage garante que os nomes e resultados sejam salvos mesmo quando a página for recarregada. O código a seguir garante que os dados sejam carregados ao abrir a página e atualizados sempre que o estado mudar.

javascript
Copiar
// Carregar dados do localStorage
let nomes = JSON.parse(localStorage.getItem("nomes")) || [];
let resultadosSorteio = JSON.parse(localStorage.getItem("resultadosSorteio")) || {};
Capturas de Tela
Aqui você pode adicionar imagens da interface ou até vídeos mostrando como o sistema funciona. Por exemplo:

Tela inicial com a lista de nomes.
Tela após realizar o sorteio, mostrando o resultado.
Tela com a mensagem de erro ao tentar sortear sem participantes.
markdown
Copiar
## Capturas de Tela

### Tela de Adicionar Participantes
![Adicionar Participantes](caminho/para/imagem1.png)

### Resultado do Sorteio
![Resultado do Sorteio](caminho/para/imagem2.png)
Problemas Comuns e Soluções
Não consigo adicionar participantes.

Verifique se você não está tentando adicionar um nome em branco ou duplicado.
O sorteio não está funcionando.

Certifique-se de que há pelo menos dois participantes na lista antes de realizar o sorteio.
Como exportar os resultados?

A exportação de resultados pode ser implementada futuramente. No momento, os resultados são salvos apenas localmente.
