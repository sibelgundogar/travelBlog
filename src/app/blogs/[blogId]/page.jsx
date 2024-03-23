import Image from "next/image";
import Link from "next/link"
import fs from 'fs';

export default function Blog({ params: { blogId } }) {
  //data.json dosyasını okur
  const file = fs.readFileSync('src/data.json', 'utf8');
  // okunan verileri blogs a atar
  const { blogs } = JSON.parse(file);

  // blogs dan verilen blogId'ye ait blogu bulur
  const blog = blogs[blogId];

  // Eğer blog bulunamazsa kullanıcıya mesaj gösterir
  if (!blog)
    return (<span className="text-xl text-white">Blog bulunamadı!</span>)

  return (
    <div class="relative min-h-screen">
      {/* Arka plan resmi */}
      <div class="absolute inset-0 z-0">
        <Image src="/travelbg.jpg" alt="photo" width={1920} height={1080} className="w-full h-full object-cover" />
      </div>
      <div class="flex relative  overflow-hidden pt-20 mr-10 ml-10">
        {/* Blog resmi */}
        <div class="flex-2 relative items-center justify-center h-[550px] w-[450px]">
          <Image src={"/thumbnails/" + blogId + ".jpg"} alt="photo" width={1920} height={1080} className="object-contain max-w-full max-h-full"></Image>
        </div>
        {/* Blog başlığı, içeriği ve tarihi */}
        <div class="flex-1 text-black relative ml-7 ">
          <h1 className="text-2xl font-bold border-b-2 pl-4 border-l-2 rounded-lg border-cyan-400">{blog.title}</h1><br />
          <div className="text-lg  w-[900px] mb-5 ">{blog.content}</div>
          <span className="text-sm mb-7">{blog.date}</span>
        </div>
      </div>
      <div className="absolute inset-0 flex items-start justify-end p-4">
          <Link href="/blogs" className="text-black px-3 py-3 font-bold">Ana Sayfa</Link>
          <Link href="/contact" className="text-black px-3 py-3 font-bold">İletişim</Link>
        </div>
    </div>
  );
}
