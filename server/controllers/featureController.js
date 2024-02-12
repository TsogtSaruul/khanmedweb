import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all features
export const getAllFeaturesController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/feature.txt"), function(err, data) {
      if (err) throw err;

      let feature = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх feature жагсаалт",
        feature,
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


// get one feature
export const getFeatureController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/feature.txt"), function(err, data) {
      if (err) throw err;

      let feature = JSON.parse(data);
      feature = feature.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг feature амжилттай дуудлаа!",
        feature,
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


// create a new feature
export const createFeatureController = async (req, res) => {
  try {
    const { 
      icon,
      title,
      text,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/feature.txt"), function(err, data) {
      if (err) throw err;

      const feature = JSON.parse(data);
      const listId = feature.map((item) => item.id)

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

      feature.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/feature.txt"), JSON.stringify(feature), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ feature амжилттай үүслээ!",
          feature,
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


// update one feature
export const updateFeatureController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      icon,
      title,
      text,
    } = req.body;
    const { id } = req.params;
    const updatedFeature = { 
      id, 
      icon,
      title,
      text,
    };

    fs.readFile(path.resolve(__dirname, "../data/feature.txt"), function(err, data) {
      if (err) throw err;

      let feature = JSON.parse(data);
      feature = feature.map((item) => item.id === id ? updatedFeature : item );

      fs.writeFile(path.resolve(__dirname, "../data/feature.txt"), JSON.stringify(feature), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Feature амжилттай шинэчлэгдлээ!",
          feature,
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


// delete one feature
export const deleteFeatureController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/feature.txt"), function(err, data) {
      if (err) throw err;

      let feature = JSON.parse(data);
      feature = feature.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/feature.txt"), JSON.stringify(feature), function(err) {
        if (err) throw err;
        console.log('Removed the feature!');  

        res.status(200).send({
          success: true,
          message: "Feature амжилттай устгагдлаа!",
          feature,
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
