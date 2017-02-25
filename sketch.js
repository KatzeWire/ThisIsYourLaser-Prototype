//Joyce Scalettar
//This is your Laser
var w;
var columns, rows, board;
var boardCol, boardRow;
var next;
//var X, Y;
var cP1;
var rP1; 
var cP2; 
var rP2;
//block variables
var blockCol, blockRow, blockPos;
var totBlocks;
var blockP1;
var blockP2;
var blockTextP1;
var blockTextP2;
var grabbedP1;
var grabbedP2;
//laser variables
var laserPlacedP1;
var laserPlacedP2;
var laserDirSelP1;
var laserDirSelP2;
var laserDirectP1;
var laserDirectP2;
var laserP1 = [];
var laserP2 = [];
var laserIndexP1;
var laserIndexP2;
var laserXP1;
var laserYP1;
var laserXP2;
var laserYP2;
var indexP1;
var indexP2;

var basePlacedP1;
var basePlacedP2;

var win;

function setup() {
  //createCanvas(400, 400);
  /****** Initialize Unchanging Variables ******/
  w = 90;
  columns = 8;
  rows = 8;
  boardRow = w*rows;
  boardCol = w*columns;
  createCanvas(boardRow+300, boardCol);
  //print("width:"+width+", height:"+height);
  
  blockCol=columns;
  blockRow=rows;
  totBlocks = 5;
  // 0 = blocking
  // 1 = reflection
  // 2 = refraction
  // 3 = redirecting
  // 4 = portal
  blockP1 = new Array(totBlocks);
  blockP2 = new Array(totBlocks);

  /******* Initializing Block Storage ******/
  // 2D array for keeping track of the location of blocks
  blockPos = new Array(blockCol);
  for (var i = 0; i < blockCol; i++) {
    blockPos[i] = new Array(blockRow);
  }
  
  /****** Initializing Game Board ******/
  //2D array for game board
  board = new Array(columns);
  for (var i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  } 
  
  /****** Initializing Variables ******/
  init();
}

function draw() {
  background(255);
  /******* Text ******/
  printText();
  
  /******* Update Game Board ******/
  for ( var i = 0; i < columns;i++) {
    for ( var j = 0; j < rows;j++) {
      /*if ((board[i][j] == 1)) fill(0);
      else fill(255);*/
      if (j < (rows/2)){
        //Stroke for Player 1's location
        if(i==rP1 && j==cP1){
          strokeWeight(4);
          stroke(255,0,0); 
          //fill if block is selected
          getPlayerFillColor(1);
          //print("location: " + i + "," + j);
        }else{ //Stroke for rest of the blocks on P1's side
          strokeWeight(1);
          stroke(255,68,0);
          getTileFillColor(i,j,1);
        }
        rect(i*w, j*w, w-1, w-1); //draw board
      }else{
        if(i==rP2 && j==cP2){
          //Player 2's location
          strokeWeight(4);
          stroke(0,255,0);
          //fill if block is selected
          getPlayerFillColor(2);
          //print("location: " + i + "," + j);
        }else{ //Stroke for rest of the blocks on P1's side
          strokeWeight(1);
          stroke(0,0,205);
          getTileFillColor(i,j,2);
        }
        rect(i*w, j*w, w-1, w-1); //draw board
      }
    }
  }
  
  /****** Draw Lasers ******/
  strokeWeight(4);
  stroke(0);
  ellipse(laserXP1,laserYP1,10,10);
  ellipse(laserXP2,laserYP2,10,10);
  if(laserDirSelP1 == true){
    //print("placed laser P1");
    //loop through 0 to indexP1
    /*for(var i=0; i<laserP1.length ;i++){
      recurLaser(i,1);
    }*/
    recurLaser(0,1);
  }
  if(laserDirSelP2 == true){
    //print("placed laser P2");
    //loop through 0 to indexP2
    /*for(var i=0; i<laserP2.length ;i++){
      recurLaser(i,2);
    }*/
    recurLaser(0,2);
  }
}

function keyPressed() {
  if(win != 0){
    //can only reset game now
  }else if(laserPlacedP1 == false){
    /****** Player 1 controls ******/
    if (keyCode === 65 && rP1>0){ //a going left
      rP1--;
      laserXP1 = (w*rP1)+(w/2);
      //print("laserXP1="+laserXP1);
      //print("location: " + rP1 + "," + cP1);
    }else if (keyCode === 68 && rP1<rows-1){ //d going right
      rP1++;
      laserXP1 = (w*rP1)+(w/2);
      //print("laserXP1="+laserXP1);
      //print("location: " + rP1 + "," + cP1);
    }
    
    /****** Player 1 Set Laser Location ******/
    if(keyCode == 69){ //e Pressed: Player 1 places laser
      blockTextP1 = "Laser location selected, \nselect direction";
      laserPlacedP1 = true;
    }
  }else if(laserDirSelP1 == false){
    print("laser direction");
    /****** Player 1 controls ******/
    if (keyCode === 65 && rP1>0){ //a going left
      blockTextP1 = "Laser left?";
      laserDirectP1 = false; //laser going left
    }else if (keyCode === 68 && rP1<rows-1){ //d going right
      blockTextP1 = "Laser right?";
      laserDirectP1 = true; //laser going right
    }
    
    /****** Player 1 Place Laser ******/
    if(keyCode == 69){ //e Pressed: Player 1 places laser
      blockTextP1 = "Laser placed";
      /****** Starting section of the player 1 laser ******/
      indexP1 = 0;
      laserP1[indexP1] = new Laser(laserXP1,laserYP1,true,laserDirectP1,1,indexP1);
      //recurLaser(0,1);
      print(laserP1[indexP1]);
      blockTextP1 = "Laser direction selected, \nselect base location";
      laserDirSelP1 = true;
    }
  }else if(basePlacedP1 == false){
    /****** Player 1 controls ******/
    if (keyCode === 65 && rP1>0){ //a going left
      rP1--;
    }else if (keyCode === 68 && rP1<rows-1){ //d going right
      rP1++;
    }
    
    /****** Player 1 Place Base ******/
    if(keyCode == 69){ //e Pressed: Player 1 places laser
      blockTextP1 = "Base placed";
      // Place Player 1's Base
      blockPos[rP1][cP1] = 5;
      laserPlacedP1 = true;
      basePlacedP1 = true;
    }
  }else if(laserPlacedP1 == true){
    /****** Player 1 controls ******/
    if (keyCode === 65 && rP1>0){ //a going left
      //print("a pressed");
      rP1--;
      //print("location: " + rP1 + "," + cP1);
    }else if (keyCode === 68 && rP1<rows-1){ //d going right
      //print("d pressed");
      rP1++;
      //print("location: " + rP1 + "," + cP1);
    }else if (keyCode === 83 && cP1<(columns/2)-1){ //s going down
      //print("s pressed");
      cP1++;
      //print("location: " + rP1 + "," + cP1);
    }else if (keyCode === 87 && cP1>0){ //w going up
      //print("w pressed");
      cP1--;
      //print("location: " + rP1 + "," + cP1);
    }
  
    /****** Player 1 Blocks Selected ******/
    //1 pressed: Blocking (0) selected 
    if(keyCode === 49){
      if (grabbedP1 == false){
        currentBlock(1,0);
      }else{
        blockTextP1 = "Must place block first";
      }
    }
    //2 pressed: Refelct (1) selected
    if(keyCode === 50){
      if (grabbedP1 == false){
        currentBlock(1,1);
      }else{
        blockTextP1 = "Must place block first";
      }
    }
    //3 pressed: Refraction (2) selected
    if(keyCode === 51){
      if (grabbedP1 == false){
        currentBlock(1,2);
      }else{
        blockTextP1 = "Must place block first";
      }
    }
    //4 pressed: Redirection (3) selected
    if(keyCode === 52){
      if (grabbedP1 == false){
        currentBlock(1,3);
      }else{
        blockTextP1 = "Must place block first";
      }
    }
    //5 pressed: Portal (4) selected
    /*if(keyCode === 53){
      if (grabbedP1 == false){
        currentBlock(1,4);
      }else{
        blockTextP1 = "Must place block first";
      }
    }*/
  
    /****** Player 1 Place Block ******/
    if(keyCode == 69){ //e Pressed: Player 1 places block
      placeBlock(1);
    }
  
    /****** Player 1 Remove Block ******/
    if(keyCode == 82){ //r Pressed: Player 1 removes block
      if (grabbedP1 == false){
        removeBlock(1);
      }else{
        blockTextP1 = "Must place block first";
      }
    }
  
    /****** Player 1 Move Block ******/
    if(keyCode == 81){ //q Pressed: Player 1 moves block
      if (grabbedP1 == false){
        moveGrabBlock(1);
      }else{
        blockTextP1 = "Must place block first";
      }
    }
  }
  
  if(win != 0){
    //can only reset game now
  }else if (laserPlacedP2 == false){
    /****** Player 2 controls ******/
    if (keyCode === 74 && rP2>0){ //j going left
      //print("j pressed");
      rP2--;
      laserXP2 = (w*rP2)+(w/2);
      //print("laserXP2="+laserXP2);
      //print("location: " + rP1 + "," + cP1);
    }else if (keyCode === 76 && rP2<rows-1){ //l going right
      //print("l pressed");
      rP2++;
      laserXP2 = (w*rP2)+(w/2);
      //print("laserXP2="+laserXP2);
      //print("location: " + rP1 + "," + cP1);
    }
    
    /****** Player 2 Set Laser Direction ******/
    if(keyCode == 79){ //o Pressed: Player 2 places laser
      blockTextP2 = "Laser location selected, \nselect direction";
      laserPlacedP2 = true;
    }
  }else if(laserDirSelP2 == false){
    print("laser direction");
    /****** Player 2 controls ******/
    if (keyCode === 74 && rP2>0){ //j going left
      blockTextP2 = "Laser left?";
      laserDirectP2 = false; //laser going left
    }else if (keyCode === 76 && rP2<rows-1){ //l going right
      blockTextP2 = "Laser right?";
      laserDirectP2 = true; //laser going right
    }
    
    /****** Player 2 Place Laser ******/
    if(keyCode == 79){ //o Pressed: Player 1 places laser
      blockTextP2 = "Laser placed";
      /****** Starting section of the player 1 laser ******/
      indexP2 = 0;
      laserP2[indexP2] = new Laser(laserXP2,laserYP2,false,laserDirectP2,2,indexP2);
      //recurLaser(0,2);
      print(laserP2[indexP2]);
      blockTextP2 = "Laser direction selected, \nselect base location";
      laserDirSelP2 = true;
    }
  }else if(basePlacedP2 == false){
    /****** Player 2 controls ******/
    if (keyCode === 74 && rP2>0){ //j going left
      //print("j pressed");
      rP2--;
    }else if (keyCode === 76 && rP2<rows-1){ //l going right
      //print("l pressed");
      rP2++;
    }
    
    /****** Player 2 Place Laser ******/
    if(keyCode == 79){ //o Pressed: Player 1 places laser
      blockTextP2 = "Base placed";
      // Place Player 2's base
      blockPos[rP2][cP2] = 5;
      laserPlacedP2 = true;
      basePlacedP2 = true;
    }
  }else if(laserPlacedP2 == true){
    /****** Player 2 controls ******/
    if (keyCode === 74 && rP2>0){ //j going left
      //print("j pressed");
      rP2--;
      //print("location: " + rP1 + "," + cP1);
    }else if (keyCode === 76 && rP2<rows-1){ //l going right
      //print("l pressed");
      rP2++;
      //print("location: " + rP1 + "," + cP1);
    }else if (keyCode === 75 && cP2<columns-1){ //k going down
      //print("k pressed");
      cP2++;
      //print("location: " + rP1 + "," + cP1);
    }else if (keyCode === 73 && cP2>(columns/2)){ //i going up
      //print("i pressed");
      cP2--;
      //print("location: " + rP1 + "," + cP1);
    }
  
    /****** Player 2 Blocks Selected ******/
    //7 pressed: Blocking (0) selected
    if(keyCode === 55){
      if (grabbedP2 == false){
        currentBlock(2,0);
      }else{
        blockTextP2 = "Must place block first";
      }
    }
    //8 pressed: Refelction (1) selected
    if(keyCode === 56){
      if (grabbedP2 == false){
        currentBlock(2,1);
      }else{
        blockTextP2 = "Must place block first";
      }
    }
    //9 pressed: Refraction (2) selected
    if(keyCode === 57){
      if (grabbedP2 == false){
        currentBlock(2,2);
      }else{
        blockTextP2 = "Must place block first";
      }
    }
    //0 pressed: Redirection (3) selected
    if(keyCode === 48){
      if (grabbedP2 == false){
        currentBlock(2,3);
      }else{
        blockTextP2 = "Must place block first";
      }
    }
    //- pressed: Portal (4) selected
    /*if(keyCode === 189){
      if (grabbedP2 == false){
        currentBlock(2,4);
      }else{
        blockTextP2 = "Must place block first";
      }
    }*/
  
    /****** Player 2 Place Block ******/
    if(keyCode == 79){ //o Pressed: Player 2 places block
      placeBlock(2);
    }
  
    /****** Player 2 Remove Block ******/
    if(keyCode == 80){ //p Pressed: Player 2 removes block
      if (grabbedP2 == false){
        removeBlock(2);
      }else{
        blockTextP2 = "Must place block first"
      }
    }
  
    /****** Player 2 Move Block ******/
    if(keyCode == 85){ //u Pressed: Player 2 moves block
      if (grabbedP2 == false){
        moveGrabBlock(2);
      }else{
        blockTextP2 = "Must place block first"
      }
    }
  }
  
  /****** RESET GAME ******/
  if(keyCode === 27){
      init();
  }
}

function currentBlock(playerNum,blockNum){
  //make all but the selected block false
  for (var i = 0; i < totBlocks; i++){
    if (i != blockNum){
      if(playerNum == 1){
        blockP1[i] = false;
        //print("player 1 reset at " +i);
      }else if(playerNum == 2){
        blockP2[i] = false;
        //print("player 2 reset at" +i);
      }
    }
  }
  
  //toggle block on and off
  if(playerNum == 1){
    if(blockP1[blockNum] == true){
      blockP1[blockNum] = false;
      /****** Update Text ******/
      blockTextP1 = "Block deselected";
    }else{
      blockP1[blockNum] = true;
      /****** Update Text ******/
      if(blockNum == 0){ //blocking: purple
        fill(153,0,255);
        blockTextP1 = "Blocking block selected";
      }else if(blockNum == 1){ //reflecting: pink
        fill(255,0,255);
        blockTextP1 = "Reflecting block selected";
      }else if(blockNum == 2){ //refracting: emerald
        fill(0,255,191);
        blockTextP1 = "Refracting block selecting";
      }else if(blockNum == 3){ //redirecting:green
        fill(128,255,0);
        blockTextP1 = "Redirecting block selected";
      }else if(blockNum == 4){ //portal: orange&blue
        fill(255,255,0); //<<<<<<<change later
        blockTextP1 = "Portal block selected";
      }
    }
  }else if(playerNum == 2){
    if(blockP2[blockNum] == true){
      blockP2[blockNum] = false;
      blockTextP2 = "Block deselected";
    }else{
      blockP2[blockNum] = true;
      /****** Update Text ******/
      if(blockNum == 0){ //blocking: purple
        fill(153,0,255);
        blockTextP2 = "Blocking block selected";
      }else if(blockNum == 1){ //reflecting: pink
        fill(255,0,255);
        blockTextP2 = "Reflecting block selected";
      }else if(blockNum == 2){ //refracting: emerald
        fill(0,255,191);
        blockTextP2 = "Refracting block selecting";
      }else if(blockNum == 3){ //redirecting:green
        fill(128,255,0);
        blockTextP2 = "Redirecting block selected";
      }else if(blockNum == 4){ //portal: orange&blue
        fill(255,255,0); //<<<<<<<change later
        blockTextP2 = "Portal block selected";
      }
    }  
  }
  
  //print("~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ \nSelected Blocks:");
  //print("P1:blocking="+blockP1[0]+"\n   reflect ="+blockP1[1]+"\n   refract ="+blockP1[2]+"\n   redirect="+blockP1[3]+"\n   portal  ="+blockP1[4]);
  //print("P2:blocking="+blockP2[0]+"\n   reflect ="+blockP2[1]+"\n   refract ="+blockP2[2]+"\n   redirect="+blockP2[3]+"\n   portal  ="+blockP2[4]);
}

function getPlayerFillColor(playerNum){
  var check = false;
  var curr;
  for(var i=0; i < totBlocks ;i++){
    if(playerNum == 1){
      curr = blockP1[i];
    }else if(playerNum == 2){
      curr = blockP2[i];
    }
    if(curr == true){
      if(i == 0){ //blocking: purple
        fill(153,0,255); 
      }else if(i == 1){ //reflecting: pink
        fill(255,0,255);
      }else if(i == 2){ //refracting: emerald
        fill(0,255,191);
      }else if(i == 3){ //redirecting:green
        fill(128,255,0);
      }else if(i == 4){ //portal: orange&blue
        fill(255,255,0); //<<<<<<<change later
      }
      check = true;
    }
  }
  if(check == false){ //none selected
    noFill();
    //print("no fill");
  }
}

function getTileFillColor(fillR,fillC,playerNum){
  var curr; 
  curr = blockPos[fillR][fillC];
  //print("getTileFilleColor code curr:"+curr);
  
  if(curr == 0){ //blocking: purple
    fill(153,0,255);
    //print("purple");
  }else if(curr == 1){ //reflecting: pink
    fill(255,0,255);
    //print("pink");
  }else if(curr == 2){ //refracting: emerald
    fill(0,255,191);
    //print("emerald");
  }else if(curr == 3){ //redirecting:green
    fill(128,255,0);
    //print("green");
  }else if(curr == 4){ //portal: orange&blue
    fill(255,255,0); //<<<<<<<change later
    //print("yellow");
  }else if(curr == -1){
    noFill();
    //print("noFill");
  }else if(curr == 5){ //base
    if(playerNum == 1){
      fill(255,68,0);
    }else if(playerNum == 2){
      fill(0,0,205);
    }
  }
}

function placeBlock(playerNum){
  //adds block's color code to be stored in the
  //block position array 
  //print("("+rP1+","+cP1+") STARTED filled with "+blockPos[rP1][cP1]);
  var curr;
  var check = false;
  for(var i=0; i < totBlocks ;i++){
    if(playerNum == 1){
      if(blockP1[i] == true){
        if (blockPos[rP1][cP1] == -1){ //fill if empty
          blockPos[rP1][cP1]=i;
          curr = blockPos[rP1][cP1];
          print("filled ("+rP1+","+cP1+") with "+curr);
          grabbedP1 = false;
          
          /****** Update Text ******/
          if(curr == 0){ //blocking: purple
            fill(153,0,255);
            blockTextP1 = "Filled with a blocking block";
          }else if(curr == 1){ //reflecting: pink
            fill(255,0,255);
            blockTextP1 = "Filled with a reflecting block";
          }else if(curr == 2){ //refracting: emerald
            fill(0,255,191);
            blockTextP1 = "Filled with a refracting block";
          }else if(curr == 3){ //redirecting:green
            fill(128,255,0);
            blockTextP1 = "Filled with a redirecting block";
          }else if(curr == 4){ //portal: orange&blue
            fill(255,255,0); //<<<<<<<change later
            blockTextP1 = "Filled with a portal block";
          }
          check = true;
        }
      }
    }else if(playerNum == 2){
      if(blockP2[i] == true){
        if (blockPos[rP2][cP2] == -1){ //fill if empty
          blockPos[rP2][cP2]=i;
          curr = blockPos[rP2][cP2];
          print("filled ("+rP2+","+cP2+") with "+blockPos[rP2][cP2]);
          grabbedP2 = false;
          
          /****** Update Text ******/
          if(curr == 0){ //blocking: purple
            fill(153,0,255);
            blockTextP2 = "Filled with a blocking block";
          }else if(curr == 1){ //reflecting: pink
            fill(255,0,255);
            blockTextP2 = "Filled with a reflecting block";
          }else if(curr == 2){ //refracting: emerald
            fill(0,255,191);
            blockTextP2 = "Filled with a refracting block";
          }else if(curr == 3){ //redirecting:green
            fill(128,255,0);
            blockTextP2 = "Filled with a redirecting block";
          }else if(curr == 4){ //portal: orange&blue
            fill(255,255,0); //<<<<<<<change later
            blockTextP2 = "Filled with a portal block";
          }
          check = true;
        }
      }
    }
  }
  if(check == false){
    //print("("+rP1+","+cP1+")");
    var curr;
    if(playerNum == 1){
      curr = blockPos[rP1][cP1];
    }else if(playerNum == 2){
      curr = blockPos[rP2][cP2];
    }
    if (curr == -1){
      //print("no block selected, so don't insert block");
      //print("player number:"+playerNum);
      if(playerNum == 1){
        //print("entered: P1 none selected");
        blockTextP1 = "No block selected!";
      }else if(playerNum == 2){
        blockTextP2 = "No block selected!";
      }
    }else{
      print("tile already filled, so don't insert block");
      if(playerNum == 1){
        blockTextP1 = "Tile already filled!";
      }else if(playerNum == 2){
        blockTextP2 = "Tile already filled!";
      }
    }
  }
  //then need to run through blockPos[] in draw() to fill tile
}

function removeBlock(playerNum){
  //removes block's color code to be stored in the
  //block position array 
  //print("("+rP1+","+cP1+") STARTED removed is "+blockPos[rP1][cP1]);
  var curr;
  var check = false;
  if(playerNum == 1){
    if (blockPos[rP1][cP1] == 5){
      blockTextP1 = "Cannot remove your base!";
      check = true;
    }
    if (blockPos[rP1][cP1] == -1){ //already empty
      print("P1 remove: space already empty");
      blockTextP1 = "Nothing to remove!";
      check = true;
    }
  }else if(playerNum == 2){
    if (blockPos[rP2][cP2] == 5){
      blockTextP2 = "Cannot remove your base!";
      check = true;
    }
    if (blockPos[rP2][cP2] == -1){ //already empty
      print("P2 remove: space already empty");
      blockTextP2 = "Nothing to remove!";
      check = true;
    }
  }
  if(check == false){ //space already empty
    //print("("+rP1+","+cP1+")");
    var deselected = true;
    for(var i=0; i < totBlocks ;i++){
      if(playerNum == 1){
        if(blockP1[i] == true){
          deselected = false;
        }
      }else if(playerNum == 2){
        if(blockP2[i] == true){
          deselected = false;
        }
      }
    }
    if (deselected == true){ //no blocks selected
      print("no block selected, so remove block");
      //print("player number:"+playerNum);
      if(playerNum == 1){
        blockPos[rP1][cP1]=-1;
        curr = blockPos[rP1][cP1];
        blockTextP1 = "Removed block";
      }else if(playerNum == 2){
        blockPos[rP2][cP2]=-1;
        curr = blockPos[rP2][cP2];
        blockTextP2 = "Removed block";
      }
      //print("removed at ("+rP1+","+cP1+")"); 
    }else{ //block selected so don't remove
      print("tile already filled, so don't insert block");
      if(playerNum == 1){
        blockTextP1 = "Deselect block to remove!";
      }else if(playerNum == 2){
        blockTextP2 = "Deselect block to remove!";
      }
    }
  }
}

function moveGrabBlock(playerNum){
  var curr;
  var check = false;
  if(playerNum == 1){
    if (blockPos[rP1][cP1] == 5){
      blockTextP1 = "Cannot move your base!";
      check = true;
    }
    if (blockPos[rP1][cP1] == -1){ //already empty
      print("P1 move: space already empty");
      blockTextP1 = "Nothing to move!";
      check = true;
    }
  }else if(playerNum == 2){
    if (blockPos[rP2][cP2] == 5){
      blockTextP2 = "Cannot move your base!";
      check = true;
    }
    if (blockPos[rP2][cP2] == -1){ //already empty
      print("P2 move: space already empty");
      check = true;
    }
  }
  if(check == false){ //space already empty
    //print("("+rP1+","+cP1+")");
    var deselected = true;
    for(var i=0; i < totBlocks ;i++){
      if(playerNum == 1){
        if(blockP1[i] == true){
          deselected = false;
        }
      }else if(playerNum == 2){
        if(blockP2[i] == true){
          deselected = false;
        }
      }
    }
    if (deselected == true){ //no blocks selected
      print("no block selected, so remove block");
      //print("player number:"+playerNum);
      if(playerNum == 1){
        curr = blockPos[rP1][cP1];
        currentBlock(1,blockPos[rP1][cP1]);
        blockPos[rP1][cP1]=-1;
        /****** Update Text ******/
        if(curr == 0){ //blocking: purple
          fill(153,0,255);
          blockTextP1 = "Grabbed a blocking block";
        }else if(curr == 1){ //reflecting: pink
          fill(255,0,255);
          blockTextP1 = "Grabbed a reflecting block";
        }else if(curr == 2){ //refracting: emerald
          fill(0,255,191);
          blockTextP1 = "Grabbed a refracting block";
        }else if(curr == 3){ //redirecting:green
          fill(128,255,0);
          blockTextP1 = "Grabbed a redirecting block";
        }else if(curr == 4){ //portal: orange&blue
          fill(255,255,0); //<<<<<<<change later
          blockTextP1 = "Grabbed a portal block";
        }
        grabbedP1 = true;
      }else if(playerNum == 2){
        curr = blockPos[rP2][cP2];
        currentBlock(2,blockPos[rP2][cP2]);
        blockPos[rP2][cP2]=-1;
        /****** Update Text ******/
        if(curr == 0){ //blocking: purple
          fill(153,0,255);
          blockTextP2 = "Grabbed a blocking block";
        }else if(curr == 1){ //reflecting: pink
          fill(255,0,255);
          blockTextP2 = "Grabbed a reflecting block";
        }else if(curr == 2){ //refracting: emerald
          fill(0,255,191);
          blockTextP2 = "Grabbed a refracting block";
        }else if(curr == 3){ //redirecting:green
          fill(128,255,0);
          blockTextP2 = "Grabbed a redirecting block";
        }else if(curr == 4){ //portal: orange&blue
          fill(255,255,0); //<<<<<<<change later
          blockTextP2 = "Grabbed a portal block";
        }
        grabbedP2 = true;
      }
      //print("removed at ("+rP1+","+cP1+")"); 
    }else{ //block selected so don't remove
      print("tile already filled, so can't pick up block");
      if(playerNum == 1){
        blockTextP1 = "Unselect block to grab!";
      }else if(playerNum == 2){
        blockTextP2 = "Unselect block to grab!";
      }
    }
  }
}

/****** Laser Object ******/
function Laser(SPX,SPY,DV,DH,playerNum,index){
  //print("Entered Laser Object");
  //this.constructor();
  
  //this.constructor = function(){
    //print("entered constuctor");
    /******* Read in Variables ******/
    //SP_=Starting Point X&Y
    this.startX = SPX;
    this.startY = SPY;
    //DV=Direction Vertical, DH=Direction Horizontal
    this.dirVert = DV;
      // false = up
      // true = down
    this.dirHor = DH;
      // false = left
      // true = right
    this.playerNum = playerNum;
    this.index = index;
    this.collision = false;
  
    /****** Set Varibles ******/ 
    /*if(this.playerNum == 1){
      stroke(255,0,0);
    }else if(this.playerNum ==2){
      stroke(0,255,0);
    }*/
  
    /****** Undefined Variables ******/
    this.endX;
    this.endY;
    this.blockNum;
    this.collSide;
      // 0 = left
      // 1 = right
      // 2 = top
      // 3 = bottom
  //}
  
  this.calcTrajectory = function(){ //start to wall
    //print("calcTrajectory entered");
    if(this.dirVert == true && this.dirHor == true){
      //down to the right
      var o = boardCol - this.startX;
      //var o = (tan(45))*a;
      this.endX = boardCol;
      this.endY = o;
    }else if(this.dirVert == true && this.dirHor == false){
      //down to the left
      //var o = tan(45)*this.startX;
      var o = this.startX;
      this.endX = 0;
      this.endY = o;
    }else if(this.dirVert == false && this.dirHor == true){
      //up to the right
      var o = boardCol - this.startX;
      //var o = tan(45)*a;
      this.endX = boardCol;
      this.endY = boardRow - o;
    }else if(this.dirVert == false && this.dirHor == false){
      //up to the left
      var o = this.startX;
      //var o = tan(45)*this.startX;
      this.endX = 0;
      this.endY = boardRow - o;
    }
  }
  
  this.calcCollision = function(){ //start block
    //loop to check each block it hits (cell is filled)
    //print("calcCollision entered");
    this.collision = false;
    var x = this.startX;
    var y = this.startY;
    var incX; //true-> increment x
              //false-> increment y
    
    /****** Get Starting Block Coordinates ******/
    //the coordinates of the first block to check
    //NOT the coordinates of the block being reflected off
    if(this.dirVert == true && this.dirHor == true){
      //down to the right
      //print("down/right");
      if((x%w) == 0){ //on right of block
        x = x/w;
        y = floor(y/w);
        incX = false;
        //print("side/right");
      }else if((y%w) == 0){ //on bottom of block
        x = floor(x/w);
        y = y/w;
        incX = true;
        //print("bottom");
      }
      //print("["+this.index+"] down/right start coor: x="+x+" y="+y);
    }else if(this.dirVert == true && this.dirHor == false){
      //down to the left
      //print("down/left");
      if((x%w) == 0){ //on left of block
        x = (x/w) - 1;
        y = floor(y/w);
        incX = false;
        //print("side/left");
      }else if((y%w) == 0){ //on bottom of block
        x = floor(x/w);
        y = y/w;
        incX = true;
        //print("bottom");
      }
      //print("["+this.index+"] down/left start coor: x="+x+" y="+y);
    }else if(this.dirVert == false && this.dirHor == true){
      //up to the right
      //print("up/right");
      if((x%w) == 0){ //on right of block
        x = x/w;
        y = floor(y/w);
        incX = false;
        //print("side/right");
      }else if((y%w) == 0){ //on top of block
        x = floor(x/w);
        y = (y/w) - 1;
        incX = true;
        //print("top");
      }
      //print("["+this.index+"] up/right start coor: x="+x+" y="+y);
    }else if(this.dirVert == false && this.dirHor == false){
      //up to the left
      //print("up/left ");
      if((x%w) == 0){ //on left of block
        x = (x/w) - 1;
        y = floor(y/w);
        incX = false;
        //print("side/left");
      }else if((y%w) == 0){ //on top of block
        x = floor(x/w);
        y = (y/w) - 1;
        incX = true;
        //print("top");
      }
      //print("["+this.index+"] up/left start coor: x="+x+" y="+y);
    }
    
    /****** Incerment Laser & Collision Check ******/
    if(this.dirHor == true){ //to the right
      //print("to the right");
      var colNum = boardCol/w;
      while(x < colNum){
        //print("entered while x="+x+" colNum="+colNum);
        //print("blockPos["+x+"]["+y+"]="+blockPos[x][y]);
        if(blockPos[x][y] != -1){ //hits block
          //print("COLLISION: x="+x+" y="+y);
          this.collision = true;
          this.blockNum = blockPos[x][y];
          if(incX == false){ //on left of block
            this.endX = x*w;
            this.endY = y*w+(w/2);
            this.collSide = 0; //left
            //print("blocked left: x="+x+" y="+y);
            //print("blocked left: endX="+this.endX+" endY="+this.endY);
            break;
          }else{ //on top/bottom of block
            if(this.dirVert == true){ //down (hits top)
              this.endX = x*w+(w/2);
              this.endY = y*w;
              this.collSide = 2; //top
              //print("hits top");
            }else{ //up (hits bottom)
              this.endX = x*w+(w/2);
              this.endY = (y+1)*w;
              this.collSide = 3; //bottom
              //print("hits bottom");
            }
            //print("blocked top/bot: x="+x+" y="+y);
            //print("blocked top/bot: endX="+this.endX+" endY="+this.endY);
            break;
          }
        }
        if(this.dirVert == true){ //down
          if(incX == true){ //on side of block
            x = x + 1;
            incX = false;
            //print("coll side: x="+x+" y="+y);
          }else{ //on top of block
            y = y + 1;
            incX = true;
            //print("coll bottom: x="+x+" y="+y);
          }
        }else if(this.dirVert == false){ //up
          if(incX == true){ //on side of block
            x = x + 1;
            incX = false;
            //print("coll side: x="+x+" y="+y);
          }else{ //on bottom of block
            y = y - 1;
            incX = true;
            //print("coll bottom: x="+x+" y="+y);
          }
        }
        //print("Check to right: x="+x+" y="+y);
      }
      /*if(this.collision == false){ //hit wall
        if(this.playerNum == 1){
          laserP1[this.index].calcTrajectory();
        }else if(this.playerNum == 2){
          laserP2[this.index].calcTrajectory();
        }
      }*/
    }else if(this.dirHor == false){ //to the left
      //print("to the left");
      var colNum = boardCol/w;
      while(x >= 0){
        //print("entered while x="+x+" colNum="+colNum);
        //print("blockPos["+x+"]["+y+"]="+blockPos[x][y]);
        if(blockPos[x][y] != -1){ //hits block
          //print("COLLISION: x="+x+" y="+y);
          this.collision = true;
          this.blockNum = blockPos[x][y];
          if(incX == false){ //on right of block
            this.endX = (x+1)*w;
            this.endY = y*w+(w/2);
            this.collSide = 1; //right
            //print("blocking right: x="+x+" y="+y);
            //print("blocking right: endX="+this.endX+" endY="+this.endY);
            break;
          }else{ //on top/bottom of block
            if(this.dirVert == true){ //down (hits top)
              this.endX = x*w+(w/2);
              this.endY = y*w;
              this.collSide = 2; //top
            }else{ //up (hits bottom)
              this.endX = x*w+(w/2);
              this.endY = (y+1)*w;
              this.collSide = 3; //bottom
            }
            //print("blocking bottom: x="+x+" y="+y);
            //print("blocking bottom: endX="+this.endX+" endY="+this.endY);
            break;
          }
        }
        if(this.dirVert == true){ //down
          if(incX == true){ //on side of block
            x = x - 1;
            incX = false;
            //print("coll side: x="+x+" y="+y);
          }else{ //on top of block
            y = y + 1;
            incX = true;
            //print("coll top: x="+x+" y="+y);
          }
        }else if(this.dirVert == false){ //up
          if(incX == true){ //on side of block
            x = x - 1;
            incX = false;
            //print("coll side: x="+x+" y="+y);
          }else{ //on bottom of block
            y = y - 1;
            incX = true;
            //print("coll bottom: x="+x+" y="+y);
          }
        }
        //print("Check to left: x="+x+" y="+y);
      }
      //print("["+this.index+"] after while collision="+this.collision);
      /*if(this.collision == false){ //hit wall
        if(this.playerNum == 1){
          laserP1[this.index].calcTrajectory();
        }else if(this.playerNum == 2){
          laserP2[this.index].calcTrajectory();
        }
      }*/
    }
    if(this.collision == false){
      if(this.dirVert == true && this.dirHor == true){
        //down to the right
        this.endX = x*w;
        this.endY = y*w+(w/2);
        //print("right wall");
        //print("["+this.index+"] down/right end coor: x="+this.endX+" y="+this.endY);
      }else if(this.dirVert == true && this.dirHor == false){
        //down to the left
        this.endX = (x+1)*w;
        this.endY = y*w+(w/2);
        //print("left wall");
        //print("["+this.index+"] down/left end coor: x="+this.endX+" y="+this.endY);
      }else if(this.dirVert == false && this.dirHor == true){
        //up to the right
        this.endX = x*w;
        this.endY = y*w+(w/2);
        //print("right wall");
        //print("["+this.index+"] down/right end coor: x="+this.endX+" y="+this.endY);
      }else if(this.dirVert == false && this.dirHor == false){
        //up to the left
        this.endX = (x+1)*w;
        this.endY = y*w+(w/2);
        //print("right wall");
        //print("["+this.index+"] down/right end coor: x="+this.endX+" y="+this.endY);
      }
    }
    //print("["+this.index+"] end of collision: endX="+this.endX+" endY="+this.endY);
  }
  
  this.display = function(){
    if(this.playerNum == 1){
      stroke(255,0,0);
    }else if(this.playerNum == 2){
      stroke(0,255,0);
    }
    line(this.startX,this.startY,this.endX,this.endY);
    //print("startx,starty:"+this.startX+","+this.startY);
    //print("endx,endy:"+this.endX+","+this.endY);
  }
}

function recurLaser(index,playerNum){
  if(playerNum == 1){
    //laserP1[index].calcTrajectory();
    //print("[recurP1] entered");
    laserP1[index].calcCollision();
    laserP1[index].display();
    //print("[recurP1] collision="+laserP1[index].collision+" block num="+laserP1[index].blockNum+" coll side="+laserP1[index].collSide);
    if(laserP1[index].collision == true){
      if(laserP1[index].blockNum == 0){ //blocking: purple
        //do nothing
      }else if(laserP1[index].blockNum == 1){ //reflecting: pink
        if(laserP1[index].collSide == 0 || laserP1[index].collSide == 1){ 
          //collided on left or right
          ///print("[recurP1] Collision side: "+laserP1[index].collSide);
          laserP1[index+1] = new Laser(laserP1[index].endX,laserP1[index].endY,laserP1[index].dirVert,!(laserP1[index].dirHor),1,index+1);
          /*print("P1 Laser["+(index+1)+"]:");
          print(laserP1[index+1]);*/
          recurLaser(index+1,1);
        }else if(laserP1[index].collSide == 2 || laserP1[index].collSide == 3){ 
          //collided on top or bottom
          //print("[recurP1] Collision top/bot: "+laserP1[index].collSide);
          laserP1[index+1] = new Laser(laserP1[index].endX,laserP1[index].endY,!(laserP1[index].dirVert),laserP1[index].dirHor,1,index+1);
          /*print("P1 Laser["+(index+1)+"]:");
          print(laserP1[index+1]);*/
          recurLaser(index+1,1);
        }
      }else if(laserP1[index].blockNum == 2){ //refracting: emerald
        if(laserP1[index].collSide == 0 || laserP1[index].collSide == 1){ 
          //collided on left or right
          //reflect:
          laserP1[index+1] = new Laser(laserP1[index].endX,laserP1[index].endY,laserP1[index].dirVert,!(laserP1[index].dirHor),1,index+1);
          /*print("P1 Laser["+(index+1)+"]:");
          print(laserP1[index+1]);*/
          recurLaser(index+1,1);
          //continue through:
          if(laserP1[index].dirVert == true && laserP1[index].dirHor == true){
            //down to the right
            var endX = laserP1[index].endX + (w/2);
            var endY = laserP1[index].endY + (w/2);
          }else if(laserP1[index].dirVert == true && laserP1[index].dirHor == false){
            //down to the left
            var endX = laserP1[index].endX - (w/2);
            var endY = laserP1[index].endY + (w/2);
          }else if(laserP1[index].dirVert == false && laserP1[index].dirHor == true){
            //up to the right
            var endX = laserP1[index].endX + (w/2);
            var endY = laserP1[index].endY - (w/2);
          }else if(laserP1[index].dirVert == false && laserP1[index].dirHor == false){
            //up to the left
            var endX = laserP1[index].endX - (w/2);
            var endY = laserP1[index].endY - (w/2);
          }
          line(laserP1[index].endX,laserP1[index].endY,endX,endY);
          laserP1[index+2] = new Laser(endX,endY,laserP1[index].dirVert,laserP1[index].dirHor,1,index+2);
          /*print("P1 Laser["+(index+2)+"]:");
          print(laserP1[index+2]);*/
          recurLaser(index+2,1);
        }else if(laserP1[index].collSide == 2 || laserP1[index].collSide == 3){ 
          //collided on top or bottom
          //reflect:
          laserP1[index+1] = new Laser(laserP1[index].endX,laserP1[index].endY,!(laserP1[index].dirVert),laserP1[index].dirHor,1,index+1);
          /*print("P1 Laser["+(index+1)+"]:");
          print(laserP1[index+1]);*/
          recurLaser(index+1,1);
          //continue through:
          if(laserP1[index].dirVert == true && laserP1[index].dirHor == true){
            //down to the right
            var endX = laserP1[index].endX + (w/2);
            var endY = laserP1[index].endY + (w/2);
          }else if(laserP1[index].dirVert == true && laserP1[index].dirHor == false){
            //down to the left
            var endX = laserP1[index].endX - (w/2);
            var endY = laserP1[index].endY + (w/2);
          }else if(laserP1[index].dirVert == false && laserP1[index].dirHor == true){
            //up to the right
            var endX = laserP1[index].endX + (w/2);
            var endY = laserP1[index].endY - (w/2);
          }else if(laserP1[index].dirVert == false && laserP1[index].dirHor == false){
            //up to the left
            var endX = laserP1[index].endX - (w/2);
            var endY = laserP1[index].endY - (w/2);
          }
          line(laserP1[index].endX,laserP1[index].endY,endX,endY);
          laserP1[index+2] = new Laser(endX,endY,laserP1[index].dirVert,laserP1[index].dirHor,1,index+2);
          /*print("P1 Laser["+(index+2)+"]:");
          print(laserP1[index+2]);*/
          recurLaser(index+2,1);
        }
      }else if(laserP1[index].blockNum == 3){ //redirecting:green
        if(laserP1[index].collSide == 0 || laserP1[index].collSide == 1){ 
          //collided on left or right
          if(laserP1[index].dirVert == true && laserP1[index].dirHor == true){
            //down to the right
            line(laserP1[index].endX,laserP1[index].endY,laserP1[index].endX+w,laserP1[index].endY);
            var endX = laserP1[index].endX + w;
          }else if(laserP1[index].dirVert == true && laserP1[index].dirHor == false){
            //down to the left
            line(laserP1[index].endX,laserP1[index].endY,laserP1[index].endX-w,laserP1[index].endY);
            var endX = laserP1[index].endX - w;
          }else if(laserP1[index].dirVert == false && laserP1[index].dirHor == true){
            //up to the right
            line(laserP1[index].endX,laserP1[index].endY,laserP1[index].endX+w,laserP1[index].endY);
            var endX = laserP1[index].endX + w;
          }else if(laserP1[index].dirVert == false && laserP1[index].dirHor == false){
            //up to the left
            line(laserP1[index].endX,laserP1[index].endY,laserP1[index].endX-w,laserP1[index].endY);
            var endX = laserP1[index].endX - w;
          }
          laserP1[index+1] = new Laser(endX,laserP1[index].endY,laserP1[index].dirVert,laserP1[index].dirHor,1,index+1);
          /*print("P1 Laser["+(index+1)+"]:");
          print(laserP1[index+1]);*/
          recurLaser(index+1,1);
        }else if(laserP1[index].collSide == 2 || laserP1[index].collSide == 3){ 
          //collided on top or bottom
          if(laserP1[index].dirVert == true && laserP1[index].dirHor == true){
            //down to the right
            line(laserP1[index].endX,laserP1[index].endY,laserP1[index].endX,laserP1[index].endY+w);
            var endY = laserP1[index].endY + w;
          }else if(laserP1[index].dirVert == true && laserP1[index].dirHor == false){
            //down to the left
            line(laserP1[index].endX,laserP1[index].endY,laserP1[index].endX,laserP1[index].endY+w);
            var endY = laserP1[index].endY + w;
          }else if(laserP1[index].dirVert == false && laserP1[index].dirHor == true){
            //up to the right
            line(laserP1[index].endX,laserP1[index].endY,laserP1[index].endX,laserP1[index].endY-w);
            var endY = laserP1[index].endY - w;
          }else if(laserP1[index].dirVert == false && laserP1[index].dirHor == false){
            //up to the left
            line(laserP1[index].endX,laserP1[index].endY,laserP1[index].endX,laserP1[index].endY-w);
            var endY = laserP1[index].endY - w;
          }
          laserP1[index+1] = new Laser(laserP1[index].endX,endY,laserP1[index].dirVert,laserP1[index].dirHor,1,index+1);
          /*print("P1 Laser["+(index+1)+"]:");
          print(laserP1[index+1]);*/
          recurLaser(index+1,1);
        }
      }else if(laserP1[index].blockNum == 5){ //BASE
        if(laserP1[index].endY <= w){
          blockTextP1 = "PLAYER 2 WON! \nPress [Esc] to restart";
          blockTextP2 = "PLAYER 2 WON! \nPress [Esc] to restart";
          win = 2;
        }else{
          blockTextP1 = "PLAYER 1 WON! \nPress [Esc] to restart";
          blockTextP2 = "PLAYER 1 WON! \nPress [Esc] to restart";
          win = 1;
        }
      }
    }
  }else if(playerNum == 2){
    //laserP2[index].calcTrajectory();
    laserP2[index].calcCollision();
    laserP2[index].display();
    //print("[recurP2] collision="+laserP2[index].collision+" block num="+laserP2[index].blockNum+" coll side="+laserP2[index].collSide);
    if(laserP2[index].collision == true){
      if(laserP2[index].blockNum == 0){ //blocking: purple
        //do nothing
      }else if(laserP2[index].blockNum == 1){ //reflecting: pink
        if(laserP2[index].collSide == 0 || laserP2[index].collSide == 1){ 
          //collided on left or right
          ///print("[recurP2] Collision side: "+laserP2[index].collSide);
          laserP2[index+1] = new Laser(laserP2[index].endX,laserP2[index].endY,laserP2[index].dirVert,!(laserP2[index].dirHor),2,index+1);
          /*print("P2 Laser["+(index+1)+"]:");
          print(laserP2[index+1]);*/
          recurLaser(index+1,2);
        }else if(laserP2[index].collSide == 2 || laserP2[index].collSide == 3){ 
          //collided on top or bottom
          //print("[recurP2] Collision top/bot: "+laserP2[index].collSide);
          laserP2[index+1] = new Laser(laserP2[index].endX,laserP2[index].endY,!(laserP2[index].dirVert),laserP2[index].dirHor,2,index+1);
          /*print("P2 Laser["+(index+1)+"]:");
          print(laserP2[index+1]);*/
          recurLaser(index+1,2);
        }
      }else if(laserP2[index].blockNum == 2){ //refracting: emerald
        if(laserP2[index].collSide == 0 || laserP2[index].collSide == 1){ 
          //collided on left or right
          //reflect:
          laserP2[index+1] = new Laser(laserP2[index].endX,laserP2[index].endY,laserP2[index].dirVert,!(laserP2[index].dirHor),2,index+1);
          /*print("P2 Laser["+(index+1)+"]:");
          print(laserP2[index+1]);*/
          recurLaser(index+1,2);
          //continue through:
          if(laserP2[index].dirVert == true && laserP2[index].dirHor == true){
            //down to the right
            var endX = laserP2[index].endX + (w/2);
            var endY = laserP2[index].endY + (w/2);
          }else if(laserP2[index].dirVert == true && laserP2[index].dirHor == false){
            //down to the left
            var endX = laserP2[index].endX - (w/2);
            var endY = laserP2[index].endY + (w/2);
          }else if(laserP2[index].dirVert == false && laserP2[index].dirHor == true){
            //up to the right
            var endX = laserP2[index].endX + (w/2);
            var endY = laserP2[index].endY - (w/2);
          }else if(laserP2[index].dirVert == false && laserP2[index].dirHor == false){
            //up to the left
            var endX = laserP2[index].endX - (w/2);
            var endY = laserP2[index].endY - (w/2);
          }
          line(laserP2[index].endX,laserP2[index].endY,endX,endY);
          laserP2[index+2] = new Laser(endX,endY,laserP2[index].dirVert,laserP2[index].dirHor,2,index+2);
          /*print("P2 Laser["+(index+2)+"]:");
          print(laserP2[index+2]);*/
          recurLaser(index+2,2);
        }else if(laserP2[index].collSide == 2 || laserP2[index].collSide == 3){ 
          //collided on top or bottom
          //reflect:
          laserP2[index+1] = new Laser(laserP2[index].endX,laserP2[index].endY,!(laserP2[index].dirVert),laserP2[index].dirHor,2,index+1);
          /*print("P2 Laser["+(index+1)+"]:");
          print(laserP2[index+1]);*/
          recurLaser(index+1,2);
          //continue through:
          if(laserP2[index].dirVert == true && laserP2[index].dirHor == true){
            //down to the right
            var endX = laserP2[index].endX + (w/2);
            var endY = laserP2[index].endY + (w/2);
          }else if(laserP2[index].dirVert == true && laserP2[index].dirHor == false){
            //down to the left
            var endX = laserP2[index].endX - (w/2);
            var endY = laserP2[index].endY + (w/2);
          }else if(laserP2[index].dirVert == false && laserP2[index].dirHor == true){
            //up to the right
            var endX = laserP2[index].endX + (w/2);
            var endY = laserP2[index].endY - (w/2);
          }else if(laserP2[index].dirVert == false && laserP2[index].dirHor == false){
            //up to the left
            var endX = laserP2[index].endX - (w/2);
            var endY = laserP2[index].endY - (w/2);
          }
          line(laserP2[index].endX,laserP2[index].endY,endX,endY);
          laserP2[index+2] = new Laser(endX,endY,laserP2[index].dirVert,laserP2[index].dirHor,2,index+2);
          /*print("P2 Laser["+(index+2)+"]:");
          print(laserP2[index+2]);*/
          recurLaser(index+2,2);
        }
      }else if(laserP2[index].blockNum == 3){ //redirecting:green
        if(laserP2[index].collSide == 0 || laserP2[index].collSide == 1){ 
          //collided on left or right
          if(laserP2[index].dirVert == true && laserP2[index].dirHor == true){
            //down to the right
            line(laserP2[index].endX,laserP2[index].endY,laserP2[index].endX+w,laserP2[index].endY);
            var endX = laserP2[index].endX + w;
          }else if(laserP2[index].dirVert == true && laserP2[index].dirHor == false){
            //down to the left
            line(laserP2[index].endX,laserP2[index].endY,laserP2[index].endX-w,laserP2[index].endY);
            var endX = laserP2[index].endX - w;
          }else if(laserP2[index].dirVert == false && laserP2[index].dirHor == true){
            //up to the right
            line(laserP2[index].endX,laserP2[index].endY,laserP2[index].endX+w,laserP2[index].endY);
            var endX = laserP2[index].endX + w;
          }else if(laserP2[index].dirVert == false && laserP2[index].dirHor == false){
            //up to the left
            line(laserP2[index].endX,laserP2[index].endY,laserP2[index].endX-w,laserP2[index].endY);
            var endX = laserP2[index].endX - w;
          }
          laserP2[index+1] = new Laser(endX,laserP2[index].endY,laserP2[index].dirVert,laserP2[index].dirHor,2,index+1);
          /*print("P2 Laser["+(index+1)+"]:");
          print(laserP2[index+1]);*/
          recurLaser(index+1,2);
        }else if(laserP2[index].collSide == 2 || laserP2[index].collSide == 3){ 
          //collided on top or bottom
          if(laserP2[index].dirVert == true && laserP2[index].dirHor == true){
            //down to the right
            line(laserP2[index].endX,laserP2[index].endY,laserP2[index].endX,laserP2[index].endY+w);
            var endY = laserP2[index].endY + w;
          }else if(laserP2[index].dirVert == true && laserP2[index].dirHor == false){
            //down to the left
            line(laserP2[index].endX,laserP2[index].endY,laserP2[index].endX,laserP2[index].endY+w);
            var endY = laserP2[index].endY + w;
          }else if(laserP2[index].dirVert == false && laserP2[index].dirHor == true){
            //up to the right
            line(laserP2[index].endX,laserP2[index].endY,laserP2[index].endX,laserP2[index].endY-w);
            var endY = laserP2[index].endY - w;
          }else if(laserP2[index].dirVert == false && laserP2[index].dirHor == false){
            //up to the left
            line(laserP2[index].endX,laserP2[index].endY,laserP2[index].endX,laserP2[index].endY-w);
            var endY = laserP2[index].endY - w;
          }
          laserP2[index+1] = new Laser(laserP2[index].endX,endY,laserP2[index].dirVert,laserP2[index].dirHor,2,index+1);
          /*print("P2 Laser["+(index+1)+"]:");
          print(laserP2[index+1]);*/
          recurLaser(index+1,2);
        }
      }else if(laserP2[index].blockNum == 5){ //BASE
        if(laserP2[index].endY <= w){
          blockTextP1 = "PLAYER 2 WON! \nPress [Esc] to restart";
          blockTextP2 = "PLAYER 2 WON! \nPress [Esc] to restart";
          win = 2;
        }else{
          blockTextP1 = "PLAYER 1 WON! \nPress [Esc] to restart";
          blockTextP2 = "PLAYER 1 WON! \nPress [Esc] to restart";
          win = 1;
        }
      }
    }
  }
}

function printText(){
  /****** Player 1 ******/
  fill(255,68,0);
  textSize(12);
  noStroke();
  textStyle(NORMAL);
  if(basePlacedP1 == false){
    text("Player 1: [A] Left & [D] Right to pick location",(boardRow)+5,15);
    text("[E] to place laser/base",(boardRow)+5,35);
    text("[A] Left & [D] Right to pick direction",(boardRow)+5,55);
  }else{
    text("Player 1: [W] Up, [A] Left, [S] Down, [D] Right",(boardRow)+5,15);
    text("[E] Places, [R] Removes, [Q] Moves",(boardRow)+5,35);
    text("[1] Block, [2] Relfect, [3] Refract, [4] Redirect",(boardRow)+5,55);
    //text("[1] Block, [2] Relfect, [3] Refract, [4] Redirect, [5] Portal",(boardRow)+5,55);
    text("[1/2/3/4] Reclick selected to deselect", (boardRow)+5, 75);
  }
  textSize(20);
  strokeWeight(1);
  stroke(0);
  textStyle(BOLD);
  getPlayerFillColor(1);
  text(blockTextP1,(boardRow)+5,100);
  
  /****** Player 2 ******/
  fill(0,0,205);
  textSize(12);
  noStroke();
  textStyle(NORMAL);
  if(basePlacedP2 == false){
    text("Player 2: [J] Left & [L] Right to pick location",(boardRow)+5,(boardCol/2)+15);
    text("[O] to place laser/base",(boardRow)+5,(boardCol/2)+35);
    text("[J] Left & [L] Right to pick direction",(boardRow)+5,(boardCol/2)+55);
  }else{
    text("Player 2: [I] Up, [J] Left, [K] Down, [L] Right",(boardRow)+5,(boardCol/2)+15);
    text("[O] Places, [P] Removes, [U] Moves",(boardRow)+5,(boardCol/2)+35);
    text("[7] Block, [8] Relfect, [9] Refract, [0] Redirect",(boardRow)+5,(boardCol/2)+55);
    //text("[7] Block, [8] Relfect, [9] Refract, [0] Redirect, [-] Portal",(boardRow)+5,(boardCol/2)+55);
    text("[7/8/9/0] Reclick selected to deselect", (boardRow)+5, (boardCol/2)+75);
  }
  textSize(20);
  strokeWeight(1);
  stroke(0);
  textStyle(BOLD);
  getPlayerFillColor(2);
  text(blockTextP2,(boardRow)+5,(boardCol/2)+100);
  
  fill(0);
  textSize(12);
  noStroke();
  textStyle(NORMAL);
  text("[ESC] to restart the game", (boardRow)+5, (boardCol)-34);
  text("This is Your Laser Digital Prototype", (boardRow)+5, (boardCol)-18);
  text("Programmer/Designer: Joyce Scalettar", (boardRow)+5, (boardCol)-3);
}

/****** Resets game ******/
function init() {
  /****** Reset variables ******/
  //player location (by index number)
  cP1 = 0;
  rP1 = 0;
  cP2 = columns-1;
  rP2 = rows-1;
  laserXP1 = (w*rP1)+(w/2);
  laserYP1 = 0;
  laserXP2 = (w*rP2)+(w/2);
  laserYP2 = height;
  //print("laserXP1="+laserXP1);
  //print("laserxP2="+laserXP2);
  blockTextP1 = "Select point to place your laser";
  blockTextP2 = "Select point to place your laser";
  laserPlacedP1 = false;
  laserPlacedP2 = false;
  laserDirSelP1 = false;
  laserDirSelP2 = false;
  basePlacedP1 = false;
  basePlacedP2 = false;
  //laserDirectP1 = false;
  //laserDirectP2 = false;
  grabbedP1 = false;
  grabbedP2 = false;
  //no blocks selected
  win = 0;
    // 0 = noone hase won
    // 1 = player 1 won
    // 2 = player 2 won
  for (var i = 0; i < totBlocks; i++) {
    blockP1[i] = false;
    blockP2[i] = false;
    //print("P1 block "+i+" is "+blockP1[i]);
  }
  
  /******* Reset Block Array ******/
  //fill block array with -1s
  // -1 means no block at that location
  for ( var i = 0; i < blockCol;i++) {
    for ( var j = 0; j < blockRow;j++) {
        blockPos[i][j]=-1;
    }
  }
}