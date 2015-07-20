<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name ="description" content = "Lutte contre la polution, Preservons la nature, Ensemble , unités">
		<link rel="stylesheet" href="style.css" />
		<script type="text/javascript" src="libraryJquery.js"></script>
		<script type="text/javascript" src="mon_js.js"></script>
		<title>My Paint</title>
	</head>
		
	<body>
		<div id="container">
			<canvas id="papier">	
			</canvas>

			<div id="mode">
				<div class="button">crayon</div>
				<div class="button">ligne</div>
				<div class="button">rectangle</div>
				<div class="button">cercle</div>
				<div class="button">texte</div>
			</div>
				
			<div id="form">
				<form>
					<label>Largeur trait</label>
					<input type="range" min="2" max="50" value="1" id="largeur" name="epaisseur"/>
					
					<label>Taille texte</label>
					<input type="range" min="2" max="100" value="1" id="size" />
				</form>
			</div>

			<div id="los_colores">
				<label for="color_trait">Couleur trait</label>
				<input type="color" id="color_trait" />

				<label for="color_fond">Couleur du fond</label>
				<input type="color" id="color_fond" name="color_fond" />
			</div>
			
			<div id="boutton">

				<button id="reset">Reset canvas</button>
				<button id="affiche">Voir</button>

				<a id="download" download="Canvas.png">Download Canvas</a>
			</div>
		</div>
	</body>
</html>