<template>
	<div v-if="loading">
		<div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
			 <img src="../../assets/img/loading.gif">
		</div>
	</div>

	<div v-else>
		<div style="margin: auto; width: 25%; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
			<div style="text-align: center; padding-right: 40px;">{{ firstName }}</div>
		</div>
		<form class="payment-form payment-form--create d-flex justify-content-stretch" autocomplete="off">
		  <fieldset class="sender-data form-section-wrapper">
			<div class="form-section" style="width: 100%;">
			  <div class="form-group">
				<label for="senderSurname">First Name</label>
				<input type="text" class="form-control" id="senderSurname" placeholder="First Name" v-model="firstName">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть прізвище відправника.
				</div>
			  </div>

			  <div class="form-group">
				<label for="senderName">Last Name</label>
				<input type="text" class="form-control" id="senderName" placeholder="Last Name" v-model="lastName">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть ім'я відправника.
				</div>
			  </div>

			  <div class="form-group">
				<label for="senderPatronymic1">Username</label>
				<input type="text" class="form-control" id="senderPatronymic1" placeholder="Username" v-model="username">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть по-батькові відправника.
				</div>
			  </div>

			  <div class="form-group">
				<label for="senderPatronymic2">E-mail</label>
				<input type="text" class="form-control" id="senderPatronymic2" placeholder="E-mail" v-model="email">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть по-батькові відправника.
				</div>
			  </div>

			  <div class="form-group">
				<label for="senderPatronymic3">ID</label>
				<input type="text" class="form-control" id="senderPatronymic3" placeholder="ID" v-model="id">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть по-батькові відправника.
				</div>
			  </div>

			  <div class="d-flex justify-content-center" style="margin-top: 30px;">
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
	name: 'users-edit',
	data() {
		return {
			name: '',
      email: '',
			street: '',
			house: '',
			id: '',
			index: '',
			loading: false
		}
	},
	created() {
		if (!appConfig.item) {
			this.$router.push('/phones');
		} else {
			this.setData();
		}
	},
	methods: {
		setData() {
			if (appConfig) {
				if (appConfig.item) {

					this.id = appConfig.item.id;
					this.firstName = appConfig.item.first_name;
          this.lastName = appConfig.item.last_name;
          this.username = appConfig.item.username;
          this.email = appConfig.item.email;
				}
			}
		},
		goBack() {
			this.$router.push('/contacts');
		}
	}
}
</script>
