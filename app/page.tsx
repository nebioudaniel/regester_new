'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button'; // using shadcn/ui
import { IconArrowRight } from '@tabler/icons-react';
import Navbar from './Navbar/page';
import Footer from './footer/page';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black">
        {/* Hero Section */}
       <main className="flex flex-col items-center justify-center text-center px-6 py-[160px] lg:py-[190px]">
          <h1 className="text-5xl font-extrabold leading-tight mb-6 max-w-3xl">
            Welcome to <span className="text-red-600">Multiverse PLC Registration Platform</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Multiverse Enterprise PLC is a leading player in East Africa’s market, dedicated to driving economic growth and development.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/register">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Register</Button>
            </Link>
            <Link href="/how">
              <Button variant="outline" className="text-black-600 border-red-600 hover:bg-black-50">
                How to Register
                <IconArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </main>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 pb-20">
          {[
  {
    title: 'Construction',
    description: 'Consultancy and hands-on support to help you build your construction projects efficiently and with modern practices.',
  },
  {
    title: 'Import',
    description: 'We assist you with importing goods, ensuring compliance and cost-effectiveness every step of the way.',
  },
  {
    title: 'Export',
    description: 'Comprehensive support for exporting your products, including documentation, logistics, and market access.',
  },
  {
    title: 'Tech Solutions',
    description: 'Providing software development, IT consulting, and custom tech tools to grow your business digitally.',
  },
  {
    title: 'Training & Capacity Building',
    description: 'Offering workshops and courses to upskill your team in technology, management, and international trade.',
  },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-red-600">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </section>
      </div>
      <Footer/>
    </>
  );
}
