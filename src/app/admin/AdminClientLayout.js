"use client";
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './admin-css.css';

export default function AdminClientLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'galleries';

  return (
    <div className="admin-dashboard-wrapper">
      {/* Mobile Overlay */}
      <div 
        className={`admin-overlay ${isSidebarOpen ? 'active' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
        aria-label="Close sidebar overlay"
        role="button"
        tabIndex={0}
      ></div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'active' : ''}`} id="admin-sidebar" aria-label="Admin Navigation Sidebar">
        <div className="admin-brand">
          <i className='bx bx-camera'></i> LensAdmin
        </div>
        <nav>
          <ul className="admin-nav">
            <li className="admin-nav-item">
              <Link 
                href="/admin?tab=galleries" 
                className={`admin-nav-link ${currentTab === 'galleries' ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
                aria-current={currentTab === 'galleries' ? 'page' : undefined}
              >
                <i className='bx bx-images'></i> Manage Galleries
              </Link>
            </li>
            <li className="admin-nav-item">
              <Link 
                href="/admin?tab=projects" 
                className={`admin-nav-link ${currentTab === 'projects' ? 'active' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
                aria-current={currentTab === 'projects' ? 'page' : undefined}
              >
                <i className='bx bx-folder-open'></i> Manage Projects
              </Link>
            </li>
            <li className="admin-nav-item mt-4">
              <a href="/" className="admin-nav-link text-muted" aria-label="Return back to the main public website">
                <i className='bx bx-log-out'></i> Back to Website
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-content">
        <header className="admin-topbar">
          <div className="d-flex align-items-center">
            <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(true)} aria-label="Open mobile navigation menu">
              <i className='bx bx-menu' aria-hidden="true"></i>
            </button>
            <h1 className="mb-0 fw-bold h4">Admin Dashboard</h1>
          </div>
          <div className="admin-topbar-actions">
            <button className="btn-icon" aria-label="View all system notifications"><i className='bx bx-bell'></i></button>
            <div className="admin-user-avatar">
              <img src="https://ui-avatars.com/api/?name=Ziad+El-Assad&background=D4AF37&color=fff" alt="Administrator Ziad El-Assad Profile" width="40" height="40" />
            </div>
          </div>
        </header>

        <main className="admin-content-pad">
          {children}
        </main>
      </div>
    </div>
  );
}
