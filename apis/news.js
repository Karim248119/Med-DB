const newsModel = require("../models/News.js");
const genericMethod = require("../models/generic.js");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/news");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `news-${uuidv4()}.${ext}`);
  },
});

const uploader = multer({ storage: multerStorage });

const uploadMiddleware = uploader.single("img");
const newsMethod = new genericMethod(newsModel);

//get all

const getAllNews = async (req, res) => {
  try {
    const { page, limit, category, title } = req.query;
    let filters = {};
    if (title) {
      filters.title = { $regex: title, $options: "i" };
    }
    if (category) {
      filters.category = category;
    }
    const news = await newsMethod.getAll(
      filters,
      {},
      parseInt(page),
      parseInt(limit)
    );
    res.status(200).json({
      success: true,
      news,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add
const addNews = async (req, res) => {
  try {
    const { title, content, category, img, date } = req.body;
    const data = {
      title: title,
      content: content,
      category: category,
      img: `/images/news/${req.file.filename}`,
      date: date,
    };
    const news = await newsMethod.create(data);
    res.status(201).json({ success: true, news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete
const deleteNews = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await newsMethod.delete(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    } else {
      res
        .status(200)
        .json({ success: true, message: "News deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNews,
  addNews,
  deleteNews,
  uploadMiddleware,
};
