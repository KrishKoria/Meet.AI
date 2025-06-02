import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import useMeetingsFilters from "../hooks/use-meetings-filters";

function MeetingsSearchFilter() {
  const [filters, setFilters] = useMeetingsFilters();
  return (
    <div className="relative">
      <Input
        className="h-9 bg-white w-[200px] pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        placeholder="Search meetings..."
      />
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export default MeetingsSearchFilter;
