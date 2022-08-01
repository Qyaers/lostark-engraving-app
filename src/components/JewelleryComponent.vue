<template>
	<div class="jewellery-item">
		<div v-for="(engr, index) in listEngraving">
			<select-with-search v-model="listEngraving[index].value" @update:modelValue="update()"
				:engraving="getEngravingValue">
			</select-with-search>
			<select v-model="listEngraving[index].weight" @change="update()">
				<option v-for="i in weightValue(index)" :value="i">{{ i }}</option>
			</select>
			<button @click="clearEngraving(listEngraving[index])" v-if="engr.value">X</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		engraving: {
			type: Object,
			default: () => ({}),
		},
		modelValue: {
			type: Array,
		}
	},
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
			}]
		}
	},
	computed: {
		getEngravingValue() {
			let curEngraving = [];
			let result = {};

			for (let engr of this.listEngraving)
				if (engr.value)
					curEngraving.push(engr.value);

			let positiveCount = 0;

			if (curEngraving.length)
				for (let value of curEngraving)
					if (~this.engraving.basic.indexOf(value) || ~this.engraving.personal.indexOf(value))
						positiveCount++;

			let debuffCount = 0;

			if (curEngraving.length)
				for (let value of curEngraving)
					if (~this.engraving.debuff.indexOf(value))
						debuffCount++;

			if (positiveCount < 2 && (Array.isArray(this.engraving.basic) && Array.isArray(this.engraving.personal))) {
				let arrBasic = [];
				for (let checkValue of this.engraving.basic) {
					if (!~curEngraving.indexOf(checkValue))
						arrBasic.push(checkValue);
				}
				let arrPersonal = [];
				for (let checkValue of this.engraving.personal) {
					if (!~curEngraving.indexOf(checkValue))
						arrPersonal.push(checkValue);
				}
				result = { basic: arrBasic, personal: arrPersonal };
			}

			if (!debuffCount) {
				result["debuff"] = this.engraving.debuff;
			}
			return result;
		},
	},
	methods: {
		weightValue(index) {
			let maxWeight = 0;
			let curWeight = this.listEngraving[index].weight;
			for (let engr of this.listEngraving)
				if (engr.weight > maxWeight)
					maxWeight = engr.weight;
			let result = [1, 2, 3];
			if (maxWeight < 4 || curWeight > 3) {
				result = result.concat([4, 5]);
			}
			return result;
		},
		clearEngraving(engrav) {
			engrav.value = '';
			engrav.weight = 0;
			this.update();
		},
		update() {
			this.$emit("update:modelValue", [...this.listEngraving]);
		}
	},
}
</script>