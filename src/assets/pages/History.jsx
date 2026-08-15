import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function History() {
  const navigate = useNavigate();

  const [history] = useState(() => {
    const saved = JSON.parse(
      localStorage.getItem("reportHistory") || "[]"
    );

    return Array.isArray(saved) ? saved : [];

  });

   function openReport(id) {
    navigate(`/History/${id}`);
  }

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

    title: {
      textAlign: "center",
      color: "#fff",
      fontSize: "28px",
      fontWeight: "800",
      marginBottom: "20px",
    },

    list: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },

    item: {
      width: "100%",
      padding: "15px",
      boxSizing: "border-box",
      borderRadius: "10px",
      border: "1px solid #4c608e",
      backgroundColor: "#213558",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: "17px",
      fontWeight: "700",
    },

    arrow: {
      color: "#d8b804",
      fontSize: "20px",
    },

    empty: {
      padding: "25px",
      textAlign: "center",
      backgroundColor: "#1e293b",
      color: "#cbd5e1",
      borderRadius: "10px",
    },
  };

 

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <h1 style={styles.title}>
          History
        </h1>

        {history.length === 0 ? (

          <div style={styles.empty}>
            No previous reports
          </div>

        ) : (

          <div style={styles.list}>

            {history.map((report) => (

              <div
                key={report.id}
                style={styles.item}
                onClick={() => openReport(report.id)}
              >

                <span>
                  {report.date}
                </span>

                <span style={styles.arrow}>
                  →
                </span>

              </div>

            ))}

          </div>

        )}

      </div>
    </div>
  );
}