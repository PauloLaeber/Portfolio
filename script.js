const botaoProjetos = document.querySelector(".botao-projetos");
const menuProjetos = document.querySelector(".menu-projetos");

botaoProjetos.addEventListener("click", function () {
  menuProjetos.classList.toggle("aberto");
})

const botaoTeorias = document.querySelector(".botao-teorias");
const menuTeorias = document.querySelector(".menu-teorias");

botaoTeorias.addEventListener("click", function () {
  menuTeorias.classList.toggle("aberto");
})
