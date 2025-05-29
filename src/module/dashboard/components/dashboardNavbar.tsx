"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import DashboardCommand from "./dashboardCommand";
import { useEffect, useState } from "react";

export default function DashboardNavbar() {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex items-center gap-x-2 px-4 py-3 border-b bg-background">
        <Button className="size-9" variant={"outline"} onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant={"outline"}
          size={"sm"}
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none h-5 inline-flex select-none items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-mono font-medium text-muted-foreground">
            <span className="text-xs">&#8984; + K</span>
          </kbd>
        </Button>
      </nav>
    </>
  );
}
