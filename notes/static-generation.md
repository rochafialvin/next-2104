(SSR) Static Site Generation
Pada proses buld di local machine. getStaticProps akan mensuplai data ke komponen.
Setelah komponen mendapatkan data, maka akan diproses datanya. Sehingga komponen sudah memiliki "isi" dan kemudian disimpan ke folder .next

Setiap kali ada perubahan susunan komponen, atau perubahan data. Maka harus di build ulang.
Cara ini efektif untuk menangani halaman yang cenderung jarang berubah, contoh halaman contact us, about us.
