"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "../providers/authprovider";

const Navbar = () => {
  // const [user, setUser] = useState<string | null>(null);
  const { user, setUser } = useAuth();
  const Logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  useEffect(() => {
    setUser(localStorage.getItem("email"));
  }, []);
  return (
    <div className=" sticky top-0 z-50 h-20 w-full items-center backdrop-blur shadow-sm px-2 flex justify-between bg-black bg-opacity-30">
      <div className="container md:p-0  2xl:w-[70%] m-auto  flex items-center justify-between">
        <Link href="/" className="text-3xl">
          CRM
        </Link>
        <div className="flex">
          <span></span>
          {user ? (
            <div className="flex gap-2">
              <Button
                className="bg-white text-black flex gap-2 m-auto  hover:bg-white hover:bg-opacity-70 font-normal"
                onClick={Logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-white text-black flex gap-2 m-auto  hover:bg-white hover:bg-opacity-70">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
