// SELECTORS
const percentages = document.querySelectorAll(".percentage");
const bill = document.querySelector("#bill");
const tip_amount = document.querySelector("#tip_amount");

function tipAmount(percentage_number) {
  if (bill.value !== "" && percentage_number !== "") {
    let operation = `(${bill.value} * (${percentage_number}/100))/5`;
    console.log(operation);
    console.log(eval(operation));
    console.log(eval(operation).toFixed(2));
    tip_amount.innerHTML = `$${eval(operation).toFixed(2)}`;
  }
}

percentages.forEach((item) => {
  item.addEventListener("click", () => {
    tipAmount(item.dataset.percentage);
  });
});
