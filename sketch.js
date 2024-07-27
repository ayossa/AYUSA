let branches = [];
let angle = 0;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  colorMode(HSB);
  
  // Initialize tree branches
  branches.push(new Branch(width / 2, height, -90, 120, 12));
}

function draw() {
  background(0);

  // Update angle for animation
  angle += 0.5;
  
  // Draw each branch
  for (let branch of branches) {
    branch.update();
    branch.display();
  }
}

class Branch {
  constructor(x, y, angle, length, depth) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.length = length;
    this.depth = depth;
    this.children = [];
    this.color = color(random(360), 80, 100);
    
    if (depth > 0) {
      this.createChildren();
    }
  }
  
  createChildren() {
    let newLength = this.length * 0.7;
    let newDepth = this.depth - 1;
    let branchAngle = 30;

    this.children.push(new Branch(
      this.x + cos(this.angle - branchAngle) * this.length,
      this.y + sin(this.angle - branchAngle) * this.length,
      this.angle - branchAngle + random(-angle, angle),
      newLength,
      newDepth
    ));
    
    this.children.push(new Branch(
      this.x + cos(this.angle + branchAngle) * this.length,
      this.y + sin(this.angle + branchAngle) * this.length,
      this.angle + branchAngle + random(-angle, angle),
      newLength,
      newDepth
    ));
  }
  
  update() {
    this.angle += sin(angle) * 0.2;
    for (let child of this.children) {
      child.update();
    }
  }
  
  display() {
    stroke(this.color);
    strokeWeight(this.depth);
    line(this.x, this.y, this.x + cos(this.angle) * this.length, this.y + sin(this.angle) * this.length);
    
    for (let child of this.children) {
      child.display();
    }
  }
}
