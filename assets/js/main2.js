let orderBtns = document.querySelectorAll('a.car-card__order')
console.log(orderBtns)

orderBtns.forEach(item => {
	item.addEventListener('click', (e) => {
		let parentNode = e.target.parentNode.parentNode
		console.log(parentNode)
		let cartPropertys = parentNode.nextSibling.previousSibling.children[2]
		console.log(cartPropertys)
		let carBrand = cartPropertys.children[0].children[0].innerHTML
		console.log(carBrand)
		let carYear = cartPropertys.children[1].children[0].innerHTML
		console.log(carYear)
		let carEngine = cartPropertys.children[2].children[0].innerHTML
		console.log(carEngine)
		let carDrive = cartPropertys.children[3].children[0].innerHTML
		console.log(carDrive)
		let carTransmis = cartPropertys.children[4].children[0].innerHTML
		console.log(carTransmis)
	})
})