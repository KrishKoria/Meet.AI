import { DEFAULT_PAGE } from "@/constants";
import {
  useQueryStates,
  parseAsString,
  parseAsInteger,
  parseAsStringEnum,
} from "nuqs";
import { MeetingStatus } from "../types";
function useMeetingsFilters() {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({
      clearOnDefault: true,
    }),
    status: parseAsStringEnum(Object.values(MeetingStatus)),
    agentId: parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    }),
  });
}

export default useMeetingsFilters;
