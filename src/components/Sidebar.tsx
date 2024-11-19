"use client";

import React from "react";
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";

export default function SidebarComponent() {
    return (
        <SidebarProvider>
            <Sidebar
                side="left"
                collapsible="icon"
                variant="sidebar"
                className="w-[250px] h-[calc(100vh-64px)] bg-secondary text-secondary-foreground shadow-md fixed top-[64px] left-0"
            >
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg font-semibold text-muted">
                        Main Menu
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link
                                    href="/home"
                                    className="hover:text-primary transition focus:outline-none focus:ring focus:ring-primary"
                                >
                                    Home
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link
                                    href="/about"
                                    className="hover:text-primary transition focus:outline-none focus:ring focus:ring-primary"
                                >
                                    About
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link
                                    href="/contact"
                                    className="hover:text-primary transition focus:outline-none focus:ring focus:ring-primary"
                                >
                                    Contact
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
        </SidebarProvider >

    );
}
