import Link from "next/link";
import Image from "next/image";

import { auth, signOut } from "@/lib/auth";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/nav-menu";

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button
        type="submit"
        variant="ghost"
      >
        Sign Out
      </Button>
    </form>
  );
}

export const Navbar = async () => {
  const session = await auth();

  return (
    <header>
      <nav className="px-4 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <h1 className="text-3xl font-bold">
            <Link href="/">Tutor AI</Link>
          </h1>
          <div>
            {session?.user ? (
              <div className="flex items-center gap-4">
                {session.user.name && session.user.image && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <Image
                          src={session.user.image}
                          alt={session.user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <NavMenu />
                  </DropdownMenu>
                )}
                <SignOut />
              </div>
            ) : (
              <Link href="api/auth/signin">
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
