// esse abaixo está certo é com parâmeetros 
//e o de baixo sem parâmetros

//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';


// função que gera vários numeros aleatorios se eu 
//quiser um numero especifico eu coloco exemplo 7 só acerta se for o sete
//Código omitido

let listaDeNumerosSorteados = [];
let numeroLimite = 50;
let numeroSecreto =  gerarNumeroAleatorio();
// quantidade de vezes
let tentativas = 1;


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', 
    {rate:1.2});//rate velocidade da fala
}

 function exibirMensagemInicial() {
    //referente o h1 e o p
    exibirTextoNaTela('h1','Jogo do Número Secreto de Marina! Vamos Jogar.');
    exibirTextoNaTela('p','Escolha um número entre 1 e 50, tente acertar com o número menor de tentativas.');
 }

    exibirMensagemInicial();

function verificarChute() {
    //chamando valor do jogador
    let chute = document.querySelector('input'). value;

    // si acertar informar acertou
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns, você Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com 
        ${tentativas} ${palavraTentativa}! Agora aguarde o próximo jogador.`; 
        exibirTextoNaTela('p', mensagemTentativas);
        // esse document irá desativar o botão com o id especifico disable
        document.getElementById('reiniciar').removeAttribute('disabled');

        // se não acertar informar que errou. e else senão acertou
    } else {
        if (chute > numeroSecreto)  {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p' , 'O numero secreto é maior');
        }
        tentativas++;
        limparCampo();       
    }   
  }

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;    

    if (quantidadeDeElementosNaLista == numeroLimite) {
        // [] éum array significa uma lista
        listaDeNumerosSorteados = [];
    }    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
 // criar uma função de limpar campo para reiniciar após colocar numero
function  limparCampo() {
    chute = document.querySelector('input');
    // limpar o campo deixar vazio
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}