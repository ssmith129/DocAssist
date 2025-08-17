import { Sidebar } from "./Sidebar";
import { useState, useEffect, useRef } from "react";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface BaseLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function BaseLayout({ children, title }: BaseLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      
      // Escape to close sidebar on mobile
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // Skip to main content functionality
  const skipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" role="application" aria-label="Healthcare Management System">
      {/* Skip to main content link for screen readers */}
      <a
        ref={skipLinkRef}
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          skipToMain();
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-violet-600 text-white px-4 py-2 rounded-md z-50 focus:z-[9999]"
        onFocus={(e) => {
          e.target.style.position = 'fixed';
          e.target.style.top = '1rem';
          e.target.style.left = '1rem';
        }}
        onBlur={(e) => {
          e.target.style.position = '';
          e.target.style.top = '';
          e.target.style.left = '';
        }}
      >
        Skip to main content
      </a>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <nav 
        role="navigation" 
        aria-label="Main navigation"
        className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto`}
      >
        <Sidebar />
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Header */}
        <header 
          role="banner"
          className="bg-white border-b border-gray-200 shadow-sm"
          aria-label="Page header"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            {/* Mobile menu button and page title */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={sidebarOpen}
                aria-controls="sidebar-navigation"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </Button>
              
              <h1 
                className="text-2xl font-bold text-gray-900 truncate"
                role="heading"
                aria-level={1}
              >
                {title}
              </h1>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4" role="toolbar" aria-label="Header actions">
              {/* Search */}
              <div className="relative hidden sm:block">
                <label htmlFor="global-search" className="sr-only">
                  Search patients, appointments, or clinical data
                </label>
                <Search 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" 
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  id="global-search"
                  type="search"
                  placeholder="Search patients, appointments..."
                  className={`
                    pl-10 pr-4 w-64 h-10 bg-gray-50 border-2 rounded-lg text-sm
                    placeholder:text-gray-500 transition-all duration-200
                    focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none
                    focus:bg-white
                    ${searchFocused ? 'border-violet-500 bg-white' : 'border-gray-200'}
                  `}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  aria-describedby="search-hint"
                  autoComplete="off"
                />
                <div id="search-hint" className="sr-only">
                  Use Ctrl+K or Cmd+K to quickly focus the search field
                </div>
              </div>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative hover:bg-gray-100 focus:ring-2 focus:ring-violet-200"
                    aria-label="Notifications - 3 unread"
                    aria-describedby="notification-count"
                  >
                    <Bell className="w-5 h-5 text-gray-700" aria-hidden="true" />
                    <span 
                      id="notification-count"
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                      aria-live="polite"
                    >
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-600">You have 3 unread notifications</p>
                  </div>
                  <DropdownMenuItem className="p-3 focus:bg-red-50">
                    <div>
                      <p className="font-medium text-red-800">Critical Lab Result</p>
                      <p className="text-sm text-red-600">Patient John Doe - Immediate attention required</p>
                      <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 focus:bg-yellow-50">
                    <div>
                      <p className="font-medium text-yellow-800">Medication Reminder</p>
                      <p className="text-sm text-yellow-600">Patient Sarah Johnson - Due at 3:00 PM</p>
                      <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 focus:bg-blue-50">
                    <div>
                      <p className="font-medium text-blue-800">Appointment Reminder</p>
                      <p className="text-sm text-blue-600">Dr. Smith consultation in 30 minutes</p>
                      <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-2 hover:bg-gray-100 focus:ring-2 focus:ring-violet-200"
                    aria-label="User menu - Dr. Sarah Johnson"
                  >
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-violet-600" aria-hidden="true" />
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      Dr. Johnson
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="p-3 border-b">
                    <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Attending Physician</p>
                    <p className="text-sm text-gray-600">Cardiology Department</p>
                  </div>
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuItem>Security</DropdownMenuItem>
                  <DropdownMenuItem className="border-t">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <nav 
            aria-label="Breadcrumb navigation" 
            className="hidden sm:block border-t border-gray-100 bg-gray-50 px-4 sm:px-6 lg:px-8 py-2"
          >
            <ol className="flex items-center space-x-2 text-sm" role="list">
              <li>
                <a 
                  href="/" 
                  className="text-gray-500 hover:text-gray-700 focus:text-violet-600 focus:outline-none focus:underline"
                  aria-label="Go to dashboard"
                >
                  Dashboard
                </a>
              </li>
              <li aria-hidden="true" className="text-gray-400">/</li>
              <li aria-current="page" className="text-gray-900 font-medium">
                {title}
              </li>
            </ol>
          </nav>
        </header>

        {/* Main Content */}
        <main 
          id="main-content"
          role="main"
          className="flex-1 px-4 sm:px-6 lg:px-8 py-6 focus:outline-none"
          tabIndex={-1}
          aria-label={`${title} page content`}
        >
          {/* Status/Alert Bar for Screen Readers */}
          <div 
            role="status" 
            aria-live="polite" 
            aria-label="Page status updates"
            className="sr-only"
            id="page-status"
          >
            {title} page loaded successfully
          </div>

          {/* High Contrast Mode Indicator */}
          <div className="sr-only" aria-live="polite" id="accessibility-status">
            Healthcare EHR System - Accessibility features enabled
          </div>

          {children}
        </main>

        {/* Footer with accessibility info */}
        <footer 
          role="contentinfo" 
          className="bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-4"
          aria-label="Page footer"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>© 2024 Healthcare EHR System</span>
              <span className="hidden sm:inline">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <button 
                className="hover:text-gray-900 focus:text-violet-600 focus:outline-none focus:underline"
                aria-label="Contact technical support"
              >
                Support
              </button>
              <button 
                className="hover:text-gray-900 focus:text-violet-600 focus:outline-none focus:underline"
                aria-label="View accessibility statement"
              >
                Accessibility
              </button>
              <span className="text-xs">
                Keyboard shortcuts: Ctrl+K (Search), Tab (Navigate)
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
