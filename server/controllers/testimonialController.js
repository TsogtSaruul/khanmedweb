import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { randomId } from '../helpers/randomId.js';


// get all testimonials
export const getAllTestimonialsController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/testimonial.txt"), function(err, data) {
      if (err) throw err;

      let testimonial = JSON.parse(data);

      res.status(200).send({
        success: true,
        message: "Бүх testimonial жагсаалт",
        testimonial,
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


// get one testimonial
export const getTestimonialController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/testimonial.txt"), function(err, data) {
      if (err) throw err;

      let testimonial = JSON.parse(data);
      testimonial = testimonial.find((item) => item.id === id);
      
      res.status(200).send({
        success: true,
        message: "Нэг testimonial амжилттай дуудлаа!",
        testimonial,
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


// create a new testimonial
export const createTestimonialController = async (req, res) => {
  try {
    const { 
      patientFirstName,
      patientLastName,
      patientTestimonial,
      patientPhoto,
    } = req.body;

    const patientName = `${patientFirstName} ${patientLastName}`

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/testimonial.txt"), function(err, data) {
      if (err) throw err;

      const testimonial = JSON.parse(data);
      const listId = testimonial.map((item) => item.id)

      let newId;
      let isPresent;
      do {
        newId = randomId();
        isPresent = listId.includes(newId);
      }
      while (isPresent === true)

      const newItem = {
        id: newId,
        patientFirstName,
        patientLastName,
        patientName,
        patientTestimonial,
        patientPhoto,
      }

      testimonial.push(newItem);

      fs.writeFile(path.resolve(__dirname, "../data/testimonial.txt"), JSON.stringify(testimonial), function(err) {
        if (err) throw err;

        res.status(201).send({
          success: true,
          message: "Шинэ testimonial амжилттай үүслээ!",
          testimonial,
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


// update one testimonial
export const updateTestimonialController = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { 
      patientFirstName,
      patientLastName,
      patientTestimonial,
      patientPhoto,
    } = req.body;
    const { id } = req.params;
    const patientName = `${patientFirstName} ${patientLastName}`
    const updatedTestimonial = { 
      id, 
      patientFirstName,
      patientLastName,
      patientName,
      patientTestimonial,
      patientPhoto,
    };

    fs.readFile(path.resolve(__dirname, "../data/testimonial.txt"), function(err, data) {
      if (err) throw err;

      let testimonial = JSON.parse(data);
      testimonial = testimonial.map((item) => item.id === id ? updatedTestimonial : item );

      fs.writeFile(path.resolve(__dirname, "../data/testimonial.txt"), JSON.stringify(testimonial), function(err) {
        if (err) throw err;

        res.status(200).send({
          success: true,
          message: "Testimonial амжилттай шинэчлэгдлээ!",
          testimonial,
        });         
      });
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Testimonial шинэчлэх үед сервер дээр алдаа гарлаа!",
    });
  }
};


// delete one testimonial
export const deleteTestimonialController = async (req, res) => {
  try {
    const { id } = req.params;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    fs.readFile(path.resolve(__dirname, "../data/testimonial.txt"), function(err, data) {
      if (err) throw err;

      let testimonial = JSON.parse(data);
      testimonial = testimonial.filter((item) => item.id !== id);

      fs.writeFile(path.resolve(__dirname, "../data/testimonial.txt"), JSON.stringify(testimonial), function(err) {
        if (err) throw err;
        console.log('Removed the testimonial!');  

        res.status(200).send({
          success: true,
          message: "Testimonial амжилттай устгагдлаа!",
          testimonial,
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
