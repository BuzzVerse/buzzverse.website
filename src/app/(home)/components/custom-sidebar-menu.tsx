'use client'

import * as React from 'react'
import { Menu, X, Home, Cpu, Newspaper, Radio, User } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

const menuItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Cpu, label: 'Projects', href: '/project' },
  { icon: Newspaper, label: 'News', href: '/news' },
  { icon: Radio, label: 'Media', href: '/media' },
  { icon: User, label: 'About Us', href: '/about' },
]

export function CustomSidebarMenu() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className='md:hidden'>
      <Button
        variant="ghost"
        size="icon"
        className="fixed right-4 top-4 z-50 md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 transform bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <h2 id="sidebar-title" className="text-lg font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link 
                  href={item.href} 
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

