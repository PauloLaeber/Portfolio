const pastas = ["/Projetos/", "/Teorias/"]
const estaNaPastaProjetos = pastas.some(str => window.location.pathname.includes(str));
const caminhoRaiz = estaNaPastaProjetos ? '../' : './';

const menuPrincipal = document.querySelector("#menu-principal");

const estruturaMenu = [
  { nome: "Início", pagina: "index.html" },
  { nome: "Sobre", pagina: "sobre.html" },
  {
    nome: "Projetos", itens: [
      { nome: "Projeto 1", pagina: "Projetos/Projeto1.html" },
      { nome: "Projeto 2", pagina: "Projetos/Projeto2.html" },
    ]
  },
  {
    nome: "Teorias", itens: [
      { nome: "Teoria 1", pagina: "Teorias/Teoria1.html" },
      { nome: "Teoria 2", pagina: "Teorias/Teoria2.html" },
    ]
  },
]

menuPrincipal.innerHTML = `
        <a href="${caminhoRaiz}${estruturaMenu[0].pagina}" class="link-menu">${estruturaMenu[0].nome}</a>

        <a href="${caminhoRaiz}${estruturaMenu[1].pagina}" class="link-menu">${estruturaMenu[1].nome}</a>

        <div class="menu-expansivel">
          <button class="link-menu botao-menu" type="button">
            <span>Projetos</span><span class="indicador-menu">▾</span>
          </button>
          <div class="submenu">
            <a href="${caminhoRaiz}${estruturaMenu[2].itens[0].pagina}" class="link-submenu">${estruturaMenu[2].itens[0].nome}</a>
          </div>
          <div class="submenu">
            <a href="${caminhoRaiz}${estruturaMenu[2].itens[1].pagina}" class="link-submenu">${estruturaMenu[2].itens[1].nome}</a>
          </div>
        </div>

        <div class="menu-expansivel">
          <button class="link-menu botao-menu" type="button">
            <span>Teorias</span><span class="indicador-menu">▾</span>
          </button>
          <div class="submenu">
            <a href="${caminhoRaiz}${estruturaMenu[3].itens[0].pagina}" class="link-submenu">${estruturaMenu[3].itens[0].nome}</a>
          </div>
          <div class="submenu">
            <a href="${caminhoRaiz}${estruturaMenu[3].itens[1].pagina}" class="link-submenu">${estruturaMenu[3].itens[1].nome}</a>
          </div>
        </div>
`;
