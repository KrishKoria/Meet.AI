import { Input } from "@/components/ui/input";
import useAgentsFilters from "../hooks/use-agents-filters";
import { SearchIcon } from "lucide-react";

function AgentsSearchFilter() {
  const [filters, setFilters] = useAgentsFilters();
  return (
    <div className="relative">
      <Input
        className="h-9 bg-white w-[200px] pl-7"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        placeholder="Search agents..."
      />
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

export default AgentsSearchFilter;
