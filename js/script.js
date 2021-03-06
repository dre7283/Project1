var exchangeRateEl = document.querySelector(".exchange-rate")

//Defining variables below; grabbing static selectors from html//

var enterAmountEl = document.querySelector("#enter-amount")
var dropListEl = document.querySelectorAll(".option");
var fromCurrencyEl = document.querySelector("#from-currency")
var toCurrencyEl = document.querySelector("#to-currency")
var formEl = document.querySelector("#form")
var fromImageEl = document.querySelector("#from-image")
var toImageEl = document.querySelector("#to-image")
var getBtn = document.querySelector("#get-button")
var historyEl = document.querySelector("#history")
var historyWrapperEl = document.querySelector(".history-wrapper")
var results = []
var clearBtn = document.querySelector("#clear-button")
var searchDisplayEl = document.querySelector("#search-display")

//Gets currency exchange rate from the API, then performs the desired conversion using a math equation//

function getExchangeRate(event) {
    event.preventDefault()
    console.log(fromCurrencyEl.value, " to ", toCurrencyEl.value)
    var requestURL = `https://api.exchangerate.host/convert?from=${fromCurrencyEl.value}&to=${toCurrencyEl.value}`;
    fetch(requestURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (currencyData) {
            var currency = currencyData.result * parseInt(enterAmountEl.value)
            console.log(currencyData)
            exchangeRateEl.textContent = `$${enterAmountEl.value} ${fromCurrencyEl.value} = $${currency.toFixed(2)}  ${toCurrencyEl.value}`
            results.push(exchangeRateEl.textContent)
            localStorage.setItem("currency", JSON.stringify(results))
            displayHistory()

        })
}

//Function below stores previous conversion results in local storage, then displays each result in a list//
function displayHistory() {
    var currencyHistory = JSON.parse(localStorage.getItem("currency"))
    if (currencyHistory) {
        results = currencyHistory
        searchDisplayEl.classList.remove("hide")
        clearBtn.classList.remove("hide")
    }
    historyEl.innerHTML = ""
    for (i = 0; i < results.length; i++) {
        historyEl.innerHTML = historyEl.innerHTML + "<li>" + results[i] + "</li>"

    }
}

//This function gets flag image from an API and dislays the corresponding flag when that country's currency option is selected//
function changeFromImage() {
    var flagURL = `https://countryflagsapi.com/png/${fromCurrencyEl.value.substring(0, 2)}`
    fromImageEl.src = flagURL
}

//triggers the flag change when the option is selected//
fromCurrencyEl.addEventListener("change", changeFromImage)

//Same as change fromImage function, but for the toImage//
function changeToImage() {
    var flagURL = `https://countryflagsapi.com/png/${toCurrencyEl.value.substring(0, 2)}`
    toImageEl.src = flagURL
}



toCurrencyEl.addEventListener("change", changeToImage)
formEl.addEventListener("submit", getExchangeRate)

displayHistory();

//Clears local storage/search history when the Clear History button is pressed//
function clearHistory() {
    localStorage.removeItem("currency");
    location.reload();
}
clearBtn.addEventListener("click", clearHistory)