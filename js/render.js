
function renderScreens() {

  const setupScreen =
    document.getElementById("setup-screen");

  const dailyScreen =
    document.getElementById("daily-screen");



  if (state.isSetupComplete) {

    setupScreen.style.display = "none";

    dailyScreen.style.display = "block";

  } else {

    setupScreen.style.display = "block";

    dailyScreen.style.display = "none";
  }
}



function renderSalesTable() {

  const tbody =
    document.getElementById("sales-body");



  tbody.innerHTML =

    state.products.map(product => {

      const sale =

        state.sales.find(s =>
          s.productId === product.id
        );



      return `
        <tr>

          <td>${product.name}</td>

          <td>${product.fixedPrice}</td>

          <td>

            <input
              type="number"
              value="${sale?.qty || 0}"

              onmouseout="
                updateQty(
                  '${product.id}',
                  this.value
                )
              "
            >

          </td>

          <td>
            ${sale?.total || 0}
          </td>

        </tr>
      `;
    }).join("");
}



function renderExpensesTable() {

  const tbody =
    document.getElementById("expenses-body");



  const allExpenses = [

    ...state.fixedExpenses,

    ...state.dailyExpenses
  ];



  tbody.innerHTML =

    allExpenses.map(exp => {

      return `
        <tr>

          <td>${exp.name}</td>

          <td>${exp.amount}</td>

        </tr>
      `;
    }).join("");
}



function renderSummary() {

  const summary =
    document.getElementById("summary");



  summary.innerHTML = `

    <p>
      Sales Total:
      ${state.summary.salesTotal}
    </p>

    <p>
      Expenses Total:
      ${state.summary.expensesTotal}
    </p>

    <p>
      Net:
      ${state.summary.net}
    </p>

    <p>
      Missing / Difference:
      ${state.summary.missing}
    </p>

  `;
}



function renderAll() {

  renderScreens();

  renderSalesTable();

  renderExpensesTable();

  renderSummary();
}
