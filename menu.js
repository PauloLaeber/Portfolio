const estaNaPastaProjetos = window.location.pathname.includes("/Projetos/");
const caminhoRaiz = estaNaPastaProjetos ? '../' : './';

const menuPrincipal = document.querySelector("#menu-principal");

menuPrincipal.innerHTML = `
        <a href="${caminhoRaiz}index.html" class="link-menu">Início</a>

        <a href="${caminhoRaiz}sobre.html" class="link-menu">Sobre</a>

        <div class="menu-projetos">
          <button class="link-menu botao-projetos" type="button">
            <span>Projetos</span><span class="indicador-projetos">▾</span>
          </button>
          <div class="submenu-projetos">
            <a href="${caminhoRaiz}Projetos/Projeto1.html" class="link-submenu">Projeto 1</a>
          </div>
        </div>
`;
