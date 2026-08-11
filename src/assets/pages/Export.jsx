import { useRef } from "react";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

export default function Export() {
  const reportRef = useRef(null);

  const navigate = useNavigate();

  function formatNumber(value) {
    return Number(value || 0).toLocaleString("de-DE");
  }

  // ==========================================
  // FINAL REPORT
  // ==========================================

  const report = JSON.parse(localStorage.getItem("finalReport")) || {
    products: [],
    expenses: [],
    totalSales: 0,
    totalExpenses: 0,
    net: 0,
  };

  const counting = JSON.parse(localStorage.getItem("counting")) || null;

  const styles = {
    page: {
      padding: "20px",
      backgroundColor: "#dddddd",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },

    report: {
      width: "850px",
      maxWidth: "100%",
      boxSizing: "border-box",
      backgroundColor: "#ffffff",
      color: "#000000",
      padding: "30px",
      margin: "auto",
    },

    title: {
      textAlign: "center",
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "30px",
    },

    sectionTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginTop: "30px",
      marginBottom: "12px",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
    },

    cell: {
      border: "1px solid #000000",
      padding: "8px",
      textAlign: "center",
    },

    total: {
      fontWeight: "bold",
      fontSize: "18px",
    },

    // ========================================
    // COUNTING CARDS
    // ========================================

    countingContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },

    countingCard: {
      border: "2px solid #000000",
      borderRadius: "10px",
      padding: "15px",
      backgroundColor: "#ffffff",
      color: "#000000",
    },

    countingCardTitle: {
      fontSize: "21px",
      fontWeight: "bold",
      marginBottom: "12px",
    },

    countingRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 10px",
      marginBottom: "6px",
      borderBottom: "1px solid #cccccc",
      fontSize: "18px",
    },

    countingTotal: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px",
      marginTop: "8px",
      backgroundColor: "#e5e7eb",
      border: "1px solid #000000",
      fontWeight: "bold",
      fontSize: "20px",
    },

    difference: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px",
      marginTop: "10px",
      border: "2px solid #000000",
      fontWeight: "bold",
      fontSize: "21px",
    },

    button: {
      display: "block",
      margin: "30px auto",
      padding: "12px 30px",
      backgroundColor: "#15803d",
      color: "#ffffff",
      border: "none",
      borderRadius: "8px",
      fontSize: "20px",
      cursor: "pointer",
    },
  };

  async function exportPNG() {
    if (!reportRef.current) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",

        onclone: (clonedDoc) => {
          const allElements = clonedDoc.querySelectorAll("*");

          allElements.forEach((el) => {
            const style = window.getComputedStyle(el);

            if (style.color && style.color.includes("oklch")) {
              el.style.color = "#000000";
            }

            if (
              style.backgroundColor &&
              style.backgroundColor.includes("oklch")
            ) {
              el.style.backgroundColor = "#ffffff";
            }

            if (style.borderColor && style.borderColor.includes("oklch")) {
              el.style.borderColor = "#000000";
            }
          });
        },
      });

      const link = document.createElement("a");

      link.download = "daily-report.png";

      link.href = canvas.toDataURL("image/png");

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("PNG export failed:", error);
    }

    setTimeout(() => {
      navigate("/home");
    }, 2000);
  }

  return (
    <div style={styles.page}>
      <div ref={reportRef} style={styles.report}>
        <h1 style={styles.title}>Daily Cashier Report</h1>

        {/* ==================================
            PRODUCTS
        ================================== */}

        <h2 style={styles.sectionTitle}>Products</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.cell}>Product</th>

              <th style={styles.cell}>Price</th>

              <th style={styles.cell}>Qty</th>

              <th style={styles.cell}>Total</th>
            </tr>
          </thead>

          <tbody>
            {report.products.length === 0 ? (
              <tr>
                <td colSpan="4" style={styles.cell}>
                  No products
                </td>
              </tr>
            ) : (
              report.products.map((product) => (
                <tr key={product.id}>
                  <td style={styles.cell}>{product.name}</td>

                  <td style={styles.cell}>{product.fixedPrice}</td>

                  <td style={styles.cell}>{product.qty || 0}</td>

                  <td style={styles.cell}>
                    {formatNumber(
                      Number(product.fixedPrice || 0) *
                        Number(product.qty || 0),
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>

          <tfoot>
            <tr>
              <td
                colSpan="3"
                style={{
                  ...styles.cell,
                  ...styles.total,
                }}
              >
                Total Sales
              </td>

              <td
                style={{
                  ...styles.cell,
                  ...styles.total,
                }}
              >
                {formatNumber(report.totalSales)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* ==================================
            EXPENSES
        ================================== */}

        <h2 style={styles.sectionTitle}>Expenses</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.cell}>Expense</th>

              <th style={styles.cell}>Amount</th>
            </tr>
          </thead>

          <tbody>
            {report.expenses.length === 0 ? (
              <tr>
                <td colSpan="2" style={styles.cell}>
                  No expenses
                </td>
              </tr>
            ) : (
              report.expenses.map((expense) => (
                <tr key={expense.id}>
                  <td style={styles.cell}>{expense.expName}</td>

                  <td style={styles.cell}>{formatNumber(expense.amount)}</td>
                </tr>
              ))
            )}
          </tbody>

          <tfoot>
            <tr>
              <td
                style={{
                  ...styles.cell,
                  ...styles.total,
                }}
              >
                Total Expenses
              </td>

              <td
                style={{
                  ...styles.cell,
                  ...styles.total,
                }}
              >
                {formatNumber(report.totalExpenses)}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* ==================================
            COUNTING
        ================================== */}

        <h2 style={styles.sectionTitle}>Final Counting</h2>

        {!counting ? (
          <div style={styles.countingCard}>No counting data found.</div>
        ) : (
          <div style={styles.countingContainer}>
            {/* ==============================
                CARD 1
                CASH / BANK / EXIST
            ============================== */}

            <div style={styles.countingCard}>
              <div style={styles.countingCardTitle}>1. Money</div>

              <div style={styles.countingRow}>
                <span>Cash</span>

                <strong>{formatNumber(counting.cash)}</strong>
              </div>

              <div style={styles.countingRow}>
                <span>Bank</span>

                <strong>{formatNumber(counting.bank)}</strong>
              </div>

              <div style={styles.countingTotal}>
                <span>Exist</span>

                <strong>{formatNumber(counting.moneyExist)}</strong>
              </div>
            </div>

            {/* ==============================
                CARD 2
                SALES / EXPENSES / SUPPOSED
            ============================== */}

            <div style={styles.countingCard}>
              <div style={styles.countingCardTitle}>2. Sales</div>

              <div style={styles.countingRow}>
                <span>Sales Total</span>

                <strong>{formatNumber(counting.salesTotal)}</strong>
              </div>

              <div style={styles.countingRow}>
                <span>Expenses Total</span>

                <strong>{formatNumber(counting.expensesTotal)}</strong>
              </div>

              <div style={styles.countingTotal}>
                <span>Supposed</span>

                <strong>{formatNumber(counting.supposed)}</strong>
              </div>
            </div>

            {/* ==============================
                CARD 3
                EXIST / SUPPOSED / NET /
                DIFFERENCE
            ============================== */}

            <div style={styles.countingCard}>
              <div style={styles.countingCardTitle}>3. Final</div>

              <div style={styles.countingRow}>
                <span>Exist</span>

                <strong>{formatNumber(counting.exist)}</strong>
              </div>

              <div style={styles.countingRow}>
                <span>Supposed</span>

                <strong>{formatNumber(counting.supposed)}</strong>
              </div>

              <div style={styles.countingTotal}>
                <span>Net</span>

                <strong>{formatNumber(counting.net)}</strong>
              </div>

              <div
                style={{
                  ...styles.difference,

                  backgroundColor:
                  Number(counting.difference) === 0 ? "#86efac" : "#fca5a5",
          }}
              >
                <span>Difference</span>

                <strong>{formatNumber(counting.difference)}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      <button onClick={exportPNG} style={styles.button}>
        Export PNG
      </button>
    </div>
  );
}
