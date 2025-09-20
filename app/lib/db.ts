// lib/db.ts
// Jednostavna "baza" koja će trajati tokom runtime-a
let users: any[] = [
  {
    id: '1',
    email: 'student@example.com',
    password: 'password123',
    fullName: 'Test Student',
    role: 'student',
    phone: '061123456'
  },
  {
    id: '2',
    email: 'tutor@example.com',
    password: 'password123',
    fullName: 'Test Tutor',
    role: 'tutor',
    phone: '062987654'
  }
];

// lib/db.ts - dodajte ove funkcije
// ... postojeći kod ...

let tutors: any[] = [
  {
    id: '2',
    email: 'tutor@example.com',
    password: 'password123',
    fullName: 'Test Tutor',
    role: 'tutor',
    phone: '062987654',
    name: 'Test Tutor',
    title: 'Profesor matematike',
    city: 'Sarajevo',
    years: 5,
    price: 20,
    bio: 'Iskusan profesor matematike sa 5 godina iskustva u podučavanju',
    education: ['Univerzitet u Sarajevu, PMF'],
    tags: ['Matematika', 'Algebra', 'Geometria']
  }
];

export function getTutorById(id: string) {
  return tutors.find(tutor => tutor.id === id);
}

export function updateTutor(id: string, updates: any) {
  const index = tutors.findIndex(tutor => tutor.id === id);
  if (index !== -1) {
    tutors[index] = { ...tutors[index], ...updates };
    return tutors[index];
  }
  return null;
}

export function getAllTutors() {
  return tutors;
}

export function getUsers() {
  return users;
}

export function addUser(user: any) {
  users.push(user);
  return user;
}

export function findUserByEmail(email: string) {
  return users.find(u => u.email === email);
}

export function findUserByCredentials(email: string, password: string) {
  return users.find(u => u.email === email && u.password === password);
}