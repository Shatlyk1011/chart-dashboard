import { cn } from "@/app/lib/utils";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { ICoin } from "@/data";

interface Props {
  items: ICoin[];
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  classes?: string;
}

export function CoinSelectComponent({ items, placeholder = 'Select value', onChange, value, classes }: Props) {
  console.log('placeholder', placeholder);
  return (
    <div className="flex w-full flex-col gap-1">
      <Select onValueChange={(value) => onChange(value)} value={value} open={true}>
        <SelectTrigger className={cn("min-w-[210px] bg-[#222] border-none ", classes)}>
          <SelectValue placeholder={placeholder} className="" />
        </SelectTrigger>
        <SelectContent className="flex border-white/10 rounded-xl">
          <SelectGroup className="">
            {items.map(({ label, value, Icon, multiply  }) => (
              <SelectItem key={value} value={value} className="py-1">
                <Icon className="mr-1"/>
                {label}
                <span className="text-white/50 text-[10px]">{multiply}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
