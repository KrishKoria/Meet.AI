import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface GenerateAvatarProps {
  seed: string;
  className?: string;
  variant: "botttsNeutral" | "initials";
}

export function GenerateAvatar({
  seed,
  className,
  variant,
}: GenerateAvatarProps) {
  let avatar;

  switch (variant) {
    case "botttsNeutral":
      avatar = createAvatar(botttsNeutral, {
        seed,
      });
      break;
    case "initials":
      avatar = createAvatar(initials, {
        seed,
      });
      break;
    default:
      throw new Error("Unsupported avatar variant");
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="Avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
