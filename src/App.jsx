import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { LanguageProvider, useLang } from "./i18n";

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

// ─── Language switcher (header top-right) ───
function LangSwitch() {
  const { lang, setLang, t } = useLang();
  const langPill = (active) => ({
    padding: "6px 14px",
    border: "none",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 700,
    background: active ? C.white : "transparent",
    color: active ? C.red : C.white,
    transition: "all .2s",
  });
  return (
    <div
      role="group"
      aria-label={t("lang.label")}
      style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: "auto", flexShrink: 0 }}
    >
      <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.85, whiteSpace: "nowrap" }}>
        {t("lang.label")}
      </span>
      <div
        style={{
          display: "flex",
          gap: 2,
          padding: 3,
          borderRadius: 999,
          background: "rgba(255,255,255,.18)",
          border: "1px solid rgba(255,255,255,.28)",
        }}
      >
        <button type="button" onClick={() => setLang("bs")} style={langPill(lang === "bs")} aria-label={t("lang.bs")} aria-pressed={lang === "bs"}>
          {t("lang.bsShort")}
        </button>
        <button type="button" onClick={() => setLang("en")} style={langPill(lang === "en")} aria-label={t("lang.en")} aria-pressed={lang === "en"}>
          {t("lang.enShort")}
        </button>
      </div>
    </div>
  );
}

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
  const { t } = useLang();
  const creators = [
    { name: "Amina Serhatlic", role: t("kreatori.roles.student"), program: t("kreatori.programs.menadzment") },
    { name: "Valdet Pestalic", role: t("kreatori.roles.student"), program: t("kreatori.programs.menadzment") },
    { name: "Ivona Pekaric", role: t("kreatori.roles.asistent"), program: t("kreatori.programs.menadzment") },
    { name: "Edi Pekaric", role: t("kreatori.roles.asistent"), program: t("kreatori.programs.racunarstvo") },
  ];
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...sectionTitle, fontSize: 32 }}>{t("kreatori.title")}</div>
        <p style={{ ...sectionSub, maxWidth: 520, margin: "8px auto 0" }}>
          {t("kreatori.intro")}
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
            <div style={{ fontSize: 13, color: C.textMuted, fontWeight: 600 }}>{t("kreatori.university")}</div>
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
  const { t } = useLang();
  const features = t("info.features");
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...sectionTitle, fontSize: 32 }}>{t("info.title")}</div>
        <p style={{ ...sectionSub, maxWidth: 560, margin: "8px auto 0" }}>
          {t("info.intro")}
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
          {t("info.audienceTitle")}
        </div>
        <div style={{ fontSize: 14, color: C.text, lineHeight: 1.8 }}>
          <strong>{t("info.primaryLabel")}</strong> {t("info.primaryText")}
          <br />
          <strong>{t("info.secondaryLabel")}</strong> {t("info.secondaryText")}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 3 — Zašto je bitan biznis plan
// ═══════════════════════════════════════════
function TabZasto() {
  const { t } = useLang();
  const reasons = t("zasto.reasons");

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...sectionTitle, fontSize: 32 }}>{t("zasto.title")}</div>
        <p style={{ ...sectionSub, maxWidth: 520, margin: "8px auto 0" }}>
          {t("zasto.sub")}
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
// TAB 4 — Literatura
// ═══════════════════════════════════════════
function TabLiteratura() {
  const { t } = useLang();
  const items = t("literatura.items");

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...sectionTitle, fontSize: 32 }}>{t("literatura.title")}</div>
        <p style={sectionSub}>{t("literatura.sub")}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {items.map((item) => (
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
              {t("literatura.access")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TAB 5 — Primjeri biznis planova
// ═══════════════════════════════════════════
function TabPrimjeri() {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(null);
  const examples = t("primjeri.examples");
  const exLabels = t("primjeri.labels");

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ ...sectionTitle, fontSize: 32 }}>{t("primjeri.title")}</div>
        <p style={sectionSub}>{t("primjeri.sub")}</p>
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
                [exLabels.vizijaMisija, `${ex.vizija}\n${ex.misija}`],
                [exLabels.proizvod, ex.proizvod],
                [exLabels.trziste, ex.trziste],
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

const STEP_IDS = [
  "info", "strategija", "resursi", "operacije", "investicije", "bilans_poc",
  "plan_prodaje", "plan_troskova", "amortizacija", "kredit", "normativi",
  "bilans_uspjeha", "bilans_kraj", "sazetak",
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
  const { t } = useLang();
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
        type="number" min="1" max="31" placeholder={t("date.dd")} value={day}
        onChange={(e) => { const v = e.target.value; setDay(v); commit(v, month, year); }}
        style={dmyInput}
      />
      <span style={{ color: C.textMuted, fontWeight: 700 }}>/</span>
      <input
        type="number" min="1" max="12" placeholder={t("date.mm")} value={month}
        onChange={(e) => { const v = e.target.value; setMonth(v); commit(day, v, year); }}
        style={dmyInput}
      />
      <span style={{ color: C.textMuted, fontWeight: 700 }}>/</span>
      <input
        type="number" min="1900" max="2100" placeholder={t("date.yyyy")} value={year}
        onChange={(e) => { const v = e.target.value; setYear(v); commit(day, month, v); }}
        style={{ ...dmyInput, width: 76 }}
      />
    </div>
  );
}

function TabVodic() {
  const { t, lang } = useLang();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState([]);
  const [pdfExporting, setPdfExporting] = useState(false);
  const printReportRef = useRef(null);
  const dateLocale = lang === "bs" ? "bs-BA" : "en-GB";

  const STEPS = useMemo(
    () => STEP_IDS.map((id) => ({ id, label: t(`steps.${id}`) })),
    [t]
  );

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
      return d.toLocaleDateString(dateLocale);
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
  }, [data.kredit, dateLocale]);

  // ── Validation ──
  const validate = useCallback(() => {
    const errs = [];
    if (!data.naziv.trim()) errs.push(t("vodic.errors.naziv"));
    if (!data.vizija.trim()) errs.push(t("vodic.errors.vizija"));
    if (!data.misija.trim()) errs.push(t("vodic.errors.misija"));
    if (!data.proizvod.trim()) errs.push(t("vodic.errors.proizvod"));
    if (!data.ciljnoTrziste.trim()) errs.push(t("vodic.errors.trziste"));
    if (!data.swot.snage.trim() || !data.swot.slabosti.trim() || !data.swot.prijetnje.trim() || !data.swot.mogucnosti.trim())
      errs.push(t("vodic.errors.swot"));
    if (totalSredstva <= 0) errs.push(t("vodic.errors.sredstvaNula"));
    if (totalIzvori <= 0) errs.push(t("vodic.errors.izvoriNula"));
    if (Math.abs(totalSredstva - totalIzvori) > 0.01)
      errs.push(t("vodic.errors.neuravnotezeno", {
        sredstva: totalSredstva.toLocaleString(),
        izvori: totalIzvori.toLocaleString(),
        diff: (totalSredstva - totalIzvori).toLocaleString(),
      }));

    const hasRevenue = prihodi.some((p) => p > 0);
    if (!hasRevenue) errs.push(t("vodic.errors.prodajaPrazna"));

    const hasCosts = ukupniTroskovi.some((c) => c > 0);
    if (!hasCosts) errs.push(t("vodic.errors.troskoviPrazni"));

    for (let i = 0; i < 5; i++) {
      if (prihodi[i] > 0 && ukupniTroskovi[i] > prihodi[i] * 3) {
        errs.push(t("vodic.errors.troskoviPreveliki", { year: 2026 + i }));
      }
    }

    data.prodaja.forEach((p) => {
      if (p.naziv && num(p.mj2026) > 0 && num(p.god2026) > 0) {
        const expected = num(p.mj2026) * 12;
        if (Math.abs(expected - num(p.god2026)) > expected * 0.2) {
          errs.push(t("vodic.errors.odstupanje", {
            name: p.naziv,
            expected: expected.toLocaleString(),
            actual: num(p.god2026).toLocaleString(),
          }));
        }
      }
    });

    setErrors(errs);
    return errs;
  }, [data, totalSredstva, totalIzvori, prihodi, ukupniTroskovi, t]);

  // Table helper (moved to module scope — see TableInput below)

  const costsLabels = useMemo(
    () => [t("vodic.planTroskova.colMonthly"), t("vodic.planTroskova.colAnnual"), "2027.", "2028.", "2029.", "2030."],
    [t]
  );
  const costCategories = useMemo(
    () => [
      { type: "section", label: t("vodic.planTroskova.cat.sectionMaterijalni"), keys: ["sirovine", "zakup", "energija", "ostaliMat"] },
      { key: "sirovine", label: t("vodic.planTroskova.cat.sirovine"), sub: true },
      { key: "zakup", label: t("vodic.planTroskova.cat.zakup"), sub: true },
      { key: "energija", label: t("vodic.planTroskova.cat.energija"), sub: true },
      { key: "ostaliMat", label: t("vodic.planTroskova.cat.ostaliMat"), sub: true },
      { type: "section", label: t("vodic.planTroskova.cat.sectionUsluge"), keys: ["ptt", "komunalne", "marketing"] },
      { key: "ptt", label: t("vodic.planTroskova.cat.ptt"), sub: true },
      { key: "komunalne", label: t("vodic.planTroskova.cat.komunalne"), sub: true },
      { key: "marketing", label: t("vodic.planTroskova.cat.marketing"), sub: true },
      { type: "section", label: t("vodic.planTroskova.cat.sectionPlate"), keys: ["netoPlate", "porezi"] },
      { key: "netoPlate", label: t("vodic.planTroskova.cat.netoPlate"), sub: true },
      { key: "porezi", label: t("vodic.planTroskova.cat.porezi"), sub: true },
      { key: "kamate", label: t("vodic.planTroskova.cat.kamate"), sub: false },
      { key: "nvRobe", label: t("vodic.planTroskova.cat.nvRobe"), sub: false },
    ],
    [t]
  );

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
          next.naziv = pick(t("vodic.sample.companyNames")) + " " + rnd(1, 99);
          next.autori = t("vodic.sample.autori");
          break;
        }
        case "strategija": {
          next.vizija = t("vodic.sample.vizija");
          next.misija = t("vodic.sample.misija");
          next.proizvod = t("vodic.sample.proizvod");
          next.novaVrijednost = t("vodic.sample.novaVrijednost");
          next.ciljnoTrziste = t("vodic.sample.ciljnoTrziste");
          break;
        }
        case "resursi": {
          next.kompetencije = t("vodic.sample.kompetencije");
          next.imovina = t("vodic.sample.imovina");
          next.swot = {
            snage: t("vodic.sample.snage"),
            slabosti: t("vodic.sample.slabosti"),
            mogucnosti: t("vodic.sample.mogucnosti"),
            prijetnje: t("vodic.sample.prijetnje"),
          };
          break;
        }
        case "operacije": {
          next.proizvodnja = t("vodic.sample.proizvodnja");
          next.promocija = t("vodic.sample.promocija");
          next.partneri = t("vodic.sample.partneri");
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
              naziv: p.naziv || t("vodic.sample.product", { n: i + 1 }),
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
          const nazivi = t("vodic.sample.amortNames");
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
          next.normativiProizvodi = next.normativiProizvodi.map((p, i) => p || t("vodic.sample.product", { n: i + 1 }));
          const sirovine = t("vodic.sample.sirovine");
          const jedMjere = t("vodic.sample.jedMjere");
          next.normativi = next.normativi.map((n, i) => ({
            naziv: n.naziv || sirovine[i % sirovine.length],
            jedMjere: pick(jedMjere),
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
          next.sazetak = t("vodic.sample.sazetak");
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
            <div style={sectionTitle}>{t("vodic.info.title")}</div>
            <p style={sectionSub}>{t("vodic.info.sub")}</p>
            <Field lbl={t("vodic.info.nazivLbl")} tip={t("vodic.info.nazivTip")}>
              <input style={inputStyle} value={data.naziv} onChange={(e) => set("naziv", e.target.value)} placeholder={t("vodic.info.nazivPh")} />
            </Field>
            <Field lbl={t("vodic.info.autoriLbl")} tip={t("vodic.info.autoriTip")}>
              <input style={inputStyle} value={data.autori} onChange={(e) => set("autori", e.target.value)} placeholder={t("vodic.info.autoriPh")} />
            </Field>
          </div>
        );

      case "strategija":
        return (
          <div>
            <div style={sectionTitle}>{t("vodic.strategija.title")}</div>
            <p style={sectionSub}>{t("vodic.strategija.sub")}</p>
            <Field lbl={t("vodic.strategija.vizijaLbl")} tip={t("vodic.strategija.vizijaTip")}>
              <textarea style={textareaStyle} value={data.vizija} onChange={(e) => set("vizija", e.target.value)} placeholder={t("vodic.strategija.vizijaPh")} />
            </Field>
            <Field lbl={t("vodic.strategija.misijaLbl")} tip={t("vodic.strategija.misijaTip")}>
              <textarea style={textareaStyle} value={data.misija} onChange={(e) => set("misija", e.target.value)} placeholder={t("vodic.strategija.misijaPh")} />
            </Field>
            <Field lbl={t("vodic.strategija.proizvodLbl")} tip={t("vodic.strategija.proizvodTip")}>
              <textarea style={textareaStyle} value={data.proizvod} onChange={(e) => set("proizvod", e.target.value)} placeholder={t("vodic.strategija.proizvodPh")} />
            </Field>
            <Field lbl={t("vodic.strategija.novaVrijednostLbl")} tip={t("vodic.strategija.novaVrijednostTip")}>
              <textarea style={textareaStyle} value={data.novaVrijednost} onChange={(e) => set("novaVrijednost", e.target.value)} placeholder={t("vodic.strategija.novaVrijednostPh")} />
            </Field>
            <Field lbl={t("vodic.strategija.trzisteLbl")} tip={t("vodic.strategija.trzisteTip")}>
              <textarea style={textareaStyle} value={data.ciljnoTrziste} onChange={(e) => set("ciljnoTrziste", e.target.value)} placeholder={t("vodic.strategija.trzistePh")} />
            </Field>
          </div>
        );

      case "resursi":
        return (
          <div>
            <div style={sectionTitle}>{t("vodic.resursi.title")}</div>
            <p style={sectionSub}>{t("vodic.resursi.sub")}</p>
            <Field lbl={t("vodic.resursi.kompetencijeLbl")} tip={t("vodic.resursi.kompetencijeTip")}>
              <textarea style={textareaStyle} value={data.kompetencije} onChange={(e) => set("kompetencije", e.target.value)} placeholder={t("vodic.resursi.kompetencijePh")} />
            </Field>
            <Field lbl={t("vodic.resursi.imovinaLbl")} tip={t("vodic.resursi.imovinaTip")}>
              <textarea style={textareaStyle} value={data.imovina} onChange={(e) => set("imovina", e.target.value)} placeholder={t("vodic.resursi.imovinaPh")} />
            </Field>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.red, margin: "24px 0 16px" }}>{t("vodic.resursi.swotTitle")}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {(["snage", "slabosti", "mogucnosti", "prijetnje"]).map((key) => (
                <Field key={key} lbl={t(`vodic.resursi.swot.${key}.lbl`)} tip={t(`vodic.resursi.swot.${key}.tip`)}>
                  <textarea
                    style={{ ...textareaStyle, minHeight: 80 }}
                    value={data.swot[key]}
                    onChange={(e) => set(`swot.${key}`, e.target.value)}
                    placeholder={`${t(`vodic.resursi.swot.${key}.lbl`)}...`}
                  />
                </Field>
              ))}
            </div>
          </div>
        );

      case "operacije":
        return (
          <div>
            <div style={sectionTitle}>{t("vodic.operacije.title")}</div>
            <p style={sectionSub}>{t("vodic.operacije.sub")}</p>
            <Field lbl={t("vodic.operacije.proizvodnjaLbl")} tip={t("vodic.operacije.proizvodnjaTip")}>
              <textarea style={textareaStyle} value={data.proizvodnja} onChange={(e) => set("proizvodnja", e.target.value)} placeholder={t("vodic.operacije.proizvodnjaPh")} />
            </Field>
            <Field lbl={t("vodic.operacije.promocijaLbl")} tip={t("vodic.operacije.promocijaTip")}>
              <textarea style={textareaStyle} value={data.promocija} onChange={(e) => set("promocija", e.target.value)} placeholder={t("vodic.operacije.promocijaPh")} />
            </Field>
            <Field lbl={t("vodic.operacije.partneriLbl")} tip={t("vodic.operacije.partneriTip")}>
              <textarea style={textareaStyle} value={data.partneri} onChange={(e) => set("partneri", e.target.value)} placeholder={t("vodic.operacije.partneriPh")} />
            </Field>
          </div>
        );

      case "investicije": {
        const tblHead = { background: C.red, color: C.white, padding: "10px 12px", textAlign: "left", fontWeight: 700, fontSize: 13 };
        const tblCell = { padding: "6px 12px", borderBottom: `1px solid ${C.border}`, fontSize: 13 };
        const tblSection = { padding: "10px 12px", borderBottom: `1px solid ${C.border}`, fontWeight: 700, fontSize: 13, background: C.redLight, color: C.redDark };
        const tblTotal = { padding: "10px 12px", fontWeight: 800, fontSize: 14, background: C.red, color: C.white };
        const inv = t("vodic.investicije.inv");
        const izv = t("vodic.investicije.izv");
        const invRows = [
          { section: true, label: inv.stalna, value: totalStalna },
          { key: "zemljiste", label: inv.zemljiste },
          { key: "zgrade", label: inv.zgrade },
          { key: "oprema", label: inv.oprema },
          { key: "vozila", label: inv.vozila },
          { key: "inventar", label: inv.inventar },
          { key: "osnivacka", label: inv.osnivacka },
          { key: "nematerijalna", label: inv.nematerijalna },
          { section: true, label: inv.tekuca, value: totalTekuca },
          { key: "zalihe", label: inv.zalihe },
          { key: "potrazivanja", label: inv.potrazivanja },
          { key: "gotovina", label: inv.gotovina },
        ];
        const izvRows = [
          { section: true, label: izv.vlastiti, value: totalVlastiti },
          { key: "novac", label: izv.novac },
          { section2: true, label: izv.stvariPrava },
          { key: "zemljiste_v", label: izv.zemljiste, indent: true },
          { key: "gradevine_v", label: izv.gradevine, indent: true },
          { key: "oprema_v", label: izv.oprema, indent: true },
          { key: "ostalo_v", label: izv.ostalo, indent: true },
          { section: true, label: izv.krediti, value: totalTudi },
          { key: "dugorocni", label: izv.dugorocni },
          { key: "kratkorocni", label: izv.kratkorocni },
          { key: "ostali_tudi", label: izv.ostaliTudi },
        ];
        const usk = t("vodic.investicije.usk");
        return (
          <div>
            <div style={sectionTitle}>{t("vodic.investicije.title")}</div>
            <p style={sectionSub}>{t("vodic.investicije.sub")}</p>

            {/* ── TABELA A: Investicije ── */}
            <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 28 }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.redDark }}>{t("vodic.investicije.tableA")}</div>
              </div>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ ...tblHead, width: "50%" }}>{t("vodic.investicije.thSredstva")}</th>
                    <th style={{ ...tblHead, width: "25%" }}>{t("vodic.investicije.thIznos")}</th>
                    <th style={{ ...tblHead, width: "25%" }}>{t("vodic.investicije.thNapomena")}</th>
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
                    <td style={tblTotal}>{t("vodic.investicije.totalSredstva")}</td>
                    <td style={tblTotal}>{totalSredstva.toLocaleString()} KM</td>
                    <td style={tblTotal}></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ── TABELA B: Izvori sredstava ── */}
            <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 28 }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.redDark }}>{t("vodic.investicije.tableB")}</div>
              </div>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ ...tblHead, width: "60%" }}>{t("vodic.investicije.thIzvori")}</th>
                    <th style={{ ...tblHead, width: "40%" }}>{t("vodic.investicije.thIznos")}</th>
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
                    <td style={tblTotal}>{t("vodic.investicije.totalIzvori")}</td>
                    <td style={tblTotal}>{totalIzvori.toLocaleString()} KM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ── TABELA C: Usklađivanje ── */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.redDark }}>{t("vodic.investicije.tableC")}</div>
              </div>
              <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ ...tblHead, width: "60%" }}>{t("vodic.investicije.thElementi")}</th>
                    <th style={{ ...tblHead, width: "40%" }}>{t("vodic.investicije.thIznos")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td colSpan={2} style={tblSection}>{usk.ulaganja}</td></tr>
                  <tr>
                    <td style={{ ...tblCell, paddingLeft: 24 }}>{usk.stalna}</td>
                    <td style={{ ...tblCell, fontWeight: 600 }}>{totalStalna.toLocaleString()} KM</td>
                  </tr>
                  <tr>
                    <td style={{ ...tblCell, paddingLeft: 24 }}>{usk.tekuca}</td>
                    <td style={{ ...tblCell, fontWeight: 600 }}>{totalTekuca.toLocaleString()} KM</td>
                  </tr>
                  <tr><td colSpan={2} style={tblSection}>{usk.izvori}</td></tr>
                  <tr>
                    <td style={{ ...tblCell, paddingLeft: 24 }}>{usk.vlastita}</td>
                    <td style={{ ...tblCell, fontWeight: 600 }}>{totalVlastiti.toLocaleString()} KM</td>
                  </tr>
                  <tr>
                    <td style={{ ...tblCell, paddingLeft: 24 }}>{usk.tudja}</td>
                    <td style={{ ...tblCell, fontWeight: 600 }}>{totalTudi.toLocaleString()} KM</td>
                  </tr>
                  <tr>
                    <td style={{ ...tblTotal, background: Math.abs(totalSredstva - totalIzvori) < 0.01 ? C.green : C.red }}>{usk.razlika}</td>
                    <td style={{ ...tblTotal, background: Math.abs(totalSredstva - totalIzvori) < 0.01 ? C.green : C.red }}>
                      {(totalSredstva - totalIzvori).toLocaleString()} KM
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ padding: "12px 20px", background: C.redLight, fontSize: 13, fontWeight: 600, color: C.redDark }}>
                {t("vodic.investicije.note")}
              </div>
            </div>

            {/* Balance check badge */}
            <div style={{ marginTop: 20 }}>
              <Badge
                ok={Math.abs(totalSredstva - totalIzvori) < 0.01 && totalSredstva > 0}
                text={
                  totalSredstva === 0
                    ? t("vodic.investicije.badgeEmpty")
                    : Math.abs(totalSredstva - totalIzvori) < 0.01
                    ? t("vodic.investicije.badgeOk")
                    : t("vodic.investicije.badgeDiff", { diff: (totalSredstva - totalIzvori).toLocaleString() })
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

        const bil = t("vodic.bilans");
        const bA = bil.a;
        const bP = bil.p;
        const bS = bil.sections;
        const rows = [
          { type: "section", aLabel: bS.stalna, aValue: ukAktStalna, pLabel: bS.kapital, pValue: ukKapital },
          { type: "row", aRb: "1.", aLabel: bA.nematerijalnaUlaganja, aKey: "nematerijalna", pRb: "1.", pLabel: bP.vlastitiKapital, pKey: "vlastitiKapital" },
          { type: "row", aRb: "2.", aLabel: bA.materijalnaUlaganja, aKey: null, pRb: "2.", pLabel: bP.ostaloKapital, pKey: "ostaloKapital" },
          { type: "sub", aLabel: bA.zemljiste, aKey: "zemljiste", pRb: "", pLabel: "", pKey: null },
          { type: "sub", aLabel: bA.objekti, aKey: "objekti", pRb: "", pLabel: "", pKey: null },
          { type: "sub", aLabel: bA.oprema, aKey: "oprema", pRb: "", pLabel: "", pKey: null },
          { type: "row", aRb: "3.", aLabel: bA.ostalaStalna, aKey: "ostalaStalna", pRb: "", pLabel: "", pKey: null },
          { type: "section", aLabel: bS.tekuca, aValue: ukAktTekuca, pLabel: bS.dugorocne, pValue: ukDugorocne },
          { type: "row", aRb: "4.", aLabel: bA.zalihe, aKey: "zalihe", pRb: "3.", pLabel: bP.dugorocniKredit, pKey: "dugorocniKredit" },
          { type: "row", aRb: "5.", aLabel: bA.potrazivanja, aKey: "potrazivanja", pRb: "4.", pLabel: bP.ostaleDugorocne, pKey: "ostaleDugorocne" },
          { type: "row_psection", aRb: "6.", aLabel: bA.gotovina, aKey: "gotovina", pLabel: bS.kratkorocne, pValue: ukKratkorocne },
          { type: "row", aRb: "7.", aLabel: bA.ostalaTekuca, aKey: "ostalaTekuca", pRb: "5.", pLabel: bP.dobavljaci, pKey: "dobavljaci" },
          { type: "row", aRb: "", aLabel: "", aKey: null, pRb: "6.", pLabel: bP.kratkorocniKrediti, pKey: "kratkorocniKrediti" },
          { type: "row", aRb: "", aLabel: "", aKey: null, pRb: "7.", pLabel: bP.ostaleKratkorocne, pKey: "ostaleKratkorocne" },
        ];

        return (
          <div>
            <div style={sectionTitle}>{t("vodic.bilansPoc.title")}</div>

            {/* Date input */}
            <div style={{ ...card, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: 20 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.redDark }}>{t("vodic.bilansPoc.dateLabel")}</span>
              <DateDMY value={data.bilansDatum} onChange={(v) => set("bilansDatum", v)} />
              <span style={{ fontSize: 14, color: C.textMuted }}>{t("vodic.bilansPoc.dateHint")}</span>
            </div>

            {/* Main bilans table */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th style={{ ...bh, width: "5%" }}>{bil.thRb}</th>
                      <th style={{ ...bh, width: "28%" }}>{bil.thAktiva}</th>
                      <th style={{ ...bh, width: "17%", borderRight: divider }}>{bil.thIznos}</th>
                      <th style={{ ...bh, width: "5%" }}>{bil.thRb}</th>
                      <th style={{ ...bh, width: "28%" }}>{bil.thPasiva}</th>
                      <th style={{ ...bh, width: "17%" }}>{bil.thIznos}</th>
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
                      <td colSpan={2} style={bt}>{bil.totalAktiva}</td>
                      <td style={{ ...bt, borderRight: divider }}>{ukAktiva.toLocaleString()} KM</td>
                      <td colSpan={2} style={bt}>{bil.totalPasiva}</td>
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
                    ? bil.badgeEmpty
                    : Math.abs(ukAktiva - ukPasiva) < 0.01
                    ? bil.badgeOk
                    : t("vodic.bilans.badgeDiff", {
                        aktiva: ukAktiva.toLocaleString(),
                        pasiva: ukPasiva.toLocaleString(),
                        diff: (ukAktiva - ukPasiva).toLocaleString(),
                      })
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

        const bil = t("vodic.bilans");
        const bA = bil.a;
        const bP = bil.p;
        const bS = bil.sections;
        const rows = [
          { type: "section", aLabel: bS.stalna, aValue: ukAktStalna, pLabel: bS.kapital, pValue: ukKapital },
          { type: "row", aRb: "1.", aLabel: bA.nematerijalnaSredstva, aKey: "nematerijalna", pRb: "1.", pLabel: bP.vlastitiKapital, pKey: "vlastitiKapital" },
          { type: "row", aRb: "2.", aLabel: bA.materijalnaSredstva, aKey: null, pRb: "2.", pLabel: bP.akumuliranaDobit, pKey: "akumuliranaDobit" },
          { type: "sub", aLabel: bA.zemljiste, aKey: "zemljiste", pRb: "", pLabel: "", pKey: null },
          { type: "sub", aLabel: bA.objekti, aKey: "objekti", pRb: "", pLabel: "", pKey: null },
          { type: "sub", aLabel: bA.oprema, aKey: "oprema", pRb: "", pLabel: "", pKey: null },
          { type: "row", aRb: "3.", aLabel: bA.ostalaStalna, aKey: "ostalaStalna", pRb: "", pLabel: "", pKey: null },
          { type: "section", aLabel: bS.tekuca, aValue: ukAktTekuca, pLabel: bS.dugorocne, pValue: ukDugorocne },
          { type: "row", aRb: "4.", aLabel: bA.zalihe, aKey: "zalihe", pRb: "3.", pLabel: bP.dugorocniKredit, pKey: "dugorocniKredit" },
          { type: "row", aRb: "5.", aLabel: bA.potrazivanja, aKey: "potrazivanja", pRb: "4.", pLabel: bP.ostaleDugorocne, pKey: "ostaleDugorocne" },
          { type: "row_psection", aRb: "6.", aLabel: bA.novac, aKey: "novac", pLabel: bS.kratkorocne, pValue: ukKratkorocne },
          { type: "row", aRb: "7.", aLabel: bA.ostalaTekuca, aKey: "ostalaTekuca", pRb: "5.", pLabel: bP.dobavljaci, pKey: "dobavljaci" },
          { type: "row", aRb: "", aLabel: "", aKey: null, pRb: "6.", pLabel: bP.kratkorocniKrediti, pKey: "kratkorocniKrediti" },
          { type: "row", aRb: "", aLabel: "", aKey: null, pRb: "7.", pLabel: bP.ostaleKratkorocne, pKey: "ostaleKratkorocne" },
        ];

        return (
          <div>
            <div style={sectionTitle}>{t("vodic.bilansKraj.title")}</div>

            {/* Date input */}
            <div style={{ ...card, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", padding: 20 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.redDark }}>{t("vodic.bilansKraj.dateLabel")}</span>
              <DateDMY value={data.bilansKrajDatum} onChange={(v) => set("bilansKrajDatum", v)} />
              <span style={{ fontSize: 14, color: C.textMuted }}>{t("vodic.bilansKraj.dateHint")}</span>
            </div>

            {/* Main bilans table */}
            <div style={{ ...card, padding: 0, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th style={{ ...bh, width: "5%" }}>{bil.thRb}</th>
                      <th style={{ ...bh, width: "28%" }}>{bil.thAktiva}</th>
                      <th style={{ ...bh, width: "17%", borderRight: divider }}>{bil.thIznos}</th>
                      <th style={{ ...bh, width: "5%" }}>{bil.thRb}</th>
                      <th style={{ ...bh, width: "28%" }}>{bil.thPasiva}</th>
                      <th style={{ ...bh, width: "17%" }}>{bil.thIznos}</th>
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
                      <td colSpan={2} style={bt}>{bil.totalAktiva}</td>
                      <td style={{ ...bt, borderRight: divider }}>{ukAktiva.toLocaleString()} KM</td>
                      <td colSpan={2} style={bt}>{bil.totalPasiva}</td>
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
                    ? bil.badgeEmpty
                    : Math.abs(ukAktiva - ukPasiva) < 0.01
                    ? bil.badgeOk
                    : t("vodic.bilans.badgeDiff", {
                        aktiva: ukAktiva.toLocaleString(),
                        pasiva: ukPasiva.toLocaleString(),
                        diff: (ukAktiva - ukPasiva).toLocaleString(),
                      })
                }
              />
            </div>
          </div>
        );
      }

      case "plan_prodaje": {
        const pp = t("vodic.planProdaje");
        const prodajaHeaders = [
          pp.thNum, pp.thProizvod, pp.thCijena, pp.thMjesecni,
          t("vodic.planProdaje.thGodisnji", { year: 2026 }),
          t("vodic.planProdaje.thGodisnji", { year: 2027 }),
          t("vodic.planProdaje.thGodisnji", { year: 2028 }),
          t("vodic.planProdaje.thGodisnji", { year: 2029 }),
          t("vodic.planProdaje.thGodisnji", { year: 2030 }),
          "",
        ];
        return (
          <div>
            <div style={sectionTitle}>{pp.title}</div>
            <p style={sectionSub}>{pp.sub}</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: C.red, color: C.white }}>
                    {prodajaHeaders.map((h, hi) => (
                      <th key={hi} style={{ padding: "10px 8px", textAlign: "left", fontWeight: 700, fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.prodaja.map((p, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: 8, fontWeight: 600 }}>{i + 1}.</td>
                      <td style={{ padding: 4 }}>
                        <input style={{ ...inputStyle, width: 140 }} value={p.naziv} onChange={(e) => set(`prodaja.${i}.naziv`, e.target.value)} placeholder={pp.phNaziv} />
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
                            title={t("vodic.common.deleteRow")}
                          >
                            ×
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: C.redLight, fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: 10 }}>{t("vodic.common.total")}</td>
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
              <span style={{ fontSize: 20, lineHeight: 1 }}>+</span> {t("vodic.common.addRow")}
            </button>
            {/* Auto checker: mj × 12 vs god */}
            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.prodaja.filter((p) => p.naziv && num(p.mj2026) > 0).map((p, i) => {
                const expected = num(p.mj2026) * 12;
                const actual = num(p.god2026);
                const ok = actual > 0 && Math.abs(expected - actual) <= expected * 0.2;
                return <Badge key={i} ok={ok} text={t("vodic.planProdaje.badge", { name: p.naziv, expected: expected.toLocaleString(), actual: actual.toLocaleString() })} />;
              })}
            </div>
          </div>
        );
      }

      case "plan_troskova":
        return (
          <div>
            <div style={sectionTitle}>{t("vodic.planTroskova.title")}</div>
            <p style={sectionSub}>{t("vodic.planTroskova.sub")}</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: C.red, color: C.white }}>
                    <th style={{ padding: "10px 8px", textAlign: "left", fontWeight: 700, minWidth: 260 }}>{t("vodic.planTroskova.thStruktura")}</th>
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
                    <td style={{ padding: 10, fontWeight: 800, color: C.white, fontSize: 14 }}>{t("vodic.planTroskova.totalRow")}</td>
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
                  return <Badge ok={ok} text={t("vodic.planTroskova.badge", { expected: expected.toLocaleString(), actual: godTotal.toLocaleString() })} />;
                }
                return null;
              })()}
            </div>
          </div>
        );

      case "amortizacija": {
        const amT = t("vodic.amortizacija");
        const amortHeaders = [amT.thOpis, amT.thNabavna, amT.thStopa, "2026", "2027", "2028", "2029", "2030", amT.thUkupno, ""];
        const legalRows = amT.legalRows;
        return (
          <div>
            <div style={sectionTitle}>{amT.title}</div>
            <p style={sectionSub}>{amT.sub}</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: C.red, color: C.white }}>
                    {amortHeaders.map((h, hi) => (
                      <th key={hi} style={{ padding: "10px 8px", textAlign: "left", fontWeight: 700 }}>{h}</th>
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
                          <input style={{ ...inputStyle, width: 160 }} value={a.opis} onChange={(e) => set(`amort.${i}.opis`, e.target.value)} placeholder={amT.phOpis} />
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
                              title={t("vodic.common.deleteRow")}
                            >×</button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{ background: C.redLight, fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: 10 }}>{t("vodic.common.total")}</td>
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
              <span style={{ fontSize: 20, lineHeight: 1 }}>+</span> {t("vodic.common.addRow")}
            </button>
            <div style={{ ...card, marginTop: 16, background: C.redLight, borderColor: C.redMid, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.redDark }}>
                {amT.note}
              </div>
            </div>

            {/* Legal reference: Zakon o porezu na dobit, Član 19 */}
            <div style={{ ...card, marginTop: 16, padding: 0, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, background: C.redLight }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.redDark }}>{amT.legalTitle}</div>
              </div>
              <div style={{ padding: 20 }}>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 14 }}>
                  {amT.legal1}
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>
                  {amT.legal2}
                </p>
                <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13, marginBottom: 16 }}>
                  <tbody>
                    {legalRows.map(([slovo, opis, stopa], i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                        <td style={{ padding: "8px 6px", fontWeight: 700, color: C.red, width: 28 }}>{slovo}</td>
                        <td style={{ padding: "8px 6px", color: C.text }}>{opis}</td>
                        <td style={{ padding: "8px 6px", fontWeight: 700, color: C.redDark, textAlign: "right", width: 70 }}>{stopa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, marginBottom: 10 }}>
                  {amT.legal4}
                </p>
                <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>
                  {amT.legal5}
                </p>
              </div>
            </div>
          </div>
        );
      }

      case "kredit": {
        const kr = t("vodic.kredit");
        const kh = { background: C.red, color: C.white, padding: "10px 8px", textAlign: "right", fontWeight: 700, fontSize: 12 };
        const kc = { padding: "6px 8px", borderBottom: `1px solid ${C.border}`, fontSize: 13, textAlign: "right" };
        const fmt = (v) => num(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        return (
          <div>
            <div style={sectionTitle}>{kr.title}</div>

            {/* Inicijalni podaci */}
            <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 24 }}>
              <div style={{ padding: "14px 20px", background: C.redLight, borderBottom: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: C.redDark }}>{kr.initTitle}</div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <Field lbl={kr.iznosLbl} tip={kr.iznosTip}>
                      <TableInput value={data.kredit.iznos} onChange={(v) => set("kredit.iznos", v)} width="100%" />
                    </Field>
                    <Field lbl={kr.kamataLbl} tip={kr.kamataTip}>
                      <TableInput value={data.kredit.kamata} onChange={(v) => set("kredit.kamata", v)} width="100%" />
                    </Field>
                    <Field lbl={kr.rokLbl} tip={kr.rokTip}>
                      <TableInput value={data.kredit.rok} onChange={(v) => set("kredit.rok", v)} width="100%" />
                    </Field>
                  </div>
                  <div>
                    <Field lbl={kr.ucesceLbl} tip={kr.ucesceTip}>
                      <TableInput value={data.kredit.ucesce} onChange={(v) => set("kredit.ucesce", v)} width="100%" />
                    </Field>
                    <Field lbl={kr.graceLbl} tip={kr.graceTip}>
                      <TableInput value={data.kredit.grace} onChange={(v) => set("kredit.grace", v)} width="100%" />
                    </Field>
                    <Field lbl={kr.datumLbl} tip={kr.datumTip}>
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
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.redDark }}>{kr.calcTitle}</div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 14 }}>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}><strong>{kr.osnovica}</strong></div>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textAlign: "right" }}>{fmt(kreditInfo.osnovica)} KM</div>

                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}><strong>{kr.graceKamata}</strong></div>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textAlign: "right" }}>{fmt(kreditInfo.graceKamata)} KM</div>

                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}><strong>{kr.kamataUOtplati}</strong></div>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textAlign: "right" }}>{fmt(kreditInfo.kamatuUOtplati)} KM</div>

                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}><strong>{kr.ukupnaKamata}</strong></div>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textAlign: "right" }}>{fmt(kreditInfo.ukupnaKamata)} KM</div>

                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}><strong>{kr.ukupnoZaduzenje}</strong></div>
                      <div style={{ padding: "8px 0", borderBottom: `1px solid ${C.borderLight}`, textAlign: "right" }}>{fmt(kreditInfo.ukupnoZaduzenje)} KM</div>
                    </div>
                  </div>
                </div>

                {/* Iznos rate */}
                <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 24 }}>
                  <div style={{ padding: "14px 20px", background: C.redLight, borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.redDark }}>{kr.rataTitle}</div>
                  </div>
                  <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 14 }}>
                    <div style={{ padding: 16, background: C.bg, borderRadius: 10, textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>{kr.graceRata}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: C.red }}>{fmt(kreditInfo.graceRata)} KM</div>
                    </div>
                    <div style={{ padding: 16, background: C.bg, borderRadius: 10, textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>{kr.izracunataRata}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: C.red }}>{fmt(kreditInfo.rata)} KM</div>
                    </div>
                  </div>
                </div>

                {/* Otplatni plan tabela */}
                <div style={{ ...card, padding: 0, overflow: "hidden" }}>
                  <div style={{ padding: "14px 20px", background: C.redLight, borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.redDark }}>{kr.planTitle}</div>
                  </div>
                  <div style={{ overflowX: "auto", maxHeight: 500, overflowY: "auto" }}>
                    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                      <thead style={{ position: "sticky", top: 0 }}>
                        <tr>
                          <th style={{ ...kh, textAlign: "center" }}>{kr.thBr}</th>
                          <th style={kh}>{kr.thDatum}</th>
                          <th style={kh}>{kr.thZaduzenje}</th>
                          <th style={kh}>{kr.thKamata}</th>
                          <th style={kh}>{kr.thGlavnica}</th>
                          <th style={kh}>{kr.thOstatak}</th>
                          <th style={kh}>{kr.thKumKamata}</th>
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
        const nm = t("vodic.normativi");
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
            <div style={sectionTitle}>{nm.title}</div>
            <p style={sectionSub}>{nm.sub}</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{ ...nh, textAlign: "left", minWidth: 200 }} rowSpan={2}>{nm.thSirovine}</th>
                    <th style={{ ...nh, minWidth: 90 }} rowSpan={2}>{nm.thJedMjere}</th>
                    <th style={{ ...nh, minWidth: 110 }} rowSpan={2}>{nm.thCijena}</th>
                    {proizvodi.map((_, pi) => (
                      <th key={pi} style={{ ...nh, minWidth: 130 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                          <span>{t("vodic.normativi.productNo", { n: pi + 1 })}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <input
                              value={proizvodi[pi]}
                              onChange={(e) => set(`normativiProizvodi.${pi}`, e.target.value)}
                              placeholder={nm.phProductName}
                              style={{ width: "100%", padding: "5px 8px", borderRadius: 6, border: "none", fontSize: 12, textAlign: "center", color: C.text }}
                            />
                            {proizvodi.length > 1 && (
                              <button
                                onClick={() => removeProduct(pi)}
                                title={nm.deleteProduct}
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
                        title={nm.addProduct}
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
                            placeholder={nm.phSirovina}
                          />
                        </div>
                      </td>
                      <td style={{ padding: 4 }}>
                        <input
                          style={{ ...inputStyle, width: 80, textAlign: "center" }}
                          value={n.jedMjere}
                          onChange={(e) => set(`normativi.${i}.jedMjere`, e.target.value)}
                          placeholder={nm.phJedMjere}
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
                            title={t("vodic.common.deleteRow")}
                          >×</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Cijena koštanja po proizvodu — zbir (normativ × cijena) za svaki proizvod */}
                  <tr style={{ background: C.redLight, fontWeight: 700 }}>
                    <td colSpan={3} style={{ padding: 10 }}>{nm.totalRow}</td>
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
              <span style={{ fontSize: 20, lineHeight: 1 }}>+</span> {t("vodic.common.addRow")}
            </button>
            <div style={{ ...card, marginTop: 16, background: C.redLight, borderColor: C.redMid, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.redDark }}>
                {nm.note}
              </div>
            </div>
          </div>
        );
      }

      case "bilans_uspjeha": {
        const bu = t("vodic.bilansUspjeha");
        return (
          <div>
            <div style={sectionTitle}>{bu.title}</div>
            <p style={sectionSub}>{bu.sub}</p>
            <Field lbl={bu.ostaliPrihodiLbl}>
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
                    <th style={{ padding: 10, textAlign: "left" }}>{bu.thElementi}</th>
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

                    addRow(bu.rowPrihodi, ukPrihodi, true, C.redLight);
                    addRow(bu.rowProdaja, prihodi, false);
                    addRow(bu.rowOstali, data.ostaliPrihodi.map(num), false);
                    addRow(bu.rowRashodi, ukupniTroskovi, true, C.redLight);
                    addRow(bu.rowBruto, brutoDobit, true);
                    addRow(bu.rowPorez, porez, false);
                    addRow(bu.rowNeto, netoDobit, true, C.greenBg);
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
                    text={t("vodic.bilansUspjeha.badge", {
                      year: 2026 + i,
                      status: profit >= 0 ? bu.profitable : bu.loss,
                      amount: profit.toLocaleString(),
                    })}
                  />
                );
              })}
            </div>
          </div>
        );
      }

      case "sazetak": {
        const sz = t("vodic.sazetak");
        const stats = sz.stats;
        return (
          <div>
            <div style={sectionTitle}>{sz.title}</div>
            <p style={sectionSub}>{sz.sub}</p>

            <button
              style={{ ...btnPrimary, marginBottom: 24 }}
              onClick={() => validate()}
            >
              {sz.runCheck}
            </button>

            {errors.length > 0 && (
              <div style={{ ...card, background: C.errorBg, borderColor: C.redMid }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.red, marginBottom: 12 }}>
                  {errors.length === 1 ? t("vodic.sazetak.problemsOne", { n: errors.length }) : t("vodic.sazetak.problemsMany", { n: errors.length })}
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
                  {sz.allOk}
                </div>
              </div>
            )}

            <Field lbl={sz.sazetakLbl} tip={sz.sazetakTip}>
              <textarea
                style={{ ...textareaStyle, minHeight: 140 }}
                value={data.sazetak}
                onChange={(e) => set("sazetak", e.target.value)}
                placeholder={sz.sazetakPh}
              />
            </Field>

            {/* Quick stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginTop: 12 }}>
              {[
                [stats.ulaganja, `${totalSredstva.toLocaleString()} KM`],
                [stats.vlastiti, `${totalVlastiti.toLocaleString()} KM`],
                [stats.tudji, `${totalTudi.toLocaleString()} KM`],
                [stats.prihodi, `${prihodi[0].toLocaleString()} KM`],
                [stats.troskovi, `${ukupniTroskovi[0].toLocaleString()} KM`],
                [stats.neto, `${((prihodi[0] + num(data.ostaliPrihodi[0]) - ukupniTroskovi[0]) * 0.9).toLocaleString(undefined, { maximumFractionDigits: 0 })} KM`],
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
                {pdfExporting ? sz.pdfExporting : sz.pdfExport}
              </button>
              <p style={{ fontSize: 12, color: C.textMuted, marginTop: 10 }}>
                {sz.pdfNote}
              </p>
            </div>
          </div>
        );
      }

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

  const pdfT = t("pdf");
  const pdfInv = pdfT.inv;
  const pdfIzv = pdfT.izv;
  const pdfBil = pdfT.bil;

  const printReport = (
    <div ref={printReportRef} style={{ display: "none" }}>
      <div style={pr.page}>
        <div style={pr.h1}>{t("pdf.docTitle", { name: data.naziv || t("pdf.untitled") })}</div>
        <div style={pr.metaLine}>
          {pdfT.authors}: {data.autori || "—"} &nbsp;|&nbsp; {pdfT.university} &nbsp;|&nbsp;
          {pdfT.generated}: {new Date().toLocaleDateString(dateLocale)}
        </div>

        {/* 1. Ključna strategija */}
        <div style={pr.section}>
          <div style={pr.h2}>{pdfT.s1}</div>
          <div style={pr.h3}>{pdfT.vizija}</div><div style={pr.p}>{data.vizija || "—"}</div>
          <div style={pr.h3}>{pdfT.misija}</div><div style={pr.p}>{data.misija || "—"}</div>
          <div style={pr.h3}>{pdfT.proizvod}</div><div style={pr.p}>{data.proizvod || "—"}</div>
          <div style={pr.h3}>{pdfT.novaVrijednost}</div><div style={pr.p}>{data.novaVrijednost || "—"}</div>
          <div style={pr.h3}>{pdfT.ciljnoTrziste}</div><div style={pr.p}>{data.ciljnoTrziste || "—"}</div>
        </div>

        {/* 2. Resursi & SWOT */}
        <div style={pr.section}>
          <div style={pr.h2}>{pdfT.s2}</div>
          <div style={pr.h3}>{pdfT.kompetencije}</div><div style={pr.p}>{data.kompetencije || "—"}</div>
          <div style={pr.h3}>{pdfT.imovina}</div><div style={pr.p}>{data.imovina || "—"}</div>
          <table data-pdf-table="keep" style={pr.table}>
            <thead><tr><th style={pr.th}>{pdfT.snage}</th><th style={pr.th}>{pdfT.slabosti}</th><th style={pr.th}>{pdfT.mogucnosti}</th><th style={pr.th}>{pdfT.prijetnje}</th></tr></thead>
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
          <div style={pr.h2}>{pdfT.s3}</div>
          <div style={pr.h3}>{pdfT.proizvodnja}</div><div style={pr.p}>{data.proizvodnja || "—"}</div>
          <div style={pr.h3}>{pdfT.promocija}</div><div style={pr.p}>{data.promocija || "—"}</div>
          <div style={pr.h3}>{pdfT.partneri}</div><div style={pr.p}>{data.partneri || "—"}</div>
        </div>

        {/* 4a. Izvori i upotreba kapitala */}
        <div style={pr.section}>
          <div style={pr.h2}>{pdfT.s4a}</div>
          <table data-pdf-table="keep" style={pr.table}>
            <thead><tr><th style={pr.th}>{pdfT.thSredstva}</th><th style={pr.th}>{pdfT.thIznosKM}</th></tr></thead>
            <tbody>
              <tr><td style={{ ...pr.td, fontWeight: 700 }}>{pdfT.stalnaSredstva}</td><td style={pr.tdR}>{fmt(totalStalna)}</td></tr>
              {[[pdfInv.zemljiste, data.inv.zemljiste], [pdfInv.zgrade, data.inv.zgrade], [pdfInv.oprema, data.inv.oprema], [pdfInv.vozila, data.inv.vozila], [pdfInv.inventar, data.inv.inventar], [pdfInv.osnivacka, data.inv.osnivacka], [pdfInv.nematerijalna, data.inv.nematerijalna]].map(([l, v]) => (
                <tr key={l}><td style={pr.td}>{l}</td><td style={pr.tdR}>{fmt(v)}</td></tr>
              ))}
              <tr><td style={{ ...pr.td, fontWeight: 700 }}>{pdfT.tekucaSredstva}</td><td style={pr.tdR}>{fmt(totalTekuca)}</td></tr>
              {[[pdfInv.zalihe, data.inv.zalihe], [pdfInv.potrazivanja, data.inv.potrazivanja], [pdfInv.gotovina, data.inv.gotovina]].map(([l, v]) => (
                <tr key={l}><td style={pr.td}>{l}</td><td style={pr.tdR}>{fmt(v)}</td></tr>
              ))}
              <tr style={pr.totalRow}><td style={pr.td}>{pdfT.ukupnoSredstva}</td><td style={pr.tdR}>{fmt(totalSredstva)}</td></tr>
            </tbody>
          </table>
          <table data-pdf-table="keep" style={pr.table}>
            <thead><tr><th style={pr.th}>{pdfT.thIzvori}</th><th style={pr.th}>{pdfT.thIznosKM}</th></tr></thead>
            <tbody>
              <tr><td style={{ ...pr.td, fontWeight: 700 }}>{pdfT.vlastitiIzvori}</td><td style={pr.tdR}>{fmt(totalVlastiti)}</td></tr>
              {[[pdfIzv.novac, data.izv.novac], [pdfIzv.zemljiste, data.izv.zemljiste_v], [pdfIzv.gradevine, data.izv.gradevine_v], [pdfIzv.oprema, data.izv.oprema_v], [pdfIzv.ostalo, data.izv.ostalo_v]].map(([l, v]) => (
                <tr key={l}><td style={pr.td}>{l}</td><td style={pr.tdR}>{fmt(v)}</td></tr>
              ))}
              <tr><td style={{ ...pr.td, fontWeight: 700 }}>{pdfT.kreditiTudi}</td><td style={pr.tdR}>{fmt(totalTudi)}</td></tr>
              {[[pdfIzv.dugorocni, data.izv.dugorocni], [pdfIzv.kratkorocni, data.izv.kratkorocni], [pdfIzv.ostaliTudi, data.izv.ostali_tudi]].map(([l, v]) => (
                <tr key={l}><td style={pr.td}>{l}</td><td style={pr.tdR}>{fmt(v)}</td></tr>
              ))}
              <tr style={pr.totalRow}><td style={pr.td}>{pdfT.ukupnoIzvori}</td><td style={pr.tdR}>{fmt(totalIzvori)}</td></tr>
            </tbody>
          </table>
        </div>

        {/* 4b. Početni bilans stanja */}
        <div style={pr.section}>
          <div style={pr.h2}>{t("pdf.s4b", { date: fmtDate(data.bilansDatum) })}</div>
          <table data-pdf-table="keep" style={pr.table}>
            <thead><tr><th style={pr.th}>{pdfT.thAktiva}</th><th style={pr.th}>{pdfT.thIznos}</th><th style={pr.th}>{pdfT.thPasiva}</th><th style={pr.th}>{pdfT.thIznos}</th></tr></thead>
            <tbody>
              <tr><td style={pr.td}>{pdfBil.nematerijalnaUlaganja}</td><td style={pr.tdR}>{fmt(data.bilansAktiva.nematerijalna)}</td><td style={pr.td}>{pdfBil.vlastitiKapital}</td><td style={pr.tdR}>{fmt(data.bilansPasiva.vlastitiKapital)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.zemljiste}</td><td style={pr.tdR}>{fmt(data.bilansAktiva.zemljiste)}</td><td style={pr.td}>{pdfBil.ostaloGrantovi}</td><td style={pr.tdR}>{fmt(data.bilansPasiva.ostaloKapital)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.objekti}</td><td style={pr.tdR}>{fmt(data.bilansAktiva.objekti)}</td><td style={pr.td}>{pdfBil.dugorocniKredit}</td><td style={pr.tdR}>{fmt(data.bilansPasiva.dugorocniKredit)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.oprema}</td><td style={pr.tdR}>{fmt(data.bilansAktiva.oprema)}</td><td style={pr.td}>{pdfBil.ostaleDugorocne}</td><td style={pr.tdR}>{fmt(data.bilansPasiva.ostaleDugorocne)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.ostalaStalna}</td><td style={pr.tdR}>{fmt(data.bilansAktiva.ostalaStalna)}</td><td style={pr.td}>{pdfBil.dobavljaci}</td><td style={pr.tdR}>{fmt(data.bilansPasiva.dobavljaci)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.zalihe}</td><td style={pr.tdR}>{fmt(data.bilansAktiva.zalihe)}</td><td style={pr.td}>{pdfBil.kratkorocniKrediti}</td><td style={pr.tdR}>{fmt(data.bilansPasiva.kratkorocniKrediti)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.potrazivanja}</td><td style={pr.tdR}>{fmt(data.bilansAktiva.potrazivanja)}</td><td style={pr.td}>{pdfBil.ostaleKratkorocne}</td><td style={pr.tdR}>{fmt(data.bilansPasiva.ostaleKratkorocne)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.gotovina}</td><td style={pr.tdR}>{fmt(data.bilansAktiva.gotovina)}</td><td style={pr.td}></td><td style={pr.tdR}></td></tr>
              <tr><td style={pr.td}>{pdfBil.ostalaTekuca}</td><td style={pr.tdR}>{fmt(data.bilansAktiva.ostalaTekuca)}</td><td style={pr.td}></td><td style={pr.tdR}></td></tr>
              <tr style={pr.totalRow}>
                <td style={pr.td}>{pdfT.ukupnoAktiva}</td>
                <td style={pr.tdR}>{fmt(num(data.bilansAktiva.nematerijalna) + num(data.bilansAktiva.zemljiste) + num(data.bilansAktiva.objekti) + num(data.bilansAktiva.oprema) + num(data.bilansAktiva.ostalaStalna) + num(data.bilansAktiva.zalihe) + num(data.bilansAktiva.potrazivanja) + num(data.bilansAktiva.gotovina) + num(data.bilansAktiva.ostalaTekuca))}</td>
                <td style={pr.td}>{pdfT.ukupnoPasiva}</td>
                <td style={pr.tdR}>{fmt(num(data.bilansPasiva.vlastitiKapital) + num(data.bilansPasiva.ostaloKapital) + num(data.bilansPasiva.dugorocniKredit) + num(data.bilansPasiva.ostaleDugorocne) + num(data.bilansPasiva.dobavljaci) + num(data.bilansPasiva.kratkorocniKrediti) + num(data.bilansPasiva.ostaleKratkorocne))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4c. Plan prodaje */}
        <div style={pr.section}>
          <div style={pr.h2}>{pdfT.s4c}</div>
          <table data-pdf-table="keep" style={pr.table}>
            <thead><tr>
              <th style={pr.th}>{pdfT.thNum}</th><th style={pr.th}>{pdfT.thProizvod}</th><th style={pr.th}>{pdfT.thCijena}</th>
              <th style={pr.th}>{pdfT.thMjPlan}</th><th style={pr.th}>{pdfT.thGod2026}</th><th style={pr.th}>2027</th><th style={pr.th}>2028</th><th style={pr.th}>2029</th><th style={pr.th}>2030</th>
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
                <td style={pr.td} colSpan={4}>{pdfT.ukupno}</td>
                {prihodi.map((v, i) => <td key={i} style={pr.tdR}>{fmt(v)}</td>)}
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4d. Plan troškova */}
        <div style={pr.section}>
          <div style={pr.h2}>{pdfT.s4d}</div>
          <table data-pdf-table="keep" style={pr.table}>
            <thead><tr><th style={pr.th}>{pdfT.thStruktura}</th>{costsLabels.map((h) => <th key={h} style={pr.th}>{h}</th>)}</tr></thead>
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
                <td style={pr.td}>{pdfT.ukupnoTroskovi}</td>
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
          <div style={pr.h2}>{pdfT.s4e}</div>
          <table data-pdf-table="keep" style={pr.table}>
            <thead><tr><th style={pr.th}>{pdfT.thOpis}</th><th style={pr.th}>{pdfT.thNabavna}</th><th style={pr.th}>{pdfT.thStopa}</th><th style={pr.th}>2026</th><th style={pr.th}>2027</th><th style={pr.th}>2028</th><th style={pr.th}>2029</th><th style={pr.th}>2030</th><th style={pr.th}>{pdfT.thUkupnoCol}</th></tr></thead>
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
                <td style={pr.td} colSpan={3}>{pdfT.ukupno}</td>
                {amortGodisnje.map((v, i) => <td key={i} style={pr.tdR}>{fmt(v)}</td>)}
                <td style={pr.tdR}>{fmt(amortGodisnje.reduce((a, b) => a + b, 0))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4f. Otplatni plan kredita */}
        <div style={pr.section}>
          <div style={pr.h2}>{pdfT.s4f}</div>
          {kreditInfo ? (
            <>
              <div style={pr.p}>
                {t("pdf.kreditSummary", { iznos: fmt(data.kredit.iznos), ucesce: fmt(data.kredit.ucesce), osnovica: fmt(kreditInfo.osnovica), kamata: fmt(data.kredit.kamata) })}<br />
                {t("pdf.kreditSummary2", { rok: fmt(data.kredit.rok), grace: fmt(data.kredit.grace), datum: fmtDate(data.kredit.datumPrveRate) })}<br />
                {t("pdf.kreditSummary3", { graceRata: fmt(kreditInfo.graceRata), rata: fmt(kreditInfo.rata) })}<br />
                {t("pdf.kreditSummary4", { kamata: fmt(kreditInfo.ukupnaKamata) })}<strong>{t("pdf.kreditSummary5", { zaduzenje: fmt(kreditInfo.ukupnoZaduzenje) })}</strong>
              </div>
              <table data-pdf-table="split" style={pr.table}>
                <thead><tr><th style={pr.th}>{pdfT.thBr}</th><th style={pr.th}>{pdfT.thDatum}</th><th style={pr.th}>{pdfT.thZaduzenje}</th><th style={pr.th}>{pdfT.thKamata}</th><th style={pr.th}>{pdfT.thGlavnica}</th><th style={pr.th}>{pdfT.thOstatak}</th><th style={pr.th}>{pdfT.thKumKamata}</th></tr></thead>
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
          ) : <div style={pr.p}>{pdfT.kreditNedefinisan}</div>}
        </div>

        {/* 4g. Normativi */}
        <div style={pr.section}>
          <div style={pr.h2}>{pdfT.s4g}</div>
          <table data-pdf-table="keep" style={pr.table}>
            <thead><tr>
              <th style={pr.th}>{pdfT.thSirovina}</th><th style={pr.th}>{pdfT.thJedMjere}</th><th style={pr.th}>{pdfT.thCijenaJed}</th>
              {data.normativiProizvodi.map((p, pi) => <th key={pi} style={pr.th}>{p || t("pdf.productNo", { n: pi + 1 })}</th>)}
            </tr></thead>
            <tbody>
              {data.normativi.map((n, i) => (
                <tr key={i}>
                  <td style={pr.td}>{n.naziv || "—"}</td><td style={pr.td}>{n.jedMjere || "—"}</td><td style={pr.tdR}>{fmt(n.cijena)}</td>
                  {n.kolicine.map((k, ki) => <td key={ki} style={pr.tdR}>{fmt(k)}</td>)}
                </tr>
              ))}
              <tr style={pr.totalRow}>
                <td style={pr.td} colSpan={3}>{pdfT.normativiTotal}</td>
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
          <div style={pr.h2}>{pdfT.s4h}</div>
          <table data-pdf-table="keep" style={pr.table}>
            <thead><tr><th style={pr.th}>{pdfT.thElementi}</th>{[2026, 2027, 2028, 2029, 2030].map((y) => <th key={y} style={pr.th}>{y}.</th>)}</tr></thead>
            <tbody>
              {(() => {
                const ukPrihodi = prihodi.map((p, i) => p + num(data.ostaliPrihodi[i]));
                const brutoDobit = ukPrihodi.map((p, i) => p - ukupniTroskovi[i]);
                const porez = brutoDobit.map((d) => (d > 0 ? d * 0.1 : 0));
                const netoDobit = brutoDobit.map((d, i) => d - porez[i]);
                const R = [
                  [pdfT.rowPrihodi, ukPrihodi, true],
                  [pdfT.rowProdaja, prihodi, false],
                  [pdfT.rowOstali, data.ostaliPrihodi.map(num), false],
                  [pdfT.rowRashodi, ukupniTroskovi, true],
                  [pdfT.rowBruto, brutoDobit, true],
                  [pdfT.rowPorez, porez, false],
                  [pdfT.rowNeto, netoDobit, true],
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
          <div style={pr.h2}>{t("pdf.s4i", { date: fmtDate(data.bilansKrajDatum) })}</div>
          <table data-pdf-table="keep" style={pr.table}>
            <thead><tr><th style={pr.th}>{pdfT.thAktiva}</th><th style={pr.th}>{pdfT.thIznos}</th><th style={pr.th}>{pdfT.thPasiva}</th><th style={pr.th}>{pdfT.thIznos}</th></tr></thead>
            <tbody>
              <tr><td style={pr.td}>{pdfBil.nematerijalnaSredstva}</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.nematerijalna)}</td><td style={pr.td}>{pdfBil.vlastitiKapital}</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.vlastitiKapital)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.zemljiste}</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.zemljiste)}</td><td style={pr.td}>{pdfBil.akumuliranaDobit}</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.akumuliranaDobit)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.objekti}</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.objekti)}</td><td style={pr.td}>{pdfBil.dugorocniKredit}</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.dugorocniKredit)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.oprema}</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.oprema)}</td><td style={pr.td}>{pdfBil.ostaleDugorocne}</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.ostaleDugorocne)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.ostalaStalna}</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.ostalaStalna)}</td><td style={pr.td}>{pdfBil.dobavljaci}</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.dobavljaci)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.zalihe}</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.zalihe)}</td><td style={pr.td}>{pdfBil.kratkorocniKrediti}</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.kratkorocniKrediti)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.potrazivanja}</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.potrazivanja)}</td><td style={pr.td}>{pdfBil.ostaleKratkorocne}</td><td style={pr.tdR}>{fmt(data.bilansKrajPasiva.ostaleKratkorocne)}</td></tr>
              <tr><td style={pr.td}>{pdfBil.novac}</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.novac)}</td><td style={pr.td}></td><td style={pr.tdR}></td></tr>
              <tr><td style={pr.td}>{pdfBil.ostalaTekuca}</td><td style={pr.tdR}>{fmt(data.bilansKrajAktiva.ostalaTekuca)}</td><td style={pr.td}></td><td style={pr.tdR}></td></tr>
              <tr style={pr.totalRow}>
                <td style={pr.td}>{pdfT.ukupnoAktiva}</td>
                <td style={pr.tdR}>{fmt(num(data.bilansKrajAktiva.nematerijalna) + num(data.bilansKrajAktiva.zemljiste) + num(data.bilansKrajAktiva.objekti) + num(data.bilansKrajAktiva.oprema) + num(data.bilansKrajAktiva.ostalaStalna) + num(data.bilansKrajAktiva.zalihe) + num(data.bilansKrajAktiva.potrazivanja) + num(data.bilansKrajAktiva.novac) + num(data.bilansKrajAktiva.ostalaTekuca))}</td>
                <td style={pr.td}>{pdfT.ukupnoPasiva}</td>
                <td style={pr.tdR}>{fmt(num(data.bilansKrajPasiva.vlastitiKapital) + num(data.bilansKrajPasiva.akumuliranaDobit) + num(data.bilansKrajPasiva.dugorocniKredit) + num(data.bilansKrajPasiva.ostaleDugorocne) + num(data.bilansKrajPasiva.dobavljaci) + num(data.bilansKrajPasiva.kratkorocniKrediti) + num(data.bilansKrajPasiva.ostaleKratkorocne))}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sažetak */}
        <div style={pr.section}>
          <div style={pr.h2}>{pdfT.sazetak}</div>
          <div style={pr.p}>{data.sazetak || "—"}</div>
        </div>
      </div>
    </div>
  );

  const exportPDF = async () => {
    const node = printReportRef.current;
    if (!node || pdfExporting) return;

    const source = node.firstElementChild || node;
    const safeTitle = (data.naziv || t("pdf.fileFallback")).replace(/[<>"/\\|*?:]/g, "").trim() || t("pdf.fileFallback");
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
      const sideMargin = 10;
      // ~1 cm header + ~1 cm footer so content isn't cut at page edges
      const headerH = 12;
      const footerH = 12;
      const contentW = pageW - sideMargin * 2;
      const contentH = pageH - headerH - footerH;

      const scale = canvas.height / Math.max(1, clone.scrollHeight);
      const idealPagePx = Math.floor(contentH * (canvas.width / contentW));

      const rootTop = clone.getBoundingClientRect().top;

      // Keep-together tables (all except 4f). Include adjacent heading above table.
      const keepTables = Array.from(clone.querySelectorAll('table[data-pdf-table="keep"]')).map((el) => {
        let topEl = el;
        const prev = el.previousElementSibling;
        if (prev && (prev.textContent || "").trim().length < 160 && prev.children.length === 0) {
          topEl = prev;
        }
        const top = (topEl.getBoundingClientRect().top - rootTop) * scale;
        const bottom = (el.getBoundingClientRect().bottom - rootTop) * scale;
        return { top: Math.max(0, top - 4), bottom, height: bottom - top };
      });

      // 4f may split, but prefer breaking between rows
      const splitRowBreaks = [];
      clone.querySelectorAll('table[data-pdf-table="split"]').forEach((table) => {
        const rows = table.querySelectorAll("tr");
        rows.forEach((tr, idx) => {
          if (idx === 0) return; // don't break before first data row awkwardly mid-header alone if possible
          const y = (tr.getBoundingClientRect().top - rootTop) * scale;
          splitRowBreaks.push(y);
        });
        // also allow break after last row
        splitRowBreaks.push((table.getBoundingClientRect().bottom - rootTop) * scale);
      });
      splitRowBreaks.sort((a, b) => a - b);

      const snapToSplitRow = (idealY, pageStart) => {
        // nearest row boundary at or before idealY, after pageStart
        let best = null;
        for (const y of splitRowBreaks) {
          if (y <= pageStart + 8) continue;
          if (y <= idealY + 6) best = y;
          if (y > idealY + 6) break;
        }
        return best;
      };

      const avoidCuttingKeepTables = (idealY, pageStart) => {
        let breakY = idealY;
        for (const t of keepTables) {
          // Would this break cut through the table?
          if (breakY > t.top + 2 && breakY < t.bottom - 2) {
            // Move whole table to next page if it fits there and there's some content already on this page
            const fitsNextPage = t.height <= idealPagePx - 8;
            const hasContentBefore = t.top - pageStart > idealPagePx * 0.12;
            if (fitsNextPage && hasContentBefore) {
              breakY = Math.min(breakY, t.top);
            }
            // else table taller than a page — unavoidable split
          }
        }
        // If break still inside a keep table (too tall), leave it; white-snap later
        return Math.max(pageStart + 20, breakY);
      };

      // Prefer cutting on near-white rows so text isn't sliced mid-line
      const findBreakY = (idealY, pageStart) => {
        if (idealY >= canvas.height) return canvas.height;

        let candidate = avoidCuttingKeepTables(idealY, pageStart);

        // Inside 4f: snap to row boundary when possible
        const rowSnap = snapToSplitRow(candidate, pageStart);
        const inSplitTable = splitRowBreaks.length > 0
          && candidate >= (splitRowBreaks[0] || 0) - 20
          && candidate <= (splitRowBreaks[splitRowBreaks.length - 1] || 0) + 20;
        if (inSplitTable && rowSnap != null) {
          candidate = rowSnap;
        }

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const search = Math.min(40, Math.floor(idealPagePx * 0.06));
        const start = Math.max(pageStart + 10, candidate - search);
        const end = Math.min(canvas.height - 1, candidate + search);
        let bestY = candidate;
        let bestScore = -1;
        for (let y = start; y <= end; y += 2) {
          // Never white-snap back into a keep table interior
          const cutsKeep = keepTables.some((t) => y > t.top + 2 && y < t.bottom - 2 && t.height <= idealPagePx - 8);
          if (cutsKeep) continue;

          const row = ctx.getImageData(0, y, canvas.width, 1).data;
          let white = 0;
          let samples = 0;
          for (let i = 0; i < row.length; i += 20) {
            samples += 1;
            if (row[i] > 248 && row[i + 1] > 248 && row[i + 2] > 248) white += 1;
          }
          const whiteness = samples ? white / samples : 0;
          const dist = Math.abs(y - candidate) / (search || 1);
          const score = whiteness - dist * 0.2;
          if (score > bestScore) {
            bestScore = score;
            bestY = y;
          }
        }

        // Final guard: if still cutting a keep table, force break before it
        for (const t of keepTables) {
          if (bestY > t.top + 2 && bestY < t.bottom - 2 && t.height <= idealPagePx - 8 && t.top > pageStart + 20) {
            bestY = t.top;
          }
        }
        return bestY;
      };

      const breaks = [0];
      let cursor = 0;
      while (cursor + idealPagePx < canvas.height - 8) {
        const ideal = cursor + idealPagePx;
        let at = findBreakY(ideal, cursor);
        if (at <= cursor + 20) {
          at = Math.min(canvas.height, cursor + idealPagePx);
        }
        breaks.push(at);
        cursor = at;
        if (breaks.length > 80) break; // safety
      }
      if (breaks[breaks.length - 1] < canvas.height) breaks.push(canvas.height);

      const totalPages = breaks.length - 1;
      const sliceCanvas = document.createElement("canvas");
      const sliceCtx = sliceCanvas.getContext("2d");

      for (let page = 0; page < totalPages; page += 1) {
        if (page > 0) pdf.addPage();

        const srcY = breaks[page];
        const sliceH = Math.max(1, breaks[page + 1] - srcY);
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceH;
        sliceCtx.fillStyle = "#ffffff";
        sliceCtx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        sliceCtx.drawImage(canvas, 0, srcY, canvas.width, sliceH, 0, 0, canvas.width, sliceH);

        const sliceData = sliceCanvas.toDataURL("image/jpeg", 0.92);
        const sliceHmm = (sliceH * contentW) / canvas.width;
        pdf.addImage(sliceData, "JPEG", sideMargin, headerH, contentW, Math.min(sliceHmm, contentH));

        // Header band (~1 cm)
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pageW, headerH, "F");
        pdf.setDrawColor(200, 16, 46);
        pdf.setLineWidth(0.35);
        pdf.line(sideMargin, headerH - 0.8, pageW - sideMargin, headerH - 0.8);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(200, 16, 46);
        const headerTitle = t("pdf.headerTitle", { name: safeTitle });
        pdf.text(headerTitle.length > 70 ? `${headerTitle.slice(0, 67)}...` : headerTitle, sideMargin, 7.5);

        // Footer band (~1 cm)
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, pageH - footerH, pageW, footerH, "F");
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.25);
        pdf.line(sideMargin, pageH - footerH + 0.8, pageW - sideMargin, pageH - footerH + 0.8);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(107, 107, 107);
        pdf.text(t("pdf.footer"), sideMargin, pageH - 4.5);
        pdf.text(`${page + 1} / ${totalPages}`, pageW - sideMargin, pageH - 4.5, { align: "right" });
      }

      pdf.save(`${fileName}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
      alert(t("vodic.sazetak.pdfError"));
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
          title={t("vodic.nav.randomFillTitle")}
        >
          {t("vodic.nav.randomFill")}
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
          {t("vodic.nav.back")}
        </button>
        <button
          onClick={() => step < STEPS.length - 1 && setStep(step + 1)}
          disabled={step === STEPS.length - 1}
          style={{ ...btnPrimary, opacity: step === STEPS.length - 1 ? 0.5 : 1 }}
        >
          {t("vodic.nav.next")}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════

const TAB_IDS = ["kreatori", "info", "zasto", "literatura", "primjeri", "vodic"];

function AppInner() {
  const { t } = useLang();
  const [tab, setTab] = useState("vodic");

  const TABS = useMemo(
    () => TAB_IDS.map((id) => ({ id, label: t(`tabs.${id}`) })),
    [t]
  );

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
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: C.bg, minHeight: "100vh", color: C.text, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.red} 0%, ${C.redDark} 100%)`,
          color: C.white,
          padding: "28px 32px 20px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
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
                <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>{t("header.brand")}</div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>{t("header.subtitle")}</div>
              </div>
            </div>
            <LangSwitch />
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 4, padding: "10px 24px", overflowX: "auto" }}>
          {TABS.map((tabItem) => (
            <button key={tabItem.id} onClick={() => setTab(tabItem.id)} style={pill(tab === tabItem.id)}>
              {tabItem.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, width: "100%", maxWidth: 1100, margin: "0 auto", padding: "32px 24px 60px", boxSizing: "border-box" }}>
        {renderTab()}
      </div>

      {/* Footer */}
      <div style={{ background: C.text, color: "rgba(255,255,255,.5)", textAlign: "center", padding: "20px", fontSize: 12, marginTop: "auto" }}>
        {t("footer.text")}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}
