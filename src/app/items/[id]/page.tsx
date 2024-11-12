import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { Item } from "./item";

export default async function Id({ params, }: { params: Promise<{ id: string }> }) {

  const id = (await params).id;

  const supabase = await createClient();

  const { data: item, error } = await supabase.from("items").select().eq('id', id).single();

  if (!item || error) {
    redirect('/items');
  }

  return (
    <>
      <Item id={id} item={item} />
    </>
  );
}