import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    }
  },
  actions: {
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
							amount
							currencyCode
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
				}`
			});

      try {
        const response = await fetch(process.env.VUE_APP_API_URL, {
          headers: {
            'content-type': 'application/json'
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
					}
				}`
			});

      try {
        const response = await fetch(process.env.VUE_APP_API_URL, {
          headers: {
            'content-type': 'application/json'
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
				}`
			});

      try {
        await fetch(process.env.VUE_APP_API_URL, {
          headers: {
            'content-type': 'application/json'
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
				}`
			});

      try {
        await fetch(process.env.VUE_APP_API_URL, {
          headers: {
            'content-type': 'application/json'
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
})
