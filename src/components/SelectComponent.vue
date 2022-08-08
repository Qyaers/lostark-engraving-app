<template>
	<div class="select-wrap" v-click-outside="hide">
		<input class="search-input" type="text" @focus="show" @keyup="filterValue" :value="search">
		<div class="engrav__list" v-if="showList">
			<div class="engrav__item" v-for="engrav in engravList" :class="{
				'engrav__item--c-debuff': engrav.type === 'debuff',
				'engrav__item--c-personal': engrav.type === 'personal',
				'engrav__item--c-basic': engrav.type === 'basic',
			}" @click="setValue(engrav.value)">
				{{ engrav.value }}
			</div>
		</div>
	</div>
</template>

<script>
import vClickOutside from "click-outside-vue3";

export default {

	props: {
		modelValue: String,
		engraving: Object,
	},
	emits: ["update:modelValue"],
	data() {
		return {
			showList: false,
			search: "",
		}
	},

	computed: {
		engravList() {
			let result = [];
			for (const type in this.engraving) {
				for (const value of this.engraving[type]) {
					if ((this.search && ~value.toLowerCase().indexOf(this.search.toLowerCase())) || !this.search)
						result.push({ type, value });
				}
			}
			return result;
		}
	},

	methods: {
		filterValue(e) {
			this.search = e.target.value;
		},
		setValue(value) {
			this.search = value;
			this.showList = false
			this.$emit("update:modelValue", value);
		},
		hide(e) {
			if (this.search != this.modelValue) {
				this.search = "";
			}
			this.showList = false
		},
		show() {
			this.search = "";
			this.$emit("update:modelValue", "");
			this.showList = true;
		}
	},
	directives: {
		clickOutside: vClickOutside.directive,
	}
}
</script>

<style>
.select-wrap {
	position: relative;
	width: min-content;
	display: inline-block;
}

.search-input {
	z-index: 10;
}

.engrav__list {
	position: absolute;
	max-height: 250px;
	overflow-y: scroll;
	background-color: #3b3b3b;
	color: white;
	scrollbar-width: thin;
	scrollbar-color: white, grey;
	z-index: 11;
}

.engrav__list::-webkit-scrollbar {
	width: 5px;
}

.engrav__list::-webkit-scrollbar-track {
	background: grey;
}

.engrav__list::-webkit-scrollbar-thumb {
	background-color: white;

}

.engrav__item {
	cursor: pointer;
	padding: 2px 4px;
	border-bottom: 1px solid grey;
	width: 160px;
}

.engrav__item:hover {
	background-color: rgba(0, 0, 0, 0.18);
}

.engrav__item--c-debuff {
	background-color: rgba(255, 0, 0);
}

.engrav__item--c-basic {
	background-color: rgb(79, 183, 239);
}

.engrav__item--c-personal {
	background-color: rgba(63, 237, 75, 0.521);
}

@media (max-width: 480px) {}
</style>