"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import TutorCard from '../components/TutorCard';
import styles from '@/styles/Home.module.css';

// ... (Tip Tutor je isti kao i u page.tsx)
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
  const searchParams = useSearchParams();
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAndFilter() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/tutors');
        if (!response.ok) {
          throw new Error('Failed to fetch tutors');
        }
        const data = await response.json();
        
        const faculty = searchParams.get('faculty');
        const subject = searchParams.get('subject');
        const price = searchParams.get('price');

        // Ako nema predefiniranih filtera, prikaži sve tutore
        if (!faculty && !subject && !price) {
          setFilteredTutors(data.tutors);
        } else {
          // Filtriraj ako postoje parametri pretrage
          const filtered = data.tutors.filter((tutor: Tutor) => {
            const facultyMatch = !faculty || (tutor.title.includes(faculty));
            const subjectMatch = !subject || (tutor.tags.some(tag => tag.includes(subject)));
            const priceMatch = !price || (tutor.price <= Number(price));
  
            return facultyMatch && subjectMatch && priceMatch;
          });
          setFilteredTutors(filtered);
        }
      } catch (error) {
        console.error("Greška pri dohvaćanju i filtriranju tutora:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAndFilter();
  }, [searchParams]);

  return (
    <main className={styles.main}>
      <section className={styles.bestSection}>
        <h2 className={styles.title}>Rezultati pretrage</h2>
        {isLoading ? (
          <p>Učitavanje...</p>
        ) : filteredTutors.length > 0 ? (
          <div className={styles.cardsGrid}>
            {filteredTutors.map((tutor) => (
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