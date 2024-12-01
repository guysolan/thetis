import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";

export default function Authentication() {
  return (
    <Card className="mx-auto my-8 w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </CardContent>
    </Card>
  );
}
