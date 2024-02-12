import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all faqs
export const getAllFaqsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/faq.txt"), function(err, data) {
      if (err) throw err;

      let faq = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх faq жагсаалт",
        faq,
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


// get one faq
export const getFaqController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/faq.txt"), function(err, data) {
      if (err) throw err;

      let faq = JSON.parse(data);
      faq = faq.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг faq амжилттай дуудлаа!",
        faq,
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


// create a new faq
export const createFaqController = async (req, res) => {
  try {
    const { 
      department,
      question,
      answer,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/faq.txt"), function(err, data) {
      if (err) throw err;

      const faq = JSON.parse(data);
      const listId = faq.map((item) => item.id)

      let newId;
      let isPresent;
      do {
        newId = randomId();
        isPresent = listId.includes(newId);
      }
      while (isPresent === true)

      const newItem = {
        id: newId,
        department,
        question,
        answer,
      }

      faq.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/faq.txt"), JSON.stringify(faq), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ faq амжилттай үүслээ!",
          faq,
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


// update one faq
export const updateFaqController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      department,
      question,
      answer,
    } = req.body;
    const { id } = req.params;
    const updatedFaq = { 
      id, 
      department,
      question,
      answer,
    };

    fs.readFile(path.resolve(__dirname, "../data/faq.txt"), function(err, data) {
      if (err) throw err;

      let faq = JSON.parse(data);
      faq = faq.map((item) => item.id === id ? updatedFaq : item );

      fs.writeFile(path.resolve(__dirname, "../data/faq.txt"), JSON.stringify(faq), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Faq амжилттай шинэчлэгдлээ!",
          faq,
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


// delete one faq
export const deleteFaqController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/faq.txt"), function(err, data) {
      if (err) throw err;

      let faq = JSON.parse(data);
      faq = faq.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/faq.txt"), JSON.stringify(faq), function(err) {
        if (err) throw err;
        console.log('Removed the faq!');  

        res.status(200).send({
          success: true,
          message: "Faq амжилттай устгагдлаа!",
          faq,
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
