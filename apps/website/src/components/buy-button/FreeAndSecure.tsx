import React from "react";
import { CheckCircle, Flag, Shield } from "lucide-react";
import { content } from "../products/night-splint/content.ts";
import type { Lang } from "../../config/languages.ts";

interface Props {
  lang: Lang;
}

const FreeAndSecure = ({ lang = "en" }: Props) => {
  const t = content[lang]?.freeAndSecure || content.en.freeAndSecure;
  return (
    <div className="justify-center gap-2 md:gap-4 grid grid-cols-3 text-primary text-base">
      <div className="flex justify-center items-center gap-2">
        <CheckCircle size={20} />
        <span className="text-neutral-800 text-left">{t.shipping}</span>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Shield size={20} />
        <span className="text-neutral-800 text-left">{t.payment}</span>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Flag size={20} />
        <span className="text-neutral-800 text-left">{t.madeIn}</span>
      </div>
    </div>
  );
};

export default FreeAndSecure;
