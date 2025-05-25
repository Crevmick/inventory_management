import bcrypt from 'bcrypt';
import User from '../../model/user.js';
import generateToken from '../../utils/generateToken.js';

export const registerUser = async (req, res) => {
  try {
    let { username, email, password, firstName, lastName, phone, address } = req.body;

    // Trim inputs
    username = username?.trim();
    email = email?.trim();
    password = password?.trim();
    firstName = firstName?.trim();
    lastName = lastName?.trim();
    phone = phone?.trim();
    address = address?.trim();

    // fields validation
    if (!username || !email || !password) {
      return res.status(400).json({ status: "FAILED", message: "Empty input fields!" });
    }

    if (!/^[a-zA-Z ]*$/.test(username)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid username" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid email entered" });
    }

    if (password.length < 8) {
      return res.status(400).json({ status: "FAILED", message: "Password is too short!" });
    }

    if (firstName && !/^[a-zA-Z ]*$/.test(firstName)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid first name" });
    }

    if (lastName && !/^[a-zA-Z ]*$/.test(lastName)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid last name" });
    }

    if (phone && !/^\+?\d{7,15}$/.test(phone)) {
      // phone can start with + and have 7 to 15 digits
      return res.status(400).json({ status: "FAILED", message: "Invalid phone number" });
    }

    if (address && address.length < 5) {
      return res.status(400).json({ status: "FAILED", message: "Address is too short" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: "FAILED", message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with default role 'customer'
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      address,
      role: 'customer',
    });

    const token = generateToken(newUser);

    res.status(201).json({
      status: "SUCCESS",
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ status: "FAILED", message: "An error occurred during registration" });
  }
};
