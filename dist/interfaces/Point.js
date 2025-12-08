"use strict";
class Point {
    constructor(x, y) {
        this.radius = 8;
        this.color = '#3b82f6';
        this.velocity = new Velocity(0, 0);
        this.x = x;
        this.y = y;
    }
    updatePositionwWithGravity(gravity, canvas) {
        this.velocity.y += gravity;
        this.y += this.velocity.y;
        this.constrainBounds(canvas);
    }
    constrainBounds(canvas) {
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
        if ((this.y == canvas.height - this.radius) || (this.y == this.radius)) {
            this.velocity.y = this.velocity.y * -1; // Reverse and reduce velocity on bounce
            if (Math.abs(this.velocity.y) <= 1) {
                this.velocity.y = 0;
            }
        }
    }
    handleCollision(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDist = this.radius + other.radius;
        if (distance < minDist) {
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
