const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fileUpload = require('express-fileupload')
const joi = require('joi')
const fs = require('fs')
let cors = require('cors')

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())

let userToko = [
  {
    id: 1,
    username: "john_doe",
    foto_profil: "/images/john_doe.jpg",
    nama_lengkap: "John Doe",
    password: "password123",
    email: "john@example.com",
    role: "admin"
  },
  {
    id: 2,
    username: "jane_smith",
    foto_profil: "/images/jane_smith.jpg",
    nama_lengkap: "Jane Smith",
    password: "qwerty456",
    email: "jane@example.com",
    role: "customer"
  },
  {
    id: 3,
    username: "alex_brown",
    foto_profil: "/images/alex_brown.jpg",
    nama_lengkap: "Alex Brown",
    password: "abc123xyz",
    email: "alex@example.com",
    role: "customer"
  },
  {
    id: 4,
    username: "emily_jones",
    foto_profil: "/images/emily_jones.jpg",
    nama_lengkap: "Emily Jones",
    password: "pass1234",
    email: "emily@example.com",
    role: "customer"
  },
  {
    id: 5,
    username: "mike_williams",
    foto_profil: "/images/mike_williams.jpg",
    nama_lengkap: "Mike Williams",
    password: "password789",
    email: "mike@example.com",
    role: "customer"
  }
];


let ProdukBaju = [
  {
    id: 1,
    nama: "Kemeja Denim Slim Fit",
    stok: 50,
    harga: 250000,
    desc: "Kemeja denim slim fit dengan desain modern.",
    gambar: "/images/Kemeja_Denim_Slim_Fit.jpg",
  },
  {
    id: 2,
    nama: "Kaos Polos Basic",
    stok: 100,
    harga: 75000,
    desc: "Kaos polos dengan bahan katun berkualitas tinggi.",
    gambar: "/images/Kaos_Polos_Basic.jpg",
  },
  {
    id: 3,
    nama: "Jaket Parka Waterproof",
    stok: 30,
    harga: 500000,
    desc: "Jaket parka dengan lapisan waterproof untuk perlindungan maksimal dari cuaca.",
    gambar: "/images/Jaket_Parka_Waterproof.jpg",
  },
  {
    id: 4,
    nama: "Celana Jeans Slim Fit",
    stok: 40,
    harga: 300000,
    desc: "Celana jeans slim fit yang nyaman dipakai sehari-hari.",
    gambar: "/images/Celana_Jeans_Slim_Fit.jpg",
  },
  {
    id: 5,
    nama: "Hoodie Fleeced Sweatshirt",
    stok: 20,
    harga: 200000,
    desc: "Hoodie fleeced sweatshirt dengan desain casual yang stylish.",
    gambar: "/images/Hoodie_Fleeced_Sweatshirt.jpg",
  }
];


// Routes

// Bagian Produk
// Get Produk
const validateProduct = (product) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    desc: joi.string().min(3).required(),
    stok: joi.number().required(),
    harga: joi.number().required(),
  })

  return schema.validate(product)
}


app.get('/', (req, res) => {
  res.send('Test Toko Baju, Koneksi Berhasil')
})

app.get('/produk', (req, res) => {
  // Ambil query atau data dari url /produk?name=
  const name = req.query.name
  
  if(name) {
    const produk = ProdukBaju.find(item => item.nama.toLowerCase() === name.toLowerCase());

    if (!produk){
      return res.status(404).json({
        messages : "Data Not Found"
      })
    }

    return res.status(200).json({
      messages: "Success Get Detail Data",
      data: produk
    })
  }

  res.status(200).json({
    messages: "Success Get All Data Produk",
    data: ProdukBaju
  })
})

// Get Detail Produk
app.get('/produk/:id', (req, res) => {
  const id = req.params.id

  const produk = ProdukBaju.find(produk => produk.id == id)

  if(!produk){
    res.status(404).json({
      messages : "Data Not Found"
    })
  }

  res.status(200).json({
    messages : "Get Detailed Product",
    data : produk
  })
})




// Add Produk atau Tambah Produk
app.post('/produk', (req, res) => {
  const {name, desc, harga, stok} = req.body

  const id = ProdukBaju.length + 1;

  const {error} = validateProduct(req.body)

  if(error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  if (!req.files.image) {
    return res.status(400).json({
      messages: "Image is required"
    });
  }

  const image = req.files.image

  
  // const filename = `${name}.jpg`
  const filename = `${name.replace(/\s/g, '_')}.jpg`;
  
  image.mv(path.join(__dirname, 'public/images', filename))

  const newProduct = {
    id,
    name,
    stok,
    harga,
    desc,
    gambar:  `/images/${filename}`,
  }

  console.log(newProduct)

  ProdukBaju.push(newProduct)

  res.status(201).json({
    messages: "Success Add Data",
    data: newProduct
  })
})


// edit produk
app.put('/produk/:id', (req, res) => {
  const id = req.params.id
  const {name, desc, harga, stok} = req.body

  const {error} = validateProduct(req.body)

  if(error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  const product = ProdukBaju.find(product => product.id == id)

  if(!product) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const fileNameOld = `${product.nama}.jpg`
  product.nama = name
  product.desc = desc
  product.harga = harga
  product.stok = stok

  const image = req.files.image

  if(image) {
    try{
      fs.unlinkSync(path.join(__dirname, 'public/images', fileNameOld))
    }catch(err) {
      console.log(err)
    }
    // const filename = `${name}.jpg`
    const filename = `${name.replace(/\s/g, '_')}.jpg`;
    // image.mv(path.join(__dirname, 'public/images', filename))
    console.log(image.mv(path.join(__dirname, 'public/images', filename)))
    product.gambar = `/images/${filename}`
    
  }

  

  res.status(200).json({
    messages: "Success Update Data",
    data: product
  })
})


// delete produk
app.delete('/produk/:id', (req, res) => {
  const id = req.params.id

  const product = ProdukBaju.find(product => product.id == id)

  if(!product) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const index = ProdukBaju.indexOf(product)
  ProdukBaju.splice(index, 1)

  res.status(200).json({
    messages: "Success Delete Data",
    data: product
  })
})

app.get('/gambar', (req, res) => {
  // Mengirim file gambar ke client
  res.sendFile(path.join(__dirname, 'public/images', 'tank.jpg'));
});

// Bagian User

const validateUser = (user) => {
  const schema = joi.object({
    nama_lengkap: joi.string().min(3).required(),
    username: joi.string().min(3).required(),
    password: joi.string().required(),
    email: joi.string().required(),
    role: joi.string().required(),
  })

  return schema.validate(user)
}


// Get Data User
app.get('/user', (req, res) => {

  const username = req.query.username
  
  if(username) {
    const user = userToko.find(item => item.username.toLowerCase() === username.toLowerCase());

    if (!username){
      return res.status(404).json({
        messages : "Data Not Found"
      })
    }

    return res.status(200).json({
      messages: "Success Get Detail Data",
      data: user
    })
  }

  res.status(200).json({
    messages: "Success Get All Data User",
    data: userToko
  })
})

app.get('/user/:id', (req, res) => {
  const id = req.params.id
  const user = userToko.find(user => user.id == id)

  if(!user){
    res.status(404).json({
      messages : "Data Not Found"
    })
  }

  res.status(200).json({
    messages : "Get Detailed Product",
    data : user
  })
  
})


app.post('/user', (req, res) => {
  const id = userToko.length + 1
  const {username, nama_lengkap, password, email, role} = req.body

  const {error} = validateUser(req.body)

  if(error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  const image = req.files.foto_profil
  const filename = `${username}.jpg`

  image.mv(path.join(__dirname, 'public/images', filename))

  const newUser = {
    id,
    nama_lengkap,
    username,
    password,
    email,
    role,
    foto_profil:  `public/images/${filename}`,
  }

  console.log(newUser)

  userToko.push(newUser)

  res.status(201).json({
    messages: "Success Add Data",
    data: newUser
  })
})



// edit user
app.put('/user/:id', (req, res) => {
  const id = req.params.id
  const {username, nama_lengkap, email, password, role} = req.body

  const {error} = validateUser(req.body)

  if(error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  const user = userToko.find(user => user.id == id)

  if(!user) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const fileNameOld = `${user.foto_profil}.jpg`
  user.username = username
  user.nama_lengkap = nama_lengkap
  user.email = email
  user.role = role
  user.password = password

  const image = req.files.image

  if(image) {
    try{
      fs.unlinkSync(path.join(__dirname, 'public/images', fileNameOld))
    }catch(err) {
      console.log(err)
    }
    // const filename = `${name}.jpg`
    const filename = `${username.replace(/\s/g, '_')}.jpg`;
    // image.mv(path.join(__dirname, 'public/images', filename))
    console.log(image.mv(path.join(__dirname, 'public/images', filename)))
    user.gambar = `/images/${filename}`
    
  }

  

  res.status(200).json({
    messages: "Success Update Data",
    data: user
  })
})


// delete user
app.delete('/user/:id', (req, res) => {
  const id = req.params.id

  const user = userToko.find(data => data.id == id)

  if(!user) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const index = userToko.indexOf(user)
  userToko.splice(index, 1)

  res.status(200).json({
    messages: "Success Delete Data",
    data: user
  })
})






// Untuk Koneksiin ke localhost:3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})