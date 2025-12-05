class Point {
    x: number;
    y: number;
    radius: number = 8;
    color: string = '#3b82f6';
    velocityY: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    updatePositionwWithGravity(gravity: number, canvas: HTMLCanvasElement): void {
        this.velocityY += gravity;
        this.y += this.velocityY;
        this.constrainBounds(canvas);
    }

    protected constrainBounds(canvas: HTMLCanvasElement): void {
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));

        if (this.y == canvas.height - this.radius) {
            this.velocityY = this.velocityY * -1 * 0.5; // Reverse and reduce velocity on bounce
            if (Math.abs(this.velocityY) <= 1) {
                this.velocityY = 0;
            }
        }
    }
}