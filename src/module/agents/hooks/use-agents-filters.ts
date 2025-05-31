import { DEFAULT_PAGE } from "@/constants";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
function useAgentsFilters() {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({
      clearOnDefault: true,
    }),
  });
}

export default useAgentsFilters;
