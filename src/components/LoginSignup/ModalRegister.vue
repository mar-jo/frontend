<template>

    <div>

        <div slot="body">
            <form @submit.prevent="onSubmit">  
                <!---username -->
                <div class="form-item" :class="{ errorInput: $v.username.$error }">
                    <label>username</label>
                    <!-- <p class="errorText" v-if="!$v.username.required"> username is required </p>
                    <p class="errorText" v-if="!$v.username.minLength"> username is not correct </p>   -->                
                    <!-- <input 
                        v-model="username"
                        :class="{ error: $v.username.$error }"
                        @change="$v.username.$touch"> -->
                    <input
                        class="reg-username-input"
                        type="text"
                        placeholder="Enter username..."
                        v-model="username"
                        @keyup.enter="enter"
                    />
                </div>
                 <!---password -->
                <div class="form-item" :class="{ errorInput: $v.password.$error }">
                    <!-- <label>Password</label>
                    <p class="errorText" v-if="!$v.password.required"> Password is required </p>
                    <p class="errorText" v-if="!$v.password.minLength"> Password must have at least {{ $v.password.$params.minLength.min }} symbols  </p>                  
                     -->
                    <input type="password"
                        v-model="password"
                        :class="{ error: $v.password.$error }"
                        @change="$v.password.$touch">
                </div>
                 <div class="form-item" :class="{ errorInput: $v.repeatPassword.$error }">
                    <label>Repeat password</label>                   
                    <p class="errorText" v-if="!$v.repeatPassword.sameAsPassword"> Password is not the same!  </p>                  
                    <input type="password"
                        v-model="repeatPassword"
                        :class="{ error: $v.repeatPassword.$error }"
                        @change="$v.repeatPassword.$touch">
                </div>               

                <button class="btn btnPrimary" >Register</button>
            </form>
        </div>

        <div slot="switch">
             <button class="btn btnWhite" @click="$emit('switch')">Already have an account? Login</button>
        </div>
    </div>
    
</template>

<script>
//Plugins
import { required, minLength, sameAs} from 'vuelidate/lib/validators';
import register from '../../api'

//import Modals from '@/components/LoginSignup/Modal.vue';
export default {
    // components: {
    //     Modals
    // },
    data() {
        return {          
            username: '',
            password: '',
            repeatPassword: ''
        }
    },
    validations: {
        username: {
            required
        },
        password: {
            required,
            minLength: minLength(6)
        },
        repeatPassword: {
            required,
            sameAsPassword: sameAs('password')
        }
    },
    methods: {
        onSubmit () {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                register(this.username, this.password);

                //When done               
                this.username = '';
                this.password = '';
                this.repeatPassword = '';
                this.$v.$reset();
                this.$emit("close")
            }           
        },
        onClose() {           
            this.username = '';
            this.password = '';
            this.repeatPassword = '';
            this.$v.$reset();
            this.$emit("close")
        }
    }
  
}
</script>

<style>

</style>
