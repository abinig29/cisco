const allowedOrigins = [
  "http://localhost:5173",
  "https://cisco-registration.netlify.app",
  "https://verdant-biscuit-aa5a4b.netlify.app/"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH ", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
