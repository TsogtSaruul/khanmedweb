import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all portfolios
export const getAllPortfoliosController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/portfolio.txt"), function(err, data) {
      if (err) throw err;

      let portfolio = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх portfolio жагсаалт",
        portfolio,
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


// get one portfolio
export const getPortfolioController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/portfolio.txt"), function(err, data) {
      if (err) throw err;

      let portfolio = JSON.parse(data);
      portfolio = portfolio.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг portfolio амжилттай дуудлаа!",
        portfolio,
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


// create a new portfolio
export const createPortfolioController = async (req, res) => {
  try {
    const { 
      department,
      title,
      smallImage,
      largeImage,
      clientName,
      procedure,
      text1,
      text2,
      date,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/portfolio.txt"), function(err, data) {
      if (err) throw err;

      const portfolio = JSON.parse(data);
      const listId = portfolio.map((item) => item.id)

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
        title,
        smallImage,
        largeImage,
        clientName,
        procedure,
        text1,
        text2,
        date,
      }

      portfolio.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/portfolio.txt"), JSON.stringify(portfolio), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ portfolio амжилттай үүслээ!",
          portfolio,
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


// update one portfolio
export const updatePortfolioController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      department,
      title,
      smallImage,
      largeImage,
      clientName,
      procedure,
      text1,
      text2,
      date,
    } = req.body;
    const { id } = req.params;
    const updatedPortfolio = { 
      id, 
      department,
      title,
      smallImage,
      largeImage,
      clientName,
      procedure,
      text1,
      text2,
      date,
    };

    fs.readFile(path.resolve(__dirname, "../data/portfolio.txt"), function(err, data) {
      if (err) throw err;

      let portfolio = JSON.parse(data);
      portfolio = portfolio.map((item) => item.id === id ? updatedPortfolio : item );

      fs.writeFile(path.resolve(__dirname, "../data/portfolio.txt"), JSON.stringify(portfolio), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Portfolio амжилттай шинэчлэгдлээ!",
          portfolio,
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


// delete one portfolio
export const deletePortfolioController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/portfolio.txt"), function(err, data) {
      if (err) throw err;

      let portfolio = JSON.parse(data);
      portfolio = portfolio.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/portfolio.txt"), JSON.stringify(portfolio), function(err) {
        if (err) throw err;
        console.log('Removed the portfolio!');  

        res.status(200).send({
          success: true,
          message: "Portfolio амжилттай устгагдлаа!",
          portfolio,
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
