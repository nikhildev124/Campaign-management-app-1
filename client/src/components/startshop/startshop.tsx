"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useAuth } from "../providers/authprovider";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cross } from "lucide-react";
import Link from "next/link";

const StartShop = () => {
  const { user } = useAuth();
  const [name, setName] = useState<string | undefined>(undefined);
  const [details, setDetails] = useState<string | undefined>(undefined);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/addshop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user,
          name: name,
          description: details,
        }),
      });
      if (response.ok) {
        toast.success("✨Shop Launched!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        window.location.reload();
      }
    } catch (error: unknown) {
      console.log("Error", error);
    }
  };

  return (
    <div className="md:text-3xl  flex p-20 border-gray-600  bg-zinc-800 rounded-md border-[0.75px] bg-opacity-40 cursor-pointer">
      <Dialog>
        <DialogTrigger className="flex items-center gap-2 m-auto">
          <Cross className="text-green-200 md:w-6 w-4" /> Start A Shop
        </DialogTrigger>
        {user ? (
          <DialogContent className="sm:max-w-[425px] ">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Enter Details</DialogTitle>
                <DialogDescription>
                  Add name and details for your Shop, We will add it to your
                  profile.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name of the Shop
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Amitabh Bacchan"
                    className="col-span-3 text-black"
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="details" className="text-right">
                    Details
                  </Label>
                  <Textarea
                    className="text-black"
                    value={details}
                    onChange={handleDetailsChange}
                    placeholder="Type your details here."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-white text-black flex gap-2 m-auto font-normal hover:bg-white hover:bg-opacity-70"
                  type="submit"
                >
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        ) : (
          <DialogContent className="flex gap-[4px]">
            Please
            <Link href="/login" className="inline text-blue-500">
              Login
            </Link>
            first
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default StartShop;
