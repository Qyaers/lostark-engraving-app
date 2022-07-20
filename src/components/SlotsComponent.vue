<template>
	<div>
		<h1>This is list slots</h1>
		<SlotsComponent v-for="slot in slots" :value="slot" :engraving="engraving"></SlotsComponent>
	</div>
</template>

<script>
import SlotsComponent from './SlotComponent.vue';
export default {
	components: { SlotsComponent },
	props: {
		slots: Array,
		engraving: Object
	}
}
</script>