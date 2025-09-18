// app/components/ContactTutorModal.tsx
"use client";

import { useState } from 'react';
import styles from '@/styles/ContactTutorModal.module.css';

interface ContactTutorModalProps {
  tutorId: string;
  tutorName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactTutorModal({ tutorId, tutorName, isOpen, onClose }: ContactTutorModalProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorId,
          message,
        }),
      });
      
      if (response.ok) {
        alert('Poruka je uspješno poslana!');
        setMessage('');
        onClose();
      }
    } catch (error) {
      console.error('Greška pri slanju poruke:', error);
      alert('Došlo je do greške pri slanju poruke.');
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Kontaktirajte {tutorName}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="message">Vaša poruka:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Opišite šta vam treba pomoć s..."
              rows={5}
            />
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Otkaži
            </button>
            <button type="submit" disabled={isSending || !message.trim()} className={styles.sendButton}>
              {isSending ? 'Slanje...' : 'Pošalji poruku'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}