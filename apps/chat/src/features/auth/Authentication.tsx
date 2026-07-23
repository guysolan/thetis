import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@thetis/ui/card";

export default function Authentication() {
  return (
    <Card className="mx-auto my-8 w-full max-w-md">
      <CardHeader>
        <CardTitle>Thetis Assistants — Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Auth
          supabaseClient={supabase}
          view="sign_in"
          showLinks={false}
          providers={[]}
          redirectTo={`${window.location.origin}/`}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "hsl(var(--primary))",
                  brandAccent: "hsl(var(--primary) / 0.85)",
                  brandButtonText: "hsl(var(--primary-foreground))",
                  inputBackground: "hsl(var(--background))",
                  inputBorder: "hsl(var(--border))",
                  inputBorderHover: "hsl(var(--ring))",
                  inputBorderFocus: "hsl(var(--ring))",
                  inputText: "hsl(var(--foreground))",
                  inputPlaceholder: "hsl(var(--muted-foreground))",
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
