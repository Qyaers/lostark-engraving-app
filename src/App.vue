<template>
	<div>
		<fetranit v-model="fetranit" :engraving="engraving"></fetranit>
		<slots :slots="slots" :engraving="engraving"></slots>
		<jewellerys :jewellerys="jewellerys" :engraving="engraving"></jewellerys>
	</div>
</template>

<script>

import data from "./data.json";
import fetranit from "./components/FetranitComponent.vue";
import slots from "./components/SlotsComponent.vue";
import jewellerys from "./components/JewellerysComponent.vue";

export default {
	components: { fetranit, slots, jewellerys },
	data() {
		return {
			engraving: {},
			fetranit: {},
			slots: [{}, {}],
			jewellerys: [{}, {}, {}, {}, {}],
		}
	},
	mounted() {
		this.engraving = data;
	},
	methods: {
		update(e) {
			console.log("App", e);
		}
	}
}
</script>