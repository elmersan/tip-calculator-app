// SELECTORS
const percentages = document.querySelectorAll(".percentage");
const bill = document.querySelector("#bill");
const tip_amount = document.querySelector("#tip_amount");
const number_of_people = document.querySelector("#number_of_people");
const total = document.querySelector("#total");
const custom_percentage = document.querySelector("#custom_percentage");
const reset = document.querySelector(".reset");
const error = document.querySelector("#error");

let perc = 0;
let custom = false;

function tipAmount(num_percentage) {
  if (bill.value !== "" && perc !== 0) {
    let operation = `(${bill.value} * (${num_percentage}/100))/${number_of_people.value}`;
    tip_amount.innerHTML = `$${eval(operation).toFixed(2)}`;
  }
}

function addActiveButton() {
  percentages.forEach((item) => {
    if (item.dataset.percentage === perc && !custom) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function showResult(num_perc) {
  if (number_of_people.value !== "" && parseInt(number_of_people.value) !== 0) {
    tipAmount(num_perc);
    let operation = `(${bill.value} + (${bill.value} * (${num_perc}/100)) )/${number_of_people.value}`;
    total.innerHTML = `$${eval(operation).toFixed(2)}`;

    error.style.display = "none";
    number_of_people.classList.remove("isError");
  } else {
    error.style.display = "block";
    number_of_people.classList.add("isError");
  }
}

percentages.forEach((item) => {
  item.addEventListener("click", () => {
    custom = false;
    perc = item.dataset.percentage;
    custom_percentage.value = "";
    addActiveButton();
    if (
      number_of_people.value !== "" &&
      parseInt(number_of_people.value) !== 0
    ) {
      showResult(perc);
    }
  });
});

function validateNumbers(obj) {
  obj.value = obj.value.replace(/\D/g, "");
  reset.disabled = false;

  if (
    custom &&
    custom_percentage.value !== "" &&
    parseInt(number_of_people.value) !== 0
  ) {
    showResult(custom_percentage.value);
  } else {
    showResult(perc);
  }
}

custom_percentage.addEventListener("focus", () => {
  custom = true;
  addActiveButton();
});

reset.addEventListener("click", () => {
  bill.value = "";
  custom_percentage.value = "";
  number_of_people.value = "";
  perc = 0;
  custom = false;
  reset.disabled = true;
  total.innerHTML = "$0.00";
  tip_amount.innerHTML = "$0.00";

  number_of_people.classList.remove("isError");

  percentages.forEach((item) => {
    item.classList.remove("active");
  });
});
