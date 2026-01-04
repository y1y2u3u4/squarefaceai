'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items = [] }: BreadcrumbProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-3">
        <ol
          className="flex items-center gap-2 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {allItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              {item.href && index < allItems.length - 1 ? (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
                  itemProp="item"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span className="text-gray-800 font-medium flex items-center gap-1" itemProp="name">
                  {index === 0 && <Home className="w-4 h-4" />}
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
