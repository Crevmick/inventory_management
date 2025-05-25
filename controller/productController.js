import { deleteFile } from '../utils/deleteFile.js';
import { Product, Category } from '../model/index.js';

// CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;
        const image = req.file ? req.file.filename : null;
        
        if (categoryId) {
            const category = await Category.findByPk(categoryId);
            if (!category) {
                if (image) deleteFile(image); 
              return res.status(400).json({ error: "Category does not exist" });
            }
          }

        const product = await Product.create({
            name,
            description,
            price,
            image,
            categoryId: categoryId || null,
        });

        res.status(201).json({
            message: 'Product created sucessfully',
            product: product,
        });
    } catch (error) {
        if (image) deleteFile(image); // Cleanup image on failure
        res.status(500).json({ error: 'Failed to create product'});
    }
};



// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: 'category', 
                    attributes: ['id', 'name'], // Include category details
                }
            ]
        });

        res.status(200).json({ products });
    } catch (error) {
        console.error("Get all products error:", error.message, error.stack);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                }
            ]
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product" });
    }
};


// UPDATE PRODUCT 
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categoryId } = req.body;
        const image = req.file ? req.file.filename : null;

        const product = await Product.findByPk(id);

        if(!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.categoryId = categoryId || product.categoryId;

        if (image) {
            product.image = image;
        }

        await product.save();

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error){
        if (image) deleteFile(image); // Cleanup image on failure
        res.status(500).json({ error: "Failed to update product" });
    }
};


// DELETE PRODUCT 
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if(!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await product.destroy();

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error){
        res.status(500).json({ error: "Failed to delete product" });
    }
};

