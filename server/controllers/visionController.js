import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all visions
export const getAllVisionsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/vision.txt"), function(err, data) {
      if (err) throw err;

      let vision = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх vision жагсаалт",
        vision,
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


// get one vision
export const getVisionController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/vision.txt"), function(err, data) {
      if (err) throw err;

      let vision = JSON.parse(data);
      vision = vision.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг vision амжилттай дуудлаа!",
        vision,
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


// create a new vision
export const createVisionController = async (req, res) => {
  try {
    const { 
      icon,
      title,
      text,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/vision.txt"), function(err, data) {
      if (err) throw err;

      const vision = JSON.parse(data);
      const listId = vision.map((item) => item.id)

      let newId;
      let isPresent;
      do {
        newId = randomId();
        isPresent = listId.includes(newId);
      }
      while (isPresent === true)

      const newItem = {
        id: newId,
        icon,
        title,
        text,
      }

      vision.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/vision.txt"), JSON.stringify(vision), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ vision амжилттай үүслээ!",
          vision,
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


// update one vision
export const updateVisionController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      icon,
      title,
      text, 
    } = req.body;
    const { id } = req.params;
    const updatedVision = { 
      id, 
      icon,
      title,
      text,
    };

    fs.readFile(path.resolve(__dirname, "../data/vision.txt"), function(err, data) {
      if (err) throw err;

      let vision = JSON.parse(data);
      vision = vision.map((item) => item.id === id ? updatedVision : item );

      fs.writeFile(path.resolve(__dirname, "../data/vision.txt"), JSON.stringify(vision), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Vision амжилттай шинэчлэгдлээ!",
          vision,
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


// delete one vision
export const deleteVisionController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/vision.txt"), function(err, data) {
      if (err) throw err;

      let vision = JSON.parse(data);
      vision = vision.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/vision.txt"), JSON.stringify(vision), function(err) {
        if (err) throw err;
        console.log('Removed the vision!');  

        res.status(200).send({
          success: true,
          message: "Vision амжилттай устгагдлаа!",
          vision,
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
