import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import CategoryPageClient from './CategoryPageClient';

const VALID_CATEGORIES = {
  genres: {
    action: '4',
    rpg: '5',
    strategy: '10',
    indie: '51',
    adventure: '3',
    shooter: '2',
    puzzle: '7',
    racing: '1',
    sports: '15',
  },
  platforms: {
    pc: '4',
    playstation: '187,18,16,15',
    xbox: '186,1,14',
    nintendo: '7,8,9,13,83',
    ios: '3',
    android: '21',
  },
};

export async function generateStaticParams() {
  const params = [];
  
  for (const [category, types] of Object.entries(VALID_CATEGORIES)) {
    for (const type of Object.keys(types)) {
      params.push({
        category,
        type,
      });
    }
  }
  
  return params;
}

export default function CategoryPage({ params }: { params: { category: string; type: string } }) {
  if (
    !VALID_CATEGORIES[params.category as keyof typeof VALID_CATEGORIES] ||
    !VALID_CATEGORIES[params.category as keyof typeof VALID_CATEGORIES][params.type]
  ) {
    notFound();
  }

  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <CategoryPageClient params={params} />
    </Suspense>
  );
}