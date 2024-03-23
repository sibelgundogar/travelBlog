import BlogSummary from "@/components/BlogSummary";
import fs from 'fs';

// 'AdminBlogs' bileşeni, yönetici panelindeki blogları göstermek için kullanılır
export default function AdminBlogs({ params }) {
    // 'data.json' dosyasını okur
    const file = fs.readFileSync('src/data.json', 'utf8');
    // ve verileri blogs a atar
    const { blogs } = JSON.parse(file);

    return (
        <div id="blogs" className="flex flex-wrap place-content-center justify-center min-h-screen pb-4 mb-4">
            {Object.entries(blogs).map(([key, blog]) => {
                {/*her blog için BloSummary oluşturur*/ }
                key = parseInt(key)
                return <BlogSummary key={key} blogId={key} title={blog.title} desc={blog.content} date={blog.date} edit="true" />
            })}
        </div>
    )
}