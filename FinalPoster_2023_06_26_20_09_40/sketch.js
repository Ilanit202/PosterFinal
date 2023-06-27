let backgroundImage;
let brideImage;
let xPos = -300; // (משתנה (- נקודת התחלה של הכלה
let targetX; //(משתנה (- הנקודה אליה הכלה רוצה להגיע
let targetY;
let heartColor = [247, 181, 181]; // צבע התחלתי של לבבות נופלים
let hearts = [];
let rythemSound; // משתנה- סאונד


function preload() {
  backgroundImage = loadImage("poster.jpg"); // הוספת תמונת רקע
  brideImage = loadImage("bride.png"); //הוספת תמונת כלה
rythemSound = loadSound("rythem.mp3"); // טעינת קובץ השמע
}

function setup() {
  createCanvas(600, 600); // יצירת קנבס
  targetX = 0;

  // בחירת הצבע של הלבבות
  colorPicker = createColorPicker(
    color(heartColor[0], heartColor[1], heartColor[2])
  );
  colorPicker.position(10, 10); // מיקום המלבן של בחירת הצבע
  colorPicker.input(updateHeartColor);

  rythemSound.loop(); // השמעת סאונד בלופ איך שהקוד מתחיל לעבוד

}

function draw() {
  // עדכון מיקום תמונת הרקע
  image(backgroundImage, 0, 0, width, height);

  // עדכון מיקום תמונת כלה
  let speed = 0.5; // מהירות כניסת הכלה, 0.5 ממ לשניה. כל שניה מייצגת עוד יום עד החתונה.
  if (xPos < targetX) {
    xPos = min(xPos + speed, targetX); //הגדרת משתנה של מיקום
  }

  // Display bride image
  image(brideImage, xPos, 0, 600, 600); // גודל תמונת הכלה

  // משתנה - הגודל של הלבבות
  for (let i = hearts.length - 1; i >= 0; i--) {
    hearts[i].display();
    hearts[i].update();

    if (hearts[i].isFinished()) {
      hearts.splice(i, 1);
    }
  }
}
// הגדרה של מה קורה עם העכבר
function mouseClicked() {
  // בדיקה אם העכבר בגבולות הקנבס
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    // הוספת הלב לחלל עם האופציה לשנות צבע
    if ((mouseClickedCount = 1)) {
      let heart = new Heart(
        mouseX,
        mouseY,
        color(heartColor[0], heartColor[1], heartColor[2])
      );
      hearts.push(heart);
    }

    mouseClickedCount++;
    if (mouseClickedCount > 1) {
      mouseClickedCount = 0;
    }
  }
}

function updateHeartColor() {
  heartColor = colorPicker.color().levels;
}
// המשתנים של הלבבות
class Heart {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color; // צבע לפי הצבע שבוחרים
    this.ySpeed = random(1, 3); // מהירות לב רנדומלי
    this.size = random(5, 20); //גודל לב רנדומלי
    this.alpha = 255;
  }
  // הגדרות של איך נראה הלב
  display() {
    noStroke(); //ללא קו
    fill(this.color, this.alpha); //צבע (מוגדל לפי בחירה אישית)
    heart(this.x, this.y, this.size); // גודל רנדומלי
  }

  update() {
    this.y += this.ySpeed; //מהירות, ככל שלוחצים יותר מהר כך יפול יותר מהר
    this.alpha -= 2;
  }

  isFinished() {
    return this.alpha <= 0; //הלב יעלם אחרי זמן משתנה
  }
}

// עזרה לדיוק איור הלב ההתחלתי שעליו מתבסס הקוד
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function keyPressed() {
  if (key === "s" || key === "S") {
    rythemSound.stop(); // המנגינה נעצרת אם לוחצים על "S" במקלדת
  } else if (key === "d" || key === "D") {
    rythemSound.play(); // המנגינה מתחילה מחדש בלחיצה על D במקלדת
  }
}

