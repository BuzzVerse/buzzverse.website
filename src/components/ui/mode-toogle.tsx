"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";
import {TfiApple} from "react-icons/tfi";



export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button className="absolute right-5 top-5" variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
                // <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <TfiApple className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            ) : (
                // <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <TfiApple className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            )}
        </Button>
    );
}

