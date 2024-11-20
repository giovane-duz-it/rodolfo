document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcular").addEventListener("click", function() {
        let aluguel = parseFloat(document.querySelector(".valorAluguel").value); 
        let imovel = parseFloat(document.querySelector(".valorImovel").value);
       let ganho = imovel / aluguel

        const resultante = document.querySelector("#resultante");

        if (isNaN(aluguel) || isNaN(imovel) || isNaN(ganho) || aluguel <= 0 || ganho < 0 || imovel < 0) {
            resultante.textContent = "Erro no preenchimento do formulário";
            return; 
        } else {
            resultante.textContent ="O valor do imóvel será coberto em " + ganho + " meses ou " + (ganho/12) + " anos.";
        }

        console.log(ganho);
    });
});
