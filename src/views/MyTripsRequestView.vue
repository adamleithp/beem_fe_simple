<template>
	<div class="my-trip pb5" v-if="!loading">
		<div class="w-100 pt2 mb4">

			{{this.$route.params.context}}

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
				<p v-if="this.$route.params.context === 'offered'">
					This is a package you've you can take. Accept, counter or just leave it as is.
				</p>
				<p v-if="this.$route.params.context === 'countered'">
					You've countered the original price.
				</p>
				<p v-if="this.$route.params.context === 'attached'">
					This is a package you've <strong>Accepted</strong> to take. Before you can get paid, let's follow belows checklist.
				</p>
			</div>

			<!-- IF PENDING/OFFERED -->
			<div class="mv3 flex justify-between" v-if="this.$route.params.context === 'offered'">
				<button class="box flex-1 mr2" 
					@click="acceptRequestOffer()">
					Accept Offer
				</button>
				<button class="box flex-1 ml2" 
					@click="showCounterRequestForm()">
					Counter Offer
				</button>
			</div>

			<!-- IF COUNTERED -->
			<div class="ph2 mb4">
				<div class="box box--caution" v-if="this.$route.params.context === 'countered'">
					Your counter request of 
					<strong><Currency :currencyCode="request.counterOffers[0].price.currencyCode"/>{{request.counterOffers[0].price.amount}}</strong>
					is Pending.
				</div>
			</div>


			<div class="ph2 mb3">
				<div class="medium-block medium-block--stretch box box--light">
					<p>Name</p>
					<h2 class="ma0 mt1 mb2">{{request.package.name}}</h2>
					<h4 class="ma0 mt1">{{request.package.description}}</h4>
				</div>

			</div>

			<div class="flex ph2 mb3">
				<div class="medium-block medium-block--stretch box box--light mr3">
					<p class="ma0 f4">Profit</p>
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

			<div class="ph2 mb4">
				<h2>Your Checklist</h2>
				<p>
					This is the history and next actions required by you. 
				</p>
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



			<div class="modal modal--bottom" v-if="isCounterFormVisible">
				<div class="modal-overlay" @click="() => isCounterFormVisible = !isCounterFormVisible"></div>
				<div class="modal-content my2 pa3 bg-near-white h100">
					<div class="app-width center">
						
						<form @submit.prevent="handleCounterOfferFormSubmit">

							<div class="mb4">
								<h1>Counter Requests Offer</h1>
								<p>You think John A's original offer is too little? Counter with a price that you think
									that's fair. You only get to do this once.
								</p>
							</div>

							<div class="box box--light flex-1 mb4">
								<p class="ma0 f4">Offer (current)</p>
								<h1 class="ma0 mt2 lh-title"><Currency :currencyCode="request.offeredPrice.currencyCode"/>{{request.offeredPrice.amount}}</h1>
							</div>

							<label for="counter-offer" class="mb4">
								<p class="mb1"><strong>You're leaving from..</strong></p>
								<div class="relative flex items-center">
									<div class="input-number-label mr1 mb3">
										<span class="f3 fw7">
											<Currency :currencyCode="request.offeredPrice.currencyCode"/>
										</span>
									</div>
									<input 
										id="counter-offer"
										class="input-number-input ma0" 
										type="number" 
										v-model="counterOfferPrice.amount" 
										:min="Number(request.offeredPrice.amount)"
									>
								</div>
							</label>


							<div class="mv3 flex justify-between">
								<button type="submit" class="small-block box">
									Counter Offer
								</button>
							</div>

							<div class="mv3 flex justify-between">
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
	name: 'MyTripRequest',
	components: {
		Currency,
		Place,
	},
	data() {
		return {
			request: {},
			loading: true,
			isCounterFormVisible: true,
			counterOfferPrice: {
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
	// computed: {

	// },
	methods: {
		async getTheirRequest() {
			console.log(this.$route.params);
			
			this.$store.dispatch('getMyRequest', this.$route.params.id)
				.then((request) => {					
					console.log('request', request);

					this.request = request;	
					this.counterOfferPrice = {
						amount: request.offeredPrice.amount,
						currencyCode: request.offeredPrice.currencyCode,
					}		
					this.loading = false;
				})
				.catch(() => {
					this.$router.push({ name: 'home'})
				})
		},

		async acceptRequestOffer() {
			this.$store.dispatch('acceptRequestOnMyTrip', {
				tripId: this.$route.params.tripId,
				requestId: this.$route.params.id
			})
				.then(() => {
					console.log('success');
					
					// this.$emit('requestChanged');
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
				.then(() => {
					let messageSuccess = {
						title: 'Counter Offered ✓',
						message: 'John A will now review your offer.'
					}

					// Set App Modal (good job!)
					this.$store.dispatch('showAppMessage', messageSuccess).then(() => {

						// Redirect to Trip created.
						this.$router.push({ 
							name: 'my-trips-request', 
							params: { 
								tripId: this.$route.params.tripId,
								id: this.$route.params.id,
								context: 'countered'
							}
						})
					})
					// this.$emit('requestChanged');
				})
		},

		async handleCounterOfferFormSubmit() {
			// if (this.counterOfferNumber <= this.request.offeredPrice.amount) {
			// 	console.log('cant be equal or lower than original offer');
			// 	return false;
			// }
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
	position: absolute;
	left: 1em;
	height: 5rem;
	top: -1px;
	display: flex;
	align-items: center;
}
.input-number-input[type="number"] {
	padding-left: 1.1em;
	margin-bottom: 0rem;
}
</style>


