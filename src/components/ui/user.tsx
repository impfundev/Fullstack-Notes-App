import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideUserCog, UserX2Icon } from "lucide-react";

export function UserButton() {
  let session: any;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button title="profile" type="button" size="icon" variant="ghost">
          <img
            src={session?.user.imageUrl}
            className="w-8 h-8 object-cover rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2">
          <LucideUserCog size={18} /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <UserX2Icon size={18} /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
