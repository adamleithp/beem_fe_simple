<template>
  <div>
		<div class="mb3">Traveler offered: <strong>{{counterOffer.price.currencyCode}} {{counterOffer.price.amount}}</strong></div>
		<div class="flex justify-between">
			<button type="button" @click="handleAcceptRequestCounterOffer">Accept Counter Offer</button>
			<button type="submit">(TODO) Decline Counter Offer</button>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-console */
// <p>COUNTER ID: {{counterOffer.id}}</p>
// <p>TRIP ID: {{counterOffer.trip.id}}</p>
// <p>REQUEST ID: {{requestId}}</p>

export default {
	name: 'RequestCounterOffer',
	props: [
		'counterOffer',
		'requestId'
	],

	methods: {
		// handleAcceptRequestCounterOffer() {
		// 	this.$store.dispatch('acceptCounterOfferAsRequester')
		// },

		async handleAcceptRequestCounterOffer() {
			this.$store.dispatch('acceptCounterOfferAsRequester', {
				tripId: this.counterOffer.trip.id,
				requestId: this.requestId,
				counterRequestId: this.counterOffer.id
			})
				.then(() => {
					this.$emit('requestCounterChanged');
				})
		},
	}
}
</script>

<style lang="scss">

</style>
