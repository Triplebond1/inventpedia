import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

const PageName: React.FC<{pageName: string}> = ({ pageName }) => {
  return (
    <div className="flex w-20 h-10 items-center justify-left px-2 text-center font-bold text-xl border-gray-300">
      <div>
        <ChevronDoubleRightIcon className="w-4 h-3 text-blaze-orange-950" />
      </div>
      <div className="text-blaze-orange-600 pl-2">{pageName}</div>
    </div>
  );
};

export default PageName;