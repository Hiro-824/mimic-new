import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server'
import { Box } from '@chakra-ui/react';
import { Background } from '@/components/background';
import { Account } from './account';

export default async function AccountPage() {

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login");
  }

  return (
    <Box>
      <Account />
      <Background />
    </Box>
  )
}