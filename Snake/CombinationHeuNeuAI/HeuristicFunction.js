function heuristic(pos, goal, coords){
	if(contains(coords, pos)){
		return (width*width+height*height);
	}
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
	return sqrt(x+y+0.001);
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

function predictHeuristically(pos, goal, coords){
	//4 nodes
    let predictions = [];
	let nodes = [];
  	nodes.push(checkPosition([pos[0] - w, pos[1]]))
  	nodes.push(checkPosition([pos[0], pos[1] - w]))
	nodes.push(checkPosition([pos[0] + w, pos[1]]))
	nodes.push(checkPosition([pos[0], pos[1] + w]))
	var min = (width**width+height**height)*2;
    let minIndex = -1;
	for(let i = 0; i < 4; i++){
		let temp = heuristic(nodes[i], goal, coords);
        predictions[i] = temp*1;
		if(temp < min){
			min = temp;
            minIndex = i;
		}
	}
    for(let i = 0; i < 4; i++){
      predictions[i] = normalize(min, predictions[i])
    }
	return predictions;
}