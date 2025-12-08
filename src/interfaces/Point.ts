class Point {
    x: number;
    y: number;
    radius: number = 8;
    color: string = '#3b82f6';
    velocity: Velocity = new Velocity(0, 0);

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    updatePositionwWithGravity(gravity: number, canvas: HTMLCanvasElement): void {
        this.velocity.y += gravity;
        this.y += this.velocity.y;
        this.constrainBounds(canvas);
    }

    private constrainBounds(canvas: HTMLCanvasElement): void {
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));

        if ((this.y == canvas.height - this.radius) || (this.y == this.radius)) {
            this.velocity.y = this.velocity.y * -1; // Reverse and reduce velocity on bounce
            if (Math.abs(this.velocity.y) <= 1) {
                this.velocity.y = 0;
            }
        }
    }

    public handleCollision(other: Point): void {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = this.radius + other.radius;
        if (distance < minDist) { // collision has occured
            const angle = Math.atan2(dy, dx);
            const targetX = this.x + Math.cos(angle) * minDist;
            const targetY = this.y + Math.sin(angle) * minDist;
            const ax = (targetX - other.x) * 0.5;
            const ay = (targetY - other.y) * 0.5;
            this.x -= ax;
            this.y -= ay;
            other.x += ax;
            other.y += ay;
        }
    }


}