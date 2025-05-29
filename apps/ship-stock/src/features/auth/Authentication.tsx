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
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "hsl(var(--neutral-900))",
                  brandAccent: "hsl(var(--neutral-700))",
                  brandButtonText: "hsl(var(--neutral-50))",
                  inputBackground: "hsl(var(--neutral-50))",
                  inputBorder: "hsl(var(--neutral-200))",
                  inputBorderHover: "hsl(var(--neutral-300))",
                  inputBorderFocus: "hsl(var(--neutral-400))",
                  inputText: "hsl(var(--neutral-900))",
                  inputPlaceholder: "hsl(var(--neutral-500))",
                },
                borderWidths: {
                  buttonBorderWidth: "1px",
                  inputBorderWidth: "1px",
                },
                radii: {
                  borderRadiusButton: "0.5rem",
                  buttonBorderRadius: "0.5rem",
                  inputBorderRadius: "0.5rem",
                },
              },
            },
            className: {
              container: "w-full",
              button:
                "w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-50",
              input:
                "w-full bg-neutral-50 border-neutral-200 focus:border-neutral-400",
              label: "text-neutral-900",
              loader: "border-neutral-900",
              message: "text-neutral-900",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
