<template>

	<div class="my-request pb5" v-if="!loading">
		<div class="w-100 pt2 mb4">

			<div class="mt5 ph2 mb4 flex flex-row align-center">
				<router-link to="/requests" class="black f6 text--info">
					<h3 class="ma0 mt1">Back to Requests</h3>
				</router-link>  
			</div>

			<div class="ph2 mb4">
				<h1>My Request</h1>
				<p>
					This is your request. You can view if it's status, update it's info.
				</p>
				<p v-if="status === 'countered'">
					<span class="text--bold">Your request offer has been countered</span>. You can accept, or decline the counter offer.
				</p>
			</div>

			<div class="ph2 mb3">
				<div class="medium-block medium-block--stretch box box--light">
					<div>
						<div class="flex">
							<h2 class="ma0 mb2">{{request.package.name}}</h2> 
						</div>
						<p class="ma0 mt0">{{request.package.description}}</p>
					</div>
				</div>
			</div>


			<div class="ph2 mb3 flex">
				<div class="medium-block medium-block--stretch box box--light mr2">
					<p class="ma0 f4">You offered</p>
					<h1 class="ma0 mt2 lh-title">
						<Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.offeredPrice.amount}}
					</h1>
				</div>

				<div class="medium-block medium-block--stretch box box--light ml2">
					<p class="ma0 f4">Cost of Item</p>
					<h1 class="ma0 mt2 lh-title">
						<Currency :currencyCode="request.package.price.currencyCode"/>{{request.package.price.amount}}
					</h1>
				</div>
			</div>



			<div class="ph2 mb3">
				<!-- CONDITION CONTENT =================================== -->
				<div
					v-if="status === 'pending'" 
					class="medium-block medium-block--stretch box box--light mr2 flex-2">
					<p class="ma0 f4">Status</p>
					<h2 class="ma0 mt2 lh-title">Pending</h2>
				</div>

				<div
					v-if="status === 'countered'" 
					class="medium-block medium-block--stretch box box--caution mr2 flex-2">
					<p class="ma0 f4">Status</p>
					<h2 class="ma0 mt2 mb3 lh-title">Countered</h2>

					<!-- Button inside box -->
					<button type="submit" class="small-block box">
						View counter offers
					</button>
				</div>

				<div
					v-if="status === 'attached'" 
					class="medium-block medium-block--stretch box box--accepted mr2 flex-2">
					<p class="ma0 f4">Status</p>
					<h2 class="ma0 mt2 lh-title">Accepted by Traveller</h2>
				</div>
				<!-- CONDITION CONTENT =================================== -->

				<!-- <div class="medium-block medium-block--stretch box box--light ml2 flex-1 w-10">
					<p class="ma0 f4">Views</p>
					<h2 class="ma0 mt2 lh-title">13</h2>
				</div> -->
			</div>

			<!-- CONDITION CONTENT =================================== -->
			<div v-if="status === 'pending'">
				<div class="ph3">
					<p class="text--info flex hide">
						<span class="mr2">
							<IconInformation style="width:17px;"/>
						</span>
						HINT: Try increasing your offer.
					</p>
				</div>
			</div>


			

			<!-- IF ATTACHED ===================================-->
			<div class="ph2 mb3 flex" v-if="status === 'attached'">
				<div class="medium-block medium-block--stretch box box--accepted">
					<p class="ma0 f4">You should get your package on</p>
					<h2 class="ma0 mt2 lh-title">{{tripArrivingDate}}</h2>
				</div>
			</div>
			<!-- CONDITION CONTENT =================================== -->



			<div class="ph2 mb3">
				<div class="medium-block medium-block--stretch box box--light">
					<img src="@/assets/maps.png" alt="" class="map-img">

					<p class="ma0 f4">The location requested from</p>
					<h2 class="ma0 mt2 lh-title"><Place :placeId="request.fromLocation.googlePlaceId"/></h2>
				</div>
			</div>
		
			<div class="ph2 mb5">
				<div class="medium-block medium-block--stretch box box--light">
					<p class="ma0 f4">Meeting spot to pickup your item</p>
					<h2 class="ma0 mt2 lh-title"><Place :placeId="request.toLocation.googlePlaceId"/></h2>
				</div>
			</div>

			<!-- IF COUNTERED =================================== -->
			<div class="mb5" v-if="status === 'countered'">
				<div class="ph2 mb3">
					<h2>Counter Requests</h2>
					<p>
						Travelers have seen your request, and have suggested a new price by countering with a new price.
					</p>
				</div>
				
				<ul class="ph2 list pa0">
					<li v-for="(counterOffer) in request.counterOffers" :key="counterOffer.id" class="mb3">
						<div class="medium-block medium-block--stretch box box--caution" >
							<p class="ma0 f4">A traveller countered your offer</p>
							<h2 class="ma0 mt2 mb3 lh-title"><Currency :currencyCode="counterOffer.price.currencyCode"/>{{counterOffer.price.amount}}</h2>

							<div class="flex justify-between">
								<!-- Button inside box -->
								<button class="box flex-1 mr2" 
									@click="acceptCounterOffer(counterOffer)">
									Accept Counter
								</button>
								<!-- Button inside box -->
								<button class="box flex-1 ml2" 
									@click="declineCounterOffer(counterOffer)">
									Decline Counter
								</button>
							</div>
						</div>
					</li>
				</ul>
	
			</div>



			<div class="ph2 mb3">
				<h2>Manage my Request</h2>
				<p>
					Delete, edit or set preferences. Note: once your request is accepted, you need to request deletion of your request.
				</p>
			</div>

			<button type="submit" class="small-block box mb4">
				Edit Request
			</button>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Place from '@/components/Place.vue'
import Currency from '@/components/Currency.vue'
import IconInformation from '@/components/icons/IconInformation.vue'

export default {
	name: 'MyRequestView',
	components: {
		Place,
		Currency,
		IconInformation,
	},

	data() {
		return {
			request: {},
			loading: true,
			status: 'pending',
			onThisTrip: null,
			tripArrivingDate: '',
		}
	},

	methods: {
		async getRequest() {
			this.$store.dispatch('getMyRequest', this.$route.params.id)
				.then((request) => {
					console.log('request ->>> show delete options, ONLY IF status=pending');

					this.request = request;

					// TODO do this everywhere.
					if (!this.request) {
						throw "Request not Found"
					}

					this.loading = false;

					// If Trip
					if (request.trip) {
						this.onThisTrip = request.trip;
						this.tripArrivingDate = this.formatDatetoYMD(request.trip.toDate)
					}

					if (request.status === 'PENDING') {
						this.status = 'pending';
					}
					if (request.status === 'COUNTERED') {
						this.status = 'countered';
					}
					if (request.status === 'ACCEPTED') {
						this.status = 'attached';
					}
				})
				.catch((error) => {
					console.log(error);
					this.$router.push({ name: 'home'})
				})
		},

		async acceptCounterOffer(counterOffer) {
			this.$store.dispatch('acceptCounterOfferAsRequester', {
				tripId: counterOffer.trip.id,
				requestId: this.request.id,
				counterRequestId: counterOffer.id
			})
				.then((request) => {
					this.onThisTrip = request.trip;
					this.tripArrivingDate = this.formatDatetoYMD(request.trip.toDate)
					this.status = 'attached';

					let messageSuccess = {
						title: 'Accepted Counter Offer ✓',
						message: 'The traveller can now get your item.'
					}

					// Set App Modal (good job!)
					this.$store.dispatch('showAppMessage', messageSuccess)
				})
		},

		async declineCounterOffer(counterOffer) {
			this.$store.dispatch('declineCounterOfferAsRequester', {
				tripId: counterOffer.trip.id,
				requestId: this.request.id,
				counterRequestId: counterOffer.id
			})
				.then(() => {
					this.onThisTrip = {};
					this.tripArrivingDate = '';
					this.status = 'pending';

					console.log('TODO: This should add a counterRequest to trip.');

					let messageSuccess = {
						title: 'Declined Counter Offer ✗',
						message: 'The traveller can now accept the original offer, or counter offer again.'
					}

					// Set App Modal (good job!)
					this.$store.dispatch('showAppMessage', messageSuccess)
				})
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
	},

	mounted() {
		this.getRequest();
	},
}
</script>
