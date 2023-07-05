import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoInput from "@/components/TodoInput.vue";


describe('TodoInput.vue', () => {
    const wrapper = mount(TodoInput);

    it('renders an input element with the correct initial state', () => {
        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes().placeholder).toBe('Enter next todo...');
        expect(wrapper.vm.value).toBe(null);
    });

    it('updates the value when the user types into the input', async () => {
        const input = wrapper.find('input');
        await input.setValue('Test todo');
        expect(wrapper.vm.value).toBe('Test todo');
    });

    it('emits a new-todo event and resets the value when enter is triggered', async () => {
        const input = wrapper.find('input');
        await input.setValue('Test todo');
        wrapper.vm.enter(); // Trigger the enter method directly
        expect(wrapper.emitted('new-todo')).toBeTruthy();
        expect(wrapper.emitted('new-todo')[0]).toEqual(['Test todo']);
        expect(wrapper.vm.value).toBe(null);
    });
});


