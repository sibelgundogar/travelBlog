import Image from 'next/image'
import Link from 'next/link'


export default function BlogSummary({ date, title, desc, blogId, edit }) {
    // Link kullanılarak, belirtilen blogs sayfasına veya admin sayfasına bağlantı oluşturulur
    return (
        //edit değişkeni true ise admin sayfasındaki alan false ise kullanıcı kısmındaki alan açılır
        <Link href={`${edit ? "/admin" : ""}/blogs/${blogId}`} className="blogContainer flex flex-col w-[350px] h-[433px] m-5 mb-0 text-black overflow-hidden hover:scale-105 hover:rounded-b-2xl" >
            {/* Blog resmini gösteren bölüm */}
            <div style={{ flex: 5 }} className='overflow-hidden rounded-2xl rounded-b-none'>
                <Image src={`/thumbnails/${blogId}.jpg`} alt="photo" width={1920} height={1080} className='w-full h-full object-cover' style={{ overflowClipMargin: "content-box" }} />
            </div>
            {/* Blog tarihini gösteren bölüm */}
            <div style={{ flex: 1 }} className="text-sm border-x-2 border-cyan-700 px-3 text-left flex items-center">{date}</div>
            {/* Blog başlığı ve açıklamasını gösteren bölüm */}
            <div style={{ flex: 4 }} className="flex flex-col border-x-2 border-b-2 border-cyan-700 rounded-2xl rounded-t-none  px-4 pb-4 overflow-hidden">
                <h1 className='font-bold text-xl h-min'>{title}</h1>
                <p className='font-serif h-full overflow-hidden text-clip text-[0.98em]' style={{ overflow: "hidden", textOverflow: "clip" }}>{desc}</p>
            </div>
        </Link>
    )
}