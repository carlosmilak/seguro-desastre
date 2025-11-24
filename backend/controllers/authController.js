import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: "Campos obrigatórios faltando." });
    }

    if (!["help", "volunteer"].includes(role)) {
      return res.status(400).json({ msg: "Role inválido." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Email já registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Não retorna a senha
    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return res.status(201).json({ msg: "Usuário registrado com sucesso!", user: userSafe });
  } catch (err) {
    console.error("Erro no registerUser:", err);
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email e senha são obrigatórios." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Credenciais inválidas." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ msg: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const userSafe = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return res.json({ msg: "Login realizado com sucesso!", token, user: userSafe });
  } catch (err) {
    console.error("Erro no loginUser:", err);
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
};
