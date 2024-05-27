const User = require("../models/userSchema");// Mengimpor model User yang akan digunakan untuk operasi database
const ImageDetails = require("../imageDetails");
const upload = require("../uploadConfig");

// Fungsi untuk menambahkan pengguna baru
async function addUser(req, res) {
    const { email, username, password } = req.body; // Mendapatkan data pengguna dari request
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Mengatur path image

    const user = new User({ email, username, password, image }); // Membuat objek pengguna baru berdasarkan data yang diterima

    try {
        // Menyimpan pengguna baru ke dalam database
        await user.save();

        // Jika ada gambar yang di-upload, simpan informasi gambar ke koleksi ImageDetails
        if (image) {
            const imageDetails = new ImageDetails({ image });
            await imageDetails.save();
        }

        // Mengirim respons berhasil dengan data pengguna yang ditambahkan
        res.status(201).json({ message: "Data pengguna berhasil ditambahkan", data: user });
    } 
    catch (err) {
        // Mengirim respons kesalahan jika terjadi kesalahan saat menambahkan pengguna
        res.status(500).send(err);
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        // Cari pengguna berdasarkan username
        const user = await User.findOne({ username });

        // Jika pengguna tidak ditemukan
        if (!user) {
        return res.status(404).json({ message: 'Username tidak ditemukan' });
        }

        // Verifikasi password
        if (user.password !== password) {
        return res.status(401).json({ message: 'Password salah' });
        }

        // Jika login berhasil, kirim respons sukses
        res.status(200).json({ message: 'Login berhasil', data: user });
    } catch (error) {
        // Tangani kesalahan server
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat login', error: error.message });
    }
}

async function updateUser(req, res) {
    const { username } = req.params; 
    const { password } = req.body; 

    try {
        const user = await User.findOneAndUpdate({ username }, { password }, { new: true })

        if (user) {
            res.status(200).json({ message: "Berhasil memperbarui kata sandi pengguna", data: user });
        } else {
            res.status(404).json({ message: "Gagal memperbarui kata sandi pengguna" });
        }
    } catch (err) {
        // Mengirim respons kesalahan jika terjadi kesalahan saat memperbarui pengguna
        res.status(500).send(err);
    }
}

// Mengekspor semua fungsi agar dapat digunakan di file lain
module.exports = {
    loginUser,
    addUser,
    updateUser,
}