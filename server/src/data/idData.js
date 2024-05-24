const fs = require('fs');
const fsPath = 'src/data/idStore/idStore.json';
const readFs = fs.readFileSync(fsPath);

const idData = (option, store, data) => {
    const parseData = JSON.parse(readFs);
    switch (option) {
        case 'add':
            if (store == 'user') parseData.user.push(data);
            if (store == 'product') parseData.product.push(data);
            if (store == 'order') parseData.order.push(data);
            fs.writeFileSync(fsPath, JSON.stringify(parseData));
            break;
        case 'delete':
            if (store == 'user') parseData.user = parseData.user.filter((id) => id != data);
            if (store == 'product')
                parseData.product = parseData.product.filter((id) => id != data);
            if (store == 'order') parseData.order = parseData.order.filter((id) => id != data);
            fs.writeFileSync(fsPath, JSON.stringify(parseData));
            break;
    }
    return parseData;
};

module.exports = idData;
