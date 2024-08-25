const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // To parse JSON request bodies

const cors = require('cors');
app.use(cors());

// GET endpoint for /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// POST endpoint for /bfhl
app.post('/bfhl', (req, res) => {
  const data = req.body.data;

  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, error: 'Invalid input data format' });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = '';

  // Separate numbers and alphabets
  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (typeof item === 'string') {
      alphabets.push(item);
      // Check for the highest lowercase alphabet
      if (item >= 'a' && item <= 'z' && item > highestLowercaseAlphabet) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  // Construct response
  const response = {
    is_success: true,
    user_id: 'john_doe_17091999', // Example user_id, replace with your logic
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
  };

  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
