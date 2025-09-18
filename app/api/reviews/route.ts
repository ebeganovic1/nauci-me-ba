import { NextResponse } from 'next/server';
import { DUMMY_TUTORS } from '../../data/tutors';

let reviews: any[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tutorId = searchParams.get('tutorId');
  
  const tutorReviews = reviews.filter(review => review.tutorId === tutorId);
  return NextResponse.json({ reviews: tutorReviews });
}

export async function POST(request: Request) {
  try {
    const { tutorId, rating, comment } = await request.json();

    const newReview = {
      id: Date.now().toString(),
      tutorId,
      userId: 'current-user-id',
      userName: 'Current User',
      rating,
      comment,
      date: new Date().toLocaleDateString('bs-BA'),
    };

    reviews.push(newReview);

    const tutorIndex = DUMMY_TUTORS.findIndex(t => t.id === tutorId);
    if (tutorIndex !== -1) {
      const tutorReviews = reviews.filter(r => r.tutorId === tutorId);
      const totalRating = tutorReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / tutorReviews.length;

      DUMMY_TUTORS[tutorIndex].rating = parseFloat(averageRating.toFixed(1));
      DUMMY_TUTORS[tutorIndex].reviews = tutorReviews.length;
    }

    return NextResponse.json({
      success: true,
      message: 'Recenzija uspješno dodana',
      review: newReview,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Greška pri dodavanju recenzije' },
      { status: 500 }
    );
  }
}
