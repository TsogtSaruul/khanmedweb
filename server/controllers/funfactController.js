import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all funfacts
export const getAllFunfactsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/funfact.txt"), function(err, data) {
      if (err) throw err;

      let funfact = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх funfact жагсаалт",
        funfact,
      });      
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Бүх funfact дуудах үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};


// get one funfact
export const getFunfactController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/funfact.txt"), function(err, data) {
      if (err) throw err;

      let funfact = JSON.parse(data);
      funfact = funfact.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг funfact амжилттай дуудлаа!",
        funfact,
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


// create a new funfact
export const createFunfactController = async (req, res) => {
  try {
    const { 
      icon,
      number,
      title,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/funfact.txt"), function(err, data) {
      if (err) throw err;

      const funfact = JSON.parse(data);
      const listId = funfact.map((item) => item.id)

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
        number,
        title,
      }

      funfact.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/funfact.txt"), JSON.stringify(funfact), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ funfact амжилттай үүслээ!",
          funfact,
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


// update one funfact
export const updateFunfactController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      icon,
      number,
      title,
    } = req.body;
    const { id } = req.params;
    const updatedFunfact = { 
      id, 
      icon,
      number,
      title,
    };

    fs.readFile(path.resolve(__dirname, "../data/funfact.txt"), function(err, data) {
      if (err) throw err;
      let funfact = JSON.parse(data);
      funfact = funfact.map((item) => item.id === id ? updatedFunfact : item );

      fs.writeFile(path.resolve(__dirname, "../data/funfact.txt"), JSON.stringify(funfact), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Funfact амжилттай шинэчлэгдлээ!",
          funfact,
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


// delete one funfact
export const deleteFunfactController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/funfact.txt"), function(err, data) {
      if (err) throw err;

      let funfact = JSON.parse(data);
      funfact = funfact.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/funfact.txt"), JSON.stringify(funfact), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Funfact амжилттай устгагдлаа!",
          funfact,
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
