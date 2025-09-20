// app/profile/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Profile.module.css';

type TutorProfile = {
  name: string;
  title: string;
  city: string;
  years: number;
  price: number;
  bio: string;
  education: string[];
  tags: string[];
};

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [tutorProfile, setTutorProfile] = useState<TutorProfile>({
    name: '',
    title: '',
    city: '',
    years: 0,
    price: 0,
    bio: '',
    education: [''],
    tags: ['']
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    setIsLoading(false);

    // Učitaj tutor profile ako je tutor
    if (user?.role === 'tutor') {
      fetchTutorProfile();
    }
  }, [user, router]);

  const fetchTutorProfile = async () => {
    try {
      // Simuliramo učitavanje tutor profila
      const mockTutorProfile = {
        name: user?.fullName || '',
        title: 'Instruktor',
        city: 'Sarajevo',
        years: 2,
        price: 15,
        bio: 'Dobrodošli na moj profil!',
        education: ['Univerzitet u Sarajevu'],
        tags: ['Matematika', 'Programiranje']
      };
      setTutorProfile(mockTutorProfile);
    } catch (error) {
      console.error('Greška pri učitavanju profila:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTutorProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEducationChange = (index: number, value: string) => {
    const newEducation = [...tutorProfile.education];
    newEducation[index] = value;
    setTutorProfile(prev => ({ ...prev, education: newEducation }));
  };

  const addEducationField = () => {
    setTutorProfile(prev => ({ ...prev, education: [...prev.education, ''] }));
  };

  const removeEducationField = (index: number) => {
    if (tutorProfile.education.length > 1) {
      const newEducation = tutorProfile.education.filter((_, i) => i !== index);
      setTutorProfile(prev => ({ ...prev, education: newEducation }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setTutorProfile(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simuliramo čuvanje podataka
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Sačuvani podaci:', tutorProfile);
      alert('Profil uspješno ažuriran!');
      setIsEditing(false);
    } catch (error) {
      console.error('Greška pri čuvanju:', error);
      alert('Došlo je do greške pri čuvanju profila.');
    } finally {
      setIsSaving(false);
    }
  };

  // Early return ako user nije dostupan
  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Preusmjeravanje na prijavu...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Učitavanje...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <h1>Moj Profil</h1>
          {user?.role === 'tutor' && (
            <div className={styles.editActions}>
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)} 
                    className={styles.cancelBtn}
                    disabled={isSaving}
                  >
                    Otkaži
                  </button>
                  <button 
                    onClick={handleSave} 
                    className={styles.saveBtn}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Čuvanje...' : 'Sačuvaj'}
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)} 
                  className={styles.editBtn}
                >
                  Uredi profil
                </button>
              )}
            </div>
          )}
        </div>
        
        <div className={styles.profileInfo}>
          <div className={styles.avatar}>
            {user?.fullName?.split(' ')?.map(n => n[0])?.join('') || 'US'}
          </div>
          
          <div className={styles.details}>
            <h2>{user?.fullName || 'Korisnik'}</h2>
            <p><strong>Email:</strong> {user?.email || 'Nepoznato'}</p>
            <p><strong>Uloga:</strong> {user?.role === 'student' ? 'Student' : user?.role === 'tutor' ? 'Instruktor' : 'Gost'}</p>
            {user?.phone && <p><strong>Telefon:</strong> {user.phone}</p>}
          </div>
        </div>

        {/* Tutor specific information - editable when in edit mode */}
        {user?.role === 'tutor' && (
          <div className={styles.tutorSection}>
            <h3>Informacije o instruktoru</h3>
            
            <div className={styles.formGroup}>
              <label>Naziv pozicije:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  value={tutorProfile.title}
                  onChange={handleInputChange}
                  placeholder="npr. Profesor matematike"
                />
              ) : (
                <p>{tutorProfile.title}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Grad:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="city"
                  value={tutorProfile.city}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{tutorProfile.city}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Godine iskustva:</label>
              {isEditing ? (
                <input
                  type="number"
                  name="years"
                  value={tutorProfile.years}
                  onChange={handleInputChange}
                  min="0"
                />
              ) : (
                <p>{tutorProfile.years}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Cijena po satu (KM):</label>
              {isEditing ? (
                <input
                  type="number"
                  name="price"
                  value={tutorProfile.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                />
              ) : (
                <p>{tutorProfile.price} KM</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Biografija:</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={tutorProfile.bio}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Opisite svoje iskustvo i pristup podučavanju..."
                />
              ) : (
                <p>{tutorProfile.bio}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Obrazovanje:</label>
              {isEditing ? (
                <div className={styles.educationList}>
                  {tutorProfile.education.map((edu, index) => (
                    <div key={index} className={styles.educationItem}>
                      <input
                        type="text"
                        value={edu}
                        onChange={(e) => handleEducationChange(index, e.target.value)}
                        placeholder="npr. Univerzitet u Sarajevu"
                      />
                      {tutorProfile.education.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeEducationField(index)}
                          className={styles.removeBtn}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEducationField}
                    className={styles.addBtn}
                  >
                    + Dodaj obrazovanje
                  </button>
                </div>
              ) : (
                <ul>
                  {tutorProfile.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Predmeti i vještine:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={tutorProfile.tags.join(', ')}
                  onChange={handleTagsChange}
                  placeholder="Matematika, Fizika, Programiranje"
                />
              ) : (
                <div className={styles.tags}>
                  {tutorProfile.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}