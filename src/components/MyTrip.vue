<template>
  <div>
		
		<!-- <div 
			class="medium-block box flex items-center"
			:class="isLink ? 'box--link' : 'box--light'"
		>
			<div>
				<div class="flex">
					<h5 class="ma0 mb2"><Place :placeId="trip.fromLocation.googlePlaceId"/></h5> 
				</div>
				<h6 class="ma0 mt0">{{formatDatetoYMD(trip.fromDate)}}</h6>
			</div>
		</div> -->

		<div class="medium-block medium-block--stretch box mb3" :class="isLink ? 'box--link' : 'box--light'">
			<p class="ma0 f4">Leaving from</p>
			<h2 class="ma0 mt2 mb2 lh-title">
				<Place :placeId="trip.fromLocation.googlePlaceId"/>
			</h2>
			<p>{{formatDatetoYMD(trip.fromDate)}}</p>
		</div>

		<div class="medium-block medium-block--stretch box" :class="isLink ? 'box--link' : 'box--light'">
			<p class="ma0 f4">Arriving at</p>
			<h2 class="ma0 mt2 mb2 lh-title">
				<Place :placeId="trip.toLocation.googlePlaceId"/>
			</h2>
			<p>
				{{formatDatetoYMD(trip.fromDate)}}
			</p>
		</div>

		<!-- <div 
			class="medium-block box flex items-center"
			:class="isLink ? 'box--link' : 'box--light'"
		>
			<div>
				<div class="flex">
					<h5 class="ma0 mb2"><Place :placeId="trip.toLocation.googlePlaceId"/></h5>
				</div>
				<h6 class="ma0 mt0">{{formatDatetoYMD(trip.fromDate)}}</h6>
			</div>
		</div> -->
	</div>
</template>

<script>
/* eslint-disable no-console */
import Place from '@/components/Place.vue'

export default {
	name: 'MyTrip',
	props: [
		'trip',
		'isLink'
	],
	components: {
		Place,
	},
	methods: {
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
