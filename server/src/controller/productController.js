const pool = require('../config/connectDB');
const idData = require('../data/idData.js');
const { statusCode, message } = require('../data/httpResponse');
const appError = require('../errors/appError');
const cloudinary = require('cloudinary').v2;

let query;

const productControler = {
    getAllProducts: async (req, res, next) => {
        try {
            query = 'select * from product';
            const [data] = await pool.execute(query);

            return res.status(statusCode.OK).json(data);
        } catch (err) {
            next(new appError(err));
        }
    },

    getProductById: async (req, res, next) => {
        try {
            query = 'select * from product where idproduct = ?';
            let productId = req.params.id;
            const [product] = await pool.execute(query, [productId]);

            return res.status(statusCode.OK).json(product);
        } catch (err) {
            next(new appError(err));
        }
    },

    addProduct: async (req, res, next) => {
        try {
            query =
                'insert into product (idproduct, nameproduct, image, priceproduct, condproduct) values(?, ?, ?, ?, ?)';
            const { nameproduct, priceproduct, condproduct } = req.body;

            const file = req.file;
            if (!file) next(new appError('No file uploaded!'));

            // create and check product id
            let createId = () => Math.floor(Math.random() * 9999) + 1000;
            let productId = createId();

            idData().product.map((id) => {
                if (id == createId()) productId = createId();
            });
            idData('add', 'product', productId);

            await pool.execute(query, [
                productId,
                nameproduct,
                file.path,
                priceproduct,
                condproduct,
            ]);

            return res.status(statusCode.OK).json(message.SUCCESS);
        } catch (err) {
            next(new appError(err));
        }
    },

    deleteOldImage: async (image) => {
        const arr = image.split('/');
        const str = arr[arr.length - 2] + '/' + arr[arr.length - 1];
        const filename = str.split('.')[0];

        return await cloudinary.uploader.destroy(filename, (error, result) => {
            if (error) next(new appError(err));
            else console.log(result);
        });
    },

    editProduct: async (req, res, next) => {
        try {
            query =
                'update product set `nameproduct`=?,`image`=?,`priceproduct`=?,`condproduct`=? where idproduct=?;';
            const productId = req.params.id;
            const { nameproduct, image, priceproduct, condproduct } = req.body;
            const file = req.file;
            if (file) {
                // Delete old image
                await productControler.deleteOldImage(image);

                await pool.execute(query, [
                    nameproduct,
                    file.path,
                    priceproduct,
                    condproduct,
                    productId,
                ]);
            } else
                await pool.execute(query, [
                    nameproduct,
                    image,
                    priceproduct,
                    condproduct,
                    productId,
                ]);

            return res.status(statusCode.OK).json('product updated!');
        } catch (err) {
            next(new appError(err));
        }
    },

    removeProduct: async (req, res, next) => {
        try {
            query = 'select image from product where idproduct = ?';

            const productId = req.params.id;
            const [test] = await pool.execute(query, [productId]);
            const image = test[0].image;

            query = 'delete from product where `idproduct` = ?';

            await pool.execute(query, [productId]);

            // delete image from cloudinary
            await productControler.deleteOldImage(image);

            // delete product id from store
            idData('delete', 'product', productId);

            return res.status(statusCode.OK).json(message.SUCCESS);
        } catch (err) {
            next(new appError(err));
        }
    },

    searchProduct: async (req, res, next) => {
        try {
            const keyword = req.body.keyword;
            const query = 'select * from product where nameproduct like ?';
            const params = `%${keyword}%`;
            const [data] = await pool.execute(query, [params]);
            return res.status(statusCode.OK).json(data);
        } catch (e) {
            next(new appError(err));
        }
    },
};

module.exports = productControler;
