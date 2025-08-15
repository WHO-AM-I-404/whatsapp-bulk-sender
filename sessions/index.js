const fs = require('fs').promises;
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Konfigurasi
const CONFIG_DIR = path.join(__dirname, 'config');
const SESSIONS_DIR = path.join(__dirname, 'sessions');
const CONTACTS_FILE = path.join(CONFIG_DIR, 'contacts.txt');
const MESSAGE_FILE = path.join(CONFIG_DIR, 'message.txt');

// Pastikan direktori session ada
if (!fs.existsSync(SESSIONS_DIR)) {
  fs.mkdirSync(SESSIONS_DIR, { recursive: true });
}

// Inisialisasi klien WhatsApp
const client = new Client({
  authStrategy: new LocalAuth({ dataPath: SESSIONS_DIR }),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

// Tangani QR Code
client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  console.log('Scan QR code di atas dengan WhatsApp Anda');
});

// Ketika klien siap
client.on('ready', async () => {
  console.log('Klien siap!');
  
  try {
    // Baca file kontak dan pesan
    const contacts = await readContacts();
    const message = await fs.readFile(MESSAGE_FILE, 'utf-8');
    
    console.log(`\nMengirim ke ${contacts.length} nomor...`);
    
    // Kirim pesan dengan interval
    for (const [index, number] of contacts.entries()) {
      try {
        await sendMessage(number, message);
        console.log(`[${index + 1}/${contacts.length}] Terkirim ke: ${number}`);
        
        // Jeda antar pengiriman (dalam milidetik)
        await delay(15000); // 15 detik
      } catch (error) {
        console.error(`Gagal ke ${number}: ${error.message}`);
      }
    }
    
    console.log('\n Semua pesan berhasil dikirim!');
    process.exit(0);
  } catch (error) {
    console.error(' Error utama:', error);
    process.exit(1);
  }
});

// Fungsi baca kontak
async function readContacts() {
  const data = await fs.readFile(CONTACTS_FILE, 'utf-8');
  return data
    .split('\n')
    .map(num => num.trim().replace(/[^0-9]/g, ''))
    .filter(num => num.length > 8);
}

// Fungsi kirim pesan
async function sendMessage(number, message) {
  const chatId = `${number}@c.us`;
  await client.sendMessage(chatId, message);
}

// Fungsi delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Mulai klien
client.initialize();
