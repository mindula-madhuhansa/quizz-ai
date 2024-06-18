import {
  CreditCardIcon,
  SettingsIcon,
  BarChartBigIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";

import { auth } from "@/lib/auth";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const NavMenu = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  if (!session?.user || !session?.user?.name) return null;

  const username = session?.user?.name.split(" ")[0];

  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>Welcome {username || "Back"}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Link
            href="/quiz/new"
            className="flex items-center"
          >
            <PlusIcon className="mr-2 size-4" />
            <span>Review</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/dashboard"
            className="flex items-center"
          >
            <BarChartBigIcon className="mr-2 size-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/billing"
            className="flex items-center"
          >
            <CreditCardIcon className="mr-2 size-4" />
            <span>Billing</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};
