import Image from "next/image";
import Link from 'next/link'
export default function Contact() {
    return (
        <div className='w-screen h-screen flex items-center justify-center overflow-hidden' style={{ backgroundImage: 'url("contact.jpg")' }}>
            <div className="absolute inset-0 flex justify-end p-4">
                 {/* Sayfanın sağ üst köşesindeki "Ana Sayfa" yazan kısım. Ana sayfaya gitmek için */}
                <Link href="/blogs" className="text-cyan-900 px-3 py-3 font-bold">Ana Sayfa</Link>
            </div>
            <div className='flex flex-wrap mr-96 absolute'>
                {/* Sayfanın sol tarafındaki "CONTACT ME" yazısı */}
                <span className='center text-3xl font-bold text-cyan-900 border-r-4 border-cyan-900 px-3 flex-1 text-center' style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>CONTACT ME </span>
                 {/* İletişim formu */}
                <div className="w-[750px] flex-2">
                    <form className="bg-[#49B0B9] shadow-md rounded p-8 m-8">
                        {/* Ad - Soyad alanı */}
                        <label className="block text-m font-bold mb-2 text-white">Ad - Soyad</label>
                        <input className=" border rounded w-full py-2 px-3 text-gray-700 mb-4 " id="username" type="text" placeholder="Ad - Soyad" />
                         {/* E-posta alanı */}
                        <label className="block text-m font-bold mb-2 text-white">E-mail</label>
                        <div className="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                </svg>
                            </div>
                            <input type="text" id="email" class="border rounded text-gray-700 w-full ps-10 p-2" placeholder="example@gmail.com" />
                        </div>
                        {/* Mesaj textarea alanı */}
                        <label class="block text-m font-bold mb-2 text-white mt-4">Mesaj</label>
                        <textarea id="message" rows="4" class="border rounded text-gray-700 p-2 w-full text-sm" placeholder="Mesajınızı yazın..."></textarea>
                        {/* Gönder butonu */}
                        <button class="bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mt-4" type="button">Gönder</button>
                    </form>
                    {/* E-posta ile iletişim bağlantısı. Tıklandığında mail atma uygulamalarına yönlendiriyor */}
                    <a href="mailto:gundogarsibel@gmail.com" className="text-cyan-900 hover:underline hover:text-cyan-600 text-m flex flex-wrap ml-72"> veya email gönderin </a>
                </div>
            </div>
        </div>
    )
}
