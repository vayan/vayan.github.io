window.addEventListener('load', (event) => {
	let loader = new FakeLoading(25, function () {
		window.location = "content.html"
	})

	loader.startLoading()
});

class FakeLoading {
	messages = [
		"loading assets way to large",
		"overriding scrolling",
		"making things hard to navigate",
		"blocking back button",
		"optimizing for Chrome only",
		"taking 60% of CPU usage",
		"doing parallax for no reason",
		"downloading 2GB of web fonts",
		"creating self attributed awards",
		"forgetting about Firefox and Safari",
		"SEO",
		"making things pretty",
		"killing readability"
	]
	maxLoadingTimeSecond = 5;
	percentage = 0;
	percentageIncrement = 5;

	onLoadFinish = function () {
	}

	constructor(maxLoadingTimeSec, onLoadFinish) {
		this.maxLoadingTimeSecond = maxLoadingTimeSec;
		this.shuffleMessages()
		this.percentageIncrement = Math.ceil(100 / Math.ceil(maxLoadingTimeSec / 2))
		this.onLoadFinish = onLoadFinish
	}

	shuffleMessages() {
		for (let i = this.messages.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let tmp = this.messages[i];
			this.messages[i] = this.messages[j];
			this.messages[j] = tmp;
		}
	}

	getRandomMessage() {
		return this.messages.pop();
	}

	progress() {
		window.setTimeout(function () {
			this.percentage = this.percentage + this.percentageIncrement;

			if (this.percentage > 100) {
				this.percentage = 100;
			}

			document.getElementById("loader-progress").style.width = `${this.percentage}%`
			document.getElementById("loading-message").innerText = this.getRandomMessage()

			if (this.percentage < 100) {
				this.progress()
			} else {
				window.setTimeout(function () {
					this.onLoadFinish()
				}.bind(this), 2000)
			}
		}.bind(this), Math.random() * 2000)
	}

	startLoading() {
		this.progress()
	}

	stopLoading() {
		this.onLoadFinish()
	}
}
