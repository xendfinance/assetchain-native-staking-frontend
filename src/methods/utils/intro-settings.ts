// controls settngs for the intro steps on different pages

const storageName = '__intro-conf__';

export const addSettingsObjectToStorage = () => {
    const settings = localStorage.getItem(storageName);

    if (settings === null) {
        const settingObj = {
            exclude: [],
        };
        // see if this should be per address or per browser

        localStorage.setItem(storageName, JSON.stringify(settingObj));
    }
};

export const isRouteExcluded = (route: string) => {
    let settings: any = localStorage.getItem(storageName);
    if (settings !== undefined && settings !== null) {
        settings = JSON.parse(settings);

        const excluded = settings.exclude;
        if (Array.isArray(excluded)) {
            const isExcluded = excluded.includes(route);

            return isExcluded;
        }
    }

    return false; // is not excluded
};

export const addToExcluded = (route: string) => {
    let settings: any = localStorage.getItem(storageName);
    if (settings !== undefined && settings !== null) {
        settings = JSON.parse(settings);

        const excluded = settings.exclude;
        if (Array.isArray(excluded)) {
            excluded.push(route);
            settings.exclude = excluded;

            localStorage.setItem(storageName, JSON.stringify(settings));
        }
    }
};
