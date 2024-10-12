const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const fs = require("fs");
const db = require("./db");
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/submit-form", (req, res) => {
  const { formType, name, countryCode, phoneNumber } = req.body;
  const query = `INSERT INTO forms (form_type, name, country_code, phone_number) VALUES (?, ?, ?, ?)`;
  db.query(query, [formType, name, countryCode, phoneNumber], (err, result) => {
    if (err) throw err;
    res.send("Form data saved.");
  });
});

app.get("/get-data", (req, res) => {
  db.query("SELECT * FROM forms", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

const credentials = JSON.parse(fs.readFileSync("credentials.json"));

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function syncDataToGoogleSheet(req, res) {
  try {
    const sheets = google.sheets({ version: "v4", auth });

    const query = `SELECT form_type, name, country_code, phone_number FROM forms`;
    db.query(query, async (err, results) => {
      if (err) {
        console.error("Error fetching data from database:", err);
        return res.status(500).json({ error: "Database error" });
      }

      const rows = results.map((row) => [
        row.form_type,
        row.name,
        row.country_code,
        row.phone_number,
      ]);

      const spreadsheetId = process.env.SPREADSHEET_ID;
      const range = "Sheet1!A2";

      await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: "Sheet1!A2:D",
      });

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: {
          values: rows,
        },
      });

      res.json({
        message: "Data synchronized with Google Sheet successfully!",
      });
    });
  } catch (error) {
    console.error("Error syncing with Google Sheets:", error);
    res.status(500).json({ error: "Error syncing with Google Sheets" });
  }
}

app.post("/sync-data", syncDataToGoogleSheet);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
