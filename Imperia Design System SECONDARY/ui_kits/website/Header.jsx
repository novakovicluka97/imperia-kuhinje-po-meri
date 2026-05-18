// Header — sticky top navigation, language switch, primary CTA.
const { useEffect: useEffectH, useState: useStateH } = React;

function Header({ route, setRoute, dark = false }) {
  const [scrolled, setScrolled] = useStateH(false);
  useEffectH(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    ["home", "Početna"],
    ["collection", "Kolekcije"],
    ["detail", "Projekt"],
    ["journal", "Dnevnik"],
    ["contact", "Kontakt"],
  ];

  const inverse = dark && !scrolled;

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: inverse ? "transparent" : "rgba(244,239,231,0.92)",
      backdropFilter: scrolled || !dark ? "blur(16px)" : "none",
      WebkitBackdropFilter: scrolled || !dark ? "blur(16px)" : "none",
      borderBottom: inverse ? "1px solid rgba(244,239,231,0.10)" : "1px solid var(--rule)",
      color: inverse ? "var(--bone)" : "var(--ink)",
      transition: "background 240ms, color 240ms, border-color 240ms",
    }}>
      <div className="container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px var(--page-pad)",
      }}>
        <a onClick={() => setRoute("home")} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 14 }}>
          {/* Inline wordmark so colour swaps with inverse */}
          <svg viewBox="0 0 480 96" height="38" aria-label="Imperia">
            <text x="240" y="60" textAnchor="middle"
              fontFamily="Cormorant Garamond, Times New Roman, serif"
              fontWeight="500" fontSize="64"
              letterSpacing="0.34em"
              fill={inverse ? "#F4EFE7" : "#1A1916"}>IMPERIA</text>
            <line x1="120" y1="78" x2="200" y2="78" stroke={inverse ? "#A48758" : "#6B4A2B"} strokeWidth="0.75"/>
            <line x1="280" y1="78" x2="360" y2="78" stroke={inverse ? "#A48758" : "#6B4A2B"} strokeWidth="0.75"/>
            <text x="240" y="84" textAnchor="middle"
              fontFamily="Manrope, sans-serif" fontWeight="500" fontSize="10"
              letterSpacing="0.42em"
              fill={inverse ? "#A48758" : "#6B4A2B"}>KUHINJE PO MERI</text>
          </svg>
        </a>
        <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {items.map(([k, label]) => (
            <span
              key={k}
              className={"nav-link " + (route === k ? "active " : "") + (inverse ? "on-ink-nav" : "")}
              onClick={() => setRoute(k)}
            >{label}</span>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: inverse ? "rgba(244,239,231,0.7)" : "var(--stone)",
            cursor: "pointer",
          }}>
            <span style={{ color: inverse ? "var(--bone)" : "var(--ink)", borderBottom: "1px solid " + (inverse ? "var(--brass)" : "var(--walnut)"), paddingBottom: 2 }}>HR</span>
            <span style={{ margin: "0 8px" }}>·</span>
            <span>EN</span>
          </span>
          <button
            className={"btn " + (inverse ? "btn-inverse" : "btn-ghost")}
            style={{ padding: "10px 18px", fontSize: 12 }}
            onClick={() => setRoute("contact")}
          >
            <span>Konzultacija</span>
            <Icon name="arrowUpRight" size={12}/>
          </button>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
