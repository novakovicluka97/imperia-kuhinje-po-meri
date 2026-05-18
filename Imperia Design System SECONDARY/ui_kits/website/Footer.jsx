// Footer — address block, social, fine print, kept quiet.

function Footer() {
  return (
    <footer className="on-ink" style={{
      background: "var(--ink)", color: "var(--bone)",
      paddingTop: 96, paddingBottom: 48, marginTop: 120,
    }}>
      <div className="container">
        <div style={{
          display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48,
          paddingBottom: 64,
          borderBottom: "1px solid rgba(244,239,231,0.12)",
        }}>
          <div>
            <svg viewBox="0 0 480 96" height="48">
              <text x="0" y="60"
                fontFamily="Cormorant Garamond, serif" fontWeight="500" fontSize="64"
                letterSpacing="0.34em" fill="#F4EFE7">IMPERIA</text>
            </svg>
            <p style={{
              fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400,
              fontSize: 20, lineHeight: 1.45, color: "rgba(244,239,231,0.78)",
              maxWidth: "32ch", marginTop: 24,
            }}>
              Kuhinje crtane u stvarnoj veličini, izrađene u jednoj radionici, postavljene jednom — za desetljeća.
            </p>
          </div>
          <div>
            <Eyebrow style={{ color: "var(--brass)", marginBottom: 18 }}>Radionica</Eyebrow>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(244,239,231,0.86)" }}>
              Heinzelova 64<br/>
              10000 Zagreb<br/>
              Hrvatska
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(244,239,231,0.86)", marginTop: 18 }}>
              Pon–Pet · 09:00–17:00<br/>
              Subotom po dogovoru
            </div>
          </div>
          <div>
            <Eyebrow style={{ color: "var(--brass)", marginBottom: 18 }}>Kontakt</Eyebrow>
            <div className="col gap-3" style={{ fontSize: 13, color: "rgba(244,239,231,0.86)" }}>
              <span style={{ display: "inline-flex", gap: 10, alignItems: "center" }}><Icon name="phone" size={14}/> +385 1 555 0140</span>
              <span style={{ display: "inline-flex", gap: 10, alignItems: "center" }}><Icon name="mail" size={14}/> studio@imperia.hr</span>
              <span style={{ display: "inline-flex", gap: 10, alignItems: "center" }}><Icon name="instagram" size={14}/> @imperia.kuhinje</span>
            </div>
          </div>
          <div>
            <Eyebrow style={{ color: "var(--brass)", marginBottom: 18 }}>Saznajte više</Eyebrow>
            <div className="col gap-3" style={{ fontSize: 13, color: "rgba(244,239,231,0.86)" }}>
              <span>Proces od skice do montaže</span>
              <span>Materijali i završne obrade</span>
              <span>Najčešća pitanja</span>
              <span>Press &amp; preuzimanja</span>
            </div>
          </div>
        </div>
        <div style={{
          paddingTop: 32, display: "flex", justifyContent: "space-between",
          fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.08em",
          color: "rgba(244,239,231,0.55)", textTransform: "uppercase",
        }}>
          <span>© 2026 Imperia d.o.o.</span>
          <span>Sva prava pridržana · Privatnost · Kolačići</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
