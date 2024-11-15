'use server'

import { createClient } from '@/utils/supabase/server'

export async function insertData({ title }: { title: string }) {

    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return;

    const item = {
        user_id: user.id,
        is_loading: true,
    }

    const { data: inserted, error } = await supabase
        .from('items')
        .insert(item).select("*");

    if(error || !inserted) {
        console.log(`挿入失敗：${error ?? "エラーなし"}`)
        return null;
    }

    return inserted[0];
}