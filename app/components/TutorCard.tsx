// app/components/TutorCard.tsx
import styles from "@/styles/TutorCard.module.css";
import Image from "next/image";
import Link from "next/link"; // Uvezite Link

// Pretpostavljam da TutorCard prima sve podatke o tutoru
type TutorCardProps = {
  id: string;
  name: string;
  title: string;
  city: string;
  years: number;
  rating: number;
  reviews: number;
  tags: string[];
  price: number;
  avatar: string;
};

export default function TutorCard({
  id,
  name,
  title,
  city,
  years,
  rating,
  reviews,
  tags,
  price,
  avatar,
}: TutorCardProps) {
  return (
    // Omotajte cijelu karticu unutar Link komponente
    <Link href={`/tutors/${id}`} passHref>
      <div className={styles.card}>
        <div className={styles.top}>
          <Image
            src={avatar}
            alt={`Profilna slika ${name}`}
            width={80}
            height={80}
            className={styles.avatar}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.title}>{title}</p>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              {/* Ikona za lokaciju */}
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">...</svg>
              {city}
            </span>
            <span className={styles.metaItem}>
              {/* Ikona za ocjenu */}
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">...</svg>
              {rating} ({reviews})
            </span>
          </div>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.price}>
            <span className={styles.amount}>{price}KM</span>
            <span className={styles.perHour}>/čas</span>
          </div>
        </div>
      </div>
    </Link>
  );
}