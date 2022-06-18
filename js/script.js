var exchangeRateEl = document.querySelector(".exchange-rate")



var enterAmountEl = document.querySelector("#enter-amount")
var dropListEl = document.querySelectorAll(".option");
var fromCurrencyEl = document.querySelector("#from-currency")
var toCurrencyEl = document.querySelector("#to-currency")
var formEl = document.querySelector("#form")
var fromImageEl = document.querySelector("#from-image")
var toImageEl = document.querySelector("#to-image")


for (let i = 0; i < dropListEl.length; i++) {
    console.log(dropListEl [i].value)
    
}

function getExchangeRate(event){
    event.preventDefault()
    console.log(fromCurrencyEl.value, " to ", toCurrencyEl.value)
    var requestURL = `https://api.exchangerate.host/convert?from=${fromCurrencyEl.value}&to=${toCurrencyEl.value}`;
    fetch(requestURL)
    .then(function(response){
        return response.json()
    })
    .then(function(currencyData){
        var currency = currencyData.result * parseInt(enterAmountEl.value)
        console.log(currencyData)
        exchangeRateEl.textContent=`$${enterAmountEl.value} ${fromCurrencyEl.value} = $${currency.toFixed(2)}  ${toCurrencyEl.value}`
    })
}

function changeFromImage(){
    var flagURL = `https://countryflagsapi.com/png/${fromCurrencyEl.value.substring(0,2)}`
    fromImageEl.src=flagURL
}


fromCurrencyEl.addEventListener("change", changeFromImage)

function changeToImage(){
    var flagURL = `https://countryflagsapi.com/png/${toCurrencyEl.value.substring(0,2)}`
    toImageEl.src=flagURL
}


toCurrencyEl.addEventListener("change", changeToImage)

formEl.addEventListener("submit", getExchangeRate)
