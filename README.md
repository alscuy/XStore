# XStore

Aplikasi E-Commerce sederhana yang dibuat dengan React. Pengguna bisa melihat daftar produk, membuka detail produk, menambahkannya ke keranjang, lalu checkout.

Project ini dibuat untuk challenge **Materi 2: Routing React**.

## Fitur

- **Home**: halaman beranda dengan pilihan produk dan tombol menuju katalog.
- **Products**: daftar produk dengan filter kategori, tombol detail, dan tombol tambah ke keranjang.
- **Product Detail**: halaman detail per produk (nama, harga, gambar, deskripsi) lewat dynamic route `/products/:id`.
- **Cart**: daftar item di keranjang, ubah jumlah, hapus item, total pembayaran, dan checkout.
- **Navbar**: navigasi ke Home, Products, dan Cart, dengan badge jumlah item di keranjang.

## Teknologi

- [React](https://react.dev) + TypeScript
- [Vite](https://vite.dev)
- [React Router](https://reactrouter.com) untuk routing
- [Tailwind CSS](https://tailwindcss.com) untuk styling
- [ShadCN UI](https://ui.shadcn.com) untuk komponen `Button`
- [Lucide React](https://lucide.dev) untuk ikon

## Cara Menjalankan

Pastikan Node.js sudah terpasang.

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev
```

Buka `http://localhost:5173` di browser.

Perintah lain:

```bash
npm run build     # build untuk produksi
npm run preview   # lihat hasil build secara lokal
```

## Daftar Route

| Path | Halaman |
|---|---|
| `/` | Home |
| `/products` | Daftar produk |
| `/products/:id` | Detail produk berdasarkan ID |
| `/cart` | Keranjang belanja |

## Struktur Folder

```
src/
├── components/
│   ├── ui/
│   │   └── button.tsx        # ShadCN Button
│   ├── Navbar.tsx
│   └── QuantityControl.tsx
├── data/
│   └── products.ts           # data produk
├── pages/
│   ├── Home.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   └── Cart.tsx
├── types.ts                  # tipe CartState
├── App.tsx                   # daftar route dan state keranjang
├── main.tsx
└── index.css                 # Tailwind dan theme
```

## Font

Judul memakai [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque). Tambahkan di bagian atas `src/index.css`:

```css
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700;800&display=swap");
```

## Checklist Challenge

- [x] Project baru dengan React
- [x] Halaman Home, Products, dan Cart
- [x] React Router untuk navigasi antarhalaman
- [x] Dynamic route untuk Product Detail berdasarkan ID
- [x] Detail produk: nama, harga, gambar, deskripsi
- [x] Tailwind CSS untuk header, navigasi, dan card produk
- [x] ShadCN UI Button untuk tombol interaksi
- [x] Navigasi Home, Products, dan Cart

## Catatan Pengembangan

- State keranjang disimpan di `App.tsx` dalam bentuk objek `{ [idProduk]: jumlah }` dan diteruskan ke halaman lewat props.
- Data keranjang tidak disimpan permanen, jadi akan kosong lagi setelah halaman di-refresh.