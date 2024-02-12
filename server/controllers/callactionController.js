import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all callactions
export const getAllCallactionsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/callaction.txt"), function(err, data) {
      if (err) throw err;

      let callaction = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх callaction жагсаалт",
        callaction,
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


// get one callaction
export const getCallactionController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/callaction.txt"), function(err, data) {
      if (err) throw err;

      let callaction = JSON.parse(data);
      callaction = callaction.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг callaction амжилттай дуудлаа!",
        callaction,
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


// create a new callaction
export const createCallactionController = async (req, res) => {
  try {
    const { 
      title,
      action,
      text,
      link,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/callaction.txt"), function(err, data) {
      if (err) throw err;

      const callaction = JSON.parse(data);
      const listId = callaction.map((item) => item.id)

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
        action,
        text,
        link,
      }

      callaction.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/callaction.txt"), JSON.stringify(callaction), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ callaction амжилттай үүслээ!",
          callaction,
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


// update one callaction
export const updateCallactionController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      title, 
      action, 
      text, 
      link 
    } = req.body;
    const { id } = req.params;
    const updatedCallaction = { 
      id, 
      title, 
      action, 
      text, 
      link 
    };

    fs.readFile(path.resolve(__dirname, "../data/callaction.txt"), function(err, data) {
      if (err) throw err;

      let callaction = JSON.parse(data);
      callaction = callaction.map((item) => item.id === id ? updatedCallaction : item );

      fs.writeFile(path.resolve(__dirname, "../data/callaction.txt"), JSON.stringify(callaction), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Callaction амжилттай шинэчлэгдлээ!",
          callaction,
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


// delete one callaction
export const deleteCallactionController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/callaction.txt"), function(err, data) {
      if (err) throw err;

      let callaction = JSON.parse(data);
      callaction = callaction.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/callaction.txt"), JSON.stringify(callaction), function(err) {
        if (err) throw err;
        console.log('Removed the callaction!');  

        res.status(200).send({
          success: true,
          message: "Callaction амжилттай устгагдлаа!",
          callaction,
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
