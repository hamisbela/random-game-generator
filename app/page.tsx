'use client';

import { useState, useEffect } from 'react';
import { getRandomGame, type Game } from '@/lib/api';
import GameCard from '@/components/GameCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const generateGame = async () => {
    setLoading(true);
    setError(null);
    try {
      const newGame = await getRandomGame();
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
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Random Game Generator</h1>
        <p className="text-xl text-gray-600">
          Discover your next gaming adventure with just one click!
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

      <section className="prose max-w-none">
        <h2 className="text-2xl font-bold mb-4">About Our Random Game Generator</h2>
        <p>
          Welcome to the ultimate Random Game Generator! Our tool helps gamers discover new and exciting games from a vast database of titles. Whether you're looking for your next gaming adventure or stuck in a gaming rut, our random game generator is here to help.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">How Our Random Game Generator Works</h3>
        <p>
          Our random game generator uses the comprehensive RAWG video games database to suggest games across all platforms and genres. With just one click, you can discover hidden gems and popular titles you might have missed.
        </p>

        <h3 className="text-xl font-bold mt-6 mb-3">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold">How does the random game generator select games?</h4>
            <p>
              Our random game generator uses a sophisticated algorithm to select games from a database of thousands of titles. Each suggestion is completely random, ensuring a diverse range of gaming experiences.
            </p>
          </div>
          <div>
            <h4 className="font-bold">Can I get different game suggestions?</h4>
            <p>
              Yes! Simply click the "Generate Another Game" button to get a new random game suggestion. You can generate as many suggestions as you like until you find the perfect game.
            </p>
          </div>
          <div>
            <h4 className="font-bold">Are the games filtered by platform?</h4>
            <p>
              Our random game generator shows games from all platforms, including PC, PlayStation, Xbox, Nintendo, and mobile devices. Each game card displays the available platforms for that title.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}