import {
  CreditCardIcon,
  BarChartBigIcon,
  PlusIcon,
  GitBranchIcon,
  LogOutIcon,
  StarIcon,
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
import { getUser } from "@/utils/getUser";

export const NavMenu = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  if (!session.user || !session.user.id || !session.user.name) {
    return null;
  }

  const username = session.user.name.split(" ")[0];
  const userId = session.user.id;

  const user = await getUser(userId);

  if (!user) {
    return null;
  }

  const subscribed = user.subscribed;

  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>
        <div className="flex items-center">
          Welcome {username || ""}
          {subscribed && (
            <div
              className="ml-3 p-1 
        bg-gradient-to-tr from-blue-400 to-violet-600 
        rounded-md flex items-center gap-x-1 cursor-default"
            >
              <span>Pro </span>
              <StarIcon
                className="size-3"
                fill="currentColor"
              />
            </div>
          )}
        </div>
      </DropdownMenuLabel>
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
        <DropdownMenuSeparator />
      </DropdownMenuGroup>
      <DropdownMenuItem>
        <Link
          href="https://github.com/mindula-madhuhansa/tutor-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <GitBranchIcon className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link
          href="/api/auth/signout"
          className="flex items-center"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
