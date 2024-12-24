import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function RemovableToppings({ toppings, removedToppings, onToggle }) {
  return (
    <div className="space-y-2">
      <Label>Remove Toppings</Label>
      <div className="grid gap-2">
        {toppings.map((topping) => (
          <div key={topping} className="flex items-center space-x-2">
            <Checkbox
              id={`remove-${topping}`}
              checked={removedToppings.includes(topping)}
              onCheckedChange={() => onToggle(topping)}
            />
            <Label htmlFor={`remove-${topping}`}>{topping}</Label>
          </div>
        ))}
      </div>
    </div>
  );
}

