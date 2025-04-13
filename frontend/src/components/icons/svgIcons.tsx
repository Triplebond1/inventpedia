import Image from "next/image";

const FaceBookIcon = ({}) => {
  return (
    <div>
      <Image
        priority
        src="/svgIcons/facebook-svgrepo-com.svg"
        height={32}
        width={32}
        alt="Follow us on Twitter"
        className="bg-blue"
      />
    </div>
  );
};

const LinkedinIcon = ({}) => {
  return (
    <div>
      <Image
        priority
        src="/svgIcons/linkedin-svgrepo-com.svg"
        height={32}
        width={32}
        alt="Follow us on Twitter"
        className="bg-blue"
      />
    </div>
  );
};

const WhatsappIcon = ({}) => {
  return (
    <div>
      <Image
        priority
        src="/svgIcons/whatsapp-color-svgrepo-com.svg"
        height={25}
        width={25}
        alt="Follow us on Twitter"
        className="bg-blue"
      />
    </div>
  );
};

const InstagramIcon = ({}) => {
  return (
    <div>
      <Image
        priority
        src="/svgIcons/instagram-svgrepo-com.svg"
        height={25}
        width={25}
        alt="Follow us on Twitter"
        className="bg-blue"
      />
    </div>
  );
};

const XIcon = ({}) => {
  return (
    <div>
      <Image
        priority
        src="/svgIcons/x-social-media-logo-icon.svg"
        height={25}
        width={25}
        alt="Follow us on Twitter"
        className="bg-blue"
      />
    </div>
  );
};
export { FaceBookIcon, WhatsappIcon, LinkedinIcon, InstagramIcon, XIcon };
