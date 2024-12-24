import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export function ToppingSelector({ topping, value, onChange }) {
    if (!topping.allowHalf) {
        return (
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`topping-${topping.name}`}
                    checked={value === "whole"}
                    onCheckedChange={(checked) => onChange(checked ? "whole" : "none")}
                />
                <Label htmlFor={`topping-${topping.name}`}>
                    {topping.name}
                    <span className="ml-1 text-gray-500">+${topping.price.toFixed(2)}</span>
                </Label>
            </div>
        );
    }

    return (
        <div className="grid gap-2">
            <div className="flex items-center justify-between">
                <Label className="underline">{topping.name}</Label>
                <span className="text-gray-500">+${topping.price.toFixed(2)}</span>
            </div>

            <RadioGroup
                value={value}
                onValueChange={(value) => onChange(value)}
                className="flex items-center space-x-4"
            >
                <div className="flex items-center space-x-1">
                    <RadioGroupItem value="left" id={`left-${topping.name}`} />
                    <Label className='text-xs' htmlFor={`left-${topping.name}`}>Left Half</Label>
                </div>
                <div className="flex items-center space-x-1">
                    <RadioGroupItem value="right" id={`right-${topping.name}`} />
                    <Label className='text-xs' htmlFor={`right-${topping.name}`}>Right Half</Label>
                </div>
                <div className="flex items-center space-x-1">
                    <RadioGroupItem value="whole" id={`whole-${topping.name}`} />
                    <Label className='text-xs' htmlFor={`whole-${topping.name}`}>Whole</Label>
                </div>
            </RadioGroup>
        </div>
    );
}

