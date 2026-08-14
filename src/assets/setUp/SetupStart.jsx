
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SetupStart() {
  const navigate = useNavigate();
  const location = useLocation();

  // If SideMenu sends us here with ?mode=update,
  // this becomes the update screen.
  const isUpdateMode =
    new URLSearchParams(location.search).get("mode") === "update";

  const [products, setProducts] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("fixedProducts")
    );

    return Array.isArray(saved) ? saved : [];
  });

  const [name, setName] = useState("");
  const [fixedPrice, setFixedPrice] = useState("");
  const [errorr, setErrorr] = useState({});
  const [editingId, setEditingId] = useState(null);

  // Load products again when entering update mode.
 
  function handleForm(e) {
    e.preventDefault();

    const newErrorr = {};

    if (!name.trim()) {
      newErrorr.name = "Product name is required";
    }

    if (!fixedPrice.trim()) {
      newErrorr.fixedPrice = "You didn't enter a price";
    }

    if (Object.keys(newErrorr).length > 0) {
      setErrorr(newErrorr);
      return;
    }

    // EDIT EXISTING PRODUCT
    if (editingId !== null) {
      const updatedProducts = products.map((product) =>
        product.id === editingId
          ? {
              ...product,
              name: name.trim(),
              fixedPrice: Number(fixedPrice),
            }
          : product
      );

      setProducts(updatedProducts);

      localStorage.setItem(
        "fixedProducts",
        JSON.stringify(updatedProducts)
      );

      setEditingId(null);
      setName("");
      setFixedPrice("");
      setErrorr({});

      return;
    }

    // ADD NEW PRODUCT
    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      fixedPrice: Number(fixedPrice),
    };

    const updatedProducts = [
      ...products,
      newProduct,
    ];

    setProducts(updatedProducts);

    localStorage.setItem(
      "fixedProducts",
      JSON.stringify(updatedProducts)
    );

    setErrorr({});
    setName("");
    setFixedPrice("");
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setName(product.name);
    setFixedPrice(String(product.fixedPrice));
    setErrorr({});
  }

  function handleDelete(id) {
    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);

    localStorage.setItem(
      "fixedProducts",
      JSON.stringify(updatedProducts)
    );

    // If the product being edited was deleted
    if (editingId === id) {
      setEditingId(null);
      setName("");
      setFixedPrice("");
    }
  }









  function handleCancelEdit() {
    setEditingId(null);
    setName("");
    setFixedPrice("");
    setErrorr({});
  }

  function handleSave() {
    if (products.length === 0) {
      return;
    }

    localStorage.setItem(
      "fixedProducts",
      JSON.stringify(products)
    );

    // Update mode should return to Home.
    if (isUpdateMode) {
      navigate("/Home");
      return;
    }

    // Original first-time setup flow.
   navigate("/setupExpenses");
  }

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "25px",
      boxSizing: "border-box",
      backgroundColor: "#0f172a",
      color: "#ffffff",
    },

    container: {
      width: "100%",
      maxWidth: "700px",
      margin: "0 auto",
    },

    title: {
      textAlign: "center",
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "25px",
      color: "#ffffff",
    },

    modeText: {
      textAlign: "center",
      color: "#94a3b8",
      marginTop: "-15px",
      marginBottom: "25px",
      fontSize: "16px",
    },

    formCard: {
      backgroundColor: "#1e293b",
      padding: "25px",
      borderRadius: "16px",
      boxSizing: "border-box",
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
      fontSize: "19px",
      fontWeight: "600",
      color: "#f8fafc",
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

    inputError: {
      border: "2px solid #ef4444",
    },

    error: {
      color: "#f87171",
      fontSize: "15px",
    },

    buttonRow: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
    },

    addButton: {
      minWidth: "150px",
      padding: "12px",
      backgroundColor:
        editingId !== null ? "#f59e0b" : "#2563eb",
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
      backgroundColor: "#475569",
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
      overflowX: "auto",
      boxShadow: "0 8px 25px rgba(0,0,0,0.35)",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#ffffff",
      color: "#111827",
    },

    th: {
      border: "1px solid #64748b",
      padding: "12px",
      backgroundColor: "#cbd5e1",
      fontSize: "17px",
      textAlign: "left",
    },

    td: {
      border: "1px solid #64748b",
      padding: "12px",
      fontSize: "16px",
    },

    empty: {
      textAlign: "center",
      padding: "20px",
      color: "#64748b",
    },

    editButton: {
      padding: "7px 10px",
      marginRight: "6px",
      backgroundColor: "#2563eb",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
    },

    deleteButton: {
      padding: "7px 10px",
      backgroundColor: "#dc2626",
      color: "#ffffff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
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
          {isUpdateMode
            ? "Update Fixed Products"
            : "Product Setup"}
        </h1>

        {isUpdateMode && (
          <p style={styles.modeText}>
            Edit, delete, or add fixed products
          </p>
        )}

        {/* FORM */}

        <div style={styles.formCard}>

          <form
            onSubmit={handleForm}
            style={styles.form}
          >

            {/* PRODUCT NAME */}

            <div style={styles.field}>

              <label
                htmlFor="productName"
                style={styles.label}
              >
                Product Name
              </label>

              <input
                id="productName"
                name="productName"
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                style={{
                  ...styles.input,
                  ...(errorr.name
                    ? styles.inputError
                    : {}),
                }}
              />

              {errorr.name && (
                <span style={styles.error}>
                  {errorr.name}
                </span>
              )}

            </div>

            {/* PRODUCT PRICE */}

            <div style={styles.field}>

              <label
                htmlFor="productPrice"
                style={styles.label}
              >
                Product Sale Price
              </label>

              <input
                id="productPrice"
                name="productPrice"
                type="number"
                min="0"
                placeholder="Sale price"
                value={fixedPrice}
                onChange={(e) =>
                  setFixedPrice(e.target.value)
                }
                style={{
                  ...styles.input,
                  ...(errorr.fixedPrice
                    ? styles.inputError
                    : {}),
                }}
              />

              {errorr.fixedPrice && (
                <span style={styles.error}>
                  {errorr.fixedPrice}
                </span>
              )}

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

        {/* PRODUCT TABLE */}

        <div style={styles.tableCard}>

          <h2
            style={{
              color: "#ffffff",
              fontSize: "24px",
              marginBottom: "15px",
            }}
          >
            Products
          </h2>

          <table style={styles.table}>

            <thead>

              <tr>

                <th style={styles.th}>
                  Product
                </th>

                <th style={styles.th}>
                  Sale Price
                </th>

                {isUpdateMode && (
                  <th style={styles.th}>
                    Actions
                  </th>
                )}

              </tr>

            </thead>

            <tbody>

              {products.length === 0 ? (

                <tr>

                  <td
                    colSpan={isUpdateMode ? 3 : 2}
                    style={styles.empty}
                  >
                    No products found
                  </td>

                </tr>

              ) : (

                products.map((product) => (

                  <tr key={product.id}>

                    <td style={styles.td}>
                      {product.name}
                    </td>

                    <td style={styles.td}>
                      {product.fixedPrice}
                    </td>

                    {isUpdateMode && (
                      <td style={styles.td}>

                        <button
                          type="button"
                          onClick={() =>
                            handleEdit(product)
                          }
                          style={styles.editButton}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(product.id)
                          }
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>

                      </td>
                    )}

                  </tr>

                ))

              )}

            </tbody>

          </table>

          {/* SAVE */}

          <button
            type="button"
            onClick={handleSave}
            disabled={products.length === 0}
            style={{
              ...styles.saveButton,
              opacity:
                products.length === 0 ? 0.5 : 1,
              cursor:
                products.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {isUpdateMode
              ? "SAVE CHANGES"
              : "SAVE & CONTINUE"}
          </button>

        </div>

      </div>

    </div>
  );
}






// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function SetupStart() {
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState("");
//   const [fixedPrice, setFixedPrice] = useState("");
//   const [errorr, setErrorr] = useState({});

//   function handleForm(e) {
//     e.preventDefault();

//     const newErrorr = {};

//     if (!name.trim()) {
//       newErrorr.name = "Product name is required";
//     }

//     if (!fixedPrice.trim()) {
//       newErrorr.fixedPrice = "You didn't enter a price";
//     }

//     if (Object.keys(newErrorr).length > 0) {
//       setErrorr(newErrorr);
//       return;
//     }

//     const newProduct = {
//       id: Date.now(),
//       name: name.trim(),
//       fixedPrice: Number(fixedPrice),
//     };

//     const updatedProducts = [...products, newProduct];

//     setProducts(updatedProducts);

//     localStorage.setItem(
//       "fixedProducts",
//       JSON.stringify(updatedProducts)
//     );

//     setErrorr({});
//     setName("");
//     setFixedPrice("");
//   }

//   function handleSave() {
//     if (products.length === 0) {
//       return;
//     }

//     localStorage.setItem(
//       "fixedProducts",
//       JSON.stringify(products)
//     );

//     navigate("/Exepensess");
//   }

//   const styles = {
//     page: {
//       minHeight: "100vh",
//       padding: "25px",
//       boxSizing: "border-box",
//       backgroundColor: "#0f172a",
//       color: "#ffffff",
//     },

//     container: {
//       width: "100%",
//       maxWidth: "700px",
//       margin: "0 auto",
//     },

//     title: {
//       textAlign: "center",
//       fontSize: "32px",
//       fontWeight: "bold",
//       marginBottom: "25px",
//       color: "#ffffff",
//     },

//     formCard: {
//       backgroundColor: "#1e293b",
//       padding: "25px",
//       borderRadius: "16px",
//       boxSizing: "border-box",
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
//       fontSize: "19px",
//       fontWeight: "600",
//       color: "#f8fafc",
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

//     inputError: {
//       border: "2px solid #ef4444",
//     },

//     error: {
//       color: "#f87171",
//       fontSize: "15px",
//     },

//     addButton: {
//       alignSelf: "center",
//       width: "150px",
//       padding: "12px",
//       backgroundColor: "#2563eb",
//       color: "#ffffff",
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
//       overflowX: "auto",
//     },

//     table: {
//       width: "100%",
//       borderCollapse: "collapse",
//       backgroundColor: "#ffffff",
//       color: "#111827",
//     },

//     th: {
//       border: "1px solid #64748b",
//       padding: "12px",
//       backgroundColor: "#cbd5e1",
//       fontSize: "18px",
//       textAlign: "left",
//     },

//     td: {
//       border: "1px solid #64748b",
//       padding: "12px",
//       fontSize: "17px",
//     },

//     empty: {
//       textAlign: "center",
//       padding: "20px",
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
//           Product Setup
//         </h1>


//         {/* FORM */}

//         <div style={styles.formCard}>

//           <form
//             onSubmit={handleForm}
//             style={styles.form}
//           >

//             {/* PRODUCT NAME */}

//             <div style={styles.field}>

//               <label
//                 htmlFor="productName"
//                 style={styles.label}
//               >
//                 Product Name
//               </label>

//               <input
//                 id="productName"
//                 name="productName"
//                 type="text"
//                 placeholder="Product name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 style={{
//                   ...styles.input,
//                   ...(errorr.name
//                     ? styles.inputError
//                     : {}),
//                 }}
//               />

//               {errorr.name && (
//                 <span style={styles.error}>
//                   {errorr.name}
//                 </span>
//               )}

//             </div>


//             {/* PRODUCT PRICE */}

//             <div style={styles.field}>

//               <label
//                 htmlFor="productPrice"
//                 style={styles.label}
//               >
//                 Product Sale Price
//               </label>

//               <input
//                 id="productPrice"
//                 name="productName"
//                 type="number"
//                 min="0"
//                 placeholder="Sale price"
//                 value={fixedPrice}
//                 onChange={(e) =>
//                   setFixedPrice(e.target.value)
//                 }
//                 style={{
//                   ...styles.input,
//                   ...(errorr.fixedPrice
//                     ? styles.inputError
//                     : {}),
//                 }}
//               />

//               {errorr.fixedPrice && (
//                 <span style={styles.error}>
//                   {errorr.fixedPrice}
//                 </span>
//               )}

//             </div>


//             <button
//               type="submit"
//               style={styles.addButton}
//             >
//               ADD
//             </button>

//           </form>

//         </div>


//         {/* PRODUCT TABLE */}

//         <div style={styles.tableCard}>

//           <h2
//             style={{
//               color: "#ffffff",
//               fontSize: "24px",
//               marginBottom: "15px",
//             }}
//           >
//             Products
//           </h2>


//           <table style={styles.table}>

//             <thead>

//               <tr>

//                 <th style={styles.th}>
//                   Product
//                 </th>

//                 <th style={styles.th}>
//                   Sale Price
//                 </th>

//               </tr>

//             </thead>


//             <tbody>

//               {products.length === 0 ? (

//                 <tr>

//                   <td
//                     colSpan="2"
//                     style={styles.empty}
//                   >
//                     No products found
//                   </td>

//                 </tr>

//               ) : (

//                 products.map((product) => (

//                   <tr key={product.id}>

//                     <td style={styles.td}>
//                       {product.name}
//                     </td>

//                     <td style={styles.td}>
//                       {product.fixedPrice}
//                     </td>

//                   </tr>

//                 ))

//               )}

//             </tbody>

//           </table>


//           {/* SAVE */}

//           <button
//             type="button"
//             onClick={handleSave}
//             disabled={products.length === 0}
//             style={{
//               ...styles.saveButton,
//               opacity:
//                 products.length === 0 ? 0.5 : 1,
//               cursor:
//                 products.length === 0
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