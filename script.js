const botoesMenu = document.querySelectorAll('.botao-menu');
const cacheNotebooks = new Map();

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


async function obterNotebook(caminho) {
  if (cacheNotebooks.has(caminho)) {
    return cacheNotebooks.get(caminho);
  }

  const resposta = await fetch(caminho);

  if (!resposta.ok) {
    throw new Error(`Não foi possível carregar o notebook: ${caminho}`);
  }

  const notebook = await resposta.json();
  cacheNotebooks.set(caminho, notebook);

  return notebook;
}

function obterSaidaNotebook(celula) {
  if (!celula.outputs || celula.outputs.length === 0) {
    return null;
  }

  const saida = celula.outputs[0];

  if (saida.data && saida.data['text/html']) {
    return { tipo: 'html', conteudo: saida.data['text/html'].join('') };
  }
  if (saida.data && saida.data['text/plain']) {
    return { tipo: 'texto', conteudo: saida.data['text/plain'].join('') };
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

function preencherSaidaNotebook(elemento, saida) {
  if (!elemento) { return; }

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
}

function obterCelulaCodigo(notebook, indice) {
  const celula = notebook.cells[indice];

  if (!celula) { throw new Error(`A célula ${indice} não existe no notebook.`); }

  if (celula.cell_type !== 'code') { throw new Error(`A célula ${indice} existe, mas não é uma célula de código.`) }

  return celula;
}

async function carregarCelulaNotebook(caminho, indice, elementoCodigo, elementoSaida) {
  const notebook = await obterNotebook(caminho);

  const celulaCodigo = obterCelulaCodigo(notebook, indice);

  const codigo = celulaCodigo.source.join('');
  const saida = obterSaidaNotebook(celulaCodigo);

  elementoCodigo.textContent = codigo;
  preencherSaidaNotebook(elementoSaida, saida);
}

async function carregarCelulasNotebook() {
  const elementos = document.querySelectorAll('.codigo[data-notebook][data-celula]');
  const tarefas = [];

  elementos.forEach(function (elementoCodigo) {
    const caminho = elementoCodigo.dataset.notebook;
    const indice = Number(elementoCodigo.dataset.celula);
    const id = elementoCodigo.dataset.id

    const elementoSaida = document.querySelector(`.saida[data-id="${id}"]`);
    const codigoFonte = elementoCodigo.querySelector('.codigo-fonte');

    tarefas.push(carregarCelulaNotebook(caminho, indice, codigoFonte, elementoSaida));
  });

  await Promise.all(tarefas);
}

async function carregarNotebooks() {

  const abas = document.querySelectorAll('.aba-codigo[data-notebook]');

  for (const aba of abas) {
    const caminho = aba.dataset.notebook;
    const linguagem = aba.dataset.linguagem;

    try {
      await carregarCelulaNotebook(caminho, linguagem);
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


async function inicializarCodigo() {
  try {
    await carregarCelulasNotebook();

    document.querySelectorAll('.codigo code').forEach(limparCodigo);
    document.querySelectorAll('.saida pre').forEach(limparCodigo);

    await destacarCodigo();

    botoesCopiar();

  } catch (erro) {
    console.error('Erro ao inicializar células de código:', erro);
  }
}
inicializarCodigo();
