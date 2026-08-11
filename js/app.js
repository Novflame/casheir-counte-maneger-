//from android




function createId() {
  return crypto.randomUUID();
}



function saveState() {

  localStorage.setItem(
    "daily-system",
    JSON.stringify(state)
  );
}



function loadState() {

  const data =
    localStorage.getItem("daily-system");

  if (!data) return;

  Object.assign(
    state,
    JSON.parse(data)
  );
}



function addProduct() {

  const name =
    document.getElementById("product-name").value;

  const fixedPrice =
    +document.getElementById("product-price").value;



  if (!name || !fixedPrice) return;



  state.products.push({

    id: createId(),

    name,

    fixedPrice
  });



  saveState();

  // Clear input fields
  document.getElementById("product-name").value = "";
  document.getElementById("product-price").value = "";

  renderAll();
}



function addFixedExpense() {

  const name =
    document.getElementById("fixed-expense-name").value;

  const amount =
    +document.getElementById("fixed-expense-amount").value;



  if (!name || !amount) return;



  state.fixedExpenses.push({

    id: createId(),

    name,

    amount
  });



  saveState();

  // Clear input fields
  document.getElementById("fixed-expense-name").value = "";
  document.getElementById("fixed-expense-amount").value = "";

  renderAll();
}



function finishSetup() {

  state.isSetupComplete = true;

  saveState();

  renderAll();
}



function updateQty(productId, qty) {

  qty = +qty;



  const product =

    state.products.find(p =>
      p.id === productId
    );



  let sale =

    state.sales.find(s =>
      s.productId === productId
    );



  if (!sale) {

    sale = {

      productId,

      qty: 0,

      total: 0
    };

    state.sales.push(sale);
  }



  sale.qty = qty;

  sale.total =
    qty * product.fixedPrice;



  calculateTotals();

  saveState();

  renderAll();
}



function addDailyExpense() {

  const name =
    document.getElementById("expense-name").value;

  const amount =
    +document.getElementById("expense-amount").value;



  if (!name || !amount) return;



  state.dailyExpenses.push({

    id: createId(),

    name,

    amount
  });



  calculateTotals();

  saveState();

  // Clear input fields
  document.getElementById("expense-name").value = "";
  document.getElementById("expense-amount").value = "";

  renderAll();
}



function updateCash(value) {

  state.summary.cash = +value;

  calculateTotals();

  saveState();

  renderAll();
}



function updateBank(value) {

  state.summary.bank = +value;

  calculateTotals();

  saveState();

  renderAll();
}



function startNewDay() {

  state.sales = [];

  state.dailyExpenses = [];



  state.summary = {

    salesTotal: 0,

    expensesTotal: 0,

    net: 0,

    cash: 0,

    bank: 0,

    missing: 0
  };



  saveState();

  renderAll();
}



document
  .getElementById("add-product-btn")
  .addEventListener("click", addProduct);



document
  .getElementById("add-fixed-expense-btn")
  .addEventListener("click", addFixedExpense);



document
  .getElementById("finish-setup-btn")
  .addEventListener("click", finishSetup);



document
  .getElementById("add-expense-btn")
  .addEventListener("click", addDailyExpense);



document
  .getElementById("cash-input")
  .addEventListener("input", e => {
    updateCash(e.target.value);
  });



document
  .getElementById("bank-input")
  .addEventListener("input", e => {
    updateBank(e.target.value);
  });



document
  .getElementById("new-day-btn")
  .addEventListener("click", startNewDay);


loadState();

calculateTotals();

renderAll();
