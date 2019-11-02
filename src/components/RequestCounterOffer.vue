<template>
  <div>
		<div class="mb3">Traveler offered: <strong>{{counterOffer.price.currencyCode}} {{counterOffer.price.amount}}</strong></div>
		<div class="flex justify-between">
			<button type="button">Accept Counter Offer</button>
			<button type="submit">Decline Counter Offer</button>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-console */

export default {
	name: 'RequestCounterOffer',
	props: ['counterOffer'],

	methods: {

	}
}
</script>

<style lang="scss">

</style>
