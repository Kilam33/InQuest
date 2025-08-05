import React, { useState } from 'react';
import { Brain, Search, BookOpen, MessageSquare, Zap, Share2, ArrowRight, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../components/Search';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Import the Footer component

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

const Landing = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const navigate = useNavigate();

  const handleSearchResults = (results: Article[]) => {
    setSearchResults(results);
  };

  const handleArticleClick = (article: Article) => {
    navigate('/article', { state: { article } });
  };

  // Demo statistics
  const stats = [
    { label: 'Active Users', value: '10K+' },
    { label: 'Papers Indexed', value: '1M+' },
    { label: 'Universities', value: '500+' },
    { label: 'Daily Searches', value: '50K+' },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Use the Header component */}
      <Header isDark={isDark} setIsDark={setIsDark} />

      {/* Hero Section with Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Transform Your Research Experience with AI
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            InQuest combines AI-powered analysis, collaboration tools, and project management
            to help students and researchers work smarter, not harder.
          </p>
          <SearchComponent isDark={isDark} onSearchResults={handleSearchResults} />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-12">
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Search Results</h2>
            <div className="space-y-6">
              {searchResults.map((article) => (
                <div
                  key={article.id}
                  className={`p-6 rounded-lg cursor-pointer transition-transform hover:scale-105 ${
                    isDark ? 'bg-gray-800 shadow-purple-900/20' : 'bg-white shadow-lg'
                  }`}
                  onClick={() => handleArticleClick(article)}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {article.title}
                  </h3>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {article.authors.join(', ')}
                  </p>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Published: {article.publishedDate} | Citations: {article.citations}
                  </p>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Journal: {article.journal} | DOI: {article.doi}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Subjects: {article.subjects.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Everything You Need for Research Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-8 w-8 text-purple-600" />,
                title: "Smart Research Assistant",
                description: "AI-powered insights, summaries, and recommendations tailored to your research interests."
              },
              {
                icon: <Search className="h-8 w-8 text-blue-600" />,
                title: "Advanced Search",
                description: "Natural language search with filters for methodology, publication date, and citation count."
              },
              {
                icon: <BookOpen className="h-8 w-8 text-green-600" />,
                title: "Project Management",
                description: "Organize research projects, set milestones, and track progress all in one place."
              },
              {
                icon: <MessageSquare className="h-8 w-8 text-yellow-600" />,
                title: "Collaboration Hub",
                description: "Share notes, discuss findings, and work together in real-time with your research team."
              },
              {
                icon: <Zap className="h-8 w-8 text-red-600" />,
                title: "Citation Management",
                description: "Automatically format citations and detect potential plagiarism in your work."
              },
              {
                icon: <Share2 className="h-8 w-8 text-indigo-600" />,
                title: "Course Integration",
                description: "Access course outlines, deadlines, and required readings directly within your workspace."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-lg transition-transform hover:scale-105 ${
                  isDark ? 'bg-gray-900 shadow-purple-900/20' : 'bg-white shadow-lg'
                }`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
                <button className="flex items-center text-purple-600 hover:text-purple-700">
                  Learn more <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;