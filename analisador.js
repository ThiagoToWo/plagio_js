/* Essa classe é responsável por calcular a porcentagem de palavras em
* comum de dois textos relativamente ao total de palavras diferentes
* usadas neles.
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
		var t1 = this.criarTokens(texto1);
		var t2 = this.criarTokens(texto2);
		
		// Calculamos quantas palavras tem na união dos dois textos.
		var p1_uniao_p2 = this.uniao(t1, t2).length;
		
		// Calculamos quantas palavras os dois textos tem em comum.
		var p1_inter_p2 = this.intersecao(t1, t2).length;
		
		// porcentagem de semelhança.
		var semelhanca = 100 * (p1_inter_p2 / p1_uniao_p2);
		
		// o método retorna a semelhança com uma casa decimal.
		return Number(semelhanca).toFixed(1); 
	},
	
	// Cria um relatório em formato padrão com nomes dos autores, textos elementFromPoint
	// suas palavras, palavras em comum e semelhança.
	criarRelatorio: function(autor1, texto1, autor2, texto2) {
		// prepara as variáveis do relatório;
		var t1 = this.criarTokens(texto1);
		var t2 = this.criarTokens(texto2);
		var p1 = this.elementosDiferentes(t1);
		var p2 = this.elementosDiferentes(t2);
		
		// Usa as palavras diferentespara agilizar união e intersação.
		var p1Up2 = this.uniao(p1, p2);
		var p1Ip2 = this.intersecao(p1, p2);
		
		// Aproveita as variáveis para caucular a semelhança evitando chamar
		// repetidamente as mesmas funções já usadas nelas.
		var semelhanca = Number(100 * (p1Ip2.length / p1Up2.length)).toFixed(1);
		
		// cria o texto do relatório.
		var textoRelator = '<h1>Relatório de semelhança.</h1>' +
			'<h2>' + autor1 + ' x ' + autor2 + '<h2>' +
			'<h3>Semelhança = ' + semelhanca + '%</h3>' +
			'<b>Texto 1 (' + t1.length + ' palavras): </b>' + texto1 + '<br><br>' +
			'<b>Texto 2 (' + t2.length + ' palavras): </b>' + texto2 + '<br><br>' +
			'<b>Palavras diferentes do texto 1 (' + p1.length + ' palavras): </b>' + p1.valueOf() + '<br><br>' +	
			'<b>Palavras diferentes do texto 2 (' + p2.length + ' palavras): </b>' + p2.valueOf() + '<br><br>' +
			'<b>Palavras comuns aos dois textos (' + p1Ip2.length + ' palavras): </b>' + p1Ip2.valueOf() + '<br><br>';				
		
		return textoRelator; 
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
		
		// O novo array tem os elementos sem repetições.
		return novo_array;
	},
	
	criarTokens: function(texto) {
		// faz o split normal com regex.
		var split = texto.split(REGEX);
		
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
		
		// tira os elementos repetidos e retorna o conjunto intersação.
		return this.elementosDiferentes(inter);
	}
}