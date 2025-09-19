// app/tutors/[tutorId]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import styles from '@/styles/TutorDetails.module.css';
import ContactTutorModal from '../../components/ContactTutorModal'; 
import RatingSystem from '../../components/RatingSystem';

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
  bio: string;
  education: string[];
};

type Review = {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export default function TutorDetailsPage() {
  // umjesto props.params koristimo useParams()
  const { tutorId } = useParams<{ tutorId: string }>();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!tutorId) return;

    const fetchTutorData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const tutorResponse = await fetch(`/api/tutors/${tutorId}`);

        if (!tutorResponse.ok) {
          if (tutorResponse.status === 404) {
            // notFound() je bolje koristiti u server komponenti;
            // u clientu možemo prikazati poruku ili redirect.
            setError('Tutor nije pronađen');
            return;
          }
          throw new Error(`HTTP error! status: ${tutorResponse.status}`);
        }

        const tutorData = await tutorResponse.json();

        if (tutorData.error) {
          setError(tutorData.error);
          return;
        }

        setTutor(tutorData.tutor);

        const reviewsResponse = await fetch(`/api/reviews?tutorId=${tutorId}`);
        if (reviewsResponse.ok) {
          const reviewsData = await reviewsResponse.json();
          setReviews(reviewsData.reviews || []);
        }
      } catch (err) {
        console.error("Greška pri dohvaćanju podataka:", err);
        setError('Došlo je do greške pri učitavanju podataka.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorData();
  }, [tutorId]);

  const handleAddReview = async () => {
    await new Promise(res => setTimeout(res, 500));

    try {
      const reviewsResponse = await fetch(`/api/reviews?tutorId=${tutorId}`);
      if (reviewsResponse.ok) {
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData.reviews || []);
      }

      const tutorResponse = await fetch(`/api/tutors/${tutorId}`);
      if (tutorResponse.ok) {
        const tutorData = await tutorResponse.json();
        setTutor(tutorData.tutor);
      }
    } catch (err) {
      console.error("Greška pri osvježavanju podataka:", err);
    }

    alert('Recenzija je uspješno dodana!');
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Učitavanje detalja tutora...</p>
        </div>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Greška</h2>
          <p>{error || 'Tutor nije pronađen'}</p>
          <button onClick={() => router.back()} className={styles.backButton}>
            Nazad
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <div
            className={styles.avatarPlaceholder}
            style={{
              backgroundColor: `hsl(${tutor.name.length * 30 % 360}, 70%, 60%)`
            }}
          >
            <span className={styles.initials}>
              {tutor.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </span>
          </div>
        </div>
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
            <h2>Obrazovanje</h2>
            <ul className={styles.educationList}>
              {tutor.education.map((edu, index) => (
                <li key={index} className={styles.educationItem}>{edu}</li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Vještine i predmeti</h2>
            <div className={styles.tags}>
              {tutor.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2>Recenzije</h2>
            {reviews.length > 0 ? (
              <div className={styles.reviewsList}>
                {reviews.map((review) => (
                  <div key={review.id} className={styles.reviewItem}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewAuthor}>{review.userName}</span>
                      <div className={styles.reviewRating}>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < review.rating ? styles.filledStar : styles.emptyStar}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                    <span className={styles.reviewDate}>{review.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Još nema recenzija za ovog tutora.</p>
            )}
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.priceCard}>
            <h3>Cijena</h3>
            <p className={styles.priceAmount}>{tutor.price} KM/čas</p>
            <button
              onClick={() => setShowContactModal(true)}
              className={styles.contactBtn}
            >
              Kontaktiraj tutora
            </button>
          </div>

          <div className={styles.ratingCard}>
            <h3>Ocjena</h3>
            <div className={styles.ratingStars}>
              <span className={styles.starIcon}>★</span>
              <span className={styles.ratingValue}>{tutor.rating}</span>
              <span className={styles.reviewsCount}>({tutor.reviews} recenzija)</span>
            </div>
          </div>

          <div className={styles.ratingSection}>
            <RatingSystem
              tutorId={tutorId}
              currentRating={tutor.rating}
              reviewCount={tutor.reviews}
              onAddReview={handleAddReview}
            />
          </div>
        </aside>
      </div>

      {showContactModal && (
        <ContactTutorModal
          tutorId={tutorId}
          tutorName={tutor.name}
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
}
