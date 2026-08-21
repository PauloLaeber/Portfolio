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

function obterSaidaNotebook(celula) {
  if (!celula.outputs || celula.outputs.length === 0) {
    return null;
  }

  const saida = celula.outputs[0];

  if (saida.data && saida.data['text/html']) {
    return { tipo: 'html', conteudo: saida.data['text/html'].join('') };
  }
  if (saida.data && saida.data['text/plain']) {
    return { tipo: 'texto', conteudo: saida.data['texto/plain'].join('') };
  }
  if (saida.data['text']) {
    return { tipo: 'texto', conteudo: saida.text.join('') };
  }

  return null;
}

function preencherCodigoNotebook(linguagem, codigo) {
  const elementos = document.querySelectorAll(`.codigo[data-linguagem=${linguagem}]`);

  elementos.forEach(function (elemento) {
    const codigoFonte = elemento.querySelector('code');

    if (codigoFonte) { codigoFonte.textContent = codigo; }
  });
}

function preencherSaidaNotebook(linguagem, saida) {
  const elementos = document.querySelectorAll(`.saida[data-linguagem=${linguagem}]`);

  elementos.forEach(function (elemento) {
    if (!saida) {
      elemento.innerHTML = '';
      return;
    }

    if (saida.tipo === 'html') {
      elemento.innerHTML = saida.conteudo;
      return;
    }

    const pre = document.createElement('pre');
    pre.textContent = saida.conteudo;

    elemento.replaceChildren(pre);
  });
}

async function carregarNotebook(caminho, linguagem) {
  const resposta = await fetch(caminho);

  if (!resposta.ok) {
    throw new Error(`Não foi possível carregar o notebook:  ${caminho}`);
  }

  const notebook = await resposta.json();
  const celulaCodigo = notebook.cells.find(function (celula) {
    return celula.cell_type === 'code';
  });
  if (!celulaCodigo) {
    return;
  }

  const codigo = celulaCodigo.source.join('');
  const saida = obterSaidaNotebook(celulaCodigo);

  preencherCodigoNotebook(linguagem, codigo);
  preencherSaidaNotebook(linguagem, saida);
}

async function carregarNotebooks() {

  const abas = document.querySelectorAll('.aba-codigo[data-notebook]');

  for (const aba of abas) {
    const caminho = aba.dataset.notebook;
    const linguagem = aba.dataset.linguagem;

    try {
      await carregarNotebook(caminho, linguagem);
    }
    catch (erro) {
      console.error(erro);
    }
  }
}


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



function botoesCopiar() {
  const botoes = document.querySelectorAll('.botao-copiar');

  botoes.forEach(function (botao) {
    botao.addEventListener('click', async function () {
      const grupo = botao.closest('.grupo-codigo');
      const codigoAtivo = grupo.querySelector('.codigo.ativo');

      if (!codigoAtivo) {
        return;
      }

      const codigo = codigoAtivo.textContent;
      await navigator.clipboard.writeText(codigo);

      botao.textContent = 'Copiado!';
      botao.classList.add('copiado');

      setTimeout(function () {
        botao.textContent = 'Copiar';
        botao.classList.remove('copiado');
      }, 2000);
    });
  });
}

destacarCodigo();
botoesCopiar();


async function inicializarCodigo() {
  await carregarNotebooks();

  document.querySelectorAll('.codigo code').forEach(limparCodigo);
  document.querySelectorAll('.saida pre').forEach(limparCodigo);

  await destacarCodigo();

  botoesCopiar();
}
inicializarCodigo();
