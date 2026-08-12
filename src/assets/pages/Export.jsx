
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo=final.png";


export default function Export() {
  const [companyInfo] = useState(() => {
    return JSON.parse(localStorage.getItem("companyInfo")) || {};
  });

  const reportRef = useRef(null);
  const navigate = useNavigate();

  function formatNumber(value) {
    return Number(value || 0).toLocaleString("de-DE");
  }

  const report =
    JSON.parse(localStorage.getItem("finalReport")) || {
      products: [],
      expenses: [],
      totalSales: 0,
      totalExpenses: 0,
      net: 0,
    };

  const counting =
    JSON.parse(localStorage.getItem("counting")) || null;

  const styles = {
    page: {
      width: "100%",
      minHeight: "100vh",
      padding: "10px",
      boxSizing: "border-box",
      backgroundColor: "#0f172a",
      fontFamily: "Arial, sans-serif",
    },

    report: {
      width: "100%",
      maxWidth: "760px",
      margin: "0 auto",
      padding: "clamp(12px, 3vw, 28px)",
      boxSizing: "border-box",
      backgroundColor: "#ffffff",
      color: "#111827",
      borderRadius: "8px",
    },

    /* =========================
       HEADER
    ========================= */

    header: {
      display: "grid",
      gridTemplateColumns: "auto 1fr",
      alignItems: "center",
      gap: "12px",
      paddingBottom: "12px",
      marginBottom: "14px",
      borderBottom: "3px solid #213558",
    },

    logo: {
      width: "clamp(48px, 14vw, 78px)",
      height: "clamp(48px, 14vw, 78px)",
      objectFit: "contain",
      display: "block",
    },

    headerInfo: {
      minWidth: 0,
    },

    companyName: {
      margin: 0,
      color: "#213558",
      fontSize: "clamp(17px, 5vw, 27px)",
      fontWeight: "800",
      lineHeight: "1.15",
      overflowWrap: "break-word",
    },

    division: {
      margin: "3px 0 0",
      color: "#475569",
      fontSize: "clamp(11px, 3vw, 15px)",
      fontWeight: "600",
      overflowWrap: "break-word",
    },

    reportTitle: {
      margin: "5px 0 0",
      color: "#d8b804",
      fontSize: "clamp(12px, 3.2vw, 18px)",
      fontWeight: "800",
    },

    arabicTitle: {
      textAlign: "center",
      margin: "8px 0 16px",
      color: "#213558",
      fontSize: "clamp(17px, 4.5vw, 25px)",
      fontWeight: "800",
    },

    /* =========================
       SECTION
    ========================= */

    sectionTitle: {
      margin: "14px 0 6px",
      padding: "6px 8px",
      backgroundColor: "#213558",
      color: "#ffffff",
      borderRadius: "5px",
      fontSize: "clamp(12px, 3.5vw, 17px)",
      fontWeight: "800",
      textAlign: "right",
    },

    /* =========================
       TABLES
    ========================= */

    tableWrapper: {
      width: "100%",
      boxSizing: "border-box",
    },

    table: {
      width: "100%",
      tableLayout: "fixed",
      borderCollapse: "collapse",
      fontSize: "clamp(9px, 2.7vw, 14px)",
    },

    productNameCell: {
      width: "40%",
    },

    productPriceCell: {
      width: "20%",
    },

    productQtyCell: {
      width: "15%",
    },

    productTotalCell: {
      width: "25%",
    },

    expenseNameCell: {
      width: "65%",
    },

    expenseAmountCell: {
      width: "35%",
    },

    th: {
      padding: "6px 4px",
      border: "1px solid #64748b",
      backgroundColor: "#213558",
      color: "#ffffff",
      fontWeight: "800",
      textAlign: "center",
      lineHeight: "1.2",
      overflowWrap: "break-word",
    },

    td: {
      padding: "6px 4px",
      border: "1px solid #94a3b8",
      backgroundColor: "#f8fafc",
      color: "#111827",
      textAlign: "center",
      fontWeight: "600",
      lineHeight: "1.2",
      overflowWrap: "break-word",
      wordBreak: "break-word",
    },

    numberCell: {
      padding: "6px 3px",
      border: "1px solid #94a3b8",
      backgroundColor: "#f8fafc",
      color: "#111827",
      textAlign: "center",
      fontWeight: "700",
      fontVariantNumeric: "tabular-nums",
      whiteSpace: "nowrap",
      fontSize: "clamp(9px, 2.8vw, 14px)",
    },

    totalLabel: {
      padding: "7px 4px",
      border: "1px solid #213558",
      backgroundColor: "#dbeafe",
      color: "#111827",
      textAlign: "right",
      fontWeight: "800",
      fontSize: "clamp(9px, 2.8vw, 14px)",
    },

    totalNumber: {
      padding: "7px 3px",
      border: "1px solid #213558",
      backgroundColor: "#dbeafe",
      color: "#111827",
      textAlign: "center",
      fontWeight: "900",
      fontVariantNumeric: "tabular-nums",
      whiteSpace: "nowrap",
      fontSize: "clamp(10px, 3vw, 16px)",
    },

    /* =========================
       FINAL COUNTING
    ========================= */

    countingContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "5px",
      width: "100%",
      boxSizing: "border-box",
    },

    countingCard: {
      minWidth: 0,
      width: "100%",
      boxSizing: "border-box",
      padding: "7px 4px",
      backgroundColor: "#213558",
      color: "#ffffff",
      borderRadius: "6px",
      border: "1px solid #4c608e",
    },

    countingCardTitle: {
      textAlign: "center",
      paddingBottom: "5px",
      marginBottom: "6px",
      borderBottom: "1px solid #64748b",
      fontSize: "clamp(9px, 2.8vw, 14px)",
      fontWeight: "800",
      letterSpacing: "7px",
    },

    countingItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      minWidth: 0,
      marginBottom: "6px",
      lineHeight: "1.15",
    },

    countingLabel: {
      width: "100%",
      color: "#cbd5e1",
      fontSize: "clamp(8px, 2.4vw, 12px)",
      fontWeight: "600",
      overflowWrap: "break-word",
      backgroundColor: "#EB6534",
    
    
    },

    countingValue: {
      width: "100%",
      color: "#ffffff",
      fontSize: "clamp(9px, 2.7vw, 14px)",
      fontWeight: "900",
      fontVariantNumeric: "tabular-nums",
      whiteSpace: "normal",
      overflowWrap: "anywhere",
      wordBreak: "break-word",
    },

    countingTotal: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      paddingTop: "5px",
      borderTop: "1px solid #64748b",
      lineHeight: "1.15",
    },

    difference: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginTop: "5px",
      padding: "5px 2px",
      borderRadius: "4px",
      color: "#111827",
      lineHeight: "1.15",
    },

    /* =========================
       SIGNATURE
    ========================= */

    signature: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "22px",
      paddingTop: "10px",
      borderTop: "2px solid #213558",
    },

    signatureBox: {
      width: "150px",
      maxWidth: "45%",
      textAlign: "center",
    },

    signatureLine: {
      height: "1px",
      backgroundColor: "#111827",
      marginBottom: "5px",
    },

    signatureLabel: {
      margin: 0,
      color: "#475569",
      fontSize: "10px",
    },

    signatureName: {
      margin: "3px 0 0",
      color: "#213558",
      fontSize: "clamp(11px, 3vw, 15px)",
      fontWeight: "800",
      overflowWrap: "break-word",
    },

    /* =========================
       EXPORT BUTTON
    ========================= */

    button: {
      display: "block",
      width: "min(100%, 300px)",
      margin: "14px auto 0",
      padding: "11px 18px",
      boxSizing: "border-box",
      backgroundColor: "#16a34a",
      color: "#ffffff",
      border: "none",
      borderRadius: "7px",
      fontSize: "16px",
      fontWeight: "800",
      cursor: "pointer",
    },
  };

  async function exportPNG() {
    if (!reportRef.current) {
      return;
    }

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: Math.max(3, window.devicePixelRatio || 1),
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      const link = document.createElement("a");

      link.download = "daily-report.png";
      link.href = canvas.toDataURL("image/png");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    
        navigate("/Home");
    

    } catch (error) {
      console.error("PNG export failed:", error);
    }
  }

  return (
    <div style={styles.page}>

      <div
        ref={reportRef}
        style={styles.report}
      >

        {/* ==================================
            HEADER
        ================================== */}

        <header style={styles.header}>

          <img
            src={logo}
            alt="Company Logo"
            style={styles.logo}
          />

          <div style={styles.headerInfo}>

            <h1 style={styles.companyName}>
              {companyInfo?.compName || "Company"}
            </h1>

            <p style={styles.division}>
              {companyInfo?.division || ""}
            </p>

            {/* <p style={styles.reportTitle}>
              Daily Cashier Report
            </p> */}

          </div>

        </header>


        <h2 style={styles.arabicTitle}>
          تقرير الكاشير اليومي
        </h2>


        {/* ==================================
            PRODUCTS TABLE
        ================================== */}

        <h2 style={styles.sectionTitle}>
          المنتجات
        </h2>

        <div style={styles.tableWrapper}>

          <table style={styles.table}>

            <colgroup>
              <col style={styles.productNameCell} />
              <col style={styles.productPriceCell} />
              <col style={styles.productQtyCell} />
              <col style={styles.productTotalCell} />
            </colgroup>

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

              {report.products.length === 0 ? (

                <tr>
                  <td
                    colSpan="4"
                    style={styles.td}
                  >
                    لا توجد منتجات
                  </td>
                </tr>

              ) : (

                report.products.map((product) => {

                  const rowTotal =
                    Number(product.fixedPrice || 0) *
                    Number(product.qty || 0);

                  return (
                    <tr key={product.id}>

                      <td style={styles.td}>
                        {product.name}
                      </td>

                      <td style={styles.numberCell}>
                        {formatNumber(product.fixedPrice)}
                      </td>

                      <td style={styles.numberCell}>
                        {formatNumber(product.qty)}
                      </td>

                      <td style={styles.numberCell}>
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
                  style={styles.totalLabel}
                >
                  إجمالي المبيعات
                </td>

                <td style={styles.totalNumber}>
                  {formatNumber(report.totalSales)}
                </td>

              </tr>

            </tfoot>

          </table>

        </div>


        {/* ==================================
            EXPENSES TABLE
        ================================== */}

        <h2 style={styles.sectionTitle}>
          المصروفات
        </h2>

        <div style={styles.tableWrapper}>

          <table style={styles.table}>

            <colgroup>
              <col style={styles.expenseNameCell} />
              <col style={styles.expenseAmountCell} />
            </colgroup>

            <thead>

              <tr>

                <th style={styles.th}>
                  المصروف
                </th>

                <th style={styles.th}>
                  المبلغ
                </th>

              </tr>

            </thead>

            <tbody>

              {report.expenses.length === 0 ? (

                <tr>

                  <td
                    colSpan="2"
                    style={styles.td}
                  >
                    لا توجد مصروفات
                  </td>

                </tr>

              ) : (

                report.expenses.map((expense) => (

                  <tr key={expense.id}>

                    <td style={styles.td}>
                      {expense.expName}
                    </td>

                    <td style={styles.numberCell}>
                      {formatNumber(expense.amount)}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

            <tfoot>

              <tr>

                <td style={styles.totalLabel}>
                  إجمالي المصروفات
                </td>

                <td style={styles.totalNumber}>
                  {formatNumber(report.totalExpenses)}
                </td>

              </tr>

            </tfoot>

          </table>

        </div>


        {/* ==================================
            FINAL COUNTING
        ================================== */}

        <h2 style={styles.sectionTitle}>
          الحساب النهائي
        </h2>

        {!counting ? (

          <div style={styles.countingCard}>
            لا توجد بيانات للحساب النهائي.
          </div>

        ) : (

          <div style={styles.countingContainer}>

            {/* CARD 1 */}

            <div style={styles.countingCard}>

              <div style={styles.countingCardTitle}>
                النقدية
              </div>

              <div style={styles.countingItem}>

                <span style={styles.countingLabel}>
                  كاش
                </span>

                <strong style={styles.countingValue}>
                  {formatNumber(counting.cash)}
                </strong>

              </div>

              <div style={styles.countingItem}>

                <span style={styles.countingLabel}>
                  بنكك
                </span>

                <strong style={styles.countingValue}>
                  {formatNumber(counting.bank)}
                </strong>

              </div>

              <div style={styles.countingTotal}>

                <span style={styles.countingLabel}>
                  الموجود
                </span>

                <strong style={styles.countingValue}>
                  {formatNumber(counting.moneyExist)}
                </strong>

              </div>

            </div>


            {/* CARD 2 */}

            <div style={styles.countingCard}>

              <div style={styles.countingCardTitle}>
                المبيعات
              </div>

              <div style={styles.countingItem}>

                <span style={styles.countingLabel}>
                  المبيعات
                </span>

                <strong style={styles.countingValue}>
                  {formatNumber(counting.salesTotal)}
                </strong>

              </div>

              <div style={styles.countingItem}>

                <span style={styles.countingLabel}>
                  المصروفات
                </span>

                <strong style={styles.countingValue}>
                  {formatNumber(counting.expensesTotal)}
                </strong>

              </div>

              <div style={styles.countingTotal}>

                <span style={styles.countingLabel}>
                  المفروض
                </span>

                <strong style={styles.countingValue}>
                  {formatNumber(counting.supposed)}
                </strong>

              </div>

            </div>


            {/* CARD 3 */}

            <div style={styles.countingCard}>

              <div style={styles.countingCardTitle}>
                النهائي
              </div>

              <div style={styles.countingItem}>

                <span style={styles.countingLabel}>
                  الموجود
                </span>

                <strong style={styles.countingValue}>
                  {formatNumber(counting.exist)}
                </strong>

              </div>

              <div style={styles.countingItem}>

                <span style={styles.countingLabel}>
                  المفروض
                </span>

                <strong style={styles.countingValue}>
                  {formatNumber(counting.supposed)}
                </strong>

              </div>


              <div
                style={{
                  ...styles.difference,
                  backgroundColor:
                    Number(counting.difference) === 0
                      ? "#86efac"
                      : "#EB6534",
                }}
              >

                <span style={styles.countingLabel}>
                  الفرق
                </span>

                <strong style={styles.countingValue}>
                  {formatNumber(counting.difference)}
                </strong>

              </div>

            </div>

          </div>

        )}


        {/* ==================================
            CASHIER SIGNATURE
        ================================== */}

        <div style={styles.signature}>

          <div style={styles.signatureBox}>

            <div style={styles.signatureLine} />

            <p style={styles.signatureLabel}>
              توقيع الكاشير
            </p>

            <p style={styles.signatureName}>
              {companyInfo?.cashMan || ""}
            </p>

          </div>

        </div>

      </div>


      {/* ==================================
          EXPORT BUTTON
      ================================== */}

      <button
        type="button"
        onClick={exportPNG}
        style={styles.button}
      >
        Export PNG
      </button>

    </div>
  );
}








