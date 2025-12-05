"use strict";
class FluidSim {
    constructor() {
        this.referencePoint = null;
        this.gravity = 1;
        this.animate = () => {
            if (this.referencePoint) {
                this.referencePoint.updatePositionwWithGravity(this.gravity, this.canvas);
            }
            this.draw();
            this.animationFrameId = requestAnimationFrame(this.animate);
        };
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        // Set canvas size
        this.canvas.width = Math.min(1000, window.innerWidth - 40);
        this.canvas.height = 600;
        this.animationFrameId = null;
        this.setupEventListeners();
        this.start();
    }
    setupEventListeners() {
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        window.addEventListener('resize', () => this.handleResize());
        const updateBtn = document.getElementById('updateGravityBtn');
        if (updateBtn) {
            updateBtn.addEventListener('click', () => {
                const gravityInput = document.getElementById('gravity');
                this.gravity = parseInt(gravityInput.value);
            });
        }
    }
    handleCanvasClick(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.referencePoint = new Point(x, y);
    }
    handleResize() {
        // Redraw on resize if needed
        const newWidth = Math.min(1000, window.innerWidth - 40);
        const newHeight = 600;
        if (newWidth !== this.canvas.width) {
            this.canvas.width = newWidth;
        }
        if (newHeight !== this.canvas.height) {
            this.canvas.height = newHeight;
        }
    }
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw grid (optional, for visual appeal)
        this.drawGrid();
        if (this.referencePoint) {
            this.drawPoint(this.referencePoint);
        }
    }
    drawGrid() {
        const gridSize = 50;
        this.ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.canvas.width; i += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, this.canvas.height);
            this.ctx.stroke();
        }
        for (let i = 0; i <= this.canvas.height; i += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(this.canvas.width, i);
            this.ctx.stroke();
        }
    }
    start() {
        this.animationFrameId = requestAnimationFrame(this.animate);
    }
    stop() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
    drawPoint(point) {
        this.ctx.fillStyle = point.color;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        this.ctx.fill();
        // Add shadow/outline
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
}
// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new FluidSim();
    });
}
else {
    new FluidSim();
}
