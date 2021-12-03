const sharp = require("sharp")

sharp("Webisora.svg")
  .png()
  .toFile("imagmme.png")