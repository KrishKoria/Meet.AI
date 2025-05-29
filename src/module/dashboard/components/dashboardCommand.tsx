import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardCommand({
  open,
  setOpen,
}: DashboardCommandProps) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>
          <span>Meeting 1</span>
        </CommandItem>
        <CommandItem>
          <span>Meeting 2</span>
        </CommandItem>
      </CommandList>
    </CommandDialog>
  );
}
