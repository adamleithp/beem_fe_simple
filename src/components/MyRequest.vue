<template>
  <div class="ba pa3">
		<div class="mb4">
			<h3>{{request.package.name}} [{{request.status}}]</h3>
			<p>Offered <strong>{{request.offeredPrice.currencyCode}} {{request.offeredPrice.amount}}</strong></p>
			<p><strong>Address of requested item</strong>: <Place :placeId="request.fromLocation.googlePlaceId"/></p>
			<p><strong>Needs delivery to</strong>: <Place :placeId="request.toLocation.googlePlaceId"/></p>
		</div>

		<div class="">
			<h3 v-if="request.counterOffers.length">Counter Offers</h3>

			<ul v-if="request.counterOffers" class="list pa0 ma0">
				<li v-for="(counterOffers) in request.counterOffers" :key="counterOffers.id" class="mb3 ba pa3">
					<RequestCounterOffer :counterOffer="counterOffers"/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-console */
import Place from '@/components/Place.vue'
import RequestCounterOffer from '@/components/RequestCounterOffer.vue'

export default {
	name: 'MyRequest',
	props: ['request'],
	components: {
		RequestCounterOffer,
		Place,
	},
	methods: {

	}
}
</script>

<style lang="scss">

</style>
