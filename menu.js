const pastas = ["/Projetos/", "/Experimentos/", "/Teoria/", "/Colas/"]
const estaNaPastaProjetos = pastas.some(str => window.location.pathname.includes(str));
const caminhoRaiz = estaNaPastaProjetos ? '/' : './';

const menuPrincipal = document.querySelector("#menu-principal");

const estruturaMenu = [
  { nome: "Início", pagina: "index.html" },
  {
    nome: "Projetos", itens: [
      { nome: "Análise Econométrica", pagina: "Projetos/Análise\ Econométrica/Análise\ Econométrica.html" },
      { nome: "Hospitais ES", pagina: "Projetos/Hospitais\ ES/Hospitais\ ES.html" },
      { nome: "Pipelines com IA", pagina: "Projetos/IA\ Pipelines/IA\ Pipelines.html" },
      { nome: "Ambiente nuvem", pagina: "Projetos/Nuvem/Nuvem.html" },
    ]
  },
  {
    nome: "Experimentos", itens: [
      { nome: "Compressão", pagina: "Experimentos/Compressão/Compressão.html" },
      { nome: "Pipelines com LLM Local", pagina: "Experimentos/LLM\Local/LLM\ Local.html" },
    ]
  },
  {
    nome: "Teoria", itens: [
      { nome: "Amostragem", pagina: "Teorias/Amostragem/Amostragem.html" },
      { nome: "Probabilidade e Inferência", pagina: "Teorias/Probabilidade\ e\ Inferência/Probabilidade\ e\ Inferência.html" },
      { nome: "Regressão", pagina: "Teorias/Regressão/Regressão.html" },
      { nome: "Dados Categóricos e Classificação", pagina: "Teorias/Dados\ Categóricos\ e\ Classificação/Dados\ Categóricos\ e\ Classificação.html" },
      { nome: "Séries Temporais", pagina: "Teorias/Séries\ Temporais/Séries\ Temporais.html" },
      { nome: "Análise de Sobrevivência", pagina: "Teorias/Análise\ de\ Sobrevivência/Análise\ de\ Sobrevivência.html" },
    ]
  },
  {
    nome: "Colas", itens: [
      { nome: "Pandas", pagina: "Colas/Pandas/Pandas.html" },
      { nome: "Numpy", pagina: "Colas/Numpy/Numpy.html" },
      { nome: "Seaborn", pagina: "Colas/Seaborn/Seaborn.html" },
      { nome: "Spark", pagina: "Colas/Spark/Spark.html" },
      { nome: "SQL", pagina: "Colas/SQL/SQL.html" },
      { nome: "Git", pagina: "Colas/Git/Git.html" },
    ]
  },
]

menuPrincipal.innerHTML = `
  <a href="${caminhoRaiz}${estruturaMenu[0].pagina}" class="link-menu">${estruturaMenu[0].nome}</a>

  <div class="menu-expansivel">
    <button class="link-menu botao-menu" type="button">
      <span>${estruturaMenu[1].nome}</span><span class="indicador-menu">▾</span>
    </button>
  <div class="submenu">
    <a href="${caminhoRaiz}${estruturaMenu[1].itens[0].pagina}" class="link-submenu">${estruturaMenu[1].itens[0].nome}</a>
  </div>
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[1].itens[1].pagina}" class="link-submenu">${estruturaMenu[1].itens[1].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[1].itens[2].pagina}" class="link-submenu">${estruturaMenu[1].itens[2].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[1].itens[3].pagina}" class="link-submenu">${estruturaMenu[1].itens[3].nome}</a> -->
  <!--   </div> -->
  </div>
  <!---->
  <!-- <div class="menu-expansivel"> -->
  <!--   <button class="link-menu botao-menu" type="button"> -->
  <!--     <span>${estruturaMenu[2].nome}</span><span class="indicador-menu">▾</span> -->
  <!--   </button> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[2].itens[0].pagina}" class="link-submenu">${estruturaMenu[2].itens[0].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[2].itens[1].pagina}" class="link-submenu">${estruturaMenu[2].itens[1].nome}</a> -->
  <!--   </div> -->
  <!-- </div> -->
  <!---->
  <!-- <div class="menu-expansivel"> -->
  <!--   <button class="link-menu botao-menu" type="button"> -->
  <!--     <span>${estruturaMenu[3].nome}</span><span class="indicador-menu">▾</span> -->
  <!--   </button> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[3].itens[0].pagina}" class="link-submenu">${estruturaMenu[3].itens[0].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[3].itens[1].pagina}" class="link-submenu">${estruturaMenu[3].itens[1].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[3].itens[2].pagina}" class="link-submenu">${estruturaMenu[3].itens[2].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[3].itens[3].pagina}" class="link-submenu">${estruturaMenu[3].itens[3].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[3].itens[4].pagina}" class="link-submenu">${estruturaMenu[3].itens[4].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[3].itens[5].pagina}" class="link-submenu">${estruturaMenu[3].itens[5].nome}</a> -->
  <!--   </div> -->
  <!-- </div> -->
  <!---->
  <!-- <div class="menu-expansivel"> -->
  <!--   <button class="link-menu botao-menu" type="button"> -->
  <!--     <span>${estruturaMenu[4].nome}</span><span class="indicador-menu">▾</span> -->
  <!--   </button> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[4].itens[0].pagina}" class="link-submenu">${estruturaMenu[4].itens[0].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[4].itens[1].pagina}" class="link-submenu">${estruturaMenu[4].itens[1].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[4].itens[2].pagina}" class="link-submenu">${estruturaMenu[4].itens[2].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[4].itens[3].pagina}" class="link-submenu">${estruturaMenu[4].itens[3].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[4].itens[4].pagina}" class="link-submenu">${estruturaMenu[4].itens[4].nome}</a> -->
  <!--   </div> -->
  <!--   <div class="submenu"> -->
  <!--     <a href="${caminhoRaiz}${estruturaMenu[4].itens[5].pagina}" class="link-submenu">${estruturaMenu[4].itens[5].nome}</a> -->
  <!--   </div> -->
  <!-- </div> -->
`;


const menuSecoes = document.querySelector('#menu-secoes');
const secoes = document.querySelectorAll('.conteudo section[id]');

secoes.forEach(function (secao) {
  const titulo = secao.querySelector('h2');
  const link = document.createElement('a');

  link.href = `#${secao.id}`;
  link.classList.add('link-menu');
  link.textContent = titulo.textContent;

  menuSecoes.appendChild(link);
})
