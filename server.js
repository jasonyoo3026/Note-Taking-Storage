const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

require("./routes/html")(app);
require("./routes/apiMethod")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);