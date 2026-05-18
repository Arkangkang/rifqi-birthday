/*
 * ═══════════════════════════════════════════════════════════
 *  CARA MENAMBAHKAN FOTO KE GALERI
 * ═══════════════════════════════════════════════════════════
 *
 *  LANGKAH 1:
 *    Copy/paste foto-foto kamu ke folder: public/photos/
 *    Nama file bebas, tapi gunakan huruf kecil, tanpa spasi.
 *    Contoh: foto1.jpg, kenangan-ulang-tahun.jpg, dll.
 *
 *  LANGKAH 2:
 *    Edit array `photos` di bawah ini.
 *    Ganti "src" dengan nama file foto kamu.
 *    Ganti "caption" dengan keterangan foto.
 *    Kamu bisa menambah atau mengurangi objek {} sesuai kebutuhan.
 *
 *  FORMAT FOTO:
 *    - Format yang didukung: .jpg, .jpeg, .png, .webp, .gif
 *    - Resolusi disarankan: minimal 400x400 px
 *    - Ukuran file: usahakan di bawah 2MB per foto agar loading cepat
 *
 * ═══════════════════════════════════════════════════════════
 */

export const photos = [
  {
    id: 1,
    src: '/photos/foto1.jpeg',
    caption: 'Kenangan waktu kamu kecil 💜',
    // Ganti dengan nama file fotomu dan keterangan yang kamu mau
  },
  {
    id: 2,
    src: '/photos/foto2.jpeg',
    caption: 'Momen spesial yang tidak terlupakan',
  },
  {
    id: 3,
    src: '/photos/foto3.jpeg',
    caption: 'Bermain bersama keluarga',
  },
  {
    id: 4,
    src: '/photos/foto4.jpeg',
    caption: 'Tumbuh menjadi pemuda yang luar biasa',
  },
  {
    id: 5,
    src: '/photos/foto5.jpeg',
    caption: 'Setiap momen bersamamu adalah anugerah',
  },
  {
    id: 6,
    src: '/photos/foto6.jpeg',
    caption: 'Kenangan yang selalu di hati Mama',
  },
  // Tambahkan lebih banyak foto di sini jika perlu:
  // {
  //   id: 7,
  //   src: '/photos/foto7.jpg',
  //   caption: 'Keterangan foto 7',
  // },
]
