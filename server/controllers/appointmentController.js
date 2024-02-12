import appointmentModel from "../models/appointmentModel.js";
import slugify from "slugify";
import dotenv from "dotenv";
import { hashPassword, comparePassword } from '../helpers/authHelper.js'



export const getAllAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .sort({ _id: -1 });

    res.status(200).send({
      success: true,
      message: "All Appointments",
      appointments,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Бүх цаг захиалах дуудах үед алдаа гарлаа!",
      error: error.message,
    });
  }
};

export const getSomeAppointmentsController = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 10;
    const startIndex = (Number(page) - 1) * LIMIT;
    const TOTAL = await appointmentModel.countDocuments({});
    const appointments = await appointmentModel
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    // const appointments = await appointmentModel
    //   .find({})
    //   .populate("department")
    //   .select("-photo")
    //   .limit(12)
    //   .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: appointments.length,
      numberOfPages: Math.ceil(TOTAL / LIMIT),
      currentPage: Number(page),
      message: "All Appointments",
      appointments,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Бүх цаг захиалах дуудах үед алдаа гарлаа!",
      error: error.message,
    });
  }
};


export const getAppointmentController = async (req, res) => {
  
  try {
    const appointment = await appointmentModel
      .findOne({ _id: req.params.id })
      // .select("-photo")
      // .populate("category");

    res.status(200).send({
      success: true,
      message: "Нэг эмчийн мэдээлэл амжилттай дуудлаа!",
      appointment,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Нэг эмчийг дуудах үед алдаа гарлаа!",
      error,
    });
  }
};


export const getAppointmentPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Зураг дуудах үед алдаа гарлаа!",
      error,
    });
  }
};


export const createAppointmentController = async (req, res) => {
  try {
    const { 
      patient,
      department,
      doctor,
      date,
      time,
      } = req.body;

    // validation
    // switch (true) {
    //   case !firstName:
    //     return res.status(500).send({ error: "Та өөрийн нэрийг оруулна уу!" });

    //   case !lastName:
    //     return res.status(500).send({ error: "Та овогоо оруулна уу!" });

    //   case !email:
    //     return res.status(500).send({ error: "Та и-мэйлээ оруулна уу!" });

    //   case !phone:
    //     return res.status(500).send({ error: "Та утасаа оруулна уу!" });

    //   case !department:
    //     return res.status(500).send({ error: "Та хэлтэсээ оруулна уу!" });

    //   case !doctor:
    //     return res.status(500).send({ error: "Та эмчээ оруулна уу!" });

    //   case !date:
    //     return res.status(500).send({ error: "Та өдрөө сонгоно уу!" });
        
    //   case !message:
    //     return res.status(500).send({ error: "Та мессежээ оруулна уу!" });
    // }
    
    // const oldAppointment = await appointmentModel.findOne({ email });

    // if (oldAppointment) return res.status(400).send({
    //   success: false,
    //   message: "The appointment is already registered!",
    // })

    // if (password !== confirmPassword) return res.status(400).send({
    //   success: false,
    //   message: "The passwords don't match!",
    // }) 

    // const hashedPassword = await hashPassword(password);

    const appointment = new appointmentModel({ 
      patient,
      department,
      doctor,
      date,
      time,
    });

    await appointment.save();

    const appointments = await appointmentModel.find({});

    res.status(201).send({
      success: true,
      message: "The appointment is registered successfully!",
      appointments,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error during the appointment is registration!",
      error,
    });
  }
};


export const appointmentFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    
    const products = await productModel.find(args);
    
    res.status(200).send({
      success: true,
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Жолооч нарыг шүүлтүүрдэх үед алдаа гарлаа!",
      error,
    });
  }
};


export const appointmentCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();

    res.status(200).send({
      success: true,
      total,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Жолооч нарын тоог гаргах үед алдаа гарлаа!",
      error,
    });
  }
};


// appointment list based on page
export const appointmentListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      // .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchAppointmentController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      // .select("-photo");

    res.json(results);

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Жолооч хайх үед алдаа гарлаа!",
      error,
    });
  }
};

// similar products
export const relatedAppointmentController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      // .select("-photo")
      .limit(3)
      .populate("category");

    res.status(200).send({
      success: true,
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Бусад жолооч нарыг дуудах үед алдаа гарлаа!",
      error,
    });
  }
};

// update product
export const updateAppointmentController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, photo, shipping } = req.body;
    // const { photo } = req.files;

    // validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Нэрээ оруулна уу!" });
      case !description:
        return res.status(500).send({ error: "Тайлбар оруулна уу!" });
      case !price:
        return res.status(500).send({ error: "Үнэ оруулна уу!" });
      case !category:
        return res.status(500).send({ error: "Категори сонгоно уу!" });
      case !quantity:
        return res.status(500).send({ error: "Тоо хэмжээ оруулна уу!" });
      case photo && photo.size > 30000000:
        return res
          .status(500)
          .send({ error: "30 мегабайтаас бага хэмжээтэй зураг оруулна уу!" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );

    // if (photo) {
    //   products.photo.data = fs.readFileSync(photo.path);
    //   products.photo.contentType = photo.type;
    // }
    await products.save();

    res.status(201).send({
      success: true,
      message: "Жолооч амжилттай шинэчлэгдлээ!",
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Жолоочийг шинэчлэх үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};

// delete controller
export const deleteAppointmentController = async (req, res) => {
  try {
    // await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    await appointmentModel.findByIdAndDelete(req.params.id);
    const appointments = await appointmentModel.find({})

    res.status(200).send({
      success: true,
      message: "Жолоочийг сервер дээр амжилттай устгагдлаа!",
      appointments,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Жолоочийг устгах үед сервер дээр алдаа гарлаа!",
      error,
    });
  }
};


// get products by category
export const appointmentCategoryController = async (req, res) => {
  try {
    // const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");

    res.status(200).send({
      success: true,
      // category,
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Жолооч нарыг дуудах үед алдаа гарлаа!",
      error,
    });
  }
};

// payment gateway api
// token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });

  } catch (error) {
    console.log(error);
  }
};