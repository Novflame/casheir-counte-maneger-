import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeveloperInfo from "../component/DeveloperInfo";
export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const [showDeveloperInfo, setShowDeveloperInfo] = useState(false);
  const navigate = useNavigate();

  function resetApp() {
    const confirmed = window.confirm(
      "Reset the entire app?\n\nAll company, product, expense, and report data will be deleted.",
    );

    if (!confirmed) {
      return;
    }

    // Delete only data belonging to this app
    const appStorageKeys = [
      "companyInfo",
      "fixedProducts",
      "fixedExpensess",
      "currentReportExpenses",
    ];

    appStorageKeys.forEach((key) => {
      localStorage.removeItem(key);
    });

    // Close the menu
    setOpen(false);

    // Restart the application
    window.location.reload();
  }

  const styles = {
    wrapper: {
      position: "relative",
      zIndex: 1000,
    },

    menuButton: {
      width: "48px",
      height: "48px",
      border: "none",
      borderRadius: "10px",
      backgroundColor: "#213558",
      color: "#ffffff",
      fontSize: "26px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      zIndex: 999,
    },

    menu: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "280px",
      maxWidth: "85vw",
      height: "100vh",
      backgroundColor: "#1e293b",
      boxShadow: "8px 0 25px rgba(0,0,0,0.35)",
      zIndex: 1000,
      padding: "25px 20px",
      boxSizing: "border-box",
    },

    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "35px",
    },

    title: {
      margin: 0,
      color: "#ffffff",
      fontSize: "24px",
      fontWeight: "bold",
    },

    closeButton: {
      width: "40px",
      height: "40px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#334155",
      color: "#ffffff",
      fontSize: "22px",
      cursor: "pointer",
    },

    actions: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },

    actionButton: {
      width: "100%",
      padding: "15px",
      border: "none",
      borderRadius: "10px",
      backgroundColor: "#213558",
      color: "#ffffff",
      fontSize: "17px",
      fontWeight: "600",
      textAlign: "left",
      cursor: "pointer",
    },
    developerButton: {
      position: "absolute",
      bottom: "25px",
      left: "20px",
      width: "calc(100% - 40px)",
      padding: "13px",
      border: "1px solid #475569",
      borderRadius: "10px",
      backgroundColor: "transparent",
      color: "#cbd5e1",
      fontSize: "15px",
      cursor: "pointer",
    },

    dangerButton: {
      width: "100%",
      padding: "15px",
      border: "none",
      borderRadius: "10px",
      backgroundColor: "#7f1d1d",
      color: "#ffffff",
      fontSize: "17px",
      fontWeight: "600",
      textAlign: "left",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.wrapper}>
      {/* MENU BUTTON */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        style={styles.menuButton}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* SIDE MENU */}

      {open && (
        <>
          {/* Overlay */}

          <div style={styles.overlay} onClick={() => setOpen(false)} />

          {/* Menu */}

          <aside style={styles.menu}>
            <div style={styles.header}>
              <h2 style={styles.title}>Menu</h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                style={styles.closeButton}
                aria-label="Close menu"
              >
                ×
              </button>

              <button
                type="button"
                style={styles.developerButton}
                onClick={() => setShowDeveloperInfo(true)}
              >
                Developer Info
              </button>
            </div>

            <div style={styles.actions}>
              <button
                type="button"
                style={styles.actionButton}
                onClick={() => {
                  setOpen(false);
                  navigate("/SetupStart?mode=update");
                }}
              >
                Update Fixed Products
              </button>

              <button
                type="button"
                style={styles.dangerButton}
                onClick={resetApp}
              >
                Reset App
              </button>
            </div>
          </aside>
          {showDeveloperInfo && (
            <DeveloperInfo onClose={() => setShowDeveloperInfo(false)} />
          )}
        </>
      )}
    </div>
  );
}
