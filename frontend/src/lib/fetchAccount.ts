import { supabase } from '@/lib/Auth.ts'
import type { AccountRow } from '@/types'

export async function fetchAccount(email: string) {
  const { data, error } = await supabase.from('accounts').select().eq('email', email).limit(1)
  if (error) {
    console.log('supa error', error)
    throw new Error('Error fetching account')
  }

  console.log('fetched account', data)

  if (data.length > 0) {
    return data[0] as AccountRow
  }

  // we don't have an account row in the database, so we have to return some default values.
  // these are needed for the cache to upsert a new account row
  return {
    email,
    username: '',
    min_number_of_cards_to_keep: 1,
    max_number_of_cards_wanted: 1,
  } as AccountRow & { email: string }
}

export async function fetchPublicAccount(friendId: string) {
  const { data, error } = await supabase.from('public_accounts').select().eq('friend_id', friendId).limit(1)
  if (error) {
    console.log('supa error', error)
    throw new Error('Error fetching account')
  }

  console.log('fetched account', data)

  if (data.length > 0) {
    return data[0] as AccountRow
  }
  return null
}
