import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";


describe('Pruebas en authReducer', ()=>{
    const action = {
        type: types.login,
        payload: {
            name: 'Alfonso'
        }
    }

    test('debe de retornar el estado por defecto', ()=>{
        const reducer = authReducer({logged:false}, {});

        expect(reducer).toEqual({logged:false});
    });

    test('debe de autenticar y colocar el name del usuario', ()=>{

        const reducer = authReducer({logged:false}, action);

        expect(reducer).toEqual({
            name: 'Alfonso',
            logged: true
        });
    });

    test('debe de borrar el name del usuario y logged en false', ()=>{
        action.type = types.logout;
        const reducer = authReducer({logged:false}, action);
        expect(reducer).toEqual({
            logged: false
        });
    });

});