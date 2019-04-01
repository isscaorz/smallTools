let fs = require('fs');
let path = require('path');

let parm = process.argv.splice(2); // 获取命令行参数
let rootPath = parm[0] //如果规定了路径，路径放第一个参数
	? /^.\//.test(parm[0])
		? path.join(__dirname, parm[0])
		: parm[0]
	: path.join(__dirname);
let filterFolder = ['node_modules', '.git']; // 需要过滤的文件夹
let filterFile = ['.gitkeep']; // 需要过滤的文件
let filterType = ['.png', '.jpg']; // 需要过滤的文件类型
let onlyTypes = []; // 如果此数组有值，则只检查此数组内规定的文件类型
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
			if (basename == 'ccode.js') {
				return;
			}
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
	await start(rootPath);
	console.log(`总代码行数：${num}`);
})();
