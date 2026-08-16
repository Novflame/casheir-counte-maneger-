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

  const report = JSON.parse(localStorage.getItem("finalReport")) || {
    products: [],
    expenses: [],
    totalSales: 0,
    totalExpenses: 0,
    net: 0,
  };

  const counting = JSON.parse(localStorage.getItem("counting")) || null;

  // Also compute the current merged expenses at render time so Export
  // always reflects the latest fixed + ad-hoc expenses even if finalReport
  // was saved earlier.
  const storedFixedExpenses = JSON.parse(
    localStorage.getItem("fixedExpenses") || "[]",
  );

  const currentReportExpenses = JSON.parse(
    localStorage.getItem("currentReportExpenses") || "[]",
  );

  const mergedExpensesForExport = [
    ...storedFixedExpenses,
    ...currentReportExpenses,
  ];

  const totalExpensesForExport = mergedExpensesForExport.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0,
  );

  // Ensure the `report` object reflects the latest merged expenses for export
  // (mutating the in-memory object so templates that read report.* show the
  // combined data). This avoids depending solely on when finalReport was saved.
  try {
    report.expenses = mergedExpensesForExport;
    report.totalExpenses = totalExpensesForExport;
    report.net = (report.totalSales || 0) - totalExpensesForExport;
  } catch (err) {
    // If mutation fails for any reason, fall back to using mergedExpensesForExport directly in the template.
    console.warn("Could not update report object for export view:", err);
  }

  const styles = {
    header: {
      width: "100%",
      minHeight: "70px",
      padding: "10px 15px",
      boxSizing: "border-box",

      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      backgroundColor: "#213558",
      color: "#ffffff",

      boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    },
    page: {
      width: "100%",
      minHeight: "100vh",
      padding: "8px",
      boxSizing: "border-box",
      backgroundColor: "#0f172a",
      fontFamily: "Arial, sans-serif",
    },

    report: {
      position: "relative",
      width: "100%",
      maxWidth: "620px",
      margin: "0 auto",
      padding: "10px",
      boxSizing: "border-box",
      backgroundColor: "#ffffff",
      color: "#111827",
      borderRadius: "6px",
    },

    /* =========================
     SMALL LOGO
  ========================= */
    logo: {
      width: "48px",
      height: "48px",
      objectFit: "contain",
      flexShrink: 0,
    },

    logobtm: {
      position: "absolute",
      buttom: "7px",
      left: "7px",
      width: "50px",
      height: "45px",
      objectFit: "contain",
      display: "block",
    },
    companyName: {
      margin: 0,
      fontSize: "18px",
      fontWeight: "800",
      color: "#ffffff",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    companyInfo: {
      display: "flex",
      flexDirection: "column",
      minWidth: 0,
    },

    division: {
      margin: "2px 0 0",
      fontSize: "12px",
      color: "#cbd5e1",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },

    right: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      flexShrink: 0,
    },

    /* =========================
     TABLES AREA
  ========================= */

    // tablesContainer: {
    //   width: "100%",
    //   display: "grid",
    //   gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
    //   gap: "7px",
    //   alignItems: "start",
    //   boxSizing: "border-box",
    // },
    tablesContainer: {
      width: "100%",
      display: "grid",
      /* Slightly favor the PRODUCTS column within the 57-60% range while keeping
         the overall responsive behavior and small gap unchanged */
      gridTemplateColumns: "1.18fr 0.82fr",
      gap: "7px",
      alignItems: "start",
      boxSizing: "border-box",
    },

    tableSection: {
      minWidth: 0,
      width: "100%",
    },

    sectionTitle: {
      margin: "0 0 5px",
      padding: "5px 6px",
      backgroundColor: "#213558",
      color: "#ffffff",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "800",
      textAlign: "center",
    },

    tableWrapper: {
      width: "100%",
      boxSizing: "border-box",
    },

    table: {
      direction: "rtl",
      width: "100%",
      tableLayout: "fixed",
      borderCollapse: "collapse",
      fontSize: "10px",
    },

    /* =========================
     PRODUCT COLUMNS
  ========================= */

    /* PRODUCT COLUMN PROPORTIONS
       - Keep product name from growing larger than before (slightly reduced)
       - Give numeric columns more room so large numbers remain on one line
    */
    productNameCell: {
      width: "36%",
    },

    productPriceCell: {
      width: "22%",
    },

    productQtyCell: {
      width: "12%",
    },

    productTotalCell: {
      width: "30%",
    },

    /* =========================
     EXPENSE COLUMNS
  ========================= */

    expenseNameCell: {
      width: "60%",
    },

    expenseAmountCell: {
      width: "40%",
    },

    /* =========================
     TABLE CELLS
  ========================= */

    th: {
      padding: "4px 2px",
      border: "1px solid #64748b",
      backgroundColor: "#213558",
      color: "#ffffff",
      fontWeight: "800",
      textAlign: "center",
      lineHeight: "1.1",
      overflowWrap: "break-word",
    },

    td: {
      padding: "4px 2px",
      border: "1px solid #94a3b8",
      backgroundColor: "#f8fafc",
      color: "#111827",
      textAlign: "center",
      fontWeight: "600",
      lineHeight: "1.1",
      overflowWrap: "break-word",
      wordBreak: "break-word",
    },

    numberCell: {
      padding: "4px 2px",
      border: "1px solid #94a3b8",
      backgroundColor: "#f8fafc",
      color: "#111827",
      textAlign: "center",
      fontWeight: "700",
      fontVariantNumeric: "tabular-nums",
      whiteSpace: "nowrap",
      fontSize: "10px",
    },

    // totalLabel: {
    //   padding: "5px 3px",
    //   border: "1px solid #213558",
    //   backgroundColor: "#dbeafe",
    //   color: "#111827",
    //   textAlign: "right",
    //   fontWeight: "800",
    //   fontSize: "10px",
    // },

    totalLabel: {
      padding: "5px 3px",
      border: "1px solid #213558",
      backgroundColor: "#dbeafe",
      color: "#111827",
      textAlign: "right",
      fontWeight: "800",
      fontSize: "10px",
    },

    // totalNumber: {
    //   padding: "5px 2px",
    //   border: "1px solid #213558",
    //   backgroundColor: "#dbeafe",
    //   color: "#111827",
    //   textAlign: "center",
    //   fontWeight: "900",
    //   fontVariantNumeric: "tabular-nums",
    //   whiteSpace: "nowrap",
    //   fontSize: "10px",
    // },
    totalNumber: {
      padding: "5px 2px",
      border: "1px solid #213558",
      backgroundColor: "#c8ff",
      color: "#111827",
      textAlign: "center",
      fontWeight: "900",
      fontVariantNumeric: "tabular-nums",
      whiteSpace: "nowrap",
      fontSize: "10px",
    },

    /* =========================
     COUNTING
  ========================= */

    countingSection: {
      width: "100%",
      marginTop: "8px",
    },

    countingContainer: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "6px",
      boxSizing: "border-box",
      direction: "rtl",
    },

    countingCard: {
      minWidth: 0,
      boxSizing: "border-box",
      padding: "7px",
      borderRadius: "7px",
      backgroundColor: "#213558",
      border: "1px solid #4c608e",
      direction: "rtl",
    },

    finalCard: {
      gridColumn: "1 / -1",
      minWidth: 0,
      boxSizing: "border-box",
      padding: "7px",
      borderRadius: "7px",
      backgroundColor: "#213558",
      border: "1px solid #4c608e",
      direction: "rtl",
    },

    countingRow: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      gap: "5px",
      padding: "5px 0",
      borderBottom: "1px solid #4c608e",
      minWidth: 0,
    },

    countingLabel: {
      direction: "rtl",
      whiteSpace: "nowrap",
      fontSize: "11px",
      color: "#ffffff",
      fontWeight: "600",
    },

    countingNumber: {
      direction: "ltr",
      unicodeBidi: "isolate",
      whiteSpace: "nowrap",
      fontSize: "11px",
      color: "#ffffff",
      textAlign: "left",
    },

    countingTotal: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      gap: "5px",
      marginTop: "5px",
      padding: "6px",
      borderRadius: "5px",
      backgroundColor: "#d8b804",
      minWidth: 0,
    },

    difference: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      gap: "5px",
      marginTop: "5px",
      padding: "6px",
      borderRadius: "5px",
      minWidth: 0,
    },

    /* =========================
     CASHIER SIGNATURE
  ========================= */

    signature: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "8px",
      paddingTop: "6px",
      borderTop: "1px solid #213558",
    },

    signatureBox: {
      width: "120px",
      maxWidth: "40%",
      textAlign: "center",
    },

    signatureLine: {
      height: "1px",
      backgroundColor: "#111827",
      marginBottom: "3px",
    },

    signatureLabel: {
      margin: 0,
      color: "#475569",
      fontSize: "8px",
    },

    signatureName: {
      margin: "2px 0 0",
      color: "#213558",
      fontSize: "11px",
      fontWeight: "800",
      overflowWrap: "break-word",
    },

    /* =========================
     EXPORT BUTTON
  ========================= */

    button: {
      display: "block",
      width: "min(100%, 280px)",
      margin: "10px auto 0",
      padding: "10px 16px",
      boxSizing: "border-box",
      backgroundColor: "#16a34a",
      color: "#ffffff",
      border: "none",
      borderRadius: "7px",
      fontSize: "15px",
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
      <div ref={reportRef} style={styles.report}>
        {/* ==================================
            HEADER
        ================================== */}

        <header style={styles.header}>
          <img src={logo} alt="Company Logo" style={styles.logo} />

          <h2 style={styles.arabicTitle}>تقرير الكاشير اليومي</h2>

          <div style={styles.headerInfo}>
            <h1 style={styles.companyName}>
              {companyInfo?.compName || "Company"}
            </h1>

            <p style={styles.division}>{companyInfo?.division || ""}</p>
          </div>
        </header>

        {/* ==================================
            PRODUCTS TABLE
        ================================== */}

        {/* <h2 style={styles.sectionTitle}>
          المنتجات
        </h2> */}

        {/* <div style={styles.tableWrapper}>

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

        </div> */}

        {/* ==================================
            EXPENSES TABLE
//         ================================== */}

        {/* <h2 style={styles.sectionTitle}>
// //           المصروفات
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

              {mergedExpensesForExport.length === 0 ? (

                <tr>

                  <td
                    colSpan="2"
                    style={styles.td}
                  >
                    لا توجد مصروفات
                  </td>

                </tr>

              ) : (

                mergedExpensesForExport.map((expense) => (

                  <tr key={expense.id}>

                    <td style={styles.td}>
                      {expense.name}
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
 */}

        {/* ==================================
    PRODUCTS + EXPENSES
================================== */}

        <div style={styles.tablesContainer} className="mt-1">
          {/* PRODUCTS TABLE */}
          <div style={styles.tableSection}>
            <h2 style={styles.sectionTitle}>المنتجات</h2>

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
                    <th style={styles.th}>المنتج</th>
                    <th style={styles.th}>السعر</th>
                    <th style={styles.th}>الكمية</th>
                    <th style={styles.th}>الإجمالي</th>
                  </tr>
                </thead>

                <tbody>
                  {report.products.length === 0 ? (
                    <tr>
                      <td colSpan="4" style={styles.td}>
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
                          <td style={styles.td}>{product.name}</td>

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
                  {/* <tr>
                    <td
              colSpan="2"
              style={styles.totalLabel}
            >
              إجمالي المبيعات
            </td>

            <td   
            colSpan="2"
            style={styles.totalNumber}>
              {formatNumber(report.totalSales)}
            </td>
                  </tr> */}

                  {/* </tbody>
    </table>
    </td>
     */}
                  {/* <tr>
                    <td colSpan={4} style={{ padding: 0, border: "none" }}>
                      <div
                        style={{
                          width: "100%",
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                        }}
                      >
                        <div style={styles.totalLabel}>إجمالي المبيعات</div>

                        <div style={styles.totalNumber}>
                          {formatNumber(report.totalSales)}
                        </div>
                      </div>
                    </td>
                  </tr> */}

                  {/* <tr>
                    <td colSpan={4} style={{ padding: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            width: "50%",
                            boxSizing: "border-box",
                            padding: "10px",
                            backgroundColor: "red",
                            border: "2px solid black",
                            textAlign: "center",
                          }}
                        >
                          إجمالي المبيعات
                        </div>

                        <div
                          style={{
                            width: "50%",
                            boxSizing: "border-box",
                            padding: "10px",
                            backgroundColor: "yellow",
                            border: "2px solid black",
                            textAlign: "center",
                          }}
                        >
                          {formatNumber(report.totalSales)}
                        </div>
                      </div>
                    </td>
                  </tr> */}

                  <tr>
                    {/* Use a single spanning cell and an internal 2-column grid so the
                        total row splits exactly 50/50 regardless of the outer colgroup.
                        This avoids relying on <col> widths and does not add nested tables. */}
                    <td colSpan={4} style={{ padding: 0, border: "none" }}>
                      <div
                        style={{
                          width: "100%",
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "0",
                          boxSizing: "border-box",
                          direction: "rtl",
                        }}
                      >
                        <div style={styles.totalLabel}>إجمالي المبيعات</div>

                        <div style={styles.totalNumber}>
                          {formatNumber(report.totalSales)}
                        </div>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* EXPENSES TABLE */}
          <div style={styles.tableSection}>
            <h2 style={styles.sectionTitle}>المصروفات</h2>

            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <colgroup>
                  <col style={styles.expenseNameCell} />
                  <col style={styles.expenseAmountCell} />
                </colgroup>

                <thead>
                  <tr>
                    <th style={styles.th}>المصروف</th>
                    <th style={styles.th}>المبلغ</th>
                  </tr>
                </thead>

                <tbody>
                  {report.expenses.length === 0 ? (
                    <tr>
                      <td colSpan="2" style={styles.td}>
                        لا توجد مصروفات
                      </td>
                    </tr>
                  ) : (
                    report.expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td style={styles.td}>{expense.name}</td>

                        <td style={styles.numberCell}>
                          {formatNumber(expense.amount)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

                <tfoot>
                  <tr>
                    <td style={styles.totalLabel}>إجمالي المصروفات</td>

                    <td style={styles.totalNumber}>
                      {formatNumber(report.totalExpenses)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* ==================================
            FINAL COUNTING
        ================================== */}

        <h2 style={styles.sectionTitle}>الحساب النهائي</h2>

        {!counting ? (
          <div style={styles.countingCard}>لا توجد بيانات للحساب النهائي.</div>
        ) : (
          // <div style={styles.countingContainer}>

          //   {/* CARD 1 */}

          //   <div style={styles.countingCard}>

          //     <div style={styles.countingCardTitle}>
          //       النقدية
          //     </div>

          //     <div style={styles.countingItem}>

          //       <span style={styles.countingLabel}>
          //         كاش
          //       </span>

          //       <strong style={styles.countingValue}>
          //         {formatNumber(counting.cash)}
          //       </strong>

          //     </div>

          //     <div style={styles.countingItem}>

          //       <span style={styles.countingLabel}>
          //         بنكك
          //       </span>

          //       <strong style={styles.countingValue}>
          //         {formatNumber(counting.bank)}
          //       </strong>

          //     </div>

          //     <div style={styles.countingTotal}>

          //       <span style={styles.countingLabel}>
          //         الموجود
          //       </span>

          //       <strong style={styles.countingValue}>
          //         {formatNumber(counting.moneyExist)}
          //       </strong>

          //     </div>

          //   </div>

          //   {/* CARD 2 */}

          //   <div style={styles.countingCard}>

          //     <div style={styles.countingCardTitle}>
          //       المبيعات
          //     </div>

          //     <div style={styles.countingItem}>

          //       <span style={styles.countingLabel}>
          //         المبيعات
          //       </span>

          //       <strong style={styles.countingValue}>
          //         {formatNumber(counting.salesTotal)}
          //       </strong>

          //     </div>

          //     <div style={styles.countingItem}>

          //       <span style={styles.countingLabel}>
          //         المصروفات
          //       </span>

          //       <strong style={styles.countingValue}>
          //         {formatNumber(counting.expensesTotal)}
          //       </strong>

          //     </div>

          //     <div style={styles.countingTotal}>

          //       <span style={styles.countingLabel}>
          //         المفروض
          //       </span>

          //       <strong style={styles.countingValue}>
          //         {formatNumber(counting.supposed)}
          //       </strong>

          //     </div>

          //   </div>

          //   {/* CARD 3 */}

          //   <div style={styles.countingCard}>

          //     <div style={styles.countingCardTitle}>
          //       النهائي
          //     </div>

          //     <div style={styles.countingItem}>

          //       <span style={styles.countingLabel}>
          //         الموجود
          //       </span>

          //       <strong style={styles.countingValue}>
          //         {formatNumber(counting.exist)}
          //       </strong>

          //     </div>

          //     <div style={styles.countingItem}>

          //       <span style={styles.countingLabel}>
          //         المفروض
          //       </span>

          //       <strong style={styles.countingValue}>
          //         {formatNumber(counting.supposed)}
          //       </strong>

          //     </div>

          //     <div
          //       style={{
          //         ...styles.difference,
          //         backgroundColor:
          //           Number(counting.difference) === 0
          //             ? "#86efac"
          //             : "#EB6534",
          //       }}
          //     >

          //       <span style={styles.countingLabel}>
          //         الفرق
          //       </span>

          //       <strong style={styles.countingValue}>
          //         {formatNumber(counting.difference)}
          //       </strong>

          //     </div>

          //   </div>

          // </div>

          <div style={styles.countingContainer}>
            {/* MONEY */}
            <div style={styles.countingCard}>
              <div style={styles.countingRow}>
                <span style={styles.countingLabel}>كاش</span>
                <strong style={styles.countingNumber}>
                  {formatNumber(counting.cash)}
                </strong>
              </div>

              <div style={styles.countingRow}>
                <span style={styles.countingLabel}>بنكك</span>
                <strong style={styles.countingNumber}>
                  {formatNumber(counting.bank)}
                </strong>
              </div>

              <div style={styles.countingTotal}>
                <span style={styles.countingLabel}>الإجمالي</span>
                <strong style={styles.countingNumber}>
                  {formatNumber(counting.moneyExist)}
                </strong>
              </div>
            </div>

            {/* SALES */}
            <div style={styles.countingCard}>
              <div style={styles.countingRow}>
                <span style={styles.countingLabel}>المبيعات</span>
                <strong style={styles.countingNumber}>
                  {formatNumber(counting.salesTotal)}
                </strong>
              </div>

              <div style={styles.countingRow}>
                <span style={styles.countingLabel}>المصروفات</span>
                <strong style={styles.countingNumber}>
                  {formatNumber(counting.expensesTotal)}
                </strong>
              </div>

              <div style={styles.countingTotal}>
                <span style={styles.countingLabel}>المفروض</span>
                <strong style={styles.countingNumber}>
                  {formatNumber(counting.supposed)}
                </strong>
              </div>
            </div>

            {/* FINAL */}
            <div style={styles.finalCard}>
              <div style={styles.countingRow}>
                <span style={styles.countingLabel}>الموجود</span>
                <strong style={styles.countingNumber}>
                  {formatNumber(counting.moneyExist)}
                </strong>
              </div>

              <div style={styles.countingRow}>
                <span style={styles.countingLabel}>المفروض</span>
                <strong style={styles.countingNumber}>
                  {formatNumber(counting.supposed)}
                </strong>
              </div>

              <div
                style={{
                  ...styles.difference,
                  backgroundColor:
                    Number(counting.difference) === 0 ? "#86efac" : "#fca5a5",
                }}
              >
                <span style={styles.countingLabel}>الفرق</span>

                <strong style={styles.countingNumber}>
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
          <img
            style={styles.logobtm}
            src={logo}
            alt="Company Logo"
            style={styles.logo}
          />

          <div style={styles.signatureBox}>
            <div style={styles.signatureLine} />

            <p style={styles.signatureLabel}>توقيع الكاشير</p>

            <p style={styles.signatureName}>{companyInfo?.cashMan || ""}</p>
          </div>
        </div>
      </div>

      {/* ==================================
          EXPORT BUTTON
      ================================== */}

      <button type="button" onClick={exportPNG} style={styles.button}>
        Export PNG
      </button>
    </div>
  );
}
