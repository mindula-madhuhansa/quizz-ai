import Link from "next/link";
import Image from "next/image";

import { auth } from "@/lib/auth";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/nav-menu";

export const Navbar = async () => {
  const session = await auth();

  return (
    <header>
      <nav className="px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <h1 className="text-3xl font-bold">
            <Link href="/">TutorAI</Link>
          </h1>
          <div>
            {session?.user ? (
              <>
                {session.user.name && session.user.image && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Image
                        src={session.user.image}
                        alt={session.user.name}
                        width={32}
                        height={32}
                        className="rounded-full cursor-pointer hover:opacity-90"
                      />
                    </DropdownMenuTrigger>
                    <NavMenu />
                  </DropdownMenu>
                )}
              </>
            ) : (
              <Link href="/api/auth/signin">
                <Button
                  variant="link"
                  className="rounded-xl border"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
