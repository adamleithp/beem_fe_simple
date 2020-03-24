<template>
  <div class="my-request pb5">
		<div class="w-100 pb6 pt5">
			<div class="mt5 ph2">
				<h1>Settings</h1>
				<p>
					This is your settings for all things Beem. 
				</p>
			</div>

      <div class="mb4">



        <!-- User Settings -->
				<div class="ph2 mb5">
          <div class="mb3">
            <h2>User Settings</h2>
            <p>
              When a request is accepted, and the traveller purchases the item, your money is held in escrow here in Beem. 
              If the request is not fulfilled by the traveller, your money is returned to you.
            </p>
          </div>
				
					<div class="medium-block medium-block--stretch box box--light mb3">
            <p class="ma0 f4">Username</p>
            <div class="mt2 flex justify-between items-baseline">
              <h2 class="ma0 lh-title mr3">Adamleithp</h2>
            </div>
          </div>
					<div class="medium-block medium-block--stretch box box--light mb3">
            <p class="ma0 f4">Email</p>
            <div class="mt2 flex justify-between items-baseline">
              <h2 class="ma0 lh-title mr3">adamleithp@gmail.com</h2>
            </div>
          </div>
					<div class="medium-block medium-block--stretch box box--light mb3">
            <p class="ma0 f4">Password</p>
            <div class="mt2 flex justify-between items-baseline">
              <h2 class="ma0 lh-title mr3">***********************</h2>
            </div>
          </div>
          <button type="submit" class="small-block box">
            Manage user settings
          </button>
				</div>


        <!-- Payment Settings -->
				<div class="ph2 mb5">
					<div class="mb3">
            <h2>Payment Settings</h2>
            <p>
              When a request is accepted, and the traveller purchases the item, your money is held in escrow here in Beem. 
              If the request is not fulfilled by the traveller, your money is returned to you.
            </p>
          </div>

				
					<div class="medium-block medium-block--stretch box box--light mb3">
            <p class="ma0 f4">Card Saved</p>
            <div class="mt2 flex justify-between items-baseline">
              <h2 class="ma0 lh-title mr3">**** **** **** 0123</h2>
              <img src="@/assets/visa-card.png" alt="" class="payment-card-img">
            </div>
          </div>
					
          <div class="medium-block medium-block--stretch box box--light mb3">
            <p class="ma0 f4">Currency</p>
            <div class="mt2 flex justify-between items-baseline">
              <h2 class="ma0 lh-title mr3">USD</h2>
            </div>
          </div>

          <button type="submit" class="small-block box">
            Manage payment details
          </button>
				</div>
        
        
        <!-- General Settings -->
				<div class="ph2 mb5">
					<div class="mb3">
            <h2>General Settings</h2>
            <p>
              Everything else!
            </p>
          </div>

					<div class="medium-block medium-block--stretch box box--light mb3">
            <p class="ma0 f4">Import Flights from Mail</p>
            <div class="mt2 flex justify-between items-baseline">
              <h2 class="ma0 lh-title mr3">Gmail</h2>
            </div>
          </div>

					<div class="medium-block medium-block--stretch box box--light mb3">
            <p class="ma0 f4">Units of Measurement</p>
            <div class="mt2 flex justify-between items-baseline">
              <h2 class="ma0 lh-title mr3">Metric <span class="text--gray">/ Imperial</span></h2>
            </div>
          </div>
					
          <div class="medium-block medium-block--stretch box box--light mb3">
            <p class="ma0 f4">Default Maps Application</p>
            <div class="mt2 flex justify-between items-baseline">
              <h2 class="ma0 lh-title mr3">Google Maps <span class="text--gray">/ Waze</span></h2>
            </div>
          </div>

          <button type="submit" class="small-block box">
            Manage general settings
          </button>
				</div>
        



        

        
      </div>
    </div>
  </div>
</template>
