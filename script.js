const whatsapp = "5531971268087";

const pizzas = [
 {name:"Calabresa",preco:49.90},
 {name:"Mussarela",preco:49.90},
 {name:"Portuguesa",preco:52.90},
 {name:"Frango com Catupiry",preco:59.90},
 {name:"4 Queijos",preco:59.90},
 {name:"Marguerita",preco:49.90},
 {name:"Palmito",preco:59.90},
 {name:"Caipira",preco:52.90},
 {name:"Lombinho",preco:59.90},
 {name:"Costela",preco:69.90},
 {name:"Forno da Casa",preco:69.90}
];

const bebidas = [
 {name:"Coca-Cola 2L",preco:13.90},
 {name:"Coca-Cola Zero 2L",preco:13.90},
 {name:"Guaraná Antarctica 2L",preco:12.90}
];

let pedido = {
 pizzas:[],
 bebidas:[],
 frete:0,
 total:0
};

function mostrarEtapa(numero){

 document.querySelectorAll(".tela").forEach(tela=>{
  tela.style.display="none";
 });

 document.getElementById("etapa"+numero).style.display="block";

 const carrinho =
document.getElementById("carrinhoFlutuante");

if(numero >= 7){

 carrinho.style.display = "none";

}else{

 atualizarCarrinhoFlutuante();

}

 window.scrollTo(0,0);

}

function mostrarEtapaCustom(id){

 document.querySelectorAll(".tela").forEach(tela=>{
  tela.style.display="none";
 });

 document.getElementById(id).style.display="block";

}

function selecionarTipo(tipo){

 if(tipo==="inteira"){

  mostrarEtapaInteira();

 }else{

  mostrarEtapaMeio();

 }

}

function mostrarEtapaInteira(){

 mostrarEtapaCustom("etapa3Inteira");

 const lista =
 document.getElementById("listaSaboresInteira");

 lista.innerHTML="";

 pizzas.forEach(pizza=>{

  lista.innerHTML += `
  <div class="sabor">

   <div>
    <strong>${pizza.name}</strong>
    <br>
    <span class="preco">
    R$ ${pizza.preco.toFixed(2)}
    </span>
   </div>

   <button onclick="escolherPizza('${pizza.name}',${pizza.preco})">
   +
   </button>

  </div>
  `;

 });

}

function mostrarEtapaMeio(){

 mostrarEtapaCustom("etapa3Meio");

 const sabor1 =
 document.getElementById("sabor1");

 const sabor2 =
 document.getElementById("sabor2");

 sabor1.innerHTML="";
 sabor2.innerHTML="";

 pizzas.forEach(pizza=>{

  sabor1.innerHTML +=
  `<option>${pizza.name}</option>`;

  sabor2.innerHTML +=
  `<option>${pizza.name}</option>`;

 });

}

function escolherPizza(nome,preco){

 pedido.pizzas.push({
  sabor:nome,
  preco:preco,
  borda:false,
  precoBorda:0
 });

 mostrarEtapa(4);

}

function confirmarMeioMeio(){

 const s1 =
 document.getElementById("sabor1").value;

 const s2 =
 document.getElementById("sabor2").value;

 if(s1===s2){

  alert("Escolha dois sabores diferentes.");
  return;

 }

 const p1 =
 pizzas.find(p=>p.name===s1);

 const p2 =
 pizzas.find(p=>p.name===s2);

 pedido.pizzas.push({
 sabor:`Meio a Meio: ${s1} / ${s2}`,
 preco:(p1.preco + p2.preco)/2,
 borda:false,
 precoBorda:0
});

 atualizarCarrinhoFlutuante();

 mostrarEtapa(4);

}

function selecionarBorda(sim){

 let ultimaPizza =
 pedido.pizzas[pedido.pizzas.length - 1];

 ultimaPizza.borda = sim;
 ultimaPizza.precoBorda = sim ? 11.90 : 0;

 atualizarCarrinhoFlutuante();

 carregarBebidas();

 mostrarEtapa(5);

}


function carregarBebidas(){

 const lista =
 document.getElementById("listaBebidas");

 lista.innerHTML="";

 bebidas.forEach(item=>{

  const encontrada =
  pedido.bebidas.find(
   b=>b.nome===item.name
  );

  const qtd =
  encontrada ? encontrada.qtd : 0;

  lista.innerHTML += `
  <div class="bebida">

   <div>
    <strong>${item.name}</strong>
    <br>
    <span class="preco">
    R$ ${item.preco.toFixed(2)}
    </span>
   </div>

   <div style="display:flex;gap:10px;align-items:center">

    <button onclick="removerBebida('${item.name}')">
    -
    </button>

    <strong>${qtd}</strong>

    <button onclick="adicionarBebida('${item.name}',${item.preco})">
    +
    </button>

   </div>

  </div>
  `;

 });

}

function adicionarBebida(nome,preco){

 let bebida =
 pedido.bebidas.find(
  b=>b.nome===nome
 );

 if(bebida){

  bebida.qtd++;

 }else{

  pedido.bebidas.push({
   nome:nome,
   preco:preco,
   qtd:1
  });

 }

 carregarBebidas();
 atualizarCarrinhoFlutuante();

}

function removerBebida(nome){

 let bebida =
 pedido.bebidas.find(
  b=>b.nome===nome
 );

 if(!bebida) return;

 bebida.qtd--;

 if(bebida.qtd<=0){

  pedido.bebidas =
  pedido.bebidas.filter(
   b=>b.nome!==nome
  );

 }

 carregarBebidas();
 atualizarCarrinhoFlutuante();

}

function totalBebidas(){

 let total = 0;

 pedido.bebidas.forEach(item=>{

  total += item.preco * item.qtd;

 });

 return total;

}

function totalPizzas(){

 let total = 0;

 pedido.pizzas.forEach(pizza=>{

  total += pizza.preco;
  total += pizza.precoBorda;

 });

 return total;

}

function atualizarCarrinhoFlutuante(){

 const carrinho =
 document.getElementById("carrinhoFlutuante");

 if(!carrinho) return;

const subtotal =
totalPizzas() +
totalBebidas();

 if(subtotal<=0){

  carrinho.style.display="none";
  return;

 }

 carrinho.style.display="flex";

 let resumo = "";

 pedido.pizzas.forEach((pizza,index)=>{

 resumo += `
 <br>🍕 Pizza ${index+1}
 <br>${pizza.sabor}
 `;

 if(pizza.borda){

  resumo += `
  <br>🧀 Borda Catupiry
  `;

 }

});

 
 pedido.bebidas.forEach(item=>{

  resumo += `<br>🥤 ${item.nome} (${item.qtd}x)`;

 });

 document.getElementById("resumoFlutuante")
 .innerHTML = resumo;

 document.getElementById("totalFlutuante")
 .innerHTML =
 "R$ "+subtotal.toFixed(2);

}

function mostrarCarrinho(){

 let pizzasTexto = "";
 let subtotalPizzas = 0;

 pedido.pizzas.forEach((pizza,index)=>{

  subtotalPizzas += pizza.preco;

  if(pizza.borda){
   subtotalPizzas += 11.90;
  }

  pizzasTexto += `
  <p>
   <strong>Pizza ${index + 1}:</strong>
   ${pizza.sabor}
   ${pizza.borda ? " + Borda Catupiry" : ""}
  </p>
  `;

 });

 let bebidasTexto = "";
 let subtotalBebidas = 0;

 pedido.bebidas.forEach(item=>{

  bebidasTexto += `
  ${item.nome} (${item.qtd}x)<br>
  `;

  subtotalBebidas += item.preco * item.qtd;

 });

 if(bebidasTexto === ""){
  bebidasTexto = "Nenhuma";
 }

 const subtotal =
 subtotalPizzas + subtotalBebidas;

 document.getElementById("resumoPedido")
 .innerHTML = `

 ${pizzasTexto}

 <p>
 <strong>Bebidas:</strong><br>
 ${bebidasTexto}
 </p>

 <hr>

 <h3>
 Subtotal: R$ ${subtotal.toFixed(2)}
 </h3>

 `;

 mostrarEtapa(6);

}

function calcularFrete(){

 const subtotal =
 totalPizzas() + totalBebidas();

 pedido.frete = 0;

 pedido.total =
 subtotal + pedido.frete;

 document.getElementById("resumoFinal")
.innerHTML = `

<p><strong>Subtotal:</strong>
R$ ${subtotal.toFixed(2)}
</p>

<hr>

<h2>
Total: R$ ${pedido.total.toFixed(2)}
</h2>

`;
 mostrarEtapa(9);

}

function finalizarPedido(){

 const nome =
 document.getElementById("nome").value;

 const telefone =
 document.getElementById("telefone").value;

 const bairro =
 document.getElementById("bairro").value;

 const rua =
 document.getElementById("rua").value;

 const numero =
 document.getElementById("numero").value;

const complemento =
document.getElementById("complemento").value;

const obs =
document.getElementById("obs").value;

 let pizzasTexto = "";

 pedido.pizzas.forEach((pizza,index)=>{

  pizzasTexto +=
  ` Pizza ${index+1}: ${pizza.sabor}`;

  if(pizza.borda){

   pizzasTexto +=
   " + Borda Catupiry";

  }

  pizzasTexto += "\n";

 });

 let bebidasTexto = "";

 pedido.bebidas.forEach(item=>{

  bebidasTexto +=
  `🥤 ${item.nome} (${item.qtd}x)\n`;

 });

 const msg = `

NOVO PEDIDO - FORNO DA CASA

Nome: ${nome}

Telefone: ${telefone}

Bairro: ${bairro}

Rua: ${rua}

Número: ${numero}

Complemento: ${complemento}

--------------------------------

${pizzasTexto}

${bebidasTexto}

--------------------------------

Total: R$ ${pedido.total.toFixed(2)}

Observações:
${obs}

`;
 window.open(
 `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`,
 "_blank"
 );

}

function mostrarConfirmacao(){

 let html = "";

 let total = 0;

 pedido.pizzas.forEach((pizza,index)=>{

  html += `
   <p>
   <strong>Pizza ${index+1}</strong><br>
   ${pizza.sabor}
   </p>
  `;

  total += pizza.preco;

  if(pizza.borda){

   html += `
   <p>🧀 Borda Catupiry</p>
   `;

   total += pizza.precoBorda;

  }

  html += "<hr>";

 });

 if(pedido.bebidas.length){

  html += "<h3>Bebidas</h3>";

  pedido.bebidas.forEach(b=>{

   html += `
    <p>
    🥤 ${b.nome} x${b.qtd}
    </p>
   `;

   total += b.preco * b.qtd;

  });

 }

 html += `
 <h2>
 Total: R$ ${total.toFixed(2)}
 </h2>
 `;

 document.getElementById(
  "resumoConfirmacao"
 ).innerHTML = html;

 mostrarEtapa(7);

}

function reiniciarPedido(){

 pedido = {
  pizzas:[],
  bebidas:[],
  frete:0,
  total:0
 };

 atualizarCarrinhoFlutuante();

 mostrarEtapa(2);

}

function atualizarStatusLoja(){

 const agora = new Date();
 const dia = agora.getDay();
 const hora = agora.getHours();

 let aberta = false;

 if((dia>=2 && dia<=6) || dia===0){

  if(hora>=18 && hora<23){

   aberta=true;

  }

 }

 const status =
 document.getElementById("statusLoja");

 if(!status) return;

 if(aberta){

  status.innerHTML="🟢 Aberto Agora";
  status.className="status aberto";

 }else{

  status.innerHTML="🔴 Fechado";
  status.className="status fechado";

 }

}

atualizarStatusLoja();
mostrarEtapa(1);