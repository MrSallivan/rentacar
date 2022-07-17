let orderBtns = document.querySelectorAll('.car-card__order')

for (let orderBtn of orderBtns) {
	orderBtn.addEventListener('click', (e) => {
		let parentNode = e.target.parentNode.parentNode
		console.log(parentNode)

	})
}