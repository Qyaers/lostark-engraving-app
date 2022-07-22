<template>
	<div>
		<h2>Фетранит</h2>
		<div v-for="(engr, index) in listEngraving">
			{{ engr.value }}
			<select v-model="listEngraving[index].value" v-if="!engr.value" @change="update()">
				<option v-for="value in getEngravingValue()" :value="value">{{ value }}</option>
			</select>
			<select v-model="listEngraving[index].weight" @change="update()">
				<option v-for="i in 11" :value="i - 1">{{ i - 1 }}</option>
			</select>
			<button @click="clearEngraving(listEngraving[index])" v-if="engr.value">X</button>

		</div>
	</div>
</template>

<script>
export default {
	props: ["modelValue", "engraving"],
	emits: ["update:modelValue"],
	data() {
		return {
			listEngraving: [{
				value: "",
				weight: 0
			}, {
				value: "",
				weight: 0
			}, {
				value: "",
				weight: 0
			}],
		}
	},
	methods: {
		getEngravingValue() {
			let curEngraving = [];
			let result = [];

			for (let engr of this.listEngraving)
				if (engr.value)
					curEngraving.push(engr.value);

			let positiveCount = 0;

			if (curEngraving.length)
				for (let value of curEngraving)
					if (~this.engraving.basic.indexOf(value))
						positiveCount++;

			let debuffCount = 0;

			if (curEngraving.length)
				for (let value of curEngraving)
					if (~this.engraving.debuff.indexOf(value))
						debuffCount++;

			if (positiveCount < 2 && Array.isArray(this.engraving.basic)) {
				for (let checkValue of this.engraving.basic) {
					if (!~curEngraving.indexOf(checkValue))
						result.push(checkValue);
				}
			}

			if (!debuffCount) {
				result = result.concat(this.engraving.debuff);
			}
			return result;
		},
		clearEngraving(engrav) {
			engrav.value = '';
			engrav.weight = 0;
			this.update();
		},
		update() {
			this.$emit("update:modelValue", { ...this.listEngraving });
		}
	}
}
</script>