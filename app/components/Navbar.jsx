import { LogoAcrobat } from "@gravity-ui/icons";
import { Link, Button } from "@heroui/react";

{/* Basic */}
import React from 'react';
import ThemeSwitch  from "./ThemeSwitch";

const Navbar = () => {
    return (
        <div>
            <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
  <header className="flex h-16 items-center justify-between px-6">
    <div className="flex items-center gap-3">
      <LogoAcrobat />
      <p className="font-bold">ACME</p>
    </div>
    <ul className="flex items-center gap-4">
      <li><Link href="/">Home</Link></li>
      <li><Link href="/tasks">Tasks</Link></li>
    </ul>
  </header>
</nav>
<ThemeSwitch/>
{/* With right-aligned content */}
<nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
  <header className="flex h-16 items-center justify-between px-6">
    <div>Logo</div>
    <ul className="flex items-center gap-4">
      <li><Button>Sign Up</Button></li>
    </ul>
  </header>
</nav>
        </div>
    );
};

export default Navbar;