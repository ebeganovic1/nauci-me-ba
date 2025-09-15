// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Simulacija provjere korisnika u bazi
    // U produkciji bi ovo bila stvarna provjera korisnika i lozinke.
    let userRole = '';
    if (email.includes('tutor')) {
      userRole = 'tutor';
    } else {
      userRole = 'student';
    }

    if (email && password) {
      return NextResponse.json({ message: 'Uspješna prijava!', role: userRole }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Neispravan email ili lozinka.' }, { status: 401 });
    }
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Greška na serveru' }, { status: 500 });
  }
}