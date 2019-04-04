let allFun = {
	filterFolder: ['node_modules', '.git'], // 需要过滤的文件夹
	filterFile: ['.gitkeep'], // 需要过滤的文件,注意要加类型后缀
	filterType: ['.png', '.jpg', '.mp3', '.mp4', '.rar', '.zip', '.7z'], // 需要过滤的文件类型,如果是没有后缀的纯文件，类型值为'.'
	onlyTypes: [], // 如果此数组有值，则只检查此数组内规定的文件类型
	lineSum: 0, //总计代码行数
	fileSum: 0, //总计文件数
	timer: null,
	init: function() {
		let that = this;
		document.querySelector('#btn').addEventListener('change', e => {
			that.lineSum = 0;
			that.fileSum = e.target.files.length;
			that.setTimer();
			for (let entry of e.target.files) {
				// console.log(entry.name, entry.webkitRelativePath, entry);
				that.dispose(entry);
			}
		});
	},
	setTimer: function() {
		let that = this;
		if (that.timer) {
			clearInterval(that.timer);
		}
		that.timer = setInterval(() => {
			if (that.fileSum == 0) {
				clearInterval(that.timer);
				let output = '代码行数总计：' + that.lineSum;
				console.log(output);
				document.getElementById('output').innerText = output;
			}
		}, 2500);
	},
	dispose: function(file) {
		let that = this;
		let path = file.webkitRelativePath;
		for (let i = 0, len = that.filterFolder.length; i < len; i++) {
			let reg = new RegExp('/' + that.filterFolder[i] + '/');
			if (reg.test(path)) {
				that.fileSum--;
				return;
			}
		}
		let name = file.name;
		if (that.filterFile.indexOf(name) != -1) {
			that.fileSum--;
			return;
		}
		let extper = '';
		let ext = '';
		let nameArr = name.split('.');
		let nameArrLen = nameArr.length;
		for (let i = 0, len = nameArrLen - 1; i < len; i++) {
			extper += nameArr[i];
		}
		if (extper == '') {
			ext = '.';
		} else {
			ext = '.' + nameArr[nameArrLen - 1];
		}
		if (that.filterType.indexOf(ext) != -1) {
			that.fileSum--;
			return;
		}
		if (that.onlyTypes.length > 0 && that.onlyTypes.indexOf(ext) == -1) {
			that.fileSum--;
			return;
		}
		that.doCount(file);
	},
	doCount: function(file) {
		let that = this;
		let reader = new FileReader();
		reader.onload = function(e) {
			that.lineGet(file.webkitRelativePath, e.target.result);
		};
		reader.readAsText(file); //发起异步请求
	},
	lineGet: function(fileName, fileText) {
		let that = this;
		let rep = fileText.toString();
		let lines = rep.split('\n');
		console.log(fileName + '    | ' + lines.length + ' |');
		that.fileSum--;
		that.lineSum += lines.length;
	}
};

window.onload = function() {
	allFun.init();
};
