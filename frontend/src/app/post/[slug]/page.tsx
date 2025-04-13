import SocialMediaLink from "@/components/pageFeature/socialMediaLink";
import  Accordion from "@/components/pageFeature/accordion";
import {
  FaceBookIcon,
  WhatsappIcon,
  LinkedinIcon,
  InstagramIcon,
  XIcon,
} from "@/components/icons/svgIcons";
import Image from "next/image";
import Link from "next/link";
// export async function generateStaticParams() {
//   const response = await fetch("https://your-backend.com/api/posts/slugs");
//   const slugs = await response.json();

//   return slugs.map((slug) => ({ slug }));
// }

// async function fetchPost(slug) {
//   const response = await fetch(`https://your-backend.com/api/posts/${slug}`);
//   if (!response.ok) return null;
//   return response.json();
// }

export default async function PostPage(
  {
    /*params*/
  }
) {
  //const post = await fetchPost(params.slug);

  //if (!post) return notFound(); // Show 404 page if post is not found
  // If no post is passed as a prop, we use some default data for demonstration.
  const defaultPost = {
    title: "Sample Post Title",
    content:
      "<p>This is the content of the post. It can include <strong>HTML</strong> formatting, images, and more.</p>",
    publishedAt: new Date().toISOString(),
    author: "John Doe",
    featuredImage: "/leonardo-da-vinci-quote-2.png",
    relatedArticles: [
      { id: 1, title: "Related Article 1", href: "/posts/1" },
      { id: 2, title: "Related Article 2", href: "/posts/2" },
    ],
  };

  const post = defaultPost;

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <main>


            <div className="min-h-screen dark:bg-gray-900 bg-white sm:w-4/6 bg-gray-50 flex flex-col mx-auto">
              {/* Breadcrumb Navigation */}
              <header className="bg-white dark:text-white shadow p-4">
                <nav className="text-sm breadcrumbs">
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>{" "}
                  /{" "}
                  <Link href="/posts" className="hover:underline">
                    Posts
                  </Link>{" "}
                  / <span className="text-gray-700 dark:text-white">{post.title}</span>
                </nav>
              </header>
                {/* Post Title & Metadata */}
                <section className="mb-6">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-whitemb-2">
                    {post.title}
                  </h1>
                  <div className="text-sm text-blaze-orange-600 ">
                    By {post.author} | Published on{" "}
                    {new Date(post.publishedAt).toDateString()}
                  </div>
                </section>
        
                {/* Social Sharing Section */}
                <section className="flex items-center gap-2 mb-6">
                  <span className="font-semibold text-gray-700">Share:</span>
                  <SocialMediaLink Icon={<FaceBookIcon/>} Href="" />
                  <SocialMediaLink Icon={<WhatsappIcon/>} Href="" />
                  <SocialMediaLink Icon={<LinkedinIcon/>} Href="" />
                  <SocialMediaLink Icon={<InstagramIcon/>} Href="#" />
                  <SocialMediaLink Icon={<XIcon/>} Href="#" />
                </section>
        
                {/* Featured Image */}
                {post.featuredImage && (
                  <section className="w-full mb-6">
                    <Image
                      src={post.featuredImage}
                      alt="Featured Image"
                      width={800}
                      height={450}
                      layout="responsive"
                      objectFit="cover"
                      className="rounded"
                    />
                  </section>
                )}
        
                {/* Post Content */}
                <article
                  className="prose max-w-none mb-10 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
        
                {/* Article Source/Reference */}
                <section className="mb-10">
                  <Accordion title="Article Source">
                    <p className="text-sm text-gray-50">
                      This article was originally published on{" "}
                      <Link href="#" className="text-blaze-orange-600 underline">
                        Example.com.ng
                      </Link>
                      .
                    </p>
                  </Accordion>
                </section>
        
                {/* Related Articles */}
                <section className="mb-10 dark:text-white">
                  <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
                  <ul className="space-y-4">
                    {post.relatedArticles.map((article) => (
                      <li
                        key={article.id}
                        className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition duration-200"
                      >
                        <Image
                          src={post.featuredImage} // Replace with article.thumbnail if available
                          alt="Article Thumbnail"
                          width={70}
                          height={70}
                          className="rounded-full object-cover"
                        />
                        <Link
                          href={article.href}
                          className="text-black dark:text-white hover:underline hover:text-blaze-orange-600  active:text-blaze-orange-600 font-medium"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
            </div>
          );
        
      </main>


    </div>
  );
}
