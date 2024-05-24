const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        req.file = file;
        cb(null, './public/imgs'); // Thay đổi 'uploads/' thành đường dẫn nơi bạn muốn lưu trữ file
    },
    filename: function (req, file, cb) {
        req.file = file;
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
