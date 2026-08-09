import { useState, useCallback, useMemo, useEffect, useRef } from "react";

// ─── Color tokens ───
const C = {
  red: "#C8102E",
  redDark: "#9B0C23",
  redLight: "#FDE8EC",
  redMid: "#F5C6CE",
  white: "#FFFFFF",
  bg: "#FAF8F6",
  text: "#1A1A1A",
  textMuted: "#6B6B6B",
  border: "#E5E0DB",
  borderLight: "#F0ECE8",
  green: "#0D7C3E",
  greenBg: "#E6F5ED",
  orange: "#C26A00",
  orangeBg: "#FFF3E0",
  errorBg: "#FDE8EC",
};

// ─── Shared styles ───
const pill = (active) => ({
  padding: "10px 20px",
  border: "none",
  borderRadius: 999,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: active ? 700 : 500,
  background: active ? C.red : "transparent",
  color: active ? C.white : C.text,
  transition: "all .2s",
  whiteSpace: "nowrap",
});

const card = {
  background: C.white,
  borderRadius: 16,
  border: `1px solid ${C.border}`,
  padding: 32,
  marginBottom: 24,
};

const sectionTitle = {
  fontSize: 26,
  fontWeight: 800,
  color: C.red,
  marginBottom: 8,
  letterSpacing: -0.5,
};

const sectionSub = {
  fontSize: 15,
  color: C.textMuted,
  marginBottom: 28,
  lineHeight: 1.5,
};

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: `1px solid ${C.border}`,
  borderRadius: 10,
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  transition: "border .2s",
  fontFamily: "inherit",
};

const textareaStyle = { ...inputStyle, minHeight: 90, resize: "vertical" };

const btnPrimary = {
  background: C.red,
  color: C.white,
  border: "none",
  borderRadius: 10,
  padding: "12px 28px",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  transition: "background .2s",
};

const label = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: C.text,
  marginBottom: 6,
};

// ─── Tooltip component ───
function Tip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block", marginLeft: 6 }}>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: C.redLight,
          color: C.red,
          fontSize: 11,
          fontWeight: 800,
          cursor: "help",
        }}
      >
        ?
      </span>
      {show && (
        <div
          style={{
            position: "absolute",
            bottom: 26,
            left: "50%",
            transform: "translateX(-50%)",
            background: C.text,
            color: C.white,
            padding: "10px 14px",
            borderRadius: 10,
            fontSize: 12,
            lineHeight: 1.5,
            width: 260,
            zIndex: 99,
            boxShadow: "0 8px 24px rgba(0,0,0,.18)",
          }}
        >
          {text}
        </div>
      )}
    </span>
  );
}

// ─── Validation badge ───
function Badge({ ok, text }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        background: ok ? C.greenBg : C.errorBg,
        color: ok ? C.green : C.red,
      }}
    >
      <span style={{ fontSize: 15 }}>{ok ? "✓" : "✗"}</span> {text}
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 1 — O kreatorima
// ═══════════════════════════════════════════
function TabKreatori() {
  const creators = [
    { name: "Amina Serhatlic", role: "Student", program: "Savremeni Menadžment i Digitalno Poslovanje" },
    { name: "Valdet Pestalic", role: "Student", program: "Savremeni Menadžment i Digitalno Poslovanje" },
    { name: "Ivona Pekaric", role: "Asistent", program: "Savremeni Menadžment i Digitalno Poslovanje" },
    { name: "Edi Pekaric", role: "Asistent", program: "Računarstvo i informatika" },
  ];
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...sectionTitle, fontSize: 32 }}>Tim iza projekta</div>
        <p style={{ ...sectionSub, maxWidth: 520, margin: "8px auto 0" }}>
          Ovaj alat je kreiran na Univerzitetu FINRA u okviru programa Savremeni Menadžment i
          Digitalno Poslovanje, s ciljem da pomogne studentima i poduzetnicima u izradi kvalitetnih
          biznis planova.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
        {creators.map((c, i) => (
          <div
            key={i}
            style={{
              ...card,
              textAlign: "center",
              padding: 36,
              borderTop: `4px solid ${C.red}`,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`,
                margin: "0 auto 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.white,
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              {c.name.split(" ").map((w) => w[0]).join("")}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{c.name}</div>
            <div
              style={{
                display: "inline-block",
                marginTop: 8,
                padding: "4px 14px",
                borderRadius: 999,
                background: C.red,
                color: C.white,
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              {c.role}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 12, lineHeight: 1.5 }}>
              {c.program}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, fontWeight: 600 }}>Univerzitet FINRA</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 2 — Informacije o aplikaciji
// ═══════════════════════════════════════════
function TabInfo() {
  const features = [
    { icon: "📝", title: "Vodič korak po korak", desc: "Strukturirani vodič koji vas vodi kroz svaki dio biznis plana uz objašnjenja i primjere." },
    { icon: "📊", title: "Integrisane finansijske tabele", desc: "Plan prodaje, troškova, bilans stanja i uspjeha, amortizacija — sve na jednom mjestu." },
    { icon: "✅", title: "Automatski checker", desc: "Sistem automatski provjerava da li vaši finansijski podaci imaju smisla i upozorava na greške." },
    { icon: "📚", title: "Edukativni materijali", desc: "Pristup literaturi, prezentacijama i primjerima uspješnih biznis planova." },
  ];
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...sectionTitle, fontSize: 32 }}>O aplikaciji</div>
        <p style={{ ...sectionSub, maxWidth: 560, margin: "8px auto 0" }}>
          BizPlan Asistent je digitalni alat namijenjen studentima, srednjoškolcima i
          nezavisnim poduzetnicima koji žele naučiti kako kreirati kvalitetan biznis plan.
          Za razliku od postojećih rješenja privrednih komora i nevladinih organizacija,
          ovaj alat nudi potpuno digitalno iskustvo s automatskom provjerom podataka.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {features.map((f, i) => (
          <div key={i} style={{ ...card, padding: 28 }}>
            <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ ...card, marginTop: 12, background: C.redLight, borderColor: C.redMid }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.redDark, marginBottom: 8 }}>
          Kome je namijenjena aplikacija?
        </div>
        <div style={{ fontSize: 14, color: C.text, lineHeight: 1.8 }}>
          <strong>Primarna skupina:</strong> Studenti svih usmjerenja na kojima se radi biznis plan
          (Savremeni Menadžment, Digitalno Poslovanje, i dr.), studenti računarstva i informatike.
          <br />
          <strong>Sekundarna skupina:</strong> Srednjoškolci, nezavisni poduzetnici / freelanceri,
          bilo ko ko želi naučiti izradu biznis plana.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 3 — Zašto je bitan biznis plan
// ═══════════════════════════════════════════
function TabZasto() {
  const reasons = [
    { num: "01", title: "Jasna vizija", desc: "Biznis plan pomaže da jasno definirate svoju poslovnu ideju, viziju i misiju — temelj svakog uspješnog posla." },
    { num: "02", title: "Privlačenje investitora", desc: "Investitori i banke zahtijevaju kvalitetan biznis plan kao preduvjet za finansiranje vašeg projekta." },
    { num: "03", title: "Analiza tržišta", desc: "Kroz izradu biznis plana detaljno analizirate tržište, konkurenciju i ciljnu grupu kupaca." },
    { num: "04", title: "Finansijska projekcija", desc: "Omogućava realan pregled prihoda, troškova i profitabilnosti." },
    { num: "05", title: "Smanjenje rizika", desc: "SWOT analiza i detaljno planiranje pomažu identificirati rizike prije nego što postanu problemi." },
    { num: "06", title: "Operativni plan", desc: "Definiše proizvodne procese, kanale distribucije, marketing strategiju i ključne partnere." },
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...sectionTitle, fontSize: 32 }}>Zašto je bitan biznis plan?</div>
        <p style={{ ...sectionSub, maxWidth: 520, margin: "8px auto 0" }}>
          Biznis plan nije samo akademski zadatak — to je vaš putokaz ka uspješnom poslovanju.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
        {reasons.map((r) => (
          <div key={r.num} style={{ ...card, display: "flex", gap: 18, alignItems: "flex-start" }}>
            <div
              style={{
                minWidth: 48,
                height: 48,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.white,
                fontWeight: 900,
                fontSize: 16,
              }}
            >
              {r.num}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{r.title}</div>
              <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 4 — Literatura & Prezentacije
// ═══════════════════════════════════════════
function TabLiteratura() {
  const resources = [
    { cat: "Akademski izvori", items: [
      { title: "EBSCO baza podataka", desc: "Pristup akademskim člancima o poduzetništvu i izradi biznis planova.", link: "#" },
      { title: "Univerzitetska biblioteka FINRA", desc: "Dostupna literatura iz oblasti menadžmenta i poslovnog planiranja.", link: "#" },
      { title: "Akademski časopisi", desc: "Recenzirani članci o poslovnom planiranju i strategijskom menadžmentu.", link: "#" },
    ]},
    { cat: "Praktični resursi", items: [
      { title: "Templejti biznis planova", desc: "Popunjeni primjeri biznis planova kao inspiracija za vlastiti rad.", link: "#" },
      { title: "Tabele finansijskog plana", desc: "Excel tabele za investicije, amortizaciju, otplatni plan kredita i bilanse.", link: "#" },
      { title: "Odradjeni biznis planovi studenata", desc: "Realni primjeri studentskih biznis planova sa prethodnih generacija.", link: "#" },
    ]},
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...sectionTitle, fontSize: 32 }}>Literatura & Prezentacije</div>
        <p style={sectionSub}>Resursi koji će vam pomoći u izradi kvalitetnog biznis plana.</p>
      </div>
      {resources.map((group) => (
        <div key={group.cat} style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.red, marginBottom: 16 }}>{group.cat}</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {group.items.map((item) => (
              <div
                key={item.title}
                style={{
                  ...card,
                  marginBottom: 0,
                  padding: 24,
                  cursor: "pointer",
                  transition: "box-shadow .2s",
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>{item.desc}</div>
                <div style={{ marginTop: 12, fontSize: 13, fontWeight: 700, color: C.red }}>
                  Pristup resursu →
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 5 — Primjeri biznis planova
// ═══════════════════════════════════════════
function TabPrimjeri() {
  const [expanded, setExpanded] = useState(null);
  const examples = [
    {
      name: "EcoClean d.o.o.",
      industry: "Usluge čišćenja",
      desc: "Ekološka firma za čišćenje poslovnih prostora koristeći isključivo organske proizvode.",
      vizija: "Postati vodeći pružalac ekoloških usluga čišćenja u BiH.",
      misija: "Pružamo vrhunske usluge čišćenja uz očuvanje okoliša i zdravlja naših klijenata.",
      proizvod: "Usluge profesionalnog čišćenja poslovnih i stambenih prostora sa 100% organskim sredstvima.",
      trziste: "Poslovni subjekti u urbanim sredinama koji cijene ekološki pristup.",
    },
    {
      name: "TechBite",
      industry: "IT / Software",
      desc: "Startup za razvoj mobilnih aplikacija usmjerenih na mala i srednja preduzeća.",
      vizija: "Digitalizovati mala preduzeća u regiji kroz pristupačna softverska rješenja.",
      misija: "Kreiramo intuitivne mobilne aplikacije koje pomažu malim preduzećima da efikasnije posluju.",
      proizvod: "Custom mobilne aplikacije, SaaS rješenja za upravljanje zalihama i CRM sistemi.",
      trziste: "MSP sektor u BiH i regiji, posebno trgovine i ugostiteljski objekti.",
    },
    {
      name: "Zelena Livada",
      industry: "Poljoprivreda",
      desc: "Organska farma za proizvodnju povrća i voća sa direktnom prodajom potrošačima.",
      vizija: "Biti prepoznat brend organske hrane u BiH.",
      misija: "Proizvodimo zdravo, lokalno i organski certificirano povrće i voće.",
      proizvod: "Organski certificirano povrće (paradajz, paprika, krastavci) i voće (jabuke, šljive).",
      trziste: "Zdravstveno svjesni potrošači, restorani, i organske prodavnice.",
    },
  ];

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...sectionTitle, fontSize: 32 }}>Primjeri biznis planova</div>
        <p style={sectionSub}>Pogledajte primjere kako bi trebao izgledati popunjen biznis plan.</p>
      </div>
      {examples.map((ex, i) => (
        <div key={i} style={{ ...card, cursor: "pointer" }} onClick={() => setExpanded(expanded === i ? null : i)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{ex.name}</div>
              <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>{ex.industry} — {ex.desc}</div>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: C.redLight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.red,
                fontWeight: 700,
                fontSize: 18,
                transition: "transform .2s",
                transform: expanded === i ? "rotate(180deg)" : "rotate(0)",
              }}
            >
              ▾
            </div>
          </div>
          {expanded === i && (
            <div style={{ marginTop: 20, borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
              {[
                ["Vizija & Misija", `${ex.vizija}\n${ex.misija}`],
                ["Proizvod / Usluga", ex.proizvod],
                ["Ciljno tržište", ex.trziste],
              ].map(([lbl, val]) => (
                <div key={lbl} style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 4 }}>{lbl}</div>
                  <div style={{ fontSize: 14, color: C.text, lineHeight: 1.6, whiteSpace: "pre-line" }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 6 — Vodič / Biznis Plan Builder
// ═══════════════════════════════════════════

const STEPS = [
  { id: "info", label: "Osnovne informacije" },
  { id: "strategija", label: "1. Ključna strategija" },
  { id: "resursi", label: "2. Resursi & SWOT" },
  { id: "operacije", label: "3. Operacije" },
  { id: "investicije", label: "4a. Finansijski plan: Izvori i upotreba kapitala" },
  { id: "bilans_poc", label: "4b. Finansijski plan: Bilans stanja i uspjeha" },
  { id: "plan_prodaje", label: "4c. Finansijski plan: Plan prodaje" },
  { id: "plan_troskova", label: "4d. Finansijski plan: Plan troškova" },
  { id: "amortizacija", label: "4e. Finansijski plan: Obračun Amortizacije" },
  { id: "kredit", label: "4f. Finansijski plan: Otplatni plan kredita" },
  { id: "normativi", label: "4g. Finansijski plan: Normativi i cijene sirovina" },
  { id: "bilans_uspjeha", label: "4h. Finansijski plan: Bilans uspjeha" },
  { id: "bilans_kraj", label: "4i. Bilans stanja (na kraju poslovne godine)" },
  { id: "sazetak", label: "Sažetak & Provjera" },
];

function initData() {
  return {
    naziv: "", autori: "",
    vizija: "", misija: "", proizvod: "", novaVrijednost: "", ciljnoTrziste: "",
    kompetencije: "", imovina: "",
    swot: { snage: "", slabosti: "", prijetnje: "", mogucnosti: "" },
    proizvodnja: "", promocija: "", partneri: "",
    // Investicije
    inv: { zemljiste: 0, zgrade: 0, oprema: 0, vozila: 0, inventar: 0, osnivacka: 0, nematerijalna: 0, zalihe: 0, potrazivanja: 0, gotovina: 0, nap_zemljiste: "", nap_zgrade: "", nap_oprema: "", nap_vozila: "", nap_inventar: "", nap_osnivacka: "", nap_nematerijalna: "", nap_zalihe: "", nap_potrazivanja: "", nap_gotovina: "" },
    // Izvori
    izv: { novac: 0, zemljiste_v: 0, gradevine_v: 0, oprema_v: 0, ostalo_v: 0, dugorocni: 0, kratkorocni: 0, ostali_tudi: 0 },
    // Plan prodaje (5 proizvoda × 7 cols)
    prodaja: Array.from({ length: 3 }, () => ({ naziv: "", cijena: 0, mj2026: 0, god2026: 0, god2027: 0, god2028: 0, god2029: 0, god2030: 0 })),
    // Troškovi
    troskovi: {
      sirovine: [0,0,0,0,0,0], zakup: [0,0,0,0,0,0], energija: [0,0,0,0,0,0], ostaliMat: [0,0,0,0,0,0],
      ptt: [0,0,0,0,0,0], komunalne: [0,0,0,0,0,0], marketing: [0,0,0,0,0,0],
      netoPlate: [0,0,0,0,0,0], porezi: [0,0,0,0,0,0],
      kamate: [0,0,0,0,0,0], nvRobe: [0,0,0,0,0,0],
    },
    // Amortizacija
    amort: Array.from({ length: 5 }, () => ({ opis: "", nabavna: 0, stopa: 0 })),
    // Kredit
    kredit: { iznos: 0, kamata: 0, rok: 0, grace: 0, ucesce: 0, datumPrveRate: "" },
    // Normativi i cijene sirovina i materijala
    normativiProizvodi: ["", "", "", "", ""],
    normativi: Array.from({ length: 2 }, () => ({
      naziv: "", jedMjere: "", cijena: 0,
      kolicine: [0, 0, 0, 0, 0],
    })),
    // Ostali prihodi
    ostaliPrihodi: [0, 0, 0, 0, 0],
    // Početni bilans stanja
    bilansDatum: "",
    bilansAktiva: { nematerijalna: 0, zemljiste: 0, objekti: 0, oprema: 0, ostalaStalna: 0, zalihe: 0, potrazivanja: 0, gotovina: 0, ostalaTekuca: 0 },
    bilansPasiva: { vlastitiKapital: 0, ostaloKapital: 0, dugorocniKredit: 0, ostaleDugorocne: 0, dobavljaci: 0, kratkorocniKrediti: 0, ostaleKratkorocne: 0 },
    // Bilans stanja na kraju poslovne godine
    bilansKrajDatum: "",
    bilansKrajAktiva: { nematerijalna: 0, zemljiste: 0, objekti: 0, oprema: 0, ostalaStalna: 0, zalihe: 0, potrazivanja: 0, novac: 0, ostalaTekuca: 0 },
    bilansKrajPasiva: { vlastitiKapital: 0, akumuliranaDobit: 0, dugorocniKredit: 0, ostaleDugorocne: 0, dobavljaci: 0, kratkorocniKrediti: 0, ostaleKratkorocne: 0 },
    sazetak: "",
  };
}

// Field with label + tooltip
function Field({ lbl, tip, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={label}>
        {lbl}
        {tip && <Tip text={tip} />}
      </label>
      {children}
    </div>
  );
}

// Table numeric input — defined at module scope so React keeps the same
// component identity across re-renders (keeps focus while typing).
function TableInput({ value, onChange, width }) {
  return (
    <input
      type="number"
      value={value || ""}
      onChange={(e) => onChange(e.target.value === "" ? 0 : parseFloat(e.target.value))}
      style={{ ...inputStyle, width: width || 110, padding: "7px 10px", fontSize: 13, textAlign: "right" }}
    />
  );
}

// Date input in dd/mm/yyyy order — stores value internally as ISO "YYYY-MM-DD"
// so it stays compatible with date math elsewhere, but is always entered/displayed as dd/mm/yyyy.
function DateDMY({ value, onChange }) {
  const [day, setDay] = useState(value ? value.split("-")[2] || "" : "");
  const [month, setMonth] = useState(value ? value.split("-")[1] || "" : "");
  const [year, setYear] = useState(value ? value.split("-")[0] || "" : "");

  useEffect(() => {
    if (value) {
      const [y, m, d] = value.split("-");
      setYear(y || ""); setMonth(m || ""); setDay(d || "");
    }
  }, [value]);

  const commit = (d, m, y) => {
    if (d && m && y && String(y).length === 4) {
      const iso = `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      onChange(iso);
    }
  };

  const dmyInput = { ...inputStyle, width: 56, textAlign: "center", fontWeight: 600, padding: "10px 6px" };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <input
        type="number" min="1" max="31" placeholder="dd" value={day}
        onChange={(e) => { const v = e.target.value; setDay(v); commit(v, month, year); }}
        style={dmyInput}
      />
      <span style={{ color: C.textMuted, fontWeight: 700 }}>/</span>
      <input
        type="number" min="1" max="12" placeholder="mm" value={month}
        onChange={(e) => { const v = e.target.value; setMonth(v); commit(day, v, year); }}
        style={dmyInput}
      />
      <span style={{ color: C.textMuted, fontWeight: 700 }}>/</span>
      <input
        type="number" min="1900" max="2100" placeholder="gggg" value={year}
        onChange={(e) => { const v = e.target.value; setYear(v); commit(day, month, v); }}
        style={{ ...dmyInput, width: 76 }}
      />
    </div>
  );
}

function TabVodic() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState([]);
  const [pdfExporting, setPdfExporting] = useState(false);
  const printReportRef = useRef(null);

  const set = useCallback((path, val) => {
    setData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = isNaN(keys[i]) ? keys[i] : Number(keys[i]);
        obj = obj[k];
      }
      const last = isNaN(keys[keys.length - 1]) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
      obj[last] = val;
      return next;
    });
  }, []);

  const num = (v) => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));

  // ── Computed financials ──
  const totalStalna = useMemo(() => {
    const i = data.inv;
    return num(i.zemljiste) + num(i.zgrade) + num(i.oprema) + num(i.vozila) + num(i.inventar) + num(i.osnivacka) + num(i.nematerijalna);
  }, [data.inv]);

  const totalTekuca = useMemo(() => {
    const i = data.inv;
    return num(i.zalihe) + num(i.potrazivanja) + num(i.gotovina);
  }, [data.inv]);

  const totalSredstva = totalStalna + totalTekuca;

  const totalVlastiti = useMemo(() => {
    const i = data.izv;
    return num(i.novac) + num(i.zemljiste_v) + num(i.gradevine_v) + num(i.oprema_v) + num(i.ostalo_v);
  }, [data.izv]);

  const totalTudi = useMemo(() => {
    const i = data.izv;
    return num(i.dugorocni) + num(i.kratkorocni) + num(i.ostali_tudi);
  }, [data.izv]);

  const totalIzvori = totalVlastiti + totalTudi;

  // Prihodi po godinama
  const prihodi = useMemo(() => {
    const yrs = [0, 0, 0, 0, 0];
    data.prodaja.forEach((p) => {
      yrs[0] += num(p.god2026);
      yrs[1] += num(p.god2027);
      yrs[2] += num(p.god2028);
      yrs[3] += num(p.god2029);
      yrs[4] += num(p.god2030);
    });
    return yrs;
  }, [data.prodaja]);

  // Ukupni troškovi po godinama (index 1-5 = god2026..2030)
  const ukupniTroskovi = useMemo(() => {
    const t = data.troskovi;
    const yrs = [0, 0, 0, 0, 0];
    Object.values(t).forEach((arr) => {
      for (let i = 0; i < 5; i++) yrs[i] += num(arr[i + 1]);
    });
    return yrs;
  }, [data.troskovi]);

  // Amortizacija po godinama
  const amortGodisnje = useMemo(() => {
    const yrs = [0, 0, 0, 0, 0];
    data.amort.forEach((a) => {
      const am = num(a.nabavna) * (num(a.stopa) / 100);
      for (let i = 0; i < 5; i++) yrs[i] += am;
    });
    return yrs;
  }, [data.amort]);

  // Kredit - mjesečne rate
  const kreditInfo = useMemo(() => {
    const { iznos, kamata, rok, grace, ucesce, datumPrveRate } = data.kredit;
    const I = num(iznos), K = num(kamata), R = num(rok), G = num(grace), U = num(ucesce);
    if (I <= 0 || R <= 0 || R <= G) return null;
    const osnovica = I - U; // OSNOV = KRED - UCESCE
    const N = R - G; // N = ROKOT - GRACEM — broj rata otplate (bez grace perioda)
    const mK = K / 100 / 12; // mjesečna kamatna stopa (decimalno)
    const graceKamata = osnovica * (K / 100) * (G / 12); // UKAMGR
    const graceRata = G === 0 ? 0 : graceKamata / G; // RATAGR
    let rata = 0; // RATAOT (anuitet)
    if (mK > 0) {
      rata = (osnovica * mK * Math.pow(1 + mK, N)) / (Math.pow(1 + mK, N) - 1);
    } else {
      rata = osnovica / N;
    }
    const kamatuUOtplati = rata * N - osnovica; // UKKAMOT
    const ukupnaKamata = graceKamata + kamatuUOtplati; // UKKAM
    const ukupnoZaduzenje = osnovica + ukupnaKamata; // UKZAD

    // Datum prve rate helper
    const baseDate = datumPrveRate ? new Date(datumPrveRate) : null;
    const dateForRow = (idx) => {
      if (!baseDate) return "";
      const d = new Date(baseDate);
      d.setMonth(d.getMonth() + (idx - 1));
      return d.toLocaleDateString("bs-BA");
    };

    // Generate otplatni plan rows (OTPLATNI PLAN)
    const rows = [];
    let zaduzenje = osnovica;
    let kumKamata = 0;
    // Grace period rows (kamata na cijelu osnovicu, glavnica = 0)
    for (let m = 1; m <= G; m++) {
      const kam = zaduzenje * mK;
      kumKamata += kam;
      rows.push({ br: m, datum: dateForRow(m), zaduzenje, kamata: kam, glavnica: 0, ostatak: zaduzenje, kumKamata });
    }
    // Otplata rows (N rata, anuitetski metod)
    for (let m = 1; m <= N; m++) {
      const kam = zaduzenje * mK;
      const glav = rata - kam;
      const pocetno = zaduzenje;
      zaduzenje = zaduzenje - glav;
      kumKamata += kam;
      rows.push({ br: G + m, datum: dateForRow(G + m), zaduzenje: pocetno, kamata: kam, glavnica: glav, ostatak: Math.max(0, zaduzenje), kumKamata });
    }
    return { osnovica, graceRata, rata, graceKamata, kamatuUOtplati, ukupnaKamata, ukupnoZaduzenje, rows };
  }, [data.kredit]);

  // ── Validation ──
  const validate = useCallback(() => {
    const errs = [];
    if (!data.naziv.trim()) errs.push("Naziv biznis plana nije unesen.");
    if (!data.vizija.trim()) errs.push("Vizija nije unesena.");
    if (!data.misija.trim()) errs.push("Misija nije unesena.");
    if (!data.proizvod.trim()) errs.push("Proizvod/Usluga nije opisana.");
    if (!data.ciljnoTrziste.trim()) errs.push("Ciljno tržište nije definirano.");
    if (!data.swot.snage.trim() || !data.swot.slabosti.trim() || !data.swot.prijetnje.trim() || !data.swot.mogucnosti.trim())
      errs.push("SWOT analiza nije potpuna — popunite sva 4 polja.");
    if (totalSredstva <= 0) errs.push("Ukupna sredstva (investicije) su 0 — unesite vrijednosti.");
    if (totalIzvori <= 0) errs.push("Ukupni izvori sredstava su 0.");
    if (Math.abs(totalSredstva - totalIzvori) > 0.01)
      errs.push(`Sredstva (${totalSredstva.toLocaleString()} KM) ≠ Izvori (${totalIzvori.toLocaleString()} KM). Razlika: ${(totalSredstva - totalIzvori).toLocaleString()} KM.`);
    
    const hasRevenue = prihodi.some((p) => p > 0);
    if (!hasRevenue) errs.push("Plan prodaje je prazan — unesite barem jedan proizvod/uslugu.");
    
    const hasCosts = ukupniTroskovi.some((t) => t > 0);
    if (!hasCosts) errs.push("Plan troškova je prazan.");

    // Provjera profitabilnosti
    for (let i = 0; i < 5; i++) {
      if (prihodi[i] > 0 && ukupniTroskovi[i] > prihodi[i] * 3) {
        errs.push(`Troškovi u ${2026 + i}. su više od 3x veći od prihoda — provjerite podatke.`);
      }
    }

    // Provjera da mjesečni × 12 ≈ godišnji za prodaju
    data.prodaja.forEach((p, idx) => {
      if (p.naziv && num(p.mj2026) > 0 && num(p.god2026) > 0) {
        const expected = num(p.mj2026) * 12;
        if (Math.abs(expected - num(p.god2026)) > expected * 0.2) {
          errs.push(`Proizvod "${p.naziv}": Mjesečni plan × 12 (${expected.toLocaleString()}) znatno odstupa od godišnjeg (${num(p.god2026).toLocaleString()}).`);
        }
      }
    });

    setErrors(errs);
    return errs;
  }, [data, totalSredstva, totalIzvori, prihodi, ukupniTroskovi]);

  // Table helper (moved to module scope — see TableInput below)

  const costsLabels = ["Mjesečni nivo za 2026.", "Godišnji nivo za 2026.", "2027.", "2028.", "2029.", "2030."];
  const costCategories = [
    { type: "section", label: "1. Materijalni troškovi", keys: ["sirovine", "zakup", "energija", "ostaliMat"] },
    { key: "sirovine", label: "Troškovi sirovina i repromaterijala", sub: true },
    { key: "zakup", label: "Troškovi zakupa", sub: true },
    { key: "energija", label: "Troškovi el. energije", sub: true },
    { key: "ostaliMat", label: "Ostali materijalni troškovi (voda, gorivo)", sub: true },
    { type: "section", label: "2. Troškovi usluga", keys: ["ptt", "komunalne", "marketing"] },
    { key: "ptt", label: "PTT", sub: true },
    { key: "komunalne", label: "Komunalne usluge", sub: true },
    { key: "marketing", label: "Ostale neproizvodne usluge (marketing itd)", sub: true },
    { type: "section", label: "3. Plate (bruto)", keys: ["netoPlate", "porezi"] },
    { key: "netoPlate", label: "Neto plate", sub: true },
    { key: "porezi", label: "Porezi i doprinosi na plate", sub: true },
    { key: "kamate", label: "4. Kamate na kredite", sub: false },
    { key: "nvRobe", label: "5. NV prodate robe (za trgovačka preduzeća)", sub: false },
  ];

  const currentStep = STEPS[step];

  // ── Random test data filler (dev/testing helper) ──
  const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const rndF = (min, max, dec = 2) => Number((Math.random() * (max - min) + min).toFixed(dec));
  const pick = (arr) => arr[rnd(0, arr.length - 1)];

  const randomFillStep = () => {
    const id = currentStep.id;
    setData((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      switch (id) {
        case "info": {
          next.naziv = pick(["EcoNova d.o.o.", "TehnoPlus", "Zelena Budućnost", "UrbanCraft", "Digital Hub"]) + " " + rnd(1, 99);
          next.autori = "Amina Serhatlic, Valdet Pestalic";
          break;
        }
        case "strategija": {
          next.vizija = "Postati prepoznatljiv i pouzdan brend na tržištu u narednih 5 godina.";
          next.misija = "Pružamo kvalitetne proizvode/usluge uz fokus na zadovoljstvo kupaca i održivost.";
          next.proizvod = "Proizvodnja i prodaja proizvoda/usluga prilagođenih potrebama savremenog tržišta.";
          next.novaVrijednost = "Brža isporuka, bolja cijena i personaliziran pristup u odnosu na konkurenciju.";
          next.ciljnoTrziste = "Urbani potrošači u dobi od 20 do 45 godina, srednjeg i visokog dohotka.";
          break;
        }
        case "resursi": {
          next.kompetencije = "Iskusan tim sa višegodišnjim iskustvom u industriji i jakim stručnim znanjem.";
          next.imovina = "Poslovni prostor, oprema, vozila i informatička infrastruktura.";
          next.swot = {
            snage: "Iskusan tim, kvalitetan proizvod, jaka lokalna prepoznatljivost.",
            slabosti: "Ograničen marketinški budžet, mala tržišna pokrivenost.",
            mogucnosti: "Rastuće tržište, digitalizacija, nove tehnologije.",
            prijetnje: "Jaka konkurencija, promjene propisa, rast cijena sirovina.",
          };
          break;
        }
        case "operacije": {
          next.proizvodnja = "Proizvodnja/usluga se odvija u vlastitom prostoru uz strogu kontrolu kvalitete.";
          next.promocija = "Marketing putem društvenih mreža, lokalnih sajmova i preporuka kupaca.";
          next.partneri = "Lokalni dobavljači sirovina, logistički partneri i finansijske institucije.";
          break;
        }
        case "investicije": {
          next.inv = {
            zemljiste: rnd(0, 20000), zgrade: rnd(10000, 70000), oprema: rnd(5000, 40000),
            vozila: rnd(0, 25000), inventar: rnd(1000, 8000), osnivacka: rnd(500, 3000),
            nematerijalna: rnd(0, 5000), zalihe: rnd(2000, 15000), potrazivanja: rnd(0, 8000),
            gotovina: rnd(2000, 15000),
          };
          const totalSr = Object.values(next.inv).reduce((a, b) => a + b, 0);
          const novac = rnd(5000, 30000);
          const gradevine_v = rnd(0, 15000);
          const oprema_v = rnd(0, 8000);
          const ostalo_v = rnd(0, 4000);
          const kratkorocni = rnd(0, 8000);
          const ostali_tudi = rnd(0, 3000);
          const sumOstalo = novac + gradevine_v + oprema_v + ostalo_v + kratkorocni + ostali_tudi;
          const dugorocni = Math.max(0, totalSr - sumOstalo);
          next.izv = { novac, zemljiste_v: 0, gradevine_v, oprema_v, ostalo_v, dugorocni, kratkorocni, ostali_tudi };
          break;
        }
        case "bilans_poc": {
          next.bilansDatum = "2026-01-01";
          next.bilansAktiva = {
            nematerijalna: rnd(0, 4000), zemljiste: rnd(0, 15000), objekti: rnd(5000, 40000), oprema: rnd(3000, 25000),
            ostalaStalna: rnd(0, 5000), zalihe: rnd(2000, 12000), potrazivanja: rnd(0, 6000), gotovina: rnd(2000, 15000), ostalaTekuca: rnd(0, 3000),
          };
          const totalAkt = Object.values(next.bilansAktiva).reduce((a, b) => a + b, 0);
          const vlastitiKapital = rnd(10000, 40000);
          const ostaloKapital = rnd(0, 5000);
          const ostaleDugorocne = rnd(0, 5000);
          const dobavljaci = rnd(0, 6000);
          const kratkorocniKrediti = rnd(0, 5000);
          const ostaleKratkorocne = rnd(0, 3000);
          const sumOstalo = vlastitiKapital + ostaloKapital + ostaleDugorocne + dobavljaci + kratkorocniKrediti + ostaleKratkorocne;
          const dugorocniKredit = Math.max(0, totalAkt - sumOstalo);
          next.bilansPasiva = { vlastitiKapital, ostaloKapital, dugorocniKredit, ostaleDugorocne, dobavljaci, kratkorocniKrediti, ostaleKratkorocne };
          break;
        }
        case "plan_prodaje": {
          next.prodaja = next.prodaja.map((p, i) => {
            const cijena = rnd(5, 200);
            const mj2026 = rnd(20, 500);
            const god2026 = mj2026 * 12 * cijena;
            const rast = () => rndF(1.03, 1.15, 3);
            const god2027 = Math.round(god2026 * rast());
            const god2028 = Math.round(god2027 * rast());
            const god2029 = Math.round(god2028 * rast());
            const god2030 = Math.round(god2029 * rast());
            return {
              naziv: p.naziv || `Proizvod ${i + 1}`,
              cijena, mj2026, god2026, god2027, god2028, god2029, god2030,
            };
          });
          break;
        }
        case "plan_troskova": {
          Object.keys(next.troskovi).forEach((key) => {
            const mj = rnd(50, 2000);
            const god1 = mj * 12;
            const rast = () => rndF(1.02, 1.1, 3);
            const god2 = Math.round(god1 * rast());
            const god3 = Math.round(god2 * rast());
            const god4 = Math.round(god3 * rast());
            const god5 = Math.round(god4 * rast());
            next.troskovi[key] = [mj, god1, god2, god3, god4, god5];
          });
          break;
        }
        case "amortizacija": {
          const stope = [5, 10, 15, 20, 33.3, 40];
          const nazivi = ["Oprema", "Vozilo", "Računar i softver", "Poslovni prostor", "Namještaj", "Postrojenje"];
          next.amort = next.amort.map((a, i) => ({
            opis: a.opis || nazivi[i % nazivi.length],
            nabavna: rnd(1000, 30000),
            stopa: pick(stope),
          }));
          break;
        }
        case "kredit": {
          const rok = rnd(24, 84);
          const grace = rnd(0, Math.min(12, rok - 6));
          next.kredit = {
            iznos: rnd(20000, 150000),
            kamata: rndF(2.5, 6.5, 2),
            rok,
            grace,
            ucesce: rnd(0, 10000),
            datumPrveRate: "2026-01-01",
          };
          break;
        }
        case "normativi": {
          next.normativiProizvodi = next.normativiProizvodi.map((p, i) => p || `Proizvod ${i + 1}`);
          const sirovine = ["Brašno", "Šećer", "Ambalaža", "Boja", "Metal", "Tekstil", "Plastika"];
          next.normativi = next.normativi.map((n, i) => ({
            naziv: n.naziv || sirovine[i % sirovine.length],
            jedMjere: pick(["kg", "l", "kom", "m"]),
            cijena: rndF(0.5, 25, 2),
            kolicine: n.kolicine.map(() => rndF(0.1, 5, 2)),
          }));
          break;
        }
        case "bilans_uspjeha": {
          next.ostaliPrihodi = Array.from({ length: 5 }, () => rnd(0, 5000));
          break;
        }
        case "bilans_kraj": {
          next.bilansKrajDatum = "2026-12-31";
          next.bilansKrajAktiva = {
            nematerijalna: rnd(0, 3500), zemljiste: rnd(0, 15000), objekti: rnd(4000, 38000), oprema: rnd(2500, 22000),
            ostalaStalna: rnd(0, 4000), zalihe: rnd(2000, 12000), potrazivanja: rnd(0, 7000), novac: rnd(2000, 18000), ostalaTekuca: rnd(0, 3000),
          };
          const totalAkt = Object.values(next.bilansKrajAktiva).reduce((a, b) => a + b, 0);
          const vlastitiKapital = rnd(10000, 40000);
          const akumuliranaDobit = rnd(0, 15000);
          const ostaleDugorocne = rnd(0, 5000);
          const dobavljaci = rnd(0, 6000);
          const kratkorocniKrediti = rnd(0, 5000);
          const ostaleKratkorocne = rnd(0, 3000);
          const sumOstalo = vlastitiKapital + akumuliranaDobit + ostaleDugorocne + dobavljaci + kratkorocniKrediti + ostaleKratkorocne;
          const dugorocniKredit = Math.max(0, totalAkt - sumOstalo);
          next.bilansKrajPasiva = { vlastitiKapital, akumuliranaDobit, dugorocniKredit, ostaleDugorocne, dobavljaci, kratkorocniKrediti, ostaleKratkorocne };
          break;
        }
        case "sazetak": {
          next.sazetak = "Ukupna ulaganja finansirana su kombinacijom vlastitih i kreditnih sredstava. Projekcije pokazuju rast prihoda i profitabilnosti kroz sve godine planiranja.";
          break;
        }
        default:
          break;
      }
      return next;
    });
  };

  // ── Step renderer ──
  const renderStep = () => {
    switch (currentStep.id) {
      case "info":
        return (
          <div>
            <div style={sectionTitle}>Osnovne informacije</div>
            <p style={sectionSub}>Unesite osnovne podatke o vašem biznis planu.</p>
            <Field lbl="Naziv biznis plana" tip="Naziv vaše kompanije ili poslovne ideje.">
              <input style={inputStyle} value={data.naziv} onChange={(e) => set("naziv", e.target.value)} placeholder="npr. EcoClean d.o.o." />
            </Field>
            <Field lbl="Autori" tip="Imena autora biznis plana.">
              <input style={inputStyle} value={data.autori} onChange={(e) => set("autori", e.target.value)} placeholder="npr. Amina Serhatlic, Valdet Pestalic" />
            </Field>
          </div>
        );

      case "strategija":
        return (
          <div>
            <div style={sectionTitle}>1. Ključna strategija</div>
            <p style={sectionSub}>Definirajte viziju, misiju, proizvod/uslugu, novu vrijednost i ciljno tržište.</p>
            <Field lbl="Vizija" tip="Vizija opisuje dugoročnu sliku onoga što želite postići. Primjer: 'Postati vodeći pružalac ekoloških usluga čišćenja u BiH.'">
              <textarea style={textareaStyle} value={data.vizija} onChange={(e) => set("vizija", e.target.value)} placeholder="Šta je vaša dugoročna vizija?" />
            </Field>
            <Field lbl="Misija" tip="Misija opisuje svrhu vašeg poslovanja i kako planirate ostvariti viziju. Primjer: 'Pružamo vrhunske usluge čišćenja uz očuvanje okoliša.'">
              <textarea style={textareaStyle} value={data.misija} onChange={(e) => set("misija", e.target.value)} placeholder="Koja je svrha vašeg poslovanja?" />
            </Field>
            <Field lbl="Proizvod / Usluga" tip="Detaljno opišite šta nudite tržištu — koji su vaši proizvodi ili usluge, koje probleme rješavaju.">
              <textarea style={textareaStyle} value={data.proizvod} onChange={(e) => set("proizvod", e.target.value)} placeholder="Opišite proizvode ili usluge..." />
            </Field>
            <Field lbl="Nova vrijednost" tip="Šta je osnov za razlikovanje od drugih na tržištu? Šta vas čini posebnima?">
              <textarea style={textareaStyle} value={data.novaVrijednost} onChange={(e) => set("novaVrijednost", e.target.value)} placeholder="Šta vas razlikuje od konkurencije?" />
            </Field>
            <Field lbl="Ciljno tržište" tip="Definirajte ko su vaši kupci, segmentaciju tržišta i ciljnu grupu. Primjer: 'Poslovni subjekti u urbanim sredinama koji cijene ekološki pristup.'">
              <textarea style={textareaStyle} value={data.ciljnoTrziste} onChange={(e) => set("ciljnoTrziste", e.target.value)} placeholder="Ko su vaši kupci i ciljna grupa?" />
            </Field>
          </div>
        );

      case "resursi":
        return (
          <div>
            <div style={sectionTitle}>2. Resursi & SWOT analiza</div>
            <p style={sectionSub}>Opišite resurse kojima raspolažete i napravite SWOT analizu.</p>
            <Field lbl="Ključne kompetencije" tip="Resursi, znanja i vještine kojima raspolažete (tim, iskustvo, know-how).">
              <textarea style={textareaStyle} value={data.kompetencije} onChange={(e) => set("kompetencije", e.target.value)} placeholder="Npr. Iskusan tim u oblasti IT-a..." />
            </Field>
            <Field lbl="Ključna imovina" tip="Materijalni i nematerijalni resursi: oprema, prostor, softver, patenti, itd.">
              <textarea style={textareaStyle} value={data.imovina} onChange={(e) => set("imovina", e.target.value)} placeholder="Npr. Poslovni prostor, oprema..." />
            </Field>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.red, margin: "24px 0 16px" }}>SWOT Analiza</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                ["snage", "Snage (S)", "Interne prednosti vašeg poslovanja."],
                ["slabosti", "Slabosti (W)", "Interne slabosti koje treba poboljšati."],
                ["mogucnosti", "Mogućnosti (O)", "Vanjske prilike koje možete iskoristiti."],
                ["prijetnje", "Prijetnje (T)", "Vanjski faktori koji mogu ugroziti posao."],
              ].map(([key, lbl, tip]) => (
                <Field key={key} lbl={lbl} tip={tip}>
                  <textarea
                    style={{ ...textareaStyle, minHeight: 80 }}
                    value={data.swot[key]}
                    onChange={(e) => set(`swot.${key}`, e.target.value)}
                    placeholder={lbl + "..."}
                  />
                </Field>
              ))}
            </div>
          </div>
        );

      case "operacije":
        return (
          <div>
            <div style={sectionTitle}>3. Operacije</div>
            <p style={sectionSub}>Opišite proizvodne procese, kanale distribucije i ključne partnere.</p>
            <Field lbl="Proizvodnja / Usluge" tip="Opišite kako funkcioniše vaš proizvodni proces ili pružanje usluga.">
              <textarea style={textareaStyle} value={data.proizvodnja} onChange={(e) => set("proizvodnja", e.target.value)} placeholder="Kako proizvodi nastaju ili kako se usluge pružaju?" />
            </Field>
            <Field lbl="Promocija & Kanali distribucije" tip="Kako ćete promovirati i distribuirati svoj proizvod/uslugu? Online marketing, maloprodaja, veleprodaja, itd.">
              <textarea style={textareaStyle} value={data.promocija} onChange={(e) => set("promocija", e.target.value)} placeholder="Marketing strategija i kanali prodaje..." />
            </Field>
            <Field lbl="Ključni partneri" tip="Kupci, dobavljači, investitori i drugi važni partneri za vaše poslovanje.">
              <textarea style={textareaStyle} value={data.partneri} onChange={(e) => set("partneri", e.target.value)} placeholder="Navedite ključne partnere..." />
            </Field>
          </div>
        );

      case "investicije": {
        const tblHead = { background: C.red, color: C.white, padding: "10px 12px", textAlign: "left", fontWeight: 700, fontSize: 13 };
        const tblCell = { padding: "6px 12px", borderBottom: `1px solid ${C.border}`, fontSize: 13 };
        const tblSection = { padding: "10px 12px", borderBottom: `1px solid ${C.border}`, fontWeight: 700, fontSize: 13, background: C.redLight, color: C.redDark };
        const tblTotal = { padding: "10px 12px", fontWeight: 800, fontSize: 14, background: C.red, color: C.white };
        const invRows = [
          { section: true, label: "I STALNA SREDSTVA", value: totalStalna },
          { key: "zemljiste", label: "1. Zemljište", num: 1 },
          { key: "zgrade", label: "2. Zgrade", num: 2 },
          { key: "oprema", label: "3. Oprema", num: 3 },
          { key: "vozila", label: "4. Vozila", num: 4 },
          { key: "inventar", label: "5. Poslovni inventar i ostala sredstva", num: 5 },
          { key: "osnivacka", label: "6. Osnivačka ulaganja (d.o.o., d.d.)", num: 6 },
          { key: "nematerijalna", label: "7. Nematerijalna sredstva", num: 7 },
          { section: true, label: "II TEKUĆA SREDSTVA", value: totalTekuca },
          { key: "zalihe", label: "1. Zalihe", num: 8 },
          { key: "potrazivanja", label: "2. Potraživanja", num: 9 },
          { key: "gotovina", label: "3. Gotovina", num: 10 },
        ];
        const izvRows = [
          { section: true, label: "I VLASTITI IZVORI", value: totalVlastiti },
          { key: "novac", label: "1. Novac" },
          { section2: true, label: "2. Stvari i prava:" },
          { key: "zemljiste_v", label: "    - zemljište", indent: true },
          { key: "gradevine_v", label: "    - građevine (poslovni prostor)", indent: true },
          { key: "oprema_v", label: "    - oprema", indent: true },
          { key: "ostalo_v", label: "    - ostalo", indent: true },
          { section: true, label: "II KREDITI — TUĐI IZVORI", value: totalTudi },
          { key: "dugorocni", label: "1. Dugoročni krediti" },
          { key: "kratkorocni", label: "2. Kratkoročni krediti" },
          { key: "ostali_tudi", label: "3. Ostali tuđi izvori (pozajmice)" },
        ];
        return (
          <div>
            <div style={sectionTitle}>4a. Finansijski plan: Izvori i upotreba kapitala</div>
            <p style={sectionSub}>Unesite investicije u stalna i tekuća sredstva, izvore sredstava, te provjerite usklađenost.</p>

            {/* ── TABELA A: Investicije ── */}
            <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 28 }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.redDark }}>A) Investicije (ulaganja) u stalna i tekuća sredstva</div>
              </div>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ ...tblHead, width: "50%" }}>Sredstva</th>
                    <th style={{ ...tblHead, width: "25%" }}>Iznos u KM</th>
                    <th style={{ ...tblHead, width: "25%" }}>Napomena</th>
                  </tr>
                </thead>
                <tbody>
                  {invRows.map((r, i) => {
                    if (r.section) return (
                      <tr key={i}>
                        <td style={tblSection}>{r.label}</td>
                        <td style={tblSection}>{r.value.toLocaleString()} KM</td>
                        <td style={tblSection}></td>
                      </tr>
                    );
                    return (
                      <tr key={r.key}>
                        <td style={tblCell}>{r.label}</td>
                        <td style={tblCell}>
                          <TableInput value={data.inv[r.key]} onChange={(v) => set(`inv.${r.key}`, v)} width="100%" />
                        </td>
                        <td style={tblCell}>
                          <input style={{ ...inputStyle, padding: "7px 10px", fontSize: 13 }} value={data.inv[`nap_${r.key}`] || ""} onChange={(e) => set(`inv.nap_${r.key}`, e.target.value)} placeholder="—" />
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td style={tblTotal}>UKUPNO SREDSTVA (I + II)</td>
                    <td style={tblTotal}>{totalSredstva.toLocaleString()} KM</td>
                    <td style={tblTotal}></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ── TABELA B: Izvori sredstava ── */}
            <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 28 }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.redDark }}>B) Izvori sredstava</div>
              </div>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ ...tblHead, width: "60%" }}>Izvori</th>
                    <th style={{ ...tblHead, width: "40%" }}>Iznos u KM</th>
                  </tr>
                </thead>
                <tbody>
                  {izvRows.map((r, i) => {
                    if (r.section) return (
                      <tr key={i}>
                        <td style={tblSection}>{r.label}</td>
                        <td style={tblSection}>{r.value.toLocaleString()} KM</td>
                      </tr>
                    );
                    if (r.section2) return (
                      <tr key={i}><td colSpan={2} style={{ ...tblCell, fontWeight: 600 }}>{r.label}</td></tr>
                    );
                    return (
                      <tr key={r.key}>
                        <td style={{ ...tblCell, paddingLeft: r.indent ? 32 : 12 }}>{r.label}</td>
                        <td style={tblCell}>
                          <TableInput value={data.izv[r.key]} onChange={(v) => set(`izv.${r.key}`, v)} width="100%" />
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td style={tblTotal}>UKUPNO IZVORI SREDSTAVA (I + II)</td>
                    <td style={tblTotal}>{totalIzvori.toLocaleString()} KM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ── TABELA C: Usklađivanje ── */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.redDark }}>C) Usklađivanje ulaganja i izvora sredstava</div>
              </div>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ ...tblHead, width: "60%" }}>Elementi</th>
                    <th style={{ ...tblHead, width: "40%" }}>Iznos u KM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={2} style={tblSection}>I Ulaganja (sredstva)</td></tr>
                  <tr>
                    <td style={{ ...tblCell, paddingLeft: 24 }}>1. Stalna sredstva</td>
                    <td style={{ ...tblCell, fontWeight: 600 }}>{totalStalna.toLocaleString()} KM</td>
                  </tr>
                  <tr>
                    <td style={{ ...tblCell, paddingLeft: 24 }}>2. Tekuća sredstva</td>
                    <td style={{ ...tblCell, fontWeight: 600 }}>{totalTekuca.toLocaleString()} KM</td>
                  </tr>
                  <tr><td colSpan={2} style={tblSection}>II Izvori sredstava</td></tr>
                  <tr>
                    <td style={{ ...tblCell, paddingLeft: 24 }}>3. Vlastita sredstva</td>
                    <td style={{ ...tblCell, fontWeight: 600 }}>{totalVlastiti.toLocaleString()} KM</td>
                  </tr>
                  <tr>
                    <td style={{ ...tblCell, paddingLeft: 24 }}>4. Tuđa sredstva</td>
                    <td style={{ ...tblCell, fontWeight: 600 }}>{totalTudi.toLocaleString()} KM</td>
                  </tr>
                  <tr>
                    <td style={{ ...tblTotal, background: Math.abs(totalSredstva - totalIzvori) < 0.01 ? C.green : C.red }}>RAZLIKA (I − II)</td>
                    <td style={{ ...tblTotal, background: Math.abs(totalSredstva - totalIzvori) < 0.01 ? C.green : C.red }}>
                      {(totalSredstva - totalIzvori).toLocaleString()} KM
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ padding: "12px 20px", background: C.redLight, fontSize: 13, fontWeight: 600, color: C.redDark }}>
                * Sredstva moraju biti jednaka izvorima sredstava!
              </div>
            </div>

            {/* Balance check badge */}
            <div style={{ marginTop: 20 }}>
              <Badge
                ok={Math.abs(totalSredstva - totalIzvori) < 0.01 && totalSredstva > 0}
                text={
                  totalSredstva === 0
                    ? "Unesite sredstva i izvore"
                    : Math.abs(totalSredstva - totalIzvori) < 0.01
                    ? "Sredstva = Izvori ✓ Bilans je uravnotežen"
                    : `Razlika: ${(totalSredstva - totalIzvori).toLocaleString()} KM — sredstva moraju biti jednaka izvorima!`
                }
              />
            </div>
          </div>
        );
      }

      case "bilans_poc": {
        const bh = { background: C.red, color: C.white, padding: "10px 8px", textAlign: "left", fontWeight: 700, fontSize: 13 };
        const bc = { padding: "6px 8px", borderBottom: `1px solid ${C.border}`, fontSize: 13, verticalAlign: "middle" };
        const bs = { padding: "10px 8px", borderBottom: `1px solid ${C.border}`, fontWeight: 700, fontSize: 13, background: C.redLight, color: C.redDark };
        const bt = { padding: "10px 8px", fontWeight: 800, fontSize: 14, background: C.red, color: C.white };
        const divider = `3px solid ${C.red}`;
        const ba = data.bilansAktiva;
        const bp = data.bilansPasiva;
        const ukAktStalna = num(ba.nematerijalna) + num(ba.zemljiste) + num(ba.objekti) + num(ba.oprema) + num(ba.ostalaStalna);
        const ukAktTekuca = num(ba.zalihe) + num(ba.potrazivanja) + num(ba.gotovina) + num(ba.ostalaTekuca);
        const ukAktiva = ukAktStalna + ukAktTekuca;
        const ukKapital = num(bp.vlastitiKapital) + num(bp.ostaloKapital);
        const ukDugorocne = num(bp.dugorocniKredit) + num(bp.ostaleDugorocne);
        const ukKratkorocne = num(bp.dobavljaci) + num(bp.kratkorocniKrediti) + num(bp.ostaleKratkorocne);
        const ukPasiva = ukKapital + ukDugorocne + ukKratkorocne;

        // Build paired rows: [aktivaR/b, aktivaLabel, aktivaKey, pasivaR/b, pasivaLabel, pasivaKey, type]
        const rows = [
          // Section headers
          { type: "section", aLabel: "A. STALNA SREDSTVA (1-3)", aValue: ukAktStalna, pLabel: "A. KAPITAL (1-2)", pValue: ukKapital },
          { type: "row", aRb: "1.", aLabel: "Nematerijalna ulaganja", aKey: "nematerijalna", pRb: "1.", pLabel: "Vlastiti kapital", pKey: "vlastitiKapital" },
          { type: "row", aRb: "2.", aLabel: "Materijalna ulaganja:", aKey: null, pRb: "2.", pLabel: "Ostalo (grantovi, poticaji države)", pKey: "ostaloKapital" },
          { type: "sub", aLabel: "- Zemljište", aKey: "zemljiste", pRb: "", pLabel: "", pKey: null },
          { type: "sub", aLabel: "- Objekti", aKey: "objekti", pRb: "", pLabel: "", pKey: null },
          { type: "sub", aLabel: "- Oprema", aKey: "oprema", pRb: "", pLabel: "", pKey: null },
          { type: "row", aRb: "3.", aLabel: "Ostala stalna sredstva", aKey: "ostalaStalna", pRb: "", pLabel: "", pKey: null },
          // Section B
          { type: "section", aLabel: "B. TEKUĆA SREDSTVA (4-7)", aValue: ukAktTekuca, pLabel: "B. DUGOROČNE OBAVEZE (3-4)", pValue: ukDugorocne },
          { type: "row", aRb: "4.", aLabel: "Zalihe", aKey: "zalihe", pRb: "3.", pLabel: "Dugoročni kredit", pKey: "dugorocniKredit" },
          { type: "row", aRb: "5.", aLabel: "Potraživanja od kupaca", aKey: "potrazivanja", pRb: "4.", pLabel: "Ostale dugor. obaveze", pKey: "ostaleDugorocne" },
          // Section C on pasiva side
          { type: "row_psection", aRb: "6.", aLabel: "Gotovina", aKey: "gotovina", pLabel: "C. KRATKOROČNE OBAVEZE (5-7)", pValue: ukKratkorocne },
          { type: "row", aRb: "7.", aLabel: "Ostala tekuća sredstva", aKey: "ostalaTekuca", pRb: "5.", pLabel: "Dobavljači", pKey: "dobavljaci" },
          { type: "row", aRb: "", aLabel: "", aKey: null, pRb: "6.", pLabel: "Kratkoročni krediti", pKey: "kratkorocniKrediti" },
          { type: "row", aRb: "", aLabel: "", aKey: null, pRb: "7.", pLabel: "Ostale kratkor. obaveze", pKey: "ostaleKratkorocne" },
        ];

        return (
          <div>
            <div style={sectionTitle}>4b. Finansijski plan: Bilans stanja i uspjeha</div>

            {/* Date input */}
            <div style={{ ...card, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: 20 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.redDark }}>POČETNI BILANS STANJA na dan</span>
              <DateDMY value={data.bilansDatum} onChange={(v) => set("bilansDatum", v)} />
              <span style={{ fontSize: 14, color: C.textMuted }}>(na početku poslovanja)</span>
            </div>

            {/* Main bilans table */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th style={{ ...bh, width: "5%" }}>R/b</th>
                      <th style={{ ...bh, width: "28%" }}>Aktiva</th>
                      <th style={{ ...bh, width: "17%", borderRight: divider }}>Iznos u KM</th>
                      <th style={{ ...bh, width: "5%" }}>R/b</th>
                      <th style={{ ...bh, width: "28%" }}>Pasiva</th>
                      <th style={{ ...bh, width: "17%" }}>Iznos u KM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => {
                      if (r.type === "section") {
                        return (
                          <tr key={i}>
                            <td colSpan={2} style={bs}>{r.aLabel}</td>
                            <td style={{ ...bs, borderRight: divider }}>{r.aValue.toLocaleString()} KM</td>
                            <td colSpan={2} style={bs}>{r.pLabel}</td>
                            <td style={bs}>{r.pValue.toLocaleString()} KM</td>
                          </tr>
                        );
                      }
                      if (r.type === "row_psection") {
                        return (
                          <tr key={i}>
                            <td style={bc}>{r.aRb}</td>
                            <td style={bc}>{r.aLabel}</td>
                            <td style={{ ...bc, borderRight: divider }}>
                              {r.aKey && <TableInput value={ba[r.aKey]} onChange={(v) => set(`bilansAktiva.${r.aKey}`, v)} width="100%" />}
                            </td>
                            <td colSpan={2} style={bs}>{r.pLabel}</td>
                            <td style={bs}>{r.pValue.toLocaleString()} KM</td>
                          </tr>
                        );
                      }
                      if (r.type === "sub") {
                        return (
                          <tr key={i}>
                            <td style={bc}></td>
                            <td style={{ ...bc, paddingLeft: 24, color: C.textMuted }}>{r.aLabel}</td>
                            <td style={{ ...bc, borderRight: divider }}>
                              <TableInput value={ba[r.aKey]} onChange={(v) => set(`bilansAktiva.${r.aKey}`, v)} width="100%" />
                            </td>
                            <td style={bc}>{r.pRb}</td>
                            <td style={bc}>{r.pLabel}</td>
                            <td style={bc}>
                              {r.pKey && <TableInput value={bp[r.pKey]} onChange={(v) => set(`bilansPasiva.${r.pKey}`, v)} width="100%" />}
                            </td>
                          </tr>
                        );
                      }
                      // normal row
                      return (
                        <tr key={i}>
                          <td style={bc}>{r.aRb}</td>
                          <td style={bc}>{r.aLabel}</td>
                          <td style={{ ...bc, borderRight: divider }}>
                            {r.aKey && <TableInput value={ba[r.aKey]} onChange={(v) => set(`bilansAktiva.${r.aKey}`, v)} width="100%" />}
                          </td>
                          <td style={bc}>{r.pRb}</td>
                          <td style={bc}>{r.pLabel}</td>
                          <td style={bc}>
                            {r.pKey && <TableInput value={bp[r.pKey]} onChange={(v) => set(`bilansPasiva.${r.pKey}`, v)} width="100%" />}
                          </td>
                        </tr>
                      );
                    })}
                    {/* TOTALS */}
                    <tr>
                      <td colSpan={2} style={bt}>UKUPNO AKTIVA (A+B):</td>
                      <td style={{ ...bt, borderRight: divider }}>{ukAktiva.toLocaleString()} KM</td>
                      <td colSpan={2} style={bt}>UKUPNO PASIVA (A+B+C):</td>
                      <td style={bt}>{ukPasiva.toLocaleString()} KM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Balance check */}
            <div style={{ marginTop: 12 }}>
              <Badge
                ok={Math.abs(ukAktiva - ukPasiva) < 0.01 && ukAktiva > 0}
                text={
                  ukAktiva === 0 && ukPasiva === 0
                    ? "Unesite vrijednosti u bilans stanja"
                    : Math.abs(ukAktiva - ukPasiva) < 0.01
                    ? "Bilans je uravnotežen (Aktiva = Pasiva) ✓"
                    : `Bilans NIJE uravnotežen! Aktiva (${ukAktiva.toLocaleString()}) ≠ Pasiva (${ukPasiva.toLocaleString()}). Razlika: ${(ukAktiva - ukPasiva).toLocaleString()} KM`
                }
              />
            </div>
          </div>
        );
      }

      case "bilans_kraj": {
        const bh = { background: C.red, color: C.white, padding: "10px 8px", textAlign: "left", fontWeight: 700, fontSize: 13 };
        const bc = { padding: "6px 8px", borderBottom: `1px solid ${C.border}`, fontSize: 13, verticalAlign: "middle" };
        const bs = { padding: "10px 8px", borderBottom: `1px solid ${C.border}`, fontWeight: 700, fontSize: 13, background: C.redLight, color: C.redDark };
        const bt = { padding: "10px 8px", fontWeight: 800, fontSize: 14, background: C.red, color: C.white };
        const divider = `3px solid ${C.red}`;
        const ba = data.bilansKrajAktiva;
        const bp = data.bilansKrajPasiva;
        const ukAktStalna = num(ba.nematerijalna) + num(ba.zemljiste) + num(ba.objekti) + num(ba.oprema) + num(ba.ostalaStalna);
        const ukAktTekuca = num(ba.zalihe) + num(ba.potrazivanja) + num(ba.novac) + num(ba.ostalaTekuca);
        const ukAktiva = ukAktStalna + ukAktTekuca;
        const ukKapital = num(bp.vlastitiKapital) + num(bp.akumuliranaDobit);
        const ukDugorocne = num(bp.dugorocniKredit) + num(bp.ostaleDugorocne);
        const ukKratkorocne = num(bp.dobavljaci) + num(bp.kratkorocniKrediti) + num(bp.ostaleKratkorocne);
        const ukPasiva = ukKapital + ukDugorocne + ukKratkorocne;

        const rows = [
          { type: "section", aLabel: "A. STALNA SREDSTVA (1-3)", aValue: ukAktStalna, pLabel: "A. KAPITAL (1-2)", pValue: ukKapital },
          { type: "row", aRb: "1.", aLabel: "Nematerijalna sredstva", aKey: "nematerijalna", pRb: "1.", pLabel: "Vlastiti kapital", pKey: "vlastitiKapital" },
          { type: "row", aRb: "2.", aLabel: "Materijalna sredstva:", aKey: null, pRb: "2.", pLabel: "Akumulirana dobit", pKey: "akumuliranaDobit" },
          { type: "sub", aLabel: "- Zemljište", aKey: "zemljiste", pRb: "", pLabel: "", pKey: null },
          { type: "sub", aLabel: "- Objekti", aKey: "objekti", pRb: "", pLabel: "", pKey: null },
          { type: "sub", aLabel: "- Oprema", aKey: "oprema", pRb: "", pLabel: "", pKey: null },
          { type: "row", aRb: "3.", aLabel: "Ostala stalna sredstva", aKey: "ostalaStalna", pRb: "", pLabel: "", pKey: null },
          { type: "section", aLabel: "B. TEKUĆA SREDSTVA (4-7)", aValue: ukAktTekuca, pLabel: "B. DUGOROČNE OBAVEZE (3-4)", pValue: ukDugorocne },
          { type: "row", aRb: "4.", aLabel: "Zalihe", aKey: "zalihe", pRb: "3.", pLabel: "Dugoročni kredit", pKey: "dugorocniKredit" },
          { type: "row", aRb: "5.", aLabel: "Potraživanja od kupaca", aKey: "potrazivanja", pRb: "4.", pLabel: "Ostale dugor. obaveze", pKey: "ostaleDugorocne" },
          { type: "row_psection", aRb: "6.", aLabel: "Novac", aKey: "novac", pLabel: "C. KRATKOROČNE OBAVEZE (5-7)", pValue: ukKratkorocne },
          { type: "row", aRb: "7.", aLabel: "Ostala tekuća sredstva", aKey: "ostalaTekuca", pRb: "5.", pLabel: "Dobavljači", pKey: "dobavljaci" },
          { type: "row", aRb: "", aLabel: "", aKey: null, pRb: "6.", pLabel: "Kratkoročni krediti", pKey: "kratkorocniKrediti" },
          { type: "row", aRb: "", aLabel: "", aKey: null, pRb: "7.", pLabel: "Ostale kratkor. obaveze", pKey: "ostaleKratkorocne" },
        ];

        return (
          <div>
            <div style={sectionTitle}>4i. Bilans stanja (na kraju poslovne godine)</div>

            {/* Date input */}
            <div style={{ ...card, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: 20 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.redDark }}>BILANS STANJA na dan</span>
              <DateDMY value={data.bilansKrajDatum} onChange={(v) => set("bilansKrajDatum", v)} />
              <span style={{ fontSize: 14, color: C.textMuted }}>(na kraju poslovne godine)</span>
            </div>

            {/* Main bilans table */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th style={{ ...bh, width: "5%" }}>R/b</th>
                      <th style={{ ...bh, width: "28%" }}>Aktiva</th>
                      <th style={{ ...bh, width: "17%", borderRight: divider }}>Iznos u KM</th>
                      <th style={{ ...bh, width: "5%" }}>R/b</th>
                      <th style={{ ...bh, width: "28%" }}>Pasiva</th>
                      <th style={{ ...bh, width: "17%" }}>Iznos u KM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => {
                      if (r.type === "section") {
                        return (
                          <tr key={i}>
                            <td colSpan={2} style={bs}>{r.aLabel}</td>
                            <td style={{ ...bs, borderRight: divider }}>{r.aValue.toLocaleString()} KM</td>
                            <td colSpan={2} style={bs}>{r.pLabel}</td>
                            <td style={bs}>{r.pValue.toLocaleString()} KM</td>
                          </tr>
                        );
                      }
                      if (r.type === "row_psection") {
                        return (
                          <tr key={i}>
                            <td style={bc}>{r.aRb}</td>
                            <td style={bc}>{r.aLabel}</td>
                            <td style={{ ...bc, borderRight: divider }}>
                              {r.aKey && <TableInput value={ba[r.aKey]} onChange={(v) => set(`bilansKrajAktiva.${r.aKey}`, v)} width="100%" />}
                            </td>
                            <td colSpan={2} style={bs}>{r.pLabel}</td>
                            <td style={bs}>{r.pValue.toLocaleString()} KM</td>
                          </tr>
                        );
                      }
                      if (r.type === "sub") {
                        return (
                          <tr key={i}>
                            <td style={bc}></td>
                            <td style={{ ...bc, paddingLeft: 24, color: C.textMuted }}>{r.aLabel}</td>
                            <td style={{ ...bc, borderRight: divider }}>
                              <TableInput value={ba[r.aKey]} onChange={(v) => set(`bilansKrajAktiva.${r.aKey}`, v)} width="100%" />
                            </td>
                            <td style={bc}>{r.pRb}</td>
                            <td style={bc}>{r.pLabel}</td>
                            <td style={bc}>
                              {r.pKey && <TableInput value={bp[r.pKey]} onChange={(v) => set(`bilansKrajPasiva.${r.pKey}`, v)} width="100%" />}
                            </td>
                          </tr>
                        );
                      }
                      // normal row
                      return (
                        <tr key={i}>
                          <td style={bc}>{r.aRb}</td>
                          <td style={bc}>{r.aLabel}</td>
                          <td style={{ ...bc, borderRight: divider }}>
                            {r.aKey && <TableInput value={ba[r.aKey]} onChange={(v) => set(`bilansKrajAktiva.${r.aKey}`, v)} width="100%" />}
                          </td>
                          <td style={bc}>{r.pRb}</td>
                          <td style={bc}>{r.pLabel}</td>
                          <td style={bc}>
                            {r.pKey && <TableInput value={bp[r.pKey]} onChange={(v) => set(`bilansKrajPasiva.${r.pKey}`, v)} width="100%" />}
                          </td>
                        </tr>
                      );
                    })}
                    {/* TOTALS */}
                    <tr>
                      <td colSpan={2} style={bt}>UKUPNO AKTIVA (A+B):</td>
                      <td style={{ ...bt, borderRight: divider }}>{ukAktiva.toLocaleString()} KM</td>
                      <td colSpan={2} style={bt}>UKUPNO PASIVA (A+B+C):</td>
                      <td style={bt}>{ukPasiva.toLocaleString()} KM</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Balance check */}
            <div style={{ marginTop: 12 }}>
              <Badge
                ok={Math.abs(ukAktiva - ukPasiva) < 0.01 && ukAktiva > 0}
                text={
                  ukAktiva === 0 && ukPasiva === 0
                    ? "Unesite vrijednosti u bilans stanja"
                    : Math.abs(ukAktiva - ukPasiva) < 0.01
                    ? "Bilans je uravnotežen (Aktiva = Pasiva) ✓"
                    : `Bilans NIJE uravnotežen! Aktiva (${ukAktiva.toLocaleString()}) ≠ Pasiva (${ukPasiva.toLocaleString()}). Razlika: ${(ukAktiva - ukPasiva).toLocaleString()} KM`
                }
              />
            </div>
          </div>
        );
      }

      case "plan_prodaje":
        return (
          <div>
            <div style={sectionTitle}>4c. Finansijski plan: Plan prodaje (2026–2030)</div>
            <p style={sectionSub}>Unesite planirane prihode po proizvodima/uslugama. Mjesečni plan × 12 bi trebao biti ≈ godišnji plan za 2026.</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: C.red, color: C.white }}>
                    {["#", "Proizvod/Usluga", "Cijena po proizvodu (KM)", "Mjesečni plan 2026", "Godišnji plan 2026", "Godišnji plan 2027", "Godišnji plan 2028", "Godišnji plan 2029", "Godišnji plan 2030", ""].map((h) => (
                      <th key={h} style={{ padding: "10px 8px", textAlign: "left", fontWeight: 700, fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.prodaja.map((p, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: 8, fontWeight: 600 }}>{i + 1}.</td>
                      <td style={{ padding: 4 }}>
                        <input style={{ ...inputStyle, width: 140 }} value={p.naziv} onChange={(e) => set(`prodaja.${i}.naziv`, e.target.value)} placeholder="Naziv" />
                      </td>
                      {["cijena", "mj2026", "god2026", "god2027", "god2028", "god2029", "god2030"].map((k) => (
                        <td key={k} style={{ padding: 4 }}>
                          <TableInput value={p[k]} onChange={(v) => set(`prodaja.${i}.${k}`, v)} width={90} />
                        </td>
                      ))}
                      <td style={{ padding: 4 }}>
                        {data.prodaja.length > 1 && (
                          <button
                            onClick={() => {
                              setData((prev) => ({
                                ...prev,
                                prodaja: prev.prodaja.filter((_, idx) => idx !== i),
                              }));
                            }}
                            style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 18, fontWeight: 700, padding: "4px 8px", borderRadius: 6 }}
                            title="Obriši red"
                          >
                            ×
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: C.redLight, fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: 10 }}>UKUPNO</td>
                    <td style={{ padding: 10 }}>
                      {data.prodaja.reduce((sum, p) => sum + num(p.mj2026), 0).toLocaleString()} KM
                    </td>
                    {prihodi.map((p, i) => (
                      <td key={i} style={{ padding: 10 }}>{p.toLocaleString()} KM</td>
                    ))}
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Add row button */}
            <button
              onClick={() => {
                setData((prev) => ({
                  ...prev,
                  prodaja: [...prev.prodaja, { naziv: "", cijena: 0, mj2026: 0, god2026: 0, god2027: 0, god2028: 0, god2029: 0, god2030: 0 }],
                }));
              }}
              style={{ ...btnPrimary, marginTop: 16, background: C.white, color: C.red, border: `2px solid ${C.red}`, display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>+</span> Dodaj novi red
            </button>
            {/* Auto checker: mj × 12 vs god */}
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.prodaja.filter((p) => p.naziv && num(p.mj2026) > 0).map((p, i) => {
                const expected = num(p.mj2026) * 12;
                const actual = num(p.god2026);
                const ok = actual > 0 && Math.abs(expected - actual) <= expected * 0.2;
                return <Badge key={i} ok={ok} text={`${p.naziv}: Mj×12=${expected.toLocaleString()}, God=${actual.toLocaleString()}`} />;
              })}
            </div>
          </div>
        );

      case "plan_troskova":
        return (
          <div>
            <div style={sectionTitle}>4d. Finansijski plan: Plan troškova (2026–2030)</div>
            <p style={sectionSub}>Unesite planirane troškove po kategorijama. Mjesečni × 12 treba odgovarati godišnjem nivou.</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: C.red, color: C.white }}>
                    <th style={{ padding: "10px 8px", textAlign: "left", fontWeight: 700, minWidth: 260 }}>Struktura troškova</th>
                    {costsLabels.map((h) => (
                      <th key={h} style={{ padding: "10px 8px", textAlign: "right", fontWeight: 700, fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {costCategories.map((cat, idx) => {
                    // Section header with auto-calculated subtotals
                    if (cat.type === "section") {
                      return (
                        <tr key={`section-${idx}`} style={{ background: C.redLight }}>
                          <td style={{ padding: "10px 8px", fontWeight: 700, fontSize: 13, color: C.redDark }}>{cat.label}</td>
                          {costsLabels.map((_, ci) => {
                            let sub = 0;
                            cat.keys.forEach((k) => { sub += num(data.troskovi[k][ci]); });
                            return (
                              <td key={ci} style={{ padding: "10px 8px", textAlign: "left", fontWeight: 700, fontSize: 13, color: C.redDark }}>
                                {sub > 0 ? sub.toLocaleString() + " KM" : ""}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    }
                    // Normal input row
                    return (
                      <tr key={cat.key} style={{ borderBottom: `1px solid ${C.border}`, background: cat.sub ? "transparent" : C.redLight }}>
                        <td style={{ padding: cat.sub ? "8px 8px 8px 24px" : "10px 8px", fontSize: 13, fontWeight: cat.sub ? 400 : 700, color: cat.sub ? C.text : C.redDark }}>{cat.label}</td>
                        {data.troskovi[cat.key].map((v, ci) => (
                          <td key={ci} style={{ padding: 4 }}>
                            <TableInput value={v} onChange={(val) => {
                              const arr = [...data.troskovi[cat.key]];
                              arr[ci] = val;
                              set(`troskovi.${cat.key}`, arr);
                            }} width={90} />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr style={{ background: C.red }}>
                    <td style={{ padding: 10, fontWeight: 800, color: C.white, fontSize: 14 }}>UKUPNO TROŠKOVI (1-5)</td>
                    {costsLabels.map((_, ci) => {
                      let total = 0;
                      Object.values(data.troskovi).forEach((arr) => { total += num(arr[ci]); });
                      return <td key={ci} style={{ padding: 10, textAlign: "right", fontWeight: 800, color: C.white, fontSize: 14 }}>{total.toLocaleString()} KM</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Auto checker: mj × 12 vs god */}
            <div style={{ marginTop: 16 }}>
              {(() => {
                let mjTotal = 0, godTotal = 0;
                Object.values(data.troskovi).forEach((arr) => { mjTotal += num(arr[0]); godTotal += num(arr[1]); });
                if (mjTotal > 0 && godTotal > 0) {
                  const expected = mjTotal * 12;
                  const ok = Math.abs(expected - godTotal) <= expected * 0.2;
                  return <Badge ok={ok} text={`Mj. ukupno ×12 = ${expected.toLocaleString()} KM, God. ukupno = ${godTotal.toLocaleString()} KM`} />;
                }
                return null;
              })()}
            </div>
          </div>
        );

      case "amortizacija":
        return (
          <div>
            <div style={sectionTitle}>4e. Finansijski plan: Obračun Amortizacije</div>
            <p style={sectionSub}>Unesite stalna sredstva, nabavnu vrijednost i stopu amortizacije. Amortizacija se računa automatski (linearna metoda).</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: C.red, color: C.white }}>
                    {["Opis sredstva", "Nabavna vrij. (KM)", "Stopa (%)", "2026", "2027", "2028", "2029", "2030", "UKUPNO", ""].map((h) => (
                      <th key={h} style={{ padding: "10px 8px", textAlign: "left", fontWeight: 700 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.amort.map((a, i) => {
                    const am = num(a.nabavna) * (num(a.stopa) / 100);
                    const total = am * 5;
                    return (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                        <td style={{ padding: 4 }}>
                          <input style={{ ...inputStyle, width: 160 }} value={a.opis} onChange={(e) => set(`amort.${i}.opis`, e.target.value)} placeholder="npr. Računar" />
                        </td>
                        <td style={{ padding: 4 }}><TableInput value={a.nabavna} onChange={(v) => set(`amort.${i}.nabavna`, v)} /></td>
                        <td style={{ padding: 4 }}><TableInput value={a.stopa} onChange={(v) => set(`amort.${i}.stopa`, v)} width={70} /></td>
                        {[0, 1, 2, 3, 4].map((y) => (
                          <td key={y} style={{ padding: 8, textAlign: "right", color: C.textMuted }}>{am.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                        ))}
                        <td style={{ padding: 8, textAlign: "right", fontWeight: 700 }}>{total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                        <td style={{ padding: 4 }}>
                          {data.amort.length > 1 && (
                            <button
                              onClick={() => setData((prev) => ({ ...prev, amort: prev.amort.filter((_, idx) => idx !== i) }))}
                              style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 18, fontWeight: 700, padding: "4px 8px" }}
                              title="Obriši red"
                            >×</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{ background: C.redLight, fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: 10 }}>UKUPNO</td>
                    {amortGodisnje.map((v, i) => (
                      <td key={i} style={{ padding: 10, textAlign: "right" }}>{v.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    ))}
                    <td style={{ padding: 10, textAlign: "right" }}>{(amortGodisnje.reduce((a, b) => a + b, 0)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Add row button */}
            <button
              onClick={() => setData((prev) => ({ ...prev, amort: [...prev.amort, { opis: "", nabavna: 0, stopa: 0 }] }))}
              style={{ ...btnPrimary, marginTop: 16, background: C.white, color: C.red, border: `2px solid ${C.red}`, display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>+</span> Dodaj novi red
            </button>
            <div style={{ ...card, marginTop: 16, background: C.redLight, borderColor: C.redMid, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.redDark }}>
                ℹ️ Stopa amortizacije se unosi kao procenat (npr. 20 za 20%). Pogledajte Zakon o porezu na dobit za propisane stope.
              </div>
            </div>

            {/* Legal reference: Zakon o porezu na dobit, Član 19 */}
            <div style={{ ...card, marginTop: 16, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, background: C.redLight }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.redDark }}>Zakonom propisane stope amortizacije — Član 19.</div>
              </div>
              <div style={{ padding: 20 }}>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 14 }}>
                  (1) Kod utvrđivanja porezne osnovice priznaje se obračunata amortizacija primjenom proporcionalne metode amortizacije na dugotrajnu imovinu na način propisan ovim člankom.
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>
                  (2) Porezno priznate stope amortizacije dugotrajne imovine iznose:
                </p>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13, marginBottom: 16 }}>
                  <tbody>
                    {[
                      ["a)", "Građevinski objekti", "5%"],
                      ["b)", "Ceste, komunalni objekti, željeznica", "10%"],
                      ["c)", "Oprema, vozila, postrojenja", "15%"],
                      ["d)", "Oprema za vodoprivredne, vodovodne i kanalizacijske sustave", "15%"],
                      ["e)", "Hardver i softver i oprema za zaštitu okoliša", "33,3%"],
                      ["f)", "Višegodišnji zasadi", "15%"],
                      ["g)", "Osnovna stada", "40%"],
                      ["h)", "Nematerijalna imovina", "20%"],
                    ].map(([slovo, opis, stopa], i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                        <td style={{ padding: "8px 6px", fontWeight: 700, color: C.red, width: 28 }}>{slovo}</td>
                        <td style={{ padding: "8px 6px", color: C.text }}>{opis}</td>
                        <td style={{ padding: "8px 6px", fontWeight: 700, color: C.redDark, textAlign: "right", width: 70 }}>{stopa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 10 }}>
                  (4) Ukoliko je nabavna cijena imovine manja od 1.000,00 KM, njezina nabavna vrijednost može se u cijelosti otpisati u godini u kojoj je ta imovina nabavljena.
                </p>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>
                  (5) Dugotrajna imovina koja je u cijelosti otpisana, ali se i dalje vodi u evidencijama do momenta otuđenja ili uništavanja, ne može se ponovno procjenjivati i na nju obračunavati amortizacija i priznati u porezne svrhe.
                </p>
              </div>
            </div>
          </div>
        );

      case "kredit": {
        const kh = { background: C.red, color: C.white, padding: "10px 8px", textAlign: "right", fontWeight: 700, fontSize: 12 };
        const kc = { padding: "6px 8px", borderBottom: `1px solid ${C.border}`, fontSize: 13, textAlign: "right" };
        const fmt = (v) => num(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return (
          <div>
            <div style={sectionTitle}>4f. Finansijski plan: Otplatni plan kredita</div>

            {/* Inicijalni podaci */}
            <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 24 }}>
              <div style={{ padding: "14px 20px", background: C.redLight, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.redDark }}>Inicijalni podaci o pozajmici</div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <Field lbl="Iznos kredita (KM)" tip="Ukupan iznos pozajmice.">
                      <TableInput value={data.kredit.iznos} onChange={(v) => set("kredit.iznos", v)} width="100%" />
                    </Field>
                    <Field lbl="Kamata (% godišnje)" tip="Godišnja kamatna stopa, npr. 3.49%.">
                      <TableInput value={data.kredit.kamata} onChange={(v) => set("kredit.kamata", v)} width="100%" />
                    </Field>
                    <Field lbl="Rok otplate (mjeseci)" tip="Ukupan rok trajanja kredita u mjesecima, uključujući grace period (npr. 60 mjeseci ukupno, od čega 12 mjeseci grace).">
                      <TableInput value={data.kredit.rok} onChange={(v) => set("kredit.rok", v)} width="100%" />
                    </Field>
                  </div>
                  <div>
                    <Field lbl="Učešće (KM)" tip="Iznos vlastitog učešća (umanjuje osnovicu kredita).">
                      <TableInput value={data.kredit.ucesce} onChange={(v) => set("kredit.ucesce", v)} width="100%" />
                    </Field>
                    <Field lbl="Grace period (mjeseci)" tip="Period u kojem se plaća samo kamata, bez glavnice.">
                      <TableInput value={data.kredit.grace} onChange={(v) => set("kredit.grace", v)} width="100%" />
                    </Field>
                    <Field lbl="Datum prve rate" tip="Datum kada počinje otplata (nakon grace perioda).">
                      <input type="date" value={data.kredit.datumPrveRate} onChange={(e) => set("kredit.datumPrveRate", e.target.value)} style={{ ...inputStyle, fontWeight: 600 }} />
                    </Field>
                  </div>
                </div>
              </div>
            </div>

            {kreditInfo && (
              <>
                {/* Preračuni */}
                <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 24 }}>
                  <div style={{ padding: "14px 20px", background: C.redLight, borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.redDark }}>Preračuni</div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 14 }}>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}><strong>Osnovica za kredit:</strong></div>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textAlign: "right" }}>{fmt(kreditInfo.osnovica)} KM</div>

                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}><strong>Kamata grace perioda:</strong></div>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textAlign: "right" }}>{fmt(kreditInfo.graceKamata)} KM</div>

                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}><strong>Kamata u otplati:</strong></div>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textAlign: "right" }}>{fmt(kreditInfo.kamatuUOtplati)} KM</div>

                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}><strong>Ukupna kamata:</strong></div>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textAlign: "right" }}>{fmt(kreditInfo.ukupnaKamata)} KM</div>

                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}><strong>Ukupno zaduženje:</strong></div>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textAlign: "right" }}>{fmt(kreditInfo.ukupnoZaduzenje)} KM</div>
                    </div>
                  </div>
                </div>

                {/* Iznos rate */}
                <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 24 }}>
                  <div style={{ padding: "14px 20px", background: C.redLight, borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.redDark }}>Iznos rate</div>
                  </div>
                  <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 14 }}>
                    <div style={{ padding: 16, background: C.bg, borderRadius: 10, textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>Rata u grace periodu</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: C.red }}>{fmt(kreditInfo.graceRata)} KM</div>
                    </div>
                    <div style={{ padding: 16, background: C.bg, borderRadius: 10, textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>Izračunata rata</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: C.red }}>{fmt(kreditInfo.rata)} KM</div>
                    </div>
                  </div>
                </div>

                {/* Otplatni plan tabela */}
                <div style={{ ...card, padding: 0, overflow: "hidden" }}>
                  <div style={{ padding: "14px 20px", background: C.redLight, borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.redDark }}>OTPLATNI PLAN</div>
                  </div>
                  <div style={{ overflowX: "auto", maxHeight: 500, overflowY: "auto" }}>
                    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                      <thead style={{ position: "sticky", top: 0 }}>
                        <tr>
                          <th style={{ ...kh, textAlign: "center" }}>BR.</th>
                          <th style={kh}>Datum rate</th>
                          <th style={kh}>Početno zaduženje</th>
                          <th style={kh}>Platiti kamatu</th>
                          <th style={kh}>Platiti glavnicu</th>
                          <th style={kh}>Ostatak zaduženja</th>
                          <th style={kh}>Kumulativna kamata</th>
                        </tr>
                      </thead>
                      <tbody>
                        {kreditInfo.rows.map((r) => (
                          <tr key={r.br} style={{ background: r.glavnica === 0 ? C.redLight + "66" : "transparent" }}>
                            <td style={{ ...kc, textAlign: "center", fontWeight: 600 }}>{r.br}.</td>
                            <td style={kc}>{r.datum || "—"}</td>
                            <td style={kc}>{fmt(r.zaduzenje)}</td>
                            <td style={kc}>{fmt(r.kamata)}</td>
                            <td style={kc}>{r.glavnica === 0 ? "—" : fmt(r.glavnica)}</td>
                            <td style={kc}>{fmt(r.ostatak)}</td>
                            <td style={kc}>{fmt(r.kumKamata)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      }

      case "normativi": {
        const nh = { background: C.red, color: C.white, padding: "8px 8px", textAlign: "center", fontWeight: 700, fontSize: 12 };
        const proizvodi = data.normativiProizvodi;

        const addProduct = () => {
          setData((prev) => ({
            ...prev,
            normativiProizvodi: [...prev.normativiProizvodi, ""],
            normativi: prev.normativi.map((r) => ({ ...r, kolicine: [...r.kolicine, 0] })),
          }));
        };
        const removeProduct = (pi) => {
          setData((prev) => ({
            ...prev,
            normativiProizvodi: prev.normativiProizvodi.filter((_, idx) => idx !== pi),
            normativi: prev.normativi.map((r) => ({ ...r, kolicine: r.kolicine.filter((_, idx) => idx !== pi) })),
          }));
        };

        return (
          <div>
            <div style={sectionTitle}>4g. Finansijski plan: Normativi i cijene sirovina i materijala (za proizvodnu djelatnost)</div>
            <p style={sectionSub}>
              Unesite direktne sirovine i materijal potrebne za proizvodnju, jedinicu mjere, cijenu koštanja po jedinici mjere,
              nazive proizvoda, te potrebnu količinu (normativ) za svaki proizvod.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{ ...nh, textAlign: "left", minWidth: 200 }} rowSpan={2}>Direktne sirovine i materijal</th>
                    <th style={{ ...nh, minWidth: 90 }} rowSpan={2}>Jed. mjere</th>
                    <th style={{ ...nh, minWidth: 110 }} rowSpan={2}>Cijena koštanja po jedinici mjere (KM)</th>
                    {proizvodi.map((_, pi) => (
                      <th key={pi} style={{ ...nh, minWidth: 130 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                          <span>Proizvod Br.{pi + 1}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <input
                              value={proizvodi[pi]}
                              onChange={(e) => set(`normativiProizvodi.${pi}`, e.target.value)}
                              placeholder="Naziv proizvoda"
                              style={{ width: "100%", padding: "5px 8px", borderRadius: 6, border: "none", fontSize: 12, textAlign: "center", color: C.text }}
                            />
                            {proizvodi.length > 1 && (
                              <button
                                onClick={() => removeProduct(pi)}
                                title="Obriši proizvod"
                                style={{ background: "rgba(255,255,255,.25)", border: "none", color: C.white, cursor: "pointer", fontSize: 14, fontWeight: 700, borderRadius: 4, width: 20, height: 20, lineHeight: 1, flexShrink: 0 }}
                              >×</button>
                            )}
                          </div>
                        </div>
                      </th>
                    ))}
                    <th style={nh} rowSpan={2}>
                      <button
                        onClick={addProduct}
                        title="Dodaj proizvod"
                        style={{ background: C.white, border: "none", color: C.red, cursor: "pointer", fontSize: 16, fontWeight: 800, borderRadius: 6, width: 28, height: 28, lineHeight: 1 }}
                      >+</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.normativi.map((n, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: 6, fontWeight: 600, verticalAlign: "middle" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span>{i + 1}.</span>
                          <input
                            style={{ ...inputStyle, minWidth: 150 }}
                            value={n.naziv}
                            onChange={(e) => set(`normativi.${i}.naziv`, e.target.value)}
                            placeholder="npr. Brašno"
                          />
                        </div>
                      </td>
                      <td style={{ padding: 4 }}>
                        <input
                          style={{ ...inputStyle, width: 80, textAlign: "center" }}
                          value={n.jedMjere}
                          onChange={(e) => set(`normativi.${i}.jedMjere`, e.target.value)}
                          placeholder="kg/l/kom"
                        />
                      </td>
                      <td style={{ padding: 4 }}>
                        <TableInput value={n.cijena} onChange={(v) => set(`normativi.${i}.cijena`, v)} width="100%" />
                      </td>
                      {proizvodi.map((_, pi) => (
                        <td key={pi} style={{ padding: 4 }}>
                          <TableInput value={n.kolicine[pi]} onChange={(v) => {
                            const arr = [...data.normativi[i].kolicine];
                            arr[pi] = v;
                            set(`normativi.${i}.kolicine`, arr);
                          }} width="100%" />
                        </td>
                      ))}
                      <td style={{ padding: 4, textAlign: "center" }}>
                        {data.normativi.length > 1 && (
                          <button
                            onClick={() => setData((prev) => ({ ...prev, normativi: prev.normativi.filter((_, idx) => idx !== i) }))}
                            style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 18, fontWeight: 700, padding: "4px 8px" }}
                            title="Obriši red"
                          >×</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Cijena koštanja po proizvodu — zbir (normativ × cijena) za svaki proizvod */}
                  <tr style={{ background: C.redLight, fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: 10 }}>UKUPNA CIJENA KOŠTANJA MATERIJALA PO PROIZVODU</td>
                    {proizvodi.map((_, pi) => {
                      const total = data.normativi.reduce((sum, n) => sum + num(n.cijena) * num(n.kolicine[pi]), 0);
                      return <td key={pi} style={{ padding: 10, textAlign: "center" }}>{total.toLocaleString(undefined, { maximumFractionDigits: 2 })} KM</td>;
                    })}
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Add row button */}
            <button
              onClick={() => setData((prev) => ({
                ...prev,
                normativi: [...prev.normativi, { naziv: "", jedMjere: "", cijena: 0, kolicine: prev.normativiProizvodi.map(() => 0) }],
              }))}
              style={{ ...btnPrimary, marginTop: 16, background: C.white, color: C.red, border: `2px solid ${C.red}`, display: "flex", alignItems: "center", gap: 8 }}
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>+</span> Dodaj novi red
            </button>
            <div style={{ ...card, marginTop: 16, background: C.redLight, borderColor: C.redMid, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.redDark }}>
                ℹ️ Unesite naziv svakog proizvoda u zaglavlju tabele. Vrijednosti u kolonama predstavljaju normativ — potrebnu
                količinu date sirovine/materijala (u jedinici mjere) za proizvodnju jedne jedinice tog proizvoda. Ukupna cijena
                koštanja materijala po proizvodu se automatski izračunava kao zbir (cijena po jedinici × normativ) za sve sirovine.
                Dugme "+" u zaglavlju dodaje novi proizvod, a "×" ga uklanja.
              </div>
            </div>
          </div>
        );
      }

      case "bilans_uspjeha":
        return (
          <div>
            <div style={sectionTitle}>4h. Finansijski plan: Bilans uspjeha (2026–2030)</div>
            <p style={sectionSub}>Automatski generisan na osnovu plana prodaje i plana troškova. Unesite eventualne ostale prihode.</p>
            <Field lbl="Ostali prihodi po godinama (2026–2030)">
              <div style={{ display: "flex", gap: 8 }}>
                {data.ostaliPrihodi.map((v, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>{2026 + i}</div>
                    <TableInput value={v} onChange={(val) => {
                      const arr = [...data.ostaliPrihodi];
                      arr[i] = val;
                      set("ostaliPrihodi", arr);
                    }} width={90} />
                  </div>
                ))}
              </div>
            </Field>
            <div style={{ overflowX: "auto", marginTop: 20 }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: C.red, color: C.white }}>
                    <th style={{ padding: 10, textAlign: "left" }}>ELEMENTI</th>
                    {[2026, 2027, 2028, 2029, 2030].map((y) => (
                      <th key={y} style={{ padding: 10, textAlign: "right" }}>{y}.</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const rows = [];
                    const ukPrihodi = prihodi.map((p, i) => p + num(data.ostaliPrihodi[i]));
                    const brutoDobit = ukPrihodi.map((p, i) => p - ukupniTroskovi[i]);
                    const porez = brutoDobit.map((d) => (d > 0 ? d * 0.1 : 0));
                    const netoDobit = brutoDobit.map((d, i) => d - porez[i]);

                    const addRow = (label, values, bold, bg) => {
                      rows.push(
                        <tr key={label} style={{ borderBottom: `1px solid ${C.border}`, background: bg || "transparent" }}>
                          <td style={{ padding: 10, fontWeight: bold ? 700 : 400 }}>{label}</td>
                          {values.map((v, i) => (
                            <td key={i} style={{ padding: 10, textAlign: "right", fontWeight: bold ? 700 : 400, color: v < 0 ? C.red : "inherit" }}>
                              {v.toLocaleString(undefined, { maximumFractionDigits: 0 })} KM
                            </td>
                          ))}
                        </tr>
                      );
                    };

                    addRow("I. UKUPNI PRIHODI", ukPrihodi, true, C.redLight);
                    addRow("  1. Prihodi od prodaje", prihodi, false);
                    addRow("  2. Ostali prihodi", data.ostaliPrihodi.map(num), false);
                    addRow("II. UKUPNI RASHODI", ukupniTroskovi, true, C.redLight);
                    addRow("III. BRUTO DOBIT (I−II)", brutoDobit, true);
                    addRow("  Porez na dobit (10%)", porez, false);
                    addRow("IV. NETO DOBIT", netoDobit, true, C.greenBg);
                    return rows;
                  })()}
                </tbody>
              </table>
            </div>
            {/* Profitability checker */}
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {prihodi.map((p, i) => {
                if (p <= 0 && ukupniTroskovi[i] <= 0) return null;
                const profit = p + num(data.ostaliPrihodi[i]) - ukupniTroskovi[i];
                return (
                  <Badge
                    key={i}
                    ok={profit >= 0}
                    text={`${2026 + i}: ${profit >= 0 ? "Profitabilno" : "Gubitak"} (${profit.toLocaleString()} KM)`}
                  />
                );
              })}
            </div>
          </div>
        );

      case "sazetak":
        return (
          <div>
            <div style={sectionTitle}>Sažetak & Završna provjera</div>
            <p style={sectionSub}>Pregledajte sve unose i pokrenite automatsku provjeru konzistentnosti podataka.</p>

            <button
              style={{ ...btnPrimary, marginBottom: 24 }}
              onClick={() => validate()}
            >
              ▶ Pokreni automatsku provjeru
            </button>

            {errors.length > 0 && (
              <div style={{ ...card, background: C.errorBg, borderColor: C.redMid }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.red, marginBottom: 12 }}>
                  Pronađeno {errors.length} problem{errors.length === 1 ? "" : "a"}:
                </div>
                {errors.map((e, i) => (
                  <div key={i} style={{ fontSize: 14, color: C.redDark, padding: "6px 0", borderBottom: i < errors.length - 1 ? `1px solid ${C.redMid}` : "none" }}>
                    ✗ {e}
                  </div>
                ))}
              </div>
            )}

            {errors.length === 0 && errors !== null && (
              <div style={{ ...card, background: C.greenBg, borderColor: "#B5E3C8" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>
                  ✓ Sve provjere su prošle! Vaš biznis plan je konzistentan.
                </div>
              </div>
            )}

            <Field lbl="Sažetak finansijskog plana" tip="Napišite kratak rezime vašeg finansijskog plana po ključnim elementima.">
              <textarea
                style={{ ...textareaStyle, minHeight: 140 }}
                value={data.sazetak}
                onChange={(e) => set("sazetak", e.target.value)}
                placeholder="Rezime finansijskog plana: ukupna ulaganja, izvori finansiranja, očekivani prihodi, profitabilnost..."
              />
            </Field>

            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 12 }}>
              {[
                ["Ukupna ulaganja", `${totalSredstva.toLocaleString()} KM`],
                ["Vlastiti kapital", `${totalVlastiti.toLocaleString()} KM`],
                ["Tuđi kapital", `${totalTudi.toLocaleString()} KM`],
                ["Prihodi 2026", `${prihodi[0].toLocaleString()} KM`],
                ["Troškovi 2026", `${ukupniTroskovi[0].toLocaleString()} KM`],
                ["Neto dobit 2026", `${((prihodi[0] + num(data.ostaliPrihodi[0]) - ukupniTroskovi[0]) * 0.9).toLocaleString(undefined, { maximumFractionDigits: 0 })} KM`],
              ].map(([l, v]) => (
                <div key={l} style={{ ...card, padding: 18, textAlign: "center", marginBottom: 0 }}>
                  <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>{l}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: C.red }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Export PDF */}
            <div style={{ marginTop: 32, textAlign: "center" }}>
              <button
                onClick={exportPDF}
                disabled={pdfExporting}
                style={{
                  ...btnPrimary,
                  fontSize: 16,
                  padding: "16px 40px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  opacity: pdfExporting ? 0.7 : 1,
                  cursor: pdfExporting ? "wait" : "pointer",
                }}
              >
                {pdfExporting ? "⏳ Generišem PDF..." : "📄 Izvezi kompletan biznis plan u PDF"}
              </button>
              <p style={{ fontSize: 12, color: C.textMuted, marginTop: 10 }}>
                Preuzima se pravi PDF fajl (.pdf) sa kompletnim biznis planom.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ═══════════════════════════════════════════
  // PRINT / PDF EXPORT — full static report of every topic + table
  // ═══════════════════════════════════════════
  const fmt = (v) => num(v).toLocaleString(undefined, { maximumFractionDigits: 2 });
  const fmtDate = (iso) => {
    if (!iso) return "—";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  };

  const pr = {
    page: { fontFamily: "'DM Sans','Segoe UI',sans-serif", color: "#1A1A1A", padding: "20px 30px" },
    h1: { fontSize: 24, fontWeight: 900, color: C.red, borderBottom: `3px solid ${C.red}`, paddingBottom: 10, marginBottom: 4 },
    metaLine: { fontSize: 12, color: "#555", marginBottom: 24 },
    h2: { fontSize: 16, fontWeight: 800, color: C.red, marginTop: 26, marginBottom: 10, borderBottom: "1px solid #ccc", paddingBottom: 4, breakAfter: "avoid" },
    h3: { fontSize: 13, fontWeight: 700, color: "#333", marginTop: 4, marginBottom: 2 },
    p: { fontSize: 12, lineHeight: 1.6, marginBottom: 10, color: "#222", whiteSpace: "pre-line" },
    section: { breakInside: "avoid" },
    table: { width: "100%", borderCollapse: "collapse", fontSize: 10.5, marginBottom: 14 },
    th: { border: "1px solid #999", padding: "5px 6px", background: "#F5C6CE", textAlign: "left", fontWeight: 700, color: "#1A1A1A" },
    td: { border: "1px solid #ccc", padding: "5px 6px" },
    tdR: { border: "1px solid #ccc", padding: "5px 6px", textAlign: "right" },
    totalRow: { fontWeight: 800, background: "#FDE8EC" },
  };

  const printReport = (
    <div ref={printReportRef} style={{ display: "none" }}>
      <div style={pr.page}>
        <div style={pr.h1}>BIZNIS PLAN — {data.naziv || "(bez naziva)"}</div>
        <div style={pr.metaLine}>
          Autori: {data.autori || "—"} &nbsp;|&nbsp; Univerzitet FINRA &nbsp;|&nbsp;
          Datum generisanja: {new Date().toLocaleDateString("bs-BA")}
        </div>

        {/* 1. Ključna strategija */}
        <div style={pr.section}>
          <div style={pr.h2}>1. Ključna strategija</div>
          <div style={pr.h3}>Vizija</div><div style={pr.p}>{data.vizija || "—"}</div>
          <div style={pr.h3}>Misija</div><div style={pr.p}>{data.misija || "—"}</div>
          <div style={pr.h3}>Proizvod / Usluga</div><div style={pr.p}>{data.proizvod || "—"}</div>
          <div style={pr.h3}>Nova vrijednost</div><div style={pr.p}>{data.novaVrijednost || "—"}</div>
          <div style={pr.h3}>Ciljno tržište</div><div style={pr.p}>{data.ciljnoTrziste || "—"}</div>
        </div>

        {/* 2. Resursi & SWOT */}
        <div style={pr.section}>
          <div style={pr.h2}>2. Resursi & SWOT analiza</div>
          <div style={pr.h3}>Ključne kompetencije</div><div style={pr.p}>{data.kompetencije || "—"}</div>
          <div style={pr.h3}>Ključna imovina</div><div style={pr.p}>{data.imovina || "—"}</div>
          <table style={pr.table}>
            <thead><tr><th style={pr.th}>Snage</th><th style={pr.th}>Slabosti</th><th style={pr.th}>Mogućnosti</th><th style={pr.th}>Prijetnje</th></tr></thead>
            <tbody><tr>
              <td style={pr.td}>{data.swot.snage || "—"}</td>
              <td style={pr.td}>{data.swot.slabosti || "—"}</td>
              <td style={pr.td}>{data.swot.mogucnosti || "—"}</td>
              <td style={pr.td}>{data.swot.prijetnje || "—"}</td>
            </tr></tbody>
          </table>
        </div>

        {/* 3. Operacije */}
        <div style={pr.section}>
          <div style={pr.h2}>3. Operacije</div>
          <div style={pr.h3}>Proizvodnja / Usluge</div><div style={pr.p}>{data.proizvodnja || "—"}</div>
          <div style={pr.h3}>Promocija & Kanali distribucije</div><div style={pr.p}>{data.promocija || "—"}</div>
          <div style={pr.h3}>Ključni partneri</div><div style={pr.p}>{data.partneri || "—"}</div>
        </div>

        {/* 4a. Izvori i upotreba kapitala */}
        <div style={pr.section}>
          <div style={pr.h2}>4a. Finansijski plan: Izvori i upotreba kapitala</div>
          <table style={pr.table}>
            <thead><tr><th style={pr.th}>Sredstva</th><th style={pr.th}>Iznos u KM</th></tr></thead>
            <tbody>
              <tr><td style={{ ...pr.td, fontWeight: 700 }}>I STALNA SREDSTVA</td><td style={pr.tdR}>{fmt(totalStalna)}</td></tr>
              {[["Zemljište", data.inv.zemljiste], ["Zgrade", data.inv.zgrade], ["Oprema", data.inv.oprema], ["Vozila", data.inv.vozila], ["Poslovni inventar", data.inv.inventar], ["Osnivačka ulaganja", data.inv.osnivacka], ["Nematerijalna sredstva", data.inv.nematerijalna]].map(([l, v]) => (
                <tr key={l}><td style={pr.td}>{l}</td><td style={pr.tdR}>{fmt(v)}</td></tr>
              ))}
              <tr><td style={{ ...pr.td, fontWeight: 700 }}>II TEKUĆA SREDSTVA</td><td style={pr.tdR}>{fmt(totalTekuca)}</td></tr>
              {[["Zalihe", data.inv.zalihe], ["Potraživanja", data.inv.potrazivanja], ["Gotovina", data.inv.gotovina]].map(([l, v]) => (
                <tr key={l}><td style={pr.td}>{l}</td><td style={pr.tdR}>{fmt(v)}</td></tr>
              ))}
              <tr style={pr.totalRow}><td style={pr.td}>UKUPNO SREDSTVA</td><td style={pr.tdR}>{fmt(totalSredstva)}</td></tr>
            </tbody>
          </table>
          <table style={pr.table}>
            <thead><tr><th style={pr.th}>Izvori</th><th style={pr.th}>Iznos u KM</th></tr></thead>
            <tbody>
              <tr><td style={{ ...pr.td, fontWeight: 700 }}>I VLASTITI IZVORI</td><td style={pr.tdR}>{fmt(totalVlastiti)}</td></tr>
              {[["Novac", data.izv.novac], ["Zemljište", data.izv.zemljiste_v], ["Građevine", data.izv.gradevine_v], ["Oprema", data.izv.oprema_v], ["Ostalo", data.izv.ostalo_v]].map(([l, v]) => (
                <tr key={l}><td style={pr.td}>{l}</td><td style={pr.tdR}>{fmt(v)}</td></tr>
              ))}
              <tr><td style={{ ...pr.td, fontWeight: 700 }}>II KREDITI — TUĐI IZVORI</td><td style={pr.tdR}>{fmt(totalTudi)}</td></tr>
              {[["Dugoročni krediti", data.izv.dugorocni], ["Kratkoročni krediti", data.izv.kratkorocni], ["Ostali tuđi izvori", data.izv.ostali_tudi]].map(([l, v]) => (
                <tr key={l}><td style={pr.td}>{l}</td><td style={pr.tdR}>{fmt(v)}</td></tr>
              ))}
              <tr style={pr.totalRow}><td style={pr.td}>UKUPNO IZVORI</td><td style={pr.tdR}>{fmt(totalIzvori)}</td></tr>
            </tbody>
          </table>
        </div>

        {/* 4b. Početni bilans stanja */}
        <div style={pr.section}>
          <div style={pr.h2}>4b. Finansijski plan: Početni bilans stanja (na dan {fmtDate(data.bilansDatum)})</div>
          <table style={pr.table}>
            <thead><tr><th style={pr.th}>Aktiva</th><th style={pr.th}>Iznos KM</th><th style={pr.th}>Pasiva</th><th style={pr.th}>Iznos KM</th></tr></thead>
            <tbody>
              <tr><td style={pr.td}>Nematerijalna ulaganja</td><td style={pr.tdR}>{fmt(data.bilansAktiva.nematerijalna)}</td><td style={pr.td}>Vlastiti kapital</td><td style={pr.tdR}>{fmt(data.bilansPasiva.vlastitiKapital)}</td></tr>
              <tr><td style={pr.td}>Zemljište</td><td style={pr.tdR}>{fmt(data.bilansAktiva.zemljiste)}</td><td style={pr.td}>Ostalo (grantovi)</td><td style={pr.tdR}>{fmt(data.bilansPasiva.ostaloKapital)}</td></tr>
              <tr><td style={pr.td}>Objekti</td><td style={pr.tdR}>{fmt(data.bilansAktiva.objekti)}</td><td style={pr.td}>Dugoročni kredit</td><td style={pr.tdR}>{fmt(data.bilansPasiva.dugorocniKredit)}</td></tr>
              <tr><td style={pr.td}>Oprema</td><td style={pr.tdR}>{fmt(data.bilansAktiva.oprema)}</td><td style={pr.td}>Ostale dugor. obaveze</td><td style={pr.tdR}>{fmt(data.bilansPasiva.ostaleDugorocne)}</td></tr>
              <tr><td style={pr.td}>Ostala stalna sredstva</td><td style={pr.tdR}>{fmt(data.bilansAktiva.ostalaStalna)}</td><td style={pr.td}>Dobavljači</td><td style={pr.tdR}>{fmt(data.bilansPasiva.dobavljaci)}</td></tr>
              <tr><td style={pr.td}>Zalihe</td><td style={pr.tdR}>{fmt(data.bilansAktiva.zalihe)}</td><td style={pr.td}>Kratkoročni krediti</td><td style={pr.tdR}>{fmt(data.bilansPasiva.kratkorocniKrediti)}</td></tr>
              <tr><td style={pr.td}>Potraživanja</td><td style={pr.tdR}>{fmt(data.bilansAktiva.potrazivanja)}</td><td style={pr.td}>Ostale kratkor. obaveze</td><td style={pr.tdR}>{fmt(data.bilansPasiva.ostaleKratkorocne)}</td></tr>
              <tr><td style={pr.td}>Gotovina</td><td style={pr.tdR}>{fmt(data.bilansAktiva.gotovina)}</td><td style={pr.td}></td><td style={pr.tdR}></td></tr>
              <tr><td style={pr.td}>Ostala tekuća sredstva</td><td style={pr.tdR}>{fmt(data.bilansAktiva.ostalaTekuca)}</td><td style={pr.td}></td><td style={pr.tdR}></td></tr>
              <tr style={pr.totalRow}>
                <td style={pr.td}>UKUPNO AKTIVA</td>
                <td style={pr.tdR}>{fmt(num(data.bilansAktiva.nematerijalna) + num(data.bilansAktiva.zemljiste) + num(data.bilansAktiva.objekti) + num(data.bilansAktiva.oprema) + num(data.bilansAktiva.ostalaStalna) + num(data.bilansAktiva.zalihe) + num(data.bilansAktiva.potrazivanja) + num(data.bilansAktiva.gotovina) + num(data.bilansAktiva.ostalaTekuca))}</td>
                <td style={pr.td}>UKUPNO PASIVA</td>
                <td style={pr.tdR}>{fmt(num(data.bilansPasiva.vlastitiKapital) + num(data.bilansPasiva.ostaloKapital) + num(data.bilansPasiva.dugorocniKredit) + num(data.bilansPasiva.ostaleDugorocne) + num(data.bilansPasiva.dobavljaci) + num(data.bilansPasiva.kratkorocniKrediti) + num(data.bilansPasiva.ostaleKratkorocne))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4c. Plan prodaje */}
        <div style={pr.section}>
          <div style={pr.h2}>4c. Finansijski plan: Plan prodaje (2026–2030)</div>
          <table style={pr.table}>
            <thead><tr>
              <th style={pr.th}>#</th><th style={pr.th}>Proizvod/Usluga</th><th style={pr.th}>Cijena (KM)</th>
              <th style={pr.th}>Mj. plan 2026</th><th style={pr.th}>God. 2026</th><th style={pr.th}>2027</th><th style={pr.th}>2028</th><th style={pr.th}>2029</th><th style={pr.th}>2030</th>
            </tr></thead>
            <tbody>
              {data.prodaja.map((p, i) => (
                <tr key={i}>
                  <td style={pr.td}>{i + 1}.</td><td style={pr.td}>{p.naziv || "—"}</td><td style={pr.tdR}>{fmt(p.cijena)}</td>
                  <td style={pr.tdR}>{fmt(p.mj2026)}</td><td style={pr.tdR}>{fmt(p.god2026)}</td><td style={pr.tdR}>{fmt(p.god2027)}</td>
                  <td style={pr.tdR}>{fmt(p.god2028)}</td><td style={pr.tdR}>{fmt(p.god2029)}</td><td style={pr.tdR}>{fmt(p.god2030)}</td>
                </tr>
              ))}
              <tr style={pr.totalRow}>
                <td style={pr.td} colSpan={4}>UKUPNO</td>
                {prihodi.map((v, i) => <td key={i} style={pr.tdR}>{fmt(v)}</td>)}
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4d. Plan troškova */}
        <div style={pr.section}>
          <div style={pr.h2}>4d. Finansijski plan: Plan troškova (2026–2030)</div>
          <table style={pr.table}>
            <thead><tr><th style={pr.th}>Struktura troškova</th>{costsLabels.map((h) => <th key={h} style={pr.th}>{h}</th>)}</tr></thead>
            <tbody>
              {costCategories.map((cat, idx) => {
                if (cat.type === "section") {
                  return (
                    <tr key={`s${idx}`} style={{ background: "#FDE8EC" }}>
                      <td style={{ ...pr.td, fontWeight: 700 }}>{cat.label}</td>
                      {costsLabels.map((_, ci) => {
                        let sub = 0; cat.keys.forEach((k) => { sub += num(data.troskovi[k][ci]); });
                        return <td key={ci} style={pr.tdR}>{sub > 0 ? fmt(sub) : ""}</td>;
                      })}
                    </tr>
                  );
                }
                return (
                  <tr key={cat.key} style={{ background: cat.sub ? "transparent" : "#FDE8EC" }}>
                    <td style={{ ...pr.td, paddingLeft: cat.sub ? 16 : 6, fontWeight: cat.sub ? 400 : 700 }}>{cat.label}</td>
                    {data.troskovi[cat.key].map((v, ci) => <td key={ci} style={pr.tdR}>{fmt(v)}</td>)}
                  </tr>
                );
              })}
              <tr style={pr.totalRow}>
                <td style={pr.td}>UKUPNO TROŠKOVI (1-5)</td>
                {costsLabels.map((_, ci) => {
                  let total = 0; Object.values(data.troskovi).forEach((arr) => { total += num(arr[ci]); });
                  return <td key={ci} style={pr.tdR}>{fmt(total)}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4e. Amortizacija */}
        <div style={pr.section}>
          <div style={pr.h2}>4e. Finansijski plan: Obračun amortizacije</div>
          <table style={pr.table}>
            <thead><tr><th style={pr.th}>Opis sredstva</th><th style={pr.th}>Nabavna vrij. (KM)</th><th style={pr.th}>Stopa (%)</th><th style={pr.th}>2026</th><th style={pr.th}>2027</th><th style={pr.th}>2028</th><th style={pr.th}>2029</th><th style={pr.th}>2030</th><th style={pr.th}>Ukupno</th></tr></thead>
            <tbody>
              {data.amort.map((a, i) => {
                const am = num(a.nabavna) * (num(a.stopa) / 100);
                return (
                  <tr key={i}>
                    <td style={pr.td}>{a.opis || "—"}</td><td style={pr.tdR}>{fmt(a.nabavna)}</td><td style={pr.tdR}>{fmt(a.stopa)}</td>
                    {[0, 1, 2, 3, 4].map((y) => <td key={y} style={pr.tdR}>{fmt(am)}</td>)}
                    <td style={pr.tdR}>{fmt(am * 5)}</td>
                  </tr>
                );
              })}
              <tr style={pr.totalRow}>
                <td style={pr.td} colSpan={3}>UKUPNO</td>
                {amortGodisnje.map((v, i) => <td key={i} style={pr.tdR}>{fmt(v)}</td>)}
                <td style={pr.tdR}>{fmt(amortGodisnje.reduce((a, b) => a + b, 0))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4f. Otplatni plan kredita */}
        <div style={pr.section}>
          <div style={pr.h2}>4f. Finansijski plan: Otplatni plan kredita</div>
          {kreditInfo ? (
            <>
              <div style={pr.p}>
                Iznos kredita: {fmt(data.kredit.iznos)} KM &nbsp;|&nbsp; Učešće: {fmt(data.kredit.ucesce)} KM &nbsp;|&nbsp;
                Osnovica: {fmt(kreditInfo.osnovica)} KM &nbsp;|&nbsp; Kamata: {fmt(data.kredit.kamata)}% godišnje<br />
                Rok otplate: {fmt(data.kredit.rok)} mj. (grace {fmt(data.kredit.grace)} mj.) &nbsp;|&nbsp; Datum prve rate: {fmtDate(data.kredit.datumPrveRate)}<br />
                Rata u grace periodu: {fmt(kreditInfo.graceRata)} KM &nbsp;|&nbsp; Izračunata rata: {fmt(kreditInfo.rata)} KM<br />
                Ukupna kamata: {fmt(kreditInfo.ukupnaKamata)} KM &nbsp;|&nbsp; <strong>Ukupno zaduženje: {fmt(kreditInfo.ukupnoZaduzenje)} KM</strong>
              </div>
              <table style={pr.table}>
                <thead><tr><th style={pr.th}>BR.</th><th style={pr.th}>Datum</th><th style={pr.th}>Početno zaduženje</th><th style={pr.th}>Kamata</th><th style={pr.th}>Glavnica</th><th style={pr.th}>Ostatak</th><th style={pr.th}>Kum. kamata</th></tr></thead>
                <tbody>
                  {kreditInfo.rows.map((r) => (
                    <tr key={r.br}>
                      <td style={pr.td}>{r.br}.</td><td style={pr.td}>{r.datum || "—"}</td><td style={pr.tdR}>{fmt(r.zaduzenje)}</td>
                      <td style={pr.tdR}>{fmt(r.kamata)}</td><td style={pr.tdR}>{r.glavnica === 0 ? "—" : fmt(r.glavnica)}</td>
                      <td style={pr.tdR}>{fmt(r.ostatak)}</td><td style={pr.tdR}>{fmt(r.kumKamata)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : <div style={pr.p}>Kredit nije definisan.</div>}
        </div>

        {/* 4g. Normativi */}
        <div style={pr.section}>
          <div style={pr.h2}>4g. Finansijski plan: Normativi i cijene sirovina i materijala</div>
          <table style={pr.table}>
            <thead><tr>
              <th style={pr.th}>Sirovina/materijal</th><th style={pr.th}>Jed. mjere</th><th style={pr.th}>Cijena/jed. (KM)</th>
              {data.normativiProizvodi.map((p, pi) => <th key={pi} style={pr.th}>{p || `Proizvod Br.${pi + 1}`}</th>)}
            </tr></thead>
            <tbody>
              {data.normativi.map((n, i) => (
                <tr key={i}>
                  <td style={pr.td}>{n.naziv || "—"}</td><td style={pr.td}>{n.jedMjere || "—"}</td><td style={pr.tdR}>{fmt(n.cijena)}</td>
                  {n.kolicine.map((k, ki) => <td key={ki} style={pr.tdR}>{fmt(k)}</td>)}
                </tr>
              ))}
              <tr style={pr.totalRow}>
                <td style={pr.td} colSpan={3}>UKUPNA CIJENA KOŠTANJA MATERIJALA PO PROIZVODU</td>
                {data.normativiProizvodi.map((_, pi) => {
                  const total = data.normativi.reduce((sum, n) => sum + num(n.cijena) * num(n.kolicine[pi]), 0);
                  return <td key={pi} style={pr.tdR}>{fmt(total)}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4h. Bilans uspjeha */}
        <div style={pr.section}>
          <div style={pr.h2}>4h. Finansijski plan: Bilans uspjeha (2026–2030)</div>
          <table style={pr.table}>
            <thead><tr><th style={pr.th}>Elementi</th>{[2026, 2027, 2028, 2029, 2030].map((y) => <th key={y} style={pr.th}>{y}.</th>)}</tr></thead>
            <tbody>
              {(() => {
                const ukPrihodi = prihodi.map((p, i) => p + num(data.ostaliPrihodi[i]));
                const brutoDobit = ukPrihodi.map((p, i) => p - ukupniTroskovi[i]);
                const porez = brutoDobit.map((d) => (d > 0 ? d * 0.1 : 0));
                const netoDobit = brutoDobit.map((d, i) => d - porez[i]);
                const R = [
                  ["I. UKUPNI PRIHODI", ukPrihodi, true],
                  ["  1. Prihodi od prodaje", prihodi, false],
                  ["  2. Ostali prihodi", data.ostaliPrihodi.map(num), false],
                  ["II. UKUPNI RASHODI", ukupniTroskovi, true],
                  ["III. BRUTO DOBIT (I-II)", brutoDobit, true],
                  ["  Porez na dobit (10%)", porez, false],
                  ["IV. NETO DOBIT", netoDobit, true],
                ];
                return R.map(([label, values, bold]) => (
                  <tr key={label} style={bold ? pr.totalRow : {}}>
                    <td style={pr.td}>{label}</td>
                    {values.map((v, i) => <td key={i} style={pr.tdR}>{fmt(v)}</td>)}
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>

        {/* 4i. Bilans stanja na kraju godine */}
        <div style={pr.section}>
          <div style={pr.h2}>4i. Bilans stanja na kraju poslovne godine (na dan {fmtDate(data.bilansKrajDatum)})</div>
          <table style={pr.table}>
            <thead><tr><th style={pr.th}>Aktiva</th><th style={pr.th}>Iznos KM</th><th style={pr.th}>Pasiva</th><th style={pr.th}>Iznos KM</th></tr></thead>
            <tbody>
              <tr><td style={pr.td}>Nematerijalna sredstva</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.nematerijalna)}</td><td style={pr.td}>Vlastiti kapital</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.vlastitiKapital)}</td></tr>
              <tr><td style={pr.td}>Zemljište</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.zemljiste)}</td><td style={pr.td}>Akumulirana dobit</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.akumuliranaDobit)}</td></tr>
              <tr><td style={pr.td}>Objekti</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.objekti)}</td><td style={pr.td}>Dugoročni kredit</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.dugorocniKredit)}</td></tr>
              <tr><td style={pr.td}>Oprema</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.oprema)}</td><td style={pr.td}>Ostale dugor. obaveze</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.ostaleDugorocne)}</td></tr>
              <tr><td style={pr.td}>Ostala stalna sredstva</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.ostalaStalna)}</td><td style={pr.td}>Dobavljači</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.dobavljaci)}</td></tr>
              <tr><td style={pr.td}>Zalihe</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.zalihe)}</td><td style={pr.td}>Kratkoročni krediti</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.kratkorocniKrediti)}</td></tr>
              <tr><td style={pr.td}>Potraživanja</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.potrazivanja)}</td><td style={pr.td}>Ostale kratkor. obaveze</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.ostaleKratkorocne)}</td></tr>
              <tr><td style={pr.td}>Novac</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.novac)}</td><td style={pr.td}></td><td style={pr.tdR}></td></tr>
              <tr><td style={pr.td}>Ostala tekuća sredstva</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.ostalaTekuca)}</td><td style={pr.td}></td><td style={pr.tdR}></td></tr>
              <tr style={pr.totalRow}>
                <td style={pr.td}>UKUPNO AKTIVA</td>
                <td style={pr.tdR}>{fmt(num(data.bilansKrajAktiva.nematerijalna) + num(data.bilansKrajAktiva.zemljiste) + num(data.bilansKrajAktiva.objekti) + num(data.bilansKrajAktiva.oprema) + num(data.bilansKrajAktiva.ostalaStalna) + num(data.bilansKrajAktiva.zalihe) + num(data.bilansKrajAktiva.potrazivanja) + num(data.bilansKrajAktiva.novac) + num(data.bilansKrajAktiva.ostalaTekuca))}</td>
                <td style={pr.td}>UKUPNO PASIVA</td>
                <td style={pr.tdR}>{fmt(num(data.bilansKrajPasiva.vlastitiKapital) + num(data.bilansKrajPasiva.akumuliranaDobit) + num(data.bilansKrajPasiva.dugorocniKredit) + num(data.bilansKrajPasiva.ostaleDugorocne) + num(data.bilansKrajPasiva.dobavljaci) + num(data.bilansKrajPasiva.kratkorocniKrediti) + num(data.bilansKrajPasiva.ostaleKratkorocne))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sažetak */}
        <div style={pr.section}>
          <div style={pr.h2}>Sažetak finansijskog plana</div>
          <div style={pr.p}>{data.sazetak || "—"}</div>
        </div>
      </div>
    </div>
  );

  const exportPDF = async () => {
    const node = printReportRef.current;
    if (!node || pdfExporting) return;

    const source = node.firstElementChild || node;
    const safeTitle = (data.naziv || "Biznis plan").replace(/[<>"/\\|*?:]/g, "").trim() || "Biznis plan";
    const fileName = safeTitle.replace(/[^a-zA-Z0-9À-ž-_ ]/g, "").trim().replace(/\s+/g, "_") || "biznis-plan";

    setPdfExporting(true);

    // Clone off-screen so html2canvas can render (display:none is not capturable)
    const clone = source.cloneNode(true);
    clone.style.cssText = [
      "display:block",
      "position:fixed",
      "left:-10000px",
      "top:0",
      "width:794px",
      "background:#ffffff",
      "padding:24px 32px",
      "box-sizing:border-box",
      "z-index:-1",
      "font-family:'DM Sans','Segoe UI',Arial,sans-serif",
      "color:#1A1A1A",
    ].join(";");
    document.body.appendChild(clone);

    try {
      const [{ jsPDF }, html2canvasMod] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);
      const html2canvas = html2canvasMod.default;

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: 794,
      });

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const usableW = pageW - margin * 2;
      const usableH = pageH - margin * 2;

      const imgW = usableW;
      const imgH = (canvas.height * imgW) / canvas.width;
      const imgData = canvas.toDataURL("image/jpeg", 0.92);

      let offsetY = 0;
      let page = 0;
      while (offsetY < imgH - 0.5) {
        if (page > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", margin, margin - offsetY, imgW, imgH);
        offsetY += usableH;
        page += 1;
      }

      pdf.save(`${fileName}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Greška pri generisanju PDF-a. Pokušajte ponovo.");
    } finally {
      if (clone.parentNode) document.body.removeChild(clone);
      setPdfExporting(false);
    }
  };

  return (
    <div>
      {printReport}
      {/* Step navigation */}
      <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 16, marginBottom: 24, borderBottom: `1px solid ${C.border}` }}>
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setStep(i)}
            style={{
              ...pill(i === step),
              fontSize: 12,
              padding: "8px 14px",
              minWidth: "fit-content",
              border: i === step ? "none" : `1px solid ${C.borderLight}`,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 6, background: C.borderLight, borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: `${((step + 1) / STEPS.length) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${C.red}, ${C.redDark})`, borderRadius: 99, transition: "width .3s" }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: C.textMuted }}>{step + 1}/{STEPS.length}</span>
      </div>

      {/* Test helper: random fill button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <button
          onClick={randomFillStep}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 999, border: `1px dashed ${C.textMuted}`,
            background: "transparent", color: C.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}
          title="Testno dugme — popunjava trenutni korak nasumičnim vrijednostima"
        >
          🎲 Automatski popuni random vrijednostima (test)
        </button>
      </div>

      {renderStep()}

      {/* Navigation buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
        <button
          onClick={() => step > 0 && setStep(step - 1)}
          disabled={step === 0}
          style={{ ...btnPrimary, background: step === 0 ? C.border : C.text, opacity: step === 0 ? 0.5 : 1 }}
        >
          ← Nazad
        </button>
        <button
          onClick={() => step < STEPS.length - 1 && setStep(step + 1)}
          disabled={step === STEPS.length - 1}
          style={{ ...btnPrimary, opacity: step === STEPS.length - 1 ? 0.5 : 1 }}
        >
          Dalje →
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════

const TABS = [
  { id: "kreatori", label: "O kreatorima" },
  { id: "info", label: "Informacije" },
  { id: "zasto", label: "Zašto biznis plan?" },
  { id: "literatura", label: "Literatura" },
  { id: "primjeri", label: "Primjeri" },
  { id: "vodic", label: "Vodič & Kreator" },
];

export default function App() {
  const [tab, setTab] = useState("vodic");

  const renderTab = () => {
    switch (tab) {
      case "kreatori": return <TabKreatori />;
      case "info": return <TabInfo />;
      case "zasto": return <TabZasto />;
      case "literatura": return <TabLiteratura />;
      case "primjeri": return <TabPrimjeri />;
      case "vodic": return <TabVodic />;
      default: return null;
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.red} 0%, ${C.redDark} 100%)`,
          color: C.white,
          padding: "28px 32px 20px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "rgba(255,255,255,.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              BP
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>BizPlan Asistent</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>Univerzitet FINRA — Vodič za razvoj biznis planova</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 4, padding: "10px 24px", overflowX: "auto" }}>
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={pill(tab === t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 60px" }}>
        {renderTab()}
      </div>

      {/* Footer */}
      <div style={{ background: C.text, color: "rgba(255,255,255,.5)", textAlign: "center", padding: "20px", fontSize: 12 }}>
        © 2026 Univerzitet FINRA — Savremeni Menadžment i Digitalno Poslovanje
      </div>
    </div>
  );
}
