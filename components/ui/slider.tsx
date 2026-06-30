import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  value,
  onValueChange,
  min,
  max,
  step = 1,
  formatLabel,
  defaultValue,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  formatLabel?: (value: number) => string
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? value)
  const displayValue = value ?? internalValue
  const handleValueChange = onValueChange ?? setInternalValue

  return (
    <div className="w-full">
      <SliderPrimitive.Root
        data-slot="slider"
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={displayValue}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        min={min}
        max={max}
        step={step}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {displayValue?.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              "block size-4 rounded-full border-2 border-primary bg-background shadow-sm",
              "transition-colors",
              "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30",
              "hover:border-accent"
            )}
          />
        ))}
      </SliderPrimitive.Root>
      {formatLabel && displayValue && (
        <div className="mt-2 flex items-center justify-between text-small text-muted-foreground">
          <span>{formatLabel(displayValue[0])}</span>
          {displayValue[1] !== undefined && (
            <span>{formatLabel(displayValue[1])}</span>
          )}
        </div>
      )}
    </div>
  )
}

export { Slider }
