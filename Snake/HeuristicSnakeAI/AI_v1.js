function heuristic(pos, goal){
	if(contains(coords, pos)){
		return (width*width+height*height);
	}
	//experimential
	/*nbs = []
	nbs.push(checkPosition([pos[0] + w, pos[1]]))
	nbs.push(checkPosition([pos[0] - w, pos[1]]))
	nbs.push(checkPosition([pos[0], pos[1] + w]))
	nbs.push(checkPosition([pos[0], pos[1] - w]))
	var counter = 0;
	for(var i = 0; i < 4; i++){
		if(contains(coords, nbs[i])){
			counter++;
		}
	}
	if(counter >= 2) return (width*width+height*height) * 10;*/
	//x
	a = (goal[0]-pos[0])*(goal[0]-pos[0])
	b = (pos[0] + width - goal[0])*(pos[0] + width - goal[0])
	c = (width - pos[0] + goal[0])*(width - pos[0] + goal[0])
	x = min(a,b,c);
	//y
	a = (goal[1]-pos[1])*(goal[1]-pos[1])
	b = (pos[1] + height - goal[1])*(pos[1] + height - goal[1])
	c = (height - pos[1] + goal[1])*(height - pos[1] + goal[1])
	y = min(a,b,c);
	return sqrt(x+y);
}

function contains(ndimentionalarray, listComp){
	for(var j = 0; j < ndimentionalarray.length; j++){
		list_ori = ndimentionalarray[j];
		var contain = true;
		for(var i = 0; i < list_ori.length; i++){
			if(list_ori[i] != listComp[i]){
				contain = false;
				break;
			}
		}
		if(contain) return true;
	};
	return false;
}

function predictv1(pos, goal){
	//4 nodes
	//console.log(pos);
	moves = [39, 37, 40, 38]
	nodes = []
	nodes.push(checkPosition([pos[0] + w, pos[1]]))
	nodes.push(checkPosition([pos[0] - w, pos[1]]))
	nodes.push(checkPosition([pos[0], pos[1] + w]))
	nodes.push(checkPosition([pos[0], pos[1] - w]))
	var min = (width**width+height**height)*2;
	var prediction;
	for(var i = 0; i < 4; i++){
		var temp = heuristic(nodes[i], goal);
		//console.log(temp);
		if(temp < min){
			min = temp;
			prediction = moves[i];
		}
	}
	//console.log("prediction" + prediction);
	return prediction;
}