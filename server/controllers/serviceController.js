import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all services
export const getAllServicesController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/service.txt"), function(err, data) {
      if (err) throw err;

      let service = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх service жагсаалт",
        service,
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


// get one service
export const getServiceController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/service.txt"), function(err, data) {
      if (err) throw err;

      let service = JSON.parse(data);
      service = service.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг service амжилттай дуудлаа!",
        service,
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


// create a new service
export const createServiceController = async (req, res) => {
  try {
    const { 
      serviceLogo,
      serviceTitle,
      serviceText,
      detailsTitle,
      detailsText1,
      detailsText2,
      detailsQuote,
      detailsPhoto, 
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/service.txt"), function(err, data) {
      if (err) throw err;

      const service = JSON.parse(data);
      const listId = service.map((item) => item.id)

      let newId;
      let isPresent;
      do {
        newId = randomId();
        isPresent = listId.includes(newId);
      }
      while (isPresent === true)

      const newItem = {
        id: newId,
        serviceLogo,
        serviceTitle,
        serviceText,
        detailsTitle,
        detailsText1,
        detailsText2,
        detailsQuote,
        detailsPhoto, 
      }

      service.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/service.txt"), JSON.stringify(service), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ service амжилттай үүслээ!",
          service,
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


// update one service
export const updateServiceController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      serviceLogo,
      serviceTitle,
      serviceText,
      detailsTitle,
      detailsText1,
      detailsText2,
      detailsQuote,
      detailsPhoto, 
    } = req.body;
    const { id } = req.params;
    const updatedService = { 
      id, 
      serviceLogo,
      serviceTitle,
      serviceText,
      detailsTitle,
      detailsText1,
      detailsText2,
      detailsQuote,
      detailsPhoto, 
    };

    fs.readFile(path.resolve(__dirname, "../data/service.txt"), function(err, data) {
      if (err) throw err;

      let service = JSON.parse(data);
      service = service.map((item) => item.id === id ? updatedService : item );

      fs.writeFile(path.resolve(__dirname, "../data/service.txt"), JSON.stringify(service), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Service амжилттай шинэчлэгдлээ!",
          service,
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


// delete one service
export const deleteServiceController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/service.txt"), function(err, data) {
      if (err) throw err;

      let service = JSON.parse(data);
      service = service.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/service.txt"), JSON.stringify(service), function(err) {
        if (err) throw err;
        console.log('Removed the service!');  

        res.status(200).send({
          success: true,
          message: "Service амжилттай устгагдлаа!",
          service,
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
