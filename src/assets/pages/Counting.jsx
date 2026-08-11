// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Counting() {
//   const [all, setAll] = useState([]);
//   const [cash, setCash] = useState("");
//   const [bank, setBank] = useState("");
//   const [exist, setExist] = useState("");
// const navigate = useNavigate()
//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!cash || !bank || !exist) {
//       return;
//     }

//     const allInfo = {
//       id: Date.now(),
//       cash: Number(cash),
//       bank: Number(bank),
//       sum: Number(cash) + Number(bank),

//       exist: Number(exist),
//       defrense: Number(cash) + Number(bank) - Number(exist),
//     };

//     const updatedAll = [...all, allInfo];

//     setAll(updatedAll);

//     localStorage.setItem("counting", JSON.stringify(updatedAll));

//     setCash("");
//     setBank("");
//     setExist("")

//     navigate("/Export")
//   }

//   return (
//     <div
//       className="flex flex-col justify-center
//      items-center mt-4"
//     >
//       {/* FORM */}
//       <Card className="max-w-[70%]">
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-3">
//               <input
//                 type="number"
//                 placeholder="cash"
//                 value={cash}
//                 onChange={(e) => setCash(e.target.value)}
//                 className="
//     border-2 border-blue-400
//     p-2
//     text-2xl
//     text-black
//     bg-white
//     placeholder:text-gray-900
//     placeholder:tracking-widest
//   "
//                 style={{ color: "black" }}
//               />

//               <input
//                 style={{ color: "black" }}
//                 type="number"
//                 placeholder="bank"
//                 value={bank}
//                 onChange={(e) => setBank(e.target.value)}
//                 className="
//                   border-2 border-blue-400 text-2xl text-black
//                   p-2
//                   placeholder:text-black
//                   placeholder:tracking-widest
//                 "
//               />

//                <input
//                 style={{ color: "black" }}
//                 type="number"
//                 placeholder="exist"
//                 value={exist}
//                 onChange={(e) => setExist(e.target.value)}
//                 className="
//                   border-2 border-blue-400 text-2xl text-black
//                   p-2
//                   placeholder:text-black
//                   placeholder:tracking-widest
//                 "
//               />

//               <div className="flex justify-center">
//                 <button
//                   type="submit"
//                   className="
//                     p-2
//                     text-green-700
//                     text-2xl
//                     bg-slate-400
//                     m-3
//                     rounded-2xl
//                     w-[50%]
//                   "
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>

//       {/* OUTPUT */}
//       <Card className="mt-4 flex flex-col max-w-[70%] ">
//         <CardContent>
//           <p className="text-2xl text-blue-500 m-2">finle counting</p>
//           {all.map((a) => (
//             <ul
//               key={a.id}
//               className="border shadow-2xl bg-slate-300
//              border-slate-300 "
//             >
//               <li className="text-2xl m-4 bg-slate-400">
//                 {" "}
//                 <span>Cash :</span> {a.cash}
//               </li>

//               <li className="text-2xl m-4 bg-slate-400">
//                 <span>Bank :</span> {a.bank}
//               </li>

//               <li className="text-2xl m-4 underline bg-green-300 text-red-900">
//                 <span className="text-blue-800"> subosed :</span> {a.sum}
//               </li>

//               <li className="text-2xl m-4 bg-slate-400">
//                 <span>exist :</span> {a.exist}
//               </li>
//                 <li className="text-2xl m-4 underline bg-green-300
//                  text-red-400">
//                 <span className="text-red-900 ">
//                   defrense :
//                   </span> {a.defrense}
//               </li>
//             </ul>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default Counting;

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
  const supposed = totalSales - totalExpenses;

  // ==========================================
  // INPUTS
  // ==========================================

  const [cash, setCash] = useState("");
  const [bank, setBank] = useState("");
  const [exist, setExist] = useState("");

  // ==========================================
  // CARD 1
  // Cash + Bank = Money Exist
  // ==========================================

  const moneyExist = Number(cash || 0) + Number(bank || 0);

  // ==========================================
  // CARD 3
  // ==========================================

  const net = Number(exist || 0) - supposed;

  const difference = supposed - Number(exist || 0);

  // ==========================================
  // SAVE COUNTING
  // ==========================================

  function handleSubmit(e) {
    e.preventDefault();

    if (!cash || !bank || !exist) {
      return;
    }

    const counting = {
      id: Date.now(),

      // Card 1
      cash: Number(cash),
      bank: Number(bank),
      moneyExist: moneyExist,

      // Card 2
      salesTotal: totalSales,
      expensesTotal: totalExpenses,
      supposed: supposed,

      // Card 3
      exist: Number(exist),
      net: net,
      difference: difference,
    };

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

                <input
                  id="Exist"
                  name="Exist"
                  type="number"
                  placeholder="Exist"
                  value={exist}
                  onChange={(e) => setExist(e.target.value)}
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
              <strong>{Number(exist || 0)}</strong>
            </div>

            <div style={styles.row}>
              <span>Supposed</span>
              <strong>{supposed}</strong>
            </div>

            <div style={styles.totalRow}>
              <span>Net</span>
              <strong>{net}</strong>
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
