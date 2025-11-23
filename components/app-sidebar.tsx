"use client";

import * as React from "react";
import {
  ArrowLeftRight,
  ArrowRightLeft,
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  Headphones,
  LayoutGrid,
  Map,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  Wallet,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Arthur Taylor",
    email: "arthur@alignui.com",
    avatar: "/avatar/avatar.png",
  },
  teams: [
    {
      name: "Apex",
      logo: "/avatar/logo.png",
      plan: "Finance & Banking",
    },
    {
      name: "Apex1",
      logo: "/avatar/logo.png",
      plan: "Finance & Banking",
    },
    {
      name: "Apex2",
      logo: "/avatar/logo.png",
      plan: "Finance & Banking",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutGrid,
      isActive: true,
      items: [
        {
          title: "Dashboard1",
          url: "#",
        },
      ],
    },
    {
      title: "My Cards",
      url: "#",
      icon: CreditCard,
    },
    {
      title: "Transcations",
      url: "#",
      icon: ArrowLeftRight,
    },
    {
      title: "Payment",
      url: "#",
      icon: Wallet,
    },
    {
      title: "Exchange",
      url: "#",
      icon: ArrowRightLeft,
    },
  ],
  projects: [
    {
      name: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      name: "Support",
      url: "#",
      icon: Headphones,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
