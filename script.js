// Defina os coeficientes do polinômio
const input1 = document.querySelector(#coeficiente1)
const input2 = document.querySelector(#coeficiente2)
const input3 = document.querySelector(#coeficiente3)
const input4 = document.querySelector(#coeficiente4)
const inputEpsilon = document.querySelector(#epsilon)
const btn = document.querySelector(#calcular)

btn.addEventListener('click', ()=> {
  const coeficientes = [input1.innerText, input2.innerText, input2.innerText, input2.innerText]
})

console.log(coeficientes)
// Defina o intervalo de busca
const limiteInferior = -10;
const limiteSuperior = 10;

// Encontre a derivada do polinômio
const derivada = coeficientes.map((coeficiente, expoente) => coeficiente * expoente).slice(1);

// Encontre os pontos críticos da função
const pontosCriticos = derivada.map((coeficiente, expoente) => expoente !== 0 ? -coeficiente / expoente : null)
                              .filter(pontoCritico => pontoCritico !== null);

// Adicione os limites inferior e superior aos pontos críticos
pontosCriticos.push(limiteInferior, limiteSuperior);

// Encontre o intervalo com o maior valor da função
const intervalo = pontosCriticos.reduce((maiorIntervalo, pontoCritico, index) => {
  const proximoPontoCritico = pontosCriticos[index + 1];
  if (proximoPontoCritico !== undefined) {
    const intervalo = [pontoCritico, proximoPontoCritico];
    const valorMaximo = coeficientes.reduce((acumulador, coeficiente, expoente) => {
      return acumulador + coeficiente * Math.pow((intervalo[0] + intervalo[1]) / 2, expoente);
    }, 0);
    if (valorMaximo > maiorIntervalo[1]) {
      return [intervalo, valorMaximo];
    }
  }
  return maiorIntervalo;
}, [[], -Infinity])[0];

// Exiba o resultado
console.log(`O intervalo com o maior valor da função é [${intervalo[0]}, ${intervalo[1]}].`);
