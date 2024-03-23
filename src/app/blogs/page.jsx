import BlogSummary from "@/components/BlogSummary";
import Image from "next/image";
import Link from 'next/link'
import fs from 'fs';

export default function Blogs({ params }) {
  //data.json dosyasını okur
  const file = fs.readFileSync("src/data.json", { encoding: 'utf8' });
  // okunan verileri blogs a atar
  const { blogs } = JSON.parse(file);
  // blogs u anahtar-değer çiftlerine ayır
  const entries = Object.entries(blogs);


  return (
    <div className="snap-mandatory snap-y h-screen overflow-scroll scrollbar-hide bg-gradient-to-b from-sky-100 to-cyan-200/80 ">
      {/* İlk Bölüm */}
      <div className="snap-center relative h-screen overflow-hidden">
        <Image src="/backg.jpg" alt="photo" width={1920} height={1080} className="object-cover w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center text-blue-400">
          <div className="text-center text-4xl font-bold font-serif">Merhaba, Gezi Bloguma Hoş Geldiniz!</div>
        </div>
        <div className="absolute inset-0 flex items-start justify-end p-4">
          <Link href="/blogs" className="text-black px-3 py-3 font-bold">Ana Sayfa</Link>
          <Link href="/contact" className="text-black px-3 py-3 font-bold">İletişim</Link>
        </div>
      </div>

      {/* İkinci Bölüm */}
      <div id="blogs" className="flex flex-wrap place-content-center justify-center min-h-screen  snap-start pb-5">
        {//blog sayısını kontrol ediyoruz eğer 0 sa blog yok yazısı döndürüyoruz
          entries.length == 0 ?
            <span className="text-black text-xl">Blog Yok</span> :
            // Tüm blogları BlogSummary e uygun olarak sayfaya return ediyoruz. BlogSummarydeki değerlere blog nesnesinden gelen verileri atıyoruz.
            entries.map(([key, blog]) => {
              {/*her blog için BloSummary oluşturur*/}
              return <BlogSummary key={key} blogId={key} title={blog.title} desc={blog.content} date={blog.date} />;
            })
        }
      </div>
    </div>
  )
}