'use client';

import { useState, useEffect } from 'react';
import { getRandomGame, type Game, type CategoryFilter } from '@/lib/api';
import GameCard from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { Gamepad2, Info, HelpCircle, Sparkles } from 'lucide-react';

// ... keep CATEGORY_MAPPINGS and SEO_CONTENT objects the same ...

interface PageProps {
  params: {
    category: string;
    type: string;
  };
}

export default function CategoryPageClient({ params }: PageProps) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const category = params.category as keyof typeof CATEGORY_MAPPINGS;
  const type = params.type;
  
  const categoryId = CATEGORY_MAPPINGS[category]?.[type];
  const filter: CategoryFilter = {
    type: category === 'genres' ? 'genre' : 'platform',
    value: categoryId,
  };

  const seoContent = SEO_CONTENT[category]?.[type] || {
    title: `Random ${type.charAt(0).toUpperCase() + type.slice(1)} Game Generator`,
    description: `Discover new ${type} games with our random game generator.`,
    content: `Find your next favorite ${type} game with our random game generator.`,
    faqs: [],
  };

  const generateGame = async () => {
    setLoading(true);
    setError(null);
    try {
      const newGame = await getRandomGame(filter);
      setGame(newGame);
    } catch (error) {
      setError('Failed to fetch game. Please try again.');
      console.error('Error fetching game:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateGame();
  }, [category, type]);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{seoContent.title}</h1>
        <p className="text-xl md:text-2xl opacity-90">
          {seoContent.description}
        </p>
      </section>

      <section className="mb-12">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={generateGame}>Try Again</Button>
          </div>
        ) : (
          game && <GameCard game={game} onGenerateNew={generateGame} />
        )}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Info className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">About Our {seoContent.title}</h2>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{seoContent.content}</p>
          </div>
        </section>

        <section className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="h-6 w-6 text-green-600" />
            <h3 className="text-2xl font-bold">How It Works</h3>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Our random {type} game generator uses the comprehensive RAWG video games database to suggest games specifically tailored to your interests. Each suggestion is carefully filtered to ensure you get quality {type} games that match your preferences. Simply click the "Generate Another Game" button to discover more amazing titles!
            </p>
          </div>
        </section>
      </div>

      {seoContent.faqs.length > 0 && (
        <section className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-6 w-6 text-purple-600" />
            <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
          </div>
          <div className="grid gap-6">
            {seoContent.faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-50">
                <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  {faq.q}
                </h4>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}