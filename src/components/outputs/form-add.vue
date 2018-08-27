<template>
  <div v-if="loading">
    <div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
      <img src="../../assets/img/loading.gif">
    </div>
  </div>

  <div v-else>
	<div style="margin: auto; width: 25%; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
		<div style="text-align: center; padding-right: 40px;">New transfer</div>
	</div>
    <form class="payment-form payment-form--create d-flex justify-content-stretch" autocomplete="off">
      <fieldset class="sender-data form-section-wrapper">
        <div class="form-section" style="width: 100%;">

          <!--<div class="form-group">
            <label for="senderSurname">E-mail</label>
            <input type="text" class="form-control" id="senderSurname" placeholder="E-mail"
              v-model="email"
              v-on:keypress="clearWarning"
              v-bind:class="{ warning: fieldsErrors.email }">
            <div class="invalid-feedback">
              Будь ласка, коректно вкажіть прізвище відправника.
            </div>
          </div>-->

          <div class="form-group">
            <label>E-mail</label>
            <select class="form-control" v-model="contactID" v-on:change="changeEmail"
                    v-on:keypress="clearWarning"
                    v-bind:class="{ warning: fieldsErrors.contactEmail }">
              <option v-for="option in contacts" v-bind:value="option.id" v-bind:data-email="option.email">
                {{ option.email }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="senderName">Amount</label>
            <input type="text" class="form-control" id="senderName" placeholder="Amount"
              v-model="amount"
              v-on:keypress="clearWarning"
              v-bind:class="{ warning: fieldsErrors.amount }">
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
      email: '',
			amount: '',
			loading: false,
      contacts: [{id:0, email:'Select e-mail'}],
      contactID: 0,
      contactEmail: 'Select e-mail',
			status: '',
			invalidValue: false,
			fieldsErrors: {
        email: false,
        amount: false,
        contactEmail: false
			}
		}
	},
	created() {
    this.getContacts();
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
		},
    getContacts() {
      this.$http.get(appConfig.URL + 'Customers?access_token='  + appConfig.access_token)
        .then(result => {
          this.contacts = result.data.sort(this.sort);
          this.contacts.unshift({id:0, email:'Select e-mail'});
          this.loading = false;
        }).catch(()=> {
        appConfig.notifications.items.push(this.notification);
        this.loading = false;
        this.$router.push('login');
      })
    },
    goBack() {
			this.$router.push('/outputs');
		},
		addItem() {
			if (this.contactEmail === '' || this.contactEmail === 'Select e-mail') {
				this.fieldsErrors.contactEmail = true;
				this.invalidValue = true;
			}

			if (this.amount === '') {
				this.fieldsErrors.amount = true;
				this.invalidValue = true;
			}

			if (this.invalidValue) {
				return;
			}

			this.loading = true;
			this.$http.post(appConfig.URL + 'Customers/transfer?access_token='  + appConfig.access_token, {
          recipient: this.contactEmail,
          value: this.amount
				})
				.then(result => {
					if (result.body.error) {
						appConfig.notifications.items.push(this.notification);
					} else {
						appConfig.notifications.items.push(this.notification1);
					}
					this.$router.push('/outputs');
				})
				.catch(()=> {
					appConfig.notifications.items.push(this.notification);
					this.$router.push('/outputs');
				})
		},
    changeEmail (e) {
      this.clearWarning();
      if(e.target.options.selectedIndex > -1) {
        this.contactEmail = e.target.options[e.target.options.selectedIndex].dataset.email
      }
    },
		clearWarning() {
			this.fieldsErrors.contactEmail = false;
			this.fieldsErrors.amount = false;
			this.invalidValue = false;
		}
	}
}
</script>
