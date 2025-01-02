import { Button } from "@/components/ui/button";
import moon from "@/assets/icon-moon.svg";
import sun from "@/assets/icon-sun.svg";
import logo from "@/assets/logo.svg";
import avatar from "@/assets/image-avatar.jpg";
import { useState } from "react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  const handleChangeTheme = () => {
    console.log(isDark);

    const html = document.querySelector("html");
    if (!isDark) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
    setIsDark((prev) => !prev);
  };

  return (
    <header className="h-16 md:w-16 md:h-screen bg-slate-900 flex md:flex-col items-center justify-between p-4 rounded-r-none md:rounded-r-xl">
      <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
        <img src={logo} alt="Logo" />
      </div>

      <div className="flex md:flex-col gap-4 items-center">
        <Button variant="ghost" size="icon" onClick={handleChangeTheme}>
          {isDark ? <img src={sun} alt="sun" /> : <img src={moon} alt="moon" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
        <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden">
          <img
            src={avatar}
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
