document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcular2").addEventListener("click", function(event) {
        event.preventDefault();
        var valor = parseFloat(document.getElementById("valor").value); 
        var inflacao = parseFloat(document.getElementById("inflacao").value);
        var tempo = parseInt(document.getElementById("tempo").value);
        var tipoPeriodo = document.querySelector('input[name="exampleRadios1"]:checked').value;

        const resultado = document.getElementById("resultantes");

        if (isNaN(valor) || isNaN(inflacao) || isNaN(tempo) || valor <= 0 || tempo <= 0) {
            resultado.textContent = "Erro no preenchimento do formulário";
            return; 
        } else {
            var valorFinal = valor;
            if (tipoPeriodo === '1') {
                for (var i = 0; i < tempo; i++) {
                    valorFinal += valorFinal * (inflacao / 100);
                }
            } 
            else if (tipoPeriodo === '2') {
                for (var i = 0; i < tempo; i++) {
                    valorFinal += valorFinal * (inflacao / 100);
                }
            }

            var diferenca = valorFinal - valor;
            var percentualAlteracao = ((diferenca / valor) * 100).toFixed(2);
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