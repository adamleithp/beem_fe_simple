<template>
	<div class="my-trip pb5" v-if="!loading">
		<div class="w-100 pt2 mb4">

			<div class="mt5 ph2 mb4 flex flex-row align-center">
				<router-link :to="{ 
						name: 'my-trip', 
						params: { 
							id: this.$route.params.tripId,
						}
					}" class=" black f6 text--info">
					<h3 class="ma0 mt1">Back to My Trip</h3>
				</router-link>  
			</div>

			<div class="ph2 mb4">
				<h1>John A's Request...</h1>

				<p v-if="context === 'pending'">
					This is a package you've you can take. Accept, counter or just leave it as is.
				</p>
				<p v-if="context === 'countered'">
					This is a package you've countered! You can cancel your counter offer, or wait until the Requester accepts.
				</p>
				<p v-if="context === 'accepted'">
					This is a package you've <strong>Accepted</strong> to take. Before you can get paid, let's follow belows checklist.
				</p>
			</div>




			<!-- IF PENDING/OFFERED -->
			<div class="ph2 mv3 flex justify-between" v-if="context === 'pending'">
				<!-- Button inside box -->
				<button class="box flex-1 mr2" 
					@click="acceptRequestOffer()">
					Accept Offer
				</button>
				<!-- Button inside box -->
				<button class="box flex-1 ml2" 
					@click="showCounterRequestForm()">
					Counter Offer
				</button>
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



			<div class="flex ph2 mb3">
				<div class="medium-block medium-block--stretch box box--light mr3">
					<p class="ma0 f4">Your Profit</p>
					<h1 class="ma0 mt2 lh-title">
						<Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.offeredPrice.amount}}
					</h1>
				</div>
				<div class="medium-block medium-block--stretch box box--light">
					<p class="ma0 f4">Cost of item</p>
					<h1 class="ma0 mt2 lh-title">
						<Currency :currencyCode="request.package.price.currencyCode"/>{{request.package.price.amount}}
					</h1>
				</div>
			</div>





			<div v-if="context === 'accepted'">
				<div class="ph2 mb3 flex">
					<div class="medium-block medium-block--stretch box box--accepted">
						<p class="ma0 f4">Status</p>
						<h2 class="ma0 mt2 mb3 lh-title">You've accepted</h2>

						<div class="flex justify-between">
							<!-- Button inside box -->
							<button type="submit" class="small-block box">
								Update your checklist
							</button>
						</div>
					</div>
				</div>
			</div>

			




			<div v-if="context === 'countered'" class="mb3">
				<div class="ph2 list pa0">
					<div class="medium-block medium-block--stretch box box--caution" >
						<p class="ma0 f4">You've countered the original offer</p>
						<h2 class="ma0 mt2 mb3 lh-title">
							<Currency :currencyCode="myCounterOfferOnRequest.currencyCode"/>
							{{myCounterOfferOnRequest.amount}}
						</h2>

						<!-- Button inside box -->
						<button class="box w-100" 
							@click="acceptCounterOffer()">
							Cancel Counter Offer
						</button>
					</div>
				</div>
			</div>
			

			<div class="ph2 mb3">
				<div class="medium-block medium-block--stretch box">
					<img src="@/assets/maps.png" alt="">

					<p class="ma0 f4">Where to pick up the item</p>
					<h2 class="ma0 mt2 lh-title underline"><Place :placeId="request.fromLocation.googlePlaceId"/></h2>
				</div>
			</div>
			<div class="ph2 mb4">
				<div class="medium-block medium-block--stretch box box--light">
					<p class="ma0 f4">Where to bring the item</p>
					<h2 class="ma0 mt2 lh-title"><Place :placeId="request.toLocation.googlePlaceId"/></h2>
				</div>
			</div>

			<div v-if="context === 'accepted'">
				<div class="ph2 mb4">
					<h2>Your Checklist</h2>
					<p>
						This is the history and next actions required by you. 
					</p>
				</div>
			
				<div class="ph2 mb1">
					<div class="medium-block medium-block--stretch box box--accepted">
						<p class="ma0 f4">Time left until your trip</p>
						<h2 class="ma0 mt2 lh-title">
							{{timeLeftUntilMyTrip}}
						</h2>
					</div>
				</div>


				<div class="ph2">
					<ul class="list pa0">
						<li v-for="(item, idx) in checklist" :key="idx">
							<label 
								:for="idx" 
								class="flex items-center box pointer" 
								:class="item.value ? 'box--light--active': ''"
							>
								<input type="checkbox" name="item1" :id="idx" class="mr2" 
									:value="item.value"
									@change="() => item.value = !item.value">
								<h3 class="ma0">{{item.title}}</h3>
							</label>
						</li>
					</ul>
				</div>
			</div>


			<!-- MODAL -->
			<div class="modal modal--bottom" v-if="isCounterFormVisible">
				<div class="modal-overlay" @click="() => isCounterFormVisible = !isCounterFormVisible"></div>
				<div class="modal-content my2 pa3 bg-near-white h100">
					<div class="app-width center">
						
						<form @submit.prevent="handleCounterOfferFormSubmit">

							<div class="mb4">
								<h1>Make counter offer</h1>
								<p>You think John A's original offer is too little? Counter with a price that you think
									that's fair. You only get to do this once.
								</p>
							</div>

							<div class="box box--light flex-1 mb4">
								<p class="ma0 f4">Offer (current)</p>
								<h1 class="ma0 mt2 lh-title"><Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.offeredPrice.amount}}</h1>
							</div>

							<label for="counter-offer" class="input-number-label mb4">
								<p class="mb1"><strong>Your counter offer</strong></p>
								<div class="relative flex items-center">
									<span class="symbol">
										<Currency :currencyCode="request.offeredPrice.currencyCode"/>
									</span>
									<input 
										id="counter-offer"
										class="input-number-input ma0" 
										type="number" 
										v-model="counterOfferPrice.amount" 
										:min="Number(request.offeredPrice.amount)"
									>
								</div>
							</label>


							<div class="mv3">
								<button type="submit" class="small-block box">
									Counter Offer
								</button>
							</div>

							<div class="mv3">
								<button @click="hideCounterRequestForm()"  class="small-block box box--light">
									Cancel Counter offer
								</button>
							</div>

						</form>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Currency from '@/components/Currency.vue'
import Place from '@/components/Place.vue'
// import TheirRequest from '@/components/TheirRequest.vue'

export default {
	name: 'TheirRequestOnMyTripView',
	components: {
		Currency,
		Place,
	},
	data() {
		return {
			request: {},
			loading: true,
			context: '', //accepted, countered, pending
			isCounterFormVisible: false,
			timeLeftUntilMyTripLeaves: null,
			// this is for the form offer...
			counterOfferPrice: {
				amount: 0,
				currencyCode: 'USD'
			},

			// this is your actual counter offer from API...
			myCounterOfferOnRequest: {
				amount: 0,
				currencyCode: 'USD'
			},

			checklist: [
				{
					title: "Picked Up",
					value: false
				},
				{
					title: "Purchased",
					value: false
				},
			]
		}
	},

	computed: {
		timeLeftUntilMyTrip() {
			var date_now = new Date()
			date_now = date_now.getTime();
			const tripLeavesDate = new Date(this.timeLeftUntilMyTripLeaves * 1000);
			
			// Minus 1 from month
			tripLeavesDate.setMonth(tripLeavesDate.getMonth() - 1)
			const tripLeavesUnixTimestamp = tripLeavesDate.getTime();

			// console.log('date_now :', date_now);
			// get total seconds between the times
			var delta = Math.abs(tripLeavesUnixTimestamp - date_now) / 1000;

			// calculate (and subtract) whole days
			var days = Math.floor(delta / 86400);
			delta -= days * 86400;

			// // calculate (and subtract) whole hours
			var hours = Math.floor(delta / 3600) % 24;
			delta -= hours * 3600;

			// // calculate (and subtract) whole minutes
			// var minutes = Math.floor(delta / 60) % 60;
			// delta -= minutes * 60;

			// what's left is seconds
			// var seconds = delta % 60;  // in theory the modulus is not required

			// Dont show days until if it's zero.
			if (days === 0) {
				return `${hours} hours`
			}
			return `${days} days, ${hours} hours`
		}
	},

	methods: {
		async getTheirRequest() {			
			this.$store.dispatch('getMyRequest', this.$route.params.id)
				.then((request) => {					
					this.request = request;	
					// This is to have Counter Offer form have the original offer to build from..
					this.counterOfferPrice = {
						amount: request.offeredPrice.amount + 5,
						currencyCode: request.offeredPrice.currencyCode,
					}		
					this.context = request.status.toLowerCase();
					this.getMyTrip(); //TODO make this it's own request so you can get all info....
					this.loading = false;
				})
				.catch(() => {
					this.$router.push({ name: 'home'})
				})
		},

		async getMyTrip() {
			this.$store.dispatch('getMyTrip', this.$route.params.tripId)
				.then((trip) => {
					this.trip = trip;
					this.timeLeftUntilMyTripLeaves = trip.fromDate;
					const yourCounterOffer = this.trip.counteredRequests.filter((counterRequest) => {
						if (
							counterRequest.request.id == this.$route.params.id &&
							counterRequest.trip.id == this.$route.params.tripId
						) {
							return counterRequest
						}
					})[0]

					this.myCounterOfferOnRequest = {
						amount: yourCounterOffer.price.amount,
						currencyCode: yourCounterOffer.price.currencyCode,
					}
				})
				.catch(() => {
					// this.$router.push({ name: 'home'})
				})
		},

		async acceptRequestOffer() {
			this.$store.dispatch('acceptRequestOnMyTrip', {
				tripId: this.$route.params.tripId,
				requestId: this.$route.params.id
			})
				.then(() => {
					let messageSuccess = {
						title: 'Accepted Request ✓',
						message: 'You have your mission.'
					}

					// Set App Modal (good job!)
					this.$store.dispatch('showAppMessage', messageSuccess).then(() => {
						// Redirect to Trip created.
						this.$router.push({ 
							name: 'their-request-accepted', 
							meta: { context: 'accepted' },
							params: { 
								tripId: this.$route.params.tripId,
								id: this.$route.params.id,
							}
						})
					})
				})
		},


		// Handle "Counter" click on button
		async attachCounterOfferToRequest() {
			this.$store.dispatch('attachCounterOfferToRequest', {
				tripId: this.$route.params.tripId,
				requestId: this.$route.params.id,
				counterOffer: {
					amount: Number(this.counterOfferPrice.amount),
					currencyCode: this.counterOfferPrice.currencyCode,
				}
			})
				.then((yourTrip) => {
					console.log('attachCounterOfferToRequest....yourTrip :', yourTrip);

					
					let messageSuccess = {
						title: 'Counter Offered ✓',
						message: 'John A will now review your offer.'
					}

					// Set App Modal (good job!)
					this.$store.dispatch('showAppMessage', messageSuccess).then(() => {
						// Redirect to Trip created.
						this.$router.replace({ 
							name: 'their-request-countered', 
							meta: { context: 'countered' },
							params: { 
								tripId: this.$route.params.tripId,
								id: this.$route.params.id,
							}
						})

					// console.log('yourCounterOffer :', yourCounterOffer);
					// this.myCounterOfferOnRequest = {
					// 	amount: yourCounterOffer.price.amount,
					// 	currencyCode: yourCounterOffer.price.currencyCode,
					// }
					// console.log('UPDATE WITH THIS. :', this.myCounterOfferOnRequest);
					})
				})
		},

		async handleCounterOfferFormSubmit() {
			if (this.counterOfferNumber <= this.request.offeredPrice.amount) {
				console.log('cant be equal or lower than original offer');
				return false;
			}
			this.hideCounterRequestForm();
			this.attachCounterOfferToRequest();
		},

		showCounterRequestForm() {
			this.isCounterFormVisible = true
		},

		hideCounterRequestForm() {
			this.isCounterFormVisible = false
		},
	},

	mounted() {
		this.getTheirRequest();
	},
}

</script>


<style lang="scss">
.input-number-label {
	.symbol {
		position: absolute;
		left: 0.7em;
		top: 15px;
		display: flex;
		align-items: center;
	}
	input {
		padding-left: 1.8em;
		margin-bottom: 0rem;
	}
}

</style>


