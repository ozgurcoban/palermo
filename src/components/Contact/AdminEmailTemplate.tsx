import * as React from "react";

interface AdminEmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

const AdminEmailTemplate: React.FC<Readonly<AdminEmailTemplateProps>> = ({
  name,
  email,
  message,
}) => {
  const currentDate = new Date().toLocaleString("sv-SE", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const replySubject = `Re: Ditt meddelande till Palermo Uppsala`;
  const replyBody = `Hej ${name},

Tack för ditt meddelande!

[Skriv ditt svar här]

------ Ursprungligt meddelande ------
Datum: ${currentDate}
Från: ${name} <${email}>

${message}`;

  const replyMailto = `mailto:${email}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(replyBody)}`;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#18181B", color: "#ffffff", padding: "20px", textAlign: "center" }}>
        <h1 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>Palermo Uppsala</h1>
        <p style={{ margin: "5px 0 0 0", fontSize: "14px", opacity: "0.8" }}>Nytt meddelande från hemsidan</p>
      </div>

      {/* Alert Box */}
      <div style={{ backgroundColor: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: "8px", padding: "16px", margin: "20px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ backgroundColor: "#92400E", color: "#ffffff", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "12px", fontSize: "14px", fontWeight: "bold" }}>!</div>
          <div>
            <h3 style={{ color: "#92400E", margin: "0", fontSize: "16px", fontWeight: "600" }}>Ny kundförfrågan</h3>
            <p style={{ color: "#92400E", margin: "4px 0 0 0", fontSize: "14px" }}>En kund har skickat ett meddelande via kontaktformuläret</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 20px 20px 20px" }}>
        {/* Customer Information */}
        <div style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "8px", overflow: "hidden", marginBottom: "20px" }}>
          <div style={{ backgroundColor: "#F3F4F6", padding: "12px 16px", borderBottom: "1px solid #E5E7EB" }}>
            <h3 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#374151" }}>Kundinformation</h3>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td style={{ padding: "12px 16px", borderBottom: "1px solid #E5E7EB", fontWeight: "600", color: "#374151", width: "30%" }}>Namn</td>
              <td style={{ padding: "12px 16px", borderBottom: "1px solid #E5E7EB", color: "#6B7280" }}>{name}</td>
            </tr>
            <tr>
              <td style={{ padding: "12px 16px", borderBottom: "1px solid #E5E7EB", fontWeight: "600", color: "#374151" }}>E-post</td>
              <td style={{ padding: "12px 16px", borderBottom: "1px solid #E5E7EB", color: "#6B7280" }}>
                <a href={`mailto:${email}`} style={{ color: "#92400E", textDecoration: "none" }}>{email}</a>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "12px 16px", fontWeight: "600", color: "#374151" }}>Datum & tid</td>
              <td style={{ padding: "12px 16px", color: "#6B7280" }}>{currentDate}</td>
            </tr>
          </table>
        </div>

        {/* Message */}
        <div style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: "8px", overflow: "hidden", marginBottom: "20px" }}>
          <div style={{ backgroundColor: "#F3F4F6", padding: "12px 16px", borderBottom: "1px solid #E5E7EB" }}>
            <h3 style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#374151" }}>Meddelande</h3>
          </div>
          <div style={{ padding: "16px", color: "#374151", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>
            {message}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <a
            href={replyMailto}
            style={{
              display: "inline-block",
              backgroundColor: "#92400E",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
              marginRight: "12px",
              fontSize: "14px"
            }}
          >
            Svara kund
          </a>
          <a
            href={`mailto:${email}`}
            style={{
              display: "inline-block",
              backgroundColor: "#6B7280",
              color: "#ffffff",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px"
            }}
          >
            Kopiera e-post
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: "#F9FAFB", padding: "20px", textAlign: "center", borderTop: "1px solid #E5E7EB" }}>
        <p style={{ margin: "0", fontSize: "12px", color: "#6B7280" }}>
          Detta meddelande skickades automatiskt från kontaktformuläret på{" "}
          <a href="https://palermo-uppsala.se" style={{ color: "#92400E", textDecoration: "none" }}>
            palermo-uppsala.se
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminEmailTemplate;