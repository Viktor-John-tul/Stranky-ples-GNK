function Test(name, classname, collector, email, sitting, standing, price){
    // Airtable API credentials
    const API_KEY = "patmdEVIyv5lVjw2L.4c8bd39606a63a896472da5a3cc5bea0ab9fa63d1b4f283752a0c3ae51bbf6d8";
    const BASE_ID = "appUbsqZbU0PvrwS8";
    const TABLE_NAME = "tblOLSQ2eJyW9WT3u";

    const milliseconds = Date.now(); // Current time in milliseconds since 1970
    const timestamp = milliseconds.toString().slice(-10)

    const apiKey = 'patmdEVIyv5lVjw2L.4c8bd39606a63a896472da5a3cc5bea0ab9fa63d1b4f283752a0c3ae51bbf6d8';
    const baseId = 'appUbsqZbU0PvrwS8';
    const tableName = 'tblOLSQ2eJyW9WT3u';

    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    };

    const data = {
    fields: {
        "VS": parseInt(timestamp),
        "Name": name,
        "Class": classname,
        "Collector": collector,
        "Email": email,
        "Sitting": sitting,
        "Standing": standing,
        "Price": price
    }
    };

    fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    };