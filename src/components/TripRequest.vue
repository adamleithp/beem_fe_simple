<template>
  <div>
		<div
			class="ba pa3"
			v-if="shouldThisBeShown">

			<h3>name: {{request.package.name}}</h3>
			<p>Cost of product: {{request.offeredPrice.currencyCode}} {{request.package.price.amount}}</p>
			<p>Bounty: {{request.offeredPrice.currencyCode}} {{request.offeredPrice.amount}}</p>
			<div class="mv3 flex justify-between" v-if="!isThisAttachedToTrip && !isThisCounteredToTrip && !isCountering">
				<button @click="acceptRequestOffer()">Accept bounty of {{request.offeredPrice.currencyCode}} {{request.offeredPrice.amount}}</button>
				<button @click="showCounterRequestOfferForm()">Counter Offer</button>
			</div>
		</div>
		<!-- Counter offer form  -->

		<div class="bb br bl pa3" v-if="isCountering">
			<h3>Counter offer</h3>
			<p>How much are you suggesting they pay you to bring the requested item?</p>
			<form @submit.prevent="handleCounterOfferFormSubmit">
				<div class="flex justify-between">
					<p>Their original offer:</p>
					<p><strong>{{request.offeredPrice.currencyCode}} {{request.offeredPrice.amount}}</strong></p>
				</div>
				<div class="flex justify-between">
					<div class="w-70">
						<p>Your counter offer:</p>
					</div>
					<div class="w-30">
						<div class="flex items-center">
							<span class="mr2">{{request.offeredPrice.currencyCode}}</span>
							<input class="ma0" type="number" v-model="counterOfferPrice.amount" :min="Number(request.offeredPrice.amount)">
						</div>
					</div>
				</div>
				<div class="mv3 flex justify-between">
					<button type="button" @click="hideCounterRequestOfferForm()">Cancel Counter offer</button>
					<button type="submit">Counter Offer</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-console */

export default {
	name: 'TripRequest',

	props: [
		'request',
		'context',
		'tripId',
		'isThisAttachedToTrip',
		'isThisCounteredToTrip',
	],

	data() {
		return {
			isCountering: false,
			counterOfferPrice: {
				amount: this.request.offeredPrice.amount,
				currencyCode: this.request.offeredPrice.currencyCode
			}
		}
	},

	methods: {
		// Handle "Accept" click on button
		async acceptRequestOffer() {
			this.$store.dispatch('acceptRequestOnMyTrip', {
				tripId: this.tripId,
				requestId: this.request.id
			})
				.then(() => {
					this.$emit('requestChanged');
				})
		},

		// Handle "Counter" click on button
		async attachCounterOfferToRequest() {
			this.$store.dispatch('attachCounterOfferToRequest', {
				tripId: this.tripId,
				requestId: this.request.id,
				counterOffer: {
					amount: Number(this.counterOfferPrice.amount),
					currencyCode: this.counterOfferPrice.currencyCode,
				}
			})
				.then((trip) => {
					console.log('COUNTERED SUCCESSFUL... heres the trip', trip);
					console.log('Trip Request >>> close form, and hide this request!');

					this.$emit('requestChanged');
				})
		},

		async handleCounterOfferFormSubmit() {
			if (this.counterOfferNumber <= this.request.offeredPrice.amount) {
				console.log('cant be equal or lower than original offer');
				return false;
			}
			console.log('countered...');
			this.attachCounterOfferToRequest();
		},

		async showCounterRequestOfferForm() {
			this.isCountering = true
		},

		async hideCounterRequestOfferForm() {
			this.isCountering = false
		},

		async counterRequestOffer() {
		}

	},

	computed: {
		shouldThisBeShown() {
			if (this.context !== 'attached' && this.isThisAttachedToTrip) return false;
			if (this.context !== 'countered' && this.isThisCounteredToTrip) return false;
			return true;
		}
	}
}
</script>

<style lang="scss">

</style>
