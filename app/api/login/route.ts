// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { findUserByCredentials } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email i lozinka su obavezni' }, { status: 400 });
    }

    // Provera u našoj "bazi"
    const user = findUserByCredentials(email, password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json({ 
        message: 'Uspješna prijava!', 
        user: userWithoutPassword 
      }, { status: 200 });
    }

    return NextResponse.json({ message: 'Neispravan email ili lozinka.' }, { status: 401 });
  } catch (error) {
    console.error('Greška pri prijavi:', error);
    return NextResponse.json({ message: 'Greška na serveru' }, { status: 500 });
  }
}