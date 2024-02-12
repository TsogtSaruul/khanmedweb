import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all departments
export const getAllDepartmentsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/department.txt"), function(err, data) {
      if (err) throw err;

      let department = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх department жагсаалт",
        department,
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


// get one department
export const getDepartmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/department.txt"), function(err, data) {
      if (err) throw err;

      let department = JSON.parse(data);
      department = department.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг department амжилттай дуудлаа!",
        department,
      });    
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Нэг department дуудах үед алдаа гарлаа!",
      error,
    });
  }
};


// create a new department
export const createDepartmentController = async (req, res) => {
  try {
    const { 
      logo,
      title,
      subtitle,
      quote,
      text,
      list,
      photo,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/department.txt"), function(err, data) {
      if (err) throw err;

      const department = JSON.parse(data);
      const listId = department.map((item) => item.id)

      let newId;
      let isPresent;
      do {
        newId = randomId();
        isPresent = listId.includes(newId);
      }
      while (isPresent === true)

      const newItem = {
        id: newId,
        logo,
        title,
        subtitle,
        quote,
        text,
        list,
        photo,
      }

      department.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/department.txt"), JSON.stringify(department), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ department амжилттай үүслээ!",
          department,
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


// update one department
export const updateDepartmentController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      logo,
      title,
      subtitle,
      quote,
      text,
      list,
      photo,
    } = req.body;
    const { id } = req.params;
    const updatedDepartment = { 
      id, 
      logo,
      title,
      subtitle,
      quote,
      text,
      list,
      photo,
    };

    fs.readFile(path.resolve(__dirname, "../data/department.txt"), function(err, data) {
      if (err) throw err;

      let department = JSON.parse(data);
      department = department.map((item) => item.id === id ? updatedDepartment : item );

      fs.writeFile(path.resolve(__dirname, "../data/department.txt"), JSON.stringify(department), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Department амжилттай шинэчлэгдлээ!",
          department,
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


// delete one department
export const deleteDepartmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/department.txt"), function(err, data) {
      if (err) throw err;

      let department = JSON.parse(data);
      department = department.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/department.txt"), JSON.stringify(department), function(err) {
        if (err) throw err;
        console.log('Removed the department!');  

        res.status(200).send({
          success: true,
          message: "Department амжилттай устгагдлаа!",
          department,
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
