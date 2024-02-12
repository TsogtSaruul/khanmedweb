import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";


// get all users
export const getAllUsersController = async (req, res) => {
  try {
    const user = await userModel
      .find({})
      // .populate("products")
      // .populate("buyer", "name")
      // .sort({ createdAt: "-1" });

    res.status(200).send({
      success: true,
      message: "Бүх user жагсаалт",
      user,
    }); 

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Бүх хэлтэс дуудах үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};


// get one user
export const getUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Ийм id-тай User байхгүй байна!",
      });
    }
    
    res.status(200).send({
      success: true,
      message: "Нэг user амжилттай дуудлаа!",
      user,
    });   

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Нэг хэрэглэгч дуудах үед алдаа гарлаа!",
      error,
    });
  }
};


// create a new user
export const createUserController = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      phone, 
      email, 
      password, 
      confirmPassword,
      role,
    } = req.body;

    // validations
    if (!firstName) {
      return res.send({ message: "Нэр оруулна уу!" });
    }
    if (!lastName) {
      return res.send({ message: "Овог оруулна уу!" });
    }
    if (!phone) {
      return res.send({ message: "Утасны дугаар орууна уу!" });
    }
    if (!email) {
      return res.send({ message: "И-мэйл оруулна уу!" });
    }
    if (!password) {
      return res.send({ message: "Нууц үг оруулна уу!" });
    }
    if (!confirmPassword) {
      return res.send({ message: "Нууц үг давтан оруулна уу!" });
    }
    if (!role) {
      return res.send({ message: "Ангилал сонгоно уу!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Нууц үгнүүд адилхан биш байна!",
      }); 
    }

    // check user
    const existingUser = await userModel.findOne({ email });

    // exisiting user
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Бүртгэлтэй хэрэглэгч байна!",
      });
    }

    // encrypt the password
    const hashedPassword = await hashPassword(password);

    // save
    await new userModel({
      firstName, 
      lastName, 
      name: `${firstName} ${lastName}`,
      phone,
      email,
      password: hashedPassword,
      role,
    }).save();

    const user = await userModel.find({});

    // const token = JWT.sign(
    //   { email: user.email, id: user._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    res.status(201).send({
      success: true,
      message: "Хэрэглэгч амжилттай бүртгэгдлээ!",
      user,
      // token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Хэрэглэгч үүсгэх үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};


// update one user
export const updateUserController = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      phone, 
      email, 
      password, 
      confirmPassword,
      role,
    } = req.body;
    const { id } = req.params;

    // validations
    if (!firstName) {
      return res.send({ message: "Нэр оруулна уу!" });
    }
    if (!lastName) {
      return res.send({ message: "Овог оруулна уу!" });
    }
    if (!phone) {
      return res.send({ message: "Утасны дугаар орууна уу!" });
    }
    if (!email) {
      return res.send({ message: "И-мэйл оруулна уу!" });
    }
    if (!password) {
      return res.send({ message: "Нууц үг оруулна уу!" });
    }
    if (!confirmPassword) {
      return res.send({ message: "Нууц үг давтан оруулна уу!" });
    }
    if (!role) {
      return res.send({ message: "Ангилал сонгоно уу!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "Нууц үгнүүд адилхан биш байна!",
      }); 
    }

    const hashedPassword = await hashPassword(password);

    // check user
    const oldUser = await userModel.findOne({ _id:id });
    
    if (email !== oldUser.email) {
      return res.status(400).send({
        success: false,
        message: "И-мэйлийг нь өөрчилсөн байна!",
      }); 
    }

    await userModel.findByIdAndUpdate(
      id,
      {
        firstName, 
        lastName, 
        name: `${firstName} ${lastName}`,
        phone,
        email,
        password: hashedPassword,
        role,
      },
      { new: true }
    );

    const user = await userModel.find({});

    // const token = JWT.sign(
    //   { email: user.email, id: user._id },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    res.status(200).send({
      success: true,
      message: "User амжилттай шинэчлэгдлээ!",
      user,
      // token,
    });   

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Хэрэглэгч шинэчлэх үед сервер дээр алдаа гарлаа!",
    });
  }
};


// delete one user
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    
    await userModel.findByIdAndRemove(id);
    const user = await userModel.find();

    res.status(200).send({
      success: true,
      message: "User амжилттай устгагдлаа!",
      user,
    });   
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Хэрэглэгчийг устгах үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};
