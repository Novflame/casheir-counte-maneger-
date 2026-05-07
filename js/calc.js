
//from home android
function calculateTotals() {

  state.summary.salesTotal =

    state.sales.reduce((acc, sale) => {
      return acc + sale.total;
    }, 0);



  const allExpenses = [

    ...state.fixedExpenses,

    ...state.dailyExpenses

  ];



  state.summary.expensesTotal =

    allExpenses.reduce((acc, exp) => {
      return acc + exp.amount;
    }, 0);



  state.summary.net =

    state.summary.salesTotal
    - state.summary.expensesTotal;



  const actualMoney =

    state.summary.cash
    + state.summary.bank;



  state.summary.missing =

    actualMoney
    - state.summary.net;
}
