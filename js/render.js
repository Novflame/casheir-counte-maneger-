// HTML Escaping utility function to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

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

          <td>${escapeHtml(product.name)}</td>

          <td>${product.fixedPrice.toFixed(2)}</td>

          <td>

            <input
              type="number"
              class="qty-input"
              data-product-id="${product.id}"
              value="${sale?.qty || 0}"
              min="0"
              step="1"
            >

          </td>

          <td>
            ${(sale?.total || 0).toFixed(2)}
          </td>

        </tr>
      `;
    }).join("");

  // Add event listeners for quantity inputs
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', (e) => {
      updateQty(e.target.dataset.productId, e.target.value);
    });
  });
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

          <td>${escapeHtml(exp.name)}</td>

          <td>${exp.amount.toFixed(2)}</td>

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
      <strong>${state.summary.salesTotal.toFixed(2)}</strong>
    </p>

    <p>
      Expenses Total:
      <strong>${state.summary.expensesTotal.toFixed(2)}</strong>
    </p>

    <p>
      Net:
      <strong>${state.summary.net.toFixed(2)}</strong>
    </p>

    <p>
      Missing / Difference:
      <strong style="color: ${state.summary.missing < 0 ? 'red' : 'green'}">
        ${state.summary.missing.toFixed(2)}
      </strong>
    </p>

  `;
}



function renderAll() {

  renderScreens();

  renderSalesTable();

  renderExpensesTable();

  renderSummary();
}
