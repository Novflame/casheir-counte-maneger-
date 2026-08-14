import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SetupExpenses() {
  const navigate = useNavigate();

  // =========================
  // STATE
  // =========================

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("fixedExpenses");

    if (!saved) return [];

    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [error, setError] = useState("");

  // =========================
  // ADD / UPDATE
  // =========================

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Expense name is required");
      return;
    }

    if (amount === "" || Number(amount) < 0) {
      setError("Enter a valid amount");
      return;
    }

    // UPDATE
    if (editingId !== null) {
      const updatedExpenses = expenses.map((expense) =>
        expense.id === editingId
          ? {
              ...expense,
              name: name.trim(),
              amount: Number(amount),
            }
          : expense
      );

      setExpenses(updatedExpenses);

      localStorage.setItem(
        "fixedExpenses",
        JSON.stringify(updatedExpenses)
      );

      clearForm();

      return;
    }

    // ADD
    const newExpense = {
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
    };

    const updatedExpenses = [
      ...expenses,
      newExpense,
    ];

    setExpenses(updatedExpenses);

    localStorage.setItem(
      "fixedExpenses",
      JSON.stringify(updatedExpenses)
    );

    clearForm();
  }

  // =========================
  // EDIT
  // =========================

  function handleEdit(expense) {
    setEditingId(expense.id);

    setName(expense.name);
    setAmount(String(expense.amount));

    setError("");
  }

  // =========================
  // DELETE
  // =========================

  function handleDelete(id) {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== id
    );

    setExpenses(updatedExpenses);

    localStorage.setItem(
      "fixedExpenses",
      JSON.stringify(updatedExpenses)
    );

    // If deleting the expense currently being edited
    if (editingId === id) {
      clearForm();
    }
  }

  // =========================
  // CLEAR FORM
  // =========================

  function clearForm() {
    setName("");
    setAmount("");
    setEditingId(null);
    setError("");
  }

  // =========================
  // FINISH SETUP
  // =========================

  function handleSave() {
    if (expenses.length === 0) {
      setError("Add at least one fixed expense");
      return;
    }

    localStorage.setItem(
      "fixedExpenses",
      JSON.stringify(expenses)
    );

    // Mark setup as completed
    localStorage.setItem(
      "setupComplete",
      "true"
    );

    navigate("/home");
  }

  // =========================
  // TOTAL
  // =========================

  const totalExpenses = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  // =========================
  // STYLES
  // =========================

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "25px",
      boxSizing: "border-box",
      backgroundColor: "#0f172a",
      fontFamily: "Arial, sans-serif",
    },

    container: {
      width: "100%",
      maxWidth: "750px",
      margin: "0 auto",
    },

    title: {
      textAlign: "center",
      color: "#ffffff",
      fontSize: "32px",
      marginBottom: "25px",
    },

    card: {
      backgroundColor: "#1e293b",
      padding: "25px",
      borderRadius: "16px",
      marginBottom: "25px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },

    label: {
      color: "#ffffff",
      fontSize: "18px",
      fontWeight: "bold",
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

    primaryButton: {
      padding: "13px",
      backgroundColor:
        editingId !== null
          ? "#2563eb"
          : "#f59e0b",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
    },

    cancelButton: {
      padding: "10px",
      backgroundColor: "#64748b",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
    },

    error: {
      color: "#fca5a5",
      fontSize: "16px",
      fontWeight: "bold",
    },

    tableWrapper: {
      overflowX: "auto",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#ffffff",
      color: "#111827",
    },

    th: {
      padding: "13px",
      border: "1px solid #64748b",
      backgroundColor: "#cbd5e1",
      fontSize: "17px",
      textAlign: "left",
    },

    td: {
      padding: "13px",
      border: "1px solid #64748b",
      fontSize: "17px",
    },

    actionCell: {
      padding: "8px",
      border: "1px solid #64748b",
      textAlign: "center",
    },

    editButton: {
      padding: "7px 12px",
      margin: "3px",
      backgroundColor: "#2563eb",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },

    deleteButton: {
      padding: "7px 12px",
      margin: "3px",
      backgroundColor: "#dc2626",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },

    totalCell: {
      padding: "14px",
      border: "1px solid #64748b",
      backgroundColor: "#cbd5e1",
      fontWeight: "bold",
      fontSize: "18px",
    },

    saveButton: {
      width: "100%",
      marginTop: "20px",
      padding: "15px",
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
          Fixed Expenses Setup
        </h1>

        {/* FORM */}

        <div style={styles.card}>

          <form
            onSubmit={handleSubmit}
            style={styles.form}
          >

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
              value={name}
              placeholder="Example: Electricity"
              onChange={(e) =>
                setName(e.target.value)
              }
              style={styles.input}
            />

            <label
              htmlFor="expenseAmount"
              style={styles.label}
            >
              Amount
            </label>

            <input
              id="expenseAmount"
              name="expenseAmount"
              type="number"
              min="0"
              value={amount}
              placeholder="Enter amount"
              onChange={(e) =>
                setAmount(e.target.value)
              }
              style={styles.input}
            />

            {error && (
              <div style={styles.error}>
                {error}
              </div>
            )}

            <button
              type="submit"
              style={styles.primaryButton}
            >
              {editingId !== null
                ? "UPDATE EXPENSE"
                : "ADD EXPENSE"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={clearForm}
                style={styles.cancelButton}
              >
                CANCEL EDIT
              </button>
            )}

          </form>

        </div>

        {/* TABLE */}

        <div style={styles.card}>

          <h2
            style={{
              color: "#ffffff",
              fontSize: "24px",
              marginBottom: "15px",
            }}
          >
            Fixed Expenses
          </h2>

          <div style={styles.tableWrapper}>

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

                {expenses.length === 0 ? (

                  <tr>
                    <td
                      colSpan="3"
                      style={{
                        ...styles.td,
                        textAlign: "center",
                      }}
                    >
                      No fixed expenses
                    </td>
                  </tr>

                ) : (

                  expenses.map((expense) => (

                    <tr key={expense.id}>

                      <td style={styles.td}>
                        {expense.name}
                      </td>

                      <td style={styles.td}>
                        {expense.amount}
                      </td>

                      <td style={styles.actionCell}>

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(expense)
                          }
                          style={styles.editButton}
                        >
                          EDIT
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(expense.id)
                          }
                          style={styles.deleteButton}
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
                    style={styles.totalCell}
                  >
                    Total Fixed Expenses
                  </td>

                  <td style={styles.totalCell}>
                    {totalExpenses}
                  </td>

                </tr>

              </tfoot>

            </table>

          </div>

          {/* FINISH SETUP */}

          <button
            type="button"
            onClick={handleSave}
            disabled={expenses.length === 0}
            style={{
              ...styles.saveButton,
              opacity:
                expenses.length === 0 ? 0.5 : 1,
              cursor:
                expenses.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            SAVE & FINISH SETUP
          </button>

        </div>

      </div>

    </div>
  );
}