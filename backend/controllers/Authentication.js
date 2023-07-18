const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({message: 'Missing required fields'})
        }
        const checkPresent = await User.findOne({email: email});

        if(checkPresent) {
            return res.status(400).json({message: 'Email already registered'});
        }

        const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: '1h'});

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({...req.body, password: encryptedPassword});

        user.password = undefined;
        user.token = token;
    }

    catch (err) {
        res.status(500).json({message: err.message});
    }

}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({message: 'Missing required fields'});
        }

        const user = await User.findOne({email: email});

        if(user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({email: email}, process.env.JWT_SECRET, {expiresIn: '1h'});
            user.token = token;
            user.password = undefined;
            return res.status(200).cookie('token', token, {httpOnly: true}).json(user);
        }
        res.status(400).json({message: 'Invalid credentials'});
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }

}

module.exports = {register, login};