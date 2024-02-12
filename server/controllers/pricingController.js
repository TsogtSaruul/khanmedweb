import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all pricings
export const getAllPricingsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/pricing.txt"), function(err, data) {
      if (err) throw err;

      let pricing = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх pricing жагсаалт",
        pricing,
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


// get one pricing
export const getPricingController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/pricing.txt"), function(err, data) {
      if (err) throw err;

      let pricing = JSON.parse(data);
      pricing = pricing.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг pricing амжилттай дуудлаа!",
        pricing,
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


// create a new pricing
export const createPricingController = async (req, res) => {
  try {
    const { 
      icon,
      title,
      price,
      unit,
      list,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/pricing.txt"), function(err, data) {
      if (err) throw err;

      const pricing = JSON.parse(data);
      const listId = pricing.map((item) => item.id)

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
        price,
        unit,
        list,
      }

      pricing.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/pricing.txt"), JSON.stringify(pricing), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ pricing амжилттай үүслээ!",
          pricing,
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


// update one pricing
export const updatePricingController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      icon,
      title,
      price,
      unit,
      list,
    } = req.body;
    const { id } = req.params;
    const updatedPricing = { 
      id, 
      icon,
      title,
      price,
      unit,
      list,
    };

    fs.readFile(path.resolve(__dirname, "../data/pricing.txt"), function(err, data) {
      if (err) throw err;

      let pricing = JSON.parse(data);
      pricing = pricing.map((item) => item.id === id ? updatedPricing : item );

      fs.writeFile(path.resolve(__dirname, "../data/pricing.txt"), JSON.stringify(pricing), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Pricing амжилттай шинэчлэгдлээ!",
          pricing,
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


// delete one pricing
export const deletePricingController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/pricing.txt"), function(err, data) {
      if (err) throw err;

      let pricing = JSON.parse(data);
      pricing = pricing.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/pricing.txt"), JSON.stringify(pricing), function(err) {
        if (err) throw err;
        console.log('Removed the pricing!');  

        res.status(200).send({
          success: true,
          message: "Pricing амжилттай устгагдлаа!",
          pricing,
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
