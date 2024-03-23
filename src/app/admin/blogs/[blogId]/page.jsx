'use client'

import { editBlog, getBlog, deleteBlog } from '@/app/actions'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewBlog({ params: { blogId } }) {
    // Blog verisini ve düzenleme durumunu takip etmek için 'useState' kullandık
    const [blog, setBlog] = useState({ title: '', content: '', date: '' });
    const [pending, setPending] = useState(false);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(`/thumbnails/${blogId}.jpg`);
    const router = useRouter();


    // Form gönderildiğinde çalışacak olan fonksiyon
    const handleSubmit = e => {
        setPending(true);
    }

    // Sayfa yüklendiğinde blog verisini çeker
    useEffect(() => {
        (async () => {
            // Blog verisini çeker ve 'setBlog' fonksiyonuyla ayarlar
            const _blog = await getBlog(blogId);
            if (!_blog) {
                router.push('/admin/blogs');
            }
            else {
                setBlog(_blog);
                // Sayfa yüklendiğinde bekleme durumunu false yapar
                setLoading(false);
            }
        })();
    }, [])

    // Dosya seçildiğinde çalışacak olan fonksiyon
    const handleFile = function (event) {
        if (event.target.files && event.target.files[0]) {
            // Dosya seçildiğinde görüntüyü göstermek için 'setImage' fonksiyonu kullandık
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    // Blogu silen fonksiyon
    const handleDelete = function (event) {
        // Silme işlemi sırasında bekleme durumunu true yapar
        setPending(true);
        // O blogu siler
        deleteBlog(blogId);
    }

    // Sayfa yüklenirken bekleme durumunda yükleniyor mesajını gösterir
    if (loading)
        return <span className='text-black text-xl'>Yükleniyor...</span>

    return (
        <div className="flex bg-gray-600 mt-3">
            <form action={editBlog} onSubmit={handleSubmit} className="flex flex-col w-full px-6 py-4">
                <input name="blogId" value={blogId} readOnly hidden />
                <label className="block text-lg font-bold mb-2 text-black">Başlık</label>
                <input type="text" defaultValue={blog.title} id="title" name="title" className="text-black border rounded w-full py-2 px-3 text-gray-700 mb-6" placeholder="Başlık" required />
                <label className="block text-lg font-bold mb-2 text-black">Fotoğraf</label>
                <input type="file" id="thumbnail" name="thumbnail" accept="image/jpeg" onChange={handleFile} className='mb-3' />
                <Image src={image} width={1920} height={1080} alt="Thumbnail Image" className='w-48 h-48 mb-6' />
                <label className="block text-lg font-bold mb-2 text-black">İçerik</label>
                <textarea name="content" defaultValue={blog.content} cols={40} rows={7} className="text-black border rounded w-full py-2 px-3 text-gray-700 mb-6" placeholder="İçerik" required />
                <button type="submit" disabled={pending} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{pending ? 'Yükleniyor' : 'Yükle'}</button>
                <button type="button" disabled={pending} onClick={handleDelete} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-3">Sil</button>
                <button type="button" onClick={() => window.history.back()} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-3">Vazgeç</button>
            </form>
        </div>
    )
}
