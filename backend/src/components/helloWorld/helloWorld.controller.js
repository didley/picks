const getHelloWorld = (req, res) => {
  res.json({ response: "World" });
};

export default { getHelloWorld };
