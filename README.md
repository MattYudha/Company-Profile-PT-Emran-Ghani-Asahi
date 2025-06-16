# PT. EMRAN GHANIM ASAHI - Situs Web Profil Perusahaan

![Logo Perusahaan](../assets/logo.png)

## Gambaran Umum

Selamat datang di situs web profil resmi PT. EMRAN GHANIM ASAHI. Repositori ini berisi kode sumber untuk kehadiran web kami yang modern, responsif, dan interaktif, yang dibangun menggunakan React, TypeScript, dan Vite. Situs web ini menampilkan layanan cetak dan pelabelan premium kami, informasi perusahaan, portofolio, dan detail kontak, melayani klien di sektor ritel, fesyen, dan logistik.

Tujuan kami adalah untuk menyediakan pengalaman yang mulus dan informatif bagi calon klien dan klien kami yang sudah ada, menyoroti komitmen kami terhadap kualitas, inovasi, dan kepuasan pelanggan.

## Fitur

### Fitur Inti
* **Desain Responsif**: Dioptimalkan untuk berbagai perangkat, dari desktop hingga ponsel, memastikan pengalaman pengguna yang konsisten.
* **Dukungan Multi-bahasa**: Tersedia dalam berbagai bahasa (Inggris, Indonesia, Jepang, Mandarin, Arab) untuk melayani beragam klien global kami.
* **Aplikasi Web Progresif (PWA)**: Meningkatkan pengalaman pengguna dengan kemampuan offline dan waktu muat yang lebih cepat.
* **Ramah SEO**: Dikonfigurasi dengan meta tag dan pembuatan sitemap untuk visibilitas mesin pencari yang lebih baik.

### Chatbot AI yang Ditingkatkan - "Emran Chatbot"
* **Asisten Cerdas**: Chatbot bertenaga AI bernama "Emran Chatbot" memberikan jawaban instan untuk pertanyaan umum tentang layanan cetak kami.
* **Pengenalan Gambar**: Fitur revolusioner yang memungkinkan pengguna mengunggah gambar untuk analisis bertenaga AI dan rekomendasi pencetakan.
* **Saran Dinamis**: Sistem saran peka konteks yang beradaptasi berdasarkan alur percakapan dan pertanyaan pengguna.
* **Dukungan Multi-bahasa**: Menanggapi dalam bahasa pilihan pengguna dengan informasi profesional dan spesifik perusahaan.
* **Branding Profesional**: Konsisten dengan identitas merek dan nilai-nilai PT. EMRAN GHANIM ASAHI.
* **Analisis Real-time**: Umpan balik instan pada gambar yang diunggah dengan rekomendasi layanan pencetakan yang disesuaikan.

### Fitur Bisnis
* **Pameran Layanan**: Bagian terperinci untuk berbagai layanan kami, termasuk pencetakan digital, pencetakan offset, format besar, solusi pengemasan, dan layanan desain.
* **Portofolio Dinamis**: Tampilan portofolio proyek kami yang dikurasi, menunjukkan keahlian dan kualitas kami.
* **Formulir Kontak**: Formulir kontak yang mudah digunakan terintegrasi dengan layanan email untuk pertanyaan langsung.
* **Mode Gelap**: Tombol yang ramah pengguna untuk tema terang dan gelap.

## Teknologi yang Digunakan

### Frontend
* **React**: Sebuah pustaka JavaScript untuk membangun antarmuka pengguna.
* **TypeScript**: Superser JavaScript yang diketik yang dikompilasi ke JavaScript biasa.
* **Vite**: Alat build cepat yang menyediakan pengalaman pengembangan secepat kilat.
* **Tailwind CSS**: Kerangka kerja CSS berbasis utilitas untuk membangun desain kustom dengan cepat.
* **Framer Motion**: Pustaka gerak siap produksi untuk React.
* **Lucide React**: Pustaka ikon SVG yang dapat disesuaikan.

### Manajemen Formulir
* **react-hook-form**: Pustaka formulir yang berkinerja, fleksibel, dan dapat diperluas untuk React.
* **zod**: Pustaka deklarasi dan validasi skema yang mengutamakan TypeScript.
* **@hookform/resolvers**: Integrasi untuk Zod dengan React Hook Form.

### Layanan Email
* **@emailjs/browser**: Mengirim email langsung dari sisi klien menggunakan EmailJS.
* **Supabase Edge Functions**: Digunakan sebagai backend untuk menangani pengiriman formulir kontak dengan aman dan terintegrasi dengan EmailJS.

### Integrasi AI
* **Google Gemini API**: Menggerakkan "Emran Chatbot" untuk tanggapan cerdas dan peka konteks tentang layanan cetak kami.
* **Pengenalan Gambar**: Kemampuan AI canggih untuk menganalisis gambar yang diunggah dan memberikan rekomendasi pencetakan.

### Analisis
* **@vercel/analytics**: Untuk pemantauan kinerja dan penggunaan.

## Memulai

Ikuti petunjuk ini untuk mengatur dan menjalankan proyek secara lokal untuk tujuan pengembangan dan pengujian.

### Prasyarat

Sebelum memulai, pastikan Anda memiliki yang berikut ini yang terinstal di sistem Anda:

* Node.js (versi LTS direkomendasikan, misal, v18.x atau v20.x)
* npm atau Yarn (npm digunakan dalam perintah di bawah ini)

### Instalasi

1.  **Kloning repositori**:

    ```bash
    git clone [https://github.com/mattyudha/company-profile-pt-emran-ghani-asahi.git](https://github.com/mattyudha/company-profile-pt-emran-ghani-asahi.git)
    cd company-profile-pt-emran-ghani-asahi
    ```

2.  **Instal dependensi**:

    ```bash
    npm install
    # atau jika Anda menggunakan yarn
    # yarn install
    ```

### Variabel Lingkungan

Proyek ini menggunakan variabel lingkungan, terutama untuk fungsionalitas Chatbot AI dan Formulir Kontak. Anda perlu membuat file `.env` di direktori root proyek dan menambahkan variabel berikut:

```dotenv
# Konfigurasi Gemini AI (Diperlukan untuk Emran Chatbot dengan Pengenalan Gambar)
VITE_GEMINI_API_KEY=YOUR_GOOGLE_GEMINI_API_KEY

# Konfigurasi Supabase (Diperlukan untuk formulir kontak dan penyimpanan data)
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

# Konfigurasi EmailJS (Diperlukan untuk notifikasi email formulir kontak)
VITE_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
VITE_EMAILJS_TO_EMAIL=YOUR_COMPANY_EMAIL_FOR_NOTIFICATIONS
Cara mendapatkan kunci ini:
VITE_GEMINI_API_KEY:

Dapatkan ini dari Google AI Studio atau Google Cloud Console.
Kunjungi Google AI Studio untuk membuat kunci API Anda.
Penting: Pastikan kunci API Anda memiliki izin untuk kemampuan pemrosesan teks dan gambar.
VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY:

Ini adalah URL proyek Anda dan kunci publik anon dari pengaturan proyek Supabase Anda (bagian API).
Kunjungi Supabase untuk membuat proyek dan mendapatkan kredensial ini.
VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY:

Ini diperoleh dari akun EmailJS Anda. Anda perlu menyiapkan layanan dan template untuk mengirim email.
Kunjungi EmailJS untuk mengatur layanan email Anda.
VITE_EMAILJS_TO_EMAIL:

Ini adalah alamat email tempat Anda ingin menerima pengiriman formulir kontak.
Penyiapan Fungsi Edge Supabase:
Formulir kontak juga menggunakan Supabase Edge Function untuk menyimpan pengiriman ke database dan memicu EmailJS.

File supabase/functions/send-email/index.ts berisi logika untuk ini.
Pastikan proyek Supabase Anda memiliki tabel contacts dengan skema yang ditentukan dalam supabase/migrations/20250526104834_late_oasis.sql dan variabel lingkungan yang diperlukan disiapkan di Supabase untuk Fungsi Edge.
File supabase/config.toml menyediakan konfigurasi lokal untuk Supabase.
Menjalankan Proyek
Mulai server pengembangan:

Bash

npm run dev
# atau jika Anda menggunakan yarn
# yarn dev
Ini akan memulai server pengembangan Vite, biasanya di http://localhost:5173.

Buka di browser Anda:
Navigasikan ke alamat yang ditampilkan di terminal Anda (misalnya, http://localhost:5173) untuk melihat situs web.

Membangun untuk Produksi
Untuk membuat build produksi yang dioptimalkan dari situs web:

Bash

npm run build
# atau jika Anda menggunakan yarn
# yarn build
Perintah ini akan mengkompilasi proyek ke direktori dist/, siap untuk deployment.

Linting
Untuk memeriksa kode dari kesalahan linting:

Bash

npm run lint
Membuat Sitemap
Proyek ini menyertakan skrip untuk membuat sitemap.xml untuk tujuan SEO.

Bash

npm run generate-sitemap
Struktur Proyek
.
├── public/                    # Aset statis (gambar, manifest.json, robots.txt)
│   ├── assets/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── manifest.json
│   └── robots.txt             # Referensi Sitemap disertakan di sini
├── src/                       # Kode sumber
│   ├── components/            # Komponen UI yang dapat digunakan kembali
│   │   ├── Chatbot.tsx        # Emran Chatbot yang ditingkatkan dengan pengenalan gambar
│   │   ├── Services.tsx       # Tampilan layanan dengan tautan yang tepat
│   │   └── ...                # Komponen lainnya
│   ├── contexts/              # React Contexts untuk status global (Tema, Bahasa)
│   ├── pages/                 # Halaman individual untuk layanan dan bagian utama
│   ├── utils/                 # Fungsi utilitas (terjemahan, integrasi Gemini API, validasi)
│   │   ├── gemini.ts          # Integrasi Gemini API yang ditingkatkan dengan pengenalan gambar
│   │   ├── translations.ts    # Dukungan multi-bahasa dengan terjemahan terkait gambar
│   │   └── validation.ts      # Skema validasi formulir
│   ├── App.tsx                # Komponen aplikasi utama
│   ├── index.css              # CSS global, impor TailwindCSS
│   └── main.tsx               # Titik masuk untuk aplikasi React
├── supabase/                  # Konfigurasi dan fungsi terkait Supabase
│   ├── functions/send-email/  # Fungsi Edge untuk mengirim email
│   ├── migrations/            # File migrasi database (misalnya, pembuatan tabel)
│   └── config.toml            # Konfigurasi Supabase CLI
├── .env.example               # Contoh untuk variabel lingkungan
├── .gitignore                 # File dan direktori yang akan diabaikan di Git
├── index.html                 # File HTML utama
├── package.json               # Dependensi dan skrip proyek
├── package-lock.json          # File kunci pohon dependensi
├── postcss.config.js          # Konfigurasi PostCSS untuk Tailwind CSS
├── README.md                  # README Proyek (file ini)
├── tailwind.config.js         # Konfigurasi Tailwind CSS
├── tsconfig.json              # Konfigurasi TypeScript
├── vite.config.ts             # Konfigurasi alat build Vite (penyiapan PWA)
└── ... file konfigurasi lainnya
Fitur yang Ditingkatkan
Kemampuan Emran Chatbot
Chatbot AI telah ditingkatkan secara signifikan dengan fitur-fitur berikut:

Identitas Profesional: Dinamai "Emran Chatbot" dan diberi merek sebagai asisten resmi untuk PT. EMRAN GHANIM ASAHI.

Pengenalan & Analisis Gambar:

Unggah gambar (JPG, PNG, WebP) hingga 5MB.
Analisis bertenaga AI terhadap elemen desain, persyaratan pencetakan, dan penilaian kualitas.
Rekomendasi layanan pencetakan yang disesuaikan berdasarkan konten gambar.
Umpan balik waktu nyata dengan pratinjau visual gambar yang diunggah.
Sistem Saran Dinamis:

Saran peka konteks yang berubah berdasarkan alur percakapan.
Saran khusus gambar saat gambar diunggah.
Mencegah pengulangan saran yang sudah digunakan.
Saran berbasis kategori (pencetakan, layanan, harga, kontak, umum, analisis gambar).
Basis Pengetahuan yang Ditingkatkan:

Informasi perusahaan yang komprehensif termasuk layanan, detail kontak, kemampuan peralatan.
Dukungan multibahasa dengan terjemahan yang akurat.
Respons profesional yang disesuaikan dengan terminologi industri percetakan.
Penanganan Kesalahan Tingkat Lanjut:

Pesan kesalahan yang mudah digunakan untuk kegagalan unggah gambar.
Validasi jenis file dan ukuran.
Mekanisme coba lagi untuk permintaan AI yang gagal.
Fallback yang anggun untuk masalah jaringan.
Optimalisasi Kinerja
Penanganan Kesalahan yang Ditingkatkan: Pesan kesalahan yang mudah digunakan dengan panduan yang dapat ditindaklanjuti.
Integrasi API yang Ditingkatkan: Integrasi Gemini API yang kuat dengan mekanisme coba lagi dan pemrosesan gambar.
Terjemahan yang Dioptimalkan: Sistem terjemahan yang komprehensif dengan lokalisasi pesan kesalahan terkait gambar.
Validasi File: Validasi komprehensif untuk unggahan gambar dengan umpan balik pengguna yang jelas.
Pemuatan Malas (Lazy Loading): Diterapkan pada semua gambar di bawah lipatan untuk kinerja yang lebih baik.
Optimalisasi Font: Google Font dimuat dengan font-display: swap untuk kinerja yang lebih baik.
Peningkatan di Masa Depan
Fitur yang Direncanakan
Analisis Gambar Tingkat Lanjut:

Unggah dan perbandingan banyak gambar.
Pemrosesan batch untuk beberapa file desain.
Integrasi dengan API perangkat lunak desain.
Pembuatan kutipan otomatis berdasarkan spesifikasi gambar.
Fitur Chatbot yang Ditingkatkan:

Dukungan pesan suara.
Unggah file untuk spesifikasi cetak (file PDF, AI, PSD).
Integrasi dengan sistem manajemen pesanan.
Eskalasi obrolan langsung ke agen manusia.
Pengalaman Pengguna yang Ditingkatkan:

Pelacakan pesanan waktu nyata.
Portal pelanggan untuk klien berulang.
Pemfilteran dan pencarian portofolio tingkat lanjut.
Alat desain interaktif.
Fitur Pengenalan Gambar
Format yang Didukung
JPEG/JPG: Format gambar standar untuk foto dan gambar kompleks.
PNG: Terbaik untuk gambar dengan transparansi dan grafik sederhana.
WebP: Format modern yang menawarkan kompresi dan kualitas superior.
Batas Ukuran File
Ukuran Maksimum: 5MB per gambar.
Ukuran yang Direkomendasikan: 1-3MB untuk kecepatan pemrosesan optimal.
Resolusi Minimum: 100x100 piksel untuk analisis yang efektif.
Kemampuan Analisis
Pengenalan Elemen Desain: Mengidentifikasi warna, tipografi, elemen tata letak.
Penilaian Kualitas Cetak: Mengevaluasi resolusi dan kesiapan cetak.
Rekomendasi Bahan: Menyarankan jenis kertas dan hasil akhir yang sesuai.
Pencocokan Layanan: Merekomendasikan layanan PT. EMRAN GHANIM ASAHI yang relevan.
Estimasi Biaya: Memberikan panduan harga awal.
Tips Penggunaan
Gambar Berkualitas Tinggi: Unggah gambar yang jelas dan terang untuk hasil analisis terbaik.
Beberapa Sudut: Pertimbangkan untuk mengunggah berbagai tampilan desain atau produk Anda.
Informasi Konteks: Berikan detail tambahan dalam pesan Anda untuk rekomendasi yang lebih akurat.
Persiapan File: Pastikan gambar dipotong dengan benar dan fokus pada konten yang relevan.
Kontribusi
Kami menyambut kontribusi untuk meningkatkan proyek ini! Jika Anda memiliki saran atau menemukan masalah, silakan buka issue atau kirimkan pull request.

Pedoman Pengembangan
Ikuti struktur kode dan konvensi penamaan yang sudah ada.
Pastikan semua fitur baru diketik dengan benar menggunakan TypeScript.
Tambahkan penanganan kesalahan dan umpan balik pengguna yang sesuai.
Uji secara menyeluruh di berbagai perangkat dan browser.
Perbarui dokumentasi untuk fitur baru apa pun.
Uji fungsionalitas unggah gambar dengan berbagai jenis dan ukuran file.
Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT.

MIT License

Copyright (c) 2023 PT. EMRAN GHANIM ASAHI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
Dukungan
Untuk dukungan teknis atau pertanyaan tentang proyek ini, silakan hubungi tim pengembangan kami atau buat issue di repositori.

Untuk pertanyaan bisnis, silakan hubungi PT. EMRAN GHANIM ASAHI secara langsung:

Email: sales@emranghanimasahi.net
Telepon: (021) 89088260
Kontak Langsung: Bapak Darmawan di 0813-9831-8839
Alamat: The Avenue Blok Z 06/36, Citra Raya, Cikupa, Tangerang
Catatan Perubahan (Changelog)
Versi 3.0.0 - Optimalisasi AI & Performa yang Ditingkatkan
✅ BARU: Pengenalan dan analisis gambar lengkap di Emran Chatbot
✅ DITINGKATKAN: Sistem saran dinamis canggih dengan kesadaran konteks
✅ DITINGKATKAN: Penanganan kesalahan komprehensif dan mekanisme umpan balik pengguna
✅ DIPERBARUI: Terjemahan lengkap untuk semua fitur terkait gambar di 5 bahasa
✅ DIPERBAIKI: Tautan layanan sekarang merutekan dengan benar menggunakan React Router
✅ DIOPTIMALKAN: Kinerja chatbot dengan integrasi AI yang ditingkatkan
✅ DITAMBAHKAN: Pemuatan malas (lazy loading) untuk semua gambar di bawah lipatan
✅ DITINGKATKAN: Optimalisasi pemuatan font dengan display: swap
✅ DITINGKATKAN: Konsistensi branding profesional di seluruh bagian
<!-- end list -->
