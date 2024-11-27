document.addEventListener("DOMContentLoaded", function () {
    let chartInstance; // Definir a variável de instância do gráfico fora da função

    document.getElementById("calcular").addEventListener("click", function () {
        const opcao = document.querySelector('input[name="exampleRadios"]:checked').value; // Mover para antes de usar 'opcao'
        const capital = parseFloat(document.querySelector(".capital").value);
        const juros = parseFloat(document.querySelector(".porcentagem").value) / 100; 
        const taxa = juros; // Para ambos os casos, a taxa de juros é a mesma, apenas o número de períodos muda
        
        const resultante = document.querySelector("#resultante");

        if (isNaN(capital) || isNaN(juros) || capital <= 0 || juros <= 0) {
            resultante.textContent = "Erro no preenchimento do formulário";
            return;
        }

        // Definindo o número de períodos e a descrição dos períodos
        let numPeriodos = 0;
        let tipoPeriodo = '';
        let montantes = [];
        let periodos = [];
        
        if (opcao === "1") { // Mensal
            numPeriodos = 12; // 12 meses
            tipoPeriodo = "Mês";
            for (let i = 1; i <= numPeriodos; i++) {
                const montante = capital * Math.pow(1 + taxa, i); // Fórmula de juros compostos mensal
                montantes.push(montante);
                periodos.push(`${tipoPeriodo} ${i}`);
            }
        } else if (opcao === "2") { // Juros compostos mensais, mas com ponto por ano
            const numAnos = 12; // Número de anos
            const meses = numAnos * 12; // Total de meses em 12 anos
            tipoPeriodo = "Ano";    
            
            // Cálculo mensal, mas marcando os pontos apenas a cada ano
            for (let i = 1; i <= meses; i++) {
                const montante = capital * Math.pow(1 + taxa, i); // Fórmula de juros compostos mensal
                // Adiciona o montante a cada 12 meses (final de cada ano)
                if (i % 12 === 0) {
                    montantes.push(montante);
                    periodos.push(`${tipoPeriodo} ${i / 12}`); // Exibe ano (não mês)
                }
            }
        }
        
        // Exibe o resultado final
        resultante.textContent = `Montante no último período: ${montantes[montantes.length - 1].toLocaleString("pt-br", { style: "currency", currency: "BRL" })}`;

        // Destroi o gráfico anterior, se existir
        if (chartInstance) {
            chartInstance.destroy();
        }

        // Gera o gráfico
        const ctx = document.getElementById("myChart").getContext("2d");
        chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: periodos,
                datasets: [{
                    label: "Montante (R$)",
                    data: montantes,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2,
                    tension: 0.4,
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Evolução do Montante",
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Montante (R$)",
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: "Períodos",
                        },
                    },
                },
            },
        });
    });
});
