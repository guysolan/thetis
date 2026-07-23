import { Checkbox } from "@thetis/ui/checkbox";
import { Label } from "@thetis/ui/label";
import type { Platform } from "@/api/knowledge";
import { PLATFORMS } from "@/constants/platforms";

interface Props {
  values: Platform[];
  onChange: (values: Platform[]) => void;
}

export function PlatformMultiSelect({ values, onChange }: Props) {
  function toggle(platform: Platform, checked: boolean) {
    if (checked) {
      onChange([...values, platform]);
    } else {
      onChange(values.filter((p) => p !== platform));
    }
  }

  return (
    <div className="flex flex-wrap gap-4">
      {PLATFORMS.map((p) => {
        const id = `platform-${p.value}`;
        const checked = values.includes(p.value);
        return (
          <div key={p.value} className="flex items-center gap-2">
            <Checkbox
              id={id}
              checked={checked}
              onCheckedChange={(v) => toggle(p.value, v === true)}
            />
            <Label htmlFor={id} className="font-normal cursor-pointer">
              {p.label}
              <span className="text-muted-foreground text-xs">
                {" "}· {p.audience}
              </span>
            </Label>
          </div>
        );
      })}
    </div>
  );
}
