import { Link, useLocation } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { features } from "./content";
import MyCompany from "../companies/components/MyCompany";
import { useLogout } from "../auth/hooks/useLogout";
import { useAuth } from "../auth/hooks/useAuth";
import { cn } from "../../lib/utils";

const SidebarContent = () => {
  const location = useLocation();
  const { mutate: logout } = useLogout();
  const { data: user } = useAuth();
  const currentSection = location.pathname.split("/")[2];

  return (
    <div className="flex flex-col w-full h-full">
      {/* Company selector */}
      <div className="flex items-center px-3 border-sidebar-border border-b h-12">
        <MyCompany />
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-0.5 px-2 py-2">
        {Object.values(features).map((item) => {
          const isActive = currentSection === item.slug;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 rounded-md h-8 font-medium text-sm transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <span className="[&_svg]:size-4 shrink-0">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      {user && (
        <div className="px-2 py-2 border-sidebar-border border-t">
          <button
            type="button"
            onClick={() => logout()}
            className="flex items-center gap-3 hover:bg-sidebar-accent px-3 rounded-md w-full h-8 font-medium text-sidebar-foreground text-sm transition-colors hover:text-sidebar-accent-foreground"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarContent;
