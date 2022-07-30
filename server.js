const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.post("/solve", (req, res) => {
  const options = {
    method: "POST",
    url: "https://sudoku-solver7.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "sudoku-solver7.p.rapidapi.com",
    },
    data: `{"data":"${req.body.numbers}"}`,
  };

  axios
    .request(options)
    .then((response) => {
      //   populate(response.data.data.canBeSolved, response.data.data.solution);
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

app.post("url", (req, res) => {
  res.json(data);
});

//instead of fetch, axios uses .request
// const x = {
//     method: 'POST',
//     url: 'api_url',
//     headers: {
//         'content-type': 'application/json',
//         'api_key': process.env.API_KEY,
//         'api_host': 'sudoku.solver'
//     },
//     data: req.body.numbers
// }

// axios.request(x).then((response) => {
//     res.json(response.body)
// }).catch(error => {
//     console.log(error)
// })
