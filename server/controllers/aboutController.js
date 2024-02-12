import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all abouts
export const getAllAboutsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/about.txt"), function(err, data) {
      let about = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх about жагсаалт",
        about,
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


// get one about
export const getAboutController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/about.txt"), function(err, data) {
      let about = JSON.parse(data);
      about = about.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг about амжилттай дуудлаа!",
        about,
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


// create a new about
export const createAboutController = async (req, res) => {
  try {
    const { 
      title,
      text,
      list,
      photo,
      link,
    } = req.body;

    // list = list.split(',');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/about.txt"), function(err, data) {
      const about = JSON.parse(data);
      const listId = about.map((item) => item.id)

      let newId;
      let isPresent;
      do {
        newId = randomId();
        isPresent = listId.includes(newId);
      }
      while (isPresent === true)

      const newItem = {
        id: newId,
        title,
        text,
        list,
        photo,
        link,
      }

      about.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/about.txt"), JSON.stringify(about), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ about амжилттай үүслээ!",
          about,
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


// update one about
export const updateAboutController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      title,
      text,
      list,
      photo,
      link,
    } = req.body;
    const { id } = req.params;
    const updatedAbout = { 
      id,
      title,
      text,
      list,
      photo,
      link,
    };

    fs.readFile(path.resolve(__dirname, "../data/about.txt"), function(err, data) {
      let about = JSON.parse(data);
      about = about.map((item) => item.id === id ? updatedAbout : item );

      fs.writeFile(path.resolve(__dirname, "../data/about.txt"), JSON.stringify(about), function(err) {
        if (err) throw err;
        console.log('Updated the about!');  

        res.status(200).send({
          success: true,
          message: "About амжилттай шинэчлэгдлээ!",
          about,
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


// delete one about
export const deleteAboutController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/about.txt"), function(err, data) {
      let about = JSON.parse(data);
      about = about.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/about.txt"), JSON.stringify(about), function(err) {
        if (err) throw err;
        console.log('Removed the about!');  

        res.status(200).send({
          success: true,
          message: "About амжилттай устгагдлаа!",
          about,
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
