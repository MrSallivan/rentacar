let orderBtns = document.querySelectorAll('a[data-target="#OrderModalCenter"]')


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