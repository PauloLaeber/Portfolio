const botoesMenu = document.querySelectorAll('.botao-menu');

botoesMenu.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const menu = botao.parentElement;
    menu.classList.toggle('aberto');
  })
});


const linksSecao = document.querySelectorAll('.menu-direito .link-menu[href^="#"]');

function atualizarSecaoAtiva() {
  let secaoAtiva = null;

  secoes.forEach(function (secao) {
    const posicao = secao.getBoundingClientRect();

    if (posicao.top <= window.innerHeight / 2 && posicao.bottom >= window.innerHeight / 2) {
      secaoAtiva = secao;
    }
  });

  linksSecao.forEach(function (link) {
    link.classList.remove("ativo");
  });

  if (secaoAtiva) {
    const linkAtivo = document.querySelector(`.menu-direito .link-menu[href="#${secaoAtiva.id}"]`);

    if (linkAtivo) {
      linkAtivo.classList.add("ativo");
    }
  }
};

window.addEventListener("scroll", atualizarSecaoAtiva);
atualizarSecaoAtiva();


function limparCodigo(codigo) {
  const linhas = codigo.textContent.split('\n');

  while (linhas.length && linhas[0].trim() === '') {
    linhas.shift();
  }
  while (linhas.length && linhas[linhas.length - 1].trim() === '') {
    linhas.pop();
  }

  const indentacoes = linhas.filter(function (linha) {
    return linha.trim() !== '';
  }).map(function (linha) {
    return linha.match(/^\s*/)[0].length;
  });

  const indentacaoMinima = Math.min(...indentacoes);

  codigo.textContent = linhas.map(function (linha) {
    return linha.slice(indentacaoMinima);
  }).join('\n');
}

document.querySelectorAll('.codigo code').forEach(limparCodigo);
document.querySelectorAll('.saida pre').forEach(limparCodigo);
