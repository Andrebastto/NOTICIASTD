// Funções para gerenciar notícias
function getNoticias() {
    return JSON.parse(localStorage.getItem('noticias') || '[]');
}

function salvarNoticias(noticias) {
    localStorage.setItem('noticias', JSON.stringify(noticias));
}

function listarNoticias() {
    const container = document.getElementById('noticiasContainer');
    const noticias = getNoticias();

    if (container) {
        container.innerHTML = '';

        noticias.forEach(noticia => {
            container.innerHTML += `
                <div class="news-item">
                    ${noticia.foto ? `<img src="${noticia.foto}" alt="Foto da notícia">` : ''}
                    <strong>${noticia.titulo}</strong>
                    <p>${noticia.conteudo}</p>
                    ${noticia.video ? `<iframe src="${noticia.video}" frameborder="0" allowfullscreen></iframe>` : ''}
                </div>
            `;
        });

        if (noticias.length === 0) {
            container.innerHTML = '<p>Nenhuma notícia publicada.</p>';
        }
    }
}

// Chama a função para listar notícias ao carregar a página
listarNoticias();

// Função para acessar o suporte com senha
document.querySelector('#btnSuporte').addEventListener('click', function (e) {
    e.preventDefault(); // Impede o comportamento padrão do link
    const senha = prompt('Digite a senha para acessar o suporte:');
    const senhaCorreta = '1234'; // Substitua pela senha desejada

    if (senha === senhaCorreta) {
        window.location.href = 'SUPORTE.HTML'; // Redireciona para a página de suporte
    } else if (senha === null || senha === '') {
        alert('Senha não fornecida! Acesso negado.');
    } else {
        alert('Senha incorreta! Acesso negado.');
    }
});

// Função para enviar sugestão de notícias via WhatsApp
document.querySelector('#formSugestaoNoticias').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const nome = document.getElementById('NOME').value;
    const conteudoSugestao = document.getElementById('conteudoSugestao').value;

    if (nome && conteudoSugestao) {
        const mensagem = `Sugestão de Notícia:\nNome: ${nome}\nConteúdo: ${conteudoSugestao}`;
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappLink, '_blank'); // Abre o WhatsApp em uma nova aba
    } else {
        alert('Por favor, preencha todos os campos antes de enviar.');
    }
});
