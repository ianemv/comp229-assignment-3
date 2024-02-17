import errorHandler from './error.controller.js';
import Product from '../models/product.model.js';
import extend  from 'lodash';

const create = async (req, res) => {
	const product = new Product(req.body);
	try {
		await product.save();
		return res.status(200).json({
			message: "Successfully added product!"
		});
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		});
	}
};

const list = async (req, res) => {
    try {
        let query = {};
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: 'i' };
        }
        let products = await Product.find(query).select('name description quantity category updated created');
        res.json(products);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};


const productByID = async (req, res, next, id) => {
	try {
		let product = await Product.findById(id) 
		if (!product)
			return res.status('400').json({ 	
			error: "Product not found"
		})
		req.profile = product 
		next()
	} catch (err) {
		return res.status('400').json({ 
		error: "Could not retrieve product"
	}) 
	}
};

const read = (req, res) => {
	req.profile.hashed_password = undefined;
	req.profile.salt = undefined;
	return res.json(req.profile);
};

const update = async (req, res) => {
    try {
        const productId = req.params.productId;
        let product = await Product.findById(productId);
        // Check if the product exists
        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            });
        }
        product.set(req.body);
        product.updated = Date.now();
        await product.save();
        
        res.json(product);
    } catch (err) {
        // Handle any errors that occur during the update process
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};
const remove = async (req, res) => {
	try {
        const productId = req.params.productId;
        let product = await Product.findById(productId);
		let deletedPreoduct = await product.deleteOne() 
		res.json(deletedPreoduct) 
	} catch (err) {
		return res.status(400).json({
		error: errorHandler.getErrorMessage(err) 
	})
	} 
}
const deleteAll = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: "All products deleted successfully" });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};


export default { create, list, read, productByID, update, remove, deleteAll };