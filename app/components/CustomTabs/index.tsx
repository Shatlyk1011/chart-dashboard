import { FC, useState } from "react";
import { cn } from "../../lib/utils";

interface Props {}

const TABS = ["15S", "1M", "1H", "1D"];

const CustomTabs: FC<Props> = () => {
  const [selected, setSelected] = useState(0);
  const [pagination, setPagination] = useState(0);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4 overflow-hidden max-sm:gap-2">
        {TABS.map((label, idx) => {
          const isSelected = selected === idx;
          return (
            <div key={label} className="relative h-12 w-full overflow-hidden rounded-xl p-px">
              <button
                onClick={() => setSelected(idx)}
                className={cn(
                  `z-10 flex h-full w-full items-center justify-center rounded-xl bg-[#222] transition`,
                  isSelected ? "bg-[#28241E] text-[#F4A42C]" : "",
                )}
              >
                <span>{label}</span>
              </button>

              {/* custom gradient border */}
              {isSelected && (
                <div
                  className={cn("absolute inset-0 z-[-1]")}
                  style={{
                    backgroundImage: "linear-gradient(60deg, #ECBD75 10%, #EC6633 100%)",
                  }}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* pagination */}
      {/* <ul className="flex gap-2 self-center">
        {Array.from({ length: 5 }).map((_, idx) => {
          const isActive = pagination === idx;

          return (
            <li role="button" key={idx}>
              <button
                onClick={() => setPagination(idx)}
                className={cn(
                  "h-3 w-3 cursor-pointer rounded-full bg-[#2E2E2E] transition-[width]",
                  isActive && "w-16 bg-[#ECBD75]",
                )}
              ></button>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};
export default CustomTabs;
