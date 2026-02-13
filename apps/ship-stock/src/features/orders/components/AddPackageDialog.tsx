import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@thetis/ui/dialog";
import { Button } from "@thetis/ui/button";
import { Input } from "@thetis/ui/input";
import { Badge } from "@thetis/ui/badge";
import { ScrollArea } from "@thetis/ui/scroll-area";
import { Search, Package, Box, Weight } from "lucide-react";
import type { ItemView } from "@/features/items/types";

interface AddPackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packages: ItemView[];
  onAdd: (packageId: string) => void;
}

export default function AddPackageDialog({
  open,
  onOpenChange,
  packages,
  onAdd,
}: AddPackageDialogProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return packages;
    const q = search.trim().toLowerCase();
    return packages.filter(
      (p) =>
        (p.item_name ?? "").toLowerCase().includes(q) ||
        (p.components ?? []).some(
          (c) =>
            (c.component_name ?? "").toLowerCase().includes(q),
        ),
    );
  }, [packages, search]);

  const handleSelect = (packageId: string) => {
    onAdd(packageId);
    setSearch("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add package</DialogTitle>
          <DialogDescription>
            Choose a package to add to this order. You can search by package name
            or component name.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search packages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <ScrollArea className="flex-1 min-h-0 overflow-auto">
          <div className="pr-3 space-y-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                {packages.length === 0
                  ? "No packages defined yet."
                  : "No packages match your search."}
              </p>
            ) : (
              filtered.map((pkg) => (
                <PackageOption
                  key={pkg.item_id}
                  pkg={pkg}
                  onAdd={() => handleSelect(String(pkg.item_id))}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function PackageOption({
  pkg,
  onAdd,
}: {
  pkg: ItemView;
  onAdd: () => void;
}) {
  const components = (pkg.components ?? []) as {
    component_name?: string;
    component_quantity?: number;
    component_type?: string;
  }[];
  const hasDimensions =
    pkg.height != null &&
    pkg.width != null &&
    pkg.depth != null &&
    [pkg.height, pkg.width, pkg.depth].every((n) => n != null && Number(n) > 0);
  const hasWeight =
    pkg.weight != null && Number(pkg.weight) > 0;

  return (
    <div className="flex items-start justify-between gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <Package className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="font-medium truncate">{pkg.item_name}</span>
        </div>
        {components.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {components.map((c, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="text-xs font-normal"
              >
                {c.component_name} × {c.component_quantity ?? 1}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {hasDimensions && (
            <Badge variant="outline" className="gap-1 text-xs font-normal">
              <Box className="h-3 w-3" />
              {pkg.height} × {pkg.width} × {pkg.depth} cm
            </Badge>
          )}
          {hasWeight && (
            <Badge variant="outline" className="gap-1 text-xs font-normal">
              <Weight className="h-3 w-3" />
              {pkg.weight} kg
            </Badge>
          )}
        </div>
      </div>
      <Button
        type="button"
        size="sm"
        onClick={onAdd}
        className="shrink-0"
      >
        Add
      </Button>
    </div>
  );
}
