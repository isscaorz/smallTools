const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

let filterFolder = ['node_modules', '.git']; // 需要过滤的文件夹
let filterFile = ['.gitkeep']; // 需要过滤的文件
let filterType = ['.png', '.jpg']; // 需要过滤的文件类型
let onlyTypes = []; // 如果此数组有值，则只检查此数组内规定的文件类型，例：'.vue'说明只统计vue类型的文件
let num = 0; // 统计结果

// 获取行数
async function line(fileName) {
	let rep = await fs.readFileSync(fileName);
	rep = rep.toString();
	let lines = rep.split('\n');
	console.log(fileName + '    | ' + lines.length + ' |');
	num += lines.length;
}

// 递归所有文件夹统计
async function start(filePath) {
	let files = fs.readdirSync(filePath);
	files
		.map(file => {
			return path.join(filePath, file);
		})
		.forEach(file => {
			let stat = fs.statSync(file);
			if (stat.isDirectory()) {
				for (let i = 0, len = filterFolder.length; i < len; i++) {
					let reg1 = new RegExp('\\\\' + filterFolder[i]);
					let reg2 = new RegExp('/' + filterFolder[i]);
					if (reg1.test(file) || reg2.test(file)) {
						return;
					}
				}
				start(file);
				return;
			}

			let basename = path.basename(file);
			let ext = path.extname(file);
			let name = basename.substr(0, basename.length - ext.length);
			if (filterType.indexOf(ext) != -1) {
				return;
			}
			if (filterFile.indexOf(name) != -1) {
				return;
			}
			if (onlyTypes.length > 0 && onlyTypes.indexOf(ext) == -1) {
				return;
			} else {
				line(file);
			}
		});
}

(async () => {
	let s = execSync('choose.bat');
	let rootPath = s
		.toString()
		.substr(0, s.length - 2)
		.replace(/\\/g, '\\\\');
	console.log(rootPath);
	console.log('开始计算：');
	await start(rootPath);
	console.log(`总代码行数：${num}`);
})();
