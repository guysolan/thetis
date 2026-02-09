import * as React from "react";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      const childProps = children.props as Record<string, unknown>;
      const merged: Record<string, unknown> = {
        ...props,
        ...childProps,
        ref,
      };
      // Merge event handlers so both trigger (e.g. popover) and child run
      if (props.onClick != null || childProps.onClick != null) {
        merged.onClick = (e: unknown) => {
          (props.onClick as (e: unknown) => void)?.(e);
          (childProps.onClick as (e: unknown) => void)?.(e);
        };
      }
      if (props.onPointerDown != null || childProps.onPointerDown != null) {
        merged.onPointerDown = (e: unknown) => {
          (props.onPointerDown as (e: unknown) => void)?.(e);
          (childProps.onPointerDown as (e: unknown) => void)?.(e);
        };
      }
      return React.cloneElement(children, merged as any);
    }
    return null;
  },
);

Slot.displayName = "Slot";

export { Slot };
