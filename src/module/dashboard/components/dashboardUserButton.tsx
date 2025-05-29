import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

export default function DashboardUserButton() {
  const { data, isPending } = authClient.useSession();
  if (isPending || !data?.user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {data.user.image ? (
          <Avatar>
            <AvatarImage
              src={data.user.image}
              alt={data.user.name}
              width={36}
              height={36}
              className="rounded-full"
            />
          </Avatar>
        ) : null}
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
