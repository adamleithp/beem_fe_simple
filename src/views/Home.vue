<template>
  <div class="flex w-100 pb6">
		<div class="ba w-50 pa3">
			<h2>User 1: Requester</h2>

			<div class="my2 ba pa3 bg-near-white">

				<form v-on:submit.prevent="handleRequestCreate">
					<!-- create package -->
					<div class="mb3">
						<h3>Package</h3>
						<div>
							<label><strong>Package Name</strong></label>
							<input type="text" placeholder="package name" v-model="request.package.name">
						</div>
						<div>
							<label><strong>Package Description</strong></label>
							<input type="text" placeholder="package description" v-model="request.package.description">
						</div>
						<div>
							<label><strong>Location requested from</strong></label>
							<div class="relative">
								<input type="text" placeholder="from Location" v-model="request.fromLocation.meta" @input="getLocationFromApi('from', request.fromLocation.meta)">
								<!-- Click suggestion, fill value, if same remove -->
								<ul class="location-suggestion-dropdown" v-if="showlocationSuggestionsDropdown === 'from'">
									<li v-for="(suggestion) in this.locationSuggestions" :key="suggestion.id">
										<button type="button" class="" :id="suggestion.place_id" @click="handleLocationSuggestionClick('from', suggestion)">{{suggestion.description}}</button>
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
						<h3>Request</h3>

						<div>
							<label><strong>Need it delivered to</strong>:</label>
							<!-- Click suggestion, fill value, if same remove -->
							<div class="relative">
								<input type="text" placeholder="to Location" v-model="request.toLocation.meta" @input="getLocationFromApi('to', request.toLocation.meta)">
								<!-- Click suggestion, fill value, if same remove -->
								<ul class="location-suggestion-dropdown" v-if="showlocationSuggestionsDropdown === 'to'">
									<li v-for="(suggestion) in this.locationSuggestions" :key="suggestion.id">
										<button type="button" class="" :id="suggestion.place_id" @click="handleLocationSuggestionClick('to', suggestion)">{{suggestion.description}}</button>
									</li>
								</ul>
							</div>
						</div>

						<div>
							<label>Offered/ bounty for delivery (Can't be lower or same as price)</label>
							<input type="number" placeholder="offered price" v-model="request.offeredPrice.amount">
						</div>
					</div>

					<div class="section--total mb3">
						<div class="flex justify-between">
							<p>Price of product:</p><p>{{request.offeredPrice.currencyCode}} {{request.package.price.amount}}</p>
						</div>
						<div class="flex justify-between">
							<p>Offer for pickup + delivery:</p><p>{{request.offeredPrice.currencyCode}} {{request.offeredPrice.amount}}</p>
						</div>
						<hr>
						<div class="flex justify-between">
							<p>Total:</p><p>{{request.offeredPrice.currencyCode}} {{calculateTotalPrice}}</p>
						</div>
					</div>

					<button type="submit">create request</button>
				</form>
			</div>

		</div>

		<div class="ba w-50">
			<h2>User 1: Traveller</h2>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
// @ is an alias to /src

export default {
	name: 'home',
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
			}
		}
	},
	methods: {
		async handleLocationSuggestionClick(context, suggestion) {
			// determine which request object to update depending on context passed.
			const whichLocationObject = (context === 'to' ? 'toLocation' : 'fromLocation');

			// save to local data
			this.request[whichLocationObject].meta = suggestion.description;
			this.request[whichLocationObject].googlePlaceId = suggestion.place_id;

			// hide dropdown
			this.showlocationSuggestionsDropdown = null

			// Get lng/lat from place_id
			fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${suggestion.place_id}&fields=geometry&key=${process.env.VUE_APP_GOOGLE_API_KEY}`)
				.then((response) => {
					return response.json();
				})
				.then((json) => {
					// Save for payload POST createRequest
					this.request[whichLocationObject].lat = json.result.geometry.location.lat;
					this.request[whichLocationObject].lng = json.result.geometry.location.lng;
				});
		},

		async handleRequestCreate() {
			const query = JSON.stringify({
				query: `mutation {
					createRequest(input:{
						fromLocation: {
							lat: ${this.request.fromLocation.lat},
							lng: ${this.request.fromLocation.lng},
							googlePlaceId: "${this.request.fromLocation.googlePlaceId}",
						}
						toLocation: {
							lat: ${this.request.toLocation.lat},
							lng: ${this.request.toLocation.lng},
							googlePlaceId: "${this.request.toLocation.googlePlaceId}",
						}
						offeredPrice:{
							amount: ${this.request.offeredPrice.amount},
							currencyCode: "${this.request.offeredPrice.currencyCode}",
						}
					}) {
						id
						status
						offeredPrice {
							amount, currencyCode
						}
						fromLocation {
							lat, lng, googlePlaceId
						}
						toLocation {
							lat, lng, googlePlaceId
						}
					}
				}`
			});

			const response = await fetch(process.env.VUE_APP_API_URL, {
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST',
				body: query,
			});

			const responseJson = await response.json();
			return responseJson.data;
		},



		// Autocomplete Google Places api and fill in dropdown (by context)
		async getLocationFromApi(context, locationString) {
			// Assign abstract string (just not null) to show dropdown
			this.showlocationSuggestionsDropdown = context;

			// determine which request object to update depending on context passed.
			let typeOfLookUp = (context === 'to' ? 'geocode' : 'establishment')

			fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${locationString}&types=${typeOfLookUp}&fields=photos,formatted_address,name,rating,opening_hours,geometry&language=en&key=${process.env.VUE_APP_GOOGLE_API_KEY}`)
				.then((response) => {
					return response.json();
				})
				.then((json) => {
					this.locationSuggestions = json.predictions;
				});
		}
	},

	computed: {
		calculateTotalPrice() {
			return Number(this.request.offeredPrice.amount) + Number(this.request.package.price.amount)
		}
	}
}

// 		 fromLocation: Location!
//     toLocation: Location!
//     offeredPrice: Price!
//     status: Status!
</script>


<style lang="scss">
input {
	margin-bottom: 1em;
	width: 100%;
	padding: .5em;
}
label {
	display: block;
	margin-bottom: .5em;
}

.location-suggestion-dropdown {
	padding: 0;
	list-style: none;
	margin: 0;
	position: absolute;
	top: calc(100% - 1em);
	left: 0;
	width: 100%;
	z-index: 1;

	button {
		width: 100%;
    text-align: left;
    padding: 0.5em 0.6em;
	}
}

.section--total {
	p {
		margin: 0;
	}
}

</style>


