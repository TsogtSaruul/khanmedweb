import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all sliders
export const getAllSlidersController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/slider.txt"), function(err, data) {
      if (err) throw err;

      let slider = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх slider жагсаалт",
        slider,
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


// get one slider
export const getSliderController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/slider.txt"), function(err, data) {
      if (err) throw err;

      let slider = JSON.parse(data);
      slider = slider.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг slider амжилттай дуудлаа!",
        slider,
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


// create a new slider
export const createSliderController = async (req, res) => {
  try {
    const { 
      photo,
      title1,
      title2,
      title3,
      title4,
      text,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/slider.txt"), function(err, data) {
      if (err) throw err;

      const slider = JSON.parse(data);
      const listId = slider.map((item) => item.id)

      let newId;
      let isPresent;
      do {
        newId = randomId();
        isPresent = listId.includes(newId);
      }
      while (isPresent === true)

      const newItem = {
        id: newId,
        photo,
        title1,
        title2,
        title3,
        title4,
        text,
      }

      slider.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/slider.txt"), JSON.stringify(slider), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ slider амжилттай үүслээ!",
          slider,
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


// update one slider
export const updateSliderController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      photo,
      title1,
      title2,
      title3,
      title4,
      text,
    } = req.body;
    const { id } = req.params;
    const updatedSlider = { 
      id, 
      photo,
      title1,
      title2,
      title3,
      title4,
      text, 
    };

    fs.readFile(path.resolve(__dirname, "../data/slider.txt"), function(err, data) {
      if (err) throw err;

      let slider = JSON.parse(data);
      slider = slider.map((item) => item.id === id ? updatedSlider : item );

      fs.writeFile(path.resolve(__dirname, "../data/slider.txt"), JSON.stringify(slider), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Slider амжилттай шинэчлэгдлээ!",
          slider,
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


// delete one slider
export const deleteSliderController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/slider.txt"), function(err, data) {
      if (err) throw err;

      let slider = JSON.parse(data);
      slider = slider.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/slider.txt"), JSON.stringify(slider), function(err) {
        if (err) throw err;
        console.log('Removed the slider!');  

        res.status(200).send({
          success: true,
          message: "Slider амжилттай устгагдлаа!",
          slider,
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
