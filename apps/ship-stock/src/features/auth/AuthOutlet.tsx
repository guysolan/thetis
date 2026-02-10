import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Outlet } from "@tanstack/react-router";
import Authentication from "./Authentication";

export default function AuthOutlet() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session);
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Authentication />;
  }

  return (
    <main className="flex-1 overflow-auto p-6">
      <Outlet />
    </main>
  );
}
