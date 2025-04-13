import { PageName } from "../../../components/pageFeature/pageFeaturesServer";
import { Button } from "../../../components/button";


export default function PostPage() {
  return (
    <div className="column items-center justify-center ">
      {/* page name */}
      <div>
        <PageName pageName="POST" />
      </div>
      <p className="mt-2">This is your post page.</p>
      <div>
        <Button buttonText="add new post " />
      </div>

      <div className="flex flex-col bg-white border-blaze-orange-700 rounded-lg shadow-2xl p-4 mt-4">
        <div>
          <h2 className="text-xl font-bold text-center p-2">All Posts</h2>
        </div>
        {/* post headings */}
        <div className="container">
          <div className="h-8 w-full p-2 bg-blaze-orange-100 rounded-lg flex flex-wrap text-start mb-2 items-center">
            {/* post name */}
            <div className="flex-shrink-0 w-2/6 sm:w-2/6 h-6 overflow-hidden whitespace-nowrap text-ellipsis px-2">
              <h3 className="text-sm font-normal text-center">Post Name</h3>
            </div>
            {/* post status */}
            <div className="flex-shrink-0 w-1/6 sm:w-1/6 h-6 overflow-hidden whitespace-nowrap text-ellipsis px-2">
              <h3 className="text-sm font-normal text-center">Status</h3>
            </div>
            {/* post date published */}
            <div className="flex-shrink-0 w-1/6 sm:w-1/6 h-6 overflow-hidden whitespace-nowrap text-ellipsis px-2">
              <h3 className="text-sm font-normal text-center">
                Date Published
              </h3>
            </div>
            {/* post SEO rating */}
            <div className="flex-shrink-0 w-1/6 sm:w-1/6 h-6 overflow-hidden whitespace-nowrap text-ellipsis px-2">
              <h3 className="text-sm font-normal text-center">SEO Rating</h3>
            </div>
            {/* post traffic */}
            <div className="flex-shrink-0 w-1/6 sm:w-1/6 h-6 overflow-hidden whitespace-nowrap text-ellipsis px-2">
              <h3 className="text-sm font-normal text-center">Traffic</h3>
            </div>
          </div>
        </div>

        {/* post list */}

        <div className="container ">
          <div className="h-12 w-full p-2  bg-blaze-orange-100 rounded-lg justify-center  flex flex-wrap text-start mb-2 items-center">
            {/* post name */}
            <div className="flex-shrink-0 w-2/6 sm:w-2/6 h-6 overflow-hidden whitespace-nowrap text-ellipsis px-2">
              <h3 className="text-sm font-normal text-center">Post Name</h3>
            </div>
            {/* post status */}
            <div className="flex-shrink-0 w-1/6 sm:w-1/6 h-6 overflow-hidden whitespace-nowrap text-ellipsis px-2">
              <h3 className="text-sm font-normal text-center">Status</h3>
            </div>
            {/* post date published */}
            <div className="flex-shrink-0 w-1/6 sm:w-1/6 h-6 overflow-hidden whitespace-nowrap text-ellipsis px-2">
              <h3 className="text-sm font-normal text-center">
                Date Published
              </h3>
            </div>
            {/* post SEO rating */}
            <div className="flex-shrink-0 w-1/6 sm:w-1/6 h-6 overflow-hidden whitespace-nowrap text-ellipsis px-2">
              <h3 className="text-sm font-normal text-center">SEO Rating</h3>
            </div>
            {/* post traffic */}
            <div className="flex-shrink-0 w-1/6 sm:w-1/6 h-6 overflow-hidden whitespace-nowrap text-ellipsis px-2">
              <h3 className="text-sm font-normal text-center">Traffic</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
