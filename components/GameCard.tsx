'use client';

import Image from 'next/image';
import { Game } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface GameCardProps {
  game: Game;
  onGenerateNew: () => void;
}

export default function GameCard({ game, onGenerateNew }: GameCardProps) {
  const getGameUrl = () => {
    if (game.stores && game.stores.length > 0) {
      // Prefer Steam if available
      const steamStore = game.stores.find(s => 
        s.store.domain.includes('steampowered.com')
      );
      return steamStore ? steamStore.url : game.stores[0].url;
    }
    return null;
  };

  const gameUrl = getGameUrl();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{game.name}</CardTitle>
        <CardDescription>Released: {game.released}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative w-full h-[300px]">
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Rating:</span> {game.rating}/5
          </p>
          <p>
            <span className="font-semibold">Genres:</span>{' '}
            {game.genres.map((g) => g.name).join(', ')}
          </p>
          <p>
            <span className="font-semibold">Platforms:</span>{' '}
            {game.platforms.map((p) => p.platform.name).join(', ')}
          </p>
          {game.description_raw && (
            <p className="mt-4">{game.description_raw.slice(0, 300)}...</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onGenerateNew} className="w-full sm:w-1/2">
          Generate Another Game
        </Button>
        {gameUrl && (
          <Button
            variant="secondary"
            className="w-full sm:w-1/2"
            onClick={() => window.open(gameUrl, '_blank')}
          >
            Get This Game <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}