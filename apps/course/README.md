# Achilles Recovery Course App

React app for the Achilles Recovery Course, built with TanStack Router.

## Setup

### 1. Install Dependencies

```bash
bun install
```

### 2. Environment Variables

#### Local Development

Create a `.env.local` file in the root of this directory (optional - defaults are set):

```bash
# Supabase Configuration
# Local development (after running `supabase start` in services/thetis)
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH

# Course App URLs
VITE_WEBSITE_URL=https://thetismedical.com
VITE_COURSE_URL=http://localhost:2222
```

#### Production Mode (Local Testing with Production DB)

Create a `.env.production.local` file to test against production Supabase:

```bash
# Production Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key-here

# Production URLs
VITE_WEBSITE_URL=https://thetismedical.com
VITE_COURSE_URL=https://course.thetismedical.com
```

Then run:

```bash
bun run dev:prod
```

**Note:** Both `.env.local` and `.env.production.local` are gitignored. For production deployment, set these as environment variables in your hosting platform (Vercel, etc.).

### 3. Start Local Supabase (if testing locally)

```bash
cd ../../services/thetis
supabase start
```

This will start the local Supabase instance on port 54321.

### 4. Run Development Server

```bash
bun run dev
```

The app will be available at `http://localhost:2222`

## Supabase Integration

The app uses Supabase for:

- **Authentication**: Magic links and OTP codes
- **Course Access**: Checking enrollments from Shopify orders
- **Progress Tracking**: User progress through course sections

### Using Supabase Client

```typescript
import { supabase } from "@/lib/supabase";

// Example: Check if user has access to a course
const { data } = await supabase
  .from("enrollments")
  .select("*")
  .eq("user_id", userId)
  .eq("course_type", "standard")
  .eq("status", "active")
  .single();
```

### Using Auth Hook

```typescript
import { useAuth } from "@/hooks/use-auth";

function MyComponent() {
  const { user, loading, signInWithMagicLink, signOut } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <button onClick={() => signInWithMagicLink("user@example.com")}>Sign In</button>;
  
  return (
    <div>
      <p>Welcome {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## Project Structure

- `src/routes/` - TanStack Router routes
- `src/components/` - React components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utilities and Supabase client
- `src/content/` - Course content (TSX components)

## Building for Production

```bash
bun run build
```

The output will be in the `dist/` directory.
