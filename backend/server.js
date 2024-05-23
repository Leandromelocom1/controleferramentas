const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your_secret_key'; // Substitua por uma chave secreta mais segura

app.use(cors({ origin: 'http://192.168.254.108:3000' })); // Substitua pelo IP da sua máquina, onde está rodando o frontend
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/tool_management';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  permissions: [String],
});

const toolSchema = new mongoose.Schema({
  toolName: String,
  description: String,
  toolId: String,
  serialNumber: String,
  status: { type: String, default: 'Em aberto' },
  problemDescription: String,
  solutionDescription: String,
  responsible: String
});

const workSchema = new mongoose.Schema({
  client: String,
  workAddress: String,
  workPeriod: String
});

const User = mongoose.model('User', userSchema);
const Tool = mongoose.model('Tool', toolSchema);
const Work = mongoose.model('Work', workSchema);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, permissions: user.permissions }, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.get('/users', async (req, res) => {
  const users = await User.find({}, 'username permissions');
  res.json(users);
});

app.patch('/users/:id', async (req, res) => {
  const { permissions } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { permissions }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Rotas para ferramentas
app.post('/tools', async (req, res) => {
  const { toolName, description, toolId, serialNumber, status, problemDescription, solutionDescription, responsible } = req.body;
  try {
    const newTool = new Tool({ toolName, description, toolId, serialNumber, status, problemDescription, solutionDescription, responsible });
    await newTool.save();
    res.json(newTool);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar a ferramenta' });
  }
});

app.get('/tools', async (req, res) => {
  const { status } = req.query;
  let query = {};
  if (status && status !== 'Todas') {
    query.status = status;
  }
  try {
    const tools = await Tool.find(query);
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as ferramentas' });
  }
});

app.patch('/tools/:id', async (req, res) => {
  try {
    const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tool);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a ferramenta' });
  }
});

app.get('/tools/available', async (req, res) => {
  try {
    const tools = await Tool.find({ status: 'Em estoque' });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as ferramentas disponíveis' });
  }
});

app.post('/works', async (req, res) => {
  const { client, workAddress, workPeriod } = req.body;
  try {
    const newWork = new Work({ client, workAddress, workPeriod });
    await newWork.save();
    res.json(newWork);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar a obra' });
  }
});

app.get('/works', async (req, res) => {
  try {
    const works = await Work.find();
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar as obras' });
  }
});

app.listen(PORT, '192.168.254.108', () => {
  console.log(`Server is running on port ${PORT}`);
});
