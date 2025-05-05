// Obtendo elementos do formulario
const form = document.getElementById("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");

// Recebendo somente números no input
amount.addEventListener("input", () => {
    const hasCharacteresRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharacteresRegex, "");
});

// Captando submit do form
form.onsubmit = async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    console.log(currency.value);

    switch (currency.value) {
        case "USD":
        case "EUR":
        case "GBP":
            await convertCurrency(amount.value, currency.value);
            break;
        default:
            console.log("Moeda não suportada.");
            alert("Moeda não suportada.");
    }
};

// Convertendo moeda
async function convertCurrency(amount, currency) {
    const url = `https://economia.awesomeapi.com.br/json/last/${currency}-BRL`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const exchangeRate = data[`${currency}BRL`].bid; // Cotação de compra
        const convertedValue = (amount * exchangeRate).toFixed(2);

        console.log(`Valor convertido: R$ ${convertedValue}`);
        alert(`Valor convertido para ${currency}: R$ ${convertedValue}`);
    } catch (error) {
        console.error("Erro ao buscar cotação:", error);
        alert("Erro ao obter a cotação. Por favor, tente novamente.");
    }
}
