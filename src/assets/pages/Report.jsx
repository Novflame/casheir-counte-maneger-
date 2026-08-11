import Container from "@mui/material/Container";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Report() {
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("fixedProducts")) || [];
  });



  const [fixedExpensess] = useState(() => {
    const data = JSON.parse(localStorage.getItem("fixedExpensess"));

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
          : product,
      ),
    );
  }

  const totalSales = products.reduce(
    (sum, product) => sum + product.fixedPrice * (product.qty || 0),
    0,
  );

  const totalExpenses = fixedExpensess.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  function saveReport() {
    const finalProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      fixedPrice: product.fixedPrice,
      qty: product.qty || 0,
      total: product.fixedPrice * (product.qty || 0),
    }));

    const finalReport = {
      products: finalProducts,

      expenses: fixedExpensess,

      totalSales,

      totalExpenses,

      net: totalSales - totalExpenses,
    };

    localStorage.setItem("finalReport", JSON.stringify(finalReport));

    //hear shoud be sucssess animation
    navigate("/counting");
  }

  return (
    <Container>
      <nav className="flex gap-5 mb-5">
        <Link to="/export" className="text-blue-400">
          EXPORT
        </Link>

        <Link to="/Counting" className="text-blue-400">
          COUNTING
        </Link>

        <Link to="/Exepensess" className="text-blue-400">
          EXPENSESS
        </Link>
      </nav>

      {/* PRODUCTS TABLE */}

      <table
        className="
        w-full
        border-collapse
        bg-amber-50
        "
      >
        <thead>
          <tr>
            <th className="border p-2">Product</th>

            <th className="border p-2">Price</th>

            <th className="border p-2 ">Qty</th>

            <th className="border p-2">Total</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="bg-slate-800">
              <td className="border p-2 text-white">{product.name}</td>

              <td className="border p-2 text-white">{product.fixedPrice}</td>

              <td className="border p-2">
                <input
                  type="number"
                  min="0"
                  className="text-slate-50"
                  value={product.qty || ""}
                  onChange={(e) => handleQtyChange(product.id, e.target.value)}
                />
              </td>

              <td className="border p-2 text-white">
                {product.fixedPrice * (product.qty || 0)}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="bg-green-300">
            <td colSpan="3" className="border p-2 font-bold">
              Total Sales
            </td>

            <td className="border p-2 font-bold">{formatNumber(totalSales)}</td>
          </tr>
        </tfoot>
      </table>

      <button
        onClick={saveReport}
        className="
        mt-5
        bg-green-500
        px-6
        py-3
        rounded-xl
        text-xl
        "
      >
        SAVE FINAL REPORT
      </button>
    </Container>
  );
}
