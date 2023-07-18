const Docs = require('../models/Docs');

const create = async (req, res) => {
    try {
        const { title, content } = req.body;

        if(!title){
            res.status(400).json({message: 'Title is required'});
        }

        const token = req.headers.authorization.split(' ')[1]
        const email = jwt.decode(token).email;

        const newDoc = new Docs({title, content, user: email});

        await newDoc.save();

        res.status(201).json(newDoc);
    }
    catch(err){
        console.log(err);
    }
}

