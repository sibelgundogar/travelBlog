'use server'

import { redirect } from 'next/navigation';
import fs from 'fs';
import fsp from 'fs/promises';
import { revalidatePath } from 'next/cache';

// JSON dosyasındaki veriyi okur ve veriyi içeren bir nesne oluştur
const data = JSON.parse(fs.readFileSync('src/data.json', { encoding: 'utf8' }));

// Yeni bir blog oluşturmak için fonksiyon
export async function createBlog(formData) {
    // Kullanıcının yüklediği thumbnail'ı alır
    const thumbnail = formData.get('thumbnail');

    // Blog için tarihini oluşturur
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    // Kullanıcının girdiği verileri içeren blog verisi
    const rawBlogData = {
        title: formData.get('title'),
        content: formData.get('content'),
        date: `${day}-${month}-${year}`
    }

    // Yeni blogun blogId sini belirler ve lastBlogId yi günceller
    let blogId = data.lastBlogId + 1;
    data.blogs[blogId] = rawBlogData;
    data.lastBlogId = blogId;
    let fileContent = JSON.stringify(data);

    // Dosyaya yazma işlemlerini asenkron olarak gerçekleştirir
    await Promise.all([
        fsp.writeFile('src/data.json', fileContent),
        fsp.writeFile(`public/thumbnails/${blogId}.jpg`, thumbnail.stream())
    ]);

    // Admin panelindeki blogları yeniden sorgular ve yönlendirir
    revalidatePath("/admin/blogs");
    redirect("/admin/blogs");
}

// Blogu düzenleme fonksiyonu
export async function editBlog(formData) {
    // Kullanıcının yüklediği thumbnail'ı alır
    const thumbnail = formData.get('thumbnail');

    // Blog için tarihini oluşturur
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;

    // Kullanıcının girdiği verileri içeren blog verisi
    const rawBlogData = {
        title: formData.get('title'),
        content: formData.get('content'),
        date: `${day}-${month}-${year}`
    }

    // Düzenlenecek blogun blogId sini alır
    let blogId = formData.get('blogId');
    data.blogs[blogId] = rawBlogData;
    let fileContent = JSON.stringify(data);

    // Dosyaya yazma işlemlerini asenkron olarak gerçekleştirir
    await Promise.all([
        fsp.writeFile('src/data.json', fileContent),
        fsp.writeFile(`public/thumbnails/${blogId}.jpg`, thumbnail.stream())
    ]);

    // Admin panelindeki blogları yeniden sorgular ve yönlendirir
    revalidatePath("/admin/blogs");
    redirect("/admin/blogs");
}

// Blogu silme fonksiyonu
export async function deleteBlog(blogId) {
    // blogId si üzerinden o blog data dan silinir
    delete data.blogs[blogId];


    // JSON dosyasını düzenler ve thumbnailden o fotoğrafı siler
    let fileContent = JSON.stringify(data);
    await Promise.all([
        fsp.writeFile('src/data.json', fileContent),
        // Thumbnail'ından o fotoğrafı silmek için
        fsp.unlink(`public/thumbnails/${blogId}.jpg`)
    ]);

    // Admin panelindeki blogları yeniden sorgular ve yönlendirir
    revalidatePath("/admin/blogs");
    redirect("/admin/blogs");
}

// blogId ile bir blogun detaylarını alır
export async function getBlog(blogId) {
    return data.blogs[blogId];
}
