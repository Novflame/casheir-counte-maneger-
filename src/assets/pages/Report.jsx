
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Report() {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("fixedProducts")) || [];
  });

  const [fixedExpensess] = useState(() => {
    const data = JSON.parse(
      localStorage.getItem("fixedExpensess")
    );

    return data?.expenses || [];
  });

   const navigate = useNavigate();

  function formatNumber(value) {
    return Number(value || 0).toLocaleString("de-DE");
  }

  function handleQtyChange(id, value) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              qty: Number(value),
            }
          : product
      )
    );
  }

  const totalSales = products.reduce(
    (sum, product) =>
      sum +
      Number(product.fixedPrice || 0) *
        Number(product.qty || 0),
    0
  );

  const totalExpenses = fixedExpensess.reduce(
    (sum, item) =>
      sum + Number(item.amount || 0),
    0
  );

  const net = totalSales - totalExpenses;

  function saveReport() {
    const finalProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      fixedPrice: Number(product.fixedPrice || 0),
      qty: Number(product.qty || 0),
      total:
        Number(product.fixedPrice || 0) *
        Number(product.qty || 0),
    }));




    const finalReport = {
      products: finalProducts,
      expenses: fixedExpensess,
      totalSales,
      totalExpenses,
      net,
    };

    localStorage.setItem(
      "finalReport",
      JSON.stringify(finalReport)
    );

     navigate("/Counting");
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

      {/* NAVIGATION */}

      {/* <nav
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "15px",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <Link
          to="/Export"
          style={{
            padding: "8px 12px",
            backgroundColor: "#213558",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          EXPORT
        </Link>

        <Link
          to="/Counting"
          style={{
            padding: "8px 12px",
            backgroundColor: "#213558",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          COUNTING
        </Link>

        <Link
          to="/Exepensess"
          style={{
            padding: "8px 12px",
            backgroundColor: "#213558",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          EXPENSES
        </Link>
      </nav> */}

      {/* PRODUCTS TABLE */}

      <div
        style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <table
          style={{
            width: "100%",
            tableLayout: "fixed",
            borderCollapse: "collapse",
            backgroundColor: "#fffbeb",
          }}
        >
          <thead>
            <tr>
              <th style={styles.th}>
                المنتج
              </th>

              <th style={styles.th}>
                السعر
              </th>

              <th style={styles.th}>
                الكمية
              </th>

              <th style={styles.th}>
                الإجمالي
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const rowTotal =
                Number(product.fixedPrice || 0) *
                Number(product.qty || 0);

              return (
                <tr key={product.id}>

                  <td style={styles.td}>
                    <span
                      style={{
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.name}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {formatNumber(product.fixedPrice)}
                  </td>

                  <td style={styles.td}>
                    <input
                      type="number"
                      min="0"
                      value={product.qty || ""}
                      onChange={(e) =>
                        handleQtyChange(
                          product.id,
                          e.target.value
                        )
                      }
                      style={{
                        width: "100%",
                        minWidth: 0,
                        boxSizing: "border-box",
                        padding: "7px 3px",
                        border: "1px solid #94a3b8",
                        borderRadius: "6px",
                        textAlign: "center",
                        fontSize: "15px",
                      }}
                    />
                  </td>

                  <td style={styles.td}>
                    {formatNumber(rowTotal)}
                  </td>

                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>

              <td
                colSpan="3"
                style={{
                  ...styles.td,
                  fontWeight: "bold",
                  backgroundColor: "#86efac",
                }}
              >
                الجملة
              </td>

              <td
                style={{
                  ...styles.td,
                  fontWeight: "bold",
                  backgroundColor: "#86efac",
                }}
              >
                {formatNumber(totalSales)}
              </td>

            </tr>
          </tfoot>
        </table>
      </div>

      {/* COMPACT SUMMARY */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "6px",
          marginTop: "12px",
        }}
      >

        <SummaryBox
          title="SALES"
          value={totalSales}
        />

        <SummaryBox
          title="EXPENSES"
          value={totalExpenses}
        />

        <SummaryBox
          title="NET"
          value={net}
        />

      </div>

      {/* SAVE */}

      <button
        onClick={saveReport}
        style={{
          width: "100%",
          marginTop: "12px",
          padding: "12px",
          backgroundColor: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        SAVE FINAL REPORT
      </button>

    </Container>
  );
}


/* TABLE STYLES */

const styles = {
  th: {
    width: "25%",
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
  },
};


/* SUMMARY */

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