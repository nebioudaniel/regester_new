'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, UserPlus, Mail, CheckCircle2, Lock, Smartphone, Lightbulb, MousePointerClick } from 'lucide-react'; // Added Lightbulb and MousePointerClick
import Link from 'next/link';
import Footer from '../footer/page';

export default function HowToRegister() {
  const steps = [
    {
      icon: <UserPlus className="h-8 w-8 text-red-600 animate-fade-in" />,
      title: 'Step 1: Your Basic Information',
      description: 'First, fill in your **First Name** and **Last Name** in the designated fields. We use this to address you personally.',
      animation: (
        <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg shadow-inner">
          <UserPlus className="h-12 w-12 text-red-400 animate-scale-in" />
          <ArrowRight className="h-8 w-8 text-red-400 mx-4 animate-bounce-right" />
          <span className="text-xl font-semibold text-gray-700">Name Fields</span>
        </div>
      )
    },
    {
      icon: <Mail className="h-8 w-8 text-red-600 animate-fade-in" />,
      title: 'Step 2: Contact Details - Email',
      description: 'Next, enter your **Email Address**. This is crucial because we will send important updates and your confirmation link here.',
      animation: (
        <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg shadow-inner">
          <Mail className="h-12 w-12 text-red-400 animate-scale-in" />
          <ArrowRight className="h-8 w-8 text-red-400 mx-4 animate-bounce-right" />
          <span className="text-xl font-semibold text-gray-700">your@example.com</span>
        </div>
      )
    },
    {
      icon: <Smartphone className="h-8 w-8 text-red-600 animate-fade-in" />,
      title: 'Step 3: Contact Details - Phone Number',
      description: "Provide your **Phone Number**. Please ensure it's accurate, as we'll use this for direct communication if needed.",
      animation: (
        <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg shadow-inner">
          <Smartphone className="h-12 w-12 text-red-400 animate-scale-in" />
          <ArrowRight className="h-8 w-8 text-red-400 mx-4 animate-bounce-right" />
          <span className="text-xl font-semibold text-gray-700">555-123-4567</span>
        </div>
      )
    },
    {
      icon: <Lock className="h-8 w-8 text-red-600 animate-fade-in" />,
      title: 'Step 4: Create Your Password',
      description: 'Enter a strong **Password**. Make sure to save it in a secure place – you\'ll need it to log in later!',
      animation: (
        <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg shadow-inner">
          <Lock className="h-12 w-12 text-red-400 animate-scale-in" />
          <ArrowRight className="h-8 w-8 text-red-400 mx-4 animate-bounce-right" />
          <span className="text-xl font-semibold text-gray-700">********</span>
        </div>
      )
    },
    {
      icon: <Mail className="h-8 w-8 text-red-600 animate-fade-in" />,
      title: 'Step 5: Confirm Your Email',
      description: 'After clicking the registration button, we will send a **Confirmation Email** to the address you provided. **Click the link** inside that email to verify your account.',
      animation: (
        <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg shadow-inner text-center">
          <Lightbulb className="h-12 w-12 text-red-400 animate-pulse-light" />
          <p className="mt-2 text-xl font-semibold text-gray-700">Check your inbox!</p>
          <MousePointerClick className="h-10 w-10 text-red-400 mt-2 animate-bounce-click" />
        </div>
      )
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-red-600 animate-fade-in" />,
      title: 'Step 6: You Are Registered!',
      description: "Once your email is confirmed, you're all set! Welcome to Multiverse Enterprise PLC.",
      animation: (
        <div className="flex flex-col items-center justify-center p-4 bg-red-50 rounded-lg shadow-inner text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 animate-checkmark-pop" />
          <p className="mt-2 text-2xl font-bold text-green-700">Success!</p>
        </div>
      )
    }
  ];

  return (
    <>
    <div className="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        @keyframes pulse-light {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes bounce-click {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-8px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-4px); }
        }
        @keyframes checkmark-pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }

        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.6s ease-out forwards; }
        .animate-bounce-right { animation: bounce-right 1s infinite; }
        .animate-pulse-light { animation: pulse-light 2s infinite ease-in-out; }
        .animate-bounce-click { animation: bounce-click 1.5s infinite; }
        .animate-checkmark-pop { animation: checkmark-pop 0.7s ease-out forwards; }
      `}</style>

      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Your Easy Guide to Registration
        </h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Follow these simple, animated steps to quickly and securely create your account with Multiverse Enterprise PLC.
        </p>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <div className="flex-shrink-0 p-4 bg-red-100 rounded-full flex items-center justify-center">
                {step.icon}
              </div>
              <div className="text-center md:text-left flex-grow">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h2>
                <p className="text-gray-600 text-base leading-relaxed">{step.description}</p>
                {step.animation && (
                  <div className="mt-6 flex justify-center md:justify-start">
                    {step.animation}
                  </div>
                )}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full transform -translate-y-1/2 -ml-8">
                  <ArrowRight className="h-10 w-10 text-red-500 animate-bounce-right" />
                </div>
              )}
              {i < steps.length - 1 && (
                <div className="block md:hidden absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2 mt-6">
                  <ArrowRight className="h-10 w-10 text-red-500 rotate-90 animate-bounce-right" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20">
          <Card className="p-8 bg-red-50 text-center border-red-200">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl font-bold text-red-700">Ready to Get Started?</CardTitle>
              <CardDescription className="text-lg text-red-600">
                Click the button below to begin your registration journey!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Link href="/register">
                <Button className="bg-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 ease-in-out">
                  Start Registration Now <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}