import React from 'react';
import { Brain, Mail, MessageSquare, HelpCircle, Twitter, Github, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-700 pt-8 flex items-center justify-between bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Title */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-purple-400" />
              <span className="ml-2 text-2xl font-bold">InQuest</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering researchers with AI-driven tools for smarter, faster, and more collaborative research.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/help" className="text-gray-400 hover:text-white">
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Email Form for Queries */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Have Questions?</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your message"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Trademark Section */}
        <div className="mt-8 border-t border-gray-700 pt-8 flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-purple-400" />
            <span className="ml-2 text-sm text-gray-400">© 2024 InQuest. All rights reserved.</span>
          </div>
          <span className="text-sm text-gray-400">Built by AmalikAli</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;