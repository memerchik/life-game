DROP DATABASE IF EXISTS logindb;
CREATE DATABASE logindb;
USE logindb;

CREATE TABLE `users`(
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `users` ADD UNIQUE `users_username_unique`(`username`);

CREATE TABLE `multiplayer`(
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `status` VARCHAR(255) NOT NULL,
    `player1` BIGINT NOT NULL,
    `player2` BIGINT NOT NULL,
    `p1score` INT NOT NULL,
    `p2score` INT NOT NULL,
    `fieldsize` INT NOT NULL,
    `speed` INT NOT NULL
);

CREATE TABLE `singleplayer`(
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `user` BIGINT NOT NULL,
    `score` BIGINT NOT NULL
);
ALTER TABLE
    `multiplayer` ADD CONSTRAINT `multiplayer_player2_foreign` FOREIGN KEY(`player2`) REFERENCES `users`(`id`);
ALTER TABLE
    `multiplayer` ADD CONSTRAINT `multiplayer_player1_foreign` FOREIGN KEY(`player1`) REFERENCES `users`(`id`);
ALTER TABLE
    `singleplayer` ADD CONSTRAINT `singleplayer_user_foreign` FOREIGN KEY(`user`) REFERENCES `users`(`id`);