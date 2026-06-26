import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground shadow-sm outline-none transition-colors",
        "placeholder:text-muted-foreground/60",
        "hover:border-ring/50",
        "focus-visible:border-ring/70 focus-visible:ring-3 focus-visible:ring-ring/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "[&>[data-slot=select-icon]]:ml-auto [&>[data-slot=select-icon]]:shrink-0",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon data-slot="select-icon" asChild>
        <ChevronDown className="size-4 text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "relative z-50 max-h-64 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-elevated",
          "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-in",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm text-foreground outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[highlighted]:bg-muted data-[highlighted]:text-foreground",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-3.5 text-primary" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

const SelectRoot = SelectPrimitive.Root
const SelectValue = SelectPrimitive.Value
const SelectGroup = SelectPrimitive.Group
const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    data-slot="select-label"
    className={cn("px-2 py-1.5 text-small font-semibold text-muted-foreground", className)}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

export {
  SelectRoot as Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
}
