let orderBtns = document.querySelectorAll('a[data-target="#OrderModalCenter"]')
let detailsBtns = document.querySelectorAll('a.car-card__more.map-show')

orderBtns.forEach(item => {
	item.addEventListener('mousedown', (e) => {
		let parentNode = e.target.parentNode.parentNode
		let cartPropertys = parentNode.nextSibling.previousSibling.children[2]
		let carBrand = cartPropertys.children[0].children[0].innerHTML
		let carYear = cartPropertys.children[1].children[0].innerHTML
		let carEngine = cartPropertys.children[2].children[0].innerHTML
		let carDrive = cartPropertys.children[3].children[0].innerHTML
		let carTransmis = cartPropertys.children[4].children[0].innerHTML
		let carImageSrc = parentNode.nextSibling.previousSibling.children[0].children[0].src
		let carImageAlt = parentNode.nextSibling.previousSibling.children[0].children[0].alt
		let carCoast = +parentNode.nextSibling.previousSibling.children[1].children[0].innerHTML.slice(3)

		let modalWindow = document.querySelector('.modal-body')

		let start
		let end
		let scoreDays = 0

		modalWindow.innerHTML = `
			<div class="car-card__wrapper">
				<div class="car-card__image">
					<img class="car-card__img" src="${carImageSrc}"
								alt="${carImageAlt}">
				</div>
				<div class="car-card__price">
					<div class="car-card__coast">от ${carCoast}</div>
					<div class="car-card__descr">руб./сутки</div>
				</div>
				<div class="car-card__properties">
					<div class="car-card__brand">Марка <span class="car-card__brand_val">${carBrand}</span></div>
					<div class="car-card__year">Год выпуска <span class="car-card__year_val">${carYear}</span></div>
					<div class="car-card__engine">Двигатель <span class="car-card__engine_val">${carEngine}</span>
					</div>
					<div class="car-card__drive">Привод <span class="car-card__drive_val">${carDrive}</span>
					</div>
					<div class="car-card__transmission">Трансмиссия <span class="car-card__transmission_val">${carTransmis}</span>
					</div>
					<hr>
				</div>
					 <input type="hidden" name="admin_email[]" value="alexnikolaenko@yandex.ru">
					<div class="form-order__input">
						<label for="form-order__input_start">С</label>
						<input id="form-order__input_start" placeholder="с" type="date" name="order-start"/>
					</div>
					<div class="form-order__input">
						<label for="form-order__input_end">По</label>
						<input id="form-order__input_end" placeholder="с" type="date" name="order-end"/>
					</div>
					<div class="row">
						<div class="col-lg-6 col-md-6">
							<div class="form-order__input">
								<input required type="text" placeholder="Имя" name="order-name">
							</div>
						</div>
						<div class="col-lg-6 col-md-6">
							<div class="form-order__input">
								<input required type="tel" placeholder="Телефон" name="order-tel">
							</div>
						</div>
					</div>
					<div class="total-coast">
						<div>Итого: </div>
						<div>0 руб.</div>
					</div>
			</div>
			`

		function check() {
			let orderStart = document.getElementById('form-order__input_start')
			let orderEnd = document.getElementById('form-order__input_end')
		
			orderStart.oninput = () => {
				let date1 = new Date(orderStart.value)
				start = Date.parse(date1)
				console.log(start)
			}
			orderEnd.oninput = () => {
				var date2 = new Date(orderEnd.value)
				end = Date.parse(date2)
				scoreDays = Math.floor(Math.abs(end - start) / (1000 * 60 * 60 * 24))
				let coastDiv = document.querySelector('.total-coast')
				coastDiv.innerHTML = `
					<div>Итого: </div>
					<div>${(scoreDays + 1)*carCoast} руб.</div>
				`
			}
			let modal = document.querySelector('#OrderModalCenter')
			let modalClose = modal.classList.toString().split(' ').includes('show')
			
			if(!modalClose){
				clearInterval(interval)
			}
		}
		let interval = setInterval(check, 100)
		check()
	})
})

detailsBtns.forEach(item=>{
	item.addEventListener('mousedown', (e) => {
		let parentNode = e.target.parentNode.parentNode
		let carTitle = parentNode.previousElementSibling.childNodes[0].nodeValue
		localStorage.setItem('carTitle', carTitle)
		let cartPropertys = parentNode.nextSibling.previousSibling.children[2]
		localStorage.setItem('cartPropertys', cartPropertys.outerHTML)
		let carText = parentNode.nextSibling.previousSibling.children[3].textContent
		localStorage.setItem('cartText', carText)
		let carBrand = cartPropertys.children[0].children[0].innerHTML
		localStorage.setItem('carBrand', carBrand)
		let carYear = cartPropertys.children[1].children[0].innerHTML
		localStorage.setItem('carYear', carYear)
		let carEngine = cartPropertys.children[2].children[0].innerHTML
		let carDrive = cartPropertys.children[3].children[0].innerHTML
		let carTransmis = cartPropertys.children[4].children[0].innerHTML
		let carImages = parentNode.nextSibling.previousSibling.children[0].children
		let arr = [].slice.call(carImages);
		let arrImg =[]
		arr.forEach(item=>{
			arrImg.push(item.outerHTML.toString())
		})
		console.log(arrImg)
		localStorage.setItem('carImages', JSON.stringify(arrImg))
		let carImagesLength = carImages.length
		localStorage.setItem('carImagesLength', carImagesLength)
		let carImageAlt = parentNode.nextSibling.previousSibling.children[0].children[0].alt
		let carCoast = +parentNode.nextSibling.previousSibling.children[1].children[0].innerHTML.slice(3)
		localStorage.setItem('carCoast', carCoast)

	})
})

let h2 = document.querySelector('.car-details-content-h2')
let carBrand = localStorage.getItem('carBrand')
let carTitle = localStorage.getItem('carTitle')
let carCoast = localStorage.getItem('carCoast')
h2.innerHTML = `${carTitle} <span class="price">От <b class="coast-detail">${carCoast}</b>руб.</span>`
let cartPropertys = localStorage.getItem('cartPropertys')
let prop = document.querySelector('.sidebar-body')
prop.innerHTML = `${cartPropertys}`
let carText = localStorage.getItem('cartText')
let divCarText = document.querySelector('.car-details-infotext')
divCarText.textContent = `${carText}`
let inputNameCarInDetails = document.querySelector('.nameCarInDetails')
inputNameCarInDetails.setAttribute('value', carTitle)
//Вставка картинок из карточки в описание
let carImages = JSON.parse(localStorage.getItem('carImages'))
let carImagesLength = localStorage.getItem('carImagesLength')
console.log(carImages, carImagesLength)


for(let i = 0; i < carImagesLength; i++) {
	let imgStr = carImages[i]
	imgStr = imgStr.trim().split(" ")
	imgStr = imgStr[2].slice(5).slice(0, -1)
	
	console.log(imgStr)
}
