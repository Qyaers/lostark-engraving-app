<template>
	<div>
		<h2>Слоты под гравировки</h2>
		<SlotComponent v-for="(slot, index) in modelValue" :modelValue="modelValue[index]" :engraving="engraving"
			@update:modelValue="update">
		</SlotComponent>
	</div>
</template>

<script>
import SlotComponent from './SlotComponent.vue';
export default {
	components: { SlotComponent },
	props: {
		modelValue: Object,
		engraving: Object
	},
	emits: ["update:modelValue"],
	methods: {
		update() {
			this.$emit("update:modelValue", { ...this.modelValue });
		},
	}
}
</script>