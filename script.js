const botoesMenu = document.querySelectorAll('.botao-menu');

botoesMenu.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const menu = botao.parentElement;
    menu.classList.toggle('aberto');
  })
});


const linksSecao = document.querySelectorAll('.menu-direito .link-menu[href^="#"]');
const secoes = document.querySelectorAll('.conteudo section[id]');

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
    const linkAtivo = document.querySelector('.menu-direito .link-menu[href="#${secaoAtiva.id}"]');

    if (linkAtivo) {
      linkAtivo.classList.add("ativo");
    }
  }
};

window.addEventListener("scroll", atualizarSecaoAtiva);
atualizarSecaoAtiva();
