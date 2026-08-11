
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Exepensess() {
  const navigate = useNavigate();


  // ====replacing fixed expensess with live exp form and table====//
   
  // const [fixedExpensess, setFixedExpensass] = useState(() => {
  //   const saved = JSON.parse(
  //     localStorage.getItem("fixedExpensess")
  //   );

  //   //dumping fixed Expenssess component 

  //   if (Array.isArray(saved)) {
  //     return saved;
  //   }

  //   return saved?.expenses || [];
  // });
 const [exp, setExp] = useState([]);
  const [expName, setExpName] = useState("");
  const [expAmount, setExpAmount] = useState("");
 

  const totalExpenses = exp.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  function handleForm(e) {
    e.preventDefault();

    if (!expName.trim() || !expAmount) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      expName: expName.trim(),
      amount: Number(expAmount),
    };

    const updatedExpenses = [
      ...exp,
      newExpense,
    ];

    // Update React state
    setExp(updatedExpenses);

    // Save the SAME structure expected by Report
    const expensesData = {
      expenses: updatedExpenses,
      total: updatedExpenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      ),
    };

    localStorage.setItem(
      "fixedExpensess",
      JSON.stringify(expensesData)
    );

    setExpName("");
    setExpAmount("");
  }

  function addToTable() {
    if (exp.length === 0) {
      return;
    }

    navigate("/Report");
  }

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "25px",
      boxSizing: "border-box",
      backgroundColor: "#0f172a",
    },

    container: {
      width: "100%",
      maxWidth: "700px",
      margin: "0 auto",
    },

    title: {
      textAlign: "center",
      color: "#ffffff",
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "25px",
    },

    formCard: {
      backgroundColor: "#1e293b",
      padding: "25px",
      borderRadius: "16px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },

    field: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },

    label: {
      color: "#ffffff",
      fontSize: "19px",
      fontWeight: "600",
    },

    input: {
      width: "100%",
      height: "50px",
      padding: "10px 14px",
      boxSizing: "border-box",
      backgroundColor: "#ffffff",
      color: "#111827",
      border: "2px solid #94a3b8",
      borderRadius: "8px",
      fontSize: "18px",
      outline: "none",
    },

    addButton: {
      width: "140px",
      alignSelf: "center",
      padding: "12px",
      backgroundColor: "#f59e0b",
      color: "#111827",
      border: "none",
      borderRadius: "10px",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
    },

    tableCard: {
      marginTop: "30px",
      backgroundColor: "#1e293b",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
      overflowX: "auto",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#ffffff",
      color: "#111827",
    },

    th: {
      padding: "14px",
      border: "1px solid #64748b",
      backgroundColor: "#cbd5e1",
      color: "#111827",
      fontSize: "18px",
      textAlign: "left",
    },

    td: {
      padding: "14px",
      border: "1px solid #64748b",
      fontSize: "18px",
    },

    empty: {
      padding: "20px",
      textAlign: "center",
      color: "#64748b",
    },

    saveButton: {
      width: "100%",
      marginTop: "20px",
      padding: "14px",
      backgroundColor: "#16a34a",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "20px",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        <h1 style={styles.title}>
          Expenses
        </h1>

        {/* FORM */}

        <div style={styles.formCard}>

          <form
            onSubmit={handleForm}
            style={styles.form}
          >

            <div style={styles.field}>

              <label
                htmlFor="expenseName"
                style={styles.label}
              >
                Expense Name
              </label>

              <input
                id="expenseName"
                name="expenseName"
                type="text"
                value={expName}
                placeholder="Enter expense name"
                onChange={(e) =>
                  setExpName(e.target.value)
                }
                style={styles.input}
              />

            </div>

            <div style={styles.field}>

              <label
                htmlFor="expenseAmount"
                style={styles.label}
              >
                Expense Amount
              </label>

              <input
                id="expenseAmount"
                name="expenseAmount"
                type="number"
                min="0"
                value={expAmount}
                placeholder="Enter amount"
                onChange={(e) =>
                  setExpAmount(e.target.value)
                }
                style={styles.input}
              />

            </div>

            <button
              type="submit"
              style={styles.addButton}
            >
              ADD
            </button>

          </form>

        </div>

        {/* EXPENSE TABLE */}

        <div style={styles.tableCard}>

          <h2
            style={{
              color: "#ffffff",
              fontSize: "24px",
              marginBottom: "15px",
            }}
          >
            Expenses
          </h2>

          <table style={styles.table}>

            <thead>

              <tr>

                <th style={styles.th}>
                  Expense
                </th>

                <th style={styles.th}>
                  Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {exp.length === 0 ? (

                <tr>

                  <td
                    colSpan="2"
                    style={styles.empty}
                  >
                    No expenses added
                  </td>

                </tr>

              ) : (

                exp.map((expense) => (

                  <tr key={expense.id}>

                    <td style={styles.td}>
                      {expense.expName}
                    </td>

                    <td style={styles.td}>
                      {expense.amount}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

            <tfoot>

              <tr>

                <td
                  style={{
                    ...styles.td,
                    fontWeight: "bold",
                    backgroundColor: "#cbd5e1",
                  }}
                >
                  Total
                </td>

                <td
                  style={{
                    ...styles.td,
                    fontWeight: "bold",
                    backgroundColor: "#cbd5e1",
                  }}
                >
                  {totalExpenses}
                </td>

              </tr>

            </tfoot>

          </table>

          <button
            type="button"
            onClick={addToTable}
            disabled={exp.length === 0}
            style={{
              ...styles.saveButton,
              opacity:
                exp.length === 0
                  ? 0.5
                  : 1,
              cursor:
                exp.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            SAVE & CONTINUE
          </button>

        </div>

      </div>

    </div>
  );
}


