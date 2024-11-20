document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcular").addEventListener("click", function() {
        let capital = parseFloat(document.querySelector(".capital").value); 
        let juros = parseFloat(document.querySelector(".porcentagem").value) / 100;
        let tempo;

        let opcao = document.querySelector('input[name="exampleRadios"]:checked').value;

        if (opcao === "1") { 
            tempo = parseFloat(document.querySelector(".tempo").value); 
        } else if (opcao === "2") {
            tempo = parseFloat(document.querySelector(".tempo").value) * 12; 
        } else {
            resultante.textContent = "Erro no preenchimento do formulário";
        }

        const resultante = document.querySelector("#resultante");
        const montante = capital + (capital * juros * tempo);

        if (isNaN(capital) || isNaN(juros) || isNaN(tempo) || capital <= 0 || juros < 0 || tempo <= 0) {
            resultante.textContent = "Erro no preenchimento do formulário";
            return; 
        } else {
            resultante.textContent = montante.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
        }

        console.log(montante);
    });
});
