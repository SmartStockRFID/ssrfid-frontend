import { Origami } from "lucide-react";
import { Kodchasan } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Assets, newlandTheme } from "@/constants";
import { cn } from "@/utils";

const kodchasan = Kodchasan({
  weight: "400",
  subsets: ["latin"],
});

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-2 sm:p-6 bg-muted min-h-svh md:p-10">
      <div className="flex flex-col w-full max-w-sm gap-6">
        <Link
          href="#"
          className={cn(
            "flex items-center self-center gap-2 font-medium",
            !newlandTheme && kodchasan.className,
          )}
        >
          {newlandTheme ? (
            <div className="relative flex items-center justify-center rounded-lg text-primary-foreground size-8">
              <Image
                className="dark:invert"
                src={Assets.icons.newland}
                alt="Newland logomarca"
                width={40}
                height={40}
              />
            </div>
          ) : (
            <Origami size={18} className="text-black dark:text-white" />
          )}
          {newlandTheme ? "GRUPO NEW" : "SmartStock"}
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
