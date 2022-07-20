<template>
	<div>
		<select v-model="value" @change="weight = 3">
			<option v-for="engr in engravingListValue" :value="engr">{{ engr }}</option>
		</select>
		<select v-model="weight">
			<option v-for="i in getWeight()" :value="i">{{ i }}</option>
		</select>
		<button @click="clearValue" v-if="value">
			X
		</button>
	</div>
</template>

<script>
export default {
	props: ["modelValue", "engraving"],
	data() {
		return {
			value: "",
			weight: 0
		}
	},
	computed: {
		engravingListValue() {
			return Array.isArray(this.engraving.basic) ? [].concat(this.engraving.basic, this.engraving.personal) : [];
		}
	},
	methods: {
		clearValue() {
			this.value = ""
			this.weight = 0
		},
		getWeight() {
			if (this.value) return [3, 6, 9, 12]
			else return [0];
		}
	}
}
</script>