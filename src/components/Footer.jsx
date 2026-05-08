import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const Footer = () => {
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
                            <li><a href="#" className="hover:text-white transition">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
                            <li><a href="#" className="hover:text-white transition">FAQs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Categories</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition">Men's Denim</a></li>
                            <li><a href="#" className="hover:text-white transition">Women's Denim</a></li>
                            <li><a href="#" className="hover:text-white transition">Jackets</a></li>
                            <li><a href="#" className="hover:text-white transition">Accessories</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <FaFacebook className="w-6 h-6 cursor-pointer hover:text-roj-gold transition" />
                            <FaInstagram className="w-6 h-6 cursor-pointer hover:text-roj-gold transition" />
                            <FaTwitter className="w-6 h-6 cursor-pointer hover:text-roj-gold transition" />
                            <FaYoutube className="w-6 h-6 cursor-pointer hover:text-roj-gold transition" />
                        </div>
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