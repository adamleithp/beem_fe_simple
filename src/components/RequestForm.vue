<template>
  <form v-on:submit.prevent="handleRequestCreate">

		<div class="mb4">
			<h1>Create Request</h1>
			<p>Add a trip in order to what items people are requesting from your destination. 
				Once created, you can view see the requests inside this trip.
			</p>
		</div>

		<!-- create package -->
		<div class="mb3">
			<div class="mb3">
				<div>
					<label><strong>Package Name</strong></label>
					<input type="text" placeholder="package name" v-model="request.package.name">
				</div>
				<div>
					<label><strong>Package Description</strong></label>
					<textarea 
						v-model="request.package.description"
					></textarea>
				</div>
			</div>

			

			<div>
				<label><strong>Location requested from</strong></label>
				<div class="relative">
					<input type="text" placeholder="from Location" v-model="request.fromLocation.meta" @input="getLocationFromApi('from', request.fromLocation.meta)">
					<!-- Click suggestion, fill value, if same remove -->
					<ul class="location-suggestion-dropdown" v-if="showlocationSuggestionsDropdown === 'from'">
						<li v-for="(suggestion) in this.locationSuggestions" :key="suggestion.id">
							<button type="button" class="" :id="suggestion.id" @click="handleLocationSuggestionClick('from', suggestion)">{{suggestion.description}}</button>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<label><strong>Package Original Price</strong></label>
				<input type="number" placeholder="package price" v-model="request.package.price.amount">
			</div>
		</div>

		<div class="mb3">
			<div>
				<label><strong>Need it delivered to</strong>:</label>
				<!-- Click suggestion, fill value, if same remove -->
				<div class="relative">
					<input type="text" placeholder="to Location" v-model="request.toLocation.meta" @input="getLocationFromApi('to', request.toLocation.meta)">
					<!-- Click suggestion, fill value, if same remove -->
					<ul class="location-suggestion-dropdown" v-if="showlocationSuggestionsDropdown === 'to'">
						<li v-for="(suggestion) in this.locationSuggestions" :key="suggestion.id">
							<button type="button" class="" :id="suggestion.id" @click="handleLocationSuggestionClick('to', suggestion)">{{suggestion.description}}</button>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<label>Offered/ bounty for delivery (Can't be lower or same as price)</label>
				<input type="number" placeholder="offered price" v-model="request.offeredPrice.amount">
			</div>
		</div>

		<div class="section--total mb4">
			<div class="flex justify-between">
				<p>Price of product:</p>
				<p><Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.package.price.amount}}</p>
			</div>
			<div class="flex justify-between">
				<p>Offer for pickup + delivery:</p>
				<p><Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.offeredPrice.amount}}</p>
			</div>
			<hr>
			<div class="flex justify-between">
				<p>Total:</p>
				<p><Currency :currencyCode="request.offeredPrice.currencyCode"/>{{calculateTotalPrice}}</p>
			</div>
		</div>

		<button type="submit" class="small-block box mb4">
			Create Request
		</button>

	</form>
</template>

<script>
/* eslint-disable no-console */

import Currency from '@/components/Currency.vue'

export default {
	name: 'RequestForm',

	components: {
		Currency,
	},

	data() {
		return {
			showlocationSuggestionsDropdown: null,
			locationSuggestions: [],

			request: {
				offeredPrice: {
					amount: 20.00,
					currencyCode: 'USD'
				},
				fromLocation: {
					meta: 'St-Viateur Bagel Shop, Rue Saint Viateur Ouest, Montreal, QC, Canada',
					googlePlaceId: 'ChIJQ2XG23gZyUwRoCNTC2xte4M',
					lat: 45.52269019999999,
					lng: -73.6019644
				},
				toLocation: {
					meta: 'Bridgetown, Barbados',
					googlePlaceId: 'ChIJPflM-sL2Q4wRaXCGlWrmwX0',
					lat: 13.1059816,
					lng: -59.61317409999999
				},
				package: {
					name: '12 Montreal Bagel',
					description: 'A dozen bagels from St.Viateur in plateau Montreal',
					price: {
						amount: 10.00,
						currencyCode: 'USD'
					}
				},
			},
		}
	},

	methods: {

		async handleRequestCreate() {
			// Call async action
			this.$store.dispatch('createRequest', this.request)
				.then((request) => {
					console.log('request :', request);
					let messageSuccess = {
						title: 'Request Created ✓',
						message: 'Redirecting you there'
					}
					// Tell parent of event.
					this.$emit('requestCreated');

					// Set App Modal (good job!)
					this.$store.dispatch('showAppMessage', messageSuccess).then(() => {

						// Redirect to Request created.
						this.$router.push({ name: 'my-request', params: { id: request.id } })
					})
				})
		},


		async handleLocationSuggestionClick(context, suggestion) {
			// determine which request object to update depending on context passed.
			const whichLocationObject = (context === 'to' ? 'toLocation' : 'fromLocation');

			// save to local data
			this.request[whichLocationObject].meta = suggestion.description;
			this.request[whichLocationObject].googlePlaceId = suggestion.id;

			// hide dropdown
			this.showlocationSuggestionsDropdown = null

			// Get lng/lat from place_id
			this.$store.dispatch('getLocationInformation', {
				locationId: suggestion.id
			})
				.then((locationObject) => {
					this.request[whichLocationObject].lat = locationObject.lat;
					this.request[whichLocationObject].lng = locationObject.lng;
				})
		},

		// Autocomplete Google Places api and fill in dropdown (by context)
		async getLocationFromApi(context, locationString) {
			// Assign abstract string (just not null) to show dropdown
			this.showlocationSuggestionsDropdown = context;

			// determine which request object to update depending on context passed.
			let typeOfLocationLookup = (context === 'to' ? 'geocode' : 'establishment')

			this.$store.dispatch('getLocationSuggestions', {
				locationString,
				typeOfLocationLookup
			})
				.then((suggestions) => {
					this.locationSuggestions = suggestions;
				})
		}
	},

	computed: {
		calculateTotalPrice() {
			return Number(this.request.offeredPrice.amount) + Number(this.request.package.price.amount)
		}
	}
}
</script>

<style scoped lang="scss">
.section--total {
	p {
		margin: 0;
	}
}
</style>
