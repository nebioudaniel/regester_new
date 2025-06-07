// components/Footer.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card'; // Assuming default shadcn path
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Footer = () => {
  return (
    <Card className="rounded-none border-t border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <CardContent className="container mx-auto px-4 py-6 md:flex md:items-center md:justify-between text-center md:text-left">
        {/* Left Section: Copyright and Company Name */}
        <div className="mb-4 md:mb-0 text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Multiverse Enterprise plc. All rights reserved.
        </div>

        {/* Right Section: Navigation Links (Optional) */}
        <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
          <Link href="/" passHref>
            <Button variant="link" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Privacy Policy
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="link" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Terms of Service
            </Button>
          </Link>
          <Link href="/t" passHref>
            <Button variant="link" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Contact Us
            </Button>
          </Link>
        </nav>
      </CardContent>
    </Card>
  );
};

export default Footer;