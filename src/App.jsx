import { useState } from 'react';

export default function App() {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRandomFact = async () => {
    setLoading(true);
    setError('');
    setFact('');

    try {
      const randomNumber = Math.floor(Math.random() * 1000) + 1;
      const response = await fetch(`http://numbersapi.com/${randomNumber}`);

      if (!response.ok) {
        throw new Error('Failed to fetch data.');
      }

      const data = await response.text();
      setFact(data);
    } catch (err) {
      setError('Unable to load fact. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex items-center justify-center px-4">
      <main className="bg-neutral-800 w-full max-w-md p-6 rounded-none">
        <h1 className="text-xl font-semibold text-center mb-6">
          Random Number Facts
        </h1>

        <div className="flex justify-center mb-4">
          <button
            onClick={fetchRandomFact}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white px-4 py-2 rounded-none"
          >
            {loading ? 'Loading...' : 'Get Fact'}
          </button>
        </div>

        {error && (
          <div className="bg-red-600 text-white text-sm p-3 rounded-none mb-4">
            {error}
          </div>
        )}

        {fact && !error && (
          <div className="bg-neutral-700 p-3 text-sm rounded-none">
            {fact}
          </div>
        )}

        {!fact && !error && !loading && (
          <p className="text-center text-neutral-400 text-sm">
            Press the button to load a number fact.
          </p>
        )}
      </main>
    </div>
  );
}