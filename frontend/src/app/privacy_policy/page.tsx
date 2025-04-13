export default function PrivacyPolicy() {
    return (
      <div className=" flex flex-col bg-neutral-100  items-center justify-items-center min-h-screen pb-20">
        {/* main Page body Section */}
        <main className="flex flex-col items-center sm:items-start">
          <div className="flex flex-col items-center mx-10 mt-10">
            <h1 className="text-4xl font-bold text-gray-800"> Privacy Policy</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl text-center">
              {`Welcome to Inventpedia, your go-to platform for all things invention-related! Our mission is to provide a comprehensive resource for inventors, entrepreneurs, and anyone interested in the world of innovation. Whether you're looking for inspiration, guidance, or simply want to learn more about the fascinating world of inventions, we've got you covered.`}
            </p>
          </div>
        </main>
      </div>
    );
  }