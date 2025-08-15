# WhatsApp Bulk Sender

Program untuk mengirim pesan ke banyak nomor WhatsApp sekaligus menggunakan Node.js dan WhatsApp Web, dioptimalkan untuk Termux (Android).

## Fitur Utama

* Kirim pesan ke ratusan nomor sekaligus
* Kontrol penuh waktu pengiriman
* Session lokal (tidak perlu scan QR setiap kali)
* Jeda antar pengiriman yang bisa dikonfigurasi
* Logging detail
* Anti-banned system (dengan jeda waktu)

## Prasyarat

1. Termux (dapat diunduh dari Play Store atau F-Droid)
2. Akun WhatsApp yang sudah aktif
3. Koneksi internet stabil

## Instalasi di Termux

```bash
# Update paket
pkg update && pkg upgrade

# Install dependensi
pkg install nodejs git ffmpeg -y

# Clone repositori
git clone https://github.com/WHO-AM-I-404/whatsapp-bulk-sender.git

# Masuk direktori
cd whatsapp-bulk-sender

# Install dependencies
npm install
```

## Konfigurasi

### 1. Menyiapkan Daftar Kontak

Edit file `config/contacts.txt`:

```
6281234567890
```

* Satu nomor per baris
* Gunakan kode negara (contoh: 62 untuk Indonesia)
* Tanpa spasi atau karakter khusus

### 2. Menyiapkan Pesan

Edit file `config/message.txt`:

```
Halo {nama}!

Ini adalah pesan bisnis dari perusahaan kami.
Produk terbaru kami akan launching bulan depan.

Regards,
Tim Marketing
```

## Penggunaan

```bash
# Jalankan program
npm start
```

1. Scan QR code yang muncul dengan WhatsApp Anda
2. Program akan otomatis mengirim pesan ke semua nomor di `contacts.txt`

## Mekanisme Pengiriman

* Program membaca semua nomor di `contacts.txt`
* Mengambil konten pesan dari `message.txt`
* Mengirim ke setiap nomor secara berurutan
* Jeda default: 15 detik antar pengiriman (bisa diubah di `index.js`)

## Struktur Direktori

* `config/` : Berisi kontak dan pesan
* `sessions/` : Menyimpan session WhatsApp
* `index.js` : Kode utama
* `package.json` : Dependensi Node.js

## FAQ

**Q:** Mengapa ada jeda 15 detik antar pengiriman?
**A:** Untuk menghindari deteksi spam oleh WhatsApp

**Q:** Bagaimana cara mengganti jeda waktu?
**A:** Edit nilai `delay(15000)` di `index.js` (dalam milidetik)

**Q:** Apakah nomor harus menyimpan kontak pengirim?
**A:** Tidak, program bekerja tanpa perlu saling menyimpan kontak

## Troubleshooting

* **QR Code Tidak Muncul:**

  * Pastikan tidak ada session lama di folder `sessions/`
  * Hapus folder `sessions` dan coba lagi
* **Pesan Gagal Terkirim:**

  * Pastikan nomor valid dan berformat internasional
  * Cek koneksi internet
  * Pastikan akun WhatsApp tidak dalam status banned
* **Error Session:**

```bash
rm -rf sessions/
```

## Etika Penggunaan

* HANYA untuk keperluan bisnis yang sah
* Hormati privasi penerima
* Ikuti peraturan WhatsApp Commercial Policy
* Jangan digunakan untuk spam

## Kontribusi

Pull request dipersilakan! Pastikan mengikuti:

1. Fork repositori
2. Buat branch fitur
3. Commit perubahan
4. Push ke branch
5. Buat pull request

## Lisensi

Proyek ini dilisensikan di bawah MIT License

## Cara Penggunaan di Termux

1. Simpan semua file dalam struktur di atas
2. Edit `config/contacts.txt` dengan nomor tujuan
3. Edit `config/message.txt` dengan pesan yang ingin dikirim
4. Jalankan:

```bash
npm install
npm start
```

5. Scan QR code dengan WhatsApp Anda
6. Program akan mulai mengirim pesan ke semua nomor

## Fitur Keamanan

* Jeda waktu 15 detik antar pengiriman (bisa disesuaikan)
* Format nomor otomatis
* Session disimpan lokal
* Error handling untuk setiap pengiriman

## Catatan Penting

* Pastikan menggunakan akun WhatsApp yang aktif
* Jangan mengirim lebih dari 100 pesan/jam untuk menghindari banned
* Semua data session disimpan lokal di perangkat Anda
* Program ini tidak menggunakan API resmi WhatsApp
* Program ini telah dioptimalkan untuk Termux dan bisnis kecil menengah dengan kebutuhan pengiriman pesan massal yang terkontrol.
