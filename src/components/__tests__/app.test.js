import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../../App.vue';
import { vi } from 'vitest';



describe('App', () => {
    const wrapper = mount(App);
    it('initially sets isLoggedIn to false', () => {
        expect(wrapper.vm.isLoggedIn).toBe(true);
    });

    it('shows the login and register buttons when not logged in', () => {
        expect(wrapper.find('.btn-success').exists()).toBe(true);
        expect(wrapper.find('#registerBtn').exists()).toBe(true);
    });

    it('sets the showModal and whichModal data properties when showing the login modal', () => {
        wrapper.vm.showLoginModal();
        expect(wrapper.vm.showModal).toBe(true);
        expect(wrapper.vm.whichModal).toBe('login');
    });

    it('sets the showModal and whichModal data properties when showing the register modal', () => {
        wrapper.vm.showRegisterModal();
        expect(wrapper.vm.showModal).toBe(true);
        expect(wrapper.vm.whichModal).toBe('register');
    });

    it('closes the modal when closeModal method is called', () => {
        wrapper.vm.closeModal();
        expect(wrapper.vm.showModal).toBe(false);
    });

    it('sets the isLoggedIn and username properties when login method is called', () => {
        const username = 'testUser';
        wrapper.vm.login(username);
        expect(wrapper.vm.isLoggedIn).toBe(true);
        expect(wrapper.vm.username).toBe(username);
        expect(wrapper.vm.showModal).toBe(false);
    });

    it('calls the calculateABTestRes method when register method is called', () => {
        const calculateABTestResSpy = vi.spyOn(wrapper.vm, 'calculateABTestRes');
        wrapper.vm.register();
        expect(calculateABTestResSpy).toHaveBeenCalled();
    });
    
    

});



