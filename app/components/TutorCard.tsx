import Image from "next/image";
import styles from "@/styles/TutorCard.module.css";

type Props = {
  name: string; title: string; city: string; years: number;
  rating: number; reviews: number; tags: string[]; price: number; avatar: string;
};

export default function TutorCard(p: Props) {
  const y = p.years === 1 ? "godina" : "godine";
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.left}>
          <Image className={styles.avatar} src={p.avatar} alt={p.name} width={56} height={56} />
          <div>
            <h3 className={styles.name}>{p.name}</h3>
            <p className={styles.muted}>{p.title}</p>
          </div>
        </div>
        <div className={styles.rating}>⭐ {p.rating} <span className={styles.muted}>({p.reviews})</span></div>
      </div>

      <ul className={styles.meta}>
        <li>📍 {p.city}</li>
        <li>🕒 {p.years} {y} iskustva</li>
      </ul>

      <div className={styles.tags}>{p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>

      <div className={styles.bottom}>
        <div className={styles.price}>{p.price} KM/sat</div>
        <button className={styles.cta}>Kontaktiraj</button>
      </div>
    </article>
  );
}
