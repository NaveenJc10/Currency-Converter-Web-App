const dropList = document.querySelectorAll("form select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  input = document.querySelector("form input");
for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_currencies) {
    let selected,
      optionTag = `<option value="${currency_code}" ${
        0 == i
          ? "MYR" == currency_code
            ? "selected"
            : ""
          : "USD" == currency_code
          ? "selected"
          : ""
      }>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    countryFlags(e.target), getExchangeRate();
  });
}
function countryFlags(element) {
  for (let code in country_currencies)
    if (code == element.value) {
      let imgTag;
      element.parentElement.querySelector(
        "img"
      ).src = `images/${country_currencies[code]}.webp`;
    }
}
window.addEventListener("load", () => {
  getExchangeRate();
}),
  input.addEventListener("input", () => {
    getExchangeRate();
  });
const exchangeIcon = document.querySelector("form .icon");
function getExchangeRate() {
  const exchangeRateTxt = document.querySelector("form .display-conversion"),
    exchangeRateTxt2 = document.querySelector("form .display-rate");
  let amountValue = input.value;
  ("" != amountValue && "0" != amountValue) ||
    ((input.value = "1"), (amountValue = 1)),
    (exchangeRateTxt.innerText = "Fetching latest rate...");
  let url = `https://v6.exchangerate-api.com/v6/d7bc46ce2b7ea657c8af94d0/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value],
        totalExchangeRate = (amountValue * exchangeRate).toFixed(2);
      (exchangeRateTxt.innerText = ""),
        exchangeRateTxt.insertAdjacentHTML(
          "beforeend",
          `${amountValue} <span style="color:rgb(80, 80, 255);">${fromCurrency.value}</span> <span style="color: rgb(75, 87, 156);">=</span> ${totalExchangeRate} <span style="color: rgb(209, 52, 52);">${toCurrency.value}</span>`
        ),
        (exchangeRateTxt2.innerText = `Exchange rate: x${exchangeRate}`);
    })
    .catch(() => {
      exchangeRateTxt.innerText = "404, Couldn't fetch data!";
    });
}
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  (fromCurrency.value = toCurrency.value),
    (toCurrency.value = tempCode),
    countryFlags(fromCurrency),
    countryFlags(toCurrency),
    getExchangeRate();
});
