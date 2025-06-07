'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import Footer from '../footer/page'; // Assuming your footer is correctly located here

// Shadcn UI components for alert dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Clear previous errors

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          first_name: form.firstName,
          last_name: form.lastName,
          phone: form.phone,
        },
        // This URL is where the user is redirected AFTER they click the confirmation link in their email.
        // It will open in the same tab.
        emailRedirectTo: `${window.location.origin}/thank-you`,
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setRegistrationSuccess(true);
    }
  };

  return (
    <>
      <main className="min-h-screen flex flex-col items-center px-4 py-[160px] lg:py-[190px] max-w-md mx-auto">
        {/* Back to Home Button - Still useful even if not immediately used after success */}
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-red-600 hover:underline self-start mb-6"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        {/* Conditional Rendering based on registrationSuccess */}
        {registrationSuccess ? (
          <>
            <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
              Check your email to verify your account.
            </h2>
            <p className="text-center text-gray-600">
              A verification link has been sent to **{form.email}**. Please click the link to complete your registration.
            </p>

            {/* Shadcn AlertDialog for a prominent message */}
            <AlertDialog open={registrationSuccess} onOpenChange={setRegistrationSuccess}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Verification Email Sent</AlertDialogTitle>
                  <AlertDialogDescription>
                    A verification link has been sent to **{form.email}**. Please check your inbox and spam folder to verify your account.
                    After verification, you will be redirected to our thank you page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  {/* Keep the dialog open, or just close it without navigating */}
                  <AlertDialogAction onClick={() => setRegistrationSuccess(false)}>
                    Got it!
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-8 text-gray-800">
              Register to Multiverse Enterprise Plc
            </h2>

            <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
              <Input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Input
                name="phone"
                placeholder="Phone Number"
                onChange={handleChange}
                required
                disabled={loading}
              />

              {/* Password with show/hide button */}
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                  className="pr-12" // extra padding for the icon
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}

              <Button type="submit" className="w-full mt-2" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  'Register'
                )}
              </Button>
            </form>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}