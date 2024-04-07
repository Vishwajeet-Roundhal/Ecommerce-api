require("dotenv").config()
const express = require('express');
const app = express();
const PORT = 3005; 
const cors = require('cors');
const connectDB = require("../basic api/utils/db")
const productRoute = require("./routes/product-router")
const authRoute = require("./routes/auth")
const adminRoute  = require("./routes/admin-route")

app.use(cors())
app.use(cors({
  origin: 'http://localhost:3000', // Change this to your React app's origin
}));
app.use(express.json())

// Sample data
const products = [
  {
    "id": "abc",
    "name": "iphone x",
    "company": "apple",
    "price": 6000000,
    "colors": ["#ff0000", "#000000", "#CDD0D0"],
    "image": "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "The mobile is compact with its 6.2-inch OLED screen and far lighter at 168g. It perfectly captures the design, looks, and feel of the expensive one. It comes with a snapdragon processor with a 5n chip in it. It has a 200mp camera in the rear 100mp in front perfect for selfie lovers. It also support HDR content means you can watch 4K content on it.",
    "category": "mobile",
    "featured": true
  },
  {
    "id": "hghg",
    "name": "samsung s20",
    "company": "samsung",
    "price": 5000000,
    "colors": ["#000", "#22D3EF"],
    "image": "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "The mobile is compact with its 6.2-inch OLED screen and far lighter at 168g. It perfectly captures the design, looks, and feel of the expensive one. It comes with a snapdragon processor with a 5n chip in it. It has a 200mp camera in the rear 100mp in front perfect for selfie lovers. It also support HDR content means you can watch 4K content on it.",
    "category": "mobile",
    "shipping": true
  },
  {
    "id": "tht",
    "name": "Dell Series",
    "company": "dell",
    "price": 600000,
    "colors": ["#22D3EF", "#CDD0D0"],
    "image": "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "The Laptop is compact with its 6.2-inch OLED screen and far lighter at 168g. It perfectly captures the design, looks, and feel of the expensive one. It comes with a snapdragon processor with a 5n chip in it. It has a 200mp camera in the rear 100mp in front perfect for selfie lovers. It also support HDR content means you can watch 4K content on it.",
    "category": "laptop"
  },
  {
    "id": "dfg",
    "name": "Google Pixel 5",
    "company": "Google",
    "price": 5500000,
    "colors": ["#000000", "#00FF00", "#CDD0D0"],
    "image": "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "The Google Pixel 5 is a compact and lightweight phone with a 6-inch OLED display. Powered by a Snapdragon processor, it offers a smooth user experience. The phone features a 12MP dual-pixel camera system capable of capturing stunning photos and 4K videos. With its sleek design and vibrant display, the Google Pixel 5 is perfect for everyday use.",
    "category": "mobile"
  },
  {
    "id": "kjl",
    "name": "HP Pavilion",
    "company": "HP",
    "price": 700000,
    "colors": ["#0000FF", "#FFFFFF"],
    "image": "https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "The HP Pavilion is a powerful and versatile laptop designed for productivity and entertainment. Equipped with a 15.6-inch Full HD display, it delivers crisp visuals and immersive viewing experiences. With its Intel Core i5 processor and 8GB of RAM, the HP Pavilion can handle multitasking with ease. Whether you're working on documents, streaming videos, or playing games, this laptop ensures smooth performance.",
    "category": "laptop"
  },
  {
    "id": "mnb",
    "name": "Sony PlayStation 5",
    "company": "Sony",
    "price": 7000000,
    "colors": ["#000000", "#FFFFFF"],
    "image": "https://images.pexels.com/photos/13189272/pexels-photo-13189272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "Experience the next generation of gaming with the Sony PlayStation 5. Featuring cutting-edge technology and powerful hardware, this console delivers stunning graphics and immersive gameplay. With lightning-fast load times and adaptive triggers, every gaming session is more responsive and dynamic. Whether you're playing solo or competing online, the Sony PlayStation 5 offers an unparalleled gaming experience.",
    "category": "gaming"
  },
  {
    "id": "qwe",
    "name": "MacBook Air",
    "company": "Apple",
    "price": 1200000,
    "colors": ["#808080", "#FFFFFF"],
    "image": "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "The MacBook Air is thin, light, and powerful, making it the perfect laptop for everyday use. With its Retina display and True Tone technology, it delivers vibrant colors and sharp details. Powered by the Apple M1 chip, it offers blazing-fast performance and long battery life. Whether you're browsing the web, editing photos, or watching movies, the MacBook Air handles everything with ease.",
    "category": "laptop"
  },
  {
    "id": "zxc",
    "name": "Microsoft Surface Pro 7",
    "company": "Microsoft",
    "price": 900000,
    "colors": ["#000000", "#FFFFFF", "#0000FF"],
    "image": "https://images.pexels.com/photos/10170363/pexels-photo-10170363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "The Microsoft Surface Pro 7 is a versatile 2-in-1 laptop that adapts to your needs. Whether you're working on documents, sketching ideas, or watching movies, this device offers the flexibility to do it all. With its vibrant PixelSense display and powerful Intel Core processor, it delivers stunning visuals and smooth performance. Plus, with up to 10.5 hours of battery life, you can stay productive all day long.",
    "category": "laptop"
  },
  {
    "id": "vbn",
    "name": "LG OLED TV",
    "company": "LG",
    "price": 3500000,
    "colors": ["#000000"],
    "image": "https://images.pexels.com/photos/15467758/pexels-photo-15467758/free-photo-of-close-up-of-woman-scanning-a-qr-code-from-a-tv-screen-with-her-smartphone.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "Experience cinematic entertainment at home with the LG OLED TV. Featuring a stunning OLED display, it delivers perfect blacks, vibrant colors, and incredible contrast. With support for Dolby Vision and Dolby Atmos, you'll enjoy immersive audio and visual experiences. Plus, with LG's webOS platform, you can access your favorite streaming apps and content with ease.",
    "category": "tv"
  },
  {
    "id": "poi",
    "name": "Canon EOS R5",
    "company": "Canon",
    "price": 4500000,
    "colors": ["#000000", "#FFFFFF"],
    "image": "https://images.pexels.com/photos/1205022/pexels-photo-1205022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "description": "Capture stunning photos and videos with the Canon EOS R5. Equipped with a high-resolution sensor and advanced autofocus system, it delivers professional-quality results in any situation. Whether you're shooting portraits, landscapes, or action scenes, this camera offers precision and clarity. Plus, with 8K video recording capabilities, you can create cinematic masterpieces with ease.",
    "category": "camera"
  }
];

// Route to get all products

// Route to register a new user
// Route to get a product by ID
// app.get('/api/products/:id', (req, res) => {
//   const productId = req.params.id;
//   const product = products.find(p => p.id === productId);
//   if (product) {
//     res.json(product);
//   } else {
//     res.status(404).json({ message: 'Product not found' });
//   }
// });



app.use("/api/data",productRoute)
app.use("/api/auth",authRoute)
app.use("/api/admin",adminRoute)


// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Route to add a new produc

// Start the server
connectDB().then(()=>{
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error,"database error");
  }
})
