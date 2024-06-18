import {
  CreditCardIcon,
  SettingsIcon,
  UserIcon,
  BarChartBigIcon,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const NavMenu = () => {
  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
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
          <UserIcon className="mr-2 size-4" />
          <span>Profile</span>
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
        <DropdownMenuItem>
          <SettingsIcon className="mr-2 size-4" />
          <span>Settings</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};
