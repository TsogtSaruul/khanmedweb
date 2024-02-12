import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all socials
export const getAllSocialsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/social.txt"), function(err, data) {
      if (err) throw err;

      let social = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх social жагсаалт",
        social,
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


// get one social
export const getSocialController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/social.txt"), function(err, data) {
      if (err) throw err;

      let social = JSON.parse(data);
      social = social.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг social амжилттай дуудлаа!",
        social,
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


// create a new social
export const createSocialController = async (req, res) => {
  try {
    const { 
      icon,
      link,
      title,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/social.txt"), function(err, data) {
      if (err) throw err;

      const social = JSON.parse(data);
      const listId = social.map((item) => item.id)

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
        link,
        title,
      }

      social.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/social.txt"), JSON.stringify(social), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ social амжилттай үүслээ!",
          social,
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


// update one social
export const updateSocialController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      icon,
      link,
      title,
    } = req.body;
    const { id } = req.params;
    const updatedSocial = { 
      id, 
      icon,
      link,
      title,
    };

    fs.readFile(path.resolve(__dirname, "../data/social.txt"), function(err, data) {
      if (err) throw err;

      let social = JSON.parse(data);
      social = social.map((item) => item.id === id ? updatedSocial : item );

      fs.writeFile(path.resolve(__dirname, "../data/social.txt"), JSON.stringify(social), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Social амжилттай шинэчлэгдлээ!",
          social,
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


// delete one social
export const deleteSocialController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/social.txt"), function(err, data) {
      if (err) throw err;

      let social = JSON.parse(data);
      social = social.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/social.txt"), JSON.stringify(social), function(err) {
        if (err) throw err;
        console.log('Removed the social!');  

        res.status(200).send({
          success: true,
          message: "Social амжилттай устгагдлаа!",
          social,
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
