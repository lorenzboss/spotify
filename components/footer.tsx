import { Link } from "@heroui/link";

import { HeartFilledIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center space-y-2 px-2 py-6">
      <p>
        View and edit this code on{" "}
        <Link isExternal href="https://github.com/lorenzboss/portfolio">
          GitHub
        </Link>
        .
      </p>

      <p>
        Made with <HeartFilledIcon className="inline text-red-500 opacity-80" />{" "}
        and{" "}
        <Link isExternal href="https://www.heroui.com/">
          HeroUI
        </Link>{" "}
        | {new Date().getFullYear()} Lorenz Boss
      </p>
    </footer>
  );
}
