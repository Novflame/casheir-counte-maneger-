

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Counting() {
  const navigate = useNavigate();

  // ==========================================
  // GET FINAL REPORT
  // ==========================================

  const finalReport = JSON.parse(localStorage.getItem("finalReport")) || {};

  const totalSales = Number(finalReport.totalSales || 0);

  const totalExpenses = Number(finalReport.totalExpenses || 0);

  // Sales - Expenses
  // const supposed = totalSales - totalExpenses;
  const supposed =
  Number(totalSales || 0) -
  Number(totalExpenses || 0);

  


  // ==========================================
  // INPUTS
  // ==========================================

  const [cash, setCash] = useState("");
  const [bank, setBank] = useState("");
 

  // ==========================================
  // CARD 1
  // Cash + Bank = Money Exist
  // ==========================================

  // const moneyExist = Number(cash || 0) + Number(bank || 0);
  const moneyExist =
  Number(cash || 0) +
  Number(bank || 0);


  // ==========================================
  // CARD 3
  // ==========================================

  // const net = Number(cash  + bank);

//  const difference =
//   moneyExist - supposed;

const difference =
  Math.max(0, supposed - moneyExist);

  // ==========================================
  // SAVE COUNTING
  // ==========================================

  function handleSubmit(e) {
    e.preventDefault();

    if (!cash || !bank ) {
      return;
    }
const counting = {
  id: Date.now(),

  cash: Number(cash),
  bank: Number(bank),

  moneyExist,

  salesTotal: totalSales,
  expensesTotal: totalExpenses,
  supposed,

  exist: moneyExist,

  difference,
};
    // const counting = {
    //   id: Date.now(),

    //   // Card 1
    //   cash: Number(cash),
    //   bank: Number(bank),
    //   moneyExist: moneyExist,

    //   // Card 2
    //   salesTotal: totalSales,
    //   expensesTotal: totalExpenses,
    //   supposed: supposed,

    //   // Card 3
      
    //   net: net,
    //   difference: difference,
    // };

    localStorage.setItem("counting", JSON.stringify(counting));

    navigate("/Export");
  }

  // ==========================================
  // STYLES
  // ==========================================

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "20px",
      boxSizing: "border-box",
      backgroundColor: "#0f172a",
    },

    container: {
      width: "100%",
      maxWidth: "700px",
      margin: "0 auto",
    },

    card: {
      backgroundColor: "#1e293b",
      borderRadius: "16px",
      marginBottom: "20px",
    },

    title: {
      color: "#60a5fa",
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "15px",
    },

    inputContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },

    input: {
      width: "100%",
      height: "50px",
      padding: "10px 14px",
      boxSizing: "border-box",
      backgroundColor: "#ffffff",
      color: "#111827",
      border: "2px solid #3b82f6",
      borderRadius: "8px",
      fontSize: "20px",
      outline: "none",
    },

    submitButton: {
      width: "50%",
      alignSelf: "center",
      padding: "12px",
      marginTop: "5px",
      backgroundColor: "#cbd5e1",
      color: "#166534",
      border: "none",
      borderRadius: "12px",
      fontSize: "20px",
      fontWeight: "bold",
      cursor: "pointer",
    },

    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      marginBottom: "8px",
      backgroundColor: "#334155",
      color: "#ffffff",
      fontSize: "20px",
      borderRadius: "6px",
    },

    totalRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px",
      marginTop: "12px",
      backgroundColor: "#cbd5e1",
      color: "#111827",
      fontSize: "22px",
      fontWeight: "bold",
      borderRadius: "6px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ==================================
            INPUTS
        ================================== */}

        <Card style={styles.card}>
          <CardContent>
            <div style={styles.title}>Enter Counting</div>

            <form onSubmit={handleSubmit}>
              <div style={styles.inputContainer}>
                <input
                  id="cash"
                  name="cash"
                  type="number"
                  placeholder="Cash"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  style={styles.input}
                />

                <input
                  id="bank"
                  name="bank"
                  type="number"
                  placeholder="Bank"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  style={styles.input}
                />

             

                <button type="submit" style={styles.submitButton}>
                  SAVE COUNTING
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* ==================================
            CARD 1
        ================================== */}

        <Card style={styles.card}>
          <CardContent>
            <div style={styles.title}>1. Money</div>

            <div style={styles.row}>
              <span>Cash</span>
              <strong>{Number(cash || 0)}</strong>
            </div>

            <div style={styles.row}>
              <span>Bank</span>
              <strong>{Number(bank || 0)}</strong>
            </div>

            <div style={styles.totalRow}>
              <span>Exist</span>
              <strong>{moneyExist}</strong>
            </div>
          </CardContent>
        </Card>

        {/* ==================================
            CARD 2
        ================================== */}

        <Card style={styles.card}>
          <CardContent>
            <div style={styles.title}>2. Sales</div>

            <div style={styles.row}>
              <span>Sales Total</span>
              <strong>{totalSales}</strong>
            </div>

            <div style={styles.row}>
              <span>Expenses Total</span>
              <strong>{totalExpenses}</strong>
            </div>

            <div style={styles.totalRow}>
              <span>Supposed</span>
              <strong>{supposed}</strong>
            </div>
          </CardContent>
        </Card>

        {/* ==================================
            CARD 3
        ================================== */}

        <Card style={styles.card}>
          <CardContent>
            <div style={styles.title}>3. Final Counting</div>

            <div style={styles.row}>
              <span>Exist</span>
              <strong>{Number(moneyExist || 0)}</strong>
            </div>

            <div style={styles.row}>
              <span>Supposed</span>
              <strong>{supposed}</strong>
            </div>

            <div style={styles.totalRow}>
              <span>Net</span>
              <strong>{moneyExist}</strong>
            </div>

            <div
              style={{
                ...styles.totalRow,
                backgroundColor: difference === 0 ? "#86efac" : "#fca5a5",
              }}
            >
              <span>Difference</span>

              <strong>{difference}</strong>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
