import { supabase } from './supabase'

export async function getReviews() {
    const { data, error } = await supabase.from('reviews').select()
    if (error) {
        console.log(error)
    }
    if (data) {
        console.log(data)
    }
    return { number: 124, average: 4.5 }
}
