"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Drawer } from "@heroui/react";
import {
  Bell,
  Home,
  User,
  Settings,
  Menu,
  Search,
  Mail,
} from "lucide-react";

export default function Sidebar() {

  const { data: session } = authClient.useSession();
    const user = session?.user;

    const role = user?.role || 'user'; // default to 'user' if role is not defined

    console.log(user,'xxxxxxxxxxxxxxxxxxxx');
    console.log(role,'rrrrrrrrrrrrrrrrrrr');
  

  const dashboardItems={
    'user':[
      { icon: Home, label: "Dashboard" },
      { icon: Search, label: "Add Lesson" },
      { icon: Search, label: "My Lesson" },
      { icon: Search, label: "My Favorites" },
      { icon: Search, label: "Profile" },],

      'admin':[
      { icon: Home, label: "Dashboard" },
      { icon: Search, label: "Manage Users" },
      { icon: Search, label: "Manage Lessons" },
      { icon: Search, label: "Reported Lessons" },
      { icon: Search, label: "Profile" },],
  }

  const navItems = dashboardItems[role]

  console.log(navItems,'fffffffff');


  // const navItems = [
  //   { icon: Home, label: "Home" },
  //   { icon: Search, label: "Search" },
  //   { icon: Bell, label: "Notifications" },
  //   { icon: Mail, label: "Messages" },
  //   { icon: User, label: "Profile" },
  //   { icon: Settings, label: "Settings" },
  // ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Drawer>
        <Button
          variant="flat"
          className="md:hidden rounded-full"
          isIconOnly
        >
          <Menu size={20} />
        </Button>

        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 border-r border-default-200 bg-background p-5">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              SocialApp
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="group flex items-center gap-4 rounded-2xl px-4 py-3 text-base font-medium transition-all duration-200 hover:bg-default-100"
              >
                <item.icon className="size-6 transition-transform group-hover:scale-110" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Create Post Button */}
          {/* <Button
            color="primary"
            size="lg"
            className="mt-8 rounded-full font-semibold"
          >
            Create Post
          </Button>

          {/* User Card */}
          {/* <div className="mt-auto">
            <div className="flex items-center gap-3 rounded-2xl p-3 hover:bg-default-100 cursor-pointer transition">
              <img
                src="https://i.pravatar.cc/100"
                alt="user"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">Ovijet Halder</p>
                <p className="text-sm text-default-500">@ovijet</p>
              </div>
            </div>
          </div> */}
          
        </aside>

        {/* Mobile Drawer */}
        {/* <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className="w-72">
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading className="text-xl font-bold">
                  Navigation
                </Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 hover:bg-default-100 transition"
                    >
                      <item.icon size={22} />
                      {item.label}
                    </button>
                  ))}
                </nav>

                <Button
                  color="primary"
                  className="w-full mt-6 rounded-full"
                >
                  Create Post
                </Button>
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop> */}
      </Drawer>
    </>
  );
}