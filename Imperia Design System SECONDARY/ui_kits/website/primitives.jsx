// Imperia primitives — small reusable bits used across pages.
// React (window.React) + JSX via Babel.

const { useState } = React;

function Eyebrow({ children, style }) {
  return <div className="eyebrow-label" style={style}>{children}</div>;
}

function Rule({ width = "100%", color = "var(--rule)", style }) {
  return <div style={{ width, height: 1, background: color, ...style }} />;
}

function RuleBar({ color = "var(--walnut)", width = 24 }) {
  return <span style={{ display: "inline-block", width, height: 1, background: color }} />;
}

function Numeral({ n, color = "var(--walnut)" }) {
  return (
    <span style={{
      fontFamily: "var(--font-display)",
      fontStyle: "italic",
      fontWeight: 400,
      color,
      lineHeight: 1
    }}>{n}</span>
  );
}

// 1.25-stroke Lucide-style icon set inlined so the kit is offline-safe.
function Icon({ name, size = 20, stroke = "currentColor", strokeWidth = 1.25, style }) {
  const p = { fill: "none", stroke, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    search: <><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16" y2="16"/></>,
    arrowRight: <><line x1="4" y1="12" x2="20" y2="12"/><polyline points="13 5 20 12 13 19"/></>,
    arrowUpRight: <><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></>,
    chevronDown: <polyline points="6 9 12 15 18 9"/>,
    chevronLeft: <polyline points="15 6 9 12 15 18"/>,
    chevronRight: <polyline points="9 6 15 12 9 18"/>,
    mail: <><rect x="3" y="5" width="18" height="14"/><polyline points="3 7 12 13 21 7"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    minus: <line x1="5" y1="12" x2="19" y2="12"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...p} style={style}>{paths[name]}</svg>
  );
}

function Button({ children, kind = "primary", onClick, icon, style }) {
  const cls = {
    primary: "btn btn-primary",
    ghost: "btn btn-ghost",
    inverse: "btn btn-inverse",
    link: "btn btn-link",
  }[kind] || "btn btn-primary";
  return (
    <button className={cls} onClick={onClick} style={style}>
      <span>{children}</span>
      {icon !== null && <Icon name={icon || "arrowRight"} size={14}/>}
    </button>
  );
}

function NumeralHeader({ n, eyebrow, title, mark = true, onInk = false }) {
  return (
    <div className="flex gap-6" style={{ alignItems: "flex-start" }}>
      <div style={{
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: "clamp(40px, 5vw, 64px)",
        color: onInk ? "var(--brass)" : "var(--walnut)",
        lineHeight: 1,
        minWidth: 80,
      }}>
        {n}
      </div>
      <div style={{ width: 1, alignSelf: "stretch", background: onInk ? "rgba(244,239,231,0.18)" : "var(--rule)" }}/>
      <div style={{ flex: 1 }}>
        <Eyebrow style={{ color: onInk ? "var(--brass)" : "var(--walnut)", marginBottom: 14 }}>{eyebrow}</Eyebrow>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "clamp(34px, 4vw, 52px)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          margin: 0,
          color: onInk ? "var(--bone)" : "var(--ink)",
          maxWidth: "20ch",
        }}>{title}</h2>
        {mark && (
          <div style={{ marginTop: 24 }}>
            <svg viewBox="0 0 240 24" width="160" height="14">
              <line x1="0" y1="12" x2="100" y2="12" stroke={onInk ? "var(--brass)" : "var(--walnut)"} strokeWidth="0.75"/>
              <circle cx="120" cy="12" r="2.4" fill={onInk ? "var(--brass)" : "var(--walnut)"}/>
              <line x1="140" y1="12" x2="240" y2="12" stroke={onInk ? "var(--brass)" : "var(--walnut)"} strokeWidth="0.75"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Eyebrow, Rule, RuleBar, Numeral, Icon, Button, NumeralHeader });
