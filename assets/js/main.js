//1. Obtendo o elemento form de HTML
const form = document.querySelector('.form');

form.addEventListener('submit', function (e) { //2. Captu ra do envento submit
    e.preventDefault(); //Prevenindo a ação padrão do botão
    const inputPeso = e.target.querySelector('#peso'); //3. Captura dos dados dos inputs
    const inputAltura = e.target.querySelector('#altura'); //3. Captura dos dados dos inputs

    const peso = Number(inputPeso.value); //4. Convertendo os inputs pra Number
    const altura = Number(inputAltura.value)/100; //4. Convertendo os inputs pra Number

    if (!peso) { //5. Se a converção retornar False:
        setResultado('Peso Invalido', false); //5.1. O resultado sera exibido como invalido
        return; //5.2. O programa se encerra aqui
    }

    if (!altura) { //6. Se a validação do peso acima retornar um Number, porém a altura retornar invalida
        setResultado('Altura Invalida', false); //6.1. O resultado sera exibido como invalido
        return; //6.2. O programa se encerra aqui
    }

    const imc = getImc(peso, altura); //7. Se ambas validações retornarem true, o programa continuara e com os valores, executará a função abaixo do getIMC
    const nivelImc = getNivelImc(imc); //Com o valor do IMC ja calculado, a função getNivelImc validará em qual faixa de peso o valor se encaixa

    const msg = `Seu IMC é ${imc} (${nivelImc})` // 8. E com isso, ira setar a mensagem configurada ao lado 

    setResultado(msg, true, imc); // 9. Preenchendo as informações que a função necessita
});

function criaP () {//**Função somente para criar um paragrafo
    const p = document.createElement('p');//em document, cria elemento
    return p;//**Função somente para criar um paragrafo
}

function setResultado (msg, isValid, imc) { //9.1 Função para adicionar conteudo no paragrafo adicionado, onde msg é a mensagem exibida
    const resultado = document.querySelector('#resultado');//9.2 selecionando o id resultado no HTML
    resultado.innerHTML = ''; //9.3 Zerando o conteudo anterior

    
    const p = criaP(); //9.4 Executando a função que cria Paragrafo
    
    if (isValid) {//9.5 Se isValid for incluido como true 
        if (imc >= 39.9) {
            p.classList.add('faixaAlerta') //Obesidade 3
        } else if (imc >= 34.9) {
            p.classList.add('faixaAlerta') //Obesidade 2
        } else if (imc >= 29.9) {
            p.classList.add('faixaAlerta') //Obesidade 1
        } else if (imc >= 24.9) {
            p.classList.add('faixaMedia') //Sobrepeso
        } else if (imc >= 18.5) {
            p.classList.add('faixaNormal') //Peso Normal
        } else {
            p.classList.add('faixaMedia') //Abaixo do Peso
        }
    } else {//Se isValid for incluido como false
        p.classList.add('bad') //Adiciona a Classe bad (CSS Configurado como fundo vermelgo)
    }

    p.innerHTML = msg;//9.6 Definindo o texto em p (Passo 8)
    resultado.appendChild(p);

}

function getImc (peso, altura) {
    const imc = peso / altura ** 2; //7.1 Após a validação dos dados retornarem que os dois são do tipo number, a formula do IMC calcula o Indice
    return imc.toFixed(2); //7.2 Arredondando o resultado IMC para 2 casas decimais
}

function getNivelImc (imc) {//Validação da faixa de peso do IMC
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    if (imc >= 39.9) {
        return nivel[5]
    } else if (imc >= 34.9) {
        return nivel[4]
    } else if (imc >= 29.9) {
        return nivel[3] 
    } else if (imc >= 24.9) {
        return nivel[2]
    } else if (imc >= 18.5) {
        return nivel[1]
    } else if (imc < 18.5) {
        return nivel[0]
    }
}