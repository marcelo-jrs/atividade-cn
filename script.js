class Calculadora {

  constructor(x1, x2, x3, x4, y){
    this.coeficientes = [x1, x2, x3, x4]
    this.epsilon = y
  }

  clear() {
    this.coeficientes = []
    this.epsilon = 0
  }

  setCoeficientes(x1, x2, x3, x4, y){
    this.coeficientes = [x1, x2, x3, x4]
    this.epsilon = y
    console.log(this.coeficientes, this.epsilon)
  }

  getFuncao(x){
    return parseInt(this.coeficientes[0]) * (x) ** 3 - parseInt(this.coeficientes[1]) * (x) ** 2 + parseInt(this.coeficientes[2]) * (x) + parseInt(this.coeficientes[3])
  }

  avaliaFuncao() {
    let ultimoSinal = Math.sign(this.getFuncao(-1000));

    const listaIntervalos = document.createElement('ul')
    const tituloLista = document.createElement('h3');
    tituloLista.textContent = 'Mudanças de sinais';
    listaIntervalos.appendChild(tituloLista);

    for (let x = -1000; x <= 1000; x++) {

      const resultado = this.getFuncao(x);
      const sinal = Math.sign(resultado);
      console.log(`f(${x}) = ${resultado}`);

      if (sinal !== ultimoSinal) {

        console.log(`Houve mudança de sinal em f(x) para x = ${x}`);
        ultimoSinal = sinal;

        const NumeroA = document.createElement('li');
        NumeroA.textContent = x - 1;
        NumeroA.classList.add('numeroA');

        const NumeroB = document.createElement('li');
        NumeroB.textContent = x;
        NumeroB.classList.add('numeroB');

        btnIntervalo.classList.remove('hide')
        listaIntervalos.appendChild(NumeroA);
        listaIntervalos.appendChild(NumeroB);
      }
    }
    return listaIntervalos;
  }

  bisseccao(a, b) {
    const listaResultados = document.createElement('ul')
    const tituloResultados = document.createElement('h3');
    tituloResultados.textContent = 'Iterações';
    listaResultados.appendChild(tituloResultados)

    let iter = 0;
    let fa = this.getFuncao(a);
    let fb = this.getFuncao(b);
    
    if (fa * fb >= 0) {
      console.log('nulo1')
      return null;
    }
    
    while (iter < 10000) {
      iter++;
      
      let c = (a + b) / 2;
      let fc = this.getFuncao(c);

      const itemLista = document.createElement('li')
      const iteracao = document.createElement('div')
      const itemXA = document.createElement('div')
      const itemFA = document.createElement('div')
      const itemXB = document.createElement('div')
      const itemFB = document.createElement('div')
      const itemC = document.createElement('div')
      const itemFC = document.createElement('div')

      iteracao.textContent = `${iter} - `
      itemXA.textContent = `XA = ${a}`
      itemFA.textContent = `f(a) = ${fa}`
      itemXB.textContent = `XB = ${b}` 
      itemFB.textContent = `f(b) = ${fb}` 
      itemC.textContent = `C = ${c}` 
      itemFC.textContent = `f(c) = ${fc}` 
      itemLista.appendChild(iteracao)
      itemLista.appendChild(itemXA)
      itemLista.appendChild(itemFA)
      itemLista.appendChild(itemXB)
      itemLista.appendChild(itemFB)
      itemLista.appendChild(itemC)
      itemLista.appendChild(itemFC)

     // iteraçao.textContent = `XA = ${a} | f(a) = ${fa} | XB = ${b} | f(b) = ${fb} | C = ${c} | f(c) = ${fc} |`
     itemLista.classList.add('lista-resultados')
      listaResultados.appendChild(itemLista)

      if (fc === 0 || (b - a) / 2 < this.epsilon) {
        console.log(c)
        return listaResultados;
      }
      
      if (fa * fc < 0) {
        b = c;
        fb = fc;
      } else {
        a = c;
        fa = fc;
      }
    }
    console.log('nulo')
    return null;
  }

}

const input1 = document.querySelector('#input1')
const input2 = document.querySelector('#input2')
const input3 = document.querySelector('#input3')
const input4 = document.querySelector('#input4')
const inputEpsilon = document.querySelector('#epsilon')
const btn = document.querySelector('#calcular')
const intervalosDiv = document.getElementById('intervalos')
const btnIntervalo = document.getElementById('teste')
const resultadosDiv = document.querySelector('.resultados')



const calculadora = new Calculadora(input1.value, input2.value, input3.value, input4.value, inputEpsilon.value)

btn.addEventListener('click', ()=> {
  intervalosDiv.insertBefore(calculadora.avaliaFuncao(), intervalosDiv.children[0]);
})

btnIntervalo.addEventListener('click', ()=> {
  const liA = document.querySelector('.numeroA')
  const liB = document.querySelector('.numeroB')

  const numeroA = parseInt(liA.innerText)
  const numeroB = parseInt(liB.innerText)

  resultadosDiv.appendChild(calculadora.bisseccao(numeroA, numeroB))
})
