import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { SiThreads } from "react-icons/si";

const Footer = () => {
    // Working social media URLs
    const socialUrls = {
        facebook: "https://www.facebook.com/p/Room-Of-jeans-61550354143991/",
        instagram: "https://www.instagram.com/room_of_jeans/",
        tiktok: "https://www.tiktok.com/@room_of_jeans",
        threads: "https://www.threads.com/@room_of_jeans"
    };

    const openSocialLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <footer className="bg-gray-900 text-white pt-12 pb-6">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">ROJ</h3>
                        <p className="text-gray-400">
                            Premium quality denim for everyone. Style meets comfort at Room of Jeans.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                            <li><a href="/faqs" className="hover:text-white transition">FAQs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="/baggy-jeans" className="hover:text-white transition">Baggy Jeans</a></li>
                            <li><a href="/boyfriend-jeans" className="hover:text-white transition">Boyfriend Jeans</a></li>
                            <li><a href="/skinny-jeans" className="hover:text-white transition">Skinny Jeans</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => openSocialLink(socialUrls.facebook)}
                                className="text-gray-400 hover:text-[#1877f2] transition-all duration-300 transform hover:scale-110"
                                aria-label="Follow on Facebook"
                            >
                                <FaFacebook className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => openSocialLink(socialUrls.instagram)}
                                className="text-gray-400 hover:text-[#E4405F] transition-all duration-300 transform hover:scale-110"
                                aria-label="Follow on Instagram"
                            >
                                <FaInstagram className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => openSocialLink(socialUrls.tiktok)}
                                className="text-gray-400 hover:text-[#1DA1F2] transition-all duration-300 transform hover:scale-110"
                                aria-label="Follow on TikTok"
                            >
                                <FaTiktok className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => openSocialLink(socialUrls.threads)}
                                className="text-gray-400 hover:text-[#FF0000] transition-all duration-300 transform hover:scale-110"
                                aria-label="Follow on Threads"
                            >
                                <SiThreads className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm mt-4">
                            Follow us for updates and exclusive offers!
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
                    <p>&copy; 2026 ROJ - Room of Jeans. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;