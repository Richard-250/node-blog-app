import app from "./app.mjs";
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const io = server
export default io