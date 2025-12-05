class Point {
    x: number;
    y: number;
    radius: number;
    color: string;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 8;
        this.color = '#3b82f6';
    }

    updatePositionwWithGravity(gravity: number, canvas: HTMLCanvasElement): void {
        this.y += gravity;
        this.constrainBounds(canvas);
    }

    protected constrainBounds(canvas: HTMLCanvasElement): void {
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
    }
}