# Hackaton2019

For this hackaton we tried simulating the universe.
In about 24h, we had the following features:

* Flyable spaceship in space
  * Although the movement is still buggy (forward is on a fixed axis and doesn't rotate with the ship)
  * Controls are:
    * WS: forward/backward
    * AD: strafe left/right
    * QE: move up/down
    * IK: rotate up/down
    * JL: rotate left/right
    * UO: roll left/right
* Planets and suns with pretty textures
* Density/mass
* Kinematics
* Gravity
* Collision
  * The smallest planet will disappear
  * The biggest planet will absorb the smaller one
* Time control

## Running this project

I should warn you up front that this app will eat your pc.
It's not really made to be performant at all.

To run this project locally, just clone it and run `npm run start` in its root.
Make sure you have Node.js installed.

## Technicals

* It's made in the browser on a canvas
* We used three.js for 3D rendering
* We used Vue.js, but it didn't really do much
* The idea was to have a modular system where every entity could do things on its own
  * This is where the modules come in which provided the interactions, e.g. a gravity module that uses the vicinity module to look at its environment and then computes its acceleration and passes it to the physics module to have it apply the accelaration
