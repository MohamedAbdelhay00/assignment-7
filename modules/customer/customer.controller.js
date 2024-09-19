import bcrypt from 'bcryptjs';
import Customer from '../../db/models/customer.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.JWT_SECRET;

 const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({ name, email, password: hashedPassword, phone });
    await customer.save();

    res.status(201).json({ msg: 'Customer registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const customer = await Customer.findOne({ email });
      if (!customer) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const token = jwt.sign({ id: customer._id }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

   const getUserById = async (req, res) => {
    try {
      const user = await Customer.findById(req.params.id);
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

   const getAllUsers = async (req, res) => {
    try {
      const users = await Customer.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

   const updateUser = async (req, res) => {
    try {
      const user = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

   const deleteUser = async (req, res) => {
    try {
      const user = await Customer.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      res.status(200).json({ msg: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  

export { signup, signin, getUserById, getAllUsers, updateUser, deleteUser };