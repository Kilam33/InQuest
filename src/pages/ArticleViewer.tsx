import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen, Share2, Download, Bookmark, BookmarkCheck, Copy,
  MessageSquare, Highlighter, PenLine, Tag, Brain, Calendar,
  Clock, Zap, BarChart2, ChevronDown, FileText, Link, Sun, Moon,
  FileInput, FileOutput, Search, List
} from 'lucide-react';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';

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

interface Note {
  id: number;
  text: string;
  timestamp: string;
  selection: string;
  tags: string[];
}

const ArticleViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [article, setArticle] = useState<Article | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedText, setSelectedText] = useState('');
  const [aiInsightsOpen, setAiInsightsOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [highlightedText, setHighlightedText] = useState<string[]>([]);
  const [citationFormat, setCitationFormat] = useState('apa');
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (location.state?.article) {
      setArticle(location.state.article);
      // Simulate fetching related articles
      setRelatedArticles([
        {
          id: '2',
          title: 'Ethics in AI Development',
          authors: ['Brown, R.', 'Davis, K.', 'Wilson, L.'],
          publishedDate: '2024-01-01',
          citations: 12,
          abstract: 'A study on ethical considerations in AI development.',
          journal: 'Tech Ethics Quarterly',
          doi: '10.1234/teq.2024',
          subjects: ['AI Ethics', 'Technology'],
          downloadUrl: 'https://example.com/ethics-ai.pdf'
        },
        {
          id: '3',
          title: 'Data Analysis in Modern Research',
          authors: ['Smith, J.', 'Johnson, M.'],
          publishedDate: '2023-12-15',
          citations: 45,
          abstract: 'Exploring data analysis techniques in modern research.',
          journal: 'Journal of Data Science',
          doi: '10.1234/jds.2023',
          subjects: ['Data Science', 'Research Methods'],
          downloadUrl: 'https://example.com/data-analysis.pdf'
        }
      ]);
    } else {
      navigate('/'); // Redirect to home if no article data
    }
  }, [location, navigate]);

  const handleDownloadPdf = () => {
    if (article?.downloadUrl) {
      window.open(article.downloadUrl, '_blank');
    }
  };

  const handleCopyCitation = () => {
    const citation = `APA: ${article?.authors.join(', ')} (${article?.publishedDate}). ${article?.title}. ${article?.journal}.`;
    navigator.clipboard.writeText(citation);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleHighlight = () => {
    const selection = window.getSelection()?.toString();
    if (selection) {
      setHighlightedText([...highlightedText, selection]);
      setSelectedText(selection);
    }
  };

  const addNote = (text: string) => {
    const newNote: Note = {
      id: notes.length + 1,
      text,
      timestamp: new Date().toLocaleString(),
      selection: selectedText,
      tags: []
    };
    setNotes([...notes, newNote]);
    setSelectedText('');
  };

  const exportNotes = () => {
    const notesText = notes.map(note => `Note: ${note.text}\nContext: "${note.selection}"\nTimestamp: ${note.timestamp}`).join('\n\n');
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${article?.title.replace(/ /g, '_')}_notes.txt`;
    link.click();
  };

  // Scroll-based progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / scrollHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) return null;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <Header />

      {/* Progress Tracker */}
      <div className={`fixed top-20 right-4 w-48 p-4 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Reading Progress</span>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{Math.round(readingProgress)}%</span>
          </div>
          <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div
              className="h-2 bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Est. 15 mins remaining
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{article.title}</h1>
            <span className={`px-3 py-1 ${isDark ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'} rounded-full text-sm`}>
              Impact Score: 4.2
            </span>
          </div>

          <div className={`flex flex-wrap gap-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {article.authors.map((author, index) => (
              <span key={index} className={`hover:${isDark ? 'text-blue-400' : 'text-blue-600'} cursor-pointer`}>
                {author}
                {index < article.authors.length - 1 ? "," : ""}
              </span>
            ))}
          </div>

          <div className={`flex flex-wrap items-center gap-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {article.publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <BarChart2 size={16} />
              Citations: {article.citations}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              15 mins read
            </span>
            <span className="flex items-center gap-1">
              <Zap size={16} />
              IF: 4.2
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleDownloadPdf}
            className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg`}
          >
            <BookOpen size={20} />
            Read Paper
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'}`}
            onClick={() => setShowNotes(!showNotes)}
          >
            <PenLine size={20} />
            Notes
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'}`}
            onClick={handleCopyCitation}
          >
            <Copy size={20} />
            Cite
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'}`}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            {isBookmarked ? 'Saved' : 'Save'}
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 ${isDark ? 'bg-purple-800 text-purple-200 hover:bg-purple-900' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'} rounded-lg`}
            onClick={() => setAiInsightsOpen(!aiInsightsOpen)}
          >
            <Brain size={20} />
            AI Insights
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'}`}
            onClick={handleHighlight}
          >
            <Highlighter size={20} />
            Highlight
          </button>
        </div>

        {/* Abstract and Keywords */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Abstract</h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{article.abstract}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {article.subjects.map((subject, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Journal and DOI */}
        <div className="space-y-4">
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Journal</h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{article.journal}</p>
          <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>DOI</h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{article.doi}</p>
        </div>

        {/* Related Articles */}
        <div className="space-y-4">
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Related Articles</h2>
          <div className="space-y-4">
            {relatedArticles.map((relatedArticle) => (
              <div
                key={relatedArticle.id}
                className={`p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 ${
                  isDark ? 'bg-gray-800 shadow-purple-900/20' : 'bg-white shadow-lg'
                }`}
                onClick={() => navigate('/article', { state: { article: relatedArticle } })}
              >
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {relatedArticle.title}
                </h3>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {relatedArticle.authors.join(', ')}
                </p>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Published: {relatedArticle.publishedDate} | Citations: {relatedArticle.citations}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Journal: {relatedArticle.journal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      {aiInsightsOpen && (
        <div
          className={`fixed right-4 bottom-4 w-96 p-4 rounded-lg shadow-lg border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-purple-200'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Brain size={20} className="text-purple-600" />
              AI Research Assistant
            </h3>
            <button
              onClick={() => setAiInsightsOpen(false)}
              className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className={`font-medium text-sm ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Key Findings</h4>
              <ul className="mt-2 space-y-2">
                {[
                  'Novel approach to ML implementation',
                  'Strong methodology correlation',
                  'Significant future impact',
                ].map((finding, index) => (
                  <li
                    key={index}
                    className={`text-sm flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    <span className="text-purple-600">•</span>
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Notes Panel */}
      {showNotes && (
        <div
          className={`fixed right-4 top-24 w-96 p-4 rounded-lg shadow-lg border ${
            isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notes</h3>
            <button
              onClick={() => setShowNotes(false)}
              className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-yellow-50'}`}
              >
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{note.text}</p>
                {note.selection && (
                  <div className={`mt-2 text-xs italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    "{note.selection}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Alert */}
      {showAlert && (
        <div
          className={`fixed bottom-4 right-4 w-64 p-4 rounded-lg shadow-lg ${
            isDark ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'
          }`}
        >
          Citation copied to clipboard
        </div>
      )}
    </div>
  );
};

export default ArticleViewer;