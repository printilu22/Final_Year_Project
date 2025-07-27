// components/GlassCard.tsx
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";            // or your own cn helper

/**
 * A Card with the same “frosted” look used on the home hero.
 */
export default function GlassCard(
  { className, ...props }: React.ComponentProps<typeof Card>
) {
  return (
    <Card
      className={cn(
        "backdrop-blur-lg bg-slate-700/20",
        "border border-white/20",
        "shadow-lg transition-colors duration-300",
        className
      )}
      {...props}
    />
  );
}
