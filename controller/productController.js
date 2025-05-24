import Product from "../model/product.js";
import  Category from '../model/category.js'

// CREATE PRODUCT
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;
        const image = req.file ? req.file.filename : null;
        
        if (categoryId) {
            const category = await Category.findByPk(categoryId);
            if (!category) {
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
        console.error("Create product error:", error); 
        res.status(500).json({ error: 'Failed to create product'});
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

