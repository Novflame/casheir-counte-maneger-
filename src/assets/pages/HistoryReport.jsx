
// import { useParams } from "react-router-dom";


// export default function HistoryReport() {
//   const { id } = useParams();

//   const history = JSON.parse(
//     localStorage.getItem("reportHistory") || "[]"
//   );
//   console.log("URL ID:", id);
// console.log("HISTORY:", history);

//   const savedReport = history.find(
//     (item) => String(item.id) === String(id)


//   );
//   console.log("SAVED REPORT:", savedReport);

//   if (!savedReport) {
//     return (
//       <div>
//         Report not found
//       </div>
//     );
//   }

//   const report = savedReport.report;

  
//   // TEST //




//   return (
//     <div style={{
//       backgroundColor: "white",
//       color: "black",
//       minHeight: "100vh",
//       padding: "40px",
//       fontSize: "20px",
//     }}>
//       <h1>
//         Report: {savedReport.date}
//       </h1>

//       <pre>
//         {JSON.stringify(report, null, 2)}
//       </pre>
//     </div>
//   );
// }


import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";

export default function HistoryReport() {
  const { id } = useParams();
  const navigate = useNavigate();

  const history = JSON.parse(
    localStorage.getItem("reportHistory") || "[]"
  );

  const savedReport = history.find(
    (item) => String(item.id) === String(id)
  );

  if (!savedReport) {
    return (
      <Container
        maxWidth="sm"
        disableGutters
        sx={{
          width: "100%",
          padding: "12px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Report not found
        </div>
      </Container>
    );
  }

  const report = savedReport.report;

  const products = report.products || [];
  const expenses = report.expenses || [];

  const totalSales = Number(report.totalSales || 0);
  const totalExpenses = Number(report.totalExpenses || 0);
  const net = Number(report.net || 0);

  function formatNumber(value) {
    return Number(value || 0).toLocaleString("de-DE");
  }

  return (
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        width: "100%",
        padding: "12px",
        boxSizing: "border-box",
      }}
    >
      {/* BACK */}

      <button
        type="button"
        onClick={() => navigate("/History")}
        style={styles.backButton}
      >
        ← History
      </button>

      {/* REPORT HEADER */}

      <div style={styles.header}>
        <h1 style={styles.title}>
          تقرير الكاشير اليومي
        </h1>

        <div style={styles.date}>
          {savedReport.date}
        </div>
      </div>

      {/* PRODUCTS */}

      <div style={styles.sectionTitle}>
        المنتجات
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>المنتج</th>
              <th style={styles.th}>السعر</th>
              <th style={styles.th}>الكمية</th>
              <th style={styles.th}>الإجمالي</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  style={styles.emptyCell}
                >
                  لا توجد منتجات
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const rowTotal =
                  Number(product.fixedPrice || 0) *
                  Number(product.qty || 0);

                return (
                  <tr key={product.id}>
                    <td style={styles.td}>
                      <span style={styles.productName}>
                        {product.name}
                      </span>
                    </td>

                    <td style={styles.td}>
                      {formatNumber(product.fixedPrice)}
                    </td>

                    <td style={styles.td}>
                      {product.qty || 0}
                    </td>

                    <td style={styles.td}>
                      {formatNumber(rowTotal)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          <tfoot>
            <tr>
              <td
                colSpan="3"
                style={{
                  ...styles.td,
                  ...styles.totalCell,
                }}
              >
                إجمالي المبيعات
              </td>

              <td
                style={{
                  ...styles.td,
                  ...styles.totalCell,
                }}
              >
                {formatNumber(totalSales)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* EXPENSES */}

      <div style={styles.sectionTitle}>
        المصروفات
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.expenseTh}>
                المصروف
              </th>

              <th style={styles.expenseTh}>
                المبلغ
              </th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  style={styles.emptyCell}
                >
                  لا توجد مصروفات
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr key={expense.id}>
                  <td style={styles.td}>
                    {expense.name}
                  </td>

                  <td style={styles.td}>
                    {formatNumber(expense.amount)}
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
                  ...styles.totalCell,
                }}
              >
                إجمالي المصروفات
              </td>

              <td
                style={{
                  ...styles.td,
                  ...styles.totalCell,
                }}
              >
                {formatNumber(totalExpenses)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* SUMMARY */}

      <div style={styles.sectionTitle}>
        الملخص
      </div>

      <div style={styles.summary}>
        <SummaryBox
          title="المبيعات"
          value={totalSales}
        />

        <SummaryBox
          title="المصروفات"
          value={totalExpenses}
        />

        <SummaryBox
          title="الصافي"
          value={net}
        />
      </div>

      {/* REPORT ID */}

      <div style={styles.reportId}>
        Report ID: {savedReport.id}
      </div>
    </Container>
  );
}


/* =========================
   STYLES
========================= */

const styles = {
  backButton: {
    width: "100%",
    marginBottom: "10px",
    padding: "9px",
    backgroundColor: "#213558",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  header: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginBottom: "12px",
    backgroundColor: "#213558",
    borderRadius: "10px",
    textAlign: "center",
    color: "#fff",
  },

  title: {
    margin: 0,
    fontSize: "21px",
    fontWeight: "bold",
  },

  date: {
    marginTop: "6px",
    fontSize: "14px",
    color: "#cbd5e1",
  },

  sectionTitle: {
    marginTop: "12px",
    marginBottom: "6px",
    padding: "7px",
    backgroundColor: "#cbd5e1",
    color: "#111827",
    borderRadius: "7px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
  },

  tableWrapper: {
    width: "100%",
    overflow: "hidden",
    borderRadius: "8px",
  },

  table: {
    width: "100%",
    tableLayout: "fixed",
    borderCollapse: "collapse",
    backgroundColor: "#fffbeb",
  },

  th: {
    width: "25%",
    padding: "8px 3px",
    border: "1px solid #64748b",
    backgroundColor: "#cbd5e1",
    color: "#111827",
    fontSize: "13px",
    textAlign: "center",
  },

  expenseTh: {
    width: "50%",
    padding: "8px 3px",
    border: "1px solid #64748b",
    backgroundColor: "#cbd5e1",
    color: "#111827",
    fontSize: "13px",
    textAlign: "center",
  },

  td: {
    padding: "7px 3px",
    border: "1px solid #64748b",
    fontSize: "13px",
    textAlign: "center",
    overflow: "hidden",
    color: "#111827",
  },

  productName: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  totalCell: {
    fontWeight: "bold",
    backgroundColor: "#86efac",
  },

  emptyCell: {
    padding: "10px",
    border: "1px solid #64748b",
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
  },

  summary: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "6px",
    marginTop: "8px",
  },

  reportId: {
    marginTop: "12px",
    padding: "6px",
    textAlign: "center",
    fontSize: "9px",
    color: "#94a3b8",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};


/* =========================
   SUMMARY BOX
========================= */

function SummaryBox({ title, value }) {
  return (
    <div
      style={{
        minWidth: 0,
        padding: "8px 4px",
        backgroundColor: "#213558",
        borderRadius: "8px",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#cbd5e1",
          marginBottom: "3px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {Number(value || 0).toLocaleString("de-DE")}
      </div>
    </div>
  );
}