import { useAuth } from "./hooks/useAuth";
import { Button } from "@/components/ui/button"; // Assuming you're using a UI component library
import { useLogout } from "./hooks/useLogout";

export function Logout() {
    const { data: user } = useAuth();
    const { mutate: logout } = useLogout();
    if (!user) {
        return null;
    }

    return (
        <Button
            variant="outline"
            onClick={logout}
        >
            Logout
        </Button>
    );
}
