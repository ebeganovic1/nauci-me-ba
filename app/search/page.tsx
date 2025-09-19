// app/search/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import TutorCard from '../components/TutorCard';
import styles from '@/styles/Home.module.css';

type Tutor = {
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

export default function SearchPage() {
  const sp = useSearchParams();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = useMemo(() => {
    const qs = sp.toString();
    return `/api/tutors${qs ? `?${qs}` : ''}`;
    // npr. /api/tutors?faculty=Elektrotehni%C4%8Dki%20fakultet&subject=Fizika&price=50&...
  }, [sp]);

  useEffect(() => {
    let abort = false;
    setIsLoading(true);
    fetch(apiUrl)
      .then(r => r.json())
      .then(d => { if (!abort) setTutors(d.tutors || []); })
      .catch(() => { if (!abort) setTutors([]); })
      .finally(() => { if (!abort) setIsLoading(false); });
    return () => { abort = true; };
  }, [apiUrl]);

  return (
    <main className={styles.main}>
      <section className={styles.bestSection}>
        <h2 className={styles.title}>Rezultati pretrage</h2>
        {isLoading ? (
          <p>Učitavanje...</p>
        ) : tutors.length > 0 ? (
          <div className={styles.cardsGrid}>
            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} {...tutor} />
            ))}
          </div>
        ) : (
          <p>Nema rezultata za vašu pretragu.</p>
        )}
      </section>
    </main>
  );
}
