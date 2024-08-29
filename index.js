const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const produtos = [
  {id:1, nome:"feijao", preco:10, categoria:"alimento"},
  {id:2, nome:"arroz", preco:8, categoria:"alimento"},
  {id:3, nome:"suco de laranja", preco:12, categoria:"bebida"},
];

app.get('/', (req, res) => {  
  res.send("Hello World!");
})

app.get('/produtos', (req, res) => {
  res.json(produtos);
})

app.get('/produtos/:id', (req, res) => {
  const id = req.params.id;

  res.json(produtos[0]);
})

  
app.post('/produtos', (req, res) => {
  const produto = req.body;
  console.log(produto);
  
  res.status(201).json(produtos[0]);
})

app.put('/produtos/:id', (req, res) => {
  const id = req.params.id;
  const produto = req.body;
  console.log(produto);

  res.json(produtos[0]);
})

app.delete('/produtos/:id', (req, res) => {
  const id = req.params.id;

  res.json(produtos[0]);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})