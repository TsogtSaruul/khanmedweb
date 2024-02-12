import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all schedules
export const getAllSchedulesController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/schedule.txt"), function(err, data) {
      if (err) throw err;

      let schedule = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх schedule жагсаалт",
        schedule,
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


// get one schedule
export const getScheduleController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/schedule.txt"), function(err, data) {
      if (err) throw err;

      let schedule = JSON.parse(data);
      schedule = schedule.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг schedule амжилттай дуудлаа!",
        schedule,
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


// create a new schedule
export const createScheduleController = async (req, res) => {
  try {
    const { 
      icon,
      title,
      subTitle,
      text1,
      text2,
      link,
    } = req.body;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/schedule.txt"), function(err, data) {
      if (err) throw err;

      const schedule = JSON.parse(data);
      const listId = schedule.map((item) => item.id)

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
        subTitle,
        text1,
        text2,
        link,
      }

      schedule.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/schedule.txt"), JSON.stringify(schedule), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ schedule амжилттай үүслээ!",
          schedule,
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


// update one schedule
export const updateScheduleController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      icon,
      title,
      subTitle,
      text1,
      text2,
      link,
    } = req.body;
    const { id } = req.params;
    const updatedSchedule = { 
      id, 
      icon,
      title,
      subTitle,
      text1,
      text2,
      link,
    };

    fs.readFile(path.resolve(__dirname, "../data/schedule.txt"), function(err, data) {
      if (err) throw err;

      let schedule = JSON.parse(data);
      schedule = schedule.map((item) => item.id === id ? updatedSchedule : item );

      fs.writeFile(path.resolve(__dirname, "../data/schedule.txt"), JSON.stringify(schedule), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Schedule амжилттай шинэчлэгдлээ!",
          schedule,
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


// delete one schedule
export const deleteScheduleController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/schedule.txt"), function(err, data) {
      if (err) throw err;

      let schedule = JSON.parse(data);
      schedule = schedule.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/schedule.txt"), JSON.stringify(schedule), function(err) {
        if (err) throw err;
        console.log('Removed the schedule!');  

        res.status(200).send({
          success: true,
          message: "Schedule амжилттай устгагдлаа!",
          schedule,
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
