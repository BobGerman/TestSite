'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/pages/generateText', label: 'Generate Text' },
  { href: '/pages/streamText', label: 'Stream Text' },
  { href: '/pages/generateRecipe', label: 'Generate Recipe' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <h2 className="sidebar-title">AI Demo</h2>
        <ul className="nav-list">
          {navigationLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
