import { useCallback, useEffect, useState } from "react";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 65;

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [showBackground, setShowBackground] = useState(false)

  const toggleMobileMenu = useCallback(
    () => setShowMobileMenu((current) => !current),
    []
  );

  const toggleAccountMenu = useCallback(
    () => setShowAccountMenu((current) => !current),
    []
  );

  useEffect(
    () => {
      const handleScroll = () => {
        if (window.scrollY >= TOP_OFFSET) {
          setShowBackground(true);
        } else {
          setShowBackground(false);
        }
      }
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      }
    },
    []
  )

  return (
    <nav className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground && 'bg-zinc-900 bg-opacity-90'}`}>
        <img className="h-4 lg:h-7" src="/img/logo.svg" alt="Netflix logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
        </div>
        <div className="lg:hidden flex flex-row items-center relative cursor-pointer gap-2 ml-8" onClick={toggleMobileMenu}>
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer relative" onClick={toggleAccountMenu}>
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/img/user.png" alt="Profile" />
            </div>
            <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
