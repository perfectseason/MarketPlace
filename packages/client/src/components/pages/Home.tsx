const ChatGteway = () => (
  <div className="p-5">
    <h3 className="text-2xl font-semibold text-center text-gray-800">
      Talk to our support team.
    </h3>

    <p className="text-gray-600 text-center mt-2">
      Connect with our support team to find the perfect property or file a
      complaint.
    </p>

    <div className="flex flex-col items-center justify-center">
      <button className="mt-6 bg-gray-800 text-white px-5 py-3 rounded-lg hover:bg-black transition duration-300">
        Start Chat
      </button>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="h-[90vh] bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content */}
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Find Your Dream Home
          </h1>

          <p className="text-lg md:text-xl mb-6">
            Luxury homes, apartments, and properties at the best locations.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition duration-300">
            Explore Properties
          </button>
        </div>
      </section>

      {/* Property List Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Properties
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Property Card 1 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop"
              alt="Property"
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-2xl font-semibold text-gray-800">
                Modern Duplex
              </h3>

              <p className="text-gray-600 mt-2">
                4 Bedroom luxury duplex with swimming pool and parking space.
              </p>

              <button className="mt-4 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-black transition">
                View Details
              </button>
            </div>
          </div>

          {/* Property Card 2 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
              alt="Property"
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-2xl font-semibold text-gray-800">
                Luxury Apartment
              </h3>

              <p className="text-gray-600 mt-2">
                Beautiful apartment located in a serene and secure environment.
              </p>

              <button className="mt-4 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-black transition">
                View Details
              </button>
            </div>
          </div>

          {/* Property Card 3 */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
              alt="Property"
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-2xl font-semibold text-gray-800">
                Family House
              </h3>

              <p className="text-gray-600 mt-2">
                Spacious family home with modern interior finishing and garden.
              </p>

              <button className="mt-4 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-black transition">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
              alt="Property"
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-2xl font-semibold text-gray-800">
                Beautiful Edifice
              </h3>

              <p className="text-gray-600 mt-2">
                Modern interior finishing and garden.
              </p>

              <button className="mt-4 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-black transition">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
              alt="Property"
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-2xl font-semibold text-gray-800">
                Fantastic Edifice
              </h3>

              <p className="text-gray-600 mt-2">Visit Your Dream Home</p>

              <button className="mt-4 bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-black transition">
                View Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <ChatGteway />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
