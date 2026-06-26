import { cookies } from "next/headers";
import { cache } from "react";
import { createClient } from "./server";

export const getUser = cache(async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  return user;
});
