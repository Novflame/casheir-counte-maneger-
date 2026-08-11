import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CompanyInfo() {
  const navigate = useNavigate();

  const [company, setCompany] = useState({
    compName: "",
    division: "",
    cashMan: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();

    if (!company.compName || !company.division || !company.cashMan) {
      console.log("VALIDATION FAILED");
      return;
    }

    localStorage.setItem(
      "companyInfo",
      JSON.stringify({
        id: 1,
        compName: company.compName,
        division: company.division,
        cashMan: company.cashMan,
      }),
    );

    localStorage.setItem("companyInfo", JSON.stringify(company));
    window.location.href = "/SetupStart";
    navigate("/SetupStart");
    console.log("VALIDATION saved");
  }

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#111827",
      boxSizing: "border-box",
    },

    card: {
      width: "100%",
      maxWidth: "500px",
      padding: "30px",
      backgroundColor: "#1f2937",
      borderRadius: "16px",
      boxSizing: "border-box",
    },

    title: {
      color: "#ffffff",
      textAlign: "center",
      fontSize: "30px",
      marginBottom: "30px",
    },

    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },

    group: {
      display: "flex",
      flexDirection: "column",
      gap: "7px",
    },

    label: {
      color: "#ffffff",
      fontSize: "18px",
    },

    input: {
      display: "block",
      width: "100%",
      height: "50px",
      padding: "10px 14px",
      boxSizing: "border-box",

      backgroundColor: "#ffffff",
      color: "#111111",

      border: "2px solid #2563eb",
      borderRadius: "8px",

      fontSize: "18px",
      fontWeight: "500",

      outline: "none",
      opacity: 1,
    },

    button: {
      width: "100%",
      padding: "14px",
      marginTop: "10px",
      backgroundColor: "#16a34a",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "20px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    hidden: {
      display: "hidden",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Company Information</h1>

        <form onSubmit={handleSave} style={styles.form}>
          <div style={styles.group}>
            <label htmlFor="compName" style={styles.label}>
              Company Name
            </label>

            <input
              id="compName"
              name="compName"
              type="text"
              value={company.compName}
              onChange={handleChange}
              className="bg-slate-50"
            />
          </div>

          <div style={styles.group}>
            <label htmlFor="division" style={styles.label}>
              Division
            </label>

            <input
              className="bg-slate-50"
              id="division"
              name="division"
              type="text"
              value={company.division}
              onChange={handleChange}
            />
          </div>

          <div style={styles.group}>
            <label htmlFor="cashMan" style={styles.label}>
              Cash Manager
            </label>

            <input
              className="bg-slate-50"
              id="cashMan"
              name="cashMan"
              type="text"
              value={company.cashMan}
              onChange={handleChange}
            />
          </div>

          <button type="submit" style={styles.button}>
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}
