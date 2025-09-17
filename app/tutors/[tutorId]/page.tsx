// app/tutors/[tutorId]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import styles from '@/styles/TutorDetails.module.css'; // Kreirajte ovaj CSS fajl
import Image from 'next/image';

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
    // Opciono: Dodatne informacije o tutoru
    bio: string;
    education: string[];
};

export default function TutorDetailsPage({ params }: { params: { tutorId: string } }) {
    const { tutorId } = params;
    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTutor = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/tutors/${tutorId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        notFound(); // Next.js funkcija za prikaz 404 stranice
                    }
                    throw new Error('Failed to fetch tutor details');
                }
                const data = await response.json();
                setTutor(data.tutor);
            } catch (error) {
                console.error("Greška pri dohvaćanju tutora:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTutor();
    }, [tutorId]);

    if (isLoading) {
        return <div className={styles.container}><p>Učitavanje detalja tutora...</p></div>;
    }

    if (!tutor) {
        return notFound(); // Prikaz 404 ako tutor ne postoji
    }

    return (
        <div className={styles.container}>
            <div className={styles.profileHeader}>
                <Image
                    src={tutor.avatar}
                    alt={`Profilna slika ${tutor.name}`}
                    width={150}
                    height={150}
                    className={styles.profileAvatar}
                />
                <div className={styles.info}>
                    <h1 className={styles.name}>{tutor.name}</h1>
                    <p className={styles.title}>{tutor.title}</p>
                    <div className={styles.meta}>
                        <span>{tutor.city}</span> | <span>{tutor.years} god. iskustva</span>
                    </div>
                </div>
            </div>

            <div className={styles.detailsGrid}>
                <div className={styles.mainContent}>
                    <div className={styles.section}>
                        <h2>O meni</h2>
                        <p>{tutor.bio}</p>
                    </div>
                    <div className={styles.section}>
                        <h2>Vještine i predmeti</h2>
                        <div className={styles.tags}>
                            {tutor.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                        </div>
                    </div>
                </div>

                <aside className={styles.sidebar}>
                    <div className={styles.priceCard}>
                        <h3>Cijena</h3>
                        <p className={styles.priceAmount}>{tutor.price} KM/čas</p>
                        <button className={styles.contactBtn}>Kontaktiraj tutora</button>
                    </div>
                    <div className={styles.ratingCard}>
                        <h3>Ocjena</h3>
                        <div className={styles.ratingStars}>
                            <span>★</span> <span>{tutor.rating}</span> ({tutor.reviews} recenzija)
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
