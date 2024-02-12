import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";


export const registerController = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, password, confirmPassword } = req.body;
    
    // validations
    if (!firstName) {
      return res.send({ message: "Өрийн нэрээ оруулна уу!" });
    }
    if (!lastName) {
      return res.send({ message: "Овогоо оруулна уу!" });
    }
    if (!phone) {
      return res.send({ message: "Утасны дугаараа орууна уу!" });
    }
    if (!email) {
      return res.send({ message: "И-мэйлээ оруулна уу!" });
    }
    if (!password) {
      return res.send({ message: "Нууц үгээ оруулна уу!" });
    }
    if (!confirmPassword) {
      return res.send({ message: "Нууц үгээ давтан оруулна уу!" });
    }
    

    // check user
    const existingUser = await userModel.findOne({ email });

    // exisiting user
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Бүртгэлтэй хэрэглэгч байна! Нэвтрэх холбоосоор нэвтэрнэ үү!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Нууц үгнүүд адилхан биш байна!",
      }); 
    }

    // encrypt the password
    const hashedPassword = await hashPassword(password);

    // save
    const user = await new userModel({
      name: `${firstName} ${lastName}`,
      phone,
      email,
      password: hashedPassword,
    }).save();

    const token = JWT.sign(
      { email: user.email, id: user._id },
      "khanmed",
      { expiresIn: "1h" }
    );

    res.status(201).send({
      success: true,
      message: "Хэрэглэгч амжилттай бүртгэгдлээ!",
      user,
      token,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Хэрэглэгч бүртгэх үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "И-мэйл эсвэл нууц үг буруу байна!",
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Хэрэглэгч бүртгэлгүй байна!",
      });
    }
    
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Нууц үг буруу байна!",
      });
    }

    // token
    const token = JWT.sign(
      { email: user.email, id: user._id }, 
      "khanmed", 
      { expiresIn: "1d" }
    );

    res.status(200).send({
      success: true,
      message: "Хэрэглэгч амжилттай нэвтэрлээ!",
      // user: {
      //   _id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   phone: user.phone,
      //   role: user.role,
      // },
      user,
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Хэрэглэгч нэвтрэх үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};

// forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    
    if (!email) {
      res.status(400).send({ message: "И-мэйлээ оруулна уу!" });
    }
    if (!answer) {
      res.status(400).send({ message: "Хариултаа оруулна уу!" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "Шинэ нууц үгээ оруулна уу!" });
    }

    // check
    const user = await userModel.findOne({ email, answer });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "И-мэйл эсвэл хариулт буруу байна!",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Нууц үг амжилттай шинэчлэгдлээ!",
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Нууц үг шинэчлэх үед серверт алдаа гарлаа!",
      error,
    });
  }
};

// test controller
export const testController = (req, res) => {
  try {
    res.send("Нэвтрэх шаардлагатай хэсэг байна!");

  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const user = await userModel.findById(req.user._id);

    // password
    if (password && password.length < 6) {
      return res.json({ error: "Нууц үг 6 тэмдэгтээс олон байх шаардлагатай!" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Хувийн мэдээлэл амжилттай шинэчлэгдлээ!",
      updatedUser,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Хувийн мэдээллийг шинэчлэх үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};


// Get All Users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      // .populate("products")
      // .populate("buyer", "name")
      // .sort({ createdAt: "-1" });
    res.json(users);

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Бүх захиалгыг дуудах үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};