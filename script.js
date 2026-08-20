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


document.querySelectorAll('.grupo-codigo').forEach(function (grupo) {
  const abas = grupo.querySelectorAll('.aba-codigo');
  const codigos = grupo.querySelectorAll('.codigo');
  const saidas = grupo.querySelectorAll('.saida');

  abas.forEach(function (aba) {
    aba.addEventListener('click', function () {
      const linguagem = aba.dataset.linguagem;

      abas.forEach(function (aba) {
        aba.classList.remove('ativo');
      });

      codigos.forEach(function (codigo) {
        codigo.classList.remove('ativo');
      });

      saidas.forEach(function (saida) {
        saida.classList.remove('ativo');
      })

      aba.classList.add('ativo');

      const codigoAtivo = grupo.querySelector(`.codigo[data-linguagem="${linguagem}"]`);
      const saidaAtiva = grupo.querySelector(`.saida[data-linguagem="${linguagem}"]`);

      if (codigoAtivo) { codigoAtivo.classList.add('ativo'); }
      if (saidaAtiva) { saidaAtiva.classList.add('ativo'); }
    });
  });
});


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


async function destacarCodigo() {
  const blocos = document.querySelectorAll(".codigo .codigo-fonte");

  for (const bloco of blocos) {
    const container = bloco.closest('.codigo');
    const linguagem = container.dataset.linguagem;
    const codigo = bloco.textContent;

    const html = await window.shikiCodeToHtml(codigo, { lang: linguagem, theme: "tokyo-night" });

    bloco.parentElement.outerHTML = html;
  }
}

destacarCodigo();
