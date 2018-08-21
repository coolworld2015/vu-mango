<template>
	<div v-if="loading">
		<div style="position: relative; top: 100px; -webkit-box-align:center; -webkit-box-pack:center; display:-webkit-box; font-size:54px">
			 <img src="../../assets/img/loading.gif">
		</div>
	</div>

	<div v-else>
		<div style="margin: auto; width: 25%; font-size: 22px; font-weight: bold; margin-bottom: 10px;">
			<div style="text-align: center; padding-right: 40px;">{{ name }}</div>
		</div>
		<form class="payment-form payment-form--create d-flex justify-content-stretch" autocomplete="off">
		  <fieldset class="sender-data form-section-wrapper">
			<div class="form-section" style="width: 100%;">
			  <div class="form-group">
				<label for="senderSurname">Name</label>
				<input type="text" class="form-control" id="senderSurname" placeholder="Name" v-model="name">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть прізвище відправника.
				</div>
			  </div>

			  <div class="form-group">
				<label for="senderName">Phone</label>
				<input type="text" class="form-control" id="senderName" placeholder="Phone" v-model="phone">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть ім'я відправника.
				</div>
			  </div>

			  <div class="form-group">
				<label for="senderPatronymic">Street</label>
				<input type="text" class="form-control" id="senderPatronymic1" placeholder="Street" v-model="street">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть по-батькові відправника.
				</div>
			  </div>

			  <div class="form-group">
				<label for="senderPatronymic">House</label>
				<input type="text" class="form-control" id="senderPatronymic1" placeholder="House" v-model="house">
				<div class="invalid-feedback">
				  Будь ласка, коректно вкажіть по-батькові відправника.
				</div>
			  </div>

			  <div class="form-group">
				<label for="senderPatronymic">Apt</label>
				<input type="text" class="form-control" id="senderPatronymic1" placeholder="Apt" v-model="id">
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
					this.name = appConfig.item.first_name;
					this.phone = appConfig.item.email;
					this.street = appConfig.item.last_name;
					this.house = appConfig.item.username;
					this.apt = appConfig.item.password;
					this.index = appConfig.item.index;
				}
			}
		},
		goBack() {
			this.$router.push('/clients');
		}
	}
}
</script>
