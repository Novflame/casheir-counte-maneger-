

export default function DeveloperInfo({ onClose }) {
  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      boxSizing: "border-box",
    },

    card: {
      width: "100%",
      maxWidth: "420px",
      backgroundColor: "#1e293b",
      borderRadius: "18px",
      padding: "25px",
      boxSizing: "border-box",
      boxShadow: "0 10px 35px rgba(0,0,0,0.5)",
      color: "#ffffff",
    },

    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "25px",
    },

    title: {
      margin: 0,
      fontSize: "24px",
      fontWeight: "bold",
    },

    closeButton: {
      width: "38px",
      height: "38px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#334155",
      color: "#ffffff",
      fontSize: "22px",
      cursor: "pointer",
    },

    developer: {
      textAlign: "center",
      marginBottom: "25px",
    },

    name: {
      margin: "0 0 8px",
      fontSize: "26px",
      fontWeight: "bold",
    },

    role: {
      margin: 0,
      color: "#cbd5e1",
      fontSize: "17px",
    },

    info: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },

    row: {
      padding: "12px 14px",
      backgroundColor: "#213558",
      borderRadius: "10px",
      fontSize: "16px",
    },

    label: {
      fontWeight: "bold",
      color: "#f59e0b",
      marginRight: "8px",
    },

    footer: {
      marginTop: "25px",
      textAlign: "center",
      color: "#94a3b8",
      fontSize: "14px",
    },
  };

  return (
    <div
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        style={styles.card}
        onClick={(e) => e.stopPropagation()}
      >

        <div style={styles.header}>

          <h2 style={styles.title}>
            Developer Info
          </h2>

          <button
            type="button"
            onClick={onClose}
            style={styles.closeButton}
          >
            ×
          </button>

        </div>

        <div style={styles.developer}>

          <h3 style={styles.name}>
            Mysr
          </h3>

          <p style={styles.role}>
            Frontend Developer
          </p>

        </div>

        <div style={styles.info}>

          <div style={styles.row}>
            <span style={styles.label}>
              App:
            </span>
            Cashier Assistant
          </div>

          <div style={styles.row}>
            <span style={styles.label}>
              Technology:
            </span>
            React + JavaScript + tailwind css 
          </div>

          <div style={styles.row}>
            <span style={styles.label}>
              Version:
            </span>
            1.0.0
          </div>

        </div>

        <div style={styles.footer}>
          Developed with React
        </div>

      </div>
    </div>
  );
}

