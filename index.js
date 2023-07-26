
const versions = ['s18', 's19', 's20']

function getElementByXPath(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


console.log('====== 3D Warehouse Legacy Download by Gabriel Davi ====== ')
console.log('Extensão carregada com sucesso.')

function renderDownloadButton(id, list) {
	const downloadPattern = (version = 's20') => `https://3dwarehouse.sketchup.com/warehouse/v1.0/entities/${id}/binaries/${version}?download=true`

	const buttonsHTML = versions.map(version => `
	<li style="background-color: #cae4fb; text-align: left; width: 100%; font-size: .925rem; color: white; padding: .625rem 1rem; list-style: none;" id="pv_id_4_0" class="p-menuitem" role="menuitem" aria-label="SketchUp 2023 File"><div class="p-menuitem-content"><div data-v-legacy=""><button
	onclick="window.open('${downloadPattern(version)}', '_blank');" class="download-item" data-cy="download-menu-s20" data-v-legacy="">Legacy 20${version.replace(/[^0-9]/g, '')} File </button></div></div></li>`).join('')

	list.insertAdjacentHTML('beforebegin', buttonsHTML)

}

function extractId(href) {
	const id = href.replace(/https:\/\/3dwarehouse.sketchup.com\/model\//, '').split('/')[0]
	return id
}

async function listPageRoutine() {
	const classes = document.getElementsByClassName('search-results__content-card')
	if (!classes.length) {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		return await listPageRoutine()
	}
	for (let i = 0; i <= classes.length - 1; i++) {
		const id = extractId(classes[i].getElementsByTagName('a')[0].href);
		const download = classes[i].getElementsByClassName('wh wh-download icon')[0];
		download.onclick = async () => {
			await new Promise((resolve) => setTimeout(resolve, 1))
			const list = document.getElementsByClassName('p-menu-list')[0]
			renderDownloadButton(id, list)
		}
	}
}

async function productPageRoutine() {
	if (!getElementByXPath('//*[@id="app"]/div[2]/div//*[text()="Download "]')) {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		await productPageRoutine()
	}
	const id = window.location.href.replace(/https:\/\/3dwarehouse.sketchup.com\/model\//, '').split('/')[0]

	getElementByXPath('//*[@id="app"]/div[2]/div//*[text()="Download "]').onclick = () => {
		const list = document.getElementById('pv_id_4_list');
		renderDownloadButton(id, list)
	}
}

productPageRoutine()
listPageRoutine()