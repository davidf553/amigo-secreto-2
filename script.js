document.addEventListener("DOMContentLoaded", function () {
    const nomeInput = document.getElementById("nomeInput");
    const adicionarNomeButton = document.getElementById("adicionarNome");
    const listaDeNomes = document.getElementById("listaDeNomes");
    const sortearAmigoButton = document.getElementById("sortearAmigo");
    const resultadoElement = document.getElementById("resultado");
    const toastElement = document.getElementById("toast");
    const okButton = document.getElementById("okButton");

    // Carregar dados do localStorage
    let nomes = JSON.parse(localStorage.getItem("nomes")) || [];
    let resultadosSorteio = JSON.parse(localStorage.getItem("resultadosSorteio")) || {};
    let sorteiosPendentes = [...nomes]; // Inicializa a lista de pendentes com todos os nomes

    // Função para mostrar a mensagem de toast
    function showToast(message) {
        toastElement.textContent = message;
        toastElement.style.display = "block";
        setTimeout(() => {
            toastElement.style.display = "none";
        }, 3000);
    }

    // Atualiza o localStorage com os dados mais recentes
    function atualizarLocalStorage() {
        localStorage.setItem("nomes", JSON.stringify(nomes));
        localStorage.setItem("resultadosSorteio", JSON.stringify(resultadosSorteio));
    }

    // Adicionar nome à lista
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
        sorteiosPendentes.push(nome); // Adiciona o nome à lista de pendentes
        nomeInput.value = "";
        renderListaDeNomes();
        atualizarLocalStorage();
    });

    // Remover nome da lista
    function removerNome(nome) {
        nomes = nomes.filter((n) => n !== nome);
        delete resultadosSorteio[nome]; // Remove o nome dos resultados
        sorteiosPendentes = sorteiosPendentes.filter((n) => n !== nome); // Remove da lista de pendentes
        renderListaDeNomes();
        atualizarLocalStorage();
    }

    // Renderizar a lista de nomes
    function renderListaDeNomes() {
        listaDeNomes.innerHTML = "";
        nomes.forEach((nome) => {
            const listItem = document.createElement("li");
            listItem.textContent = nome;

            const removerButton = document.createElement("button");
            removerButton.textContent = "Remover";
            removerButton.classList.add("btn");
            removerButton.style.backgroundColor = "#e74c3c";
            removerButton.style.marginLeft = "10px";
            removerButton.addEventListener("click", function () {
                removerNome(nome);
            });

            listItem.appendChild(removerButton);
            listaDeNomes.appendChild(listItem);
        });
    }

    // Sortear amigo secreto
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

        if (!sorteiosPendentes.includes(nomeSorteador)) {
            showToast("Você já sorteou! Clique em OK para fazer outro sorteio.");
            return;
        }

        const amigosRestantes = nomes.filter((nome) => nome !== nomeSorteador && !Object.values(resultadosSorteio).includes(nome));

        if (amigosRestantes.length === 0) {
            showToast("Não há amigos para sortear!");
            return;
        }

        const amigoSorteado = amigosRestantes[Math.floor(Math.random() * amigosRestantes.length)];

        // Registra o amigo secreto sorteado para a pessoa
        resultadosSorteio[nomeSorteador] = amigoSorteado;
        sorteiosPendentes = sorteiosPendentes.filter((n) => n !== nomeSorteador);

        resultadoElement.textContent = `${nomeSorteador}, seu amigo secreto é: ${amigoSorteado}`;
        okButton.style.display = "inline-block"; // Mostra o botão OK
        atualizarLocalStorage();
    });

    // Lógica para esconder a mensagem quando clicar no botão OK
    okButton.addEventListener("click", function () {
        resultadoElement.textContent = ""; // Limpa a mensagem
        okButton.style.display = "none"; // Esconde o botão OK
    });

    // Renderizar a lista de nomes ao carregar a página
    renderListaDeNomes();
});
