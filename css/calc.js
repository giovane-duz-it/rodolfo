document.addEventListener("DOMContentLoaded", function () {
    let chartInstance; // Variável para armazenar a referência ao gráfico

    document.getElementById("calcular").addEventListener("click", function () {
        const capital = parseFloat(document.querySelector(".capital").value);
        const juros = parseFloat(document.querySelector(".porcentagem").value) / 100;
        const opcao = document.querySelector('input[name="exampleRadios"]:checked').value;

        const resultante = document.querySelector("#resultante");

        // Verifica valores inválidos
        if (isNaN(capital) || isNaN(juros) || capital <= 0 || juros <= 0) {
            resultante.textContent = "Erro no preenchimento do formulário";
            return;
        }

        // Define o número de períodos com base na opção escolhida
        const numPeriodos = opcao === "1" ? 12 : 12 * 12; // 12 meses ou 12 anos (12 meses por ano)
        const tipoPeriodo = opcao === "1" ? "Mês" : "Ano";

        // Ajusta a taxa de juros para mensal ou anual
        const taxa = opcao === "1" ? juros / 12 : juros;

        // Calcula o montante para cada período
        const montantes = [];
        const periodos = [];
        for (let i = 1; i <= numPeriodos; i++) {
            const montante = capital + (capital * taxa * i); // Fórmula de juros simples

            if (opcao === "1") {
                montantes.push(montante);
                periodos.push(`Mês ${i}`);
            } else if (i % 12 === 0) {
                montantes.push(montante);
                periodos.push(`Ano ${i / 12}`); // Apenas um ponto por ano
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
