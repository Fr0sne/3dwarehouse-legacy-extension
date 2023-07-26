
async function mainRoutine() {
	if (!getElementByXPath('//*[@id="app"]/div[2]/div//*[text()="Download "]')) {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		await mainRoutine()
	}
	const id = window.location.href.replace(/https:\/\/3dwarehouse.sketchup.com\/model\//, '').split('/')[0]

	const downloadPattern = `https://3dwarehouse.sketchup.com/warehouse/v1.0/entities/${id}/binaries/s20?download=true`

	const button = `<li style="background-color: #cae4fb; text-align: left; width: 100%; font-size: .925rem; color: white; padding: .625rem 1rem; list-style: none;" id="pv_id_4_0" class="p-menuitem" role="menuitem" aria-label="SketchUp 2023 File"><div class="p-menuitem-content"><div data-v-legacy=""><button
	onclick="window.open('${downloadPattern}', '_blank');" class="download-item" data-cy="download-menu-s20" data-v-legacy="">Legacy 2020 File </button></div></div></li>`

	function getElementByXPath(xpath) {
		return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}

	getElementByXPath('//*[@id="app"]/div[2]/div//*[text()="Download "]').onclick = () => {
		const list = document.getElementById('pv_id_4_list');
		list.insertAdjacentHTML('beforebegin', button)
	}


}

mainRoutine()