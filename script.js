// Defina os coeficientes do polinômio
const coeficientes = [3, -5, 0, 1]; // polinômio: 3x^3 - 5x^2 + 1

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
