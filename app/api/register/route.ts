// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { getUsers, addUser, findUserByEmail } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const { email, password, fullName, role, phone } = await request.json();

    if (!email || !password || !fullName || !role) {
      return NextResponse.json({ message: 'Sva obavezna polja moraju biti popunjena' }, { status: 400 });
    }

    // Provera da li korisnik već postoji
    if (findUserByEmail(email)) {
      return NextResponse.json({ message: 'Korisnik sa ovim emailom već postoji' }, { status: 409 });
    }

    // Dodavanje novog korisnika
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // U realnoj aplikaciji, ovo bi trebalo biti hash-ovano
      fullName,
      role,
      phone: phone || ''
    };

    addUser(newUser);
    console.log('Novi korisnik registriran:', newUser.email);

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json({ 
      message: 'Uspješna registracija!',
      user: userWithoutPassword
    }, { status: 201 });
  } catch (error) {
    console.error('Greška pri registraciji:', error);
    return NextResponse.json({ message: 'Greška na serveru' }, { status: 500 });
  }
}