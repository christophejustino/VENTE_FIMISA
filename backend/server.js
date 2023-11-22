import express from "express";
import compte from "./routes/compteRoute.js";
import service from './routes/serviceRoutes.js';
import recette from './routes/recetteRoute.js';
import produit from './routes/produitRoute.js';
import cookieParser from "cookie-parser";
import calendrier from "./routes/calendrierRoute.js";
import Upload from "./Upload.js";
import dashboard from "./routes/dashboardRoute.js";
import path from "path";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use("/api/compte", compte);
app.use("/api/service", service);
app.use("/api/recette", recette);
app.use("/api/produit", produit);
app.use("/api/calendrier", calendrier);
app.use("/api/dashboard", dashboard);
app.use("/api/upload", Upload);


const __dirname = path.resolve();

app.use("/api/backend/uploads", express.static(path.join(__dirname, "/backend/uploads")));
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}else{
    app.get('/', (req, res) => res.send('SERVER RUNNING'))
}

app.listen(PORT, console.log("SERVER RUNNING ON PORT ", PORT));
