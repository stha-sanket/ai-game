const Game = () => {
    const gameRef = React.useRef(null);

    React.useEffect(() => {
        if (gameRef.current) return;

        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'root',
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
            // You can load assets here later
        }

        function create () {
            // Set background color
            this.cameras.main.setBackgroundColor('#2a2a2a');

            // Create a simple ground/path
            this.add.rectangle(400, 550, 800, 100, 0x333333).setOrigin(0.5);

            // Create some placeholder buildings
            this.add.rectangle(150, 400, 100, 200, 0x666666).setOrigin(0.5);
            this.add.rectangle(650, 450, 120, 150, 0x666666).setOrigin(0.5);

            // Player (Detective) - represented by a blue square for now
            player = this.physics.add.image(100, 500, 'player'); // 'player' is a placeholder key
            player.setOrigin(0.5);
            player.setCollideWorldBounds(true);
            player.setDisplaySize(40, 60); // Set size for the detective
            player.setTint(0x00aaff); // Blue color for detective

            // Input for WASD movement
            cursors = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });
        }

        function update () {
            player.setVelocity(0);

            if (cursors.left.isDown) {
                player.setVelocityX(-160);
            } else if (cursors.right.isDown) {
                player.setVelocityX(160);
            }

            if (cursors.up.isDown) {
                player.setVelocityY(-160);
            } else if (cursors.down.isDown) {
                player.setVelocityY(160);
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