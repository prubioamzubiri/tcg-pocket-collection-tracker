import { supabase } from '@/lib/Auth.ts'
import type { AccountRow } from '@/types'

export async function fetchAccount() {
  const { data, error } = await supabase.from('accounts').select().limit(1)
  if (error) {
    console.log('supa error', error)
    throw new Error('Error fetching collection')
  }

  console.log('fetched account', data)

  if (data.length > 0) {
    return data[0] as AccountRow
  }
  return null
}
