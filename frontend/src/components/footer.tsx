import FlatButton from "@/components/buttons/flatButton";

export default function Footer() {
  return (
    
      <div className="text-center space-y-4 ">
        <div className="space-x-4">
          <a href="/about_us" className="hover:text-orange-400">
            About
          </a>
          <a href="#blog" className="hover:text-orange-400">
            Blog
          </a>
          <a href="#explore" className="hover:text-orange-400">
            Explore
          </a>
          <a href="#contact" className="hover:text-orange-400">
            Contact
          </a>
          <a href="/privacy_policy" className="hover:text-orange-400">
            Privacy Policy
          </a>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#facebook" className="hover:text-orange-400">
            Facebook
          </a>
          <a href="#twitter" className="hover:text-orange-400">
            Twitter
          </a>
          <a href="#linkedin" className="hover:text-orange-400">
            LinkedIn
          </a>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Stay Updated</h4>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-2 p-2 rounded-md text-black"
        />
        <FlatButton Text="Subscribe"/>
          {/* <button className="ml-2 px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-600">
            Subscribe
        </button> */}
       
        </div>
        <p className="text-sm text-gray-400">
          © 2025 Inventpedia. All Rights Reserved.
        </p>
      </div>

  );
}
