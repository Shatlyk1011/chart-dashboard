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

export function CoinSelectComponent({ items, placeholder = "Select value", onChange, value, classes }: Props) {
  return (
    <div className="flex w-full flex-col gap-1">
      <Select onValueChange={(value) => onChange(value)} value={value}>
        <SelectTrigger className={cn("min-w-[210px] border-none bg-[#222]", classes)}>
          <SelectValue placeholder={placeholder} className="" />
        </SelectTrigger>
        <SelectContent className="flex rounded-xl border-white/10 bg-[#222]">
          <SelectGroup className="">
            {items.map(({ label, value, Icon, multiply }) => (
              <SelectItem key={value} value={value} className="py-1">
                <Icon className="mr-1" />
                {label}
                <span className="text-[12px] text-white/50">{multiply}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
