const { Router } = require('express')
const router = Router()

const fs = require('fs')
const path = require('path');

router.post("/delete", (req, res) => {
    const imageId = req.body.imageId;
    const id = req.body.id;


    const newpath = path.join(__dirname, '../client/src/userimages/avatar/');
    const newFilesPath = `${newpath}${id}/${imageId}`;
    try {
        fs.unlinkSync(newFilesPath)
        return res.status(200).send({ message: "Файл удален успешно", code: 200, name: 'HELLO' });
    } catch (err) {
        console.error(err)
    }
});
module.exports = router