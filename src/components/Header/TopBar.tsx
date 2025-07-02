import { Mail, Phone, MapPin, Clock, Send, PhoneCall } from "lucide-react";

const TopBar = () => (
    <div className="hidden lg:block w-full bg-green-600/20">
        <div className="max-w-[1350px] mx-auto flex justify-between items-center px-6 py-2 text-sm text-gray-700">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-900 font-bold" />
                    <span>Санкт-Петербург</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={16} className="text-gray-900" />
                    <span>Пн–Пт 9:00–18:00</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-900" />
                    <span>info@aopf.ru</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-900" />
                    <span>8 (812) 441–37–78</span>
                </div>
                <a href="https://t.me/your_channel" target="_blank" rel="noopener noreferrer"
                   className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Telegram">
                    <Send size={18} className="text-[#0088cc]" />
                </a>
                <a href="https://wa.me/79111234567" target="_blank" rel="noopener noreferrer"
                   className="p-1.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="WhatsApp">
                    <PhoneCall size={18} className="text-[#25D366]" />
                </a>
            </div>
        </div>
    </div>
);

export default TopBar;
