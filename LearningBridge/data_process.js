var fs = require('fs');
var join = require('path').join;
var jsonFiles = [];

function getJsonFiles(jsonPath) {
  function findJsonFile(path) {
    let files = fs.readdirSync(path);
    files.forEach(function (item, index) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        jsonFiles.push(fPath);
      }
    });
  }
  findJsonFile(jsonPath);
}

setInterval(function() {
	jsonFiles = [];
	getJsonFiles("data");

	let rawJson = fs.readFileSync(jsonFiles[jsonFiles.length-1]);
	let wholeData = JSON.parse(rawJson);

	const pose = wholeData.people[0] ? wholeData.people[0].pose_keypoints_2d : 0;


	//var arguments = process.argv.splice(2);
	
	//var putRight = arguments[0].toLowerCase() === 'right' ? true : false;

	//var tanAngle = 0;
	var lToeX = pose[60] ? pose[60] : pose[57];
	var lToeY = pose[61] ? pose[61] : pose[58];
	var rToeX = pose[69] ? pose[69] : pose[66];
	var rToeY = pose[70] ? pose[70] : pose[67];
	var heelX = pose[72] ? pose[72] : pose[63];
	var heelY = pose[73] ? pose[73] : pose[64];
	var toeX = rToeX ? rToeX : lToeX;
	var toeY = rToeY ? rToeY : lToeY;
	var ankleX = pose[42] ? pose[42] : pose[33];
	var ankleY = pose[43] ? pose[43] : pose[34];
	var kneeX = pose[39] ? pose[39] : pose[30];
	var kneeY = pose[40] ? pose[40] : pose[31];
	if (!pose) {
		// 没有人
		console.log('Please adjust your side camera!');
	}
	else if ((pose[18] && pose[21] && pose[15] && pose[24] && pose[39] && pose[42]) &&
	Math.abs((pose[19]-pose[22])/(pose[18]-pose[21]))<0.26 &&
	Math.abs((pose[18]-pose[15])/(pose[19]-pose[16]))<0.36 &&
	Math.abs((pose[25]-pose[16])/(pose[24]-pose[15]))<0.36 &&
	(!pose[6] || Math.abs((pose[25]-pose[7])/(pose[24]-pose[6]))<0.36) &&
	Math.abs(Math.atan((pose[24]-pose[39])/(pose[25]-pose[40]))-Math.atan((pose[39]-pose[42])/(pose[40]-pose[43])))<Math.PI/6 &&
	Math.abs((pose[25]-pose[22])/(pose[24]-pose[21])) > 0.17) {
		// 左手腕与左手肘平行地面
		// 左手肘与左肩垂直地面
		// 左肩与中臀近似平行地面
		// 右肩与中臀近似平行地面or右肩不存在
		// 中臀到左膝盖的线与左膝盖到左脚后跟的线角度小于30
		// 中臀到左手肘与地面至少成10度
		console.log('You are doing perfect plank!');
	}
	else if ((pose[18] && pose[21] && pose[15] && pose[24]) &&
	Math.abs((pose[19]-pose[22])/(pose[18]-pose[21]))<0.26 &&
	Math.abs((pose[18]-pose[15])/(pose[19]-pose[16]))<0.36 &&
	Math.abs((pose[25]-pose[16])/(pose[24]-pose[15]))<0.36 &&
	(!pose[6] || Math.abs((pose[24]-pose[6])/(pose[25]-pose[7]))<0.36)) {
		// 左手腕与左手肘平行地面
		// 左手肘与左肩垂直地面
		// 左肩与中臀近似平行地面
		// 右肩与中臀近似平行地面or右肩不存在
		console.log('You are doing plank. Come on and keep your legs up!');
	}
	else if ((pose[12] && pose[24] && pose[6] && pose[30] && rToeX && pose[39] && pose[57] && pose[3]) &&
	Math.abs((rToeY-pose[13])/(rToeX-pose[12]))<0.17 &&
	Math.abs((pose[25]-pose[7])/(pose[24]-pose[6]))<0.26 &&
	(Math.abs(Math.atan((pose[7]-pose[25])/(pose[6]-pose[24]))-Math.atan((pose[16]-pose[25])/(pose[15]-pose[24])))>Math.PI/18 && Math.abs(Math.atan((pose[7]-pose[25])/(pose[6]-pose[24]))-Math.atan((pose[16]-pose[25])/(pose[15]-pose[24])))<Math.PI/4) &&
	pose[3] < rToeX) {
		// 右手肘与右小脚趾平行地面
		// 右肩与中臀平行地面
		// 左右肩与中臀成V字
		// 脖子在右小脚趾左边很多
		console.log('You are doing perfect side plank!');
	}
	else if ((pose[12] && pose[24] && pose[6] && pose[30] && rToeX && pose[39] && pose[57] && pose[3]) &&
	Math.abs((rToeY-pose[13])/(rToeX-pose[12]))<0.17 &&
	(Math.abs(Math.atan((pose[7]-pose[25])/(pose[6]-pose[24]))-Math.atan((pose[16]-pose[25])/(pose[15]-pose[24])))>Math.PI/18 && Math.abs(Math.atan((pose[7]-pose[25])/(pose[6]-pose[24]))-Math.atan((pose[16]-pose[25])/(pose[15]-pose[24])))<Math.PI/4) &&
	pose[3] < rToeX) {
		// 右手肘与右小脚趾平行地面
		// 左右肩与中臀成V字
		// 脖子在右小脚趾左边很多
		console.log('You are doing side plank. Come on and keep your hip up!');
	}
	else if ((pose[3] && toeX && heelX && kneeX && pose[24] && ankleX) &&
	Math.abs((toeY-heelY)/(toeX-heelX))<0.36 &&
	((kneeX-ankleX)/(kneeY-ankleY)>-1 && (kneeX-ankleX)/(kneeY-ankleY)<0) &&
	(Math.abs(Math.atan((kneeX-ankleX)/(kneeY-ankleY))-Math.atan((kneeX-pose[24])/(kneeY-pose[25])))>Math.PI/18 && Math.abs(Math.atan((kneeX-ankleX)/(kneeY-ankleY))-Math.atan((kneeX-pose[24])/(kneeY-pose[25])))<Math.PI/2) &&
	Math.abs((pose[25]-pose[4])/(pose[24]-pose[3]))<0.36) {
		// 小脚趾与脚后跟平行地面
		// 左脚踝到左膝的线与竖直成小于45度
		// 左脚踝到左膝的线与中臀到左膝的线成V字
		// 左臀与脖子平行地面
		console.log('You are doing perfect bridge!');
	}
	else if ((pose[3] && toeX && heelX && kneeX && pose[24] && ankleX) &&
	Math.abs((toeY-heelY)/(toeX-heelX))<0.36 &&
	((kneeX-ankleX)/(kneeY-ankleY)>-1 && (kneeX-ankleX)/(kneeY-ankleY)<0) &&
	Math.abs(Math.atan((pose[24]-pose[39])/(pose[25]-pose[40]))-Math.atan((pose[3]-pose[24])/(pose[4]-pose[25])))<Math.PI/6) {
		// 小脚趾与脚后跟平行地面
		// 左脚踝到左膝的线与竖直成小于45度
		// 左臀到左膝的线与脖子到左臀的线角度小于30
		console.log('You are doing perfect bridge!');
	}
	else if ((toeX && heelX && kneeX && ankleX) &&
	Math.abs((toeY-heelY)/(toeX-heelX))<0.36 &&
	((kneeX-ankleX)/(kneeY-ankleY)>-1 && (kneeX-ankleX)/(kneeY-ankleY)<0)) {
		// 左脚踝到左膝的线与竖直成小于45度
		console.log('You are doing bridge. Come on and keep your hip up!');
	}
	else {
		console.log('Come on and do yoga!');
		//console.log('pose[3]:',pose[3]);
		//console.log('pose[6]:',pose[6]);
		//console.log('pose[12]:',pose[12]);
		//console.log('pose[15]:',pose[15]);
		//console.log('pose[18]:',pose[18]);
		//console.log('pose[24]:',pose[24]);
		//console.log('pose[18]:',pose[18]);
		//console.log('pose[27]:',pose[27]);
		//console.log('pose[30]:',pose[30]);
		//console.log('pose[39]:',pose[39]);
		//console.log('pose[42]:',pose[42]);
		//console.log('pose[57]:',pose[57]);
		//console.log('pose[60]:',pose[60]);
		//console.log('pose[63]:',pose[63]);
		//console.log('pose[66]:',pose[66]);
		//console.log('pose[69]:',pose[69]);
		//console.log('pose[72]:',pose[72]);
		//console.log('(pose[18] && pose[21] && pose[15] && pose[24] && pose[39] && pose[42]):',(pose[18] && pose[21] && pose[15] && pose[24] && pose[39] && pose[42]));
		//console.log('Math.abs((pose[19]-pose[22])/(pose[18]-pose[21])):',Math.abs((pose[19]-pose[22])/(pose[18]-pose[21])));
		//console.log('Math.abs((pose[18]-pose[15])/(pose[19]-pose[16])):',Math.abs((pose[18]-pose[15])/(pose[19]-pose[16])));
		//console.log('Math.abs((pose[25]-pose[16])/(pose[24]-pose[15])):',Math.abs((pose[25]-pose[16])/(pose[24]-pose[15])));
		//console.log('(!pose[6] || Math.abs((pose[25]-pose[7])/(pose[24]-pose[6]))<0.36):',(!pose[6] || Math.abs((pose[25]-pose[7])/(pose[24]-pose[6]))<0.36));
		//console.log('Math.abs(Math.atan((pose[24]-pose[39])/(pose[25]-pose[40]))-Math.atan((pose[39]-pose[42])/(pose[40]-pose[43])))<Math.PI/6:',Math.abs(Math.atan((pose[24]-pose[39])/(pose[25]-pose[40]))-Math.atan((pose[39]-pose[42])/(pose[40]-pose[43])))<Math.PI/6);
		//console.log('(pose[12] && pose[24] && pose[6] && pose[30] && rToeX && pose[39] && pose[57]):',(pose[12] && pose[24] && pose[6] && pose[30] && rToeX && pose[39] && pose[57]));
		//console.log('Math.abs((rToeY-pose[13])/(rToeX-pose[12])):',Math.abs((rToeY-pose[13])/(rToeX-pose[12])));
		//console.log('Math.abs((pose[25]-pose[7])/(pose[24]-pose[6])):',Math.abs((pose[25]-pose[7])/(pose[24]-pose[6])));
		//console.log('Math.abs(Math.atan((pose[7]-pose[25])/(pose[6]-pose[24]))-Math.atan((pose[16]-pose[25])/(pose[15]-pose[24]))):',Math.abs(Math.atan((pose[7]-pose[25])/(pose[6]-pose[24]))-Math.atan((pose[16]-pose[25])/(pose[15]-pose[24]))));
		//console.log('(pose[3] && toeX && heelX && pose[39] && pose[24]):',(pose[3] && toeX && heelX && pose[39] && pose[24]));
		//console.log('Math.abs((toeY-heelY)/(toeX-heelX)):',Math.abs((toeY-heelY)/(toeX-heelX)));
		//console.log('(pose[39]-heelX)/(pose[40]-heelY):',(pose[39]-heelX)/(pose[40]-heelY));
		//console.log('Math.abs(Math.atan((pose[39]-heelX)/(pose[40]-heelY))-Math.atan((pose[39]-pose[24])/(pose[40]-pose[25]))):',Math.abs(Math.atan((pose[39]-heelX)/(pose[40]-heelY))-Math.atan((pose[39]-pose[24])/(pose[40]-pose[25]))));
		//console.log('Math.abs((pose[25]-pose[4])/(pose[24]-pose[3])):',Math.abs((pose[25]-pose[4])/(pose[24]-pose[3])));
		//console.log('Math.abs(Math.atan((pose[24]-pose[39])/(pose[25]-pose[40]))-Math.atan((pose[3]-pose[24])/(pose[4]-pose[25]))):',Math.abs(Math.atan((pose[24]-pose[39])/(pose[25]-pose[40]))-Math.atan((pose[3]-pose[24])/(pose[4]-pose[25]))));
	}
},4290);