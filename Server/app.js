// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const authRoutes = require('./routes/auth');
// const uuid = require('uuid'); 

// const app = express();

// // Middleware
// app.use(cors({
//   // origin: [' http://localhost:5173', 'http://localhost:3000','https://merabestie-orpin.vercel.app','https://merabestie-khaki.vercel.app','https://merabestie.com','https://e-commereapp-assignment.vercel.app'], // Frontend URLs

//   origin: ['http://localhost:3001'], // Frontend URLs
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));

// app.use(express.json());
// app.use(require('cookie-parser')());

// app.use(
//   session({
//     secret: "a57cb2f7c4a1ef3a8a3c6a5bf213d998812de8fc7bb47da8b7347a92f9ec48d9",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       //mongoUrl: "mongodb+srv://divamadd6394:9T5NEotQSO1F9PYK@cluster0.d1czi.mongodb.net/Chatter?retryWrites=true&w=majority&appName=Cluster0",
//      mongoUrl: process.env.MONGODB_URI,

//       collectionName: 'sessions',
//     }),
//     cookie: {
//       secure: false,
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000, // 1 day
//     },
//   })
// );

// // Routes
// app.use('/auth', authRoutes);

// // MongoDB Connection
//  //const uri = "mongodb+srv://ecommerce:ecommerce@ecommerce.dunf0.mongodb.net/";
// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Product Schema
// const productSchema = new mongoose.Schema({
//   name: String,
//   price: String,
//   img: String,
//   category: String,
//   rating: Number,
//   productId: { type: String, unique: true }, // Added productId field
//   inStockValue: Number, // Available stock value
//   soldStockValue: Number, // Number of items sold
//   visibility: { type: String, default: 'on' } // Visibility field with default 'on'
// });

// const Product = mongoose.model('Product', productSchema);

// // Keep-Alive Route
// app.get('/keep-alive', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is up and running'
//   });
// });

// // Create Product Route
// app.post('/create-product', async (req, res) => {
//   try {
//     const productData = req.body;
//     const product = new Product(productData);
//     const result = await product.save();
    
//     res.status(201).json({
//       success: true,
//       message: 'Product created successfully',
//       product: result
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error creating product',
//       error: error.message
//     });
//   }
// });

// // Get All Products Route
// app.get('/get-product', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json({
//       success: true,
//       products
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching products',
//       error: error.message
//     });
//   }
// });

// // Update Product Visibility Route
// app.put('/update-visibility', async (req, res) => {
//   try {
//     const { productId, visibility } = req.body;

//     // Find and update the product, creating visibility field if it doesn't exist
//     const updatedProduct = await Product.findOneAndUpdate(
//       { productId: productId },
//       { $set: { visibility: visibility } },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Product visibility updated successfully',
//       product: updatedProduct
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error updating product visibility',
//       error: error.message
//     });
//   }
// });

// // Get Product by ID Route
// app.get('/product/:productId', async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const product = await Product.findById(productId);
    
//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       product
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false, 
//       message: 'Error fetching product',
//       error: error.message
//     });
//   }
// });

// // Update Stock Status Route
// app.post('/instock-update', async (req, res) => {
//   try {
//     const { productId, inStockValue, soldStockValue } = req.body;

//     // Find and update the product
//     const updatedProduct = await Product.findOneAndUpdate(
//       { productId: productId },
//       {
//         $set: {
//           inStockValue: inStockValue,
//           soldStockValue: soldStockValue
//         }
//       },
//       { new: true, upsert: false }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Stock status updated successfully',
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error updating stock status',
//       error: error.message
//     });
//   }
// });

// // Complaints Schema
// const complaintsSchema = new mongoose.Schema({
//   complaintNumber: String,
//   name: String,
//   email: String,
//   message: String,
//   userType: String,
//   status: {
//     type: String,
//     default: 'Pending'
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Complaint = mongoose.model('Complaint', complaintsSchema);

// // Configure nodemailer
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'pecommerce8@gmail.com',
//     pass: 'rqrdabxuzpaecigz'
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// // Function to send confirmation email
// const sendConfirmationEmail = async (email, complaintNumber, message) => {
//   try {
//     const mailOptions = {
//       from: '"Mera Bestie" <pecommerce8@gmail.com>',
//       to: email,
//       subject: 'Complaint Registration Confirmation',
//       html: `
//         <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px; background-color: #ffffff;">
//           <!-- Stylish Header -->
//           <div style="background-color: #ffb6c1; padding: 15px; border-radius: 10px 10px 0 0; text-align: center;">
//             <h1 style="font-family: 'Brush Script MT', cursive; color: #ffffff; font-size: 36px; margin: 0;">Mera Bestie</h1>
//           </div>
          
//           <!-- Main Content -->
//           <div style="padding: 20px;">
//             <h2 style="color: #2c3e50; margin-top: 0;">Complaint Registration Confirmation</h2>
//             <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
//               <p style="margin: 10px 0;"><strong>Complaint ID:</strong> ${complaintNumber}</p>
//               <p style="margin: 10px 0;"><strong>Issue Description:</strong></p>
//               <p style="margin: 10px 0; font-style: italic; color: #555;">${message}</p>
//             </div>
//             <p style="color: #7f8c8d; font-size: 16px; line-height: 1.5;">
//               Thank you for reaching out to us! Our experienced specialists are already working on resolving your issue. You can expect a detailed reply to your query within 24 hours. We appreciate your patience and understanding.
//             </p>
//           </div>
          
//           <!-- Footer -->
//           <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
//             <p style="color: #95a5a6; font-size: 12px; line-height: 1.4;">
//               This is an automated email. Please do not reply to this message.<br>
//               If you have any additional questions, feel free to contact our support team.
//             </p>
//           </div>
//         </div>
//       `,
//       text: `
//         Mera Bestie

//         Complaint Registration Confirmation

//         Complaint ID: ${complaintNumber}

//         Issue Description:
//         ${message}

//         Thank you for reaching out to us! Our experienced specialists are already working on resolving your issue. You can expect a detailed reply to your query within 24 hours. We appreciate your patience and understanding.

//         This is an automated email. Please do not reply to this message.
//         If you have any additional questions, feel free to contact our support team.
//       `
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('Confirmation email sent successfully:', info.response);
//     return info;
//   } catch (error) {
//     console.error('Error sending confirmation email:', error);
//     throw error;
//   }
// };

// // Post Complaint Route
// app.post('/post-complaints', async (req, res) => {
//   try {
//     const { name, email, message, userType } = req.body;

//     // Generate 6 digit random complaint number
//     const complaintNumber = Math.floor(100000 + Math.random() * 900000).toString();

//     const complaintData = {
//       complaintNumber,
//       name,
//       email,
//       message,
//       userType
//     };

//     const complaint = new Complaint(complaintData);
//     const result = await complaint.save();

//     // Send confirmation email
//     await sendConfirmationEmail(email, complaintNumber, message);

//     res.status(201).json({
//       success: true,
//       message: 'Complaint registered successfully',
//       complaint: result
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error registering complaint',
//       error: error.message
//     });
//   }
// });
// // Get All Complaints Route
// app.get('/get-complaints', async (req, res) => {
//   try {
//     const complaints = await Complaint.find();
    
//     res.status(200).json({
//       success: true,
//       complaints
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching complaints',
//       error: error.message
//     });
//   }
// });

// // Update Complaint Status Route
// app.put('/update-complaint-status', async (req, res) => {
//   try {
//     const { complaintId, status } = req.body;

//     const updatedComplaint = await Complaint.findOneAndUpdate(
//       { complaintNumber: complaintId },
//       { $set: { status } },
//       { new: true }
//     );

//     if (!updatedComplaint) {
//       return res.status(404).json({
//         success: false,
//         message: 'Complaint not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Complaint status updated successfully',
//       complaint: updatedComplaint
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false, 
//       message: 'Error updating complaint status',
//       error: error.message
//     });
//   }
// });

// // Assign Product ID Route
// app.get('/assign-productid', async (req, res) => {
//   try {
//     // Find all products
//     const products = await Product.find();
    
//     if (products.length === 0) {
//       return res.status(404).send('No products found to assign productIds.');
//     }

//     // Update each product to add a productId
//     const updatedProducts = [];
//     const usedIds = new Set(); // Track used IDs to ensure uniqueness

//     for (const product of products) {
//       let productId;
//       // Generate unique 6 digit number
//       do {
//         productId = Math.floor(100000 + Math.random() * 900000).toString();
//       } while (usedIds.has(productId));
      
//       usedIds.add(productId);

//       const updateResult = await Product.findOneAndUpdate(
//         { _id: product._id },
//         { $set: { productId } },
//         { new: true }
//       );

//       if (updateResult) {
//         updatedProducts.push(updateResult);
//       } else {
//         console.error(`Failed to update product with ID: ${product._id}`);
//       }
//     }

//     // Save all updated products
//     await Promise.all(updatedProducts.map(product => product.save()));

//     res.status(200).json({
//       success: true,
//       message: 'Product IDs assigned successfully',
//       products: updatedProducts
//     });
//   } catch (err) {
//     console.error('Error during product ID assignment:', err);
//     res.status(500).json({
//       success: false,
//       message: 'Error assigning product IDs',
//       error: err.message
//     });
//   }
// });

// // Cart Schema
// const cartSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     required: true
//   },
//   productsInCart: [
//     {
//       productId: {
//         type: String,
//         required: true
//       },
//       productQty: {
//         type: Number,
//         required: true,
//         min: 1
//       }
//     }
//   ]
// });

// const Cart = mongoose.model('Cart', cartSchema);

// // Add to Cart Route
// app.post('/add-to-cart', async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;

//     // Find existing cart for user
//     let cart = await Cart.findOne({ userId });

//     if (cart) {
//       // Cart exists, append new product
//       cart.productsInCart.push({
//         productId: productId,
//         productQty: quantity
//       });
//     } else {
//       // Create new cart
//       cart = new Cart({
//         userId,
//         productsInCart: [{
//           productId: productId,
//           productQty: quantity
//         }]
//       });
//     }

//     // Save cart
//     const savedCart = await cart.save();

//     res.status(200).json({
//       success: true,
//       message: 'Product added to cart successfully',
//       cart: savedCart
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error adding product to cart',
//       error: error.message
//     });
//   }
// });

// // Get Cart by User ID Route
// app.get('/cart/:userId', async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: 'Cart not found for this user'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       cart: cart.productsInCart
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching cart',
//       error: error.message
//     });
//   }
// });
// // Delete Item from Cart Route
// app.delete('/delete-items', async (req, res) => {
//   try {
//     const { userId, productId } = req.body;
    
//     // Find cart by userId
//     const cart = await Cart.findOne({ userId });
    
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: 'Cart not found for this user'
//       });
//     }

//     // Filter out the product to be deleted
//     cart.productsInCart = cart.productsInCart.filter(
//       item => item.productId !== productId
//     );

//     // Save updated cart
//     const updatedCart = await cart.save();

//     res.status(200).json({
//       success: true,
//       message: 'Product removed from cart successfully',
//       cart: updatedCart
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error removing product from cart',
//       error: error.message
//     });
//   }
// });

// // Update Product Quantity in Cart Route
// app.put('/update-quantity', async (req, res) => {
//   try {
//     const { userId, productId, productQty } = req.body;
    
//     // Find cart by userId
//     const cart = await Cart.findOne({ userId });
    
//     if (!cart) {
//       return res.status(404).json({
//         success: false,
//         message: 'Cart not found for this user'
//       });
//     }

//     // Find and update product quantity
//     const productIndex = cart.productsInCart.findIndex(
//       item => item.productId === productId
//     );

//     if (productIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: 'Product not found in cart'
//       });
//     }

//     cart.productsInCart[productIndex].productQty = productQty;

//     // Save updated cart
//     const updatedCart = await cart.save();

//     res.status(200).json({
//       success: true,
//       message: 'Product quantity updated successfully',
//       cart: updatedCart
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error updating product quantity',
//       error: error.message
//     });
//   }
// });

// // Address Schema
// const addressSchema = new mongoose.Schema({
//   userId: { type: String, unique: true },
//   address: String
// });

// const Address = mongoose.model('Address', addressSchema);

// // Update or Create Address Route
// app.post('/update-address', async (req, res) => {
//   try {
//     const { userId, address } = req.body;

//     // Try to find existing address for user
//     const existingAddress = await Address.findOne({ userId });

//     let result;
//     if (existingAddress) {
//       // Update existing address
//       existingAddress.address = address;
//       result = await existingAddress.save();
//     } else {
//       // Create new address entry
//       const newAddress = new Address({
//         userId,
//         address
//       });
//       result = await newAddress.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Address updated successfully',
//       address: result
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error updating address',
//       error: error.message
//     });
//   }
// });
// // Order Schema
// const orderSchema = new mongoose.Schema({
//   orderId: String,
//   date: String,
//   time: String,
//   address: String,
//   email: String,
//   name: String,
//   productIds: [String],
//   trackingId: String,
//   price: Number
// });

// const Order = mongoose.model('Order', orderSchema);

// // Place Order Route
// app.post('/place-order', async (req, res) => {
//   try {
//     const { userId, date, time, address, price, productsOrdered } = req.body;

//     // Generate random 6 digit orderId
//     const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    
//     // Generate random 12 digit alphanumeric trackingId
//     const trackingId = Math.random().toString(36).substring(2, 14).toUpperCase();

//     // Find user details
//     const findUserDetails = async (userId) => {
//       // Use mongoose model directly instead of undefined User
//       const user = await mongoose.model('User').findOne({ userId });
//       if (!user) {
//         throw new Error('User not found');
//       }
//       return {
//         name: user.name,
//         email: user.email
//       };
//     };

//     // Extract product IDs
//     const getProductIds = (productsOrdered) => {
//       return productsOrdered.map(item => item.productId);
//     };

//     // Find product details
//     const productDetailsFinder = async (productIds) => {
//       const products = await Product.find({ productId: { $in: productIds } });
//       return products;
//     };

//     // Get user details
//     const userDetails = await findUserDetails(userId);
    
//     // Get product IDs array
//     const productIds = getProductIds(productsOrdered);
    
//     // Get product details
//     const productDetails = await productDetailsFinder(productIds);

//     // Create new order
//     const order = new Order({
//       orderId,
//       date,
//       time,
//       address,
//       email: userDetails.email,
//       name: userDetails.name,
//       productIds,
//       trackingId,
//       price
//     });

//     await order.save();

//     // Send confirmation email
//     const sendingMail = async () => {
//       const emailHtml = `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
//           <div style="background-color: pink; padding: 20px; text-align: center; margin-bottom: 20px;">
//             <h1 style="color: #333; margin: 0;">Mera Bestie</h1>
//           </div>
          
//           <h2 style="color: #333; text-align: center;">Order Confirmation</h2>
//           <p>Dear ${userDetails.name},</p>
//           <p>Thank you for your order! Your order has been successfully placed.</p>
          
//           <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-radius: 5px;">
//             <p><strong>Order ID:</strong> ${orderId}</p>
//             <p><strong>Tracking ID:</strong> ${trackingId}</p>
//             <p><strong>Date:</strong> ${date}</p>
//             <p><strong>Time:</strong> ${time}</p>
//             <p><strong>Delivery Address:</strong> ${address}</p>
//           </div>

//           <div style="margin-top: 20px; text-align: right;">
//             <p><strong>Total Amount:</strong> ₹${price}</p>
//           </div>

//           <p style="margin-top: 30px;">You can track your order using the tracking ID provided above.</p>
//           <p>If you have any questions, please don't hesitate to contact us.</p>
          
//           <p style="margin-top: 30px;">Best regards,<br>Your Mera Bestie Team</p>
//         </div>
//       `;

//       await transporter.sendMail({
//         from: '"Mera Bestie Support" <pecommerce8@gmail.com>',
//         to: userDetails.email,
//         subject: `Order Confirmation - Order #${orderId}`,
//         html: emailHtml
//       });
//     };

//     await sendingMail();

//     res.status(200).json({
//       success: true,
//       message: 'Order placed successfully',
//       orderId,
//       trackingId
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error placing order',
//       error: error.message
//     });
//   }
// });

// // Get All Orders Route
// app.get('/get-orders', async (req, res) => {
//   try {
//     const orders = await Order.find();
    
//     res.status(200).json({
//       success: true,
//       orders
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching orders',
//       error: error.message
//     });
//   }
// });

// // Get User Details Route
// app.get('/get-user', async (req, res) => {
//   try {
//     const users = await mongoose.model('User').find(
//       {}, // Remove filter to get all users
//       '-password' // Exclude only the password field
//     );
    
//     res.status(200).json({
//       success: true,
//       users
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching user details',
//       error: error.message
//     });
//   }
// });

// // Update Account Status Route
// app.put('/update-account-status', async (req, res) => {
//   try {
//     const { userId, accountStatus } = req.body;

//     // Find and update the user, and get the updated document
//     const updatedUser = await mongoose.model('User').findOneAndUpdate(
//       { userId: userId },
//       { accountStatus },
//       { new: true } // This option returns the modified document rather than the original
//     );

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Account status updated successfully',
//       user: {
//         userId: updatedUser.userId,
//         accountStatus: updatedUser.accountStatus
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Error updating account status',
//       error: error.message
//     });
//   }
// });

// const PORT = process.env.PORT || 3002;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const app = express();

// Define the route for the home page
app.get('/', (req, res) => {
  res.send('Hi');
});

// Define the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
