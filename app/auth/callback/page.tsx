'use client';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const insertUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { email, user_metadata } = user;

        await supabase.from('users').insert({
          email,
          first_name: user_metadata.first_name,
          last_name: user_metadata.last_name,
          phone: user_metadata.phone,
        });
        router.push('/thank-you');
      }
    };

    insertUser();
  }, []);

  return <p>Verifying and redirecting...</p>;
}
