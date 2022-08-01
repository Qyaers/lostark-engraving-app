<template>
	<div class="engraving__list">
		<h2>Выбранные гравировки</h2>
		<div class="engraving__item engraving" v-for="engr in result">
			<div class="engraving__title">
				{{ engr.value }}
			</div>
			<div class="engraving__weights weight">
				<div class="weight-item" v-for="i in 15" :class="{ active: i <= engr.weight, debuff: isDeBuff(engr) }">
				</div>
				<div v-if="engr.weight > 15">+{{ engr.weight - 15 }}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		result: Array,
		engraving: Object,
	},
	data() {
		return {

		}
	},
	methods: {
		isDeBuff(engr) {
			return ~this.engraving.debuff.indexOf(engr.value);
		}
	}
}
</script>

<style>
.engraving__list {
	display: flex;
	flex-direction: column;
}

.engraving {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 10px;
}

.weight {
	display: flex;
}

.weight-item::before {
	content: "◇";
	font-size: 30px;
	color: rgb(60, 58, 58);
}

.weight-item.active::before {
	content: "◆";
	color: rgb(79, 183, 239)
}

.weight-item.active.debuff::before {
	color: rgba(227, 68, 43, 0.924)
}

.weight-item:nth-child(5n) {
	padding-right: 10px;
}
</style>