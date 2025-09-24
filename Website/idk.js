const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Required for making API calls

const app = express();
const port = 5000; // Standard port for HTTPS

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Self-signed certificate configuration
const options = {
  key: fs.readFileSync('key.pem'), // Path to private key
  cert: fs.readFileSync('cert.pem'), // Path to certificate
};

// Airtable API configuration
const airtableApiKey = 'patmdEVIyv5lVjw2L.4c8bd39606a63a896472da5a3cc5bea0ab9fa63d1b4f283752a0c3ae51bbf6d8'; // Replace with your Airtable API key
const baseId = 'appUbsqZbU0PvrwS8'; // Replace with your Airtable base ID
const tableName = 'tblOLSQ2eJyW9WT3u'; // Replace with your Airtable table name

// Endpoint to handle the frontend request
app.post('/Website', async (req, res) => {
  const { name, classname, collector, email, sitting, standing, price } = req.body;

  const milliseconds = Date.now(); // Current time in milliseconds since 1970
  const timestamp = milliseconds.toString().slice(-10);

  const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  const airtableHeaders = {
    Authorization: `Bearer ${airtableApiKey}`,
    'Content-Type': 'application/json',
  };

  const airtableData = {
    fields: {
      "VS": parseInt(timestamp),
      "Name": name,
      "Class": classname,
      "Collector": collector,
      "Email": email,
      "Sitting": parseInt(sitting),
      "Standing": parseInt(standing),
      "Price": parseInt(price),
    },
  };

  try {
    // Send data to Airtable
    const airtableResponse = await fetch(airtableUrl, {
      method: 'POST',
      headers: airtableHeaders,
      body: JSON.stringify(airtableData),
    });

    const airtableResult = await airtableResponse.json();

    if (airtableResponse.ok) {
      res.json({
        success: true,
        message: 'Data successfully sent to Airtable and received by the backend!',
        airtableResult,
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to send data to Airtable',
        airtableError: airtableResult,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Start the HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`Server is running at https://<your-ip-address>`);
});