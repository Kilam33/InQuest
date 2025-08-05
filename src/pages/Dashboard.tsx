import React, { useEffect, useState } from 'react';
import {
  Brain, Search, BookOpen, MessageSquare,
  Zap, Share2, FolderPlus, Clock,
  BookmarkPlus, Folder, Users, FileText,
  BarChart2, List, Clipboard, Bookmark,
  FilePlus, TrendingUp, AlertCircle, CheckCircle,
  GitBranch, Hash, Table, Link2, PenTool,
  Network, LineChart, Database, Beaker,
  FileText2, BookMarked, Calendar, Quote,
  ClipboardList, ArrowRight, Download, Send, Tag, Bell, Settings, PieChart, FileInput, Shield, Cloud, Smartphone
} from 'lucide-react';
import SearchComponent from '../components/Search';
import Header from '../components/DHeader';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';


const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('apa');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/signin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);


  
  // Sample data for recent projects
  const recentProjects = [
    {
      id: '1',
      name: 'Machine Learning Research',
      lastModified: '2024-01-28',
      collaborators: 3,
      articles: 12
    },
    {
      id: '2',
      name: 'Data Analysis Project',
      lastModified: '2024-01-25',
      collaborators: 2,
      articles: 8
    },
    {
      id: '3',
      name: 'AI Ethics Study',
      lastModified: '2024-01-22',
      collaborators: 4,
      articles: 15
    }
  ];

  // Sample data for upcoming deadlines
  const upcomingDeadlines = [
    {
      id: '1',
      title: 'Literature Review Submission',
      date: '2024-02-15',
      project: 'Machine Learning Research'
    },
    {
      id: '2',
      title: 'Research Proposal',
      date: '2024-02-20',
      project: 'AI Ethics Study'
    }
  ];

  // Sample data for recent activity
  const recentActivity = [
    {
      id: '1',
      action: 'Added a new paper',
      details: 'Understanding Machine Learning Applications',
      time: '2h ago'
    },
    {
      id: '2',
      action: 'Created a note',
      details: 'Key findings from AI Ethics Study',
      time: '5h ago'
    },
    {
      id: '3',
      action: 'Shared project',
      details: 'Machine Learning Research with collaborators',
      time: '1d ago'
    }
  ];

  // Sample data for methodology steps
  const methodologySteps = [
    {
      id: '1',
      title: 'Data Collection Protocol',
      description: 'Defined parameters for collecting research data',
      date: '2024-01-15',
      status: 'completed',
      attachments: 2
    },
    {
      id: '2',
      title: 'Analysis Framework',
      description: 'Statistical methods and tools selection',
      date: '2024-02-01',
      status: 'in-progress',
      attachments: 1
    },
    {
      id: '3',
      title: 'Validation Process',
      description: 'Methodology for validating results',
      date: '2024-02-15',
      status: 'planned',
      attachments: 0
    }
  ];

  // Sample data for reference manager
  const references = [
    {
      id: '1',
      title: 'Machine Learning in Research: A Comprehensive Review',
      authors: ['Smith, J.', 'Johnson, M.'],
      journal: 'Journal of AI Research',
      year: '2023',
      citationCount: 45,
      format: 'pdf'
    },
    {
      id: '2',
      title: 'Ethics in AI Development',
      authors: ['Brown, R.', 'Davis, K.', 'Wilson, L.'],
      journal: 'Tech Ethics Quarterly',
      year: '2024',
      citationCount: 12,
      format: 'pdf'
    }
  ];

  // Sample data for research timeline
  const timelineEvents = [
    {
      id: '1',
      title: 'Initial Literature Review',
      date: '2024-02-28',
      type: 'milestone',
      priority: 'high',
      description: 'Complete comprehensive review of existing research'
    },
    {
      id: '2',
      title: 'Methodology Validation',
      date: '2024-03-15',
      type: 'review',
      priority: 'medium',
      description: 'Peer review of research methodology'
    }
  ];

  // Citation format options
  const citationFormats = [
    { id: 'apa', name: 'APA' },
    { id: 'mla', name: 'MLA' },
    { id: 'chicago', name: 'Chicago' },
    { id: 'harvard', name: 'Harvard' },
    { id: 'ieee', name: 'IEEE' }
  ];

  // Handle search results
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  // Handle article click
  const handleArticleClick = (article) => {
    navigate('/article', { state: { article } });
  };

  // Handle sending a message in collaboration section
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, timestamp: new Date() }]);
      setNewMessage('');
    }
  };

  

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header isDark={isDark} setIsDark={setIsDark} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome back, John Doe
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Continue your research... or start a new project
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <FolderPlus />, label: 'New Project' },
            { icon: <BookmarkPlus />, label: 'Saved Papers' },
            { icon: <Brain />, label: 'AI Assistant' },
            { icon: <FileText />, label: 'My Notes' }
          ].map((action, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg flex items-center gap-3 transition-colors ${
                isDark
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-white hover:bg-gray-50 text-gray-900'
              }`}
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        {/* Search Section */}
        <div className="mt-20 mb-20">
          <SearchComponent isDark={isDark} onSearchResults={handleSearchResults} />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-8 mb-8">
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Search Results
            </h2>
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
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Journal: {article.journal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Research Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: <BookOpen />, label: 'Papers Read', value: '42' },
            { icon: <TrendingUp />, label: 'Citations', value: '1.2K' },
            { icon: <Folder />, label: 'Active Projects', value: '5' }
          ].map((metric, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg flex items-center gap-4 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className={`p-3 rounded-full ${
                isDark ? 'bg-gray-700 text-purple-400' : 'bg-purple-50 text-purple-600'
              }`}>
                {metric.icon}
              </div>
              <div>
                <p className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {metric.value}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Projects */}
          <div className={`col-span-2 p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Projects
            </h2>
            <div className="space-y-4">
              {recentProjects.map(project => (
                <div
                  key={project.id}
                  className={`p-4 rounded-lg ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  } cursor-pointer transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {project.name}
                    </h3>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {project.lastModified}
                    </span>
                  </div>
                  <div className={`mt-2 flex gap-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {project.collaborators} collaborators
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={16} />
                      {project.articles} articles
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines and Recent Activity */}
          <div className="space-y-8">
            {/* Upcoming Deadlines */}
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Upcoming Deadlines
              </h2>
              <div className="space-y-4">
                {upcomingDeadlines.map(deadline => (
                  <div
                    key={deadline.id}
                    className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {deadline.title}
                    </h3>
                    <div className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        Due: {deadline.date}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Folder size={16} />
                        {deadline.project}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div
                    key={activity.id}
                    className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        isDark ? 'bg-gray-600 text-purple-400' : 'bg-purple-50 text-purple-600'
                      }`}>
                        <CheckCircle size={16} />
                      </div>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {activity.action}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.details}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* New Research Tools Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Methodology Tracker */}
          <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Methodology Tracker
              </h2>
              <button className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}>
                <FilePlus size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {methodologySteps.map(step => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      step.status === 'completed' ? 'bg-green-100 text-green-800' :
                      step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      {step.date}
                    </span>
                    <div className="flex items-center gap-2">
                      <Clipboard size={16} />
                      <span>{step.attachments} attachments</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reference Manager */}
          <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Reference Manager
              </h2>
              <div className="flex gap-2">
                <select
                  className={`px-3 py-2 rounded-lg text-sm ${
                    isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                >
                  {citationFormats.map(format => (
                    <option key={format.id} value={format.id}>
                      {format.name}
                    </option>
                  ))}
                </select>
                <button className={`p-2 rounded-lg ${
                  isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                  <Download size={20} />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {references.map(reference => (
                <div
                  key={reference.id}
                  className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <h3 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {reference.title}
                  </h3>
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {reference.authors.join(', ')}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      {reference.journal} ({reference.year})
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Quote size={16} />
                        {reference.citationCount}
                      </span>
                      <span className="uppercase">{reference.format}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collaboration Section */}
        <div className={`p-6 rounded-lg mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Collaboration
          </h2>
          <div className="space-y-4">
            {messages.map(message => (
              <div key={message.id} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{message.text}</p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className={`flex-1 p-2 rounded-lg ${
                isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
              }`}
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className={`p-2 rounded-lg ${
                isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* Research Timeline */}
        <div className={`p-6 rounded-lg mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Research Timeline
            </h2>
            <button className={`p-2 rounded-lg ${
              isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
            }`}>
              <Calendar size={20} />
            </button>
          </div>
          <div className="space-y-4">
            {timelineEvents.map(event => (
              <div
                key={event.id}
                className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {event.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    event.priority === 'high' ? 'bg-red-100 text-red-800' :
                    event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {event.priority} priority
                  </span>
                </div>
                <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {event.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {event.date}
                  </span>
                  <span className={`capitalize ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;