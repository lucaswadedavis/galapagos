#Galapagos

Is a project to breed jewelery using Three.js and 3d printing.

To save a pendant's genes in the genepool for future generations press the "L" key.

To kill a particular pendant and generate a new one press the "N" key.

Initially pendants are randomly generated, but future pendants inherit their genes from prior generations (with the possibility of mutation).

Pendants can be downloaded as STL files and printed via Sculpteo (or whatever).

###TODO:
* the Three.js renderer doesn't have an easy way to clear itself, so things start to slow down once several selections have been made
* I'd prefer on-screen selection methods in addition to the keyboard input
* On screen camera-angle control (instead of the current auto-rotation)
