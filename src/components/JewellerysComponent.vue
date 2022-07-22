<template>
	<div>
		<h2>Бижутерия</h2>
		<div class="jewellery-list">
			<JewelleryComponent v-for="(jewellery, index) in modelValue" v-model="modelValue[index]" :engraving="engraving"
				@update:modelValue="update">
			</JewelleryComponent>
		</div>
	</div>
</template>

<script>
import JewelleryComponent from './JewelleryComponent.vue';
export default {
	components: { JewelleryComponent },
	props: {
		modelValue: Array,
		engraving: Object
	},
	emits: ["update:modelValue"],
	methods: {
		update() {
			this.$emit("update:modelValue", [...this.modelValue]);
		}
	}
}
</script>

<style>
.jewellery-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	gap: 20px;
}
</style>