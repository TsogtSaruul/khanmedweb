import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all emails
export const getAllEmailsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/email.txt"), function(err, data) {
      if (err) throw err;

      let emails = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх email жагсаалт",
        emails,
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


// get one email
export const getEmailController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/email.txt"), function(err, data) {
      if (err) throw err;

      let emails = JSON.parse(data);
      emails = emails.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг email амжилттай дуудлаа!",
        emails,
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


// create a new email
export const createEmailController = async (req, res) => {
  try {
    const { 
      email
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/email.txt"), function(err, data) {
      if (err) throw err;

      const emails = JSON.parse(data);
      const listId = emails.map((item) => item.id)

      let newId;
      let isPresent;
      do {
        newId = randomId();
        isPresent = listId.includes(newId);
      }
      while (isPresent === true)

      const newItem = {
        id: newId,
        email,
      }

      emails.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/email.txt"), JSON.stringify(emails), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ email амжилттай үүслээ!",
          emails,
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


// update one email
export const updateEmailController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      email
    } = req.body;
    const { id } = req.params;
    const updatedEmail = { 
      id, 
      email 
    };

    fs.readFile(path.resolve(__dirname, "../data/email.txt"), function(err, data) {
      if (err) throw err;

      let emails = JSON.parse(data);
      emails = emails.map((item) => item.id === id ? updatedEmail : item );

      fs.writeFile(path.resolve(__dirname, "../data/email.txt"), JSON.stringify(emails), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Email амжилттай шинэчлэгдлээ!",
          emails,
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


// delete one email
export const deleteEmailController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/email.txt"), function(err, data) {
      if (err) throw err;

      let emails = JSON.parse(data);
      emails = emails.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/email.txt"), JSON.stringify(emails), function(err) {
        if (err) throw err;
        console.log('Removed the email!');  

        res.status(200).send({
          success: true,
          message: "Email амжилттай устгагдлаа!",
          emails,
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
