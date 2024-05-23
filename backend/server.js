const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://192.168.0.78:3000' })); // Substitua pelo IP da sua máquina, onde está rodando o frontend
app.use(express.json());

const mongoURI = 'mongodb://localhost:27017/tool_management';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const toolSchema = new mongoose.Schema({
  toolName: String,
  responsible: String,
  employee: String,
  status: { type: String, default: 'Em aberto' }
});

const Tool = mongoose.model('Tool', toolSchema);

app.post('/tools', async (req, res) => {
  console.log("POST /tools called with body:", req.body);
  const { toolName, responsible, employee, status } = req.body;
  try {
    const newTool = new Tool({ toolName, responsible, employee, status });
    await newTool.save();
    res.json(newTool);
  } catch (error) {
    console.error("Erro ao salvar a ferramenta:", error);
    res.status(500).json({ error: 'Erro ao salvar a ferramenta' });
  }
});

app.get('/tools', async (req, res) => {
  console.log("GET /tools called with query:", req.query);
  const { status } = req.query;
  let query = {};
  if (status && status !== 'Todas') {
    query.status = status;
  }
  try {
    const tools = await Tool.find(query);
    res.json(tools);
  } catch (error) {
    console.error("Erro ao buscar as ferramentas:", error);
    res.status(500).json({ error: 'Erro ao buscar as ferramentas' });
  }
});

app.patch('/tools/:id', async (req, res) => {
  console.log(`PATCH /tools/${req.params.id} called with body:`, req.body);
  try {
    const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tool);
  } catch (error) {
    console.error("Erro ao atualizar a ferramenta:", error);
    res.status(500).json({ error: 'Erro ao atualizar a ferramenta' });
  }
});

app.listen(PORT, '192.168.0.78', () => {
  console.log(`Server is running on port ${PORT}`);
});
