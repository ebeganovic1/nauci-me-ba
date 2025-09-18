// app/components/TutorCard.tsx
import styles from "@/styles/TutorCard.module.css";
import Link from "next/link";
import { useState } from "react";
import ContactTutorModal from "./ContactTutorModal";

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
  const [showContactModal, setShowContactModal] = useState(false);

  // Funkcija za generisanje inicijala iz imena
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Funkcija za generisanje nasumične boje na osnovu imena
  const getAvatarColor = (name: string) => {
    const colors = [
      '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', 
      '#EF4444', '#F59E0B', '#10B981', '#06B6D4', '#64748B'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowContactModal(true);
  };

  return (
    <>
      <Link href={`/tutors/${id}`} passHref>
        <div className={styles.card}>
          <div className={styles.top}>
            <div 
              className={styles.avatarPlaceholder}
              style={{ backgroundColor: getAvatarColor(name) }}
            >
              <span className={styles.initials}>{getInitials(name)}</span>
            </div>
          </div>
          <div className={styles.content}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.title}>{title}</p>
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                {/* Ikona za lokaciju */}
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                {city}
              </span>
              <span className={styles.metaItem}>
                {/* Ikona za ocjenu */}
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.950l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
                {rating} ({reviews})
              </span>
            </div>
            <div className={styles.tags}>
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.footer}>
              <div className={styles.price}>
                <span className={styles.amount}>{price}KM</span>
                <span className={styles.perHour}>/čas</span>
              </div>
              <button 
                onClick={handleContactClick}
                className={styles.contactButton}
              >
                Kontaktiraj
              </button>
            </div>
          </div>
        </div>
      </Link>

      {showContactModal && (
        <ContactTutorModal
          tutorId={id}
          tutorName={name}
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </>
  );
}