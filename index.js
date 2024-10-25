const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(cors());

app.get("/api/cotisation/:id", async (req, res) => {
  const { id } = req.params; // Récupérer l'ID depuis les paramètres d'URL
  try {
    const url = `https://hfsql.rbtech.fr/cotisation/check/${id}`; // Utiliser l'ID dynamique
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})