import { Button } from "@/components/ui/button";
import moon from "@/assets/icon-moon.svg";
import sun from "@/assets/icon-sun.svg";
import logo from "@/assets/logo.svg";
import avatar from "@/assets/logout.png";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/services/auth.service";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  const handleChangeTheme = () => {
    const html = document.querySelector("html");
    if (!isDark) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
    setIsDark((prev) => !prev);
  };

  const handleLogOut = useLogout();

  return (
    <header className=" md:w-16 md:min-h-screen bg-header-bg flex px-4 md:flex-col pt-4 md:items-center justify-between rounded-r-none md:rounded-r-xl">
      <div className="w-8 h-8 rounded-lg bg-primary-purple flex items-center justify-center cursor-pointer">
        <img src={logo} alt="Logo" />
      </div>

      <div className="flex md:flex-col gap-4 items-center pb-4">
        <Button variant="ghost" size="icon" onClick={handleChangeTheme}>
          {isDark ? <img src={sun} alt="sun" /> : <img src={moon} alt="moon" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-6 h-6 overflow-hidden">
              <img
                src={avatar}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogOut}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
