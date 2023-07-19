const Docs = require('../models/Docs');
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
    try {
        const { title, content } = req.body;

        if(!title){
            res.status(400).json({message: 'Title is required'});
        }

        const token = req.headers.authorization
        const email = jwt.decode(token).id;

        const newDoc = new Docs({title, content, user: email});

        await newDoc.save();

        res.status(201).json(newDoc);
    }
    catch(err){
        console.log(err);
    }
}

const read = async (req, res) => {
    try {
        const { id } = req.query;
    }
    
    catch(err){
        console.log(err);
    }
}

const update = async (req, res) => {
    try {
    }
    catch(err){
    }
}

const remove = async (req, res) => {
    try {
    }
    catch(err){
    }
}


exports.create = create;
exports.read = read;
exports.update = update;
exports.remove = remove;