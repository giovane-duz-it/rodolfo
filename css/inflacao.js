document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcular2").addEventListener("click", function(event) {
        event.preventDefault();
        var valor = parseFloat(document.getElementById("valor").value); 
        var inflacao = parseFloat(document.getElementById("inflacao").value);
        var tempo = parseInt(document.getElementById("tempo").value);
        var tipoPeriodo = document.querySelector('input[name="exampleRadios1"]:checked').value;

        const resultado = document.getElementById("resultantes");

        // Verificação de dados de entrada
        if (isNaN(valor) || isNaN(inflacao) || isNaN(tempo) || valor <= 0 || tempo <= 0) {
            resultado.textContent = "Erro no preenchimento do formulário";
            return; 
        } else {
            var valorFinal = valor;
            
            // Cálculo da inflação
            if (tipoPeriodo === '1') {
                // Inflação mensal (dividida por 12)
                var inflacaoMensal = inflacao / 12 / 100;
                for (var i = 0; i < tempo; i++) {
                    valorFinal += valorFinal * inflacaoMensal;
                }
            } 
            else if (tipoPeriodo === '2') {
                // Inflação anual
                var inflacaoAnual = inflacao / 100;
                for (var i = 0; i < tempo; i++) {
                    valorFinal += valorFinal * inflacaoAnual;
                }
            }

            // Cálculo da diferença e percentual de alteração
            var diferenca = valorFinal - valor;
            var percentualAlteracao = ((diferenca / valor) * 100).toFixed(2);

            // Exibição do resultado
            if (diferenca > 0) {
                resultado.textContent = `Após ${tempo} ${tipoPeriodo === '1' ? 'meses' : 'anos'}, o valor final será R$ ${valorFinal.toFixed(2)}. \nHouve um ganho de poder de compra de ${percentualAlteracao}% em relação ao valor inicial.`;
            } else if (diferenca < 0) {
                resultado.textContent = `Após ${tempo} ${tipoPeriodo === '1' ? 'meses' : 'anos'}, o valor final será R$ ${valorFinal.toFixed(2)}. \nHouve uma perda de poder de compra de ${Math.abs(percentualAlteracao)}% em relação ao valor inicial.`;
            } else {
                resultado.textContent = `Após ${tempo} ${tipoPeriodo === '1' ? 'meses' : 'anos'}, o valor final será R$ ${valorFinal.toFixed(2)}. \nNão houve alteração no poder de compra.`;
            }
        }
    });
});
