// LOGIN 
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("usuario").value.trim();
      const senha = document.getElementById("senha").value.trim();
      const mensagemErro = document.getElementById("mensagemErro");

      const dadosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuarioEncontrado = dadosSalvos.find(
        (u) => u.email === email && u.senha === senha
      );

      if (!email || !senha) {
        mensagemErro.textContent = "Preencha todos os campos.";
        return;
      }

      if (usuarioEncontrado) {
        mensagemErro.style.color = "green";
        mensagemErro.textContent = "Login realizado com sucesso!";
        setTimeout(() => {
          window.location.href = "pokedex.html";
        }, 1000);

      } else {
        mensagemErro.style.color = "red";
        mensagemErro.textContent = "E-mail ou senha incorretos.";
      }
      
    });
  }
});

// CADASTRO
document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("cadastroForm");

  if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senhaCadastro").value.trim();
      const confirmar = document.getElementById("confirmarSenha").value.trim();
      const mensagem = document.getElementById("mensagemCadastro");

      if (!nome || !email || !senha || !confirmar) {
        mensagem.textContent = "Preencha todos os campos.";
        return;
      }

      if (senha !== confirmar) {
        mensagem.textContent = "As senhas não coincidem.";
        return;
      }

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const existe = usuarios.some((u) => u.email === email);
      if (existe) {
        mensagem.textContent = "E-mail já cadastrado.";
        return;
      }

      usuarios.push({ nome, email, senha });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      mensagem.style.color = "green";
      mensagem.textContent = "Cadastro realizado com sucesso!";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
    });
  }
});

// POKÉDEX 
document.addEventListener("DOMContentLoaded", () => {
  const listaPokemons = document.getElementById("listaPokemons");
  const buscaPokemon = document.getElementById("buscaPokemon");
  const btnBuscar = document.getElementById("btnBuscar");

  if (!listaPokemons || !buscaPokemon || !btnBuscar) return;

  listaPokemons.innerHTML = "<p>Pesquise um Pokémon para começar!</p>";

  const tiposPT = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    grass: "Grama",
    electric: "Elétrico",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Venenoso",
    ground: "Terrestre",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Sombrio",
    steel: "Aço",
    fairy: "Fada"
  };

  function traduzirHabilidade(nome) {
    const traducoes = {
      "overgrow": "Supercrescimento",
      "blaze": "Chama",
      "torrent": "Torrente",
      "shield-dust": "Pó de Escudo",
      "shed-skin": "Troca de Pele",
      "run-away": "Fuga",
      "keen-eye": "Olho Vivo",
      "intimidate": "Intimidador",
      "static": "Estático",
      "lightning-rod": "Para-raios",
      "chlorophyll": "Clorofila",
      "levitate": "Levitador",
      "swift-swim": "Nado Rápido",
      "inner-focus": "Foco Interno",
      "sturdy": "Robusto",
      "synchronize": "Sincronismo",
      "pressure": "Pressão",
      "cute-charm": "Charme",
      "guts": "Coragem"
    };
    return traducoes[nome] || nome.replace("-", " ");
  }
  
  function criarCard(poke) {
    const tipoPrincipal = poke.types[0].type.name;
    const nomeTipoPT = tiposPT[tipoPrincipal] || tipoPrincipal;
    const imagem =
      poke.sprites.other["official-artwork"].front_default ||
      poke.sprites.front_default;

    const habilidades = poke.abilities
      .map((h) => traduzirHabilidade(h.ability.name))
      .join(", ");

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    card.innerHTML = `
      <img src="${imagem}" alt="${poke.name}">
      <h3>${poke.name}</h3>
      <span class="pokemon-type type-${tipoPrincipal}">
        ${nomeTipoPT}
      </span>

      <div class="pokemon-info">
        <p><strong>ID:</strong> ${poke.id}</p>
        <p><strong>Altura:</strong> ${(poke.height / 10).toFixed(1)} m</p>
        <p><strong>Peso:</strong> ${(poke.weight / 10).toFixed(1)} kg</p>
        <p><strong>Habilidades:</strong> ${habilidades}</p>
      </div>
    `;

    return card;
  }

  btnBuscar.addEventListener("click", async () => {
    const nome = buscaPokemon.value.trim().toLowerCase();
    if (!nome) {
      listaPokemons.innerHTML = "<p>Digite o nome de um Pokémon!</p>";
      return;
    }

    try {
      listaPokemons.innerHTML = "<p>Carregando...</p>";
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
      if (!resposta.ok) throw new Error("Pokémon não encontrado.");
      const poke = await resposta.json();

      listaPokemons.innerHTML = "";
      listaPokemons.appendChild(criarCard(poke));
    } catch (erro) {
      listaPokemons.innerHTML = "<p>Pokémon não encontrado.</p>";
    }
  });

  buscaPokemon.addEventListener("keypress", (e) => {
    if (e.key === "Enter") btnBuscar.click();
  });
});
