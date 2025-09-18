// app/components/RatingSystem.tsx
"use client";

import { useState } from 'react';
import styles from '@/styles/RatingSystem.module.css';

interface RatingSystemProps {
  tutorId: string;
  currentRating: number;
  reviewCount: number;
  onAddReview?: (rating: number, comment: string) => void;
}

export default function RatingSystem({ tutorId, currentRating, reviewCount, onAddReview }: RatingSystemProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorId,
          rating,
          comment,
        }),
      });
      
      if (response.ok && onAddReview) {
        onAddReview(rating, comment);
        setRating(0);
        setComment('');
      }
    } catch (error) {
      console.error('Greška pri dodavanju recenzije:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.ratingSystem}>
      <div className={styles.currentRating}>
        <h3>Ocjena: {currentRating.toFixed(1)}</h3>
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(currentRating) ? styles.filled : styles.empty}>
              ★
            </span>
          ))}
        </div>
        <p>({reviewCount} recenzija)</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <h4>Dodajte recenziju</h4>
        <div className={styles.ratingInput}>
          <label>Ocjena:</label>
          <div className={styles.starInput}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={star <= rating ? styles.selected : ''}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className={styles.commentInput}>
          <label htmlFor="comment">Komentar (opciono):</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Podijelite svoje iskustvo..."
            rows={3}
          />
        </div>
        <button 
          type="submit" 
          disabled={rating === 0 || isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Postavljanje...' : 'Postavi recenziju'}
        </button>
      </form>
    </div>
  );
}