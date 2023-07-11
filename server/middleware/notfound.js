import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (req, res) => {
  if (req.accepts("html"))
    return res
      .status(404)
      .sendFile(path.join(__dirname, "..", "notFound.html"));
  else if (req.accepts("json"))
    return res.status(404).json({ message: "page not found" });
};
