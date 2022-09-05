var tempoInicial = $("#tempo-digitacao").text();
var campoDigitacao = $(".campo-digitacao");

$(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicilizaCronometro();
	inicilizaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);
})
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
	var tempoRestante = $("#tempo-digitacao").text();

	campoDigitacao.one("focus", function(){
	var cronometroID = setInterval(function(){
		tempoRestante--;
		$("#tempo-digitacao").text(tempoRestante);
		if (tempoRestante < 1){
			campoDigitacao.attr("disabled", true);
			clearInterval(cronometroID);
			campoDigitacao.toggleClass("campo-desativado");
		}
	},1000);
})};
function inicilizaMarcadores(){
	var frase = $(".frase").text();
	campoDigitacao.on("input",function(){
		var digitado = campoDigitacao.val();
		var comparavel = frase.substr(0,digitado.length);
		console.log("Digitado:"+ digitado);
		console.log("Digitado C.:"+ comparavel);

		if (digitado == comparavel){
			campoDigitacao.addClass("borda-verde");
			campoDigitacao.removeClass("borda-vermelha");
		}else{
			campoDigitacao.addClass("borda-vermelha");
			campoDigitacao.removeClass("borda-verde");
		}
	});	
}


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
