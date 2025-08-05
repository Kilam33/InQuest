import React, { useState } from 'react';
import axios from 'axios';

interface Article {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  citations: number;
  abstract: string;
  journal: string;
  doi: string;
  subjects: string[];
  downloadUrl: string;
}

interface SearchProps {
  isDark: boolean;
  onSearchResults: (results: Article[]) => void;
}

const SearchComponent = ({ isDark, onSearchResults }: SearchProps) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get('https://api.core.ac.uk/v3/search/works', {
        params: {
          q: query,
          apiKey: import.meta.env.VITE_CORE_API_KEY,
          limit: 10, // Number of results to fetch
        },
      });

      const results = response.data.results.map((item: any) => ({
        id: item.id,
        title: item.title,
        authors: item.authors?.map((author: any) => author.name) || [],
        publishedDate: item.publishedDate,
        citations: item.citations?.length || 0,
        abstract: item.abstract,
        journal: item.journal?.title || 'N/A',
        doi: item.doi || 'N/A',
        subjects: item.subjects || [],
        downloadUrl: item.downloadUrl || '',
      }));

      onSearchResults(results);
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for articles..."
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
            isDark ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'
          }`}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-lg ${
            isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'
          } text-white`}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default SearchComponent;