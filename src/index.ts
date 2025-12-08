class FluidSim {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private animationFrameId: number | null;
    private points: Point[] = [];
    private gravity: number = 1;

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        
        // Set canvas size
        this.canvas.width = Math.min(1000, window.innerWidth - 40);
        this.canvas.height = 600;
        this.animationFrameId = null;

        this.setupEventListeners();
        this.start();
    }

    private setupEventListeners(): void {
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        window.addEventListener('resize', () => this.handleResize());

        const updateBtn = document.getElementById('updateGravityBtn') as HTMLButtonElement;
        if (updateBtn) {
            updateBtn.addEventListener('click', () => {
                const gravityInput = document.getElementById('gravity') as HTMLInputElement;
                this.gravity = parseInt(gravityInput.value);
            });
        }
    }

    private handleCanvasClick(event: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.points.push(new Point(x, y));

    }

    private handleResize(): void {
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

    private draw(): void {
        // Clear canvas
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid (optional, for visual appeal)
        this.drawGrid();

        if (this.points.length > 0) {
            this.points.forEach(point => this.drawPoint(point));
        }
    }

    private drawGrid(): void {
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

    private animate = (): void => {
        if (this.points.length > 0) {
            this.handlePointCollisions();
            this.points.forEach(point => point.updatePositionwWithGravity(this.gravity, this.canvas));
            this.updatevelocityDisplay(this.points);
        }
        this.draw();
        this.animationFrameId = requestAnimationFrame(this.animate);
    };

    private start(): void {
        this.animationFrameId = requestAnimationFrame(this.animate);
    }

    public stop(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    private drawPoint(point: Point): void {
        this.ctx.fillStyle = point.color;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        this.ctx.fill();

        // Add shadow/outline
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    private updatevelocityDisplay(points: Point[]): void {
        const velocityInfo = document.getElementById('velocity');
        if (velocityInfo && points.length > 0) {
            velocityInfo.textContent = `${points.reduce((total, next) => total + next.velocity.magnitude(), 0) / points.length} pixels/frame`;
        }
    }

    private handlePointCollisions(): void {
        for (let i = 0; i < this.points.length; i++) {
            for (let j = i + 1; j < this.points.length; j++) {
                this.points[i].handleCollision(this.points[j]);
            }
        }
    }

}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new FluidSim();
    });
} else {
    new FluidSim();
}
