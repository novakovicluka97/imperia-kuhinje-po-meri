// HomePage — landing.
// Sections: hero, intro statement, featured kitchens (3), the workshop strip, journal teaser, CTA band.

function HeroBlock({ setRoute }) {
  return (
    <section className="hero">
      <div className="hero-img">
        <image-slot
          id="home-hero"
          shape="rect"
          placeholder="Hero photograph — wide kitchen interior, side light"
          style={{ "--is-bg": "#1A1916", "--is-fg": "rgba(244,239,231,0.5)", "--is-border": "rgba(244,239,231,0.12)", "--is-stroke": "#A48758" }}
        ></image-slot>
      </div>
      <div className="container hero-inner">
        <div style={{ maxWidth: 780 }}>
          <Eyebrow style={{ color: "var(--brass)", marginBottom: 28 }}>Est. 2014 · Zagreb</Eyebrow>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(56px, 8vw, 124px)",
            lineHeight: 0.95,
            letterSpacing: "-0.015em",
            margin: 0,
            color: "var(--bone)",
          }}>
            Kuhinje<br/>
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>po meri.</span>
          </h1>
          <p style={{
            fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 400,
            fontSize: "clamp(18px, 1.6vw, 24px)", lineHeight: 1.45,
            color: "rgba(244,239,231,0.82)",
            maxWidth: "48ch", marginTop: 32,
          }}>
            Crtane u stvarnoj veličini, izrađene u jednoj radionici, postavljene jednom — za desetljeća.
          </p>
          <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
            <button className="btn btn-inverse" onClick={() => setRoute("collection")}>
              <span>Pogledajte kolekcije</span>
              <Icon name="arrowRight" size={14}/>
            </button>
            <button className="btn" style={{ background: "transparent", color: "var(--bone)", border: "1px solid rgba(244,239,231,0.4)" }} onClick={() => setRoute("contact")}>
              <span>Dogovorite razgovor</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroStatement() {
  return (
    <section className="container" style={{ padding: "160px var(--page-pad) 0" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 2fr", gap: 96, alignItems: "start",
      }}>
        <div>
          <Eyebrow style={{ marginBottom: 18 }}>Manifest</Eyebrow>
          <RuleBar/>
        </div>
        <div>
          <p style={{
            fontFamily: "var(--font-display)", fontWeight: 500,
            fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.25,
            letterSpacing: "-0.005em",
            color: "var(--ink)", margin: 0, maxWidth: "26ch",
          }}>
            Postoji razlika između kuhinje koju stavite u kuću i kuhinje oko koje je kuća izgrađena.
            <span style={{ fontStyle: "italic", fontWeight: 400, color: "var(--ink-70)" }}>&nbsp;Mi pravimo drugu.</span>
          </p>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.7,
            color: "var(--ink-70)", maxWidth: "56ch", marginTop: 40,
          }}>
            Svaka Imperia kuhinja crta se u stvarnoj veličini na podu radionice prije nego što se odreže prvi komad drveta. Visine ormarića, otklon vrata, razmak između sjenki — sve se odluči u olovci prije nego u hrastu.
          </p>
        </div>
      </div>
    </section>
  );
}

const FEATURED_KITCHENS = [
  { id: "tuskanac", name: "Tuškanac III", material: "Hrast, ručno lakiran", year: "2024",
    gradient: "linear-gradient(135deg, #3a2e22 0%, #1a1916 60%, #6b4a2b 130%)" },
  { id: "sestine", name: "Šestine Pantry", material: "Lakirani bagrem, mesing", year: "2023",
    gradient: "linear-gradient(160deg, #ECE5D9 0%, #D2C7B3 70%, #b8a584 110%)" },
  { id: "rovinj", name: "Rovinj Cottage", material: "Maslinovo drvo, kamen", year: "2023",
    gradient: "linear-gradient(135deg, #4a4741 0%, #2C2A26 60%, #8B847A 130%)" },
];

function KitchenCard({ k, onClick }) {
  return (
    <a className="kitchen-card" onClick={onClick}>
      <div className="img-wrap">
        <image-slot
          id={"kitchen-" + k.id}
          shape="rect"
          placeholder={k.name + " — interior photograph"}
          style={{ "--is-bg": "#ECE5D9", "--is-border": "var(--rule)" }}
        ></image-slot>
      </div>
      <div className="meta-row">
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.1, color: "var(--ink)" }}>{k.name}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--stone)", marginTop: 6 }}>{k.material}</div>
        </div>
        <div className="eyebrow-label" style={{ color: "var(--walnut)" }}>{k.year}</div>
      </div>
    </a>
  );
}

function FeaturedKitchens({ setRoute, setKitchen }) {
  return (
    <section className="container" style={{ padding: "160px var(--page-pad) 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
        <NumeralHeader n="01" eyebrow="Odabrani projekti" title={<>Tri kuhinje<br/>iz protekle godine</>}/>
        <a onClick={() => setRoute("collection")} className="btn btn-link" style={{ alignSelf: "flex-end" }}>
          <span>Sve kolekcije</span><Icon name="arrowRight" size={12}/>
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
        {FEATURED_KITCHENS.map((k) => (
          <KitchenCard key={k.id} k={k} onClick={() => { setKitchen(k.id); setRoute("detail"); }} />
        ))}
      </div>
    </section>
  );
}

function WorkshopStrip() {
  return (
    <section style={{ marginTop: 160, background: "var(--ink)", color: "var(--bone)", padding: "120px 0" }} className="on-ink">
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 96, alignItems: "center" }}>
          <div style={{ aspectRatio: "5/4", background: "rgba(244,239,231,0.04)" }}>
            <image-slot
              id="workshop-photo"
              shape="rect"
              placeholder="Workshop interior — bench, hand-tools, side light"
              style={{ "--is-bg": "#221f1a", "--is-fg": "rgba(244,239,231,0.4)", "--is-border": "rgba(244,239,231,0.10)", "--is-stroke": "#A48758" }}
            ></image-slot>
          </div>
          <div>
            <Eyebrow style={{ color: "var(--brass)", marginBottom: 18 }}>02 · Radionica</Eyebrow>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 500,
              fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.05,
              letterSpacing: "-0.01em", color: "var(--bone)", margin: 0,
              maxWidth: "20ch",
            }}>
              Jedna radionica.<br/>
              <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(244,239,231,0.78)" }}>Jedan tim.</span>
            </h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.7,
              color: "rgba(244,239,231,0.72)", maxWidth: "44ch", marginTop: 28,
            }}>
              Sve naše kuhinje prolaze kroz iste ruke — od skice u olovci do montaže u vašem domu. Bez podizvođača. Bez vanjskih komponenti koje ne nadziremo.
            </p>
            <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 460 }}>
              <Stat n="12" label="godina rada"/>
              <Stat n="180+" label="kuhinja"/>
              <Stat n="1" label="radionica"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 40, color: "var(--bone)", lineHeight: 1 }}>{n}</div>
      <div className="eyebrow-label" style={{ color: "var(--brass)", marginTop: 8 }}>{label}</div>
    </div>
  );
}

function JournalTeaser({ setRoute }) {
  return (
    <section className="container" style={{ padding: "160px var(--page-pad) 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
        <NumeralHeader n="03" eyebrow="Iz dnevnika" title={<>Bilješke<br/>s radnog stola</>}/>
        <a onClick={() => setRoute("journal")} className="btn btn-link"><span>Sve bilješke</span><Icon name="arrowRight" size={12}/></a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
        <JournalCard
          eyebrow="Materijali · Issue 04"
          title="Kako biramo hrast"
          excerpt="Drvo se kupuje na piljani u Slavoniji prije nego što ga vidi naručitelj. Razgovor s Markom o tome što tražimo u panju."
        />
        <JournalCard
          eyebrow="Proces · Issue 03"
          title="Prvi crtež u stvarnoj veličini"
          excerpt="Dvoslojni karton, krijeda i otprilike sedam metara poda. Zašto ne preskačemo ovaj korak ni za jedan projekt."
        />
      </div>
    </section>
  );
}

function JournalCard({ eyebrow, title, excerpt }) {
  return (
    <article style={{ paddingTop: 24, borderTop: "1px solid var(--rule-strong)" }}>
      <Eyebrow style={{ marginBottom: 18 }}>{eyebrow}</Eyebrow>
      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.005em", margin: 0 }}>
        {title}
      </h3>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.7, color: "var(--ink-70)", maxWidth: "44ch", marginTop: 16 }}>
        {excerpt}
      </p>
      <a className="btn btn-link" style={{ marginTop: 16 }}>
        <span>Čitajte</span><Icon name="arrowRight" size={12}/>
      </a>
    </article>
  );
}

function CTABand({ setRoute }) {
  return (
    <section className="container" style={{ padding: "160px var(--page-pad) 0" }}>
      <div style={{
        border: "1px solid var(--rule-strong)",
        padding: "80px 64px",
        display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center",
      }}>
        <div>
          <Eyebrow style={{ marginBottom: 18 }}>Razgovor</Eyebrow>
          <h2 style={{
            fontFamily: "var(--font-display)", fontWeight: 500,
            fontSize: "clamp(32px, 3.4vw, 48px)", lineHeight: 1.1,
            letterSpacing: "-0.01em", margin: 0, maxWidth: "22ch",
          }}>
            Imamo vremena za četiri nove kuhinje u <span style={{ fontStyle: "italic", fontWeight: 400 }}>2026</span>.
          </h2>
        </div>
        <Button onClick={() => setRoute("contact")}>Dogovorite konzultaciju</Button>
      </div>
    </section>
  );
}

function HomePage({ setRoute, setKitchen }) {
  return (
    <>
      <HeroBlock setRoute={setRoute}/>
      <IntroStatement/>
      <FeaturedKitchens setRoute={setRoute} setKitchen={setKitchen}/>
      <WorkshopStrip/>
      <JournalTeaser setRoute={setRoute}/>
      <CTABand setRoute={setRoute}/>
    </>
  );
}

window.HomePage = HomePage;
