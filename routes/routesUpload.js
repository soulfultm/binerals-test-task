const { Router } = require('express')
const router = Router()

const fs = require('fs')
const path = require('path');


router.post("/upload", (req, res) => {
    const file = req.files.file;
    const filename = req.body.fileName;
    const extension = file.name.split('.').pop();
    const newpath = path.join(__dirname, '../client/src/userimages/avatar/');

    console.log(req)

    const dir = newpath + filename;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }

    const newFilesPath = `${newpath}${filename}/${filename}.${extension}`;
    const directory = `${newpath}${filename}`;



    fs.access(newFilesPath, fs.F_OK, (err) => {
        if ((file.size / 1024) / 1024 > 2) {
            return res.status(200).send({ message: "Файл превышает размер", code: 200, name: `${filename}.${extension}`, id: filename, size: file.size });
        }
        if (err) { // check file
            fs.readdir(directory, (err, files) => {
                for (const file of files) {
                    fs.unlink(path.join(directory, file), err => {
                        if (err) {
                            return res.status(200).send({ message: "Удаление успешно", code: 200 });
                        };
                    });
                }
                if (!err) { // if removed
                    return file.mv(newFilesPath, (err) => {
                        if (err) {
                            res.status(500).send({ message: "Файл не загружен", code: 200 });
                        }
                        res.status(200).send({ message: "Файл успешно загружен", code: 200, name: `${filename}.${extension}`, id: filename, size: file.size });
                    });
                }
            })
        } else {
            return res.status(200).send({ message: "Файл уже загружен", code: 200, name: `${filename}.${extension}`, id: filename, size: file.size });
        }
    });
});
module.exports = router