'use client'

import { createBlog } from '@/app/actions'
import { useState } from 'react';

export default function NewBlog({ params }) {
    // Blog oluşturulma işlemi bekleniyor mu kontrol etmek için
    const [pending, setPending] = useState(false);
    // Form gönderildiğinde çalışacak olan fonksiyon
    const handleSubmit = e => {
        // Form gönderilirken 'pending' durumunu 'true' olarak ayarlar
        setPending(true);
    }

    return (
        <div className="flex bg-gray-600 mt-8">
            <form action={createBlog} onSubmit={handleSubmit} className="flex flex-col w-full px-6 py-4">
                <label className="block text-lg font-bold mb-2 text-black">Başlık</label>
                <input type="text" id="title" name="title" className="text-black border rounded w-full py-2 px-3 text-gray-700 mb-8" placeholder="Başlık" required />
                <label className="block text-lg font-bold mb-2 text-black">Fotoğraf</label>
                <input type="file" id="thumbnail" name="thumbnail" className='mb-8' accept="image/jpeg" required />
                <label className="block text-lg font-bold mb-2 text-black">İçerik</label>
                <textarea name="content" cols={40} rows={10} className="text-black border rounded w-full py-2 px-3 text-gray-700 mb-8" placeholder="İçerik" required />
                <button type="submit" disabled={pending} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{pending ? 'Yükleniyor' : 'Yükle'}</button>
                <button type="button" onClick={() => window.history.back()} className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-3">Vazgeç</button>
          </form>
        </div>
    )
}
