<template>
  <div class="my-request">
		<div class="mb4">
			<h3>{{request.package.name}} <Status :statusString="request.status"/>
			</h3>
			<h3>{{request.package.description}}</h3>
			<p>Offered <strong>{{request.offeredPrice.currencyCode}} {{request.offeredPrice.amount}}</strong></p>
			<p><strong>Address of requested item</strong>: <Place :placeId="request.fromLocation.googlePlaceId"/></p>
			<p><strong>Needs delivery to</strong>: <Place :placeId="request.toLocation.googlePlaceId"/></p>
		</div>

		<div v-if="thisRequestTrip">
			<div class="pa3 ba">
				<h4>Your package is arriving at...</h4>
				<h3><Place :placeId="thisRequestTrip.toLocation.googlePlaceId"/> on {{formatDatetoYMD(thisRequestTrip.toDate)}}</h3>

				<div v-if="context !== 'list-view'">
					<p>When you meet up, have the traveller scan this QR code to finish transaction.</p>
					<img src="@/assets/qr-code.png" alt="">
				</div>
			</div>
		</div>

		<div class="" v-if="context !== 'list-view' && !thisRequestTrip">
			<h3 v-if="request.counterOffers.length">Counter Offers</h3>

			<ul v-if="thisRequestCounters" class="list pa0 ma0">
				<li v-for="(counterOffers) in thisRequestCounters" :key="counterOffers.id" class="mb3 ba pa3">
					<RequestCounterOffer @requestCounterChanged="handleRequestCounterChange" :requestId="request.id" :counterOffer="counterOffers"/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
/* eslint-disable no-console */
import Status from '@/components/Status.vue'
import Place from '@/components/Place.vue'
import RequestCounterOffer from '@/components/RequestCounterOffer.vue'

export default {
	name: 'MyRequest',
	props: [
		'request',
		'context'
	],
	data() {
		return {
			counterOffers: [],
			requestTrip: null
		}
	},
	components: {
		RequestCounterOffer,
		Status,
		Place,
	},
	computed: {
		thisRequestTrip() {
			if (this.request.trip) {
				return this.request.trip
			}
			return null
		},
		thisRequestCounters() {
			return this.request.counterOffers
		}
	},
	methods: {
		handleRequestCounterChange() {
			this.$emit('requestChanged');
		},
		formatDatetoYMD(unixTimeStamp) {
			let d = new Date(unixTimeStamp * 1000),
				month = '' + (d.getMonth()),
				day = '' + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2)
				month = '0' + month;
			if (day.length < 2)
				day = '0' + day;

			return [year, month, day].join('-');
		}
	}
}
</script>

<style lang="scss">

</style>
