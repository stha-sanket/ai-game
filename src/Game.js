
const Game = () => {
    const gameRef = React.useRef(null);

    React.useEffect(() => {
        if (gameRef.current) return;

        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game-container',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        let player;
        let cursors;

        function preload () {
            // No assets to preload yet, but this function is required.
        }

        function create () {
            // Set background color (dark grey)
            this.cameras.main.setBackgroundColor('#2a2a2a');

            // Create a central ground/path (bright yellow, larger)
            this.add.rectangle(400, 300, 400, 200, 0xFFFF00).setOrigin(0.5);

            // Create some placeholder buildings (bright red, larger and central)
            this.add.rectangle(200, 200, 150, 250, 0xFF0000).setOrigin(0.5);
            this.add.rectangle(600, 400, 180, 300, 0xFF0000).setOrigin(0.5);

            // Player (Detective) - represented by a bright green rectangle (larger and central)
            player = this.add.rectangle(400, 300, 80, 120, 0x00FF00); // x, y, width, height, color
            this.physics.add.existing(player); // Add physics to the rectangle
            player.body.setCollideWorldBounds(true);

            // Input for WASD movement
            cursors = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });
        }

        function update () {
            player.body.setVelocity(0);

            if (cursors.left.isDown) {
                player.body.setVelocityX(-160);
            } else if (cursors.right.isDown) {
                player.body.setVelocityX(160);
            }

            if (cursors.up.isDown) {
                player.body.setVelocityY(-160);
            } else if (cursors.down.isDown) {
                player.body.setVelocityY(160);
            }
        }

        gameRef.current = new Phaser.Game(config);

        // Clean up on component unmount
        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
        };
    }, []);

    return <div id="game-container" style={{ width: '800px', height: '600px' }}></div>;
};
