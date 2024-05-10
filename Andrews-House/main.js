import { k } from "./kaboomCtx";
import { scaleFactor } from "./constants";
import { displayDialog, setCamScale } from "./utils";
import { dialogueData } from "./constants";

// loads assets
k.loadSprite("spritesheet", "./spritesheet.png", {
  sliceX: 39,
  sliceY: 31,
  anims: {
    "idle-down": 936,
    "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
    "idle-side": 975,
    "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
    "idle-up": 1014,
    "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
  },
});

k.loadSprite("map", "./map.png");

// sets up background color
k.setBackground(k.Color.fromHex("#311047"));

// defines a scene
k.scene("main", async () => {
  // logic for the scene
  const mapData = await (await fetch("./map.json")).json();
  const layers = mapData.layers;
  // create map and add it to canvas
  const map = k.add([
    k.sprite("map"), // use the loaded sprite (17 lines)
    k.pos(0),
    k.scale(scaleFactor),
  ]);

  const player = k.make([
    k.sprite("spritesheet", { anim: "idle-down" }),
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 10, 10),
    }),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor),
    {
      myspeed: 100,
      mydirection: "down",
      myisInDialog: false,
    },
    "player",
  ]);

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.myisInDialog = true;

            console.log(boundary.name);
            // display dialog
            displayDialog(dialogueData[boundary.name], () => {
              player.myisInDialog = false; // so that the player can move again
            });
          });
        }
      }
      continue; // ???
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);
          continue;
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  k.onMouseDown((mouseBtn) => {
    if (player.myisInDialog) return;
    if (mouseBtn !== "left") return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.myspeed);

    const mouseAngle = player.pos.angle(worldMousePos);
    const lowerBound = 50;
    const upperBound = 125;

    // imagine there is a circle around the player
    // the below is between 50 and 125 degrees
    if (
      mouseAngle > lowerBound &&
      mouseAngle < upperBound &&
      player.curAnim() !== "walk-up"
    ) {
      player.play("walk-up");
      player.mydirection = "up";
      return;
    }

    // -125 to -50 degrees
    if (
      mouseAngle < -lowerBound &&
      mouseAngle > -upperBound &&
      player.curAnim() !== "walk-down"
    ) {
      player.play("walk-down");
      player.mydirection = "down";
      return;
    }

    if (Math.abs(mouseAngle) > upperBound) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");

      player.mydirection = "right";
      return;
    }

    if (Math.abs(mouseAngle) < lowerBound) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");

      player.mydirection = "left";
      return;
    }
  });

  function stopAnims() {
    if (player.mydirection === "down") {
      player.play("idle-down");
      return;
    }

    if (player.mydirection === "up") {
      player.play("idle-up");
      return;
    }

    player.play("idle-side");
  }

  k.onMouseRelease(() => {
    stopAnims();
  });

  k.onKeyDown((key) => {
    if (player.myisInDialog) return;

    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];
    console.log(keyMap);

    let numberOfKeysPressed = 0;
    for (const key of keyMap) {
      if (key) {
        numberOfKeysPressed++;
      }
    }

    if (numberOfKeysPressed > 1) return;

    // right key down
    if (keyMap[0]) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.mydirection = "right";
      player.move(player.myspeed, 0);
      return;
    }

    // left key down
    if (keyMap[1]) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.mydirection = "left";
      player.move(-player.myspeed, 0);
      return;
    }

    // up key down
    if (keyMap[2]) {
      if (player.curAnim() !== "walk-up") player.play("walk-up");
      player.mydirection = "up";

      player.move(0, -player.myspeed);
      return;
    }

    // down key down
    if (keyMap[3]) {
      if (player.curAnim() !== "walk-down") player.play("walk-down");
      player.mydirection = "down";
      player.move(0, player.myspeed);
    }
  });

  k.onKeyRelease(() => {
    stopAnims();
  });
});

// go to the scene "main"
k.go("main");
