---
layout: post
title: "Testing Languages"
author: "McG."
categories: facts
tags: [story]
image: languages.jpg
---

## Choosing the right language

For months now, I am developping some basic layers for a futur light 2D platform framework.
Started on Java, have a try on Javascript, and latest try on the Lua LÖVE platform, I am testing the options.

But any language or platform I will choosen the structure of the framework remains the same:

```text
GAME
|_ Core
|  |_ Game
|  |_ Services
|  |  |_ Physic Engine
|  |  |_ Resource Manager
|  |  |_ Entity Manager
|  |  |_ Scene Manager
|  |_ Entity
|  |  |_ GameObject
|  |  |_ TextObject
|  |  |_ MenuObject
|  |  |_ ParticleSystem
|  |  |  |_ Particle
|  |  |_ TileMap
|  |  |  |_ Layer
|  |  |  |_ Tile
|  |  |  |_ MapObject
|  |  |_ Behavior
|  |  |  |_ PlayerBehavior
|  |  |  |_ TrackingCameraBehavior
|  |  |  |_ SimpleEnemyBehavior
|_ Templates
   |_ Scene
   |_ Behavior
```

The structure is always with services, entities and some templates (or interface for Java afficionados).

## The Game class

The main entry point for this framework is the Game class.  It must propose the basic steps for any game.
The following diagramm attempts to explain what are the main steps, and introduce some *new* vocabullary.

```text
/-------\
| start |
\---+---/
    |
+---v----------------------+
| load initial resources   |
+---+----------------------+
    |
+---v---------------------------+
| initialize services resources |
+---+---------------------------+
    |
+---v---------------------------+
| Load Scenes definitions       |
+---+---------------------------+
    |
+---v---------------------------+
| Define default Scene          |
+---+---------------------------+
    |
+---v------------------------(0)+
| Initialize active Scene       |
+---+---------------------------+
    |
    +<-----<--------<---------<-------<-+
    |                                   ^
+---v--------------------------(1)+     |
| Manage Input for Game           |     |
| and the active Scene            |     |
+---+-----------------------------+     |
    |                                   |
+------------------------------(2)+     |
| Update active Scene             |     ^
+---+-----------------------------+     |
    |                                   |
+---------------------------------(3)+  |
| Draw all objects from active Scene |  |
+---+--------------------------------+  |
    |                                   |
+---v-----------------+                 ^
| Request to Quit ?   |                 |
+---+-----------------+                 |
    |  No                               |
    +--->---------->-------->---------->+
 Yes|
    v
/-------\
| End   |
\---+---/
    
```
__Figure 1 - The Main Game Loop processing__

Some new terms appear here:

- **Scene** a scene is state of the game.  It's commonly corresponding to each screen of the game, 
the Title Screen, the Menu screen, the Map, the inventory screen, the Pause screen are all some `Scene`
of the Game, having their own display, processing and behaviour.
- **Object** in the game anything having some intercaction or is displayed are objects. This is often a
`GameObjet`. It would have its own attributes and methods to be manage in the `Game` or `Scene` it is belonging to.
- **input()** is the first loop game operation when all controls from users are intercepted and intrepreted to let
the updated (next big one) to take in account those actions.
- **update()** is the second Loop game operation, updating all objects state, positions and behaviors to let player 
moves his character, enemies moves and things happen inthe world of the game. 
- **render()** is the last but not least loop game operation, to display anythings in the game.

So, the game class is mainly build around the following operations

0. Intialize Things
1. Manage Input
2. Update things
3. Render things

And loops branches to `(1)` or `(2)` while no quit request has been sent. Some little tricks are added to the main loop management to 
try and sync display and computation to avoid flickering and jitter artefacts on objects display and physics engine computation. 
We will see those details later.

### The class

So a common Game class defintion could be :

```Java
class Game {

  void Game(width,height) {}
  void initialize(){}
 
  void run(){
    initialize();
    loop();
  }
  
  void loop(){
    while(!isExitRequested()){
      dt = getCurrentTime();
      input();
      update(dt);
      render();
    }
  }
}
```

To be continued...

