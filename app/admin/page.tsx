'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Footer from '../footer/page';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.username === 'admin' && form.password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin/dashboard');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Link
        href="/"
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </Link>

      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

        <Input
          name="username"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        {/* Password with toggle */}
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
    <Footer />
    </>
  );
}
