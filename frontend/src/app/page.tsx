import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex flex-col bg-neutral-100  items-center justify-items-center min-h-screen pb-20">
      {/* main Page body Section */}
      <main className="flex flex-col items-center sm:items-start">
        <div className="min-h-screen bg-gray-100 text-gray-900">
          {/* Hero Section */}
          <section className="h-screen flex items-center justify-center text-center bg-gradient-to-r from-blaze-orange-400 to-blaze-orange-600 text-white">
            <HeroSection />
          </section>

          {/* What is Inventpedia? */}
          <section id="about" className="py-20 bg-white">
            <AboutInventPediaSection />
          </section>

          <section id="why" className="py-20 bg-gray-100 text-center">
            <WhyInventPediaSection />
          </section>

          {/* Featured Innovations */}
          <section id="explore" className="py-20 bg-white">
            <FeaturedInnovationSection />
          </section>

          {/* Section 4 - How You Can Contribute */}
          <section id="contribute" className="py-20 bg-white text-center">
            <HowToContributeSection />
          </section>

          {/* Section 5 – Build Your Personal Innovation Hub */}
          <section id="innovation-hub" className="py-20 bg-white">
            <BuildYourOwnInnovationHubSection />
          </section>

          {/* Social Proof & Testimonials */}
          <section id="testimonials" className="py-20 bg-white text-center">
            <ProofAndTestominialSection />
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-blaze-orange-600 text-white text-center">
            <CallToActionSection />
          </section>
        </div>
      </main>
    </div>
  );
}

const HeroSection = () => {
  return (
    <div>
      <h2 className="text-4xl font-extrabold">
        Shaping the Future, One Idea at a Time.
      </h2>
      <p className="mt-4 text-lg">
        The world’s first open innovation hub where inventors, thinkers, and
        creators unite.
      </p>
      <div className="mt-6 space-x-4">
        <a
          href="#join"
          className="px-6 py-3 bg-white text-blaze-orange-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200"
        >
          Join the Movement
        </a>
        <a
          href="#discover"
          className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blaze-orange-600"
        >
          Explore Innovations
        </a>
      </div>
    </div>
  );
};

const AboutInventPediaSection = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center">
      {/* Left: Image */}
      <div className="w-full md:w-1/2 p-6">
        <Image
          src="/images/innovation-collaboration.png"
          alt="Innovation Collaboration"
          width="40"
          height="40"
          className="rounded-lg shadow-lg"
        />
      </div>
      {/* Right: Text */}
      <div className="w-full md:w-1/2 p-6">
        <h3 className="text-3xl font-bold mb-4">What is Inventpedia?</h3>
        <p className="text-lg text-gray-700 mb-4">
          Inventpedia is the first-of-its-kind open innovation hub designed for
          inventors, thinkers, and creators to collaborate.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            <strong>Crowdsourced Knowledge:</strong> Edit & improve content in
            real-time.
          </li>
          <li>
            <strong>Personal Innovation Hub:</strong> Publish your own research
            & ideas.
          </li>
          <li>
            <strong>Industry & Community-Driven:</strong> Connect with
            inventors, engineers & scientists.
          </li>
          <li>
            <strong>Next-Gen Tech Database:</strong> Discover the latest
            breakthroughs before they go mainstream.
          </li>
        </ul>
        <a
          href="#start"
          className="mt-6 inline-block px-6 py-3 bg-blaze-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blaze-orange-600"
        >
          Start Your Journey →
        </a>
      </div>
    </div>
  );
};

const WhyInventPediaSection = () => {
  return (
    <div className="container mx-auto">
      <h3 className="text-3xl font-bold mb-6">Why Inventpedia?</h3>
      <p className="text-lg text-gray-700">
        The future needs more thinkers, builders, and visionaries. But too
        often, innovation stays locked in research labs or behind corporate
        doors. Inventpedia is here to change that.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 shadow-lg rounded-lg bg-white">
          <h4 className="font-semibold">🚀 Open & Crowdsourced</h4>
          <p className="text-gray-600">No gatekeepers, everyone has a voice.</p>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-white">
          <h4 className="font-semibold">🔄 Real-time Updates</h4>
          <p className="text-gray-600">
            Stay ahead with the latest discoveries.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-white">
          <h4 className="font-semibold">📂 Personal Innovation Hub</h4>
          <p className="text-gray-600">
            Create, document, and share your research.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-white">
          <h4 className="font-semibold">🤝 Industry & Community Driven</h4>
          <p className="text-gray-600">
            Connect with scientists, engineers, and entrepreneurs.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <a
          href="#signup"
          className="px-6 py-3 bg-blaze-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blaze-orange-600"
        >
          Start Innovating Today →
        </a>
      </div>
    </div>
  );
};

const FeaturedInnovationSection = () => {
  return (
    <div className="container mx-auto text-center">
      <h3 className="text-3xl font-bold mb-6">
        Discover Cutting-Edge Innovations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 shadow-lg rounded-lg bg-gray-50">
          <h4 className="font-semibold">AI-Powered Materials</h4>
          <p className="text-gray-600">
            New aerospace technologies reshaping travel.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-gray-50">
          <h4 className="font-semibold">Quantum Computing</h4>
          <p className="text-gray-600">
            The next industrial revolution is here.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-gray-50">
          <h4 className="font-semibold">Medical Breakthroughs</h4>
          <p className="text-gray-600">
            Crowd-designed healthcare innovations.
          </p>
        </div>
      </div>
    </div>
  );
};

const HowToContributeSection = () => {
  return (
    <div className="container mx-auto">
      <h3 className="text-3xl font-bold mb-6">How You Can Contribute</h3>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto">
        Get involved in shaping the future of innovation by creating, sharing,
        and collaborating with experts.
      </p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 shadow-lg rounded-lg bg-gray-50">
          <h4 className="font-semibold text-blaze-orange-600">
            📌 Step 1: Create & Edit Content
          </h4>
          <p className="text-gray-600">
            Help improve innovation knowledge by contributing insightful
            content.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-gray-50">
          <h4 className="font-semibold text-blaze-orange-600">
            📌 Step 2: Publish Your Own Inventions
          </h4>
          <p className="text-gray-600">
            Get seen by top innovators and potential investors.
          </p>
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-gray-50">
          <h4 className="font-semibold text-blaze-orange-600">
            📌 Step 3: Collaborate With Experts
          </h4>
          <p className="text-gray-600">
            Join discussions and research groups to shape the future.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <a
          href="#join"
          className="px-6 py-3 bg-blaze-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blaze-orange-600"
        >
          Start Contributing →
        </a>
      </div>
    </div>
  );
};

const BuildYourOwnInnovationHubSection = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center">
      {/* Left - Image */}
      <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
        <Image
          src="/dashboard-mockup.png"
          alt="User Dashboard"
          width="40"
          height="40"
          className="w-3/4 rounded-lg shadow-lg"
        />
      </div>
      {/* Right - Text */}
      <div className="md:w-1/2 text-center md:text-left">
        <h3 className="text-3xl font-bold mb-4">
          Build Your Personal Innovation Hub
        </h3>
        <p className="text-lg text-gray-600 mb-4">
          Your ideas deserve to be seen. Create your own blog, publish your
          research, and showcase your innovation portfolio to the world.
        </p>
        <a
          href="#create-hub"
          className="px-6 py-3 bg-blaze-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blaze-orange-600"
        >
          Create Your Innovation Hub →
        </a>
      </div>
    </div>
  );
};

const ProofAndTestominialSection = () => {
  return (
    <div className="container mx-auto max-w-3xl">
      <h3 className="text-3xl font-bold mb-6">
        Trusted by Innovators Worldwide
      </h3>
      <div className="space-y-6">
        <blockquote className="p-6 shadow-md rounded-lg bg-gray-50">
          <p className="text-lg italic">
            “Inventpedia helped me connect with an investor who believed in my
            AI-powered battery tech!”
          </p>
          <span className="block mt-2 font-semibold">— @InnovatorX</span>
        </blockquote>
        <blockquote className="p-6 shadow-md rounded-lg bg-gray-50">
          <p className="text-lg italic">
            “Finally, a place where breakthrough ideas don’t just sit in the
            shadows!”
          </p>
          <span className="block mt-2 font-semibold">— @TechThinker</span>
        </blockquote>
      </div>
      <div className="mt-6">
        <a
          href="#join"
          className="px-6 py-3 bg-blaze-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blaze-orange-600"
        >
          Join the Movement →
        </a>
      </div>
    </div>
  );
};

const CallToActionSection = () => {
  return (
    <div className="container mx-auto">
      <h3 className="text-3xl font-bold mb-4">🚀 Ready to Shape the Future?</h3>
      <p className="text-lg mb-6">
        Join thousands of innovators and thinkers on Inventpedia today.
      </p>
      <a
        href="#signup"
        className="px-6 py-3 bg-white text-blaze-orange-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200"
      >
        🔥 Sign Up & Start Innovating →
      </a>
    </div>
  );
};
