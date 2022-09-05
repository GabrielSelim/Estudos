var tempoInicial = $("#tempo-digitacao").text();
var campoDigitacao = $(".campo-digitacao");

$(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicilizaCronometro();
	inicilizaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);
})
function atualizaTempoInicial(tempo){
	tempoInicial = tempo;
	$("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase(){
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
	campoDigitacao.on("input", function(){
	var conteudo = campoDigitacao.val();

	var qtdPalavras = conteudo.split(/\S+/).length -1;
	$("#contador-palavras").text(qtdPalavras);

	var conteudoSemEspaco = conteudo.replace(/\s+/g,'');

	var qtdCaracteres = conteudoSemEspaco.length;
	$("#contador-caracteres").text(qtdCaracteres);
})};

function inicilizaCronometro(){

	campoDigitacao.one("focus", function(){
	var tempoRestante = $("#tempo-digitacao").text();
	var cronometroID = setInterval(function(){
		tempoRestante--;
		$("#tempo-digitacao").text(tempoRestante);
		if (tempoRestante < 1){
			clearInterval(cronometroID);
			finalizaJogo();
		}
	},1000);
})};

function finalizaJogo(){
	campoDigitacao.attr("disabled", true);
	campoDigitacao.toggleClass("campo-desativado");
	inserirPlacar();
}



function inicilizaMarcadores(){
	campoDigitacao.on("input",function(){
		var frase = $(".frase").text();
		var digitado = campoDigitacao.val();
		var comparavel = frase.substr(0,digitado.length);

		if (digitado == comparavel){
			campoDigitacao.addClass("borda-verde");
			campoDigitacao.removeClass("borda-vermelha");

		}else{
			campoDigitacao.addClass("borda-vermelha");
			campoDigitacao.removeClass("borda-verde");
		}
	})};

function reiniciaJogo(){
	$("#botao-reiniciar").click(function(){
	campoDigitacao.attr("disabled", false);
	campoDigitacao.val("");
	$("#contador-palavras").text("0")
	$("#contador-caracteres").text("0")
	$("#tempo-digitacao").text(tempoInicial)
	inicilizaCronometro();
	campoDigitacao.toggleClass("campo-desativado");
	campoDigitacao.removeClass("borda-verde");
	campoDigitacao.removeClass("borda-vermelha");
})};
