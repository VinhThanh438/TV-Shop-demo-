const appError = require('../errors/appError');
const pool = require('../config/connectDB');
const { statusCode, message } = require('../data/httpResponse');
const idData = require('../data/idData');
const jwt = require('jsonwebtoken');
const doc = require('../config/spreadSheet');
require('dotenv').config();
let query;

const orderController = {
    getAll: async (req, res, next) => {
        try {
            query = 'select * from orders';
            const [orders] = await pool.execute(query);
            return res.status(statusCode.OK).json(orders);
        } catch (err) {
            next(new appError(err));
        }
    },

    getUserOrder: async (req, res, next) => {
        try {
            const iduser = req.body.iduser;
            query = 'select * from orders where iduser = ? order by date desc';
            let [orderItems] = await pool.execute(query, [iduser]);
            if (orderItems.length === 0)
                return res.status(statusCode.NO_CONTENT).json({ orderItems: '' });

            let idData = [];
            query = 'select * from order_items where idorder = ?';
            for (let i = 0; i < orderItems.length; i++) {
                idData.push(orderItems[i].idorder);
                if (i == orderItems.length - 1) break;
                query += ' or idorder = ?';
            }
            const [items] = await pool.execute(query, idData);

            // format JSON data
            orderItems.map((ois) => {
                ois.items = [];
                items.map((e) => {
                    const { idorder, ...rest } = e;
                    if (e.idorder == ois.idorder) ois.items.push(rest);
                });
            });

            return res.status(statusCode.OK).json(orderItems);
        } catch (err) {
            next(new appError(err));
        }
    },

    addOrder: async (req, res, next) => {
        try {
            // create and check order id
            const { Ma_sp, Gia_sp, So_luong, Ten_sp, ...rest } = req.body;
            const now = new Date();

            // add data to worksheet
            await doc.loadInfo();

            const sheet = doc.sheetsByIndex[0];

            await sheet.addRow({
                STT: '=ROW()-1',
                'TÊN NGƯỜI NHẬN': rest.Ten,
                EMAIL: rest.Email,
                SDT: rest.Sdt,
                'GIỚI TÍNH': rest.sex,
                HTTT: rest.httt,
                'GHI CHÚ': rest.Ghi_chu,
                'THỜI GIAN ĐẶT HÀNG': `${now.getDate()}/${
                    now.getMonth() + 1
                }/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
                'THÀNH TIỀN': rest.Tong_tien,
                'TRẠNG THÁI': 'Đang xử lý',
            });

            query =
                'insert into orders (idorder, iduser, username, address, phonenumber, email, sex, method, note, totalprice, status) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

            // create id order
            let createId = () => Math.floor(Math.random() * 9999) + 1000;
            let orderid = createId();

            idData().order.map((id) => {
                if (id == createId()) orderid = createId();
            });
            idData('add', 'order', orderid);

            await pool.execute(query, [
                orderid,
                rest.Iduser,
                rest.Ten,
                rest.Dia_chi,
                rest.Sdt,
                rest.Email,
                rest.sex,
                rest.httt,
                rest.Ghi_chu,
                rest.Tong_tien,
                'Đang xử lý',
            ]);

            query =
                'insert into order_items (idorder, idproduct, nameproduct, price, productnumber) values(?, ?, ?, ?, ?)';
            if (Array.isArray(Ma_sp)) {
                for (let i = 0; i < Ma_sp.length; i++) {
                    await pool.execute(query, [
                        orderid,
                        Ma_sp[i],
                        Ten_sp[i],
                        Gia_sp[i],
                        So_luong[i],
                    ]);
                }
            } else {
                await pool.execute(query, [orderid, Ma_sp, Ten_sp, Gia_sp, So_luong]);
            }

            return res.status(statusCode.CREATED).json(message.SUCCESS);
        } catch (err) {
            next(new appError(err));
        }
    },
};

module.exports = orderController;
