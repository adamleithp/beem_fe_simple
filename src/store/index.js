/* eslint-disable no-console */

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
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
	},
	actions: {

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
						counterOffers {
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
								counterStatus
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
						await fetch(process.env.VUE_APP_API_URL, {
							headers: {
								'content-type': 'application/json',
							},
							method: 'POST',
							body: query,
						});

						await dispatch('getMyTrips');
						return true;
					} catch (error) {
						return false;
					}
				},
			},
		});
