<template>
	<div class="wrapper">
		<div class="lang-btns"><input class="lang-btns__input-ru" type="button" value="RU"><input class="lang-btns__input-eu"
				type="button" value="EU"></div>
		<h1>Калькулятор гравировок</h1>
		<p>Для расчета нужных вам гравировок, заполните данные в формах ниже. После заполнения форм результат будет
			появляться в секции результата.</p>
		<div class="content">
			<div class="engravings">
				<fetranit v-model="fetranit" :engraving="engraving" @update:modelValue="reCalc"></fetranit>
				<slots v-model="slots" :engraving="engraving" @update:modelValue="reCalc"></slots>
				<jewellerys v-model="jewellerys" :engraving="engraving" @update:modelValue="reCalc"></jewellerys>
			</div>
			<result :result="result" :engraving="engraving"></result>
		</div>
	</div>
</template>

<script>

import dataRU from "./data.json";
import dataEU from "./dataENG.json";
import fetranit from "./components/FetranitComponent.vue";
import slots from "./components/SlotsComponent.vue";
import jewellerys from "./components/JewellerysComponent.vue";
import result from "./components/ResultCalcComponent.vue";
import selectWithSearch from './components/SelectComponent.vue';

export default {
	components: { selectWithSearch, fetranit, slots, jewellerys, result },
	data() {
		return {
			select: "",
			engraving: {},
			fetranit: [],
			slots: [{}, {}],
			jewellerys: [[], [], [], [], []],
			result: [],
		}
	},
	mounted() {
		this.engraving = dataRU;
	},
	methods: {
		update(e) {
			console.log("App", e);
		},
		reCalc() {
			let resultCalc = {};
			for (let idx in this.fetranit) {
				let engr = this.fetranit[idx];
				if (engr.hasOwnProperty("value") && engr.value) {
					if (resultCalc.hasOwnProperty(engr.value)) {
						resultCalc[engr.value] += engr.weight;
					}
					else {
						resultCalc[engr.value] = engr.weight;
					}
				}
			}
			for (let idx in this.slots) {
				let engr = this.slots[idx];
				if (engr.hasOwnProperty("value") && engr.value) {
					if (resultCalc.hasOwnProperty(engr.value)) {
						resultCalc[engr.value] += engr.weight;
					}
					else {
						resultCalc[engr.value] = engr.weight;
					}
				}
			}
			for (let idx in this.jewellerys) {
				let jewellery = this.jewellerys[idx];
				for (let idx in jewellery) {
					let engr = jewellery[idx];
					if (engr.hasOwnProperty("value") && engr.value) {
						if (resultCalc.hasOwnProperty(engr.value)) {
							resultCalc[engr.value] += engr.weight;
						}
						else {
							resultCalc[engr.value] = engr.weight;
						}
					}
				}
			}
			let engrList = this.engraving.basic.concat(this.engraving.personal, this.engraving.debuff)
			let resultArray = [];
			for (let key in resultCalc) {
				resultArray.push({ value: key, weight: resultCalc[key] });
			}
			resultArray = resultArray.sort(function (a, b) {
				a = engrList.indexOf(a.value);
				b = engrList.indexOf(b.value);
				return a > b ? 1 : a < b ? -1 : 0;
			});
			this.result = resultArray;
		}
		//TODO make check function of curent type lang(it must change value data of JSON object on eu or ru)
	}
}
</script>

<style>
.content {
	display: flex;
}

p {
	border-bottom: 1px solid grey;
	padding-bottom: 10px;
}

.engravings {
	max-width: 70%;
	padding-right: 20px;
}
</style>