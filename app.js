const express = require('express')
const app = express()
const port = 3000
const path = require('path')

let userToko = [
  {
    id: 1,
    username: "john_doe",
    foto_profil: "john_doe.jpg",
    nama_lengkap: "John Doe",
    password: "password123",
    email: "john@example.com",
    role: "admin"
  },
  {
    id: 2,
    username: "jane_smith",
    foto_profil: "jane_smith.jpg",
    nama_lengkap: "Jane Smith",
    password: "qwerty456",
    email: "jane@example.com",
    role: "customer"
  },
  {
    id: 3,
    username: "alex_brown",
    foto_profil: "alex_brown.jpg",
    nama_lengkap: "Alex Brown",
    password: "abc123xyz",
    email: "alex@example.com",
    role: "customer"
  },
  {
    id: 4,
    username: "emily_jones",
    foto_profil: "emily_jones.jpg",
    nama_lengkap: "Emily Jones",
    password: "pass1234",
    email: "emily@example.com",
    role: "customer"
  },
  {
    id: 5,
    username: "mike_williams",
    foto_profil: "mike_williams.jpg",
    nama_lengkap: "Mike Williams",
    password: "password789",
    email: "mike@example.com",
    role: "customer"
  }
];


let ProdukBaju = [
  {
    id_produk: 1,
    nama_produk: "Kemeja Denim Slim Fit",
    stok: 50,
    harga: 250000,
    deskripsi_barang: "Kemeja denim slim fit dengan desain modern.",
    gambar: "kemeja_denim_slim_fit.jpg",
  },
  {
    id_produk: 2,
    nama_produk: "Kaos Polos Basic",
    stok: 100,
    harga: 75000,
    deskripsi_barang: "Kaos polos dengan bahan katun berkualitas tinggi.",
    gambar: "kaos_polos_basic.jpg",
  },
  {
    id_produk: 3,
    nama_produk: "Jaket Parka Waterproof",
    stok: 30,
    harga: 500000,
    deskripsi_barang: "Jaket parka dengan lapisan waterproof untuk perlindungan maksimal dari cuaca.",
    gambar: "jaket_parka_waterproof.jpg",
  },
  {
    id_produk: 4,
    nama_produk: "Celana Jeans Slim Fit",
    stok: 40,
    harga: 300000,
    deskripsi_barang: "Celana jeans slim fit yang nyaman dipakai sehari-hari.",
    gambar: "celana_jeans_slim_fit.jpg",
  },
  {
    id_produk: 5,
    nama_produk: "Hoodie Fleeced Sweatshirt",
    stok: 20,
    harga: 200000,
    deskripsi_barang: "Hoodie fleeced sweatshirt dengan desain casual yang stylish.",
    gambar: "hoodie_fleeced_sweatshirt.jpg",
  }
];


// Routes

// Bagian Produk
// Get Produk
app.get('/produk', (req, res) => {

})

// Get Detail Produk
app.get('/produk/:id', (req, res) => {
  res.send('Ini Page Product') 
})


// Add Produk
app.post('/produk', (req, res) => {
  res.send('Ini Page Product') 
})


// edit produk
app.put('/produk', (req, res) => {
  res.send('Ini Page Product') 
})


// delete produk
app.delete('/produk', (req, res) => {
  res.send('Ini Page Product') 
})



// Bagian User


// Untuk Koneksiin ke localhost:3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})