# Game of Life

This is a copy of **John Conway's game of life** written in React.js

# How to play

## Installing the game

1. Install Node.js
2. Clone repository to any folder on your computer
3. Open terminal inside the project folder and run `npm install`
4. Once installation is finished run `npm start`

## Playing the game

When the game is loaded you will see an 18 by 18 table with empty cells

1. Click on the cells you want to be filled
2. Click on **Start** button to start the game
3. To pause the game click **Stop**

## Changing game speed

To change the game speed you need to drag the range in the bottom. It changes the speed of the game as soon as you drag it

## Changing the matrix size

To change the matrix size change value of the input type nuber in the bottom of the page. The matrix will be automatically resized as soon as you change value of the input

# Rules

## Cell becomes populated when:

1. It has 3 neighbours, but all 3 its neighbour cells die unless they suit one of the cell surviving conditions

## Cell dies when:

1. It has 1 or 0 neighbours
2. It has 4 or more neighbours

## Cell survives when:

1. It has 2 or 3 neighbours
