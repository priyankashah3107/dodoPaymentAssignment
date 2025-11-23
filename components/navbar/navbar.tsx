import { ArrowUpRight, BellDot, Search } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <>
      <nav className=" w-full b px-8 py-3 items-center">
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row items-center gap-2 ">
            <Image
              src={"/avatar/avatar.png"}
              alt="img"
              width={48}
              height={48}
              className="object-contain rounded-full "
            />
            <div className="flex flex-col gap-1">
              <h2 className=" justify-start text-[#0D111B] text-lg font-medium  leading-6">
                Arthur Taylor
              </h2>
              <p className=" justify-start text-[#525866] text-sm font-normal  leading-5">
                Welcome back to Apex 👋🏻
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Search className="w-4 h-4 cursor-pointer" />
            <BellDot className="w-4 h-4 cursor-pointer" />
            <Button className="bg-[#335CFF] hover:bg-[#335CFF] rounded-lg cursor-pointer">
              Move Money{" "}
              <span>
                <ArrowUpRight />
              </span>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
