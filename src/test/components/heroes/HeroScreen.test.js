import React from 'react';
import { mount } from "enzyme"
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen />', ()=>{

    const history = {
        length: 10,
        goBack: jest.fn(), 
        push:   jest.fn(),
    }

  

    test('debe de Mostrar el componente redirect si no hay argumentos en el url', ()=>{
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history} />
            </MemoryRouter>
        )
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });

    test('Debe de mostrar un hero si el parametro existe y se encuentra', ()=>{

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                 <Route path='/hero/:heroId' component={HeroScreen}/>
            </MemoryRouter>
        )

        expect(wrapper.find('.contenedor').exists()).toBe(true);

    });

    test('Debe de regresar a la pantalla anterior con PUSH', ()=>{

        const history = {
            length: 1,
            goBack: jest.fn(), 
            push:   jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                 <Route path='/hero/:heroId' component={() => <HeroScreen history={history} /> }/>
            </MemoryRouter>
        )
        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();
    });

    test('Debe de regresar a la pantalla anterior GOBACK', ()=>{

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                 <Route path='/hero/:heroId' component={() => <HeroScreen history={history} /> }/>
            </MemoryRouter>
        )
        wrapper.find('button').prop('onClick')();

        expect(history.push).not.toHaveBeenCalled();
        expect(history.goBack).toHaveBeenCalled();
    });

    test('Debe de llamar el redirect si el hero no existe', ()=>{

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123244']}>
                 <Route path='/hero/:heroId' component={() => <HeroScreen history={history} /> }/>
            </MemoryRouter>
        )
        
        expect(wrapper.text()).toBe("");
    });
})