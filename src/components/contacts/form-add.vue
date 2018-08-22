<template>
  <div v-if="loading">
    <div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
      <img src="../../assets/img/loading.gif">
    </div>
  </div>

  <div v-else>
	<div style="margin: auto; width: 25%; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
		<div style="text-align: center; padding-right: 40px;">New contact</div>
	</div>
    <form class="payment-form payment-form--create d-flex justify-content-stretch" autocomplete="off">
      <fieldset class="sender-data form-section-wrapper">
        <div class="form-section" style="width: 100%;">
          <div class="form-group">
            <label for="senderSurname">First Name</label>
            <input type="text" class="form-control" id="senderSurname1" placeholder="First Name"
              v-model="firstName"
              v-on:keypress="clearWarning"
              v-bind:class="{ warning: fieldsErrors.firstName }">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть прізвище відправника.
            </div>
          </div>

          <div class="form-group">
            <label for="senderSurname">Last Name</label>
            <input type="text" class="form-control" id="senderSurname2" placeholder="Last Name"
              v-model="lastName"
              v-on:keypress="clearWarning"
              v-bind:class="{ warning: fieldsErrors.lastName }">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть прізвище відправника.
            </div>
          </div>

          <div class="form-group">
            <label for="senderSurname">Username</label>
            <input type="text" class="form-control" id="senderSurname3" placeholder="Username"
              v-model="username"
              v-on:keypress="clearWarning"
              v-bind:class="{ warning: fieldsErrors.username }">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть прізвище відправника.
            </div>
          </div>

          <div class="form-group">
            <label for="senderSurname">E-mail</label>
            <input type="text" class="form-control" id="senderSurname" placeholder="E-mail"
              v-model="email"
              v-on:keypress="clearWarning"
              v-bind:class="{ warning: fieldsErrors.email }">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть прізвище відправника.
            </div>
          </div>

          <div class="form-group">
            <label for="senderName">Password</label>
            <input type="text" class="form-control" id="senderName" placeholder="Password"
              v-model="password"
              v-on:keypress="clearWarning"
              v-bind:class="{ warning: fieldsErrors.password }">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть ім'я відправника.
            </div>
          </div>

 		  <div style="font-weight: bold; font-size: 14px; color: #dc3545; margin-top: 15px; text-align: center;">
		    <span v-show="invalidValue" style="margin-left: 0px;">Value required - please provide.</span>
		  </div>

		  <div class="d-flex justify-content-center" style1="margin-top: 30px;">
			<button class="btn btn-danger" v-on:click="addItem" style="margin: 10px; width: 100px; font-size: 14px;">Submit</button>
			<button class="btn btn-danger" v-on:click="goBack" style="margin: 10px; width: 100px; font-size: 14px;">Back</button>
		  </div>

        </div>
      </fieldset>
    </form>

  </div>
</template>

<script>
import appConfig from '../../main';
import navbar from '@/components/common/navbar';

export default {
	name: 'users-add',
	data() {
		return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
			password: '',
			pnfp: '',
			receiverPhone: '',
			receiverPhoneErr: false,
			loading: false,
			status: '',
			invalidValue: false,
			fieldsErrors: {
				name: false,
				pass: false,
				description: false
			}
		}
	},
	created() {
		this.notification = {
			title: 'Something went wrong',
			message: 'Server responded with status code error',
			important: true
		};
		this.notification1 = {
			title: 'Item created',
			message: `Item was created successfully`
		}
	},
	methods: {
		setData() {
			if (appConfig) {
				if (appConfig.user) {
					this.id = appConfig.user.id;
					this.name = appConfig.user.name;
					this.pass = appConfig.user.pass;
					this.description = appConfig.user.description;
				}
			}
		},
		isValid (data) {
			if (/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(data)) {
				console.log('Valid')
				this.receiverPhoneErr = false;
			} else {
				console.log('BAD')
				this.receiverPhoneErr = true;
			}
		},
		goBack() {
			this.$router.push('/contacts');
		},
		addItem() {
			if (this.firstName === '') {
				this.fieldsErrors.firstName = true;
				this.invalidValue = true;
			}

			if (this.lastName === '') {
				this.fieldsErrors.lastName = true;
				this.invalidValue = true;
			}

			if (this.username === '') {
				this.fieldsErrors.username = true;
				this.invalidValue = true;
			}

			if (this.email === '') {
				this.fieldsErrors.email = true;
				this.invalidValue = true;
			}

			if (this.password === '') {
				this.fieldsErrors.password = true;
				this.invalidValue = true;
			}

			if (this.invalidValue) {
				return;
			}

			this.loading = true;
			this.$http.post(appConfig.URL + 'Customers?access_token='  + appConfig.access_token, {
          first_name: this.firstName,
          last_name: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password
				})
				.then(result => {
					if (result.body.error) {
						appConfig.notifications.items.push(this.notification);
					} else {
						appConfig.notifications.items.push(this.notification1);
					}
					this.$router.push('/contacts');
				})
				.catch((error)=> {
					appConfig.notifications.items.push(this.notification);
					this.$router.push('/contacts');
				})
		},
		clearWarning() {
			this.fieldsErrors.firstName = false;
			this.fieldsErrors.lastName = false;
			this.fieldsErrors.username = false;
			this.fieldsErrors.email = false;
			this.fieldsErrors.password = false;
			this.invalidValue = false;
		}
	}
}
</script>
