<template>
	<div>
		<select v-model="modelValue.value" @change="changeValue">
			<option v-for="engr in engravingListValue" :value="engr">{{ engr }}</option>
		</select>
		<select v-model="modelValue.weight" @change="update">
			<option v-for="i in getWeight()" :value="i">{{ i }}</option>
		</select>
		<button @click="clearValue" v-if="modelValue.value">
			X
		</button>
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
			return Array.isArray(this.engraving.basic) ? [].concat(this.engraving.basic, this.engraving.personal).sort((a, b) => a > b ? 1 : a < b ? -1 : 0) : [];
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