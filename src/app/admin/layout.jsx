import Link from 'next/link';

export default function AdminLayout({ children }) {
    return (
        <div>
            {/* Navigasyon çubuğu */}
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/admin" className="text-white font-bold text-lg">Admin Paneli</Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link href="/admin/blogs" className="text-white hover:text-gray-300">Blogs</Link>
                        <Link href="/admin/blogs/new" className="text-white hover:text-gray-300">Blog Ekle</Link>
                        <Link href="/blogs" className="text-white hover:text-gray-300">Çıkış</Link>
                    </div>
                </div>
            </nav>
            
            <main className="container mx-auto mt-4 bg-white h-full ">
                {children}
            </main>

        </div>
    );
};
