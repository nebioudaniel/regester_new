'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image' // Correct

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <nav className="bg-white  fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
     <div className="pl-7">
  <Image
    src="/h.png"
    width={250}
    height={250}
    alt="Multiverse Logo"
    className="mx-[-50]"
  />
</div>


        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
          <li><Link href="/how">How to Regester</Link></li>
          <li>
            <Link
              href="/register"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Register
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div ref={menuRef} className="md:hidden px-4 pb-4 bg-white shadow">
          <ul className="space-y-3 text-gray-700 font-medium">
            <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/how" onClick={() => setIsOpen(false)}>How to Regester</Link></li>
            <li>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
