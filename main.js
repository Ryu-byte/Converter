// Объект с курсами 4х валют
const rates = {};
// Элементы для отображения валют
const elementUSD = document.querySelector("[data-value='USD']");
const elementEUR = document.querySelector("[data-value='EUR']");
const elementGBP = document.querySelector("[data-value='GBP']");
const elementUAH = document.querySelector("[data-value='UAH']");

// Элементы формы, ввод суммы, выбор валюты, результат
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrencies();
//Получение курса валют и их отображение
async function getCurrencies () {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;
    rates.UAH = result.Valute.UAH;

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);
    elementUAH.textContent = rates.UAH.Value.toFixed(2);

    // Цвет информера USD
    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('bottom');
    }
    // Цвет информера EUR
    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }
    // Цвет информера GBP
    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
    } else {
        elementGBP.classList.add('bottom');
    }
    // Цвет информера USD
    if (rates.UAH.Value > rates.UAH.Previous) {
        elementUAH.classList.add('top');
    } else {
        elementUAH.classList.add('bottom');
    }
}
// Изменения ввода текстовом поле или в выброре
input.oninput = convertValue;
select.oninput = convertValue;
// Функция конвертации
function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
}

