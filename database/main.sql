DROP DATABASE IF EXISTS lifegame;
CREATE DATABASE lifegame;
USE lifegame;

CREATE TABLE `users`(
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `users` ADD UNIQUE `users_username_unique`(`username`);

CREATE TABLE `multiplayer`(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `player1` BIGINT NOT NULL,
    `player2` BIGINT,
    `player1status` VARCHAR(255) NOT NULL,
    `player2status` VARCHAR(255),
    `player1score` INT,
    `player2score` INT
);

ALTER TABLE
    `multiplayer` ADD CONSTRAINT `multiplayer_player2_foreign` FOREIGN KEY(`player2`) REFERENCES `users`(`id`);
ALTER TABLE
    `multiplayer` ADD CONSTRAINT `multiplayer_player1_foreign` FOREIGN KEY(`player1`) REFERENCES `users`(`id`);
