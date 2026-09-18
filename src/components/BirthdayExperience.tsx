import { useEffect, useRef, useState, type ReactNode } from "react";
import { Camera, ChevronDown, Gift, Menu, Sparkles, X } from "lucide-react";

const FRIEND_NAME = "[HER NAME]";
const BIRTHDAY_AGE = "[AGE]";

const photoSlots = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  label: `[MEMORY ${String(index + 1).padStart(2, "0")}]`,
  caption: index % 3 === 0 ? "One for the memory book" : index % 3 === 1 ? "A very good day" : "Core memory unlocked",
}));

const reasons = [
  "You make everything more fun.",
  "You make me laugh at the most random things.",
  "You’re always unapologetically yourself.",
  "You create memories without even trying.",
  "You’re genuinely one of a kind.",
  "You make ordinary moments unforgettable.",
  "You’re completely impossible to replace.",
];

const chapters = [
  { number: "01", title: "The beginning", date: "[DATE]", copy: "[Add the story of how this wonderful friendship began.]" },
  { number: "02", title: "The first unforgettable memory", date: "[DATE]", copy: "[Add the memory you still bring up every chance you get.]" },
  { number: "03", title: "The funniest moments", date: "[DATE]", copy: "[Add the joke that would make absolutely no sense to anyone else.]" },
  { number: "04", title: "All the chaos", date: "[DATE]", copy: "[Add the beautifully unnecessary chaos here.]" },
  { number: "05", title: "Today", date: "[BIRTHDAY DATE]", copy: "A new chapter, and so many brilliant memories still waiting to happen." },
];

function Button({ children, onClick, variant = "primary", className = "", ariaLabel }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "outline"; className?: string; ariaLabel?: string }) {
  return <button type="button" aria-label={ariaLabel} onClick={onClick} className={`birthday-button birthday-button--${variant} ${className}`}>{children}</button>;
}

function Bow({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  return <span className={`bow bow--${size} ${className}`} aria-hidden="true"><i /><b /><i /></span>;
}

function Confetti({ burst }: { burst: number }) {
  if (!burst) return null;
  return (
    <div className="confetti-layer" key={burst} aria-hidden="true">
      {Array.from({ length: 54 }, (_, i) => <i key={i} style={{ "--i": i, "--x": `${(i * 47) % 100}vw`, "--delay": `${(i % 12) * 0.035}s` } as React.CSSProperties} />)}
    </div>
  );
}

function FloatingDetails() {
  return <div className="floating-details" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <span key={i} style={{ "--i": i } as React.CSSProperties}>{i % 4 === 0 ? "♡" : "✦"}</span>)}</div>;
}

function Navbar({ revealed }: { revealed: boolean }) {
  const [open, setOpen] = useState(false);
  const links = [["A note", "message"], ["Memories", "gallery"], ["Why you", "reasons"], ["Our story", "timeline"]];
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <nav className={`birthday-nav ${revealed ? "is-visible" : ""}`} aria-label="Birthday surprise navigation">
      <button className="nav-mark" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to the birthday greeting"><Bow size="sm" /> <span>for {FRIEND_NAME}</span></button>
      <button className="nav-toggle" type="button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      <div className={`nav-links ${open ? "is-open" : ""}`}>{links.map(([label, id]) => <button type="button" key={id} onClick={() => go(id)}>{label}</button>)}</div>
    </nav>
  );
}

function GiftBox({ opened }: { opened: boolean }) {
  return (
    <div className={`gift ${opened ? "is-open" : ""}`} aria-hidden="true">
      <div className="gift-sparkles"><i>✦</i><i>✧</i><i>✦</i></div>
      <div className="gift-lid"><Bow size="lg" /><span /></div>
      <div className="gift-body"><span className="gift-ribbon" /></div>
      <div className="gift-shadow" />
    </div>
  );
}

function Hero({ onOpen, opened }: { onOpen: () => void; opened: boolean }) {
  return (
    <header className={`birthday-hero ${opened ? "is-open" : ""}`}>
      <FloatingDetails />
      <div className="corner-ribbon corner-ribbon--left"><Bow size="md" /></div>
      <div className="corner-ribbon corner-ribbon--right"><Bow size="sm" /></div>
      <div className="hero-copy">
        <p className="eyebrow">A little celebration for a very special human</p>
        <h1>Happy Birthday,<br /><em>{FRIEND_NAME}!</em> <span>🎀</span></h1>
        <p className="hero-subtitle">To my favourite person and one of the most special people in my life…</p>
      </div>
      <GiftBox opened={opened} />
      <div className="hero-action">
        <Button onClick={onOpen}><Gift size={18} /> {opened ? "Surprise opened!" : "Open Your Surprise"} <span aria-hidden="true">🎁</span></Button>
        <small>Your birthday surprise is waiting for you…</small>
      </div>
      <span className="scroll-cue"><ChevronDown /> unwrap slowly</span>
    </header>
  );
}

function SectionHeading({ kicker, title, detail }: { kicker: string; title: string; detail?: string }) {
  return <div className="section-heading reveal"><span>{kicker}</span><h2>{title}</h2>{detail && <p>{detail}</p>}<Bow size="sm" /></div>;
}

function BirthdayMessage() {
  return (
    <section className="message-section" id="message">
      <div className="message-inner">
        <SectionHeading kicker="A note, just for you" title="Today is all about you ♡" />
        <article className="letter reveal">
          <span className="letter-pin">✦</span>
          <p className="letter-salutation">Dear {FRIEND_NAME},</p>
          <p>I’m endlessly grateful that life gave me a best friend like you. Thank you for every laugh that arrived at exactly the right time, every wildly random conversation, and every unforgettable moment we somehow created without even trying.</p>
          <p>You have this brilliant way of making ordinary days feel like stories worth remembering. Your presence makes life lighter, funnier, and so much more interesting—and I appreciate that more than I probably say.</p>
          <p>This year, I hope happiness finds you in the smallest moments and the biggest adventures. I hope you meet beautiful opportunities, find deep peace, achieve the things you’ve been working toward, and collect experiences that make you feel completely alive.</p>
          <p>You deserve a birthday that feels every bit as amazing as you are: joyful, memorable, and full of the people and things that make you happiest.</p>
          <p className="letter-signoff">Happy Birthday once again, {FRIEND_NAME}. Keep being the amazing person you are. 🎀</p>
          <Bow size="md" className="letter-bow" />
        </article>
      </div>
    </section>
  );
}

function PhotoGallery() {
  const [selected, setSelected] = useState<(typeof photoSlots)[number] | null>(null);
  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selected]);
  return (
    <section className="gallery-section" id="gallery">
      <SectionHeading kicker="The memory box" title="Our little collection of memories 📸" detail="Tap a frame to take a closer look." />
      <div className="photo-grid">
        {photoSlots.map((photo, index) => (
          <button type="button" className={`polaroid polaroid--${(index % 5) + 1} reveal`} key={photo.id} onClick={() => setSelected(photo)} aria-label={`Open ${photo.label}`}>
            <span className="photo-tape" />
            <span className="photo-placeholder"><Camera /><strong>{photo.label}</strong><small>Replace with your photo</small></span>
            <span className="photo-caption">{photo.caption}</span>
          </button>
        ))}
      </div>
      <p className="gallery-note reveal">Some memories deserve to stay forever.</p>
      {selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.label} onClick={() => setSelected(null)}><button type="button" onClick={() => setSelected(null)} aria-label="Close photo"><X /></button><div className="lightbox-photo" onClick={(e) => e.stopPropagation()}><Camera /><strong>{selected.label}</strong><span>Replace this slot with a favourite photo</span></div></div>}
    </section>
  );
}

function Reasons() {
  return (
    <section className="reasons-section" id="reasons">
      <SectionHeading kicker="Seven tiny reminders" title="Why you’re one of my favourite humans 🎀" />
      <div className="reasons-stack">{reasons.map((reason, i) => <article className="reason-card reveal" style={{ "--delay": `${i * 70}ms` } as React.CSSProperties} key={reason}><span>{String(i + 1).padStart(2, "0")}</span><p>{reason}</p><i>✦</i></article>)}</div>
    </section>
  );
}

function Timeline() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <section className="timeline-section" id="timeline">
      <SectionHeading kicker="Our story so far" title="From then to now ✨" detail="Five chapters, a lot of laughter, and many more pages to come." />
      <div className="timeline">
        {chapters.map((chapter, i) => <article className={`timeline-item reveal ${active === i ? "is-active" : ""}`} key={chapter.number}>
          <button type="button" onClick={() => setActive(active === i ? null : i)} aria-expanded={active === i}>
            <span className="timeline-number">{chapter.number}</span><span><small>{chapter.date}</small><strong>Chapter {chapter.number} — {chapter.title}</strong></span><ChevronDown />
          </button>
          <div className="timeline-details"><div className="timeline-photo"><Camera /><span>[ADD PHOTO]</span></div><p>{chapter.copy}</p></div>
        </article>)}
      </div>
    </section>
  );
}

function AgeCelebration({ onCelebrate }: { onCelebrate: () => void }) {
  return (
    <section className="age-section">
      <FloatingDetails />
      <div className="balloon balloon--one"><span /></div><div className="balloon balloon--two"><span /></div><div className="balloon balloon--three"><span /></div>
      <div className="age-content reveal"><p>The calendar has spoken</p><h2>THE DAY IS HERE! <span>🎂</span></h2><div className="age-cards"><span>16</span><span>17</span><strong>{BIRTHDAY_AGE}</strong></div><small>Use <b>{BIRTHDAY_AGE}</b> for her age</small><Button variant="outline" onClick={onCelebrate}><Sparkles size={17} /> Make it sparkle</Button></div>
    </section>
  );
}

function SurpriseEnvelope({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const reveal = () => { setOpen(true); onOpen(); };
  return (
    <section className="surprise-section">
      <SectionHeading kicker="A final little note" title="Wait… there’s one more thing 👀" />
      <div className={`envelope-wrap reveal ${open ? "is-open" : ""}`}>
        <div className="envelope-letter"><Bow size="sm" /><p>Another year, another collection of memories waiting to happen. I hope this year brings you countless reasons to smile, amazing opportunities, unforgettable adventures, and everything you’ve been wishing for.</p><p>No matter how chaotic life gets, I’m genuinely grateful that I get to call you my best friend. Here’s to another year of random conversations, stupid jokes, unforgettable memories and absolutely unnecessary chaos. 😂🎀</p><strong>Happy Birthday, {FRIEND_NAME}. You deserve the happiest day ever.</strong></div>
        <div className="envelope"><div className="envelope-back" /><div className="envelope-flap" /><div className="envelope-front"><span>for my best friend</span><Bow size="sm" /></div></div>
      </div>
      {!open && <Button onClick={reveal}>Open it <span aria-hidden="true">💌</span></Button>}
    </section>
  );
}

function Finale({ onCelebrate }: { onCelebrate: () => void }) {
  return (
    <footer className="birthday-finale">
      <FloatingDetails /><div className="finale-ribbon" /><Bow size="lg" />
      <div className="finale-copy reveal"><p>One more time, because you deserve it</p><h2>Happy Birthday,<br /><em>{FRIEND_NAME}</em> 🎂🎀</h2><h3>Here’s to another year of being absolutely amazing.</h3><div className="finale-rule" /><small>Made with way too much effort, questionable amounts of sleep, and lots of love for my best friend. 😂🎀</small><Button onClick={onCelebrate}><Sparkles size={18} /> Celebrate Again <span aria-hidden="true">🎉</span></Button></div>
    </footer>
  );
}

export function BirthdayExperience() {
  const [revealed, setRevealed] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [burst, setBurst] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-revealed")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [revealed]);

  const celebrate = () => setBurst((value) => value + 1);
  const openGift = () => {
    if (giftOpened) return;
    setGiftOpened(true); celebrate();
    window.setTimeout(() => { setRevealed(true); window.setTimeout(() => mainRef.current?.scrollIntoView({ behavior: "smooth" }), 180); }, 850);
  };
  const celebrateAgain = () => { celebrate(); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="birthday-site">
      <Navbar revealed={revealed} /><Confetti burst={burst} /><Hero onOpen={openGift} opened={giftOpened} />
      <main ref={mainRef} className={`birthday-content ${revealed ? "is-revealed" : ""}`} aria-hidden={!revealed}>
        <BirthdayMessage /><PhotoGallery /><Reasons /><Timeline /><AgeCelebration onCelebrate={celebrate} /><SurpriseEnvelope onOpen={celebrate} /><Finale onCelebrate={celebrateAgain} />
      </main>
    </div>
  );
}