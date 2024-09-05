const express = require('express')
const { Client } = require('pg');

const conexao = {
  host: 'localhost',
  port: 5433,
  user: 'postgres',
  password: '123456',
  database: 'crud_produtos',
}
const app = express()
const port = 3000

app.use(express.json());

// const produtos = [
//   {id:1, nome:"feijao", preco:10, categoria:"alimento"},
//   {id:2, nome:"arroz", preco:8, categoria:"alimento"},
//   {id:3, nome:"suco de laranja", preco:12, categoria:"bebida"},
// ];

app.get('/', (req, res) => {  
  res.send("Hello World!");
})

app.get('/produtos',  async (req, res) => {
  const client = new Client(conexao);
  await client.connect();
  const result = await client.query("select * from produtos");
  const lista_produtos = result.rows;
  await client.end();

  res.json(lista_produtos);
})

app.get('/produtos/:id', async (req, res) => {
  const id = req.params.id;
  const client = new Client(conexao);
  await client.connect();
  // const result = await client.query("select * from produtos where id = "+ id);
  const result = await client.query("select * from produtos where id = $1", [id]);
  // const lista_produtos_id = result.rows;
  const produto  = result.rows[0];
  await client.end();

  if(produto){
    res.json(produto);  
  }
  else{
    res.status(404).json({erro: "Produto não encontrado"});
  }

  // res.json(lista_produtos_id);
  // res.json(produtos[0]);
})

  
app.post('/produtos', async (req, res) => {
  const produto = req.body;
  if (!produto || !produto.nome ||!produto.categoria || !produto.preco){
    res.status(400).json({erro: "Informações de produto incompletas!"});
  }

  const client = new Client(conexao);
  await client.connect();
  const result = await client.query("insert into produtos (nome, categoria, preco) values ($1, $2, $3) returning *", [produto.nome, produto.categoria, produto.preco]);
  // const lista_produtos_id = result.rows;
  const produtoInserido  = result.rows[0];
  await client.end();
  res.status(201).json(produtoInserido);
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