import Link from "next/link";

const CustomLink: React.FC<{ Href: string, Text: string }> = ({ Href, Text }) => {
  return (
    <Link
      href={Href}
      className="text-black hover:underline hover:text-blaze-orange-600  active:text-blaze-orange-600"
    >
      {Text}
    </Link>
  );
};

export default CustomLink;