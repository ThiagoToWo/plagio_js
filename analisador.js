/* Essa classe é responsável por pegar os dois textos passados em seu
* construtor e calcular a porcentagem de palavras em comum aos dois
* relativamente ao total de palavras diferentes usadas neles.
*
* semelhança = 100 * palavras em comum / total de palavras dif. dos dois
* textos.*/

// Expressão regular dos caracteres comuns que separam as palavras.
const REGEX = /[. ,():;\n\t]/;

// Função construtora.
function Analisador() {
	this.textos = [];	
}

// Protótipo de funções.
Analisador.prototype = {
	// Adiciona textos ao analisador.
	adicionar: function(texto) {
		this.textos.push(texto);
	},
	
	// Calcula a semelhança entre dois textos.
	calcularSemelhanca: function(texto1, texto2) {
		// Separa os tokens não vazios do texto usando expressão regular.
		var t1 = this.criarTokens(texto1, REGEX);
		var t2 = this.criarTokens(texto2, REGEX);
		
		// Calculamos quantas palavras tem na união dos dois textos.
		var p1_uniao_p2 = this.uniao(t1, t2).length;
		
		// Calculamos quantas palavras os dois textos tem em comum.
		var p1_inter_p2 = this.intersecao(t1, t2).length;
		
		// porcentagem de semelhança.
		var semelhanca = 100 * (p1_inter_p2 / p1_uniao_p2);
		
		// o método retorna a semelhança com uma casa decimal.
		return new Number(semelhanca).toFixed(1); 
	},
	
	// Cria e retorna um array de i objetos, no qual cada atributo j desses
	// objetos é a semelhança entre os textos i e j no array de textos.
	biblioteca: function() {
		var lib = [];	// array de objetos texto.	
		for (var i in this.textos) {
			// Para cada texto do array de textos, crio um objeto texto
			// vazio.
			var texto = {};
			for (var j in this.textos) {
				// Calculo a semelhança entre o texto i com todos os textos
				// do array de textos.
				var sem = this.calcularSemelhanca(this.textos[i], this.textos[j]);
				// Coloco seguidamente esses valores no atributo j do
				// objeto texto.
				texto[j] = sem;
			}
			lib.push(texto); // Adiciono o objeto ao array.
		}
		return lib;
	},
	
	// métodos auxiliares.
	elementosDiferentes: function(array) {
		dict = {}; // cria um dicionário (objeto vazio).
		
		for (var i = 0; i < array.length; i++) {
			// Adiciona em cada chave o mesmo valor no array.
			// Isso obriga valores diferentes ficarem na mesma chave,
			// eliminando chaves duplicadas.
			dict[array[i]] = array[i]; 
		}
		
		var novo_array = []; // cria um novo array vazio.
		
		for (var key in dict) {
			// insere as chaves no novo array.
			novo_array.push(key);
		}
		
		// O tamanho do novo array é a quantidade de elementos
		// sem repetição.
		return novo_array;
	},
	
	criarTokens: function(texto, regex) {
		// faz o split normal com regex.
		var split = texto.split(regex);
		
		// Como o split() deixa elementos nulos e eles não são
		// contados como palavras, a iteração abaixo remove eles
		// do array.
		for (var i = 0; i < split.length; i++) {
			if(split[i] == '') {
				split.splice(i, 1);
				// Retorna o índice para acompanhar o rearranjo
				//causado pelo splice().				
				i--; 
			}
		}
		
		// retorna o array sem strings vazios.
		return split;
	},

	uniao: function(array1, array2) {
		//Retorna os elementos diferentes da concatenação dos dois arrays.
		return this.elementosDiferentes(array1.concat(array2));
	},
	
	intersecao: function(array1, array2) {
		var inter = [];
		
		// Cada elemento do array1 que estiver no array2 entra na interseção
		for (var i in array1) {
			if (array2.indexOf(array1[i]) != -1) {
				inter.push(array1[i]);
			}
		}
		
		return this.elementosDiferentes(inter);
	}
}