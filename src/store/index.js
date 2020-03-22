/* eslint-disable no-console */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		appMessage: {
			title: '',
			message: ''
		}, 
		myRequests: [],
		myTrips: [],
	},
	mutations: {
		setMyRequests(state, array) {
			state.myRequests = array;
		},
		setMyTrips(state, array) {
			state.myTrips = array;
		},
		setAppMessage(state, {title, message}) {
			state.appMessage = {title, message};
		},
	},
	actions: {

		showAppMessage({commit}, {title, message}) {			
			commit('setAppMessage', {title, message});

			setTimeout(() => {
				commit('setAppMessage', {
					title: '',
					message: ''
				});
				return true;
			}, 2500);
		},

		// returns Request
		async acceptCounterOfferAsRequester(_, payload) {
			const {tripId, requestId, counterRequestId} = payload;

			console.log('tripId, requestId, counterRequestId', tripId, requestId, counterRequestId);


			const query = JSON.stringify({
				query: `mutation {
					acceptCounterOfferAsRequester(input:{
						tripId:"${tripId}",
						requestId:"${requestId}"
						counterRequestId: "${counterRequestId}"
					}) {
						id
						status
						offeredPrice{
							currencyCode
							amount
						}
						toLocation {
							lat, lng, googlePlaceId
						}
						fromLocation {
							lat, lng, googlePlaceId
						}
						trip {
							id
							fromDate, toDate
							fromLocation {
								lat, lng, googlePlaceId
							}
							toLocation {
								lat, lng, googlePlaceId
							}
						}
						counterOffers {
							id
							trip {
								id
							}
							price {
								amount
								currencyCode
							}
						}
						package {
							id
							name
							description
							price {
								amount
								currencyCode
							}
						}
					}
				}`,
			});

			try {
				const response = await fetch(process.env.VUE_APP_API_URL, {
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
					body: query,
				});

				const responseJson = await response.json();
				console.log('===== acceptCounterOfferAsRequester', responseJson);

				return responseJson.data.acceptCounterOfferAsRequester;
			} catch (error) {
				return false;
			}
		},


		// Returns Request
		async declineCounterOfferAsRequester(_, payload) {
			const {tripId, requestId, counterRequestId} = payload;

			console.log('tripId, requestId, counterRequestId', tripId, requestId, counterRequestId);


			const query = JSON.stringify({
				query: `mutation {
					rejectCounterOfferAsRequester(input:{
						tripId:"${tripId}",
						requestId:"${requestId}"
						counterRequestId: "${counterRequestId}"
					}) {
						id
						status
						offeredPrice{
							currencyCode
							amount
						}
						toLocation {
							lat, lng, googlePlaceId
						}
						fromLocation {
							lat, lng, googlePlaceId
						}
						trip {
							id
							fromDate, toDate
							fromLocation {
								lat, lng, googlePlaceId
							}
							toLocation {
								lat, lng, googlePlaceId
							}
						}
						counterOffers {
							id
							trip {
								id
							}
							price {
								amount
								currencyCode
							}
						}
						package {
							id
							name
							description
							price {
								amount
								currencyCode
							}
						}
					}
				}`,
			});

			try {
				const response = await fetch(process.env.VUE_APP_API_URL, {
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
					body: query,
				});

				const responseJson = await response.json();
				console.log('===== rejectCounterOfferAsRequester', responseJson);

				return responseJson.data.rejectCounterOfferAsRequester;
			} catch (error) {
				return false;
			}
		},

		// Returns a trip.
		async attachCounterOfferToRequest(_, payload){
			const {tripId, requestId, counterOffer} = payload;

			const query = JSON.stringify({
				query: `mutation {
					attachCounterOfferToRequest(input:{
						tripId:"${tripId}",
						requestId:"${requestId}"
						counterOffer: {
							currencyCode: "${counterOffer.currencyCode}"
							amount: ${counterOffer.amount}
						}
					})
					{
						id
						fromDate, toDate
						fromLocation {
							lat, lng, googlePlaceId
						}
						toLocation {
							lat, lng, googlePlaceId
						}
						counteredRequests {
							id
							counterStatus
							trip {
								id
							}
							request {
								id
							}
							price {
								currencyCode
								amount
							}
						}
						attachedRequests {
							id
							status
							offeredPrice {
								currencyCode
								amount
							}
							toLocation {
								lat, lng, googlePlaceId
							}
							fromLocation {
								lat, lng, googlePlaceId
							}
							package {
								name
								description
								price {
									amount, currencyCode
								}
							}
						}
					}
				}`,
			});

			try {
				const response = await fetch(process.env.VUE_APP_API_URL, {
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
					body: query,
				});

				const responseJson = await response.json();

				return responseJson.data.attachCounterOfferToRequest;
			} catch (error) {
				return false;
			}
		},


		async acceptRequestOnMyTrip(_, payload){
			const {tripId, requestId} = payload;

			const query = JSON.stringify({
				query: `mutation {
					attachRequestToTrip(input:{
						tripId:"${tripId}",
						requestId:"${requestId}"
					})
					{
						id
						fromDate, toDate
						fromLocation {
							lat, lng, googlePlaceId
						}
						toLocation {
							lat, lng, googlePlaceId
						}
						counteredRequests {
							id
							counterStatus
							price {
								currencyCode
								amount
							}
						}
						attachedRequests {
							id
							status
							offeredPrice {
								currencyCode
								amount
							}
							toLocation {
								lat, lng, googlePlaceId
							}
							fromLocation {
								lat, lng, googlePlaceId
							}
							package {
								name
								description
								price {
									amount, currencyCode
								}
							}
						}
					}
				}`,
			});

			try {
				const response = await fetch(process.env.VUE_APP_API_URL, {
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
					body: query,
				});

				const responseJson = await response.json();

				return responseJson.data.attachRequestToTrip;
			} catch (error) {
				return false;
			}

		},

		async getMyRequests({ commit }) {
			const query = JSON.stringify({
				query: `query {
					myRequests {
						id
						status
						offeredPrice{
							currencyCode
							amount
						}
						toLocation {
							lat, lng, googlePlaceId
						}
						fromLocation {
							lat, lng, googlePlaceId
						}
						trip {
							id
							fromDate, toDate
							fromLocation {
								lat, lng, googlePlaceId
							}
							toLocation {
								lat, lng, googlePlaceId
							}
						}
						counterOffers {
							id
							trip {
								id
							}
							price {
								amount
								currencyCode
							}
						}
						package {
							id
							name
							description
							price {
								amount
								currencyCode
							}
						}
					}
				}`,
			});

			try {
				const response = await fetch(process.env.VUE_APP_API_URL, {
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
					body: query,
				});

				const responseJson = await response.json();
				commit('setMyRequests', responseJson.data.myRequests);
				return true;
			} catch (error) {
				return false;
			}
		},


		async getMyRequest(_, payload) {
			const query = JSON.stringify({
				query: `query {
					myRequest(
						id: "${payload}"
					) {
						id
						status
						offeredPrice{
							currencyCode
							amount
						}
						toLocation {
							lat, lng, googlePlaceId
						}
						fromLocation {
							lat, lng, googlePlaceId
						}
						trip {
							id
							fromDate, toDate
							fromLocation {
								lat, lng, googlePlaceId
							}
							toLocation {
								lat, lng, googlePlaceId
							}
						}
						counterOffers {
							id
							trip {
								id
							}
							price {
								amount
								currencyCode
							}
						}
						package {
							id
							name
							description
							price {
								amount
								currencyCode
							}
						}
					}
				}`,
			});

			try {
				const response = await fetch(process.env.VUE_APP_API_URL, {
					headers: {
						'content-type': 'application/json',
					},
					method: 'POST',
					body: query,
				});

				const responseJson = await response.json();
				return responseJson.data.myRequest;
			} catch (error) {
				return false;
			}
		},

		async getMyTrip(_, payload) {
			const query = JSON.stringify({
				query: `query {
					myTrip(
						id: "${payload}"
						) {
							id
							fromDate, toDate
							fromLocation {
								lat, lng, googlePlaceId
							}
							toLocation {
								lat, lng, googlePlaceId
							}
							counteredRequests {
								id
								counterStatus
								trip {
									id
								}
								request {
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
									package {
										name
										description
										price {
											amount, currencyCode
										}
									}
								}
								price {
									currencyCode
									amount
								}
							}
							attachedRequests {
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
								package {
									name
									description
									price {
										amount, currencyCode
									}
								}
							}
						}
					}`,
				});

				try {
					const response = await fetch(process.env.VUE_APP_API_URL, {
						headers: {
							'content-type': 'application/json',
						},
						method: 'POST',
						body: query,
					});

					const responseJson = await response.json();
					return responseJson.data.myTrip;
				} catch (error) {
					return false;
				}
			},

			async getRequestsForLocation(_, payload) {
				const query = JSON.stringify({
					query: `query {
						getRequestsForLocation(
							placeId: "${payload}"
							) {
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
								package {
									name
									description
									price {
										amount, currencyCode
									}
								}
							}
						}`,
					});

					try {
						const response = await fetch(process.env.VUE_APP_API_URL, {
							headers: {
								'content-type': 'application/json',
							},
							method: 'POST',
							body: query,
						});

						const responseJson = await response.json();
						return responseJson.data.getRequestsForLocation;
					} catch (error) {
						return false;
					}
				},

				async getMyTrips({ commit }) {
					const query = JSON.stringify({
						query: `query {
							myTrips {
								id
								fromDate, toDate
								fromLocation {
									lat, lng, googlePlaceId
								}
								toLocation {
									lat, lng, googlePlaceId
								}
								counteredRequests {
									id
									counterStatus
									price {
										currencyCode
										amount
									}
								}
								attachedRequests {
									id
								}
							}
						}`,
					});

					try {
						const response = await fetch(process.env.VUE_APP_API_URL, {
							headers: {
								'content-type': 'application/json',
							},
							method: 'POST',
							body: query,
						});

						const responseJson = await response.json();
						commit('setMyTrips', responseJson.data.myTrips);
						return true;
					} catch (error) {
						return false;
					}
				},

				async createRequest({ dispatch }, payload) {
					const query = JSON.stringify({
						query: `mutation {
							createRequest(input:{
								fromLocation: {
									lat: ${payload.fromLocation.lat},
									lng: ${payload.fromLocation.lng},
									googlePlaceId: "${payload.fromLocation.googlePlaceId}",
								}
								toLocation: {
									lat: ${payload.toLocation.lat},
									lng: ${payload.toLocation.lng},
									googlePlaceId: "${payload.toLocation.googlePlaceId}",
								}
								offeredPrice:{
									amount: ${payload.offeredPrice.amount},
									currencyCode: "${payload.offeredPrice.currencyCode}",
								}
								package:{
									name: "${payload.package.name}",
									description: "${payload.package.description}",
									price:{
										amount: ${payload.package.price.amount},
										currencyCode: "${payload.package.price.currencyCode}"
									}
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
								package {
									name
									description
									price {
										amount, currencyCode
									}
								}
							}
						}`,
					});

					try {
						await fetch(process.env.VUE_APP_API_URL, {
							headers: {
								'content-type': 'application/json',
							},
							method: 'POST',
							body: query,
						});

						// const responseJson = await response.json();
						await dispatch('getMyRequests');
						return true;
					} catch (error) {
						return false;
					}
				},

				async createTrip({ dispatch }, payload) {
					const query = JSON.stringify({
						query: `mutation {
							createTrip(input:{
								fromLocation: {
									lat: ${payload.fromLocation.lat},
									lng: ${payload.fromLocation.lng},
									googlePlaceId: "${payload.fromLocation.googlePlaceId}",
								}
								toLocation: {
									lat: ${payload.toLocation.lat},
									lng: ${payload.toLocation.lng},
									googlePlaceId: "${payload.toLocation.googlePlaceId}",
								}
								fromDate: ${payload.fromDate},
								toDate: ${payload.toDate},
							}) {
								id
								fromDate, toDate
								fromLocation {
									lat, lng, googlePlaceId
								}
								toLocation {
									lat, lng, googlePlaceId
								}
							}
						}`,
					});

					try {
						const response = await fetch(process.env.VUE_APP_API_URL, {
							headers: {
								'content-type': 'application/json',
							},
							method: 'POST',
							body: query,
						});

						const responseJson = await response.json();						
						await dispatch('getMyTrips');
						return responseJson.data.createTrip;
					} catch (error) {
						return false;
					}
				},


				async getLocationSuggestions(_, payload) {
					const {locationString, typeOfLocationLookup} = payload;

					const query = JSON.stringify({
						query: `query {
							getLocationSuggestions(
								locationString: "${locationString}",
								typeOfLocationLookup: "${typeOfLocationLookup}")
							{
								id
								description
							}
						}`,
					});

					try {
						const response = await fetch(process.env.VUE_APP_API_URL, {
							headers: {
								'content-type': 'application/json',
							},
							method: 'POST',
							body: query,
						});

						// return response;
						const responseJson = await response.json();
						return responseJson.data.getLocationSuggestions;
					} catch (error) {
						return false;
					}
				},

				async getLocationInformation(_, payload) {
					const {locationId} = payload;

					const query = JSON.stringify({
						query: `query {
							getLocationInformation(locationId:"${locationId}") {
								lat
								lng
								googlePlaceId
								formattedAddress,
							}
						}`,
					});

					try {
						const response = await fetch(process.env.VUE_APP_API_URL, {
							headers: {
								'content-type': 'application/json',
							},
							method: 'POST',
							body: query,
						});

						// return response;
						const responseJson = await response.json();
						return responseJson.data.getLocationInformation;
					} catch (error) {
						return false;
					}
				},
			},
		});
