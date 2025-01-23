import express from "express";
import mongoose from "mongoose";
import userModel from "./model/user.model.js";
const app = express();
const PORT = 8080;

app.use(express.json());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://choprakhushil13:1rfebIFKUYUBCiDe@cluster0.nhg4l.mongodb.net/ecom_db",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        serverSelectionTimeoutMS: 30000,
      }
    );
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit the process on connection failure
  }
};

connectDB();

app.get("/", async (req, res) => {
  try {
    res.send("Hello");
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/create", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let new_user = new userModel({ name, email, password });
    await new_user.save();
    res.json({
      message: "User saved successfully",
    });
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).send({ error: error.message });
  }
});

const storedFile = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = "uploads/";
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storedFile,
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed!!"));
    }
  },
});

app.post("/upload", upload.array("myFiles"), (req, res) => {
  try {
    // console.log(req.files);
    res.status(200).send({
      message: "Files uploaded successfully!",
      files: req.files.map((file) => ({
        filename: file.filename,
        path: file.path,
      })),
    });
    res.send({ message: "file uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});
