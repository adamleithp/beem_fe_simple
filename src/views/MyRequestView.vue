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
				<div class="medium-block medium-block--stretch box box--light mr2 flex-2">
					<p class="ma0 f4">Status</p>
					<h2 class="ma0 mt2 lh-title">{{request.status}}</h2>
				</div>
				<div class="medium-block medium-block--stretch box box--light ml2 flex-1 w-10">
					<p class="ma0 f4">Views</p>
					<h2 class="ma0 mt2 lh-title">13</h2>
				</div>
			</div>

			<!-- CONDITION CONTENT =================================== -->

			<div v-if="status === 'countered'">
				<div class="ph2">
					<button type="submit" class="small-block box mb4">
						View counter offers
					</button>
				</div>
			</div>

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
				SHOW ATTACHED FOR HERE
			</div>
			<!-- CONDITION CONTENT =================================== -->


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
				<div class="medium-block medium-block--stretch box box--light">
					<img src="@/assets/maps.png" alt="">

					<p class="ma0 f4">The location requested from</p>
					<h2 class="ma0 mt2 lh-title"><Place :placeId="request.fromLocation.googlePlaceId"/></h2>
				</div>
			</div>
		
			<div class="ph2 mb4">
				<div class="medium-block medium-block--stretch box box--light">
					<p class="ma0 f4">Where the item comes from</p>
					<h2 class="ma0 mt2 lh-title"><Place :placeId="request.toLocation.googlePlaceId"/></h2>
				</div>
			</div>

			<!-- IF COUNTERED =================================== -->
			<div class="mb4" v-if="status === 'countered'">
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
							<h2 class="ma0 mt2 mb2 lh-title"><Currency :currencyCode="counterOffer.price.currencyCode"/>{{counterOffer.price.amount}}</h2>

							<div class="flex justify-between">
								<button class="box flex-1 mr2" 
									@click="acceptCounterOffer(counterOffer)">
									Accept Counter
								</button>
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

  <!-- <div v-if="!loading">
    <div class="mw7 center">
			<h3>Your Request:</h3>
			<div class="ba pa3">
				<MyRequest @requestChanged="getRequest" :request="request"/>
			</div>
		</div>
  </div> -->
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
		}
	},

	methods: {
		async getRequest() {
			this.$store.dispatch('getMyRequest', this.$route.params.id)
				.then((request) => {
					console.log('request ->>> show delete options, ONLY IF status=pending');

					this.request = request;
					this.loading = false;

					// If Trip
					if (request.trip) this.onThisTrip = request.trip;

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
				.catch(() => {
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
					this.status = 'attached';
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
					this.status = 'pending';
				})
		}
	},

	mounted() {
		this.getRequest();
	},
}
</script>
