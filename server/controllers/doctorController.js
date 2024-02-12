import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';
import { hashPassword, comparePassword } from '../helpers/authHelper.js';


// get all doctors
export const getAllDoctorsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/doctor.txt"), function(err, data) {
      if (err) throw err;
      let doctor = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх doctor жагсаалт",
        doctor,
      });      
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


// get one doctor
export const getDoctorController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/doctor.txt"), function(err, data) {
      if (err) throw err;

      let doctor = JSON.parse(data);
      doctor = doctor.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг doctor амжилттай дуудлаа!",
        doctor,
      });    
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Нэг хэлтэс дуудах үед алдаа гарлаа!",
      error,
    });
  }
};


// create a new doctor
export const createDoctorController = async (req, res) => {
  try {
    const { 
      department,
      firstName,
      lastName,
      position,
      title,
      biography,
      email,
      education,
      experience,
      photo,
      password,
      confirmPassword,
      role,
      startTime,
      endTime,
      timeDuration,
    } = req.body;

    const name = `${firstName} ${lastName}`
    if (password !== confirmPassword) return res.status(400).send({
      success: false,
      message: "The passwords don't match!",
    }) 

    const hashedPassword = await hashPassword(password);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/doctor.txt"), function(err, data) {
      if (err) throw err;

      const doctor = JSON.parse(data);
      const listId = doctor.map((item) => item.id)

      let newId;
      let isPresent;
      do {
        newId = randomId();
        isPresent = listId.includes(newId);
      }
      while (isPresent === true)

      const listEmail = doctor.map((item) => item.email);

      const oldDoctor = listEmail.includes(email);

      if (oldDoctor) return res.status(400).send({
        success: false,
        message: "The email is already registered!",
      });

      const newItem = {
        id: newId,
        department,
        firstName,
        lastName,
        name,
        position,
        title,
        biography,
        email,
        education,
        experience,
        photo,
        password: hashedPassword,
        role,   
        startTime,
        endTime,
        timeDuration,
      }

      doctor.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/doctor.txt"), JSON.stringify(doctor), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ doctor амжилттай үүслээ!",
          doctor,
        });       
      });            
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Хэлтэс үүсгэх үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};


// update one doctor
export const updateDoctorController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      department,
      firstName,
      lastName,
      position,
      title,
      biography,
      email,
      education,
      experience,
      photo,
      password,
      confirmPassword,
      role,
      startTime,
      endTime,
      timeDuration,
    } = req.body;

    const { id } = req.params;
    const name = `${firstName} ${lastName}`
    if (password !== confirmPassword) return res.status(400).send({
      success: false,
      message: "The passwords don't match!",
    }) 

    const hashedPassword = await hashPassword(password);


    const updatedDoctor = { 
      id, 
      department,
      firstName,
      lastName,
      name,
      position,
      title,
      biography,
      email,
      education,
      experience,
      photo,
      password: hashedPassword,
      role,   
      startTime,
      endTime,
      timeDuration,
    };

    fs.readFile(path.resolve(__dirname, "../data/doctor.txt"), function(err, data) {
      if (err) throw err;

      let doctor = JSON.parse(data);

      const listEmail = doctor.map((item) => item.email);

      const oldDoctor = listEmail.includes(email);

      if (!oldDoctor) return res.status(400).send({
        success: false,
        message: "The email doesn't match!",
      });
      
      doctor = doctor.map((item) => item.id === id ? updatedDoctor : item );

      fs.writeFile(path.resolve(__dirname, "../data/doctor.txt"), JSON.stringify(doctor), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Doctor амжилттай шинэчлэгдлээ!",
          doctor,
        });         
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Хэлтэс шинэчлэх үед сервер дээр алдаа гарлаа!",
    });
  }
};


// delete one doctor
export const deleteDoctorController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/doctor.txt"), function(err, data) {
      if (err) throw err;

      let doctor = JSON.parse(data);
      doctor = doctor.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/doctor.txt"), JSON.stringify(doctor), function(err) {
        if (err) throw err;
        console.log('Removed the doctor!');  

        res.status(200).send({
          success: true,
          message: "Doctor амжилттай устгагдлаа!",
          doctor,
        });     
      });
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Хэлтэсийг устгах үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};
