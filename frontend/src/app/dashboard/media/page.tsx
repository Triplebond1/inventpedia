import FlatButton  from "@/components/buttons/flatButton";
import Image from "next/image";
import { RefCallback } from "react";

export default function Mediapage() {
  return (
    <div className="column items-center justify-center ">
      Welcome to the Media page
      <p className="mt-2">This is your home page.</p>
      <div className="my-5">
        <FlatButton Text="upload image" />
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
  {/* Left Section */}
  <div className="flex flex-col bg-white h-auto w-full lg:w-3/4 border-2 border-blaze-orange-700 justify-items-center rounded-lg shadow-2xl p-4">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 scroll-smooth">
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
      <ImageBox ImgLink={"/leonardo-da-vinci-quote-2.png"} ImgAlt={"InventNexus logo icon"} />
    </div>
  </div>

  {/* Right Section */}
  <div className="bg-blaze-orange-50 flex flex-col w-full lg:w-1/4 h-36">
          {/* Content for the right section */}
          <div>
            <TabList TabName={'Image Name'} Text={'fetched content'} />
            <TabList TabName={'Image alternate text'} Text={'fetched content'} />
            <TabList TabName={'Image caption'} Text={'fetched content'} />
            <TabList TabName={'Image date uploaded'} Text={'fetched content'} />
          </div>
  </div>
</div>

    </div>
  );
}

const TabList: React.FC<{TabName: string, Text: string}> = ({ TabName, Text }) => {
  return (
    <div className="column bg-blaze-orange-100 w-full mt-5 justify-items-start rounded-2xl mb-5">
      <div className="container mb-2 font-bold pt-2 px-2 text-blaze-orange-950 border-solid border-b-white border-b-4">
        <h2>{TabName}</h2>
      </div>
      <div className="container px-2 pb-2 break-words">
        <h3 className="mt-2 text-blaze-orange-600 ">{Text}</h3>
      </div>
    </div>
  );
};

const ImageBox: React.FC<{ImgLink: string, ImgAlt: string, onClick?: RefCallback<string>}> = ({ ImgLink, ImgAlt}) => {
  return (
    <div className="bg-blaze-orange-50">
    <Image
      src={ImgLink}
      layout="responsive"
      width={48}
      height={48}
      alt={ImgAlt}
      className=" object-cover"
    />
  </div>
  )
}