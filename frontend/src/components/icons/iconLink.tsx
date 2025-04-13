import Link from "next/link";
import { JSX } from "react";


const IconLink: React.FC<{ Name?: string, Icon: JSX.Element, Href: string }> = ({ Name, Icon, Href }) => {
  return (
    <div className="container h-12 flex items-center m-auto">
      <Link
        href={Href}
        className="text-black hover:underline hover:text-blaze-orange-600 on-active:text-blaze-orange-600 font-semibold flex justify-items-center my-auto items-center gap-2"
      >
        {Name}
        {Icon}
      </Link>
    </div>
  );
};

export default IconLink;