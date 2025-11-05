import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@thetis/ui/table";
import type { Lang } from "../config/languages.ts";

interface SizeCalculatorProps {
  lang: Lang;
}

const content = {
  en: {
    instruction:
      "To find the right size, measure your foot from heel to toe and use the table below. If you are between sizes, we recommend choosing the larger size.",
    caption: "If you need further assistance, please contact our support team.",
    size: "Size",
    footLengthCm: "Foot Length (cm)",
    footLengthIn: "Foot Length (inches)",
    small: "Small",
    large: "Large",
  },
  de: {
    instruction:
      "Um die richtige Größe zu finden, messen Sie Ihren Fuß von der Ferse bis zu den Zehen und verwenden Sie die folgende Tabelle. Wenn Sie zwischen zwei Größen liegen, empfehlen wir, die größere Größe zu wählen.",
    caption:
      "Wenn Sie weitere Hilfe benötigen, wenden Sie sich bitte an unser Support-Team.",
    size: "Größe",
    footLengthCm: "Fußlänge (cm)",
    footLengthIn: "Fußlänge (Zoll)",
    small: "Klein",
    large: "Groß",
  },
  fr: {
    instruction:
      "Pour trouver la bonne taille, mesurez votre pied du talon aux orteils et utilisez le tableau ci-dessous. Si vous êtes entre deux tailles, nous vous recommandons de choisir la plus grande.",
    caption:
      "Si vous avez besoin d'aide supplémentaire, veuillez contacter notre équipe de support.",
    size: "Taille",
    footLengthCm: "Longueur du pied (cm)",
    footLengthIn: "Longueur du pied (pouces)",
    small: "Petit",
    large: "Grand",
  },
  es: {
    instruction:
      "Para encontrar la talla correcta, mida su pie desde el talón hasta la punta y use la tabla a continuación. Si está entre dos tallas, le recomendamos que elija la talla más grande.",
    caption:
      "Si necesita más ayuda, póngase en contacto con nuestro equipo de soporte.",
    size: "Talla",
    footLengthCm: "Longitud del pie (cm)",
    footLengthIn: "Longitud del pie (pulgadas)",
    small: "Pequeño",
    large: "Grande",
  },
  it: {
    instruction:
      "Per trovare la taglia giusta, misura il tuo piede dal tallone alla punta e usa la tabella qui sotto. Se sei tra due taglie, ti consigliamo di scegliere la taglia più grande.",
    caption:
      "Se hai bisogno di ulteriore assistenza, contatta il nostro team di supporto.",
    size: "Taglia",
    footLengthCm: "Lunghezza del piede (cm)",
    footLengthIn: "Lunghezza del piede (pollici)",
    small: "Piccolo",
    large: "Grande",
  },
};

const SizeCalculator: React.FC<SizeCalculatorProps> = ({ lang = "en" }) => {
  const t = content[lang];
  return (
    <div>
      <p className="mb-4">{t.instruction}</p>
      <Table>
        <TableCaption>{t.caption}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>{t.size}</TableHead>
            <TableHead>{t.footLengthCm}</TableHead>
            <TableHead>{t.footLengthIn}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{t.small}</TableCell>
            <TableCell>&lt; 26.5</TableCell>
            <TableCell>&lt; 10.4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{t.large}</TableCell>
            <TableCell>&ge; 26.5</TableCell>
            <TableCell>&ge; 10.4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SizeCalculator;
