interface AdminEmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

const AdminEmailTemplate: React.FC<Readonly<AdminEmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div
    style={{
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#09090B",
      maxWidth: "600px",
      margin: "0 auto",
    }}
  >
    {/* Header */}
    <div
      style={{
        backgroundColor: "#18181B",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#FFFFFF",
          margin: 0,
          fontSize: "24px",
          fontWeight: "600",
          letterSpacing: "-0.025em",
        }}
      >
        Nytt meddelande från hemsidan
      </h1>
    </div>

    {/* Content */}
    <div
      style={{
        backgroundColor: "#FFFFFF",
        padding: "32px",
        border: "1px solid #E4E4E7",
      }}
    >
      {/* Alert box */}
      <div
        style={{
          backgroundColor: "#FEE2E2",
          border: "1px solid #FECACA",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
        }}
      >
        <p
          style={{
            color: "#991B1B",
            fontSize: "14px",
            margin: 0,
            fontWeight: "600",
          }}
        >
          ⚡ Nytt kundmeddelande inväntar svar
        </p>
      </div>

      {/* Customer info */}
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{
            color: "#09090B",
            fontSize: "18px",
            fontWeight: "600",
            marginTop: 0,
            marginBottom: "16px",
            letterSpacing: "-0.025em",
          }}
        >
          Kundinformation
        </h2>
        <div style={{ display: "block" }}>
          <div style={{ 
            marginBottom: "12px", 
            padding: "12px", 
            backgroundColor: "#F4F4F5", 
            borderRadius: "6px",
            border: "1px solid #E4E4E7"
          }}>
            <div style={{ fontSize: "12px", color: "#71717A", fontWeight: "600", marginBottom: "4px" }}>
              NAMN
            </div>
            <div style={{ fontSize: "15px", color: "#09090B" }}>
              {name}
            </div>
          </div>
          
          <div style={{ 
            marginBottom: "12px", 
            padding: "12px", 
            backgroundColor: "#F4F4F5", 
            borderRadius: "6px",
            border: "1px solid #E4E4E7"
          }}>
            <div style={{ fontSize: "12px", color: "#71717A", fontWeight: "600", marginBottom: "4px" }}>
              E-POST
            </div>
            <div style={{ fontSize: "15px" }}>
              <a href={`mailto:${email}`} style={{ color: "#DC2626", textDecoration: "none" }}>
                {email}
              </a>
            </div>
          </div>
          
          <div style={{ 
            padding: "12px", 
            backgroundColor: "#F4F4F5", 
            borderRadius: "6px",
            border: "1px solid #E4E4E7"
          }}>
            <div style={{ fontSize: "12px", color: "#71717A", fontWeight: "600", marginBottom: "4px" }}>
              DATUM & TID
            </div>
            <div style={{ fontSize: "15px", color: "#09090B" }}>
              {new Date().toLocaleString("sv-SE", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <h2
          style={{
            color: "#09090B",
            fontSize: "18px",
            fontWeight: "600",
            marginTop: 0,
            marginBottom: "16px",
            letterSpacing: "-0.025em",
          }}
        >
          Kundens meddelande
        </h2>
        <div
          style={{
            color: "#18181B",
            lineHeight: "1.625",
            whiteSpace: "pre-wrap",
            backgroundColor: "#FAFAFA",
            padding: "24px",
            borderRadius: "8px",
            border: "1px solid #E4E4E7",
            fontSize: "15px",
          }}
        >
          {message}
        </div>
      </div>

      {/* Action buttons */}
      <div
        style={{
          textAlign: "center",
          marginTop: "32px",
          display: "flex",
          gap: "12px",
          justifyContent: "center",
        }}
      >
        <a
          href={`mailto:${email}?subject=Re: Ditt meddelande till Palermo Uppsala&body=Hej ${name},%0D%0A%0D%0ATack för ditt meddelande!%0D%0A%0D%0A[Skriv ditt svar här]%0D%0A%0D%0A------ Ursprungligt meddelande ------%0D%0ADatum: ${new Date().toLocaleDateString("sv-SE")}%0D%0AFrån: ${name} <${email}>%0D%0A%0D%0A${encodeURIComponent(message).replace(/%0A/g, "%0D%0A")}`}
          style={{
            display: "inline-block",
            backgroundColor: "#18181B",
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "14px",
            letterSpacing: "-0.025em",
          }}
        >
          Svara kund
        </a>
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#F4F4F5",
            color: "#71717A",
            padding: "12px 24px",
            borderRadius: "6px",
            fontWeight: "500",
            fontSize: "14px",
            letterSpacing: "-0.025em",
            border: "1px solid #E4E4E7",
            fontFamily: "monospace",
          }}
        >
          {email}
        </span>
      </div>
    </div>

    {/* Footer */}
    <div
      style={{
        backgroundColor: "#F4F4F5",
        padding: "20px",
        textAlign: "center",
        fontSize: "12px",
        color: "#71717A",
      }}
    >
      <p style={{ margin: 0 }}>
        Detta är ett automatiskt meddelande från kontaktformuläret på
        palermo-uppsala.se
      </p>
    </div>
  </div>
);

export default AdminEmailTemplate;
