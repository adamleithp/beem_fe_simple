# Simple

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




### TODO


## MVP
- [x] **Traveller**: Create Trip
  - [x] Google API for location from
  - [x] View Requests for location to
- [x] **Requester**: Create Requst
  - [x] Google API for location from
  - [x] Google API for location to
  - [x] Request Status to "Pending"
  - [ ] Payment Form or Credit card
- [x] **Traveller**: Accept Request to my trip
  - [x] Request Status to "Accepted"
- [x] **Traveller**: Counter Request to my trip
  - [x] Request Status to "Countered"
- [ ] **Requester**: Accept counter offer (should just be accept with new price... or new endpoint?)
- [ ] **Requester**: Decline counter offer
- [ ] **Traveller**: Update attached request status
  - [ ] Status to "Purchased"
  - [ ] Requester: their money is put in ESCRO
  - [ ] status to "On the way" (after start date of trip)
- [ ] **Traveller**: Generate QR code for request scan
- [ ] **Requester**: Read QR code when traveller
  - [ ] Request Status to "Delivered"
- [ ] **Escro**
  - [ ] Create mock API which shows transactions
  - [ ] Charge requester - Move money out of requester ESCRO (charge requester)
  - [ ] Pay traveller - Deliver money to traveller
- [ ] **Authentication**
  - [ ] Security
- [ ] **Form Validation**
  - [ ] All forms
- [ ] **Deploy to production**

## V2
- [ ] **Website**
  - [ ] How does it work (video?)
  - [ ] What we do
  - [ ] Why does this exist
  - [ ] Help Center
    - [ ] Automated Chat Bot
    - [ ] Contact us
    - [ ] Terms & Conditions
      - [ ] Traveller
      - [ ] Requester
- [ ] Design / Redesign
- [ ] Mobile Application (iOs/Android)
- [ ] Traveller: Add multi-location trip
- [ ] Traveller: Add dimension available for request
- [ ] Requester: Set request dimensions
- [ ] Traveller: Accept terms to create trip
- [ ] Requester: Accept terms to create request

