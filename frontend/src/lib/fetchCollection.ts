import type { CollectionRow } from '@/types'
import { supabase } from './Auth'

const PAGE_SIZE = 500

export async function fetchCollection(email: string) {
  const { count, error } = await supabase.from('collection').select('*', { count: 'exact', head: true })

  if (error) {
    throw new Error('Error fetching collection')
  }

  if (!count) {
    return []
  }

  return fetchRange(email, count, 0, PAGE_SIZE)
}

const fetchRange = async (email: string, total: number, start: number, end: number): Promise<CollectionRow[]> => {
  console.log('fetching range', total, start, end)

  //select * from public_cards where friend_id = '0298285743526180';

  const { data, error } = await supabase.from('collection').select().eq('email', email).range(start, end)
  if (error) {
    console.log('supa error', error)
    throw new Error('Error fetching collection')
  }

  if (end < total) {
    return [...data, ...(await fetchRange(email, total, end + 1, Math.min(total, end + PAGE_SIZE)))]
  }

  return data as CollectionRow[]
}
