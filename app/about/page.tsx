export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Welcome to RandomGameGenerator.com, your ultimate destination for discovering new and exciting games! We're passionate gamers who understand the challenge of choosing what to play next from the vast world of video games.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="mb-6">
          Our mission is simple: to help gamers break out of their comfort zones and discover amazing games they might have otherwise missed. We believe that some of the best gaming experiences come from unexpected discoveries.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">How We Started</h2>
        <p className="mb-6">
          RandomGameGenerator.com was born from a common problem: decision paralysis when choosing a new game to play. We've all been there - scrolling through endless libraries of games, unable to decide what to try next. Our solution? A simple but powerful random game generator that helps make that decision for you.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Technology</h2>
        <p className="mb-6">
          We use the comprehensive RAWG video games database to provide you with accurate and up-to-date information about thousands of games. Our platform is built using modern web technologies to ensure a smooth and responsive experience across all devices.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Join Our Community</h2>
        <p className="mb-6">
          We're more than just a random game generator - we're a community of gamers helping other gamers discover new experiences. Follow us on social media and join our community to share your discoveries and connect with other gaming enthusiasts.
        </p>
      </div>
    </div>
  );
}