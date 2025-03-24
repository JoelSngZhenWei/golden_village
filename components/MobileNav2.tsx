"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

const links = [
    { name: "home", path: "/" },
    {
        name: "projects", path: "/projects", hasSubLinks: true, subLinks:
            [
                { name: "home", path: "/" },
                { name: "home", path: "/" }
            ]
    },
    { name: "resume", path: "/resume" },
    { name: "contact", path: "/contact" },
];

const MobileNav2 = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger className="flex justify-center items-center">
                <IoMenu className="text-[24px] text-accent" />
            </DrawerTrigger>
            <DrawerContent className="mx-3">
                <DrawerHeader>
                    <DrawerTitle>
                        <Link href="/" onClick={() => setIsOpen(false)}>
                            <h1 className="text-lg font-bold tracking-wide hover:text-accent transition-all duration-300">
                                Joel Sng
                            </h1>
                        </Link>
                    </DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                    {/* Navigation */}
                    <nav className="flex flex-col justify-start items-start gap-4">
                        {links.map((link, index) => {
                            const isActive =
                                link.path === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(link.path); // Match subpaths

                            return (
                                <Link
                                    href={link.path}
                                    key={index}
                                    className={`capitalize hover:text-accent transition-all duration-300 font-medium tracking-wide w-full text-start`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <span className={`${isActive ? "text-accent border-b border-accent" : ""}`}>
                                        {link.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    );
};

export default MobileNav2;
