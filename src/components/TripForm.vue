<template>
  <form v-on:submit.prevent="handleTripCreate">

		<div class="mb4">
			<h1>Create Trip</h1>
			<p>Add a trip in order to what items people are requesting from your destination. 
				Once created, you can view see the requests inside this trip.
			</p>
		</div>

		<div class="mb3">
			<div>
				<label><strong>You're leaving from..</strong></label>
				<div class="relative">
					<input type="text" placeholder="from Location" v-model="trip.fromLocation.meta" @input="getLocationFromApi('from', trip.fromLocation.meta)">
					<!-- Click suggestion, fill value, if same remove -->
					<ul class="location-suggestion-dropdown" v-if="showlocationSuggestionsDropdown === 'from'">
						<li v-for="(suggestion) in this.locationSuggestions" :key="suggestion.id">
							<button type="button" class="" :id="suggestion.id" @click="handleLocationSuggestionClick('from', suggestion)">{{suggestion.description}}</button>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<input type="date" v-model="trip.fromDateMeta" @change="handleFromDateChange('from')">
			</div>
		</div>

		<div class="mb3">
			<div>
				<label><strong>You're going to..</strong>:</label>
				<!-- Click suggestion, fill value, if same remove -->
				<div class="relative">
					<input type="text" placeholder="to Location" v-model="trip.toLocation.meta" @input="getLocationFromApi('to', trip.toLocation.meta)">
					<!-- Click suggestion, fill value, if same remove -->
					<ul class="location-suggestion-dropdown" v-if="showlocationSuggestionsDropdown === 'to'">
						<li v-for="(suggestion) in this.locationSuggestions" :key="suggestion.id">
							<button type="button" class="" :id="suggestion.id" @click="handleLocationSuggestionClick('to', suggestion)">{{suggestion.description}}</button>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<input type="date" v-model="trip.toDateMeta" @change="handleFromDateChange('to')">
			</div>
		</div>

		<button type="submit" class="small-block box">
				Create Trip
		</button>

	</form>
</template>

<script>
/* eslint-disable no-console */
function parseDateFromYMD(str) {
	str = str.replace(/-/g, "");

	if(!/^(\d){8}$/.test(str)) return "invalid date";
	var y = str.substr(0,4),
			m = str.substr(4,2),
			d = str.substr(6,2);

	let date = new Date(y,m,d)
	console.log('parseDateFromYMD date :', date / 1000);
	return date / 1000;
}


function formatDatetoYMD(date) {
	let d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

	if (month.length < 2)
			month = '0' + month;
	if (day.length < 2)
			day = '0' + day;

	return [year, month, day].join('-');
}

export default {
	name: 'TripForm',
	data() {
		return {
			showlocationSuggestionsDropdown: null,
			locationSuggestions: [],

			trip: {
				fromLocation: {
					meta: 'Montreal, Canada',
					googlePlaceId: 'ChIJDbdkHFQayUwR7-8fITgxTmU',
					lat: 45.5016889,
					lng: -73.567256
				},
				toLocation: {
					meta: 'Bridgetown, Barbados',
					googlePlaceId: 'ChIJPflM-sL2Q4wRaXCGlWrmwX0',
					lat: 13.1059816,
					lng: -59.61317409999999
				},
				fromDate: new Date / 1000, 
				toDate: new Date / 1000,

				toDateMeta: formatDatetoYMD(new Date),
				fromDateMeta: formatDatetoYMD(new Date),

				// Backup full
				// fromLocation: {
				// 	meta: '',
				// 	googlePlaceId: '',
				// 	lat: 0,
				// 	lng: 9
				// },
				// toLocation: {
				// 	meta: '',
				// 	googlePlaceId: '',
				// 	lat: 0,
				// 	lng: 0
				// },
				// fromDate: parseDateFromYMD(formatDatetoYMD(new Date)), // lol
				// toDate: parseDateFromYMD(formatDatetoYMD(new Date)),// lol

				// toDateMeta: formatDatetoYMD(new Date),
				// fromDateMeta: formatDatetoYMD(new Date),
			},
		}
	},

	methods: {



		handleFromDateChange(context) {
			const whichLocationMetaObject = (context === 'to' ? 'toDateMeta' : 'fromDateMeta');
			const whichLocationObject = (context === 'to' ? 'toDate' : 'fromDate');
			// Build date
			const date = parseDateFromYMD(this.trip[whichLocationMetaObject]);

			// Assign to state
			this.trip[whichLocationObject] = date;

			console.log('this.trip :', new Date(this.trip.toDate  * 1000));
			console.log('this.trip :', new Date(this.trip.fromDate * 1000));
		},

		async handleTripCreate() {


			// const removeOneMonthFromDateFromUnix = (unixTimeStamp) => {
			// 	var d = new Date(unixTimeStamp * 1000);
			// 	console.log('d :', d);
      //   // d.setMonth(d.getMonth() - 1, d.getDate());
			// 	// console.log('d :', d);
	
      //   return Math.round(d.getTime() / 1000); 
			// }

			// let trip = this.trip;

			// // console.log('trip.fromDate :', trip.fromDate);
			// // console.log('trip.fromDate :', trip.toDate);
			// // console.log('trip.fromDate :', formatDatetoYMD(trip.fromDate));
			// // console.log('trip.fromDate :', formatDatetoYMD(trip.toDate));

			// let res = {
			// 	...trip, 
			// 	fromDate: removeOneMonthFromDateFromUnix(trip.fromDate),
			// 	toDate: removeOneMonthFromDateFromUnix(trip.toDate)
			// };
			
			console.log('res.fromDate', new Date(this.trip.fromDate * 1000))
			console.log('res.fromDate', new Date(this.trip.toDate * 1000))
			console.log('res.fromDate', formatDatetoYMD(new Date(this.trip.fromDate * 1000)))
			console.log('res.fromDate', formatDatetoYMD(new Date(this.trip.toDate * 1000)))

			// Call async action
			// Create trip.
			this.$store.dispatch('createTrip', this.trip)
				.then((trip) => {
					let messageSuccess = {
						title: 'Trip Created ✓', //✈
						message: 'Redirecting you there'
					}
					// Tell parent of event.
					this.$emit('tripCreated');

					// Set App Modal (good job!)
					this.$store.dispatch('showAppMessage', messageSuccess).then(() => {

						// Redirect to Trip created.
						this.$router.push({ name: 'my-trip', params: { id: trip.id } })
					})
					// Route to created trip once created.
						
				})
		},


		async handleLocationSuggestionClick(context, suggestion) {
			// determine which request object to update depending on context passed.
			const whichLocationObject = (context === 'to' ? 'toLocation' : 'fromLocation');

			// save to local data
			this.trip[whichLocationObject].meta = suggestion.description;
			this.trip[whichLocationObject].googlePlaceId = suggestion.id;

			// hide dropdown
			this.showlocationSuggestionsDropdown = null

			this.$store.dispatch('getLocationInformation', {
				locationId: suggestion.id
			})
				.then((locationObject) => {
					this.trip[whichLocationObject].lat = locationObject.lat;
					this.trip[whichLocationObject].lng = locationObject.lng;
				})
		},

		// Autocomplete Google Places api and fill in dropdown (by context)
		async getLocationFromApi(context, locationString) {
			// Assign abstract string (just not null) to show dropdown
			this.showlocationSuggestionsDropdown = context;

			// determine which trip object to update depending on context passed.
			let typeOfLocationLookup = 'geocode'


			this.$store.dispatch('getLocationSuggestions', {
				locationString,
				typeOfLocationLookup
			})
				.then((suggestions) => {
					this.locationSuggestions = suggestions;
				})
		}
	},

}
</script>

<style lang="scss">

</style>
