import  PageName from "@/components/pageFeature/pageName";
import SocialMediaLink  from "@/components/pageFeature/socialMediaLink";
import { FaceBookIcon, WhatsappIcon, LinkedinIcon, InstagramIcon, XIcon} from "@/components//icons/svgIcons";
import Image from "next/image";
import CustomLink from "@/components/pageFeature/customLink";

export default function profilePage() {
  return (
    <div className="column items-center justify-center ">
      {/* page name */}
      <div>
        <PageName pageName="PROFILE" />
      </div>
      <p className="mt-2">This is your profile page.</p>
      <div className="flex-column h-auto sm:w-2/4 max-w-sm justify-center mx-auto">
        <div className="flex bg-blaze-orange-100 h-48 w-48 rounded-full  relative items-center  justify-center mx-auto my-2">
          <Image
            src="/leonardo-da-vinci-quote-2.png"
            layout="responsive"
            width={48}
            height={48}
            alt="InventNexus logo icon"
            className="object-cover rounded-full"
          />
        </div>
        {/* username */}
        <TabList TabName={"USERNAME"} Text={`This is your profile page`} />

        {/*email  */}
        <TabList TabName={"EMAIL"} Text={`This is your profile page`} />

        {/*Role */}
        <TabList TabName={"ROLE"} Text={`This is your profile page`} />

        {/*website */}
        <TabListLink
          TabName={"WEBSITE"}
          Text={`This is your profile page. `}
          Href={""}
        />

        {/*inventnexus page*/}
        <TabListLink
          TabName={"INVENTNEXUS PAGE"}
          Text={`This is your profile page. `}
          Href={""}
        />

        {/*Location*/}
        <TabList TabName={"LOCATION"} Text={`This is your profile page`} />

        {/*BIO */}
        <TabList
          TabName={"BIO"}
          Text={`This is your profile page. dkashfkffbekjadbvkjbvjad
              fafkjjhgfgjanaddbvkjdvs fsdmkdfdsbjdsbvydbsdvmsdvds
              fsdfjgddvjkvbvsdcbdvbhjvds .mdsjhdvhjcdmvsdvkjvdnkldv`}
        />

        {/*SOCIAL */}
        <div className="column bg-blaze-orange-100 w-full mt-5 justify-items-start rounded-2xl mb-5">
          <div className="container mb-2 font-bold pt-2 px-2 text-blaze-orange-950 border-solid border-b-white border-b-4">
            <h2>SOCIAL MEDIA HANDLE</h2>
          </div>
          {/* social */}
          <div className="px-2 mb-2 w-full justify-center items-center">
          <SocialMediaLink Icon={<FaceBookIcon/>} Name={"FACEBOOK"} Href={""} />
          <SocialMediaLink Icon={<WhatsappIcon/>} Name={"WHATSAPP"} Href={""} />
          <SocialMediaLink Icon={<LinkedinIcon/>} Name={"LINKEDIN"} Href={""} />
          <SocialMediaLink Icon={<InstagramIcon/>} Name={"INSTAGRAM"} Href={""} />
          <SocialMediaLink Icon={<XIcon/>} Name={"X"} Href={""} />
          </div>


          <div className="container h-5 px-2 pb-2"></div>
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

const TabListLink: React.FC<{TabName: string, Text: string, Href: string}> = ({ TabName, Text, Href }) => {
  return (
    <div className="column bg-blaze-orange-100 w-full mt-5 justify-items-start rounded-2xl mb-5">
      <div className="container mb-2 font-bold pt-2 px-2 text-blaze-orange-950 border-solid border-b-white border-b-4">
        <h2>{TabName}</h2>
      </div>
      <div className="container px-2 pb-2 break-words">
        <CustomLink Href={Href} Text={Text}/>
      </div>
    </div>
  );
};

