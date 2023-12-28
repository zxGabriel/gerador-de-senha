const senhaTexto = document.querySelector('.senha_texto')
const rangeInput = document.querySelector('.opcoes_range');
const numberInput = document.querySelector('.opcoes_range_num');
const itens = document.querySelectorAll('.item');
const combinacoes = document.querySelector('.opcoes_combinacoes_numero');
const botaoIncluiMaiuscula = document.querySelector('.maiusculas');
const botaoIncluiMinuscula = document.querySelector('.minusculas');
const botaoIncluiNumero = document.querySelector('.numeros');
const botaoIncluiEspecial = document.querySelector('.especiais');
const botaoGeraSenha = document.querySelector('.gerar');
const botaoCopiar = document.querySelector('.senha_copiar');

const listaMaiusculas = arrayCodigoCaracteres(65, 90);
const listaMinusculas = arrayCodigoCaracteres(97, 122);
const listaNumeros = arrayCodigoCaracteres(48, 57);
const listaEspecial = arrayCodigoCaracteres(33, 47).concat(arrayCodigoCaracteres(58, 64)).concat(arrayCodigoCaracteres(91, 96)).concat(arrayCodigoCaracteres(123, 126));

function atualizaInput(e) {
    let target = e.target;
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
}

function atualizaCombinacoes() {
    let numeroElementos = 0;
    let posicoes = parseInt(numberInput.value);
    if (botaoIncluiMaiuscula.checked) numeroElementos += listaMaiusculas.length;
    if (botaoIncluiMinuscula.checked) numeroElementos += listaMinusculas.length;
    if (botaoIncluiNumero.checked) numeroElementos += listaNumeros.length;
    if (botaoIncluiEspecial.checked) numeroElementos += listaEspecial.length;

    combinacoes.innerText = `${numeroElementos}^${posicoes}`;
}
function ativaDesativa(e) {
    if (e.target.classList.length == 2) {
        e.target.classList.add('ativo');
        e.target.checked = true;
    } else if (e.target.classList.length > 2) {
        e.target.classList.remove('ativo');
        e.target.checked = false;
    }
}

function gerarSenha(numeroCaracteres, incluiMinuscula, incluiMaiuscula, incluiNumero, incluiEspecial) {
    let charCodes = [];

    if (incluiMinuscula) charCodes = charCodes.concat(listaMinusculas);
    if (incluiMaiuscula) charCodes = charCodes.concat(listaMaiusculas);
    if (incluiNumero) charCodes = charCodes.concat(listaNumeros);
    if (incluiEspecial) charCodes = charCodes.concat(listaEspecial);

    const senhaCaracteres = [];
    for (let i = 0; i < numeroCaracteres; i++) {
        const caracter = charCodes[Math.floor(Math.random() * charCodes.length)];
        senhaCaracteres.push(String.fromCharCode(caracter));
    }

    return senhaCaracteres.join('');
}

function arrayCodigoCaracteres(valor1, valor2) {
    const array = [];
    for (let i = valor1; i <= valor2; i++) {
        array.push(i);
    }
    return array;
}

function copiarSenha(){
    let clipBoard = navigator.clipboard;
    clipBoard.writeText(senhaTexto.innerText);
    botaoCopiar.innerText = 'Copiado!'
    setTimeout(() => {
        botaoCopiar.innerText = 'Copiar';
    }, 3000);
}

window.addEventListener('click', atualizaCombinacoes)
rangeInput.addEventListener('input', atualizaInput);
numberInput.addEventListener('input', atualizaInput);
itens.forEach(e => e.addEventListener('click', ativaDesativa));
botaoCopiar.addEventListener('click', copiarSenha);
botaoGeraSenha.addEventListener('click', e => {
    e.preventDefault();
    const numeroCaracteres = rangeInput.value;
    const incluiMaiuscula = botaoIncluiMaiuscula.checked;
    const incluiMinuscula = botaoIncluiMinuscula.checked;
    const incluiNumero = botaoIncluiNumero.checked;
    const incluiEspecial = botaoIncluiEspecial.checked;


    const senha = gerarSenha(numeroCaracteres, incluiMinuscula, incluiMaiuscula, incluiNumero, incluiEspecial);
    senhaTexto.innerText = senha;
    e.target.classList.remove('ativo');
})
