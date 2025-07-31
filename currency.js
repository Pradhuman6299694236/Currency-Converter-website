const BASE_URL = "https://open.er-api.com/v6/latest";
const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurrency = document.querySelector(".from .select-container select");
let toCurrency = document.querySelector(".to .select-container select");
let resultPrinting = document.querySelector(".container form .msg");


for(select of dropdowns){
    for(let currCode in currencyCode){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);

    if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
    }else if(select.name === "to" && currCode === "INR"){
        newOption.selected ="selected";
    }
}
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = currencyCode[currCode];
    let newSource = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSource;
};

btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amountval = amount.value;
    if(amountval==="" || amountval < 1){
        amountval = 1;
        amount.value = "1";
    }
    // console.log(fromCurrency.value,toCurrency.value);
    let URL = `${BASE_URL}/${fromCurrency.value}`;
    let apiValue = await fetch(URL);
    let orgValue = await apiValue.json();
    let toCurrencyValue = toCurrency.value; 

    let result = orgValue.rates[toCurrencyValue];
    resultPrinting.innerText = `${amountval} ${fromCurrency.value} = ${result*amountval} ${toCurrency.value}`;
    // console.log(result);

});