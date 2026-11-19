let keranjang = [];

function salam() {
    alert("Selamat datang di Bakso Mas Amar!");
    document.getElementById("menu").scrollIntoView();
}

// MENAMBAHKAN MENU KE KERANJANG
function pesan(nama, harga) {
    let item = keranjang.find(menu => menu.nama === nama);

    if (item) {
        item.jumlah++;
    } else {
        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });
    }

    tampilkanKeranjang();
    alert(nama + " berhasil ditambahkan ke keranjang!");
}

// MENAMPILKAN KERANJANG
function tampilkanKeranjang() {
    let daftar = document.getElementById("daftar-keranjang");
    let total = 0;

    if (keranjang.length === 0) {
        daftar.innerHTML = "<p>Keranjang masih kosong.</p>";
    } else {
        daftar.innerHTML = "";

        keranjang.forEach((item, index) => {
            let subtotal = item.harga * item.jumlah;
            total += subtotal;

            daftar.innerHTML += `
                <div class="item-keranjang">
                    <div>
                        <h3>${item.nama}</h3>
                        <p>Harga: Rp${item.harga.toLocaleString("id-ID")}</p>
                        <p>Subtotal: Rp${subtotal.toLocaleString("id-ID")}</p>
                    </div>

                    <div>
                        <button onclick="kurang(${index})">-</button>

                        <span class="jumlah">${item.jumlah}</span>

                        <button onclick="tambah(${index})">+</button>

                        <button onclick="hapusItem(${index})">
                            Hapus
                        </button>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById("total").innerHTML =
        "Total: Rp" + total.toLocaleString("id-ID");
}

// MENAMBAH JUMLAH
function tambah(index) {
    keranjang[index].jumlah++;
    tampilkanKeranjang();
}

// MENGURANGI JUMLAH
function kurang(index) {
    keranjang[index].jumlah--;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}

// MENGHAPUS ITEM
function hapusItem(index) {
    keranjang.splice(index, 1);
    tampilkanKeranjang();
}

function resetPesanan() {
    keranjang = [];
    tampilkanKeranjang();

    document.getElementById("hasil-pembayaran").innerHTML = "";

    alert("Keranjang berhasil dikosongkan!");
}

function checkout() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    document.getElementById("pembayaran").scrollIntoView({
        behavior: "smooth"
    });
}

function konfirmasiPembayaran() {
    let nama = document.getElementById("nama-pembeli").value;
    let nomor = document.getElementById("nomor-hp").value;
    let file = document.getElementById("bukti-transfer").files[0];

    if (keranjang.length === 0) {
        alert("Silakan pilih menu terlebih dahulu!");
        return;
    }

    if (nama === "" || nomor === "") {
        alert("Nama dan nomor HP harus diisi!");
        return;
    }

    if (!file) {
        alert("Silakan upload bukti transfer!");
        return;
    }

    let total = 0;
    let detail = "";

    keranjang.forEach(item => {
        let subtotal = item.harga * item.jumlah;
        total += subtotal;

        detail += `
            <p>${item.nama} x ${item.jumlah}
            = Rp${subtotal.toLocaleString("id-ID")}</p>
        `;
    });

    let gambar = URL.createObjectURL(file);

    document.getElementById("hasil-pembayaran").innerHTML = `
        <div class="bukti-pembayaran">
            <h2>Pesanan Berhasil Dibuat!</h2>

            <p><b>Nama:</b> ${nama}</p>
            <p><b>Nomor HP:</b> ${nomor}</p>

            <h3>Detail Pesanan</h3>
            ${detail}

            <h3>Total Pembayaran:
            Rp${total.toLocaleString("id-ID")}</h3>

            <h3>Bukti Transfer</h3>

            <img src="${gambar}" alt="Bukti Transfer">

            <p>Status: Menunggu Verifikasi</p>
        </div>
    `;

    alert("Bukti transfer berhasil diupload!");

    
}

// GANTI TEMA
function tema() {
    document.body.classList.toggle("dark");
}

// TAMPILKAN KERANJANG SAAT WEBSITE DIBUKA
tampilkanKeranjang();