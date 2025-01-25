import { useState } from 'react';
import mainVideo from '../assets/videos/main-video.mp4'

const Home = () => {

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    return (
        <main className="min-h-screen min-w-screen bg-gray-100">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full">
                <div className="max-w-7xl mx-auto text-center">
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        loop
                        muted
                        playsInline
                        autoPlay
                    >
                        <source src={mainVideo} type="video/mp4" />
                    </video>
                </div>
            </section>

            {/* Features Section */}
            <section id="explore" className="py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Why Choose GoFetch?
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Here’s what makes us the best platform for pet-friendly travel.
                    </p>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold">Find Pet-Friendly Places</h3>
                            <p className="mt-2 text-gray-600">
                                Explore hotels, restaurants, and parks that welcome pets.
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold">Plan Your Trip</h3>
                            <p className="mt-2 text-gray-600">
                                Get personalized recommendations for your journey.
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h3 className="text-xl font-bold">Connect with Pet Lovers</h3>
                            <p className="mt-2 text-gray-600">
                                Join a community of pet enthusiasts just like you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
