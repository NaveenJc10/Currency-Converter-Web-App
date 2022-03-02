//This is for dropdown list in .content-2
const dropList2 = document.querySelectorAll(".content-2 select"),
  fromCurrency2 = document.querySelector(".from2 select"),
  toCurrency2 = document.querySelector(".to2 select"),
  exchangeIcon2 = document.querySelector(".icon2");

//Getting Currencies of supported countries
for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_currencies) {
    // USD is selected by default To MYR
    let selected =
      i == 0
        ? currency_code == "USD"
          ? "selected"
          : ""
        : currency_code == "MYR"
        ? "selected"
        : "";

    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    // Drop down list options to select from are inserted here
    dropList2[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList2[i].addEventListener("change", (e) => {
    countryFlags2(e.target); // calling countryFlags with passing target element as an argument
    getListings();
  });
}

window.addEventListener("load", () => {
  getListings();
});

exchangeIcon2.addEventListener("click", () => {
  let tempCode = fromCurrency2.value;
  fromCurrency2.value = toCurrency2.value; // passing TO currency code -> FROM currency code
  toCurrency2.value = tempCode;
  countryFlags(fromCurrency2); // calling countryFlags with passing select element (fromCurrency) of FROM
  countryFlags(toCurrency2); // calling countryFlags with passing select element (toCurrency) of TO
  getListings();
});

function countryFlags2(element) {
  for (let code in country_currencies) {
    if (code == element.value) {
      // if currency code of supported-currencies is = to option value
      let imgTag = element.parentElement.querySelector("img"); // selecting img tag of specific drop-list
      // passing country code of a selected currency code in a img url
      imgTag.src = `images/${country_currencies[code]}.webp`;
    }
  }
}

function getListings() {
  let bottomSection = document.querySelector(".bottom-section");

  let url = `https://v6.exchangerate-api.com/v6/d7bc46ce2b7ea657c8af94d0/latest/${fromCurrency2.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency2.value].toFixed(3); // fetching the TO selected option from user
      let competitors = competitorRates[fromCurrency2.value][toCurrency2.value];
      //Modify the table
      // 1) Empty container
      bottomSection.innerHTML = "";
      // 2) Add HTML
      let competitorList = "";
      for (let i = 1; i < competitors.length; i++) {
        competitorList += `<tr><td><img src="./competitor_logos/${
          competitors[i][0]
        }" alt="Company logo"/></td>
        <td>${competitors[i][1]}</td>
        <td>${competitors[i][2]} ${
          competitors[i][2] == "-" ? "" : fromCurrency2.value
        }</td></tr>`;
      }
      let row =
        `<table class="rates-table">
        <tr class="column-header">
          <td>Provider</td>
          <td>Exchange Rate (<span style="color: rgb(193, 193, 255);">${
            fromCurrency2.value
          }</span>&#8594;<span style="color: #fd7f7f;">${
          toCurrency2.value
        }</span>)</td>
          <td>Transfer fee</td>
        </tr>
        <tr>
          <td><img src="./images/companylogo.webp" alt="Company logo"/></td>
          <td>${exchangeRate}</td>
          <td>${competitors[0]} ${
          competitors[0] == "-" ? "" : fromCurrency2.value
        }</td>
        </tr>` +
        competitorList +
        "</table>";
      // 3) Populate table with new data
      bottomSection.insertAdjacentHTML("beforeend", row);
    })
    .catch(() => {
      // Since we are using API to fetch data, users might run into connection issues sometimes.
      if (bottomSection.innerHTML) bottomSection.innerHTML = "";
      let row = `<div class="rates-nodata">
      <h1>NO DATA AVAILABLE!</h1>
      <p>We couldn't fetch online data at the moment. Please try again later. <br /> Tip: Try another currency option!</p>
    </div>`;
      bottomSection.insertAdjacentHTML("beforeend", row);
    });
}
