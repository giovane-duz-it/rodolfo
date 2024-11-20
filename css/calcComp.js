document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcular2").addEventListener("click", function() {
        let capital = parseFloat(document.querySelector(".capital2").value); 
        let juros = parseFloat(document.querySelector(".porcentagem2").value) / 100;
        let tempo = parseFloat(document.querySelector(".tempo2").value); 
        const resultantes = document.querySelector("#resultantes")

         const montante2 = capital * Math.pow(1 + juros, tempo);
        
        if (isNaN(capital) || isNaN(juros) || isNaN(tempo)) {
           resultantes.textContent="Erro no preenchimento do formulário"
            return; 
        } else {
            resultantes.textContent= montante2.toLocaleString("pt-br",{style:"currency", currency: "BRL"})
        }
    });
});
