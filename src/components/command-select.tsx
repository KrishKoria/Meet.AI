import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "./ui/command";

interface CommandSelectProps {
  options: Array<{ id: string; value: string; children: React.ReactNode }>;
  onSelect: (value: string) => void;
  onSearch: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

function CommandSelect({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an option",
  isSearchable,
  className,
}: CommandSelectProps) {
  const [open, setOpen] = useState(false);
  const selectOption = options.find((option) => option.value === value);
  const handleOpenChange = (value: boolean) => {
    onSearch?.("");
    setOpen(value);
  };
  return (
    <>
      <Button
        variant="outline"
        type="button"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectOption && "text-muted-foreground",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <div className="">{selectOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        open={open}
        onOpenChange={handleOpenChange}
        shouldFilter={!onSearch}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No options found. Try searching for something else.
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
}

export default CommandSelect;
