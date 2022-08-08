<template>
	<div class="items-wrap">
		<div class="item-wrap">
			<select-with-search v-model="modelValue.value" @update:modelValue="changeValue"
				:engraving="engravingListValue">
			</select-with-search>
			<select v-model="modelValue.weight" @change="update">
				<option v-for="i in getWeight()" :value="i">{{ i }}</option>
			</select>
			<button @click="clearValue" v-if="modelValue.value">
				X
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		engraving: {
			type: Object,
			default: () => ({})
		},
		modelValue: {
			type: Object,
			default: () => ({
				value: "",
				weight: 0,
			})
		}
	},
	emits: ["update:modelValue"],
	computed: {
		engravingListValue() {
			return { basic: this.engraving.basic, personal: this.engraving.personal };
		}

	},
	methods: {
		clearValue() {
			this.modelValue.value = ""
			this.modelValue.weight = 0
			this.update();
		},
		getWeight() {
			if (this.modelValue.value) return [3, 6, 9, 12]
			else return [0];
		},
		changeValue() {
			this.modelValue.weight = 3;
			this.update();
		},
		update() {
			this.$emit("update:modelValue", { ...this.modelValue });
		},
	}
}
</script>