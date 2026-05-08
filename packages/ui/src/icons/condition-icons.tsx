import * as React from "react";
import type { SVGProps } from "react";
import { cn } from "../utils";

const accentStroke = "hsl(var(--primary))";

type IconProps = SVGProps<SVGSVGElement>;

function iconSvgProps(
  className: string | undefined,
  props: IconProps,
): SVGProps<SVGSVGElement> {
  const { className: cnProp, ...rest } = props;
  return {
    className: cn(
      "shrink-0 text-neutral-900 dark:text-neutral-100",
      className,
      cnProp,
    ),
    viewBox: "0 0 196 196",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    ...rest,
  };
}

export function AchillesRuptureConditionIcon({
  className,
  ...props
}: IconProps) {
  const p = iconSvgProps(className, props);
  return (
    <svg {...p}>
      <path
        d="M52.0188 105.431C49.8514 108.682 45.795 118.064 46.9098 129.583C47.7639 138.407 56.1992 141.659 60.8438 141.659"
        stroke="currentColor"
        strokeWidth="6.50237"
        strokeLinecap="round"
      />
      <path
        d="M15.7922 11.6113C20.9012 30.4992 30.2832 75.1488 26.9391 102.645C22.759 137.014 10.2188 136.085 10.2188 159.772C10.2188 178.722 27.2488 183.769 35.7638 183.924C45.5173 181.447 69.4832 176.493 87.3183 176.493C109.612 176.493 127.726 185.782 137.944 185.317C146.118 184.946 152.806 181.757 155.129 180.208C158.844 181.911 167.297 185.317 171.385 185.317C176.494 185.317 187.641 182.531 187.176 169.526C186.712 156.521 165.811 165.346 153.735 157.915C141.66 150.483 137.944 146.768 124.939 139.336C111.934 131.905 81.1034 131.441 83.1382 88.7109C84.2529 65.3023 87.3183 26.0094 88.7116 9.28906"
        stroke="currentColor"
        strokeWidth="6.50237"
        strokeLinecap="round"
      />
      <path
        d="M34.8342 48.3032C36.8469 57.1279 40.6864 76.8208 39.9432 84.9952M22.2939 148.161C25.6999 142.123 32.9764 127.632 34.8342 117.971"
        stroke={accentStroke}
        strokeWidth="7.43128"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlantarFasciitisConditionIcon({
  className,
  ...props
}: IconProps) {
  const p = iconSvgProps(className, props);
  return (
    <svg {...p}>
      <path
        d="M27.868 135.621C24.462 139.182 17.7428 148.347 18.1144 156.522C18.5789 166.74 24.152 175.564 32.9767 175.564C41.8013 175.564 60.3795 168.597 85.9245 169.062C106.361 169.433 138.408 176.648 151.877 180.209"
        stroke={accentStroke}
        strokeWidth="7.43128"
        strokeLinecap="round"
      />
      <path
        d="M52.0188 105.431C49.8514 108.682 45.795 118.064 46.9098 129.583C47.7639 138.407 56.1992 141.659 60.8438 141.659"
        stroke="currentColor"
        strokeWidth="6.50237"
        strokeLinecap="round"
      />
      <path
        d="M15.7922 11.6113C20.9012 30.4992 30.2832 75.1488 26.9391 102.645C22.759 137.014 10.2188 136.085 10.2188 159.772C10.2188 178.722 27.2488 183.769 35.7638 183.924C45.5173 181.447 69.4832 176.493 87.3183 176.493C109.612 176.493 127.726 185.782 137.944 185.317C146.118 184.946 152.806 181.757 155.129 180.208C158.844 181.911 167.297 185.317 171.385 185.317C176.494 185.317 187.641 182.531 187.176 169.526C186.712 156.521 165.811 165.346 153.735 157.915C141.66 150.483 137.944 146.768 124.939 139.336C111.934 131.905 81.1034 131.441 83.1382 88.7109C84.2529 65.3023 87.3183 26.0094 88.7116 9.28906"
        stroke="currentColor"
        strokeWidth="6.50237"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AchillesTendinitisConditionIcon({
  className,
  ...props
}: IconProps) {
  const p = iconSvgProps(className, props);
  return (
    <svg {...p}>
      <path
        d="M52.0179 105.431C49.8504 108.682 45.794 118.064 46.9089 129.583C47.763 138.407 56.1983 141.659 60.8428 141.659"
        stroke="currentColor"
        strokeWidth="6.50237"
        strokeLinecap="round"
      />
      <path
        d="M15.7912 11.6113C20.9002 30.4992 30.2822 75.1488 26.9382 102.645C22.7581 137.014 10.2178 136.085 10.2178 159.772C10.2178 178.722 27.2478 183.769 35.7628 183.924C45.5164 181.447 69.4822 176.493 87.3173 176.493C109.611 176.493 127.725 185.782 137.943 185.317C146.117 184.946 152.805 181.757 155.128 180.208C158.843 181.911 167.296 185.317 171.384 185.317C176.493 185.317 187.64 182.531 187.175 169.526C186.711 156.521 165.81 165.346 153.734 157.915C141.659 150.483 137.943 146.768 124.938 139.336C111.933 131.905 81.1024 131.441 83.1372 88.7109C84.2519 65.3023 87.3173 26.0094 88.7107 9.28906"
        stroke="currentColor"
        strokeWidth="6.50237"
        strokeLinecap="round"
      />
      <path
        d="M34.8333 48.3032C36.8459 57.1279 40.8712 75.2416 39.4778 91.0331M22.293 148.161C25.699 142.123 32.9754 127.632 34.8333 117.971"
        stroke={accentStroke}
        strokeWidth="7.43128"
        strokeLinecap="round"
      />
      <path
        d="M39.9426 90.5688C40.2522 95.523 39.0137 107.754 36.6914 113.792"
        stroke={accentStroke}
        strokeWidth="13.0047"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InsertionalAchillesTendinitisConditionIcon({
  className,
  ...props
}: IconProps) {
  const p = iconSvgProps(className, props);
  return (
    <svg {...p}>
      <path
        d="M52.0179 105.431C49.8504 108.682 45.794 118.064 46.9089 129.583C47.763 138.407 56.1983 141.659 60.8428 141.659"
        stroke="currentColor"
        strokeWidth="6.50237"
        strokeLinecap="round"
      />
      <path
        d="M15.7912 11.6113C20.9002 30.4992 30.2822 75.1488 26.9382 102.645C22.7581 137.014 10.2178 136.085 10.2178 159.772C10.2178 178.722 27.2478 183.769 35.7628 183.924C45.5164 181.447 69.4822 176.493 87.3173 176.493C109.611 176.493 127.725 185.782 137.943 185.317C146.117 184.946 152.805 181.757 155.128 180.208C158.843 181.911 167.296 185.317 171.384 185.317C176.493 185.317 187.64 182.531 187.175 169.526C186.711 156.521 165.81 165.346 153.734 157.915C141.659 150.483 137.943 146.768 124.938 139.336C111.933 131.905 81.1024 131.441 83.1372 88.7109C84.2519 65.3023 87.3173 26.0094 88.7107 9.28906"
        stroke="currentColor"
        strokeWidth="6.50237"
        strokeLinecap="round"
      />
      <path
        d="M34.8342 48.3032C36.8469 57.1279 41.8011 90.1042 37.1565 110.54M22.2939 148.161C25.6999 142.123 32.9764 133.206 34.8342 123.545"
        stroke={accentStroke}
        strokeWidth="7.43128"
        strokeLinecap="round"
      />
      <path
        d="M36.2276 116.114C35.2987 122.616 32.5119 131.441 29.2607 137.014"
        stroke={accentStroke}
        strokeWidth="13.0047"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Keys match `ConditionId` in website `content/conditions/registry`. */
export const conditionIconComponents = {
  "achilles-rupture": AchillesRuptureConditionIcon,
  "plantar-fasciitis": PlantarFasciitisConditionIcon,
  "achilles-tendinitis": AchillesTendinitisConditionIcon,
  "insertional-achilles-tendonitis":
    InsertionalAchillesTendinitisConditionIcon,
} as const;

export type ConditionIconId = keyof typeof conditionIconComponents;
