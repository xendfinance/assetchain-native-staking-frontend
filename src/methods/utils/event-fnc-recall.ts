import EE from 'event-emitter';

// Recall function when an event happens

const emitter = EE();

// consider this function again... address change seems to happen so many times now

export const fncReacquire = function (callableOnRoutes: Array<string>, fnc: Function, moveToPage?: Function) {
    // emitter.on('address-changed', (currentRoute) => {
    emitter.on('address', (currentRoute) => {
        if (callableOnRoutes.includes('join')) {
            fnc();
            return 0;
        } else if (callableOnRoutes.includes('esusu-back') || callableOnRoutes.includes('cooperative-back')) {
            fnc();
            return 0;
        } else if (callableOnRoutes.includes(currentRoute)) {
            fnc();
            return 0;
        }
    });
};

export const reacquireEmit = function (currentRoute: string) {
    emitter.emit('address-changed', currentRoute);
};
