"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Lora">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/lora">Web Development</HoveredLink>
            <HoveredLink href="/lora">Interface Design</HoveredLink>
            <HoveredLink href="/lora">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/lora">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="News">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="/news"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="/news"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="/news"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="/news"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Media">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/media">Hobby</HoveredLink>
            <HoveredLink href="/media">Individual</HoveredLink>
            <HoveredLink href="/media">Team</HoveredLink>
            <HoveredLink href="/media">Enterprise</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="About Us">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/about">Hobby</HoveredLink>
            <HoveredLink href="/about">Individual</HoveredLink>
            <HoveredLink href="/about">Team</HoveredLink>
            <HoveredLink href="/about">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
