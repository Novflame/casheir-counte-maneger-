



import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Exepensess() {
  const navigate = useNavigate();
  const location = useLocation();

  const isUpdateMode =
    new URLSearchParams(location.search).get("mode") === "update";

  // =========================
  // LOAD EXPENSES
  // =========================

  const [exp, setExp] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("fixedExpensess")
    );

    // New structure:
    // {
    //   expenses: [],
    //   total: 0
    // }

    if (
      saved &&
      !Array.isArray(saved) &&
      Array.isArray(saved.expenses)
    ) {
      return saved.expenses;
    }

    // Backward compatibility
    if (Array.isArray(saved)) {
      return saved;
    }

    return [];
  });

  // =========================
  // FORM STATE
  // =========================

  const [expName, setExpName] = useState("");
  const [expAmount, setExpAmount] = useState("");

  const [editingId, setEditingId] = useState(null);

  // =========================
  // TOTAL
  // =========================

  const totalExpenses = exp.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  // =========================
  // SAVE TO LOCAL STORAGE
  // =========================

  function saveExpenses(updatedExpenses) {
    const total = updatedExpenses.reduce(
      (sum, expense) => sum + Number(expense.amount || 0),
      0
    );

    const expensesData = {
      expenses: updatedExpenses,
      total,
    };

    localStorage.setItem(
      "fixedExpensess",
      JSON.stringify(expensesData)
    );
  }

  // =========================
  // ADD / UPDATE
  // =========================

  function handleForm(e) {
    e.preventDefault();

    if (!expName.trim() || expAmount === "") {
      return;
    }

    const amount = Number(expAmount);

    if (amount < 0 || Number.isNaN(amount)) {
      return;
    }

    // =====================
    // UPDATE EXISTING
    // =====================

    if (editingId !== null) {
      const updatedExpenses = exp.map((expense) =>
        expense.id === editingId
          ? {
              ...expense,
              expName: expName.trim(),
              amount,
            }
          : expense
      );

      setExp(updatedExpenses);
      saveExpenses(updatedExpenses);

      setEditingId(null);
      setExpName("");
      setExpAmount("");

      return;
    }

    // =====================
    // ADD NEW
    // =====================

    const newExpense = {
      id: Date.now(),
      expName: expName.trim(),
      amount,
    };

    const updatedExpenses = [
      ...exp,
      newExpense,
    ];

    setExp(updatedExpenses);
    saveExpenses(updatedExpenses);

    setExpName("");
    setExpAmount("");
  }

  // =========================
  // EDIT
  // =========================

  function handleEdit(expense) {
    setEditingId(expense.id);
    setExpName(expense.expName);
    setExpAmount(String(expense.amount));
  }

  // =========================
  // CANCEL EDIT
  // =========================

  function handleCancelEdit() {
    setEditingId(null);
    setExpName("");
    setExpAmount("");
  }

  // =========================
  // DELETE
  // =========================

  function handleDelete(id) {
    const updatedExpenses = exp.filter(
      (expense) => expense.id !== id
    );

    setExp(updatedExpenses);
    saveExpenses(updatedExpenses);

    // If deleting the currently edited expense
    if (editingId === id) {
      setEditingId(null);
      setExpName("");
      setExpAmount("");
    }
  }

  // =========================
  // CONTINUE
  // =========================

  function addToTable() {
    if (exp.length === 0) {
      return;
    }

    navigate("/Report");
  }

  // =========================
  // STYLES
  // =========================

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

    buttonRow: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
    },

    addButton: {
      minWidth: "140px",
      padding: "12px",
      backgroundColor:
        editingId !== null ? "#2563eb" : "#f59e0b",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
    },

    cancelButton: {
      minWidth: "120px",
      padding: "12px",
      backgroundColor: "#64748b",
      color: "#ffffff",
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
      padding: "12px",
      border: "1px solid #64748b",
      backgroundColor: "#cbd5e1",
      color: "#111827",
      fontSize: "17px",
      textAlign: "center",
    },

    td: {
      padding: "12px",
      border: "1px solid #64748b",
      fontSize: "17px",
      textAlign: "center",
    },

    actionButton: {
      padding: "7px 12px",
      margin: "2px",
      border: "none",
      borderRadius: "6px",
      color: "#ffffff",
      cursor: "pointer",
      fontWeight: "bold",
    },

    empty: {
      padding: "20px",
      textAlign: "center",
      color: "#64748b",
    },

    totalLabel: {
      padding: "14px",
      border: "1px solid #64748b",
      backgroundColor: "#cbd5e1",
      fontWeight: "bold",
      fontSize: "18px",
      textAlign: "right",
    },

    totalValue: {
      padding: "14px",
      border: "1px solid #64748b",
      backgroundColor: "#bbf7d0",
      color: "#14532d",
      fontWeight: "bold",
      fontSize: "20px",
      textAlign: "center",
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

  // =========================
  // UI
  // =========================

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h1 style={styles.title}>
          {isUpdateMode
            ? "Update Expenses"
            : "Expenses Setup"}
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

            <div style={styles.buttonRow}>

              <button
                type="submit"
                style={styles.addButton}
              >
                {editingId !== null
                  ? "UPDATE"
                  : "ADD"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  style={styles.cancelButton}
                >
                  CANCEL
                </button>
              )}

            </div>

          </form>

        </div>

        {/* TABLE */}

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

                <th style={styles.th}>
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {exp.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
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

                    <td style={styles.td}>

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(expense)
                        }
                        style={{
                          ...styles.actionButton,
                          backgroundColor: "#2563eb",
                        }}
                      >
                        EDIT
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(expense.id)
                        }
                        style={{
                          ...styles.actionButton,
                          backgroundColor: "#dc2626",
                        }}
                      >
                        DELETE
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

            <tfoot>

              <tr>

                <td
                  colSpan="2"
                  style={styles.totalLabel}
                >
                  Total Expenses
                </td>

                <td style={styles.totalValue}>
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
                exp.length === 0 ? 0.5 : 1,
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














// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// export default function Exepensess() {
//   const navigate = useNavigate();
//   ///

//   const location = useLocation();

//   // If SideMenu sends us here with ?mode=update,
//   // this becomes the update screen.
//   const isUpdateMode =
//     new URLSearchParams(location.search).get("mode")
//      === "update";

//   const [exp, setExp] = useState(() => {
//     const saved = JSON.parse(
//       localStorage.getItem("fixedExpensess")
//     );

//     return Array.isArray(saved) ? saved : [];
//   });


  
//   function handleEdit(exp) {
//     setEditingId(exp.id);
//     setName(exp.name);
//     setFixedPrice(String(exp.amount));
//     setErrorr({});
//   }

//   function handleDelete(id) {
//     const updatedEpensess = exp.filter(
//       (product) => product.id !== id
//     );

//     setProducts(updatedExpenses);

//     localStorage.setItem(
//       "fixedExpensess",
//       JSON.stringify(updatedExpenses)
//     );

//     // If the product being edited was deleted
//     if (editingId === id) {
//       setEditingId(null);
//       setName("");
//       setFixedPrice("");
//     }
//   }


//   ///




// //  const [exp, setExp] = useState([]);
//   const [expName, setExpName] = useState("");
//   const [expAmount, setExpAmount] = useState("");
 

//   const totalExpenses = exp.reduce(
//     (sum, expense) => sum + Number(expense.amount),
//     0
//   );

//   function handleForm(e) {
//     e.preventDefault();

//     if (!expName.trim() || !expAmount) {
//       return;
//     }

//     const newExpense = {
//       id: Date.now(),
//       expName: expName.trim(),
//       amount: Number(expAmount),
//     };

//     const updatedExpenses = [
//       ...exp,
//       newExpense,
//     ];

//     // Update React state
//     setExp(updatedExpenses);

//     // Save the SAME structure expected by Report
//     const expensesData = {
//       expenses: updatedExpenses,
//       total: updatedExpenses.reduce(
//         (sum, expense) => sum + Number(expense.amount),
//         0
//       ),
//     };

//     localStorage.setItem(
//       "fixedExpensess",
//       JSON.stringify(expensesData)
//     );


//     setExpName("");
//     setExpAmount("");
//   }

//   function addToTable() {
//     if (exp.length === 0) {
//       return;
//     }

//     navigate("/Report");
//   }

//   const styles = {
//     page: {
//       minHeight: "100vh",
//       padding: "25px",
//       boxSizing: "border-box",
//       backgroundColor: "#0f172a",
//     },

//     container: {
//       width: "100%",
//       maxWidth: "700px",
//       margin: "0 auto",
//     },

//     title: {
//       textAlign: "center",
//       color: "#ffffff",
//       fontSize: "32px",
//       fontWeight: "bold",
//       marginBottom: "25px",
//     },

//     formCard: {
//       backgroundColor: "#1e293b",
//       padding: "25px",
//       borderRadius: "16px",
//       boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
//     },

//     form: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "20px",
//     },

//     field: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "8px",
//     },

//     label: {
//       color: "#ffffff",
//       fontSize: "19px",
//       fontWeight: "600",
//     },

//     input: {
//       width: "100%",
//       height: "50px",
//       padding: "10px 14px",
//       boxSizing: "border-box",
//       backgroundColor: "#ffffff",
//       color: "#111827",
//       border: "2px solid #94a3b8",
//       borderRadius: "8px",
//       fontSize: "18px",
//       outline: "none",
//     },

//     addButton: {
//       width: "140px",
//       alignSelf: "center",
//       padding: "12px",
//       backgroundColor: "#f59e0b",
//       color: "#111827",
//       border: "none",
//       borderRadius: "10px",
//       fontSize: "18px",
//       fontWeight: "bold",
//       cursor: "pointer",
//     },

//     tableCard: {
//       marginTop: "30px",
//       backgroundColor: "#1e293b",
//       padding: "20px",
//       borderRadius: "16px",
//       boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
//       overflowX: "auto",
//     },

//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       backgroundColor: "#ffffff",
//       color: "#111827",
//     },

//     th: {
//       padding: "14px",
//       border: "1px solid #64748b",
//       backgroundColor: "#cbd5e1",
//       color: "#111827",
//       fontSize: "18px",
//       textAlign: "left",
//     },

//     td: {
//       padding: "14px",
//       border: "1px solid #64748b",
//       fontSize: "18px",
//     },

//     empty: {
//       padding: "20px",
//       textAlign: "center",
//       color: "#64748b",
//     },

//     saveButton: {
//       width: "100%",
//       marginTop: "20px",
//       padding: "14px",
//       backgroundColor: "#16a34a",
//       color: "#ffffff",
//       border: "none",
//       borderRadius: "10px",
//       fontSize: "20px",
//       fontWeight: "bold",
//       cursor: "pointer",
//     },
//   };

//   return (
//     <div style={styles.page}>

//       <div style={styles.container}>

//         <h1 style={styles.title}>
//           Expenses
//         </h1>

//         {/* FORM */}

//         <div style={styles.formCard}>

//           <form
//             onSubmit={handleForm}
//             style={styles.form}
//           >

//             <div style={styles.field}>

//               <label
//                 htmlFor="expenseName"
//                 style={styles.label}
//               >
//                 Expense Name
//               </label>

//               <input
//                 id="expenseName"
//                 name="expenseName"
//                 type="text"
//                 value={expName}
//                 placeholder="Enter expense name"
//                 onChange={(e) =>
//                   setExpName(e.target.value)
//                 }
//                 style={styles.input}
//               />

//             </div>

//             <div style={styles.field}>

//               <label
//                 htmlFor="expenseAmount"
//                 style={styles.label}
//               >
//                 Expense Amount
//               </label>

//               <input
//                 id="expenseAmount"
//                 name="expenseAmount"
//                 type="number"
//                 min="0"
//                 value={expAmount}
//                 placeholder="Enter amount"
//                 onChange={(e) =>
//                   setExpAmount(e.target.value)
//                 }
//                 style={styles.input}
//               />

//             </div>

//             <button
//               type="submit"
//               style={styles.addButton}
//             >
//               ADD
//             </button>

//           </form>

//         </div>

//         {/* EXPENSE TABLE */}

//         <div style={styles.tableCard}>

//           <h2
//             style={{
//               color: "#ffffff",
//               fontSize: "24px",
//               marginBottom: "15px",
//             }}
//           >
//             Expenses
//           </h2>

//           <table style={styles.table}>

//             <thead>

//               <tr>

//                 <th style={styles.th}>
//                   Expense
//                 </th>

//                 <th style={styles.th}>
//                   Amount
//                 </th>

//               </tr>

//             </thead>

//             <tbody>

//               {exp.length === 0 ? (

//                 <tr>

//                   <td
//                     colSpan="2"
//                     style={styles.empty}
//                   >
//                     No expenses added
//                   </td>

//                 </tr>

//               ) : (

//                 exp.map((expense) => (

//                   <tr key={expense.id}>

//                     <td style={styles.td}>
//                       {expense.expName}
//                     </td>

//                     <td style={styles.td}>
//                       {expense.amount}
//                     </td>

//                   </tr>

//                 ))

//               )}

//             </tbody>

//             <tfoot>

//               <tr>

//                 <td
//                   style={{
//                     ...styles.td,
//                     fontWeight: "bold",
//                     backgroundColor: "#cbd5e1",
//                   }}
//                 >
//                   Total
//                 </td>

//                 <td
//                   style={{
//                     ...styles.td,
//                     fontWeight: "bold",
//                     backgroundColor: "#cbd5e1",
//                   }}
//                 >
//                   {totalExpenses}
//                 </td>

//               </tr>

//             </tfoot>

//           </table>

//           <button
//             type="button"
//             onClick={addToTable}
//             disabled={exp.length === 0}
//             style={{
//               ...styles.saveButton,
//               opacity:
//                 exp.length === 0
//                   ? 0.5
//                   : 1,
//               cursor:
//                 exp.length === 0
//                   ? "not-allowed"
//                   : "pointer",
//             }}
//           >
//             SAVE & CONTINUE
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }


