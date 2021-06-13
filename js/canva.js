const init = () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  console.log(canvas)

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const context = canvas.getContext("2d");

  context.fillStyle = 'red';
  context.fillRect(0,0,50,50);

  context.beginPath();
  context.moveTo(50, 50);
  context.lineTo(100, 100);
  context.lineTo(100, 150);
  context.strokeStyle = '#dd3';
  context.stroke();

  context.beginPath();
  context.arc(200, 500, 50, 0, Math.PI * 2, false);
  context.strokeStyle = 'blue';
  context.stroke();

  context.clearRect(0, 0, canvas.width, canvas.height);


  class Circle {
    
    constructor(context, x, y , directionX, directionY, radius, canvas, color) {
      this.context = context;
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.radius = radius;
      this.canvas = canvas;
      this.color = color;
    }

    draw() {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.context.strokeStyle = this.color;
      this.context.stroke();
    }

    update() {

      if (this.x > this.canvas.width - this.radius  ) {
        this.directionX = -this.directionX;
        this.x = this.canvas.width - this.radius;
        // return;
      }

      if ( this.x < this.radius ) {
        this.directionX = -this.directionX;
        this.x = this.radius;
        // return;
      }

      if (this.y > this.canvas.height - this.radius ) {
        this.directionY = -this.directionY;
        this.y = this.canvas.height - this.radius;
        // return;
      }

      
      if ( this.y < this.radius ) {
        this.directionY = -this.directionY;
        this.y =  this.radius;
        // return;
      }
  
      this.y += this.directionY;
      this.x += this.directionX;

      this.draw();
    }
    
  }

  const circles = [];
  const colors = ['blue', 'red', 'yellow', 'green', 'black', 'purple'];

  for(let i = 0; i < 50; i++) {
    circles.push(new Circle(
        context,
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        (Math.random() - .5 ) * 10,
        (Math.random() - .5 ) * 10,
        50,
        canvas,
        colors[Math.trunc(Math.random() * 6)],
      )
    );
  }

  const animate = () => {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
      circle.update();
    })

  }

  animate();

}

init();