import { cn } from "@/lib/utils";
import { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

function Header({ children, className }: HeaderProps): JSX.Element {
  return (
    <header className={cn("header", className)}>
      <Link href="/" className="md:flex-1">
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo with title"
          className="hidden md:block"
          height={32}
          width={120}
        />
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="Logo with title"
          className="mr-2 md:hidden"
          height={32}
          width={32}
        />
      </Link>
      {children}
    </header>
  );
}

export default Header;
