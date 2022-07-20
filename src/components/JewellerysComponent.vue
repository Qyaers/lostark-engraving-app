<template>
	<div>
		<h1>This is list jewellerys</h1>
		<div class="jewellery-list">
			<JewellerysComponent v-for="jewellery in jewellerys" :value="jewellery" :engraving="engraving">
			</JewellerysComponent>
		</div>
	</div>
</template>

<script>
import JewellerysComponent from './JewelleryComponent.vue';
export default {
	components: { JewellerysComponent },
	props: {
		jewellerys: Array,
		engraving: Object
	}
}
</script>
<style>
.jewellery-list {
	display: flex;
	gap: 20px;
}
</style>