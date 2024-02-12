import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all clients
export const getAllClientsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/client.txt"), function(err, data) {
      let client = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх client жагсаалт",
        client,
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


// get one client
export const getClientController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/client.txt"), function(err, data) {
      let client = JSON.parse(data);
      client = client.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг client амжилттай дуудлаа!",
        client,
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


// create a new client
export const createClientController = async (req, res) => {
  try {
    const { 
      title,
      photo,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    if (!title) {
      return res.status(401).send({ message: "Хэлтэсийн нэрийг оруулна уу!" });
    }

    fs.readFile(path.resolve(__dirname, "../data/client.txt"), function(err, data) {
      const client = JSON.parse(data);
      const listId = client.map((item) => item.id)

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
        photo,
      }

      client.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/client.txt"), JSON.stringify(client), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ client амжилттай үүслээ!",
          client,
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


// update one client
export const updateClientController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      title,
      photo } = req.body;
    const { id } = req.params;
    const updatedClient = { id, title, photo };

    fs.readFile(path.resolve(__dirname, "../data/client.txt"), function(err, data) {
      let client = JSON.parse(data);
      client = client.map((item) => item.id === id ? updatedClient : item );

      fs.writeFile(path.resolve(__dirname, "../data/client.txt"), JSON.stringify(client), function(err) {
        if (err) throw err;
        console.log('Updated the client!');  

        res.status(200).send({
          success: true,
          message: "Client амжилттай шинэчлэгдлээ!",
          client,
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


// delete one client
export const deleteClientController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/client.txt"), function(err, data) {
      let client = JSON.parse(data);
      client = client.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/client.txt"), JSON.stringify(client), function(err) {
        if (err) throw err;
        console.log('Removed the client!');  

        res.status(200).send({
          success: true,
          message: "Client амжилттай устгагдлаа!",
          client,
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
