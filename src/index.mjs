import app from "./app.mjs";
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default server