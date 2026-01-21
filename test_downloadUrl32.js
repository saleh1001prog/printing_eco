// Test script to check if downloadUrl32 is being saved
// Run this with: node test_downloadUrl32.js

const mongoose = require('mongoose')

// Replace with your MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-connection-string'

async function test() {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('✓ Connected to MongoDB\n')

        const Product = mongoose.model('Product', new mongoose.Schema({}, { strict: false }))
        
        // Get all products
        const products = await Product.find({})
        
        console.log('📦 Products in database:\n')
        products.forEach(product => {
            console.log(`Product: ${product.name}`)
            console.log(`  - Slug: ${product.slug}`)
            console.log(`  - downloadUrl (64-bit): ${product.downloadUrl || 'Not set'}`)
            console.log(`  - downloadUrl32 (32-bit): ${product.downloadUrl32 || 'Not set'}`)
            console.log('')
        })

        if (products.length === 0) {
            console.log('❌ No products found in database!')
        }

        await mongoose.disconnect()
        console.log('\n✓ Disconnected from MongoDB')
        
    } catch (error) {
        console.error('❌ Error:', error.message)
    }
}

test()
