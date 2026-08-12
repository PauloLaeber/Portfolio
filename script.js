const botoesMenu = document.querySelectorAll('.botao-menu');

botoesMenu.forEach(function (botao) {
  botao.addEventListener('click', function () {
    const menu = botao.parentElement;
    menu.classList.toggle('aberto');
  })
})
