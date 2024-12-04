'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = {
    genres: ['action', 'rpg', 'strategy', 'indie', 'adventure', 'shooter', 'puzzle', 'racing', 'sports'],
    platforms: ['pc', 'playstation', 'xbox', 'nintendo', 'ios', 'android'],
  };

  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            RandomGameGenerator
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-gray-300">Genres</DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.genres.map((genre) => (
                  <DropdownMenuItem key={genre}>
                    <Link href={`/genres/${genre}`} className="w-full">
                      {genre.charAt(0).toUpperCase() + genre.slice(1)} Games
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="hover:text-gray-300">Platforms</DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.platforms.map((platform) => (
                  <DropdownMenuItem key={platform}>
                    <Link href={`/platforms/${platform}`} className="w-full">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)} Games
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Genres</h3>
              {categories.genres.map((genre) => (
                <Link
                  key={genre}
                  href={`/genres/${genre}`}
                  className="block pl-4 hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {genre.charAt(0).toUpperCase() + genre.slice(1)} Games
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Platforms</h3>
              {categories.platforms.map((platform) => (
                <Link
                  key={platform}
                  href={`/platforms/${platform}`}
                  className="block pl-4 hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)} Games
                </Link>
              ))}
            </div>
            <Link
              href="/about"
              className="block hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}