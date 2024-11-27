document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calcular2").addEventListener("click", function () {
        
        const valor = parseFloat(document.getElementById('valor').value);
        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;

        // Depuração: verificando os valores de entrada
        console.log("Valor inserido:", valor);
        console.log("Moeda de origem:", fromCurrency);
        console.log("Moeda de destino:", toCurrency);

        if (isNaN(valor) || valor <= 0) {
            alert("Por favor, insira um valor válido.");
            return;
        }

        // Chama a função para converter a moeda
        convertCurrency(valor, fromCurrency, toCurrency);
    });

    async function convertCurrency(valor, fromCurrency, toCurrency) {
        const apiUrl = `https://v6.exchangerate-api.com/v6/0e8cd4a2f99e5d83961ddf2a/latest/${fromCurrency}`;
    
        // Depuração: Verificando a URL da API
        console.log("URL da API:", apiUrl);
    
        try {
            const response = await fetch(apiUrl);
            
            // Depuração: Verificando o status da resposta da API
            console.log("Status da resposta:", response.status);
    
            if (!response.ok) {
                throw new Error("Erro ao obter taxa de câmbio: " + response.statusText);
            }
    
            const data = await response.json();
    
            // Depuração: Verificando os dados recebidos da API
            console.log("Dados da API:", data);
    
            if (data.error) {
                throw new Error("Erro ao obter taxa de câmbio");
            }
    
            if (data.conversion_rates && data.conversion_rates[toCurrency]) {
                const exchangeRate = data.conversion_rates[toCurrency];
                const convertedValue = (valor * exchangeRate).toFixed(2);
    
                const resultMessage = `${valor} ${fromCurrency} = ${convertedValue} ${toCurrency}`;
    
                // Exibindo o resultado da conversão
                document.getElementById('resultado').innerText = resultMessage;
    
                // Depuração: Exibindo o resultado
                console.log("Resultado da conversão:", resultMessage);
            } else {
                throw new Error("Taxa de câmbio não encontrada para a moeda selecionada.");
            }
        } catch (error) {
            document.getElementById('resultado').innerText = "Erro ao realizar a conversão. Tente novamente.";
    
            // Depuração: Exibindo o erro
            console.error("Erro na conversão:", error);
        }
    }
    
});
