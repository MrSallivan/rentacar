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
console.log(carImages, +carImagesLength)

let slider = document.querySelector('.car-preview-crousel')

console.log(slider)

for (let i = 0; i < +carImagesLength; i++) {
	let imgStr = carImages[i]
	imgStr = imgStr.trim().split(" ")
	imgStr = imgStr[2].slice(5).slice(0, -1)

	console.log(imgStr)
	let scp = document.createElement('div')
	scp.classList.add('single-car-preview')
	scp.classList.add('item')
	slider.append(scp)

	let ctm = document.createElement('div')
	ctm.classList.add('p-car-thumbnails')
	ctm.innerHTML = `
				<a class="car-hover" href="${imgStr}">
					${carImages[i]}
				</a>`
	
	scp.append(ctm)
}


let ImgsScrol = document.querySelectorAll('.car-hover .car-card__img')
ImgsScrol.forEach(item=>{
	item.classList.remove('car-card__img')
})


